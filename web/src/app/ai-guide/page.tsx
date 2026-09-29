import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import LeadMagnetForm from "@/components/ui/LeadMagnetForm";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SektionHoved from "@/components/side/SektionHoved";

export const metadata: Metadata = {
  title: "Gratis AI-analyse til jeres virksomhed",
  description:
    "Mange virksomheder ved ikke hvor de skal starte med AI. Få en gratis AI-analyse og konkrete forslag til hvor AI kan spare jer tid. Uden buzzwords.",
  alternates: { canonical: "/ai-guide" },
  openGraph: {
    title: "Gratis AI-analyse | AI Konsulenterne",
    description:
      "Svært ved at komme i gang med AI? Få en gratis AI-analyse med konkrete forslag til jeres første use case.",
  },
};

/**
 * Gratis AI-analyse. En side med én opgave: få formularen udfyldt. Den
 * står derfor i heroen, på et hvidt kort over den mørke flade, og teksten
 * ved siden af siger præcis, hvad man får og hvor hurtigt. Løfterne er
 * formularens egne: fire trin, 30 sekunder, tre use cases på mail inden
 * for en time.
 *
 * Under heroen: hvad der sker med svarene, og Alexander til dem, der
 * hellere vil tale med et menneske.
 */

const FAAR = [
  "Tre konkrete forslag til jeres første AI use case",
  "Et bud på, hvor I kan spare mest tid",
  "De mest almindelige fejl, og hvordan I undgår dem",
];

const FAKTA: [string, string][] = [
  ["4 korte trin", "tager 30 sekunder"],
  ["3 use cases", "skrevet til jer"],
  ["Inden for en time", "i jeres indbakke"],
  ["Gratis", "og uforpligtende"],
];

const FORLOEB: [string, string][] = [
  [
    "I svarer på fire spørgsmål",
    "Branche, størrelse, hvor tiden går hen, og hvilke systemer I bruger. Det er de samme spørgsmål, vi stiller vores kunder, når vi finder ud af, hvor skoen trykker.",
  ],
  [
    "I får tre forslag på mail",
    "Inden for en time har I tre konkrete use cases, der passer til jeres branche og jeres systemer, og et bud på, hvor I sparer mest tid.",
  ],
  [
    "I bestemmer, hvad der sker nu",
    "Brug forslagene selv, eller tag en snak med os om den, der lyder mest interessant. Sæt kryds ved \"Ring mig op og book direkte\", så ringer vi.",
  ],
];

export default function AIGuide() {
  return (
    <>
      {/* --- Hero med formularen --- */}
      <section
        aria-labelledby="guide-titel"
        data-header="moerk"
        className="relative -mt-16 overflow-hidden bg-ink lg:-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18rem] top-[8rem] h-[52rem] w-[52rem] bg-[radial-gradient(closest-side,rgba(255,154,0,0.11),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 lg:pt-6">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-white/85">Gratis AI-analyse</p>
              </div>
              <h1
                id="guide-titel"
                className="mt-6 text-balance text-[clamp(2.6rem,5.4vw,4.75rem)] font-bold leading-[1.0] tracking-display text-white"
              >
                Hvor skal I starte med AI?
              </h1>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
                Mange vil gerne bruge AI, men ved ikke, hvilken opgave de skal tage fat på først.
                Svar på fire korte spørgsmål, så sender vi jer tre konkrete forslag til, hvor AI
                kan spare jer mest tid.
              </p>
              <ul className="mt-9 space-y-3.5">
                {FAAR.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[1rem] leading-snug text-white/85">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-none text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <FadeIn delay={150} className="lg:col-span-6">
              <div className="rounded-3xl bg-white p-7 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.8)] sm:p-9">
                <LeadMagnetForm />
              </div>
            </FadeIn>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4 lg:mt-24">
            {FAKTA.map(([vaerdi, label]) => (
              <div key={vaerdi} className="flex flex-col-reverse gap-1">
                <dt className="text-sm leading-snug text-white/65">{label}</dt>
                <dd className="text-[1.375rem] font-bold leading-none tracking-heading text-white">{vaerdi}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Sådan foregår det --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Sådan foregår det"
            titel="Fra fire svar til tre forslag."
            tekst="I skal ikke vide noget om AI på forhånd. Det er vores job at finde ud af, hvor det kan betale sig."
          />
          <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3 lg:mt-20">
            {FORLOEB.map(([titel, tekst], i) => (
              <li key={titel}>
                <FadeIn delay={i * 90}>
                  <div className="border-t border-gray-300 pt-6">
                    <p className="text-sm font-semibold tabular-nums text-gray-500">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold leading-tight tracking-heading text-gray-900">
                      {titel}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-gray-600">{tekst}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TalMedAlexander
        kicker="Hellere tale sammen?"
        titel="Ring til Alexander i stedet."
        tekst="Vil I hellere tale med et menneske end udfylde en formular, så book en gratis AI-afklaring. 45 minutter, og I skal ikke forberede noget."
      />
    </>
  );
}
