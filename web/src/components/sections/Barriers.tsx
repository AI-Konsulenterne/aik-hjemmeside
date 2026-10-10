"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * "Kender du den her følelse?" som lille selvtest (design-handoff "Kender I den følelse").
 * Kunden vælger de udfordringer, de kan genkende. På desktop fylder en måler op i
 * panelet til højre, og vores svar glider ind. På mobil vises svaret direkte under
 * det valgte kort, så man ikke skal scrolle efter det.
 */

const barriers = [
  {
    quote: "Vi ved godt AI er vigtigt, men vi aner ikke hvor vi skal starte",
    answer: "Vi kortlægger jeres processer og finder de 2-3 største muligheder.",
  },
  {
    quote: "Vi har ingen AI-kompetencer in-house",
    answer: "Vi fungerer som jeres eksterne AI-partner, så I ikke behøver at besidde kompetencerne.",
  },
  {
    quote: "Vi ved ikke hvad vores første use case skal være",
    answer: "Vi afdækker, undersøger og finder den use case, der giver bedst mening for jer.",
  },
  {
    quote: "Der er 100 AI-platforme - hvilken skal vi vælge?",
    answer: "Vi ved, hvor de forskellige platforme brillerer, og har testet dem alle, så vi skal nok hjælpe jer med at finde den platform, der passer bedst til jeres behov.",
  },
  {
    quote: "Vores medarbejdere kommer aldrig til at bruge det",
    answer: "Hvis jeres medarbejdere ikke ser værdi i værktøjerne, bruger de dem ikke. Derfor hjælper vi jer med at lægge en konkret plan for at få AI ud at leve i organisationen.",
  },
];

// Så mange kort er valgt ved load, så panelet ikke starter tomt.
const PRESELECT = 1;

function Check({ size, stroke, className = "" }: { size: number; stroke: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Barriers() {
  const [selected, setSelected] = useState<number[]>(() =>
    Array.from({ length: PRESELECT }, (_, i) => i),
  );
  const [fresh, setFresh] = useState(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function toggle(i: number) {
    const on = selected.includes(i);
    setSelected(on ? selected.filter((x) => x !== i) : [...selected, i].sort((a, b) => a - b));
    if (timer.current) clearTimeout(timer.current);
    if (on) {
      setFresh(-1);
    } else {
      setFresh(i);
      timer.current = setTimeout(() => setFresh(-1), 40);
    }
  }

  const count = selected.length;
  const enter = (i: number) =>
    fresh === i ? "opacity-0 motion-safe:translate-y-2" : "opacity-100 translate-y-0";

  return (
    <section className="bg-sand py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-[1180px] mx-auto px-6 flex flex-col gap-14">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center gap-[18px]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Kender du den her følelse?
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-heading text-gray-900 leading-[1.08] max-w-[900px] text-balance">
              Det er ikke AI der er svært. Det er at vide hvor man skal starte.
            </h2>
            <p className="text-body text-gray-600 max-w-[640px]">
              De fleste virksomheder vi møder, sidder med de samme fem
              udfordringer. Kan I genkende nogen af dem?
            </p>
          </div>
        </FadeIn>

        {/* Hovedgrid */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,3vw,40px)] items-start">
            {/* Venstre: udfordringer */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-500 pl-1">Klik på dem, I kan genkende</p>
              {barriers.map((b, i) => {
                const on = selected.includes(i);
                return (
                  <button
                    key={b.quote}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className={`text-left bg-white rounded-2xl px-6 py-[22px] border transition-all duration-[250ms] ease-out motion-safe:hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
                      on
                        ? "border-primary shadow-[0_0_0_4px_rgba(255,154,0,0.12)]"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="grid grid-cols-[minmax(0,1fr)_32px] gap-5 items-center">
                      <span className="font-semibold italic text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.4] text-gray-900">
                        &quot;{b.quote}&quot;
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-[250ms] ${
                          on ? "bg-primary border-primary text-white" : "bg-white border-gray-300 text-transparent"
                        }`}
                      >
                        <Check size={16} stroke={3} />
                      </span>
                    </span>
                    {/* Mobil: svaret vises direkte under kortet */}
                    {on && (
                      <span
                        className={`lg:hidden mt-4 pt-4 border-t border-gray-200 flex gap-3 items-start transition-all duration-500 ease-out ${enter(i)}`}
                      >
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={14} stroke={2.5} />
                        </span>
                        <span className="text-base leading-relaxed text-gray-700">{b.answer}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Højre: svar + vores tilgang */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              <div className="bg-white border border-gray-200 rounded-[24px] p-[clamp(24px,3vw,36px)] flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                    Sådan løser vi det
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">{count} af 5</p>
                </div>
                <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <span
                      key={k}
                      className={`h-1.5 rounded-md transition-colors duration-300 ease-out ${
                        k < count ? "bg-primary" : "bg-gray-100"
                      }`}
                      style={{ transitionDelay: `${k * 40}ms` }}
                    />
                  ))}
                </div>

                <div className="hidden lg:block" aria-live="polite">
                  {count === 0 ? (
                    <div className="flex items-start gap-4 pt-7 pb-3">
                      <span className="w-10 h-10 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m12 19-7-7 7-7" />
                          <path d="M19 12H5" />
                        </svg>
                      </span>
                      <p className="text-[17px] leading-relaxed text-gray-600 max-w-[360px]">
                        Vælg de udfordringer, I kender, så viser vi, hvordan vi
                        tager os af dem.
                      </p>
                    </div>
                  ) : (
                    <ul>
                      {selected.map((i, k) => (
                        <li
                          key={i}
                          className={`grid grid-cols-[28px_minmax(0,1fr)] gap-3.5 py-[18px] transition-all duration-500 ease-out ${
                            k > 0 ? "border-t border-gray-200" : ""
                          } ${enter(i)}`}
                        >
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center mt-0.5">
                            <Check size={14} stroke={2.5} />
                          </span>
                          <span>
                            <span className="block text-[13px] font-semibold italic leading-[1.4] text-gray-400">
                              &quot;{barriers[i].quote}&quot;
                            </span>
                            <span className="block text-base leading-relaxed text-gray-700 mt-1">
                              {barriers[i].answer}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-[24px] p-[clamp(24px,3vw,36px)] flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Vores tilgang</p>
                <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-white leading-[1.3]">
                  I behøver ikke have svarene.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                  Det er præcis derfor vi findes. Så lad os tage en god snak og
                  se hvor I står.
                </p>
                <div className="pt-3">
                  <Button variant="primary" size="lg" href="/kontakt" cal>
                    Book en gratis AI-afklaring
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
