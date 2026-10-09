import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/strapi";

export const alt = "Blog post - AI Konsulenterne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const categoryLabels: Record<string, string> = {
  guide: "Guide",
  "case-story": "Case",
  "tech-dive": "Tech",
  "business-case": "Business",
  compliance: "Compliance",
  news: "Nyhed",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);

  const title = post?.title || "Viden om AI";
  const category = post?.category
    ? categoryLabels[post.category] ?? post.category
    : "Artikel";
  const readingTime = post?.readingTime;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #fff 0%, #fff5e6 100%)",
          fontFamily: "system-ui",
        }}
      >
        {/* Top: logo + meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#ff9a00",
                  lineHeight: 1,
                  letterSpacing: -2,
                }}
              >
                AI
              </span>
              <div
                style={{
                  marginTop: 4,
                  height: 4,
                  width: 64,
                  background: "#ff9a00",
                  borderRadius: 2,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#ff9a00",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginLeft: 8,
                marginTop: 8,
              }}
            >
              Konsulenterne
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#ff9a00",
                textTransform: "uppercase",
                letterSpacing: 2,
                padding: "8px 14px",
                background: "rgba(255,154,0,0.1)",
                borderRadius: 999,
              }}
            >
              {category}
            </span>
            {readingTime && (
              <span
                style={{
                  fontSize: 16,
                  color: "#6b7280",
                  padding: "8px 14px",
                  background: "rgba(107,114,128,0.1)",
                  borderRadius: 999,
                }}
              >
                {readingTime} min læsning
              </span>
            )}
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ display: "flex" }}>
          <h1
            style={{
              fontSize: title.length > 80 ? 52 : title.length > 50 ? 64 : 76,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: -1.5,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e5e7eb",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 22, color: "#6b7280" }}>
            {post?.author || "AI Konsulenterne"}
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#111827",
              fontWeight: 600,
            }}
          >
            ai-konsulenterne.dk
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
