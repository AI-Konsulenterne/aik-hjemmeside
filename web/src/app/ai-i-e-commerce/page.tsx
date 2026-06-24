import type { Metadata } from "next";
import JsonLd from "@/components/ui/JsonLd";
import UseCaseLanding from "@/components/sections/UseCaseLanding";

export const metadata: Metadata = {
  title: { absolute: "AI til e-commerce og webshops | automatisering der skalerer | AI Konsulenterne" },
  description:
    "AI til e-commerce der automatiserer ordrehåndtering og kundeservice i jeres webshop - integreret med Shopify og CRM. Se hvordan vi hjalp Wunderwear skalere uden flere hænder.",
  alternates: { canonical: "/ai-i-e-commerce" },
  keywords: [
    "AI e-commerce",
    "AI til webshop",
    "AI webshop",
    "AI Shopify",
    "AI automatisering webshop",
  ],
  openGraph: {
    title: "AI til e-commerce og webshops | automatisering der skalerer",
    description:
      "AI til e-commerce der automatiserer ordrehåndtering og kundeservice - integreret med Shopify og CRM. Skalér uden flere hænder.",
    url: "/ai-i-e-commerce",
  },
};

const faqs = [
  {
    q: "Virker det med Shopify?",
    a: "Ja. Vi har bygget løsninger oven på Shopify og koblet dem sammen med CRM og interne systemer. Bruger I en anden platform, kigger vi på den i den gratis AI-afklaring.",
  },
  {
    q: "Hvad kan automatiseres i en webshop?",
    a: "Typisk ordrehåndtering, leverings- og returspørgsmål, produktspørgsmål og gentagne kundeservice-henvendelser. Vi finder de steder, hvor I bruger mest manuel tid.",
  },
  {
    q: "Skal vi skifte vores systemer ud?",
    a: "Nej. Vi bygger oven på det, I allerede har, så I ikke skal starte forfra eller skifte platform.",
  },
  {
    q: "Hvad koster en AI-løsning til webshop?",
    a: "Det afhænger af omfang. Mindre løsninger starter typisk fra 50.000 kr. Efter en gratis AI-afklaring giver vi en fast pris, så I ved præcis, hvad I siger ja til.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI til e-commerce",
  serviceType: "AI for E-commerce",
  description:
    "AI-automatisering af ordrehåndtering og kundeservice for webshops, integreret med Shopify og CRM.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/ai-i-e-commerce",
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

export default function AiEcommerce() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <UseCaseLanding
        eyebrow="AI til e-commerce"
        h1Pre="AI til e-commerce -"
        h1Accent="skalér din webshop uden flere hænder."
        lead="Flere ordrer og kundehenvendelser behøver ikke betyde flere ansatte. Vi automatiserer ordrehåndtering og kundeservice i jeres webshop - integreret med Shopify og jeres CRM, så I vokser uden at vokse i omkostninger."
        intro={{
          h2: "Hvad kan AI i en webshop?",
          paragraphs: [
            "AI til e-commerce handler om at fjerne det manuelle arbejde, der vokser i takt med ordrerne: ordrebehandling, leveringsspørgsmål, returneringer og de samme produktspørgsmål igen og igen.",
            "Ved at koble AI på jeres Shopify og CRM kan ordrer behandles automatisk, og kunderne kan få svar døgnet rundt - så jeres team kan bruge tiden på vækst i stedet for rutine.",
          ],
        }}
        steps={{
          h2: "Sådan bruger I AI i jeres webshop",
          items: [
            {
              n: "01",
              h: "Automatiseret ordrehåndtering",
              p: "AI behandler ordrer på tværs af Shopify og jeres CRM, så de manuelle trin forsvinder.",
            },
            {
              n: "02",
              h: "AI-kundeservice 24/7",
              p: "Levering, returnering og produktspørgsmål bliver besvaret automatisk, døgnet rundt.",
            },
            {
              n: "03",
              h: "Skalerer med væksten",
              p: "Flere ordrer kræver ikke flere hænder - løsningen vokser med jer.",
            },
            {
              n: "04",
              h: "Integreret med jeres setup",
              p: "Vi bygger oven på de systemer, I allerede bruger, i stedet for at starte forfra.",
            },
          ],
        }}
        cases={{
          h2: "Rigtige AI-løsninger til webshops, vi har bygget",
          items: [
            {
              href: "/cases/wunderwear-automation",
              company: "Wunderwear",
              stat: "80%",
              headline: "Automatiseret ordrehåndtering og 24/7 kundeservice",
              blurb: "Wunderwear voksede i ordrer og henvendelser, men teamet skulle ikke følge med lineært. Vi automatiserede ordrebehandlingen på tværs af Shopify og CRM og byggede en AI-agent, der besvarer 80% af de gentagne spørgsmål.",
            },
            {
              href: "/cases/jm-band-ai-agent",
              company: "J.M Band",
              headline: "AI-agent på tværs af Shopify og interne systemer",
              blurb: "Data lå spredt på tværs af CRM, Shopify og interne systemer. Vi byggede en AI-agent, der samler det hele, så medarbejderne får indsigt og svar ét sted.",
            },
          ],
        }}
        faqs={{ h2: "Spørgsmål om AI til e-commerce", items: faqs }}
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
              desc: "AI bygget og integreret med jeres systemer.",
            },
            {
              href: "/ai-strategi",
              label: "AI-strategi",
              desc: "En konkret plan for, hvor AI giver mest værdi.",
            },
          ],
        }}
        final={{
          h2: "Skal vi skalere jeres webshop med AI?",
          lead: "Book en gratis AI-afklaring. Vi finder ud af, hvad I kan automatisere - og hvad det vil spare jer.",
        }}
      />
    </>
  );
}
