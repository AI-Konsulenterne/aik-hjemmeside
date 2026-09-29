import type { MetadataRoute } from "next";
import { CASES } from "@/content/cases";
import { alleArtikler } from "@/lib/blog";

const SITE_URL = "https://ai-konsulenterne.dk";

// Sitemap'et bygges sammen med sitet. Artikler og cases ligger i repoet
// (web/content/blog og content/cases.ts), så et nyt indlæg er et push til
// main, og deployet efter pushet bygger både artiklen og sitemap'et.
//
// Før hentede ruten fra Strapi ved hver forespørgsel (force-dynamic), og
// Strapi gav kun 25 indlæg pr. kald, så de ældste artikler manglede her.

/** Statiske sider. Billed-routes (opengraph-image m.fl.) hører ikke til her. */
const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/skraeddersyede-ai", priority: 0.9 },
  { path: "/workshop", priority: 0.9 },
  { path: "/academy", priority: 0.9 },
  { path: "/visionai", priority: 0.8 },
  { path: "/ai-strategi", priority: 0.8 },
  { path: "/ai-i-hr", priority: 0.8 },
  { path: "/ai-kundeservice", priority: 0.8 },
  { path: "/ai-analyse", priority: 0.8 },
  { path: "/ai-i-e-commerce", priority: 0.8 },
  { path: "/cases", priority: 0.8 },
  { path: "/referencer", priority: 0.7 },
  { path: "/viden-om-ai", priority: 0.8 },
  { path: "/om-os", priority: 0.7 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/ai-guide", priority: 0.7 },
  { path: "/cookiepolitik", priority: 0.3 },
  { path: "/privatlivspolitik", priority: 0.3 },
  { path: "/handelsbetingelser", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...alleArtikler().map((post) => ({
      url: `${SITE_URL}/viden-om-ai/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CASES.map((c) => ({
      url: `${SITE_URL}/cases/${c.slug}`,
      lastModified: new Date(c.updatedAt || c.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
