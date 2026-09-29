import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import SolutionDiagram from "@/components/ui/SolutionDiagram";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import { CASES, KATEGORI, caseMedSlug } from "@/content/cases";
import { FILM_SHOTS, filmPoster } from "@/content/film";

/**
 * En case. Kundens skud fra referencefilmen fylder heroen, og selve casen
 * er tre kapitler med etiketten til venstre og teksten stort til højre.
 * Etiketterne er grå; orange tekst på hvid bund er ude.
 *
 * Casene står i content/cases.ts. Alle sider bygges på forhånd, og en slug,
 * der ikke findes, giver 404.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseData = caseMedSlug(slug);
  if (!caseData) return { title: "Case ikke fundet" };

  return {
    title: caseData.seoTitle || `${caseData.customer}: ${caseData.title}`,
    description: caseData.seoDescription || caseData.kort,
    alternates: { canonical: `/cases/${caseData.slug}` },
    openGraph: {
      title: `${caseData.customer}: ${caseData.title}`,
      description: caseData.seoDescription || caseData.kort,
      url: `/cases/${caseData.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseData.customer}: ${caseData.title}`,
      description: caseData.seoDescription || caseData.kort,
    },
  };
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseData = caseMedSlug(slug);
  if (!caseData) notFound();

  const otherCases = CASES.filter((c) => c.slug !== caseData.slug);

  const skud = caseData.skud ?? null;
  const skudInfo = skud ? FILM_SHOTS.find((f) => f.id === skud) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseData.customer}: ${caseData.title}`,
    description: caseData.challenge,
    datePublished: caseData.publishedAt,
    dateModified: caseData.updatedAt,
    author: {
      "@type": "Organization",
      name: "AI Konsulenterne",
    },
    publisher: { "@id": "https://ai-konsulenterne.dk/#organization" },
    image: skud ? `https://ai-konsulenterne.dk${filmPoster(skud)}` : undefined,
    mainEntityOfPage: `https://ai-konsulenterne.dk/cases/${caseData.slug}`,
    about: {
      "@type": "Organization",
      name: caseData.customer,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://ai-konsulenterne.dk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cases",
        item: "https://ai-konsulenterne.dk/cases",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseData.customer,
        item: `https://ai-konsulenterne.dk/cases/${caseData.slug}`,
      },
    ],
  };

  const kapitler: { etiket: string; indhold: React.ReactNode }[] = [
    {
      etiket: "Udfordringen",
      indhold: (
        <p className="text-balance text-[clamp(1.375rem,2.3vw,2rem)] font-semibold leading-snug tracking-heading text-gray-900">
          {caseData.challenge}
        </p>
      ),
    },
    {
      etiket: "Løsningen",
      indhold: (
        <>
          <p className="max-w-[62ch] text-[1.125rem] leading-relaxed text-gray-700">{caseData.solution}</p>
          <div className="mt-10">
            {slug === "jm-band-ai-agent" ? (
              <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2 border-b border-black/[0.06] bg-gray-50 px-4 py-3" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                </div>
                <Image
                  src="/screenshots/jmband-ai-support-web.png"
                  alt="AI-supportagenten til J.M Band: den søger i vidensbasen og foreslår en løsning"
                  width={2880}
                  height={1405}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 52rem, 100vw"
                />
              </figure>
            ) : (
              <SolutionDiagram category={caseData.category} />
            )}
          </div>
        </>
      ),
    },
    {
      etiket: "Resultatet",
      indhold: <p className="max-w-[62ch] text-[1.125rem] leading-relaxed text-gray-700">{caseData.result}</p>,
    },
  ];

  const fakta: [string, string][] = [
    [caseData.customer, "Kunde"],
    [KATEGORI[caseData.category], "Kategori"],
    ...(skudInfo ? ([[skudInfo.label, "Branche"]] as [string, string][]) : []),
  ];

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <SideHero
        id="case-titel"
        kicker={`Case · ${caseData.customer}`}
        titel={[caseData.title]}
        tekst={caseData.kort}
        primaer={{ label: "Book en samtale", href: "/kontakt" }}
        sekundaer={{ label: "Alle cases", href: "/cases" }}
        skud={skud ? [skud] : []}
        fakta={fakta}
      />

      {/* --- Casen i tre kapitler --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {kapitler.map((k, i) => (
              <FadeIn key={k.etiket}>
                <div className="grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-10">
                  <div className="lg:col-span-3">
                    <p className="text-sm font-semibold tabular-nums text-gray-600">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-2 text-[1.375rem] font-bold tracking-heading text-gray-900">{k.etiket}</h2>
                  </div>
                  <div className="lg:col-span-9">{k.indhold}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Andre cases --- */}
      {otherCases.length > 0 && (
        <section className="section-y bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="kicker text-gray-600">Andre cases</p>
            <h2 className="mt-6 text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-display text-gray-900">
              Mere, vi har bygget.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {otherCases.map((c, i) => {
                const src = c.skud ? filmPoster(c.skud) : null;
                return (
                  <FadeIn key={c.slug} delay={i * 90} className="h-full">
                    <Link
                      href={`/cases/${c.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]"
                    >
                      {src ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <Image
                            src={src}
                            alt={c.customer}
                            fill
                            sizes="(min-width: 768px) 24rem, 100vw"
                            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          />
                        </div>
                      ) : (
                        /* Uden billede: kundens navn på mørk flade i samme format. */
                        <div className="flex aspect-[16/10] items-end bg-ink p-7" aria-hidden="true">
                          <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-display text-white">
                            {c.customer}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-[0.8125rem] font-semibold text-gray-600">
                          {c.customer} · {KATEGORI[c.category]}
                        </p>
                        <h3 className="mt-2 text-lg font-bold leading-snug tracking-heading text-gray-900">{c.title}</h3>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-gray-900">
                          <span className="understreg">Læs casen</span>
                          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <TalMedAlexander titel="Skal vi bygge noget lignende til jer?" />
    </>
  );
}
