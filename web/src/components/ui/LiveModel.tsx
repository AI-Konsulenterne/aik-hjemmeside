"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LR,
  MOMENTUM,
  forward,
  makeNet,
  makeSpiral,
  trainStep,
  weightCount,
  type Data,
  type Net,
} from "@/lib/tinynet";

/**
 * Modellen, mens den lærer.
 *
 * Det her er ikke en animation af machine learning. Det er machine learning:
 * 337 vægte der starter tilfældigt, rigtig fremadregning, rigtig
 * backpropagation, rigtig gradientnedstigning. Epoke, tab og træfprocent
 * aflæses på modellen efter hvert skridt — de er ikke skrevet i hånden, og
 * de kan ikke være det, for vægtene starter forfra hver gang.
 *
 * Matematikken ligger i src/lib/tinynet.ts, hvor den kan køres uden en
 * browser. Det er den blevet: 60 kørsler, 60 konvergerede, og det er sådan
 * spiralens omgange og indlæringsraten er fundet.
 *
 * Feltet bag punkterne er modellens svar på hvert eneste sted på fladen,
 * ikke bare der hvor der ligger data. Derfor kan man se grænsen bøje sig:
 * den er ikke tegnet af os, den er modellens.
 *
 * Ydelse: én epoke pr. frame, feltet hvert tredje. Feltet regnes i 80×45 og
 * skaleres op med udglatning — at regne det i fuld opløsning ville koste
 * hundrede gange mere og se ens ud.
 */

const GW = 96;
const GH = 54;
/** Lodret dækning i modelkoordinater. Spiralen har radius 1, så 1,22 giver
 *  den luft foroven og forneden — uanset hvor bred canvas er. Vandret
 *  udledes af sideforholdet, ellers beskæres spiralen på brede skærme. */
const SPAN_Y = 1.22;
const HOLD_MS = 2600;
const MAAL = 0.97;
/** Feltet regnes i vandrette bånd, ét pr. frame. Hele gitteret på én gang
 *  kostede 10 ms, og selv hvert tredje billede var det et ryk der missede
 *  vsync — billedraten faldt til 36 selvom gennemsnittet så let ud på
 *  papiret. Delt i tre bånd koster hvert billede det samme lille stykke,
 *  feltet er stadig helt fornyet hver tredje frame, og forskydningen mellem
 *  båndene kan ikke ses, fordi grænsen flytter sig langsomt. */
const BAAND = 3;
/** Hvor ofte fladen faktisk males op. Beregningen er billig at spare op i
 *  bånd, men selve optegningen er det ikke: et canvas på 2636×1130 skal
 *  komponeres hver gang der tegnes, og at gøre det 60 gange i sekundet
 *  halverede billedraten to gange i træk. Beregning hver frame, optegning
 *  hver tredje — grænsen flytter sig for langsomt til at nogen ser det. */
const TEGN_HVER = 3;
/** Aflæsningerne opdateres ikke 60 gange i sekundet. En React-rendering pr.
 *  frame kostede mere end selve træningen — 41 fps blev til 60 af det her
 *  ene tal, og et epoketal der springer fem ad gangen er stadig aflæst på
 *  modellen. */
const AFLAES_MS = 120;
/** Epoker pr. sekund. Fastholdt uafhængigt af billedraten: ellers varer
 *  forløbet dobbelt så længe på en langsom maskine, og hvor mange sekunder
 *  det tager at se en model lære er en designbeslutning og ikke noget
 *  hardwaren skal bestemme. Målt i Node: median 532 epoker til 97%, altså
 *  knap ni sekunder. */
const EPOKER_PR_SEK = 60;

const INK = [13, 15, 17];
const ORANGE = [255, 154, 0];
const HVID = [214, 222, 228];
/** Højdekurver. 0,5 er grænsen selv; de to andre viser hvor sikker den er. */
const NIVEAUER: { p: number; farve: string; bredde: number }[] = [
  { p: 0.25, farve: "rgba(214,222,228,0.20)", bredde: 1 },
  { p: 0.75, farve: "rgba(255,154,0,0.26)", bredde: 1 },
  { p: 0.5, farve: "#ff9a00", bredde: 2 },
];

export default function LiveModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const netRef = useRef<Net | null>(null);
  const dataRef = useRef<Data | null>(null);
  const gridRef = useRef<Float32Array | null>(null);
  const baandRef = useRef(0);
  const tegnTaellerRef = useRef(0);
  /* Efter en nulstilling skal alle bånd regnes i samme billede. */
  const helTegningRef = useRef(true);
  const fieldRef = useRef<ImageData | null>(null);
  const fieldCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const doneAtRef = useRef<number | null>(null);
  const sidstAflaestRef = useRef(0);
  const sidsteFrameRef = useRef(0);
  const restRef = useRef(0);

  const [aflaes, setAflaes] = useState({ epoke: 0, tab: 0.693, ramt: 0.5 });
  const [faerdig, setFaerdig] = useState(false);
  const [synlig, setSynlig] = useState(false);
  const [reduceret, setReduceret] = useState(false);
  const [vaegte] = useState(() => weightCount());

  const nulstil = useCallback(() => {
    netRef.current = makeNet();
    dataRef.current = makeSpiral();
    doneAtRef.current = null;
    sidsteFrameRef.current = 0;
    restRef.current = 0;
    baandRef.current = 0;
    helTegningRef.current = true;
    setFaerdig(false);
    setAflaes({ epoke: 0, tab: 0.693, ramt: 0.5 });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSynlig(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Tegner feltet, højdekurverne og punkterne.

     Første udgave lagde farven på med 50% dækning og et bredt lyst bånd om
     grænsen. Det blev til to flade klatter i mudderbrun og skibsgrå — og
     orange holder ikke til at blive blandet halvt op i sort, den bliver
     bare snavset. Nu ligger feltet meget svagt, og grænsen tegnes som en
     rigtig kurve i fuld kulør oven på. To svagere kurver ved 0,25 og 0,75
     viser hvor sikker den er; det er samme princip som et kort med
     højdekurver, og det er dér man kan se den stramme grebet. */
  const beregnBaand = useCallback(() => {
    const canvas = canvasRef.current;
    const net = netRef.current;
    const data = dataRef.current;
    if (!canvas || !net || !data) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const spanX = (SPAN_Y * w) / h;

    if (!gridRef.current) gridRef.current = new Float32Array(GW * GH);
    const P = gridRef.current;

    /* Modellens svar, ét bånd ad gangen. Alt nedenfor er aflæsning af P. */
    const helt = helTegningRef.current;
    helTegningRef.current = false;
    const baand = baandRef.current % BAAND;
    baandRef.current++;
    const j0 = helt ? 0 : Math.floor((baand * GH) / BAAND);
    const j1 = helt ? GH : Math.floor(((baand + 1) * GH) / BAAND);
    for (let j = j0; j < j1; j++) {
      const my = (j / (GH - 1) - 0.5) * SPAN_Y * 2;
      for (let i = 0; i < GW; i++) {
        const mx = (i / (GW - 1) - 0.5) * spanX * 2;
        P[j * GW + i] = forward(net, mx, my);
      }
    }

  }, []);

  /* Maler fladen op ud fra det gemte gitter. */
  const tegn = useCallback(() => {
    const canvas = canvasRef.current;
    const data = dataRef.current;
    const P = gridRef.current;
    if (!canvas || !data || !P) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const spanX = (SPAN_Y * w) / h;

    /* --- Feltet, svagt --- */
    if (!fieldRef.current) {
      fieldRef.current = new ImageData(GW, GH);
      const fc = document.createElement("canvas");
      fc.width = GW;
      fc.height = GH;
      fieldCanvasRef.current = fc;
    }
    const px = fieldRef.current.data;
    for (let k = 0; k < GW * GH; k++) {
      const pv = P[k];
      const sikker = Math.abs(pv - 0.5) * 2;
      const mod = pv >= 0.5 ? ORANGE : HVID;
      /* Orange blandet 20% ned i næsten sort bliver oliven, ikke orange.
         Fladen holdes lav og lader kurven bære kuløren. */
      const a = sikker * (pv >= 0.5 ? 0.115 : 0.1);
      const o = k * 4;
      for (let c = 0; c < 3; c++) px[o + c] = INK[c] + (mod[c] - INK[c]) * a;
      px[o + 3] = 255;
    }
    const fc = fieldCanvasRef.current!;
    fc.getContext("2d")!.putImageData(fieldRef.current, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(fc, 0, 0, w, h);

    /* --- Højdekurverne: marching squares på det samme gitter --- */
    const gx = (i: number) => (i / (GW - 1)) * w;
    const gy = (j: number) => (j / (GH - 1)) * h;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    for (const niv of NIVEAUER) {
      ctx.beginPath();
      for (let j = 0; j < GH - 1; j++) {
        for (let i = 0; i < GW - 1; i++) {
          const a = P[j * GW + i];
          const b = P[j * GW + i + 1];
          const c = P[(j + 1) * GW + i + 1];
          const d = P[(j + 1) * GW + i];
          const L = niv.p;
          /* Skæringer på cellens fire kanter, lineært interpoleret — uden
             interpolationen bliver kurven trappeformet. */
          const pts: [number, number][] = [];
          if (a >= L !== b >= L) pts.push([gx(i + (L - a) / (b - a)), gy(j)]);
          if (b >= L !== c >= L) pts.push([gx(i + 1), gy(j + (L - b) / (c - b))]);
          if (d >= L !== c >= L) pts.push([gx(i + (L - d) / (c - d)), gy(j + 1)]);
          if (a >= L !== d >= L) pts.push([gx(i), gy(j + (L - a) / (d - a))]);
          /* To skæringer er det normale. Fire er en saddel; at forbinde dem
             parvis i fundet rækkefølge er godt nok ved denne cellestørrelse. */
          for (let k = 0; k + 1 < pts.length; k += 2) {
            ctx.moveTo(pts[k][0], pts[k][1]);
            ctx.lineTo(pts[k + 1][0], pts[k + 1][1]);
          }
        }
      }
      /* Grænsen får sit skær af et bredt, svagt stroke under det smalle.
         ctx.shadowBlur gjorde det samme og kostede alene to tredjedele af
         billedraten — den lægger en uskarphed over hvert eneste af kurvens
         mange tusinde segmenter. */
      if (niv.p === 0.5) {
        ctx.strokeStyle = "rgba(255,154,0,0.18)";
        ctx.lineWidth = 7 * (w / 1400);
        ctx.stroke();
      }
      ctx.strokeStyle = niv.farve;
      ctx.lineWidth = niv.bredde * (w / 1400);
      ctx.stroke();
    }

    /* --- Punkterne --- */
    const sx = (mx: number) => (mx / (spanX * 2) + 0.5) * w;
    const sy = (my: number) => (my / (SPAN_Y * 2) + 0.5) * h;
    const r = Math.max(2.5, w / 420);
    ctx.lineWidth = Math.max(1, r * 0.5);
    ctx.strokeStyle = "rgba(10,11,13,0.9)";
    for (let s = 0; s < data.n; s++) {
      ctx.beginPath();
      ctx.arc(sx(data.x[s * 2]), sy(data.x[s * 2 + 1]), r, 0, Math.PI * 2);
      ctx.fillStyle = data.y[s] >= 0.5 ? "#ff9a00" : "#ffffff";
      ctx.fill();
      ctx.stroke();
    }
  }, []);

  /* Canvas følger sin egen boks, i skærmens pixels. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      /* 1,5 frem for 2: fladen er bløde overgange og tre tynde streger,
         og en fjerdedel færre pixels at komponere pr. optegning. */
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      helTegningRef.current = true;
      beregnBaand();
      tegn();
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [tegn, beregnBaand]);

  /* Uden bevægelse: træn færdig med det samme og vis resultatet. */
  useEffect(() => {
    if (!reduceret) return;
    nulstil();
    const net = netRef.current!;
    const data = dataRef.current!;
    let r = { loss: 0.693, acc: 0.5 };
    for (let e = 0; e < 900 && r.acc < MAAL; e++) r = trainStep(net, data, LR, MOMENTUM);
    setAflaes({ epoke: net.epoch, tab: r.loss, ramt: r.acc });
    setFaerdig(true);
    helTegningRef.current = true;
    beregnBaand();
    tegn();
  }, [reduceret, nulstil, tegn, beregnBaand]);

  /* Én epoke pr. frame. Feltet hvert tredje. */
  useEffect(() => {
    if (reduceret || !synlig) return;
    if (!netRef.current) nulstil();

    const loop = () => {
      const net = netRef.current!;
      const data = dataRef.current!;
      const nu = performance.now();

      if (doneAtRef.current === null) {
        /* Hvor mange epoker skylder vi siden sidste frame? Loftet på otte
           forhindrer at en enkelt lang pause (fanen i baggrunden, en tung
           GC) bliver indhentet i ét ryk. */
        const dt = sidsteFrameRef.current ? nu - sidsteFrameRef.current : 16.7;
        restRef.current += (dt / 1000) * EPOKER_PR_SEK;
        const antal = Math.min(8, Math.floor(restRef.current));
        restRef.current -= antal;
        let r = { loss: 0, acc: 0 };
        for (let e = 0; e < antal; e++) r = trainStep(net, data, LR, MOMENTUM);
        if (antal === 0) {
          sidsteFrameRef.current = nu;
          beregnBaand();
          if (tegnTaellerRef.current++ % TEGN_HVER === 0) tegn();
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        if (nu - sidstAflaestRef.current > AFLAES_MS) {
          sidstAflaestRef.current = nu;
          setAflaes({ epoke: net.epoch, tab: r.loss, ramt: r.acc });
        }
        if (r.acc >= MAAL) {
          doneAtRef.current = nu;
          setAflaes({ epoke: net.epoch, tab: r.loss, ramt: r.acc });
          setFaerdig(true);
        }
        sidsteFrameRef.current = nu;
      } else if (nu - doneAtRef.current > HOLD_MS) {
        /* Den kan det nu. Så glemmer vi alt og lader den lære det igen —
           ellers står der bare et færdigt billede for den næste der
           scroller forbi. */
        nulstil();
      }

      beregnBaand();
      if (tegnTaellerRef.current++ % TEGN_HVER === 0) tegn();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [synlig, reduceret, nulstil, tegn, beregnBaand]);

  const arbejder = !faerdig && synlig && !reduceret;

  return (
    <div ref={wrapRef}>
      <div className="corner-marks relative">
        <div className="panel-lit border border-white/12 bg-[#0d0f11]">
          {/* Samme bjælke som HR-agenten. De to er sidens to stykker
              software, og de skal læses som samme system. */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5 sm:px-7">
            <span className="lamp" data-lit={arbejder ? "true" : "false"} aria-hidden="true" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
              To spiraler
            </p>
            <p className="ml-auto font-mono text-[0.7rem] tracking-wide text-white/60">
              {reduceret ? "færdig" : arbejder ? "træner" : "kan det"}
            </p>
          </div>

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-[16/9]"
          />

          {/* Aflæsningerne står i DOM'en og ikke på canvas: så kan de
              markeres, læses højt og zoomes. */}
          <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
            {[
              ["Epoke", String(aflaes.epoke)],
              ["Tab", aflaes.tab.toFixed(4)],
              ["Ramt rigtigt", `${(aflaes.ramt * 100).toFixed(1)} %`],
              ["Vægte", String(vaegte)],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`px-5 py-4 sm:px-7 ${
                  i > 0 ? "border-white/10 sm:border-l" : ""
                } ${i === 1 ? "border-l border-white/10 sm:border-l" : ""} ${
                  i > 1 ? "border-t border-white/10 sm:border-t-0" : ""
                }`}
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55">
                  {k}
                </dt>
                <dd className="mt-1.5 font-mono text-base tabular-nums text-white sm:text-lg">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={nulstil}
          className="border border-gray-300 px-4 py-2 text-[0.8rem] font-semibold leading-none text-gray-700 transition-colors duration-200 hover:border-gray-500 hover:text-gray-900"
        >
          Glem det hele, og lær det forfra
        </button>
        <p className="text-xs leading-relaxed text-gray-600">
          Kører i din browser. Der bliver ikke sendt noget nogen steder hen.
        </p>
      </div>

      <p className="sr-only">
        Et lille neuralt net med {vaegte} vægte trænes live på at skelne to
        spiraler der er viklet ind i hinanden. Det starter med tilfældige
        vægte og rammer typisk 97 procent rigtigt efter omkring 500
        gennemløb. Aktuelt: {aflaes.epoke} gennemløb, tab{" "}
        {aflaes.tab.toFixed(4)}, {(aflaes.ramt * 100).toFixed(1)} procent
        rigtige.
      </p>
    </div>
  );
}
