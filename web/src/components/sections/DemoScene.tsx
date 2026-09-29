"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AgentConsole from "@/components/ui/AgentConsole";
import ForecastTile from "@/components/ui/ForecastTile";
import InboxTile from "@/components/ui/InboxTile";
import LiveModel from "@/components/ui/LiveModel";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Se det virke.
 *
 * Fire modeller der regner i browseren. Før stod de som fire mørke paneler
 * spredt over to skærmhøjder, med tal som "Tab 0,1353" og "α · β · γ" i
 * forgrunden. Det læste som en udviklers portefølje, og en direktør er ikke
 * ude efter tabsfunktionen.
 *
 * Nu er de ét vindue med fire faner. Til venstre står hvad hver af dem gør
 * i forretningssprog; det tekniske er rykket ned i en lille fodnote. Kun den
 * aktive demo kører, så de ikke deler regnekraft, og fanerne skifter selv
 * indtil man rører ved noget — så går styringen over til den besøgende.
 * Mønstret er Stripe og Linears funktionsvælger.
 *
 * Hvert tal i demoerne er stadig aflæst på modellen, og hver model er
 * efterprøvet i Node. Se src/lib/.
 */

type Demo = {
  id: string;
  fane: string;
  titel: string;
  tekst: string;
  fodnote: string;
};

const DEMOER: Demo[] = [
  {
    id: "svarer",
    fane: "Svarer",
    titel: "Svarer ud fra jeres egne dokumenter.",
    tekst:
      "Medarbejderen spørger. Agenten slår op i personalehåndbogen og overenskomsten og svarer med kilde. Står det ikke i dokumenterne, siger den det i stedet for at gætte.",
    fodnote: "Eksempel på forløbet. Den rigtige agent kører hos Lavazza, på deres dokumenter.",
  },
  {
    id: "sorterer",
    fane: "Sorterer",
    titel: "Sorterer indbakken, og ved hvornår den skal lade være.",
    tekst:
      "Hver mail får en kategori og en sikkerhed. Er den under halvt sikker, går mailen til et menneske. Én ud af tolv sorterer den forkert, og det står der.",
    fodnote: "Naive Bayes, trænet på 40 eksempelmails i din browser.",
  },
  {
    id: "forudsiger",
    fane: "Forudsiger",
    titel: "Forudsiger hvor travlt I får det.",
    tekst:
      "Otte ugers henvendelser ind, to uger frem ud. Båndet er hvor sikker den er, og det bliver bredere jo længere frem den ser.",
    fodnote: "Holt-Winters med ugentlig sæson, på syntetiske data. 5,6 % fejl mod 7,1 % for “samme dag sidste uge”.",
  },
  {
    id: "laerer",
    fane: "Lærer",
    titel: "Og sådan bliver en model til.",
    tekst:
      "337 tal, der starter tilfældigt og retter sig selv, indtil de kan kende to spiraler fra hinanden. Samme princip som i de store modeller, bare meget mindre.",
    fodnote: "Neuralt net, 2 → 16 → 16 → 1, trænet i din browser.",
  },
];

/** Så længe får hver fane, før den næste tager over — indtil man selv
 *  vælger. Svarer-forløbet er det længste og tager knap 10 sekunder. */
const AUTO_MS = 11000;

function Indhold({ id }: { id: string }) {
  if (id === "svarer") return <AgentConsole tema="moerk" />;
  if (id === "sorterer") return <InboxTile />;
  if (id === "forudsiger") return <ForecastTile hoej />;
  return <LiveModel />;
}

export default function DemoScene() {
  const [aktiv, setAktiv] = useState(0);
  const [fremdrift, setFremdrift] = useState(0);
  const [laast, setLaast] = useState(false);
  const [synlig, setSynlig] = useState(false);
  const [reduceret, setReduceret] = useState(false);
  const sektion = useRef<HTMLElement>(null);
  const faner = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sektion.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSynlig(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Automatisk skift, indtil den besøgende tager over. */
  useEffect(() => {
    if (laast || !synlig || reduceret) return;
    let raf = 0;
    let start = -1;
    const tik = (nu: number) => {
      if (start < 0) start = nu;
      const t = nu - start;
      if (t >= AUTO_MS) {
        setAktiv((a) => (a + 1) % DEMOER.length);
        setFremdrift(0);
        return;
      }
      setFremdrift(t / AUTO_MS);
      raf = requestAnimationFrame(tik);
    };
    raf = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(raf);
  }, [aktiv, laast, synlig, reduceret]);

  const vaelg = useCallback((i: number, fokus = false) => {
    setLaast(true);
    setFremdrift(0);
    setAktiv(i);
    if (fokus) faner.current[i]?.focus();
  }, []);

  /* Piletaster mellem fanerne, som en rigtig tablist. */
  const tast = (e: React.KeyboardEvent) => {
    const n = DEMOER.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      vaelg((aktiv + 1) % n, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      vaelg((aktiv - 1 + n) % n, true);
    }
  };

  const d = DEMOER[aktiv];

  return (
    <section ref={sektion} id="se-det-virke" data-header="moerk" className="section-y relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="lamp" data-lit="true" aria-hidden="true" />
              <p className="kicker text-white/60">Se det virke</p>
            </div>
            <h2 className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-white">
              Det kører. Lige nu, i din browser.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/65">
              Fire små modeller, du kan prøve. Ingen video og intet optaget,
              og der bliver ikke sendt noget nogen steder hen.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          {/* grid-cols-1 er minmax(0, 1fr): en kolonne uden den kan blive lige
              så bred som sit bredeste indhold, og fanerne og spørgsmålene er
              rækker man skubber til siden. Så blev gitteret 1200 px bredt på
              en telefon og klippet af sektionen, og fanerne kunne ikke flyttes. */}
          <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            {/* --- Fanerne --- */}
            <div
              role="tablist"
              aria-label="Demoer"
              aria-orientation="vertical"
              onKeyDown={tast}
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {DEMOER.map((x, i) => {
                const valgt = i === aktiv;
                return (
                  <button
                    key={x.id}
                    ref={(el) => {
                      faner.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`fane-${x.id}`}
                    aria-selected={valgt}
                    aria-controls="demo-panel"
                    tabIndex={valgt ? 0 : -1}
                    onClick={() => vaelg(i)}
                    className={`group relative flex-none rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-6 ${
                      valgt
                        ? "border-white/70 bg-white/[0.06] lg:border-white/15 lg:bg-transparent"
                        : "border-white/15 lg:border-white/10"
                    }`}
                  >
                    {/* Fremdrift: en streg over den valgte fane, kun på stor skærm */}
                    {valgt && !laast && !reduceret && (
                      <span className="absolute inset-x-0 -top-px hidden h-px origin-left bg-primary lg:block" style={{ transform: `scaleX(${fremdrift})` }} aria-hidden="true" />
                    )}
                    {valgt && (laast || reduceret) && (
                      <span className="absolute inset-x-0 -top-px hidden h-px bg-white/60 lg:block" aria-hidden="true" />
                    )}
                    <span className="flex items-baseline gap-4">
                      <span className={`hidden text-xs font-semibold tabular-nums lg:inline ${valgt ? "text-primary" : "text-white/40"}`}>
                        0{i + 1}
                      </span>
                      <span className={`text-sm font-semibold lg:text-xl lg:tracking-heading ${valgt ? "text-white" : "text-white/55 group-hover:text-white/85"}`}>
                        {x.fane}
                      </span>
                    </span>
                    {/* Beskrivelsen står kun under den valgte fane, på stor skærm */}
                    <span className={`hidden overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid ${valgt ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="min-h-0">
                        <span className="block pl-9 pt-3 text-[0.975rem] font-semibold leading-snug text-white">{x.titel}</span>
                        <span className="block pl-9 pt-2 text-[0.9375rem] leading-relaxed text-white/65">{x.tekst}</span>
                        <span className="block pl-9 pt-3 text-xs leading-relaxed text-white/60">{x.fodnote}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* På telefonen står beskrivelsen over vinduet */}
            <div className="lg:hidden">
              <p className="text-lg font-semibold leading-snug text-white">{d.titel}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">{d.tekst}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/60">{d.fodnote}</p>
            </div>

            {/* --- Vinduet --- */}
            <div className="min-w-0 lg:col-span-8">
              <div
                id="demo-panel"
                role="tabpanel"
                aria-labelledby={`fane-${d.id}`}
                onPointerDown={() => setLaast(true)}
                className="demo-embed relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f11] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] lg:h-[40rem]"
              >
                {/* key: hver demo starter forfra, og kun den valgte kører */}
                <Indhold key={d.id} id={d.id} />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
