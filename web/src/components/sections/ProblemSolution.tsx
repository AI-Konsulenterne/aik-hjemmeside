"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

/**
 * "Sådan hjælper vi" som interaktiv kunderejse (design-handoff "Sådan hjælper vi").
 * Fem trin på en tidslinje, der skifter automatisk, og et panel med trinnets tekst
 * og et lille artefakt af det, kunden får. Pause ved hover, klik for at vælge trin,
 * ingen auto-play ved prefers-reduced-motion.
 */

const STEP_SECONDS = 7;

const steps = [
  {
    title: "Vi starter med en gratis snak",
    body: "Det starter med en gratis AI-afklaring på 30 minutter. Her finder vi ud af, hvor skoen trykker for jer, og I skal ikke forberede noget. Nogle gange ligger en konkret use case lige til højrebenet. Andre gange er det første skridt en workshop, undervisning eller bare at få skabt et overblik.",
  },
  {
    title: "Vi finder den løsning der passer til jer",
    body: "Her bliver det lidt mere teknisk. Først definerer vi udfordringen, vi står over for, og hvad formålet med løsningen er. Derefter afklarer vi det tekniske setup: hvordan jeres data skal håndteres, arkitekturen og hvilke systemer der skal tale sammen.",
  },
  {
    title: "Vi udvikler første version",
    body: "I den her fase udvikler vi den første version. Vi kobler modellen sammen med jeres data og systemer og får teknikken til at spille. Vi tror på, at vi lærer mest om produktet og behovet, når I får det i hænderne. Derfor gør vi en dyd ud af at levere en første version hurtigt, så vi kan tilpasse undervejs.",
  },
  {
    title: "Vi kigger på hvad der virker",
    body: "Når jeres medarbejdere er begyndt at bruge løsningen, ser vi sammen på hvad der rammer plet, og hvor der skal justeres. AI-løsninger er ikke perfekte fra starten og derfor tilpasser vi undervejs.",
  },
  {
    title: "Vi er med jer hele vejen",
    body: "Når løsningen er i luften, forsvinder vi ikke bare. Vi drifter den naturligvis sammen med jer, står klar med support og er der, når noget skal justeres eller udvikles. Vi vil være jeres AI-samarbejdspartner, der altid står ved siden af jer.",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ── Artefakter (illustrative eksempler) ─────────────────────────────

function BookingArtifact() {
  const slots = ["I dag", "I morgen", "Senere på ugen"];
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-primary/10 shrink-0">
          <Image src="/alexander.png" alt="Alexander" fill sizes="44px" className="object-cover" />
        </div>
        <div>
          <p className="text-base font-bold text-gray-900">Gratis AI-afklaring</p>
          <p className="text-sm text-gray-500">30 min · Med Alexander</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((s, i) => (
          <span
            key={s}
            className={`text-center rounded-full py-2.5 px-1 text-sm font-semibold border ${
              i === 1
                ? "bg-primary border-primary text-gray-900"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 flex items-center gap-2 text-sm text-gray-700">
        <CheckIcon className="text-primary shrink-0" />
        I skal ikke forberede noget
      </div>
    </div>
  );
}

function OpportunitiesArtifact({ shown, reduced }: { shown: boolean; reduced: boolean }) {
  const opps = [
    { name: "Svar på kundehenvendelser", tag: "Vi starter her", w: 88 },
    { name: "Udarbejdelse af tilbud", tag: "Næste skridt", w: 60 },
    { name: "Opsummering af møder", tag: "Senere", w: 34 },
  ];
  return (
    <div className="w-full flex flex-col gap-2.5">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500 mb-1">
        Muligheder hos jer
      </p>
      {opps.map((o, i) => (
        <div
          key={o.name}
          className={`bg-white rounded-xl px-[18px] py-4 flex flex-col gap-2.5 border ${
            i === 0
              ? "border-primary shadow-[0_10px_30px_rgba(255,154,0,0.12)]"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[15px] font-semibold text-gray-900">{o.name}</span>
            <span
              className={`text-xs font-bold whitespace-nowrap ${
                i === 0 ? "text-primary-dark" : "text-gray-400"
              }`}
            >
              {o.tag}
            </span>
          </div>
          <div className="h-1.5 rounded-md bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-md ${i === 0 ? "bg-primary" : "bg-gray-300"} ${
                reduced ? "" : "transition-[width] duration-[900ms] ease-out delay-200"
              }`}
              style={{ width: shown || reduced ? `${o.w}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BuildArtifact({ shown, progress }: { shown: boolean; progress: number }) {
  const sources = ["Mail", "ERP", "Dokumenter"];
  const build = Math.min(1, progress * 1.6);
  const wired = shown && progress > 0.08;
  return (
    <div className="w-full grid grid-cols-[auto_minmax(24px,1fr)_auto] items-center">
      <div className="flex flex-col gap-2.5">
        {sources.map((s) => (
          <span
            key={s}
            className="bg-white border border-gray-200 rounded-full px-3.5 py-2 text-sm font-semibold text-gray-900 text-center"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-[30px] px-1" aria-hidden="true">
        {[0, 150, 300].map((d) => (
          <div
            key={d}
            className="h-0.5 transition-colors duration-500"
            style={{ background: wired ? "#ff9a00" : "#e5e5e5", transitionDelay: `${d}ms` }}
          />
        ))}
      </div>
      <div className="w-[150px] sm:w-[180px] bg-gray-900 text-white rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Version 1</p>
        <p className="text-[17px] font-bold mt-1.5">Jeres AI-løsning</p>
        <div className="h-1.5 rounded-md bg-gray-700 mt-4 overflow-hidden">
          <div className="h-full bg-primary rounded-md" style={{ width: `${Math.round(build * 100)}%` }} />
        </div>
        <p className="text-[13px] text-gray-300 mt-2.5">
          {build >= 1 ? "Klar til test hos jer" : "Kobler på jeres systemer…"}
        </p>
      </div>
    </div>
  );
}

function ResultsArtifact({ shown, reduced }: { shown: boolean; reduced: boolean }) {
  const bars = [18, 32, 45, 60, 78, 92];
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-bold text-gray-900">Tid sparet pr. uge</p>
        <p className="text-xs text-gray-500">Eksempel</p>
      </div>
      <div className="grid grid-cols-6 gap-2.5 mt-5">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-40 w-full flex items-end">
              <div
                className={`w-full rounded-t-md rounded-b-sm ${i === 5 ? "bg-primary" : "bg-gray-900"} ${
                  reduced ? "" : "transition-[height] duration-[800ms] ease-out"
                }`}
                style={{ height: shown || reduced ? `${h}%` : "0%", transitionDelay: `${i * 80}ms` }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">Uge {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportArtifact() {
  const rows = [
    { t: "Løbende opfølgning", d: "Faste check-ins, hvor vi ser på tallene sammen." },
    { t: "Justeringer undervejs", d: "Ændrer jeres behov sig, tilpasser vi løsningen." },
    { t: "Næste mulighed", d: "Når I er klar, finder vi det næste sted at spare tid." },
  ];
  return (
    <div className="w-full flex flex-col">
      {rows.map((r, i) => (
        <div key={r.t} className="grid grid-cols-[40px_1fr] gap-4">
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center shrink-0">
              <CheckIcon />
            </span>
            {i < rows.length - 1 && <span className="w-0.5 flex-1 min-h-6 bg-gray-200" aria-hidden="true" />}
          </div>
          <div className={i < rows.length - 1 ? "pb-6" : ""}>
            <p className="text-base font-bold text-gray-900 mt-2">{r.t}</p>
            <p className="text-sm text-gray-600 leading-normal mt-1">{r.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sektion ─────────────────────────────────────────────────────────

export default function ProblemSolution() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduced, setReduced] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const go = useCallback((i: number) => {
    activeRef.current = i;
    progressRef.current = 0;
    setActive(i);
    setProgress(0);
    setShown(false);
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => setShown(true), 40);
  }, []);

  useEffect(() => () => {
    if (showTimer.current) clearTimeout(showTimer.current);
  }, []);

  const playing = !reduced && !stopped && !hovered;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      const p = progressRef.current + dt / (STEP_SECONDS * 1000);
      if (p >= 1) {
        go((activeRef.current + 1) % steps.length);
      } else {
        progressRef.current = p;
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, go]);

  const fill = Math.min(100, ((active + (active < steps.length - 1 ? progress : 0)) / (steps.length - 1)) * 100);
  const step = steps[active];
  const enter = reduced ? "" : shown ? "translate-y-0" : "translate-y-2";
  const enterArtifact = reduced ? "" : shown ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]";

  return (
    <section
      className="bg-sand py-[clamp(4rem,10vw,7rem)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex flex-col gap-14">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center gap-5">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-heading text-gray-900 leading-[1.08] max-w-[900px] text-balance">
              Sådan hjælper vi vores kunder i gang med AI
            </h2>
            <p className="text-body text-gray-600 max-w-[760px]">
              Det skal ikke være kompliceret at komme i gang med AI. Her er
              hvordan vi arbejder - uanset om I har en konkret use case eller om
              I skal finde ud af hvor I står.
            </p>
          </div>
        </FadeIn>

        {/* Tidslinje */}
        <FadeIn delay={100}>
          <div className="relative grid grid-cols-5 gap-2">
            <div className="absolute top-[27px] left-[10%] right-[10%] h-0.5 rounded bg-gray-200" aria-hidden="true">
              <div className="h-full rounded bg-primary" style={{ width: `${fill}%` }} />
            </div>
            {steps.map((s, i) => {
              const cur = i === active;
              const done = i < active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={cur ? "step" : undefined}
                  aria-label={`Trin ${i + 1}: ${s.title}`}
                  className="relative flex flex-col items-center gap-3.5 bg-transparent"
                >
                  <span
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold border-2 transition-all duration-300 ease-out ${
                      cur
                        ? "bg-primary text-gray-900 border-primary shadow-[0_0_0_8px_rgba(255,154,0,0.15)]"
                        : done
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-400 border-gray-200"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden sm:block text-[15px] font-semibold leading-[1.35] text-center max-w-[180px] text-balance ${
                      cur || done ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Detaljepanel */}
        <FadeIn delay={200}>
          <div className="bg-white border border-gray-200 rounded-[24px] p-[clamp(24px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(28px,4vw,56px)] items-center">
            <div
              className={`flex flex-col gap-[18px] transition-all duration-500 ease-out ${enter}`}
              style={{ opacity: shown ? 1 : 0 }}
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  Trin {String(active + 1).padStart(2, "0")} af {String(steps.length).padStart(2, "0")}
                </p>
                {!reduced && (
                  <button
                    type="button"
                    onClick={() => setStopped((v) => !v)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label={stopped ? "Afspil trinene automatisk" : "Sæt automatisk afspilning på pause"}
                  >
                    {stopped ? "Afspil" : "Pause"}
                  </button>
                )}
              </div>
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-heading text-gray-900 leading-[1.15]">
                {step.title}
              </h3>
              <p className="text-body text-gray-700">{step.body}</p>
              <div className="flex gap-1.5" aria-hidden="true">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1 rounded transition-all duration-300 ${i <= active ? "bg-primary" : "bg-gray-200"}`}
                    style={{ width: i === active ? 32 : 12 }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-[clamp(20px,3vw,32px)] min-h-[300px] flex items-center justify-center">
              <div
                className={`w-full max-w-[420px] transition-all duration-[600ms] ease-out delay-100 ${enterArtifact}`}
                style={{ opacity: shown ? 1 : 0 }}
              >
                {active === 0 && <BookingArtifact />}
                {active === 1 && <OpportunitiesArtifact shown={shown} reduced={reduced} />}
                {active === 2 && <BuildArtifact shown={shown} progress={reduced ? 1 : progress} />}
                {active === 3 && <ResultsArtifact shown={shown} reduced={reduced} />}
                {active === 4 && <SupportArtifact />}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bundrække: statistik + CTA */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap items-center justify-between gap-7">
            <div className="flex items-center gap-5">
              <div className="grid grid-cols-[repeat(10,8px)] gap-1 h-7 shrink-0" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className={`rounded-[3px] ${i < 8 ? "bg-gray-300" : "bg-primary"}`} />
                ))}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">Over 80% af AI-projekter mislykkes</p>
                <p className="text-[15px] text-gray-600">
                  Derfor arbejder vi som vi gør, så I ikke ender i den statistik.{" "}
                  <span className="text-[13px] text-gray-500">Kilde: RAND, 2024</span>
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" href="/kontakt" cal>
              Book en gratis AI-afklaring
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
