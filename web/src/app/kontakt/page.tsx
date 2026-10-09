import type { Metadata } from "next";
import CallbackForm from "@/components/ui/CallbackForm";
import TeamStrip from "@/components/sections/TeamStrip";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: { absolute: "Kontakt AI Konsulenterne - book gratis AI-afklaring" },
  description:
    "Book en gratis 30-minutters AI-afklaring med Alexander. Ingen forpligtelse - finder vi ikke en mulighed, koster det ingenting. Ring +45 25 54 70 74.",
  alternates: { canonical: "/kontakt" },
  keywords: [
    "kontakt AI konsulent",
    "book AI møde",
    "AI afklaring gratis",
    "AI rådgivning København",
  ],
  openGraph: {
    title: "Kontakt - book en gratis AI-afklaring",
    description:
      "30 min gratis AI-afklaring med Alexander. Ingen forberedelse, ingen forpligtelse.",
    url: "/kontakt",
  },
};

export default function Kontakt() {
  return (
    <>
      <section className="pt-[clamp(3.5rem,9vw,7rem)] pb-[clamp(3.5rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-12 lg:gap-y-0 items-start">
            {/* Venstre: tekst og telefon */}
            <div>
              <FadeIn>
                <h1 className="text-[2.125rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold tracking-heading text-gray-900 leading-[1.08] text-balance">
                  Book en gratis AI-afklaring
                </h1>
                <p className="text-lead text-gray-700 mt-6 max-w-xl">
                  30 minutter med Alexander, hvor vi finder ud af, hvordan vi kan
                  hjælpe jer med AI.
                </p>
                <ul className="mt-6 space-y-3 max-w-xl">
                  {[
                    "I skal ikke forberede noget. I fortæller, vi spørger.",
                    "Vi finder sammen 1-2 steder, hvor AI kan spare jer tid.",
                    "Giver det ikke mening for jer endnu, siger vi det ærligt.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-body text-gray-700">
                      <span className="mt-[0.55em] inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                  <a
                    href="tel:+4525547074"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Ring direkte +45 25 54 70 74
                  </a>
                  <a
                    href="mailto:kontakt@ai-konsulenterne.dk"
                    className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                  >
                    Eller skriv til kontakt@ai-konsulenterne.dk
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Højre: ring-op-formular. På mobil lige efter teksten, før teamet. */}
            <FadeIn delay={200} className="lg:row-span-2">
              <CallbackForm />
            </FadeIn>

            {/* Teamet: under teksten på desktop, under formularen på mobil */}
            <FadeIn delay={150} className="lg:col-start-1 lg:row-start-2 lg:mt-12">
              <TeamStrip columns={2} className="pt-10 border-t border-gray-100" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            AI Konsulenterne - CVR: 45569241
          </p>
        </div>
      </section>
    </>
  );
}
