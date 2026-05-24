import Hero from "@/components/sections/Hero";
import SocialProofBar from "@/components/sections/SocialProofBar";
import Barriers from "@/components/sections/Barriers";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ServicesOverview from "@/components/sections/ServicesOverview";
import CaseHighlight from "@/components/sections/CaseHighlight";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import RiskReversal from "@/components/sections/RiskReversal";
import LeadMagnet from "@/components/sections/LeadMagnet";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ai-konsulenterne.dk/#organization",
  name: "AI Konsulenterne",
  alternateName: "AIK",
  url: "https://ai-konsulenterne.dk",
  description:
    "Dansk AI-konsulenthus der bygger skræddersyede AI-løsninger til SMV'er.",
  telephone: "+4525547074",
  email: "kontakt@ai-konsulenterne.dk",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DK",
    addressLocality: "København",
  },
  areaServed: {
    "@type": "Country",
    name: "Denmark",
  },
  sameAs: ["https://www.linkedin.com/company/ai-konsulenterne"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI-tjenester",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Skræddersyede AI-løsninger",
          description:
            "Custom AI bygget til jeres specifikke behov og integreret med jeres systemer.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workshop",
          description:
            "Hands-on AI-workshop for danske virksomheder og medarbejdere.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VisionAI",
          description:
            "AI-drevet business intelligence dashboard på tværs af jeres systemer.",
        },
      },
    ],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gratis AI-afklaring",
  description:
    "Gratis 45-minutters AI-afklaring. Vi finder konkrete AI-muligheder der kan spare din virksomhed tid og penge.",
  provider: {
    "@id": "https://ai-konsulenterne.dk/#organization",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
    description: "Gratis og uforpligtende",
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vi har ikke en IT-afdeling — kan vi stadig få AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Vi tager det hele: opsætning, integration, drift og support. I behøver ingen IT-kompetencer internt. Vi fungerer som jeres eksterne AI-afdeling.",
      },
    },
    {
      "@type": "Question",
      name: "Hvilke platforme bruger I?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi er platformsuafhængige. Afhængigt af opgaven bruger vi OpenAI, Anthropic, Azure OpenAI, Microsoft Copilot, Google Vertex AI, eller custom open-source modeller. Vi anbefaler det der passer jeres behov, budget og datakrav.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan sikrer I at medarbejderne faktisk bruger løsningen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adoption er en del af leverancen. Vi laver onboarding-sessioner, træning tilpasset hver rolle, og løbende support de første 30-60 dage. Vi måler faktisk brug — ikke bare at løsningen er live.",
      },
    },
    {
      "@type": "Question",
      name: "Er AI-løsninger GDPR-sikre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Alle vores løsninger bygges med GDPR fra dag 1. Vi håndterer databehandleraftaler, vælger hosting i EU når det kræves, og sikrer at jeres data aldrig bruges til at træne offentlige modeller.",
      },
    },
    {
      "@type": "Question",
      name: "Hvad koster en AI-løsning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Afhænger af omfang. Små workshops starter ved 25.000 kr, skræddersyede løsninger typisk 50.000-250.000 kr. Vi giver altid et fast tilbud før vi går i gang. Første afklaringsmøde er altid gratis.",
      },
    },
    {
      "@type": "Question",
      name: "Kan vi ikke bare bruge ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Til simple opgaver, ja. Men ChatGPT kender ikke jeres data, systemer eller processer. Skræddersyet AI integrerer med jeres CRM, ERP, webshop og vidensbase — og arbejder automatisk uden at en medarbejder sidder og prompter. Det er forskellen på et værktøj og en medarbejder.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Forside",
      item: "https://ai-konsulenterne.dk/",
    },
  ],
};

export default function Forside() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Hero />
      <SocialProofBar />
      <Barriers />
      <ProblemSolution />
      <CaseHighlight />
      <Testimonials />
      <Team />
      <ServicesOverview />
      <RiskReversal />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </>
  );
}
