import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SubpageCTA from "@/components/sections/SubpageCTA";
import { getCases, type Case } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "AI Cases Danske Virksomheder | Konkrete Resultater",
  description:
    "Se konkrete AI-cases fra danske virksomheder: Lavazza HR-agent, Wunderwear webshop-automatisering, INDKOM og flere. Resultater I kan måle.",
  alternates: { canonical: "/cases" },
  keywords: [
    "AI cases Danmark",
    "AI implementering eksempler",
    "AI case study",
    "danske AI projekter",
    "Lavazza AI HR",
    "Wunderwear AI",
  ],
  openGraph: {
    title: "AI Cases — Konkrete Resultater fra Danske Virksomheder",
    description:
      "Lavazza, Wunderwear, INDKOM, J.M Band — se hvordan de bruger AI til at spare tid.",
    url: "/cases",
  },
};

const categoryLabels: Record<Case["category"], string> = {
  "intern-ai": "Intern AI",
  webshop: "E-commerce",
  vidensbase: "Vidensbase",
  hr: "HR / Intern AI",
  andet: "AI-løsning",
};

function splitResult(result: string): string[] {
  return result
    .split(/\n+/)
    .map((s) => s.replace(/^[-•*]\s*/, "").trim())
    .filter((s) => s.length > 0)
    .slice(0, 3);
}

function CaseCard({ c }: { c: Case }) {
  return (
    <Link
      href={`/cases/${c.slug}`}
      className="group block bg-white rounded-2xl p-8 lg:p-10 ring-1 ring-gray-100 hover:ring-primary/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Left — customer + challenge + solution */}
        <div className="lg:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold mb-3">
            {categoryLabels[c.category]}
          </p>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900 group-hover:text-primary transition-colors">
            {c.customer}
          </h3>
          <div className="mt-5 space-y-3 text-gray-500 leading-relaxed text-[15px]">
            <p>
              <span className="font-semibold text-gray-900">Udfordring: </span>
              {c.challenge}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Løsning: </span>
              {c.solution}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold mt-6 group-hover:gap-2.5 transition-all">
            Læs hele casen
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>

        {/* Right — results */}
        <div className="flex flex-col gap-3 lg:border-l lg:border-gray-100 lg:pl-8">
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-semibold">
            Resultater
          </p>
          {splitResult(c.result).map((line) => (
            <div
              key={line}
              className="bg-gray-50 rounded-xl px-4 py-3.5"
            >
              <p className="text-[15px] lg:text-base font-bold text-gray-900 tracking-heading leading-snug">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default async function Cases() {
  const allCases = await getCases().catch(() => [] as Case[]);

  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(2rem,5vw,4rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                Kundehistorier
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Konkrete resultater fra vores kunder
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                Vi lader resultaterne tale for sig selv. Her er et udvalg af
                virksomheder vi har hjulpet med AI.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {allCases.length === 0 && (
        <section className="pb-[clamp(3rem,8vw,6rem)]">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100">
              <p className="text-gray-500 leading-relaxed">
                Cases indlæses lige nu. Tjek igen om et øjeblik.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* All cases — unified design */}
      {allCases.length > 0 && (
        <section className="pb-[clamp(3rem,8vw,6rem)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:gap-6">
              {allCases.map((c, i) => (
                <FadeIn key={c.id} delay={i * 80}>
                  <CaseCard c={c} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <SubpageCTA
        heading="Klar til at blive den næste case?"
        description="Book en gratis AI-afklaring og find ud af hvad AI kan gøre for jeres virksomhed."
      />
    </>
  );
}
