"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "Vi har ikke en IT-afdeling - kan vi stadig få AI?",
    a: "Ja - og I er faktisk i godt selskab. Det er størstedelen af vores kunder. I behøver hverken IT-folk eller intern AI-viden for at komme i gang, det er det vi er her til. Vi sætter det op, viser jer hvordan det bruges, og er der hvis noget driller. Når I efter et stykke tid selv har styr på det, er det også fint.",
  },
  {
    q: "Hvilke platforme bruger I?",
    a: "Vi er ikke gift med én leverandør. Vi bruger det der passer bedst til opgaven - Azure OpenAI, Claude, Gemini, åbne modeller, eller en kombination. Vi sælger ikke licenser, vi løser opgaver. Så vi vælger det værktøj der gør jobbet bedst.",
  },
  {
    q: "Hvordan sikrer I at medarbejderne faktisk bruger løsningen?",
    a: "Det er nok det sværeste i hele AI-historien - og det er der de fleste projekter falder fra hinanden. Vi bygger løsningen ind i de værktøjer folk bruger i forvejen, så den ikke ligger som en ekstra fane de skal huske at åbne. Efter lancering kigger vi sammen på hvem der bruger det, hvem der ikke gør, og hvor der skal justeres. Hvis ingen bruger løsningen, har vi ikke leveret den.",
  },
  {
    q: "Er det GDPR-sikkert?",
    a: "Ja. Det er faktisk en af de første ting vi tjekker af. Vi bygger altid setups der overholder GDPR - jeres data ender ikke i åbne modeller, og bliver ikke brugt til at træne noget. Kort version: jeres data går ikke ud at vandre. Hvor strengt setuppet skal være, kommer an på jer - nogle kører fint med en cloud-løsning og en tydelig databehandleraftale, andre vil have alt liggende internt. Vi finder ud af hvad der passer til jer.",
  },
  {
    q: "Hvad koster det?",
    a: "Det kommer an på hvad vi bygger - og det ville være useriøst at give et tal her uden at have set jeres setup. Workshops starter typisk omkring 25.000 kr. Mindre AI-løsninger ligger fra 50.000 kr og opefter. Efter første snak ved vi nok til at give jer en fast pris, så I ved præcis hvad I siger ja til.",
  },
  {
    q: "Kan vi ikke bare bruge ChatGPT?",
    a: "Selvfølgelig kan I det - vi bruger den også selv. ChatGPT er fin til de hurtige opgaver: en mail, et resumé, et oplæg. Men når I rammer et reelt behov i forretningen - noget der kræver jeres egne data, jeres systemer eller en proces der skal køre af sig selv - så er en standardchat ikke nok. Der bygger vi noget der løser den specifikke ting, ikke en generisk chat oveni.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Spørgsmål vi ofte får
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1]">
            De vigtigste spørgsmål - besvaret
          </h2>
        </FadeIn>

        <div className="mt-12 lg:mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base lg:text-lg font-bold tracking-heading text-gray-900 leading-tight">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      <svg className="w-3.5 h-3.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={400}>
          <p className="text-center mt-10 text-sm text-gray-500">
            Har du andre spørgsmål?{" "}
            <a href="tel:+4525547074" className="text-primary font-semibold hover-underline">
              Ring til Alexander på +45 25 54 70 74
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
