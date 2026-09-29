import type { Case } from "@/lib/strapi";

/**
 * Hjælpere til casene fra Strapi.
 *
 * En case har sjældent et billede i Strapi. Men tre af kunderne har et skud
 * i referencefilmen (Lavazza: kaffen, J.M Band: armbåndet, Wunderwear:
 * butikken), så casen får samme billede, som kunden har på forsiden og
 * under /referencer. Kunder uden skud står uden billede; der opfindes
 * ikke et.
 */

export const KATEGORI: Record<Case["category"], string> = {
  "intern-ai": "Intern AI",
  webshop: "E-commerce",
  vidensbase: "Vidensbase",
  hr: "HR og intern AI",
  andet: "AI-løsning",
};

const SKUD: [RegExp, string][] = [
  [/lavazza/i, "kaffe"],
  [/j\.?\s?m\.?\s?band/i, "armbaand"],
  [/wunderwear/i, "undertoej"],
];

/** Filmskuddet til en kunde, hvis kunden har et. */
export function caseSkud(kunde: string): string | null {
  return SKUD.find(([m]) => m.test(kunde))?.[1] ?? null;
}

/**
 * Casetekster fra Strapi bruger tankestreger ("spørgsmål — ferieregler").
 * Designsystemet bruger dem ikke, så de bliver til kolon eller komma, når
 * teksten vises. Indholdet i Strapi røres ikke.
 */
export function udenTankestreg(tekst: string): string {
  return tekst
    .replace(/\s+[—–]\s+og\s+/g, " og ")
    .replace(/\s+[—–]\s+(?=[a-zæøå])/g, ": ")
    .replace(/\s+[—–]\s+/g, ". ");
}
