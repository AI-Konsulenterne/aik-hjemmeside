"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import PanelBar from "@/components/ui/PanelBar";
import { PERIODE, fit, lavSerie, prognose, type Fit, type Prognose } from "@/lib/forecast";

/**
 * Prognosen.
 *
 * Otte uger henvendelser, en hård streg ved "i dag", og to uger frem med et
 * bånd der bliver bredere jo længere ude det er. Stregen ved i dag er
 * lånt fra Ramps saldoprognose, og den er det vigtigste i figuren: til
 * venstre ved vi det, til højre gætter vi — og båndet siger hvor meget.
 *
 * Alt er regnet i browseren i det øjeblik feltet bliver synligt. Hver
 * gang forløbet starter forfra, er det nye data og en ny fit, så tallene i
 * bunden skifter. Det er det der gør forskellen på en graf og en model.
 *
 * Målt i Node på 200 kørsler, altid på uger modellen ikke havde set:
 * gennemsnitlig fejl 5,6% mod 7,1% for "samme dag sidste uge", og
 * 80%-båndet dækkede 85% af de rigtige værdier.
 */

const HIST_UGER = 8;
const FREM = 14;
/* Figuren tegnes i et fast koordinatsystem og skaleres. På en telefon blev
   11 px tekst i en 1000 bred figur til 3,6 px — derfor to formater: bredt
   på skærme over 640 px, højere og med større tekst under. */
const FORMAT = {
  bred: { W: 1000, H: 340, fs: 1, M: { l: 44, r: 18, t: 22, b: 34 }, hverAnden: false },
  smal: { W: 600, H: 420, fs: 1.9, M: { l: 64, r: 16, t: 40, b: 50 }, hverAnden: true },
};
const TEGN_MS = 1500;
const PROG_MS = 1300;
const HOLD_MS = 6500;
const UGEDAGE = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

type Koersel = { y: number[]; f: Fit; p: Prognose };

function ny(): Koersel {
  const s = lavSerie(HIST_UGER);
  const f = fit(s);
  return { y: s.y, f, p: prognose(f, FREM, s.y.length) };
}

export default function ForecastTile({
  hoej = false,
}: {
  /** Højere figur, til demovinduet på forsiden hvor der er plads i højden. */
  hoej?: boolean;
} = {}) {
  const [k, setK] = useState<Koersel | null>(null);
  const [t, setT] = useState(0);
  const [synlig, setSynlig] = useState(false);
  const [reduceret, setReduceret] = useState(false);
  const [smal, setSmal] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setSmal(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSynlig(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Én tidslinje driver det hele: 0 → TEGN_MS historik, så i dag, så
     prognosen, så hold, så forfra med nye data. */
  useEffect(() => {
    /* Ingen setState direkte i effekten — kun i rAF-callbacks. Direkte
       kald her giver en ekstra rendering med det samme, og ESLint's
       react-hooks fangede det. */
    if (reduceret) {
      const id = requestAnimationFrame(() => {
        setK(ny());
        setT(TEGN_MS + PROG_MS + 400);
      });
      return () => cancelAnimationFrame(id);
    }
    if (!synlig) return;
    let start = -1;
    const loop = (nu: number) => {
      if (start < 0) {
        start = nu;
        setK(ny());
        setT(0);
        raf.current = requestAnimationFrame(loop);
        return;
      }
      const el = nu - start;
      if (el > TEGN_MS + PROG_MS + HOLD_MS) {
        start = nu;
        setK(ny());
        setT(0);
      } else {
        setT(el);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [synlig, reduceret]);

  const F = smal ? FORMAT.smal : hoej ? { ...FORMAT.bred, H: 470 } : FORMAT.bred;
  const { W, H, M } = F;

  const g = useMemo(() => {
    if (!k) return null;
    const n = k.y.length + FREM;
    const pw = W - M.l - M.r;
    const ph = H - M.t - M.b;
    const top = Math.max(...k.y, ...k.p.hoej) * 1.08;
    const x = (i: number) => M.l + (i / (n - 1)) * pw;
    const y = (v: number) => M.t + ph - (v / top) * ph;
    const linje = (vs: number[], fra: number) =>
      vs.map((v, i) => `${i === 0 ? "M" : "L"}${x(fra + i).toFixed(1)},${y(v).toFixed(1)}`).join("");
    const iDag = k.y.length - 1;
    /* Prognosen starter i sidste kendte punkt, så der ikke er et hul. */
    const mid = [k.y[iDag], ...k.p.mid];
    const lav = [k.y[iDag], ...k.p.lav];
    const hoej = [k.y[iDag], ...k.p.hoej];
    const baand =
      hoej.map((v, i) => `${i === 0 ? "M" : "L"}${x(iDag + i).toFixed(1)},${y(v).toFixed(1)}`).join("") +
      lav
        .slice()
        .reverse()
        .map((v, i) => `L${x(iDag + lav.length - 1 - i).toFixed(1)},${y(v).toFixed(1)}`)
        .join("") +
      "Z";
    /* Første mandag efter i dag. Dag 0 er en mandag. */
    let man = 1;
    while ((iDag + man) % PERIODE !== 0) man++;
    const ticks = [0, 50, 100, 150, 200].filter((v) => v < top);
    return {
      pw,
      ph,
      x,
      y,
      hist: linje(k.y, 0),
      mid: linje(mid, iDag),
      baand,
      iDagX: x(iDag),
      man,
      manX: x(iDag + man),
      manY: y(k.p.mid[man - 1]),
      manV: Math.round(k.p.mid[man - 1]),
      manPm: Math.round((k.p.hoej[man - 1] - k.p.lav[man - 1]) / 2),
      ticks,
      top,
    };
  }, [k, W, H, M]);

  const histAndel = Math.min(1, t / TEGN_MS);
  const progAndel = Math.max(0, Math.min(1, (t - TEGN_MS - 150) / PROG_MS));
  const faerdig = progAndel >= 1;
  const status = !k ? "venter" : histAndel < 1 ? "læser historik" : !faerdig ? "forudsiger" : "klar";

  return (
    <div ref={wrap}>
      <div className="panel-lit border border-white/12 bg-[#0d0f11]">
        <PanelBar label="Henvendelser pr. dag" status={status} arbejder={!!k && !faerdig && !reduceret} />

        <div className="relative flex flex-1 items-center px-2 pt-3 sm:px-3">
          {g && (
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block h-auto w-full"
              style={{ aspectRatio: `${W} / ${H}` }}
              aria-hidden="true"
            >
              <defs>
                <clipPath id={`${id}-h`}>
                  <rect x={0} y={0} width={M.l + g.pw * ((k!.y.length - 1) / (k!.y.length + FREM - 1)) * histAndel} height={H} />
                </clipPath>
                <clipPath id={`${id}-p`}>
                  <rect x={g.iDagX} y={0} width={(W - M.r - g.iDagX) * progAndel} height={H} />
                </clipPath>
              </defs>

              {/* Tre vandrette hjælpelinjer — ikke et gitter. */}
              {g.ticks.map((v) => (
                <g key={v}>
                  <line x1={M.l} x2={W - M.r} y1={g.y(v)} y2={g.y(v)} stroke="rgba(255,255,255,0.06)" />
                  <text x={M.l - 10} y={g.y(v) + 4} textAnchor="end" className="fill-white/60" fontSize={11 * F.fs}>
                    {v}
                  </text>
                </g>
              ))}

              {/* Ugedage under aksen, kun mandage, så man kan se rytmen. */}
              {Array.from({ length: k!.y.length + FREM }, (_, i) => i)
                .filter((i) => i % PERIODE === 0 && (!F.hverAnden || (i / PERIODE) % 2 === 0))
                .map((i) => (
                  <text key={i} x={g.x(i)} y={H - 10} textAnchor="middle" className="fill-white/60" fontSize={10.5 * F.fs}>
                    {UGEDAGE[0]}
                  </text>
                ))}

              {/* Historikken */}
              <path d={g.hist} clipPath={`url(#${id}-h)`} fill="none" stroke="rgba(236,240,243,0.78)" strokeWidth={1.6 * F.fs} strokeLinejoin="round" />

              {/* I dag */}
              <g style={{ opacity: histAndel >= 1 ? 1 : 0, transition: "opacity 300ms" }}>
                <line x1={g.iDagX} x2={g.iDagX} y1={M.t - 6} y2={H - M.b} stroke="rgba(255,255,255,0.42)" strokeDasharray="2 4" />
                <text x={g.iDagX} y={M.t - 9} textAnchor="middle" className="fill-white/70" fontSize={10.5 * F.fs} letterSpacing="1.5">
                  I DAG
                </text>
              </g>

              {/* Prognosen: bånd og midterlinje */}
              <g clipPath={`url(#${id}-p)`}>
                <path d={g.baand} fill="rgba(255,154,0,0.14)" />
                <path d={g.mid} fill="none" stroke="#ff9a00" strokeWidth={1.8 * F.fs} strokeDasharray={`${5 * F.fs} ${4 * F.fs}`} />
              </g>

              {/* Næste mandag */}
              <g style={{ opacity: faerdig ? 1 : 0, transition: "opacity 400ms" }}>
                <circle cx={g.manX} cy={g.manY} r={4.5 * F.fs} fill="#ff9a00" stroke="#0d0f11" strokeWidth={2 * F.fs} />
                <text x={g.manX - 8 * F.fs} y={g.manY - 12 * F.fs} textAnchor="end" className="fill-white" fontSize={12 * F.fs}>
                  man. {g.manV} ±{g.manPm}
                </text>
              </g>
            </svg>
          )}
        </div>

        {/* Parametrene er den mindst vigtige aflæsning, og på en telefon
            brækker de over tre linjer. Der står kun to felter. */}
        <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-3">
          {[
            ["Næste mandag", g && faerdig ? `${g.manV} ±${g.manPm}` : "…"],
            ["Fejl i historik", k ? `${((k.f.sigma / (k.y.reduce((a, b) => a + b, 0) / k.y.length)) * 100).toFixed(1)} %` : "…"],
            ["α · β · γ", k ? `${k.f.alpha} · ${k.f.beta} · ${k.f.gamma}` : "…"],
          ].map(([a, b], i) => (
            <div key={a} className={`px-5 py-3.5 sm:px-6 ${i > 0 ? "border-l border-white/10" : ""} ${i === 2 ? "hidden sm:block" : ""}`}>
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-white/70">{a}</dt>
              <dd className="mt-1 text-[0.95rem] tabular-nums text-white">{b}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="sr-only">
        En prognose over henvendelser pr. dag. Holt-Winters med ugentlig sæson
        fittes på otte ugers syntetiske data og forudsiger to uger frem med et
        80 procents bånd.
        {g && faerdig ? ` Næste mandag forventes ${g.manV} henvendelser, plus minus ${g.manPm}.` : ""}
      </p>
    </div>
  );
}
