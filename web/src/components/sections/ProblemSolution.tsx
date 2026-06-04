"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Vi finder ud af, hvor I står",
    body: "Vi afdækker, undersøger og finder ud af præcis hvor skoen trykker for jer. Nogle gange ligger en konkret use case lige til højrebenet. Andre gange er det første skridt en workshop, undervisning eller bare at få skabt et overblik.",
  },
  {
    number: "02",
    title: "Vi finder den løsning der passer til jer",
    body: "Nogle skal have alt kørende på egne servere. For andre passer en cloud løsning bedre. Vi finder ud af hvad der giver bedst mening hos jer - og bygger altid compliant AI, der overholder GDPR.",
  },
  {
    number: "03",
    title: "Vi bygger første version - hurtigt",
    body: "Det her trin handler mindre om at opfinde AI og mere om at gøre den nyttig hos jer. De stærkeste modeller findes allerede - Claude, GPT, Gemini og en lang række andre. Vores arbejde er at vælge den rette til opgaven og koble den sammen med jeres data, jeres systemer og jeres arbejdsgange, så I får noget der passer ind i jeres hverdag og skaber forretningsværdi.",
  },
  {
    number: "04",
    title: "Vi kigger på hvad der virker",
    body: "Når jeres medarbejdere er begyndt at bruge det, ser vi sammen på hvad der rammer plet, og hvor der skal justeres. AI-løsninger er ikke perfekte fra starten og derfor tilpasser vi undervejs.",
  },
  {
    number: "05",
    title: "Vi tager én ting ad gangen",
    body: "Når den første løsning fungerer i praksis og vi kan se at den skaber forretningsmæssig værdi, kigger vi på hvad det næste skridt er.",
  },
];

export default function ProblemSolution() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header over begge kolonner */}
        <FadeIn>
          <div className="max-w-3xl mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Vi hjælper jer hele vejen
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed">
              Det skal ikke være kompliceret at komme i gang med AI. Her er
              hvordan vi arbejder - uanset om I har en konkret use case eller om
              I skal finde ud af hvor I står.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Venstre — statistik, trin-numre, CTA */}
          <FadeIn>
            <div className="lg:sticky lg:top-28">
              {/* Statistik */}
              <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-100">
                <p className="text-2xl lg:text-3xl font-bold tracking-heading text-primary">
                  Over 80% af AI-projekter mislykkes
                </p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  RAND interviewede dataforskere og ingeniører med mindst fem
                  års AI-erfaring og fandt, at over 80% af AI-projekter ikke
                  leverer den værdi virksomheden forventede - dobbelt så høj
                  fejlrate som almindelige IT-projekter. Derfor arbejder vi som
                  vi gør.
                </p>
                <p className="text-xs text-gray-400 mt-2">Kilde: RAND, 2024</p>
              </div>

              {/* Trin-numre */}
              <div className="flex flex-wrap gap-2 mt-8">
                {steps.map((step, i) => (
                  <button
                    key={step.number}
                    onClick={() => setOpen(i)}
                    aria-label={`Trin ${i + 1}`}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                      open === i
                        ? "bg-primary text-white"
                        : "bg-white text-gray-500 ring-1 ring-gray-200 hover:ring-primary/40"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book et møde i dag
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Højre — accordion */}
          <FadeIn delay={150}>
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={step.number}
                    className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? "ring-2 ring-primary/40" : "ring-1 ring-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-4 min-w-0">
                        <span
                          className={`text-lg font-bold tracking-heading flex-shrink-0 ${
                            isOpen ? "text-primary" : "text-gray-300"
                          }`}
                        >
                          {step.number}
                        </span>
                        <span className="text-base lg:text-lg font-bold tracking-heading text-gray-900 leading-tight">
                          {step.title}
                        </span>
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pl-[3.75rem] text-gray-500 leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
