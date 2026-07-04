/**
 * Strapi v5 API client
 *
 * Strapi 5 returnerer flade objekter (ingen `attributes` wrapper).
 * I dev: STRAPI_API_URL=http://localhost:1337
 * I prod: Sæt STRAPI_API_URL + STRAPI_API_TOKEN i .env.local
 */

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

type StrapiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type StrapiError = {
  error?: {
    status: number;
    name: string;
    message: string;
  };
};

/**
 * Fetch fra Strapi REST API.
 *
 * @param endpoint - fx "cases?populate=*"
 * @param options - Next.js fetch options (revalidate, tags)
 */
export async function strapiFetch<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {},
): Promise<T> {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options.headers,
    },
    next: {
      revalidate: 60,
      ...options.next,
    },
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as StrapiError;
    throw new Error(
      `Strapi fetch failed: ${res.status} ${res.statusText} — ${err.error?.message || endpoint}`,
    );
  }

  const json = (await res.json()) as StrapiResponse<T>;
  return json.data;
}

/**
 * Absolut URL til Strapi media.
 * Strapi returnerer relative URL'er (/uploads/xxx.jpg) som skal præfix'es.
 */
export function strapiImageUrl(
  image: StrapiImage | null | undefined,
): string | null {
  if (!image?.url) return null;
  if (image.url.startsWith("http")) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// ============================================================
// Types — matches Strapi 5 flat response structure
// ============================================================

export type StrapiImage = {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
};

export type Case = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  customer: string;
  customerLogo?: StrapiImage | null;
  category: "intern-ai" | "webshop" | "vidensbase" | "hr" | "andet";
  challenge: string;
  solution: string;
  result: string;
  featured: boolean;
  order?: number;
  image?: StrapiImage | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TeamMember = {
  id: number;
  documentId: string;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiImage | null;
  linkedinUrl?: string;
  email?: string;
  order: number;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type BlogPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  featuredImage?: StrapiImage | null;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  readingTime?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Testimonial = {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  companyLogo?: StrapiImage | null;
  authorPhoto?: StrapiImage | null;
  rating?: number;
  featured: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// ============================================================
// Data fetchers — højniveau convenience funktioner
// ============================================================

export async function getCases(params?: {
  featured?: boolean;
  limit?: number;
}): Promise<Case[]> {
  const query = new URLSearchParams({
    populate: "*",
    "sort[0]": "order:asc",
  });
  if (params?.featured) query.set("filters[featured][$eq]", "true");
  if (params?.limit) query.set("pagination[pageSize]", String(params.limit));
  return strapiFetch<Case[]>(`cases?${query.toString()}`, {
    next: { tags: ["cases"] },
  });
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const query = new URLSearchParams({
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  const cases = await strapiFetch<Case[]>(`cases?${query.toString()}`, {
    next: { tags: ["cases", `case-${slug}`] },
  });
  return cases[0] || null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return strapiFetch<TeamMember[]>(
    "team-members?populate=*&sort[0]=order:asc",
    { next: { tags: ["team"] } },
  );
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const query = new URLSearchParams({
    populate: "*",
    "sort[0]": "publishedAt:desc",
  });
  if (limit) query.set("pagination[pageSize]", String(limit));
  return strapiFetch<BlogPost[]>(`blog-posts?${query.toString()}`, {
    next: { tags: ["blog"], revalidate: 60 },
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = new URLSearchParams({
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  const posts = await strapiFetch<BlogPost[]>(`blog-posts?${query.toString()}`, {
    next: { tags: ["blog", `blog-${slug}`] },
  });
  return posts[0] || null;
}

export async function getTestimonials(params?: {
  featured?: boolean;
}): Promise<Testimonial[]> {
  const query = new URLSearchParams({
    populate: "*",
    "sort[0]": "order:asc",
  });
  if (params?.featured) query.set("filters[featured][$eq]", "true");
  return strapiFetch<Testimonial[]>(`testimonials?${query.toString()}`, {
    next: { tags: ["testimonials"] },
  });
}
