/**
 * Casene.
 *
 * De lå i Strapi. Nu står de her, fordi der kun er tre, og fordi det er
 * AIK, der bestemmer, hvilke kunder der må nævnes: Lavazza, J.M Band og
 * Wunderwear (INDKOM må ikke; den gamle URL sender videre til /cases, se
 * next.config.ts). Teksten er den, der stod live, rettet for tegnsætning.
 * Tal står kun, hvor de stod i forvejen (Wunderwear: 80 %).
 *
 * En case har sjældent et billede. Men alle tre kunder har et skud i
 * referencefilmen (Lavazza: kaffen, J.M Band: armbåndet, Wunderwear:
 * butikken), så casen får samme billede, som kunden har på forsiden og
 * under /referencer.
 */

export type Case = {
  slug: string;
  title: string;
  customer: string;
  category: "intern-ai" | "webshop" | "vidensbase" | "hr" | "andet";
  challenge: string;
  solution: string;
  result: string;
  /** Kort udgave af resultatet til kort og lister. */
  kort: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Skud fra referencefilmen (content/film.ts). */
  skud?: string;
  /**
   * Kundens logo i hvid, til at stå på casebilledet som på forsidens
   * Lavazza-sektion. Højden er sat pr. logo, så de tre fylder lige meget for
   * øjet: Wunderwear er bred og tynd, J.M Band er kompakt. `lille` er til
   * kort, `stor` til heroen og de store kort på /referencer.
   */
  logo: { src: string; bredde: number; hoejde: number; lille: string; stor: string };
  publishedAt: string;
  updatedAt: string;
};

export const KATEGORI: Record<Case["category"], string> = {
  "intern-ai": "Intern AI",
  webshop: "E-commerce",
  vidensbase: "Vidensbase",
  hr: "HR og intern AI",
  andet: "AI-løsning",
};

export const CASES: Case[] = [
  {
    slug: "lavazza-hr-agent",
    title: "Datasikker HR-agent, der svarer, så medarbejderne ikke skal vente",
    customer: "Lavazza",
    category: "hr",
    challenge:
      "Lavazzas HR-afdeling brugte uforholdsmæssigt meget tid på at besvare de samme spørgsmål fra medarbejderne: ferieregler, lønforhold, pension og interne politikker. Samtidig var GDPR og datasikkerhed et ufravigeligt krav.",
    solution:
      "Vi byggede en datasikker AI-agent, der svarer ud fra Lavazzas interne HR-dokumenter, personalehåndbog og politikker. Agenten kører i et lukket miljø, så data aldrig forlader virksomhedens kontrol og aldrig bruges til at træne offentlige modeller.",
    result:
      "HR-afdelingen er frigjort fra rutinespørgsmålene. Medarbejderne får svar på sekunder i stedet for dage, med fuld GDPR-compliance og fuld kontrol over data. Adoptionen er høj, fordi agenten taler Lavazzas eget sprog.",
    kort: "Medarbejderne får svar på sekunder i stedet for dage, og data forlader aldrig virksomheden.",
    seoTitle: "Lavazza: datasikker HR-agent med AI",
    seoDescription: "Sådan byggede vi en GDPR-sikker HR-agent til Lavazza, der svarer medarbejderne på sekunder ud fra virksomhedens egne HR-dokumenter.",
    skud: "kaffe",
    logo: { src: "/logos/lavazza-hvid.png", bredde: 900, hoejde: 232, lille: "h-6 sm:h-7", stor: "h-9 lg:h-11" },
    publishedAt: "2026-07-05T15:05:44.804Z",
    updatedAt: "2026-09-29T12:00:00.000Z",
  },
  {
    slug: "wunderwear-automation",
    title: "AI-automatiseret ordrehåndtering og kundeservice",
    customer: "Wunderwear",
    category: "webshop",
    challenge:
      "Wunderwear oplevede vækst i bestillinger og kundehenvendelser, men holdet skulle ikke vokse i samme takt. Ordrehåndteringen og de samme spørgsmål igen og igen tog stadig mere tid.",
    solution:
      "En AI-løsning, der automatiserer ordrebehandlingen på tværs af Shopify og det interne CRM, og en AI-agent i kundeservice, der besvarer 80 % af de gentagne spørgsmål om levering, returnering og produkter.",
    result:
      "Markant mindre manuel ordrehåndtering. Kundeservice bruger tiden på de sager, der kræver et menneske, og kunderne får svar døgnet rundt.",
    kort: "En AI-agent besvarer 80 % af de gentagne spørgsmål, og ordrerne behandles automatisk.",
    seoTitle: "Wunderwear: automatiseret webshop",
    seoDescription: "Sådan automatiserede vi ordrebehandlingen på tværs af Shopify og CRM for Wunderwear, og en AI-agent besvarer nu 80 % af de gentagne spørgsmål.",
    skud: "undertoej",
    logo: { src: "/logos/wunderwear.svg", bredde: 498, hoejde: 47, lille: "h-[0.95rem] sm:h-[1.1rem]", stor: "h-[1.35rem] lg:h-[1.65rem]" },
    publishedAt: "2026-07-05T15:05:45.125Z",
    updatedAt: "2026-09-29T12:00:00.000Z",
  },
  {
    slug: "jm-band-ai-agent",
    title: "AI-agent på tværs af CRM, Shopify og interne systemer",
    customer: "J.M Band",
    category: "intern-ai",
    challenge:
      "J.M Band havde data spredt på tværs af CRM, Shopify og en række interne systemer. Det var svært at få overblik og træffe beslutninger hurtigt.",
    solution:
      "En skræddersyet AI-agent, der henter og analyserer data på tværs af systemerne, så medarbejderne får indsigt og svar ét sted uden at hoppe mellem platforme.",
    result:
      "Hurtigere beslutninger, data fra alle systemer samlet ét sted og mindre friktion i hverdagen.",
    kort: "Data fra CRM, Shopify og de interne systemer samlet ét sted, så beslutningerne går hurtigere.",
    seoTitle: "J.M Band: AI på tværs af systemer",
    seoDescription: "Sådan byggede vi en AI-agent til J.M Band, der samler data fra CRM, Shopify og interne systemer, så medarbejderne får svar ét sted.",
    skud: "armbaand",
    logo: { src: "/logos/jmband-hvid.png", bredde: 493, hoejde: 241, lille: "h-9 sm:h-10", stor: "h-12 lg:h-16" },
    publishedAt: "2026-07-05T15:05:45.432Z",
    updatedAt: "2026-09-29T12:00:00.000Z",
  },
];

export function caseMedSlug(slug: string): Case | null {
  return CASES.find((c) => c.slug === slug) ?? null;
}
