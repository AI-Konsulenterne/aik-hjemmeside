import type { Metadata } from "next";
import JsonLd from "@/components/ui/JsonLd";
import UseCaseLanding from "@/components/sections/UseCaseLanding";

export const metadata: Metadata = {
  title: { absolute: "AI til kundeservice | automatisér support og svartider | AI Konsulenterne" },
  description:
    "AI til kundeservice der besvarer de gentagne spørgsmål automatisk - integreret med jeres egne systemer. Se hvordan vi byggede en AI-agent, der tager 80% af henvendelserne.",
  alternates: { canonical: "/ai-kundeservice" },
  keywords: [
    "AI kundeservice",
    "AI i kundeservice",
    "AI chatbot kundeservice",
    "AI automatisering kundeservice",
    "kundeservice AI",
  ],
  openGraph: {
    title: "AI til kundeservice | automatisér support og svartider",
    description:
      "AI-kundeservice der besvarer de gentagne spørgsmål automatisk, koblet på jeres egne systemer. 24/7, korrekte svar.",
    url: "/ai-kundeservice",
  },
};

const faqs = [
  {
    q: "Erstatter AI vores kundeservicemedarbejdere?",
    a: "Nej. AI'en tager de gentagne, repetitive spørgsmål, så jeres medarbejdere får tid til de henvendelser, der kræver et menneske. Det handler om at frigøre tid, ikke at fyre folk.",
  },
  {
    q: "Kan AI'en svare ud fra vores egne data?",
    a: "Ja. Vi kobler agenten på jeres systemer - fx Shopify og CRM - så den svarer ud fra jeres faktiske ordrer, regler og produkter, ikke generisk.",
  },
  {
    q: "Er det GDPR-sikkert?",
    a: "Ja. Vi bygger løsningen, så jeres data ikke ender i åbne modeller og ikke bruges til at træne på. Datasikkerhed er et krav, ikke en eftertanke.",
  },
  {
    q: "Hvad koster en AI-kundeservice-løsning?",
    a: "Det afhænger af omfang og systemer. Mindre løsninger starter typisk fra 50.000 kr. Vi giver en fast pris efter en gratis AI-afklaring, så I ved præcis, hvad I siger ja til.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI til kundeservice",
  serviceType: "AI Customer Service Automation",
  description:
    "AI-kundeservice-agenter til danske virksomheder, integreret med Shopify, CRM og interne systemer.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/ai-kundeservice",
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

export default function AiKundeservice() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <UseCaseLanding
        eyebrow="AI til kundeservice"
        h1Pre="AI til kundeservice der svarer kunderne -"
        h1Accent="døgnet rundt."
        lead="Repetitive spørgsmål om levering, returnering og ordrer æder jeres supports tid. Vi bygger en AI-kundeservice-agent, der besvarer dem automatisk - koblet på jeres egne systemer, så svarene altid er rigtige."
        intro={{
          h2: "Hvad er AI til kundeservice?",
          paragraphs: [
            "AI til kundeservice er ikke en dum chatbot med faste svar. Det er en agent, der er koblet på jeres egne data - ordrer, leveringsstatus, returregler og produktinfo - så den kan svare præcist på de spørgsmål, jeres kunder rent faktisk stiller.",
            "Resultatet er, at de gentagne henvendelser bliver besvaret med det samme, døgnet rundt, mens jeres team får tid til de henvendelser, der kræver et menneske.",
          ],
        }}
        steps={{
          h2: "Sådan hjælper AI jeres kundeservice",
          items: [
            {
              n: "01",
              h: "Besvarer de gentagne spørgsmål",
              p: "Levering, returnering, ordrestatus og produktdetaljer - de spørgsmål, der fylder mest, klarer AI'en automatisk.",
            },
            {
              n: "02",
              h: "Koblet på jeres systemer",
              p: "Agenten henter svar fra jeres Shopify, CRM og interne data, så den svarer korrekt - ikke bare generisk.",
            },
            {
              n: "03",
              h: "Svar 24/7",
              p: "Kunderne får svar med det samme, også uden for åbningstid - uden at I skal ansætte flere.",
            },
            {
              n: "04",
              h: "Jeres team til det svære",
              p: "De henvendelser, der kræver et menneske, lander hos jeres folk - med mere tid til hver enkelt.",
            },
          ],
        }}
        cases={{
          h2: "Rigtige AI-kundeservice-løsninger, vi har bygget",
          items: [
            {
              href: "/cases/wunderwear-automation",
              company: "Wunderwear",
              stat: "80%",
              headline: "AI-agent besvarer 80% af de gentagne spørgsmål",
              blurb: "Vi automatiserede ordrehåndtering på tværs af Shopify og CRM og byggede en AI-kundeservice-agent, der svarer på levering, returnering og produktdetaljer - 24/7.",
            },
            {
              href: "/cases/jm-band-ai-agent",
              company: "J.M Band",
              headline: "Svar på tværs af CRM, Shopify og interne systemer",
              blurb: "En AI-agent der henter og samler data fra alle systemer, så medarbejderne får svar og indsigt uden at hoppe mellem platforme.",
            },
          ],
        }}
        faqs={{ h2: "Spørgsmål om AI i kundeservice", items: faqs }}
        related={{
          h2: "Se også",
          items: [
            {
              href: "/ai-i-e-commerce",
              label: "AI til e-commerce",
              desc: "Automatisér ordrer og kundeservice i jeres webshop.",
            },
            {
              href: "/skraeddersyede-ai",
              label: "Skræddersyede AI-løsninger",
              desc: "AI bygget og integreret med jeres egne systemer.",
            },
            {
              href: "/ai-strategi",
              label: "AI-strategi",
              desc: "Find ud af, hvor AI giver jer mest værdi - med en konkret plan.",
            },
          ],
        }}
        final={{
          h2: "Skal vi se på jeres kundeservice?",
          lead: "Book en gratis AI-afklaring. Vi finder ud af, hvor mange af jeres henvendelser AI kan tage - og siger ærligt til, hvis det ikke kan betale sig.",
        }}
      />
    </>
  );
}
