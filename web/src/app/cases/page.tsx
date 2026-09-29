import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SektionHoved from "@/components/side/SektionHoved";
import { CASES, KATEGORI, type Case } from "@/content/cases";
import { filmPoster } from "@/content/film";

export const metadata: Metadata = {
  title: "AI-cases fra danske virksomheder",
  description:
    "Se konkrete AI-cases fra danske virksomheder, blandt andet HR-agenten hos Lavazza. Hvad vi byggede, og hvad det gav.",
  alternates: { canonical: "/cases" },
  keywords: [
    "AI cases Danmark",
    "AI implementering eksempler",
    "AI case study",
    "danske AI projekter",
    "Lavazza AI HR",
  ],
  openGraph: {
    title: "AI-cases: konkrete resultater fra danske virksomheder",
    description:
      "Se hvordan danske virksomheder som Lavazza bruger AI til at spare tid.",
    url: "/cases",
  },
};

/**
 * Cases. Casene står i content/cases.ts; siden bestemmer, hvordan de står.
 *
 * Før: farvede kort med orange flader og en "Bliv den næste case"-grafik
 * med netværksprikker. Nu: en mørk hero og casene som store rækker, hver
 * med kundens billede fra referencefilmen (se content/cases.ts), kunde og
 * kategori, titel og udfordringen, skiftevis til venstre og højre. Uden
 * billede står casen som tekst i fuld bredde.
 *
 * Casene står i content/cases.ts: Lavazza, J.M Band og Wunderwear.
 */

function Billede({ c, prioritet }: { c: Case; prioritet: boolean }) {
  const src = c.skud ? filmPoster(c.skud) : null;
  if (!src) return null;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100">
      <Image
        src={src}
        alt={c.customer}
        fill
        priority={prioritet}
        sizes="(min-width: 1024px) 40rem, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
}

export default function Cases() {
  const alle = CASES;

  return (
    <>
      {/* --- Hero --- */}
      <section
        aria-labelledby="cases-titel"
        data-header="moerk"
        className="relative -mt-16 overflow-hidden bg-ink lg:-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[16rem] -top-[6rem] h-[46rem] w-[46rem] bg-[radial-gradient(closest-side,rgba(255,154,0,0.1),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker text-white/85">Cases</p>
          </div>
          <h1
            id="cases-titel"
            className="mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.0] tracking-display text-white"
          >
            Det har vi bygget.
          </h1>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <p className="max-w-[50ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
              Rigtige løsninger hos rigtige virksomheder. Hvad de kæmpede med, hvad vi byggede,
              og hvad det gav.
            </p>
            <div className="flex flex-none flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button href="/kontakt" size="lg">
                Book en samtale
              </Button>
              <Button href="/referencer" size="lg" variant="ghost">
                Se alle referencer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Casene --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ol className="space-y-20 lg:space-y-28">
              {alle.map((c, i) => {
                const harBillede = !!c.skud;
                const spejlet = i % 2 === 1;
                return (
                  <li key={c.slug}>
                    <FadeIn>
                      <Link
                        href={`/cases/${c.slug}`}
                        className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
                      >
                        {harBillede && (
                          <div className={`lg:col-span-7 ${spejlet ? "lg:order-2" : ""}`}>
                            <Billede c={c} prioritet={i === 0} />
                          </div>
                        )}
                        <div className={harBillede ? "lg:col-span-5" : "lg:col-span-9"}>
                          <p className="kicker text-gray-600">
                            {c.customer} · {KATEGORI[c.category]}
                          </p>
                          <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.06] tracking-display text-gray-900">
                            {c.title}
                          </h2>
                          <p className="mt-5 line-clamp-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-gray-600">
                            {c.challenge}
                          </p>
                          <span className="mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-gray-900">
                            <span className="understreg">Læs casen</span>
                            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                              →
                            </span>
                          </span>
                        </div>
                      </Link>
                    </FadeIn>
                  </li>
                );
              })}
            </ol>
        </div>
      </section>

      {/* --- Referencer --- */}
      <section className="section-y-tight border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Flere kunder"
            titel="Ikke alle projekter bliver til en case."
            tekst="Under referencer står de virksomheder, vi har bygget til, fra kaffe og kirker til vindmøller og festivalarmbånd."
          >
            <Link href="/referencer" className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-gray-900">
              <span className="understreg">Se alle referencer</span>
              <span aria-hidden="true">→</span>
            </Link>
          </SektionHoved>
        </div>
      </section>

      <TalMedAlexander titel="Bliv den næste case." />
    </>
  );
}
