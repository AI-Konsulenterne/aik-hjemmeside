"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PanelBar from "@/components/ui/PanelBar";
import { INDBAKKE, KATEGORIER, MENNESKE_UNDER, klassificer, tokens, traen } from "@/lib/sorter";

/**
 * Indbakken.
 *
 * Mails kommer ind én ad gangen. Modellen — Naive Bayes, trænet på fyrre
 * eksempler i det øjeblik feltet bliver synligt — regner sikkerheden for
 * hver af de fire kategorier, og søjlerne vokser til det den har regnet.
 * Ordene der trak afgørelsen står understreget i mailen.
 *
 * Er den under 50% sikker, gætter den ikke: mailen går til et menneske.
 * Og én af de tolv sorterer den forkert med 70% sikkerhed — "Kan I levere
 * 20 paller i næste uge?" er både et spørgsmål og en ordre. Den fejl bliver
 * stående på siden med facit ved siden af. En demo der aldrig tager fejl,
 * er ikke værd at tro på, og regnskabet i bunden tæller den med.
 */

const INTERVAL_MS = 2300;
const SYNLIGE = 4;

type Raekke = {
  n: number;
  fra: string;
  tekst: string;
  facit: string;
  p: number[];
  top: string;
  ord: string[];
  menneske: boolean;
  forkert: boolean;
};

/* Modellen er deterministisk — samme fyrre mails, samme tal hver gang — så
   den trænes én gang ved import, og alle tolv afgørelser regnes med det
   samme. Det gør at de første rækker kan stå i den server-renderede HTML:
   indbakken har indhold før JavaScript overhovedet er kørt, og der er
   ingen setState i en effect for at fylde den. */
const MODEL = traen();

function lav(i: number): Raekke {
  const mail = INDBAKKE[i % INDBAKKE.length];
  const r = klassificer(MODEL, mail.tekst);
  const menneske = Math.max(...r.p) < MENNESKE_UNDER;
  return {
    n: i,
    fra: mail.fra,
    tekst: mail.tekst,
    facit: mail.facit,
    p: r.p,
    top: r.top,
    ord: r.ord,
    menneske,
    forkert: !menneske && r.top !== mail.facit,
  };
}

const ALLE = INDBAKKE.map((_, i) => lav(i));

/** Første gang den ses, ligger der allerede tre sorterede mails. Uden dem
 *  stod indbakken med én mail og en stor sort flade i syv sekunder, og det
 *  så ud som noget der ikke virkede. */
const START = SYNLIGE - 1;

export default function InboxTile() {
  const [raekker, setRaekker] = useState<Raekke[]>(() => ALLE.slice(0, START).reverse());
  const [sete, setSete] = useState(START);
  const [nyN, setNyN] = useState(-1);
  const [regner, setRegner] = useState(false);
  const [synlig, setSynlig] = useState(false);
  const [reduceret, setReduceret] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const naeste = useRef(START);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
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

  useEffect(() => {
    if (reduceret || !synlig) return;
    const slukTimere: number[] = [];
    const tik = () => {
      const i = naeste.current++;
      const r = lav(i);
      setRegner(true);
      setNyN(r.n);
      setRaekker((xs) => [r, ...xs].slice(0, SYNLIGE));
      setSete((n) => n + 1);
      /* Søjlerne vokser via CSS; lampen slukker når de står. */
      slukTimere.push(window.setTimeout(() => setRegner(false), 700));
    };
    /* Den første nye mail kommer et øjeblik efter at feltet er set. */
    const foerste = window.setTimeout(tik, 450);
    const id = window.setInterval(tik, INTERVAL_MS);
    return () => {
      window.clearTimeout(foerste);
      window.clearInterval(id);
      slukTimere.forEach((t) => window.clearTimeout(t));
    };
  }, [synlig, reduceret]);

  /* Regnskabet over alt der er set i denne omgang — også fejlen. */
  const regnskab = useMemo(() => {
    let sorteret = 0,
      menneske = 0,
      forkert = 0;
    for (const r of ALLE.slice(0, Math.min(sete, ALLE.length))) {
      if (r.menneske) menneske++;
      else if (r.forkert) forkert++;
      else sorteret++;
    }
    return { sorteret, menneske, forkert };
  }, [sete]);

  return (
    <div ref={wrap} className="flex h-full flex-col">
      <div className="panel-lit flex h-full flex-col border border-white/12 bg-[#0d0f11]">
        <PanelBar label="Indbakke" status={regner ? "sorterer" : "venter på næste"} arbejder={regner && !reduceret} />

        <ul className="flex-1 divide-y divide-white/[0.07] overflow-hidden" aria-hidden="true">
          {raekker.map((r) => (
            <li
              key={r.n}
              className="inbox-row px-5 py-4 sm:px-6"
              data-ny={r.n === nyN && !reduceret ? "true" : "false"}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="truncate font-mono text-[0.68rem] text-white/50">{r.fra}</p>
                <p className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
                  {r.menneske ? (
                    <span className="text-white">→ et menneske</span>
                  ) : r.forkert ? (
                    <>
                      <span className="text-white/55 line-through">→ {r.top}</span>
                      <span className="ml-2 text-white">facit {r.facit}</span>
                    </>
                  ) : (
                    <span className="text-primary">→ {r.top}</span>
                  )}
                </p>
              </div>
              <p className="mt-1.5 line-clamp-2 min-h-[2.475rem] text-[0.9rem] leading-snug text-white/85">
                <Fremhaev tekst={r.tekst} ord={r.ord} />
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {KATEGORIER.map((kat, k) => {
                  const v = r.p[k];
                  const vinder = kat === r.top;
                  return (
                    <div key={kat}>
                      <div className="h-[3px] w-full bg-white/[0.08]">
                        <div
                          className="inbox-bar h-full"
                          style={{
                            width: `${(v * 100).toFixed(1)}%`,
                            background: vinder && !r.menneske ? "#ff9a00" : "rgba(236,240,243,0.45)",
                          }}
                        />
                      </div>
                      <p className="mt-1 flex justify-between font-mono text-[0.6rem] text-white/50">
                        <span className="truncate">{kat}</span>
                        <span className="tabular-nums">{Math.round(v * 100)}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        <dl className="grid grid-cols-3 border-t border-white/10">
          {[
            ["Sorteret", regnskab.sorteret],
            ["Til et menneske", regnskab.menneske],
            ["Forkert", regnskab.forkert],
          ].map(([a, b], i) => (
            <div key={a as string} className={`px-5 py-3.5 sm:px-6 ${i > 0 ? "border-l border-white/10" : ""}`}>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70">{a}</dt>
              <dd className="mt-1 font-mono text-[0.95rem] tabular-nums text-white">{b}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="sr-only">
        {ALLE.map((r) => (
          <li key={r.n}>
            Mail: {r.tekst}. {r.menneske ? "Usikker, sendt til et menneske." : `Sorteret som ${r.top}.`}
            {r.forkert ? ` Forkert, facit er ${r.facit}.` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Understreger de ord der trak afgørelsen. Matcher på samme tokenisering
 *  som modellen, så det der fremhæves er præcis det den regnede med. */
function Fremhaev({ tekst, ord }: { tekst: string; ord: string[] }) {
  if (!ord.length) return <>{tekst}</>;
  const dele = tekst.split(/([a-zæøåA-ZÆØÅ]+)/);
  return (
    <>
      {dele.map((d, i) =>
        ord.includes(tokens(d)[0] ?? "") ? (
          <span key={i} className="underline decoration-primary decoration-[1.5px] underline-offset-[3px]">
            {d}
          </span>
        ) : (
          <span key={i}>{d}</span>
        )
      )}
    </>
  );
}
