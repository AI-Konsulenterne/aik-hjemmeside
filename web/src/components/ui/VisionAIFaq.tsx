"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Hvordan adskiller VisionAI sig fra ChatGPT?",
    a: "VisionAI føles som ChatGPT, men er forankret i jeres egen forretningsdata og integrerer med jeres systemer. Det betyder præcise, relevante svar baseret på jeres dokumenter, processer og viden.",
  },
  {
    q: "Er vores data sikker?",
    a: "Ja. Al data opbevares i EU med fuld GDPR-compliance. Vi deler ALDRIG jeres data med OpenAI, Anthropic eller andre AI-udbydere.",
  },
  {
    q: "Hvor lang tid tager implementeringen?",
    a: "Implementeringen tager cirka to uger, hvorefter vi kører en testperiode sammen med jer.",
  },
  {
    q: "Hvilke systemer kan VisionAI integrere med?",
    a: "VisionAI integrerer med SharePoint, Microsoft 365, Slack, DeepL, API'er og mere. Vi hjælper jer med at forbinde de systemer der er vigtige for jeres virksomhed.",
  },
  {
    q: "Kan vi vælge forskellige AI-modeller?",
    a: "Ja. VisionAI er multi-model, så I kan vælge og kombinere ChatGPT, Claude, Gemini eller egne modeller. Vi hjælper jer med at sende opgaver til den bedste model for kvalitet og pris.",
  },
];

export default function VisionAIFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
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
                <svg
                  className="w-3.5 h-3.5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14M5 12h14"
                  />
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
        );
      })}
    </div>
  );
}
