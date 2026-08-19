import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Forsidens hero — kun typografi.
 *
 * Bevidst uden portrætkort, uden glød og uden centrering: filmen lige nedenfor
 * er sidens billede, og to visuelle elementer over folden slår hinanden ihjel.
 * Anden sætning står i grå, så pointen læses som en tilføjelse man siger
 * henkastet — ikke som endnu et råb.
 */
export default function HeroEnterprise() {
  return (
    <section className="relative border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="pt-[clamp(3.5rem,8vw,7rem)] pb-[clamp(3rem,6vw,5rem)]">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="lamp" data-lit="true" aria-hidden="true" />
              <p className="kicker text-gray-600">AI Konsulenterne</p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <h1 className="mt-8 max-w-[19ch] text-[clamp(2.75rem,7.2vw,6.5rem)] font-bold leading-[0.95] tracking-display text-gray-900">
              Vi bygger AI til Danmarks største virksomheder.{" "}
              <span className="text-gray-300">Og et par af verdens største.</span>
            </h1>
          </FadeIn>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <FadeIn delay={160}>
              <p className="max-w-[46ch] text-base leading-relaxed text-gray-600 lg:text-lg">
                Nogle er kunder. Hos andre har vores folk siddet på indersiden og
                bygget systemerne selv. Begge dele har lært os det samme: det
                svære ved AI er ikke modellen — det er at få den ind i en
                hverdag, hvor folk allerede har travlt.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
                <p className="max-w-[34ch] text-base leading-relaxed text-gray-600">
                  Vi bygger det samme håndværk til virksomheder med tolv
                  ansatte. Det er størstedelen af vores kunder.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                  >
                    Book en gratis AI-afklaring
                  </Link>
                  <Link
                    href="/referencer"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                  >
                    Se hvad vi har bygget
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-precise group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
