import { KORT, KORT_VIEWBOX } from "@/components/ui/logo-data";

/**
 * Det korte logo, AIK, som vektorer fra AIKs officielle fil (logo-data.ts).
 * Farven er currentColor; sæt den med en tekstfarve (fx text-primary).
 */
export default function LogoKort({ className = "", titel = "AI Konsulenterne" }: { className?: string; titel?: string }) {
  return (
    <svg viewBox={KORT_VIEWBOX} fill="currentColor" role="img" aria-label={titel} className={className}>
      {KORT.map((f, i) =>
        f.d ? <path key={i} d={f.d} transform={f.transform} /> : <polygon key={i} points={f.points} transform={f.transform} />,
      )}
    </svg>
  );
}
