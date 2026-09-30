import { ImageResponse } from "next/og";
import { LANG_HALE, LANG_STAMME, LANG_STREG, LANG_VIEWBOX } from "@/components/ui/logo-data";

/**
 * Fælles OG-billede template brugt på tværs af sider.
 * Tager titel + underoverskrift + valgfri tag.
 */
export function renderOgImage({
  title,
  subtitle,
  tag,
  variant = "light",
}: {
  title: string;
  subtitle?: string;
  tag?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const bg = isDark
    ? "#111827"
    : "linear-gradient(135deg, #fff 0%, #fff5e6 100%)";
  const titleColor = isDark ? "#ffffff" : "#111827";
  const subtitleColor = isDark ? "rgba(255,255,255,0.7)" : "#6b7280";
  const borderColor = isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb";
  const size = { width: 1200, height: 630 };

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
          background: bg,
          fontFamily: "system-ui",
        }}
      >
        {/* Top: logo + optional tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* AIKs officielle logo (logo-data.ts), ikke en efterligning med tekst. */}
          <svg width={330} height={48} viewBox={LANG_VIEWBOX} fill="#ff9a00">
            {[...LANG_STAMME, ...LANG_HALE, LANG_STREG].map((f, i) =>
              f.d ? (
                <path key={i} d={f.d} transform={f.transform} />
              ) : (
                <polygon key={i} points={f.points} transform={f.transform} />
              ),
            )}
          </svg>
          {tag && (
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#ff9a00",
                textTransform: "uppercase",
                letterSpacing: 2,
                padding: "10px 18px",
                background: isDark
                  ? "rgba(255,154,0,0.15)"
                  : "rgba(255,154,0,0.1)",
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          )}
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1
            style={{
              fontSize: title.length > 60 ? 72 : 84,
              fontWeight: 800,
              color: titleColor,
              lineHeight: 1.05,
              letterSpacing: -2,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: 32,
                color: subtitleColor,
                lineHeight: 1.3,
                margin: 0,
                maxWidth: 1000,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${borderColor}`,
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 22, color: subtitleColor }}>
            Gratis AI-afklaring · Ingen forpligtelse
          </span>
          <span
            style={{
              fontSize: 22,
              color: titleColor,
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
