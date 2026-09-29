import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import AnalyseBaand from "@/components/side/AnalyseBaand";
import BlogArkiv from "@/components/side/BlogArkiv";
import { dato, kategori, type Indlaeg } from "@/content/blog";
import { getBlogPosts, strapiImageUrl, type BlogPost } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Viden om AI - guides og artikler",
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
    title: "Viden om AI: praktiske guides til danske virksomheder",
    description:
      "Alt du skal vide om AI i praksis, fra første skridt til avancerede use cases.",
    url: "/viden-om-ai",
  },
};

/**
 * Viden om AI. Indlæggene kommer fra Strapi.
 *
 * Før: kort i et gitter, og uden billede (det har de fleste) en orange
 * gradient med et gnist-ikon, præcis den AI-æstetik designsystemet
 * udelukker. Nu: en mørk hero, det seneste indlæg stort, og resten som en
 * redaktionel liste med filtre (se BlogArkiv). Til sidst den gratis
 * AI-analyse til den læser, der er blevet nysgerrig.
 */

function tilArkiv(p: BlogPost): Indlaeg {
  return {
    slug: p.slug,
    titel: p.title,
    uddrag: p.excerpt,
    kategori: kategori(p.category),
    minutter: p.readingTime ?? null,
    dato: p.publishedAt,
  };
}

export default async function VidenOmAI() {
  const posts = await getBlogPosts().catch(() => [] as BlogPost[]);
  const [seneste, ...resten] = posts;
  const billede = seneste ? strapiImageUrl(seneste.featuredImage) : null;

  return (
    <>
      {/* --- Hero --- */}
      <section
        aria-labelledby="viden-titel"
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
            <p className="kicker text-white/85">Viden om AI</p>
          </div>
          <h1
            id="viden-titel"
            className="mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.0] tracking-display text-white"
          >
            Viden om AI. Uden buzzwords.
          </h1>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
              Guides og artikler til danske virksomheder om, hvad AI kan, hvad det koster, og
              hvordan I kommer i gang. Konkret viden, I kan bruge.
            </p>
            <div className="flex flex-none flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button href="/ai-guide" size="lg" variant="ghost">
                Få en gratis AI-analyse
              </Button>
            </div>
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="section-y bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="max-w-2xl text-[1.25rem] leading-relaxed text-gray-900">
              Artiklerne kunne ikke hentes lige nu. Prøv igen om lidt, eller få en{" "}
              <Link href="/ai-guide" className="font-semibold">
                <span className="understreg">gratis AI-analyse</span>
              </Link>{" "}
              imens.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* --- Det seneste --- */}
          <section className="bg-white pt-[clamp(3.5rem,7vw,6rem)]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="kicker text-gray-600">Seneste</p>
              <FadeIn>
                <Link
                  href={`/viden-om-ai/${seneste.slug}`}
                  className="group mt-6 grid gap-8 border-t border-gray-900 pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-10"
                >
                  {billede && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100 lg:col-span-6">
                      <Image
                        src={billede}
                        alt={seneste.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 36rem, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className={billede ? "lg:col-span-6" : "lg:col-span-10"}>
                    <p className="text-sm text-gray-600">
                      {kategori(seneste.category) && (
                        <span className="font-semibold text-gray-900">{kategori(seneste.category)}</span>
                      )}
                      {seneste.readingTime ? ` · ${seneste.readingTime} min` : ""} · {dato(seneste.publishedAt)}
                    </p>
                    <h2 className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.04] tracking-display text-gray-900">
                      {seneste.title}
                    </h2>
                    {seneste.excerpt && (
                      <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-relaxed text-gray-600">{seneste.excerpt}</p>
                    )}
                    <span className="mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-gray-900">
                      <span className="understreg">Læs artiklen</span>
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </section>

          {/* --- Arkivet --- */}
          {resten.length > 0 && (
            <section className="section-y bg-white">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="kicker mb-8 text-gray-600">Alle artikler</h2>
                <BlogArkiv indlaeg={resten.map(tilArkiv)} />
              </div>
            </section>
          )}
        </>
      )}

      <AnalyseBaand graa titel="Nysgerrig på, hvad AI kan gøre hos jer?" />
    </>
  );
}
