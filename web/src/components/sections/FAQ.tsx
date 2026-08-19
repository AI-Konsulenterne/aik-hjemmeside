"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { FAQS } from "@/content/faq";

/**
 * Spørgsmål vi ofte får.
 *
 * Var seks afrundede kort med en grå cirkel og et plus i. Nu: hårfine
 * streger og et typografisk plus. Ingen kasser, ingen skygger.
 *
 * Overskriften står i venstre spalte og bliver stående mens svarene folder
 * sig ud — så er der noget at læse på begge sider af siden, og de lange
 * svar behøver ikke være centrerede for at fylde bredden ud.
 *
 * Indholdet kommer fra src/content/faq.ts, som forsidens JSON-LD også
 * læser fra.
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="grid-field section-y relative overflow-hidden bg-gray-50">
      <div
        aria-hidden="true"
        className="amber-cast amber-cast-soft bottom-[-16rem] right-[-10rem] h-[36rem] w-[36rem]"
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-gray-600">Spørgsmål vi ofte får</p>
              </div>

              <h2 className="mt-8 max-w-[14ch] text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det I plejer at spørge om
              </h2>

              <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-gray-600">
                Er der noget der ikke står her, så tager Alexander telefonen.
              </p>

              <a
                href="tel:+4525547074"
                className="mt-6 inline-block text-base font-semibold text-gray-900 transition-colors hover:text-primary"
              >
                +45 25 54 70 74
              </a>
            </div>
          </FadeIn>

          <div className="border-t border-gray-200">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <FadeIn key={faq.q} delay={i * 50}>
                  <div className="border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full cursor-pointer items-start justify-between gap-8 py-6 text-left"
                    >
                      <span className="text-base font-semibold leading-snug tracking-heading text-gray-900 transition-colors group-hover:text-primary lg:text-lg">
                        {faq.q}
                      </span>
                      {/* Plusset er sat, ikke tegnet. Det drejer til et kryds. */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-xl leading-none text-gray-800 transition-transform duration-300 ease-precise ${
                          isOpen ? "rotate-45 text-primary" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pb-7 pr-8 text-[0.95rem] leading-relaxed text-gray-600">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
