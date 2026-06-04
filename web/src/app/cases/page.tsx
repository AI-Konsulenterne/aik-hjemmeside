import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import SubpageCTA from "@/components/sections/SubpageCTA";
import { getCases, strapiImageUrl, type Case } from "@/lib/strapi";

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

// Kunde-logoer vi har liggende
const logoMap: { match: string; logo: string }[] = [
  { match: "lavazza", logo: "/logos/lavazza.png" },
  { match: "indkom", logo: "/logos/indkom.png" },
  { match: "j.m band", logo: "/logos/jmband.png" },
  { match: "jmband", logo: "/logos/jmband.png" },
  { match: "wunderwear", logo: "/logos/wunderwear.svg" },
  { match: "stretchfit", logo: "/logos/stretchfit.png" },
];

function logoFor(customer: string): string | null {
  const k = customer.toLowerCase();
  return logoMap.find((m) => k.includes(m.match))?.logo ?? null;
}

// Bløde, brand-venlige kort-farver der roterer
const cardColors = ["bg-primary/10", "bg-gray-100", "bg-primary/5", "bg-gray-50"];

function CaseCard({ c, index }: { c: Case; index: number }) {
  const logo = logoFor(c.customer);
  const image = strapiImageUrl(c.image);
  const color = cardColors[index % cardColors.length];

  return (
    <Link href={`/cases/${c.slug}`} className="group block h-full">
      <div
        className={`${color} rounded-3xl overflow-hidden h-full flex flex-col ring-1 ring-gray-100/50 hover:shadow-lg transition-shadow duration-300`}
      >
        {/* Billede (hvis uploadet i Strapi) */}
        {image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={image}
              alt={c.customer}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-8 flex flex-col flex-grow min-h-[280px]">
          {/* Top: logo/navn + pil */}
          <div className="flex items-start justify-between gap-4">
            {logo ? (
              <div className="relative h-8 w-32">
                <Image
                  src={logo}
                  alt={c.customer}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <span className="text-lg font-bold tracking-heading text-gray-900">
                {c.customer}
              </span>
            )}
            <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-900/20 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-colors">
              <svg
                className="w-4 h-4 text-gray-900 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
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

          {/* Bund: kategori + titel */}
          <div className="mt-auto pt-10">
            <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold mb-2">
              {categoryLabels[c.category]}
            </p>
            <h3 className="text-xl lg:text-2xl font-bold tracking-heading text-gray-900 leading-snug">
              {c.title}
            </h3>
          </div>
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

      {/* Cases — farvede kort i grid */}
      {allCases.length > 0 && (
        <section className="pb-[clamp(3rem,8vw,6rem)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCases.map((c, i) => (
                <FadeIn key={c.id} delay={i * 80}>
                  <CaseCard c={c} index={i} />
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
