"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { faqs } from "./faqData";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-sand py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Spørgsmål vi ofte får
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1]">
            Hvad er vores kunder nysgerrige på?
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
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-sand/50 transition-colors"
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
                      <p className="px-6 pb-6 text-body text-gray-700">
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
          <p className="text-center mt-10 text-body-sm text-gray-600">
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
