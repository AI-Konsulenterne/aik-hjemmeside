import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import BlogArkiv from "@/components/side/BlogArkiv";
import { dato, kategori } from "@/content/blog";
import { alleArtikler, artikel } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

/**
 * Et indlæg i Viden om AI.
 *
 * Læsesider står på hvid bund: overskriften stort, uddraget som indledning
 * og teksten i en spalte på højst 68 tegn med større brødtekst (se
 * .artikel i globals.css). Ved siden af står den gratis AI-analyse og
 * Alexanders nummer, fast mens man læser; det er dér, en nysgerrig læser
 * skal kunne tage næste skridt. Til sidst tre andre indlæg, helst om samme
 * emne.
 *
 * Artiklerne er markdown-filer i web/content/blog (se lib/blog.ts). Alle
 * sider bygges på forhånd, og en slug, der ikke findes, giver 404.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return alleArtikler().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = artikel(slug);
  if (!post) return { title: "Artikel ikke fundet" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/viden-om-ai/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/viden-om-ai/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = artikel(slug);
  if (!post) notFound();

  const imageUrl = post.image;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: { "@id": "https://ai-konsulenterne.dk/#organization" },
    image: imageUrl ? `https://ai-konsulenterne.dk${imageUrl}` : undefined,
    mainEntityOfPage: `https://ai-konsulenterne.dk/viden-om-ai/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  /* Læs også: først samme emne, så de nyeste. */
  const oevrige = alleArtikler().filter((p) => p.slug !== post.slug);
  const andre = [
    ...oevrige.filter((p) => p.category && p.category === post.category),
    ...oevrige.filter((p) => !p.category || p.category !== post.category),
  ]
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      titel: p.title,
      uddrag: p.excerpt,
      kategori: kategori(p.category),
      minutter: p.readingTime,
      dato: p.publishedAt,
    }));

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <article>
        <header className="bg-white pt-[clamp(2.5rem,6vw,5rem)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/viden-om-ai"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              <span aria-hidden="true">←</span> Viden om AI
            </Link>
            <p className="mt-10 text-sm text-gray-600">
              {kategori(post.category) && <span className="font-semibold text-gray-900">{kategori(post.category)}</span>}
              {post.readingTime ? ` · ${post.readingTime} min læsning` : ""}
            </p>
            <h1 className="mt-4 max-w-5xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.03] tracking-display text-gray-900">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-[60ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed text-gray-600">
                {post.excerpt}
              </p>
            )}
            <p className="mt-8 flex flex-wrap items-center gap-x-2 border-t border-gray-200 pt-6 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{post.author || "AI Konsulenterne"}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{dato(post.publishedAt)}</time>
            </p>
          </div>
        </header>

        {imageUrl && (
          <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-gray-100">
              <Image src={imageUrl} alt={post.title} fill priority sizes="(min-width: 1280px) 76rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(2.5rem,5vw,4rem)] lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="artikel prose-article max-w-[68ch] lg:col-span-8">{renderMarkdown(post.content)}</div>

            <aside className="lg:col-span-4">
              <div className="rounded-3xl bg-ink p-7 text-white lg:sticky lg:top-28 lg:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="lamp" data-lit="true" aria-hidden="true" />
                  <p className="kicker text-white/70">Gratis AI-analyse</p>
                </div>
                <p className="mt-5 text-[1.5rem] font-bold leading-[1.1] tracking-heading">Hvor skal I starte med AI?</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-white/70">
                  Svar på fire korte spørgsmål, så får I tre konkrete forslag på mail inden for en time.
                </p>
                <Button href="/ai-guide" className="mt-6">
                  Få jeres use cases
                </Button>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/70">
                  Eller ring til Alexander:{" "}
                  <a href="tel:+4525547074" className="font-semibold text-white">
                    +45 25 54 70 74
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {andre.length > 0 && (
        <section className="section-y bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-display text-gray-900">
                Læs også
              </h2>
              <Link href="/viden-om-ai" className="text-sm font-semibold text-gray-900">
                <span className="understreg">Alle artikler</span>
              </Link>
            </div>
            <FadeIn className="mt-10">
              <BlogArkiv indlaeg={andre} filtre={false} />
            </FadeIn>
          </div>
        </section>
      )}

      <TalMedAlexander titel="Vil I tale om, hvad AI kan gøre hos jer?" />
    </>
  );
}
