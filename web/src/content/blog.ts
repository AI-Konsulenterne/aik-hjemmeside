/**
 * Fælles for bloggen (/viden-om-ai): kategorinavne og datoer på dansk.
 * Indlæggene er markdown-filer i web/content/blog (se lib/blog.ts).
 */

export const BLOG_KATEGORI: Record<string, string> = {
  guide: "Guide",
  "case-story": "Case",
  "tech-dive": "Teknik",
  "business-case": "Forretning",
  compliance: "Compliance",
  news: "Nyhed",
};

export function kategori(k?: string | null) {
  return k ? (BLOG_KATEGORI[k] ?? k) : null;
}

export function dato(iso: string, kort = false): string {
  try {
    return new Date(iso).toLocaleDateString("da-DK", {
      day: "numeric",
      month: kort ? "short" : "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/** Det, arkivet på klienten har brug for. Ikke selve teksten. */
export type Indlaeg = {
  slug: string;
  titel: string;
  uddrag: string;
  kategori: string | null;
  minutter: number | null;
  dato: string;
};
