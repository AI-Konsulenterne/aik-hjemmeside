import type { Metadata } from "next";
import GuideForm from "@/components/ui/GuideForm";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Hjælp til AI — kom i gang og find jeres første use case",
  description:
    "Mange virksomheder ved ikke hvor de skal starte med AI. Download vores gratis guide og find det rigtige første use case for jer — uden buzzwords.",
  alternates: { canonical: "/ai-guide" },
  openGraph: {
    title: "Hjælp til AI — AI Konsulenterne",
    description:
      "Svært ved at komme i gang med AI? Vores gratis guide hjælper jer med at vælge det rigtige første use case. Download gratis.",
  },
};

export default function AIGuide() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <FadeIn>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                  Hjælp til AI
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                  Svært ved at komme i gang med AI? Start med det rigtige use case
                </h1>
                <p className="text-lg text-gray-500 mt-6 leading-relaxed">
                  Vi oplever at rigtig mange virksomheder gerne vil bruge AI —
                  men ikke ved hvor de skal starte, eller hvilken opgave de skal
                  tage fat på først. Denne gratis guide hjælper jer med at finde
                  det første use case der giver mest værdi for netop jer.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "Sådan finder I det rigtige første AI-use case",
                    "De spørgsmål vi stiller for at afdække potentialet",
                    "5 konkrete AI-muligheder for danske virksomheder",
                    "De mest almindelige fejl — og hvordan I undgår dem",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-primary mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={200}>
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
                <GuideForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
