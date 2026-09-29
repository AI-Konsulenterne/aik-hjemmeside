import fs from "node:fs";
import path from "node:path";

/**
 * Artiklerne i Viden om AI.
 *
 * De lå i Strapi. Nu ligger hver artikel som en markdown-fil i
 * `web/content/blog/<slug>.md`, og siden læser dem, når den bygges. Et nyt
 * indlæg er altså en ny fil, der pushes til main; deployet efter pushet gør
 * det live. Se `web/content/blog-cloud-runbook.md`.
 *
 * Filformatet:
 *
 *     ---
 *     title: "Hvad er en AI-agent?"
 *     slug: "hvad-er-en-ai-agent"
 *     excerpt: "..."
 *     category: "guide"
 *     author: "AI Konsulenterne"
 *     publishedAt: "2026-09-24T06:11:50.321Z"
 *     updatedAt: "2026-09-24T06:11:50.321Z"
 *     seoTitle: "..."          (valgfri, maks 41 tegn)
 *     seoDescription: "..."    (valgfri)
 *     keywords: ["...", "..."] (valgfri)
 *     draft: true              (valgfri: skjuler artiklen uden at slette den)
 *     ---
 *
 *     ## Første overskrift
 *
 * Hver værdi i toppen er JSON. Det kræver ingen YAML-pakke, og en fejl i en
 * fil stopper buildet med en besked, der siger hvilken fil og hvilken linje,
 * i stedet for at en halv artikel går i luften.
 *
 * Læsetiden regnes ud af teksten (200 ord i minuttet), så den passer, også
 * når en artikel bliver rettet. Et readingTime-felt i toppen bruges ikke.
 */

export type Artikel = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string | null;
  readingTime: number;
  author: string;
  publishedAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  /** Et billede i /public, fx "/blog/min-artikel.webp". */
  image?: string;
  draft?: boolean;
};

const MAPPE = path.join(process.cwd(), "content", "blog");

/** Ord i brødteksten, uden markdown-tegn og link-adresser. */
function ord(md: string): number {
  return md
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/[#*>`[\]_]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function laes(fil: string): Artikel {
  const raa = fs.readFileSync(fil, "utf8").replace(/\r\n/g, "\n");
  const navn = path.basename(fil);
  const m = raa.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${navn}: filen skal starte med en blok mellem to linjer med ---`);

  const felter: Record<string, unknown> = {};
  m[1].split("\n").forEach((linje, i) => {
    if (!linje.trim()) return;
    const kolon = linje.indexOf(":");
    if (kolon < 1) throw new Error(`${navn}, linje ${i + 2}: forventede "felt: værdi"`);
    const felt = linje.slice(0, kolon).trim();
    const vaerdi = linje.slice(kolon + 1).trim();
    try {
      felter[felt] = JSON.parse(vaerdi);
    } catch {
      throw new Error(`${navn}, linje ${i + 2}: værdien for "${felt}" er ikke gyldig JSON (tekst skal i "anførselstegn")`);
    }
  });

  const tekst = (f: string) => (typeof felter[f] === "string" ? (felter[f] as string) : undefined);
  for (const f of ["title", "slug", "excerpt", "publishedAt"]) {
    if (!tekst(f)) throw new Error(`${navn}: mangler feltet "${f}"`);
  }
  if (tekst("slug") !== navn.replace(/\.md$/, "")) {
    throw new Error(`${navn}: slug "${tekst("slug")}" skal være det samme som filnavnet`);
  }

  return {
    slug: tekst("slug")!,
    title: tekst("title")!,
    excerpt: tekst("excerpt")!,
    content: m[2].trim(),
    category: tekst("category") ?? null,
    readingTime: Math.max(1, Math.ceil(ord(m[2]) / 200)),
    author: tekst("author") ?? "AI Konsulenterne",
    publishedAt: tekst("publishedAt")!,
    updatedAt: tekst("updatedAt") ?? tekst("publishedAt")!,
    seoTitle: tekst("seoTitle"),
    seoDescription: tekst("seoDescription"),
    keywords: Array.isArray(felter.keywords) ? (felter.keywords as string[]) : [],
    image: tekst("image"),
    draft: felter.draft === true,
  };
}

let cache: Artikel[] | null = null;

/** Alle udgivne artikler, nyeste først. Kladder (draft: true) er udeladt. */
export function alleArtikler(): Artikel[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const alle = fs
    .readdirSync(MAPPE)
    .filter((f) => f.endsWith(".md"))
    .map((f) => laes(path.join(MAPPE, f)))
    .filter((a) => !a.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  cache = alle;
  return alle;
}

export function artikel(slug: string): Artikel | null {
  return alleArtikler().find((a) => a.slug === slug) ?? null;
}
