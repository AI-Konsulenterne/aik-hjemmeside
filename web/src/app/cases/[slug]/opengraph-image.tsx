import { ImageResponse } from "next/og";
import { getCaseBySlug, type Case } from "@/lib/strapi";

export const alt = "AI Case - AI Konsulenterne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const categoryLabels: Record<Case["category"], string> = {
  "intern-ai": "Intern AI",
  webshop: "E-commerce",
  vidensbase: "Vidensbase",
  hr: "HR / Intern AI",
  andet: "AI-løsning",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = await getCaseBySlug(slug).catch(() => null);

  const title = caseData?.title || "AI Case Study";
  const customer = caseData?.customer || "Danske virksomheder";
  const category = caseData
    ? categoryLabels[caseData.category]
    : "AI-løsning";

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
          background: "#111827",
          fontFamily: "system-ui",
          position: "relative",
        }}
      >
        {/* Decorative gradient corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle at top right, rgba(255,154,0,0.25), transparent 60%)",
          }}
        />

        {/* Top: logo + category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
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

          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ff9a00",
              textTransform: "uppercase",
              letterSpacing: 3,
              padding: "10px 18px",
              border: "1.5px solid rgba(255,154,0,0.4)",
              borderRadius: 999,
            }}
          >
            Case · {category}
          </span>
        </div>

        {/* Middle: customer + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#ff9a00",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {customer}
          </span>
          <h1
            style={{
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -1.5,
              margin: 0,
              maxWidth: 1000,
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
            borderTop: "1.5px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.5)" }}>
            Læs hele casen →
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#ffffff",
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
