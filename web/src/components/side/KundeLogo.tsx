import Image from "next/image";
import type { Case } from "@/content/cases";

/**
 * Kundens logo i hvid på casebilledet, som på forsidens Lavazza-sektion.
 * Billedet under skal have et mørkt forløb i bunden (se `LogoForloeb`).
 *
 * `alt` er tom, hvor kundens navn allerede står i teksten ved siden af, så
 * en skærmlæser ikke læser navnet to gange.
 */
export default function KundeLogo({
  logo,
  alt,
  str = "lille",
  className = "",
}: {
  logo: Case["logo"];
  alt: string;
  str?: "lille" | "stor";
  className?: string;
}) {
  return (
    <Image
      src={logo.src}
      alt={alt}
      width={logo.bredde}
      height={logo.hoejde}
      className={`${str === "stor" ? logo.stor : logo.lille} w-auto max-w-full ${className}`}
    />
  );
}

/** Det mørke forløb i bunden af billedet, som logoet står på. */
export function LogoForloeb() {
  return <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />;
}
