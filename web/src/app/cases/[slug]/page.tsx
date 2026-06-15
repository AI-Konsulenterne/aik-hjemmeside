import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import SubpageCTA from "@/components/sections/SubpageCTA";
import SolutionDiagram from "@/components/ui/SolutionDiagram";
import {
  getCaseBySlug,
  getCases,
  strapiImageUrl,
  type Case,
} from "@/lib/strapi";
import { renderMarkdown } from "@/lib/markdown";

type Params = { slug: string };

const categoryLabels: Record<Case["category"], string> = {
  "intern-ai": "Intern AI",
  webshop: "E-commerce",
  vidensbase: "Vidensbase",
  hr: "HR / Intern AI",
  andet: "AI-løsning",
};

export async function generateStaticParams(): Promise<Params[]> {
  const cases = await getCases().catch(() => []);
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseData = await getCaseBySlug(slug).catch(() => null);
  if (!caseData) return { title: "Case ikke fundet" };

  const image = strapiImageUrl(caseData.image);
  return {
    title:
      caseData.seoTitle ||
      `${caseData.customer} — ${caseData.title} | AI Case Study`,
    description:
      caseData.seoDescription ||
      `${caseData.customer} — ${caseData.challenge.slice(0, 140)}...`,
    alternates: { canonical: `/cases/${caseData.slug}` },
    openGraph: {
      title: `${caseData.customer}: ${caseData.title}`,
      description: caseData.challenge.slice(0, 200),
      url: `/cases/${caseData.slug}`,
      type: "article",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseData.customer}: ${caseData.title}`,
      description: caseData.challenge.slice(0, 160),
      images: image ? [image] : undefined,
    },
  };
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseData = await getCaseBySlug(slug).catch(() => null);
  if (!caseData) notFound();

  const allCases = await getCases().catch(() => [] as Case[]);
  const otherCases = allCases
    .filter((c) => c.id !== caseData.id)
    .slice(0, 3);

  const image = strapiImageUrl(caseData.image);
  const logo = strapiImageUrl(caseData.customerLogo);

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
    image,
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

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,5rem)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6 text-sm">
              <Link
                href="/cases"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                ← Alle cases
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {logo && (
                <div className="relative w-16 h-16 rounded-xl bg-white ring-1 ring-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={logo}
                    alt={caseData.customer}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-1">
                  {categoryLabels[caseData.category]}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {caseData.customer}
                </p>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              {caseData.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Featured image */}
      {image && (
        <section className="pb-[clamp(2rem,6vw,4rem)]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={caseData.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
          <article>
            <FadeIn>
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-3">
                  Udfordringen
                </p>
                <p className="text-gray-700 leading-relaxed text-[1.05rem]">
                  {caseData.challenge}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-3">
                  Løsningen
                </p>
                <div className="prose-article">
                  {renderMarkdown(caseData.solution)}
                </div>
                <div className="mt-8">
                  {slug === "jm-band-ai-agent" ? (
                    <div className="rounded-2xl overflow-hidden ring-1 ring-gray-100 shadow-sm">
                      <Image
                        src="/screenshots/jmband-ai-support.png"
                        alt="AI Support-agent bygget til JM Band - søger i vidensbasen og foreslår løsninger"
                        width={2880}
                        height={1580}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  ) : (
                    <SolutionDiagram category={caseData.category} />
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-3">
                  Resultatet
                </p>
                <div className="prose-article">
                  {renderMarkdown(caseData.result)}
                </div>
              </div>
            </FadeIn>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={150}>
              <div className="bg-gray-50 rounded-2xl p-6 lg:p-7 border border-gray-100">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-4">
                  Fakta
                </p>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-0.5">Kunde</dt>
                    <dd className="font-semibold text-gray-900">
                      {caseData.customer}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-0.5">Kategori</dt>
                    <dd className="font-semibold text-gray-900">
                      {categoryLabels[caseData.category]}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Vil du høre, om vi kan hjælpe jer med noget lignende?
                  </p>
                  <Link
                    href="/kontakt"
                    className="block w-full text-center whitespace-nowrap bg-primary text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Book en snak
                  </Link>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </section>

      {/* Other cases */}
      {otherCases.length > 0 && (
        <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900 mb-8">
                Andre cases
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherCases.map((c, i) => (
                <FadeIn key={c.id} delay={i * 100}>
                  <Link
                    href={`/cases/${c.slug}`}
                    className="group block bg-white rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 h-full"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">
                      {categoryLabels[c.category]}
                    </p>
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      {c.customer}
                    </p>
                    <h3 className="text-base lg:text-lg font-bold tracking-heading text-gray-900 leading-snug group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <SubpageCTA
        heading="Klar til at blive den næste case?"
        description="Book en gratis 45-minutters samtale — vi lærer jeres virksomhed at kende og ser om AI giver mening for jer."
      />
    </>
  );
}
