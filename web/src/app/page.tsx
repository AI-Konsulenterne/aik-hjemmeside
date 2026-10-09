import Hero from "@/components/sections/Hero";
import TwoPaths from "@/components/sections/TwoPaths";
import Barriers from "@/components/sections/Barriers";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowWeWork from "@/components/sections/HowWeWork";
import CaseHighlight from "@/components/sections/CaseHighlight";
import Team from "@/components/sections/Team";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import Testimonials from "@/components/sections/Testimonials";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/ui/JsonLd";
import { faqs } from "@/components/sections/faqData";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ai-konsulenterne.dk/#organization",
  name: "AI Konsulenterne",
  alternateName: "AIK",
  url: "https://ai-konsulenterne.dk",
  description:
    "Dansk AI-konsulenthus der bygger skræddersyede AI-løsninger til danske virksomheder.",
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
          name: "AIK Workspace",
          description:
            "Jeres eget AI-system til hele virksomheden - chat, agenter, vidensbase og styring i én platform.",
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
    "Gratis AI-afklaring på 30 minutter. Vi finder konkrete AI-muligheder der kan spare din virksomhed tid og penge.",
  provider: {
    "@id": "https://ai-konsulenterne.dk/#organization",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
    description: "Gratis og uden forpligtelse",
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
      <TwoPaths />
      <Barriers />
      <ProblemSolution />
      <HowWeWork />
      <CaseHighlight />
      <Testimonials />
      <DeveloperExperience />
      <Team />
      <FAQ />
      <MidCTA />
    </>
  );
}
