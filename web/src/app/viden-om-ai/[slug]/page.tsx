import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import SubpageCTA from "@/components/sections/SubpageCTA";
import {
  getBlogPostBySlug,
  getBlogPosts,
  strapiImageUrl,
} from "@/lib/strapi";
import { renderMarkdown } from "@/lib/markdown";

type Params = { slug: string };

const categoryLabels: Record<string, string> = {
  guide: "Guide",
  "case-story": "Case",
  "tech-dive": "Tech",
  "business-case": "Business",
  compliance: "Compliance",
  news: "Nyhed",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getBlogPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Artikel ikke fundet" };

  const image = strapiImageUrl(post.featuredImage);
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
      authors: post.author ? [post.author] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const imageUrl = strapiImageUrl(post.featuredImage);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author || "AI Konsulenterne",
    },
    publisher: { "@id": "https://ai-konsulenterne.dk/#organization" },
    image: imageUrl,
    mainEntityOfPage: `https://ai-konsulenterne.dk/viden-om-ai/${post.slug}`,
    keywords: post.keywords?.join(", "),
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
        name: "Viden om AI",
        item: "https://ai-konsulenterne.dk/viden-om-ai",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://ai-konsulenterne.dk/viden-om-ai/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(2rem,6vw,4rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/viden-om-ai"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                ← Viden om AI
              </Link>
            </div>
            {post.category && (
              <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-3">
                {categoryLabels[post.category] ?? post.category}
              </p>
            )}
            <h1 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
              <span>{formatDate(post.publishedAt)}</span>
              {post.author && <span>· {post.author}</span>}
              {post.readingTime && <span>· {post.readingTime} min læsning</span>}
            </div>
            {post.excerpt && (
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Featured image */}
      {imageUrl && (
        <section className="pb-[clamp(2rem,6vw,4rem)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={post.title}
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
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <article className="prose-article">
              {renderMarkdown(post.content)}
            </article>
          </FadeIn>
        </div>
      </section>

      <SubpageCTA
        heading="Vil I tale om hvad AI kan gøre for jer?"
        description="Book en gratis AI-afklaring — vi finder konkrete muligheder hos jer."
      />
    </>
  );
}
