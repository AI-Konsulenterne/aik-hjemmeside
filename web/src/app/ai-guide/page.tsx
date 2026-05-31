import type { Metadata } from "next";
import GuideForm from "@/components/ui/GuideForm";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Gratis AI-analyse — find jeres første use case",
  description:
    "Mange virksomheder ved ikke hvor de skal starte med AI. Få en gratis AI-analyse og konkrete forslag til hvor AI kan spare jer tid — uden buzzwords.",
  alternates: { canonical: "/ai-guide" },
  openGraph: {
    title: "Gratis AI-analyse — AI Konsulenterne",
    description:
      "Svært ved at komme i gang med AI? Få en gratis AI-analyse med konkrete forslag til jeres første use case.",
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
                  Gratis AI-analyse
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                  Svært ved at komme i gang med AI? Få en gratis AI-analyse
                </h1>
                <p className="text-lg text-gray-500 mt-6 leading-relaxed">
                  Vi oplever at rigtig mange virksomheder gerne vil bruge AI -
                  men ikke ved hvor de skal starte, eller hvilken opgave de skal
                  tage fat på først. Fortæl os kort om jer, så vender vi tilbage
                  med en konkret analyse af hvor AI kan skabe mest værdi for jer.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "Konkrete forslag til jeres første AI-use case",
                    "Et bud på hvor I kan spare mest tid",
                    "De mest almindelige fejl - og hvordan I undgår dem",
                    "Uforpligtende og helt gratis",
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
