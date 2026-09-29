import { renderOgImage } from "@/lib/og-template";
import { CASES, KATEGORI, caseMedSlug } from "@/content/cases";

/**
 * Delingsbilledet til en case. Samme skabelon som resten af sitet, mørk
 * variant. Bygges på forhånd for hver case.
 */

export const alt = "Case fra AI Konsulenterne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseMedSlug(slug);
  return renderOgImage({
    tag: c ? `Case · ${c.customer} · ${KATEGORI[c.category]}` : "Case",
    title: c?.title ?? "Cases",
    subtitle: c?.kort,
    variant: "dark",
  });
}
