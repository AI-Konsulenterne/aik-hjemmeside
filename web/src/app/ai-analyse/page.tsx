import type { Metadata } from "next";
import JsonLd from "@/components/ui/JsonLd";
import UseCaseLanding from "@/components/sections/UseCaseLanding";

export const metadata: Metadata = {
  title: { absolute: "AI til analyse og dataindsigt | beslutningsstøtte | AI Konsulenterne" },
  description:
    "AI til analyse der samler og analyserer jeres data på tværs af systemer - så I får indsigt og beslutningsstøtte i hverdagen. Se vores cases med J.M Band og INDKOM.",
  alternates: { canonical: "/ai-analyse" },
  keywords: [
    "AI analyse",
    "AI analyser",
    "AI dataanalyse",
    "AI dataindsigt",
    "AI beslutningsstøtte",
  ],
  openGraph: {
    title: "AI til analyse og dataindsigt | beslutningsstøtte",
    description:
      "AI til analyse der samler og analyserer jeres data på tværs af systemer - så I får indsigt og beslutningsstøtte.",
    url: "/ai-analyse",
  },
};

const faqs = [
  {
    q: "Skal vi samle vores data ét sted først?",
    a: "Nej. Pointen er, at AI'en kan hente og samle data på tværs af jeres eksisterende systemer, så I ikke selv skal flytte eller samle det først.",
  },
  {
    q: "Hvilke data kan AI'en analysere?",
    a: "Typisk data fra CRM, webshop, regneark og interne systemer. Vi kigger på jeres setup i den gratis AI-afklaring og finder, hvor indsigten giver mest værdi.",
  },
  {
    q: "Er vores data sikre?",
    a: "Ja. Vi bygger løsningen, så jeres data bliver i jeres kontrol - ikke ender i åbne modeller og ikke bruges til at træne på.",
  },
  {
    q: "Hvad koster en AI-analyseløsning?",
    a: "Det afhænger af antallet af systemer og kompleksitet. Mindre løsninger starter typisk fra 50.000 kr. Efter en gratis AI-afklaring giver vi en fast pris.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI til analyse",
  serviceType: "AI Data Analysis & Insight",
  description:
    "AI-løsninger der samler og analyserer data på tværs af CRM, webshop og interne systemer og giver indsigt og beslutningsstøtte.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/ai-analyse",
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

export default function AiAnalyse() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <UseCaseLanding
        eyebrow="AI til analyse"
        h1Pre="AI til analyse -"
        h1Accent="fra spredt data til klare beslutninger."
        lead="Jeres data ligger spredt på tværs af systemer, og det tager tid at få overblik. Vi bygger AI, der henter, samler og analyserer data på tværs - så I får indsigt og beslutningsstøtte, uden at hoppe mellem platforme."
        intro={{
          h2: "Hvad er AI til analyse?",
          paragraphs: [
            "AI til analyse handler om at lade en AI-agent gøre det tunge arbejde: hente data fra jeres forskellige systemer, finde mønstrene og give jer svar og indsigt i et sprog, I kan handle på.",
            "Det er ikke et dashboard mere. Det er en agent, I kan spørge - 'hvordan ser det ud med X?' - og som svarer ud fra jeres faktiske data, på tværs af CRM, webshop og interne systemer.",
          ],
        }}
        steps={{
          h2: "Sådan bruger I AI til analyse",
          items: [
            {
              n: "01",
              h: "Samler data på tværs",
              p: "AI henter data fra CRM, webshop og interne systemer, så I ikke skal hoppe mellem platforme.",
            },
            {
              n: "02",
              h: "Finder mønstre og svar",
              p: "Agenten analyserer data og giver jer indsigt - ikke bare tal, men svar, I kan bruge.",
            },
            {
              n: "03",
              h: "Beslutningsstøtte i hverdagen",
              p: "Spørg på almindeligt dansk og få svar med det samme - så beslutninger bliver hurtigere og bedre underbygget.",
            },
            {
              n: "04",
              h: "Bygget på jeres egne data",
              p: "Indsigten kommer fra jeres faktiske systemer, ikke generiske antagelser - og data forlader ikke jeres kontrol.",
            },
          ],
        }}
        cases={{
          h2: "Rigtige AI-analyse-løsninger, vi har bygget",
          items: [
            {
              href: "/cases/jm-band-ai-agent",
              company: "J.M Band",
              headline: "Indsigt på tværs af CRM, Shopify og interne systemer",
              blurb: "Data lå spredt på tværs af systemer. Vi byggede en AI-agent, der henter og analyserer data på tværs, så medarbejderne får indsigt og svar ét sted - i stedet for at hoppe mellem platforme.",
            },
            {
              href: "/cases/indkom-ai-partnerskab",
              company: "INDKOM",
              headline: "Fra spredte processer til data samlet ét sted",
              blurb: "Vi fungerede som INDKOMs eksterne AI-afdeling: kortlagde processerne, fandt tre konkrete use cases og byggede løsningerne ind i deres systemer. Resultatet er hurtigere beslutninger og mindre friktion.",
            },
          ],
        }}
        faqs={{ h2: "Spørgsmål om AI til analyse", items: faqs }}
        related={{
          h2: "Se også",
          items: [
            {
              href: "/ai-strategi",
              label: "AI-strategi",
              desc: "En konkret plan for, hvor AI giver mest værdi.",
            },
            {
              href: "/skraeddersyede-ai",
              label: "Skræddersyede AI-løsninger",
              desc: "AI bygget og integreret med jeres systemer.",
            },
            {
              href: "/ai-kundeservice",
              label: "AI til kundeservice",
              desc: "Automatisér de gentagne kundehenvendelser.",
            },
          ],
        }}
        final={{
          h2: "Skal vi gøre jeres data til indsigt?",
          lead: "Book en gratis AI-afklaring - eller få en gratis AI-analyse, hvor vi peger på, hvor I kan hente mest værdi.",
        }}
      />
    </>
  );
}
