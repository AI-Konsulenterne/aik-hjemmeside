import type { MetadataRoute } from "next";
import { getBlogPosts, getCases } from "@/lib/strapi";

const SITE_URL = "https://ai-konsulenterne.dk";

// Matcher ISR-kadencen i strapi.ts, så et nyt indlæg er i sitemap'et
// inden for et minut efter det er udgivet — uden build og uden deploy.
export const revalidate = 60;

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
  { path: "/viden-om-ai", priority: 0.8 },
  { path: "/om-os", priority: 0.7 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/ai-guide", priority: 0.7 },
  { path: "/cookiepolitik", priority: 0.3 },
  { path: "/privatlivspolitik", priority: 0.3 },
  { path: "/handelsbetingelser", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Falder tilbage til de statiske sider, hvis Strapi er nede — et sitemap
  // uden blogindlæg er bedre end et 500-svar til crawleren.
  const [posts, cases] = await Promise.all([
    getBlogPosts().catch(() => []),
    getCases().catch(() => []),
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/viden-om-ai/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cases.map((c) => ({
      url: `${SITE_URL}/cases/${c.slug}`,
      lastModified: new Date(c.updatedAt || c.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
