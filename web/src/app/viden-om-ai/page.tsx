import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import {
  getBlogPosts,
  strapiImageUrl,
  type BlogPost,
} from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Viden om AI | AI Guides, Artikler og Indsigter for SMV'er",
  description:
    "Praktiske AI-guides og artikler til danske virksomheder. Lær om AI-implementering, GDPR, ChatGPT vs skræddersyet AI, ROI-beregning og meget mere.",
  alternates: { canonical: "/viden-om-ai" },
  keywords: [
    "viden om AI",
    "AI guide Danmark",
    "AI artikler",
    "hvordan bruge AI",
    "AI for virksomheder",
    "AI blog dansk",
  ],
  openGraph: {
    title: "Viden om AI — Praktiske Guides til Danske Virksomheder",
    description:
      "Alt du skal vide om AI i praksis — fra første skridt til avancerede use-cases.",
    url: "/viden-om-ai",
  },
};

// Tema-relevante ikoner pr. artikel (matcher på slug/titel-nøgleord)
const SPARKLE =
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z";

const iconMap: { match: string; path: string }[] = [
  // Rådgivning → pære/idé
  {
    match: "raadgiv",
    path: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  // Kundeservice → chat-bobler
  {
    match: "kundeservice",
    path: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  },
  // Use case / vælg / starte → flag/startpunkt
  {
    match: "use-case",
    path: "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5",
  },
];

function iconForPost(slug: string, title: string): string {
  const hay = `${slug} ${title}`.toLowerCase();
  return iconMap.find((m) => hay.includes(m.match))?.path ?? SPARKLE;
}

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

export default async function VidenOmAI() {
  const posts = await getBlogPosts().catch(() => [] as BlogPost[]);

  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Viden om AI
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                Artikler og indsigter om AI til danske virksomheder. Konkret
                viden I kan bruge — ingen buzzwords.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
              <p className="text-gray-500 leading-relaxed">
                Blog-artikler er på vej. I mellemtiden kan du hente vores gratis
                AI-guide.
              </p>
              <div className="mt-6">
                <Button variant="primary" href="/ai-guide">
                  Hent gratis AI-guide
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post, i) => {
                const imageUrl = strapiImageUrl(post.featuredImage);
                const icon = iconForPost(post.slug, post.title);
                return (
                  <FadeIn key={post.id} delay={i * 100}>
                    <Link
                      href={`/viden-om-ai/${post.slug}`}
                      className="group block h-full"
                    >
                      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                        {imageUrl ? (
                          <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-50 via-white to-gray-50 overflow-hidden flex items-center justify-center">
                            <div
                              className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl"
                              aria-hidden="true"
                            />
                            <svg
                              className="w-12 h-12 text-primary relative z-10 transition-transform duration-500 group-hover:scale-110"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={icon}
                              />
                            </svg>
                          </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            {post.category && (
                              <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                                {categoryLabels[post.category] ?? post.category}
                              </span>
                            )}
                            {post.readingTime && (
                              <span className="text-[11px] text-gray-400">
                                {post.readingTime} min
                              </span>
                            )}
                          </div>
                          <h2 className="text-lg lg:text-xl font-bold tracking-heading mb-3 leading-snug group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-gray-500 leading-relaxed text-sm flex-grow">
                            {post.excerpt}
                          </p>
                          <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lead magnet */}
      <section className="bg-gray-900 text-white py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading">
                Vil du have det hele samlet?
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed">
                Download vores gratis AI-guide og få en komplet introduktion til
                AI for danske virksomheder.
              </p>
              <div className="mt-8">
                <Button variant="primary" size="lg" href="/ai-guide">
                  Hent gratis AI-guide
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
