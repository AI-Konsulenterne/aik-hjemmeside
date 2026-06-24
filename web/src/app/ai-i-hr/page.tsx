import type { Metadata } from "next";
import JsonLd from "@/components/ui/JsonLd";
import UseCaseLanding from "@/components/sections/UseCaseLanding";

export const metadata: Metadata = {
  title: { absolute: "AI i HR | automatisér HR-spørgsmål og frigør tid | AI Konsulenterne" },
  description:
    "AI i HR der svarer medarbejderne på sekunder - trænet på jeres egne politikker og kørt i et datasikkert, lukket miljø. Se hvordan vi hjalp Lavazzas HR-afdeling.",
  alternates: { canonical: "/ai-i-hr" },
  keywords: [
    "AI i HR",
    "AI for HR",
    "HR AI",
    "AI HR",
    "AI for HR og rekruttering",
  ],
  openGraph: {
    title: "AI i HR | automatisér HR-spørgsmål og frigør tid",
    description:
      "AI i HR der svarer medarbejderne på sekunder, trænet på jeres egne politikker og kørt i et datasikkert, lukket miljø.",
    url: "/ai-i-hr",
  },
};

const faqs = [
  {
    q: "Hvilke spørgsmål kan AI'en svare på?",
    a: "De spørgsmål, der bliver stillet igen og igen - ferieregler, løn, pension, barsel og interne politikker. Agenten svarer ud fra jeres egen personalehåndbog og jeres faktiske regler.",
  },
  {
    q: "Er medarbejdernes data sikre?",
    a: "Ja. Vi bygger løsningen i et lukket miljø, hvor jeres data aldrig forlader virksomheden og aldrig bruges til at træne offentlige modeller. GDPR og datasikkerhed er et ufravigeligt krav, ikke en eftertanke.",
  },
  {
    q: "Kan den kobles på vores HR-system?",
    a: "Ofte ja. Vi kigger på jeres setup i den gratis AI-afklaring og bygger oven på det, I allerede bruger, frem for at starte forfra.",
  },
  {
    q: "Hvad koster en AI-løsning til HR?",
    a: "Det afhænger af omfang og datasikkerhedskrav. Mindre løsninger starter typisk fra 50.000 kr. Vi giver en fast pris efter en gratis AI-afklaring.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI i HR",
  serviceType: "AI for HR",
  description:
    "Datasikre AI-agenter til HR-afdelinger, trænet på interne politikker og dokumenter, kørt i et lukket miljø.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/ai-i-hr",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiIHr() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <UseCaseLanding
        eyebrow="AI i HR"
        h1Pre="AI i HR - medarbejderne får svar på sekunder,"
        h1Accent="ikke dage."
        lead="Ferieregler, løn, pension, interne politikker - HR bruger uforholdsmæssigt meget tid på de samme spørgsmål. Vi bygger en datasikker AI-agent, der svarer for jer, så HR kan fokusere på mennesker frem for rutine."
        intro={{
          h2: "Hvad kan AI i HR?",
          paragraphs: [
            "AI i HR handler om at tage de spørgsmål, der bliver stillet igen og igen - om ferie, løn, pension og personalepolitik - og lade en AI-agent besvare dem ud fra jeres egne dokumenter. Præcist, ens hver gang og med det samme.",
            "Det vigtige i HR er, at data er følsomme. Derfor bygger vi løsningen i et lukket miljø, hvor jeres data aldrig forlader virksomheden og aldrig bruges til at træne offentlige modeller.",
          ],
        }}
        steps={{
          h2: "Sådan bruger I AI i HR",
          items: [
            {
              n: "01",
              h: "Trænet på jeres egne dokumenter",
              p: "Personalehåndbog, politikker og interne regler - agenten svarer ud fra jeres faktiske materiale.",
            },
            {
              n: "02",
              h: "Svar med det samme",
              p: "Medarbejderne får svar på sekunder i stedet for at vente på, at HR har tid.",
            },
            {
              n: "03",
              h: "Datasikkert og GDPR",
              p: "Løsningen kører i et lukket miljø. Data forlader aldrig jer og bruges aldrig til at træne offentlige modeller.",
            },
            {
              n: "04",
              h: "HR frigjort til mennesker",
              p: "Når rutinespørgsmålene er væk, får HR tid til det, der faktisk kræver en HR-partner.",
            },
          ],
        }}
        cases={{
          h2: "Rigtig AI i HR, vi har bygget",
          items: [
            {
              href: "/cases/lavazza-hr-agent",
              company: "Lavazza",
              headline: "Datasikker HR-agent der svarer, så medarbejderne ikke skal vente",
              blurb: "Vi byggede en AI-agent trænet på Lavazzas HR-dokumenter og politikker - kørt i et lukket miljø, der garanterer, at data aldrig forlader virksomheden. HR-afdelingen er frigjort fra rutinespørgsmål, og medarbejderne får svar på sekunder i stedet for dage.",
            },
          ],
        }}
        faqs={{ h2: "Spørgsmål om AI i HR", items: faqs }}
        related={{
          h2: "Se også",
          items: [
            {
              href: "/ai-kundeservice",
              label: "AI til kundeservice",
              desc: "Automatisér de gentagne kundehenvendelser.",
            },
            {
              href: "/skraeddersyede-ai",
              label: "Skræddersyede AI-løsninger",
              desc: "AI bygget og integreret med jeres egne systemer.",
            },
            {
              href: "/ai-strategi",
              label: "AI-strategi",
              desc: "En konkret plan for, hvor AI giver mest værdi.",
            },
          ],
        }}
        final={{
          h2: "Skal vi frigøre jeres HR-afdeling?",
          lead: "Book en gratis AI-afklaring. Vi finder ud af, hvilke HR-spørgsmål AI kan tage - og hvordan vi gør det datasikkert.",
        }}
      />
    </>
  );
}
