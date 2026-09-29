import { renderOgImage } from "@/lib/og-template";
import { kategori } from "@/content/blog";
import { alleArtikler, artikel } from "@/lib/blog";

/**
 * Delingsbilledet til en artikel (LinkedIn, Slack osv.). Samme skabelon som
 * resten af sitet. Bygges på forhånd for hver artikel.
 */

export const alt = "Artikel fra AI Konsulenterne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return alleArtikler().map((a) => ({ slug: a.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = artikel(slug);
  const tag = [kategori(post?.category) ?? "Viden om AI", post?.readingTime ? `${post.readingTime} min` : null]
    .filter(Boolean)
    .join(" · ");
  return renderOgImage({
    tag,
    title: post?.title ?? "Viden om AI",
    subtitle: post?.excerpt,
  });
}
