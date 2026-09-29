import HomeHero from "@/components/sections/HomeHero";
import ToSpor from "@/components/sections/ToSpor";
import DataHistorie from "@/components/sections/DataHistorie";
import CaseLavazza from "@/components/sections/CaseLavazza";
import ReferencerBaand from "@/components/sections/ReferencerBaand";
import SaadanArbejderVi from "@/components/sections/SaadanArbejderVi";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import JsonLd from "@/components/ui/JsonLd";
import { FAQS } from "@/content/faq";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ai-konsulenterne.dk/#organization",
  name: "AI Konsulenterne",
  alternateName: "AIK",
  url: "https://ai-konsulenterne.dk",
  description:
    "Dansk AI-konsulenthus der lærer virksomheders medarbejdere at bruge AI og bygger AI-løsninger på deres egne data og systemer.",
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

/* Spoergsmaalene stod baade her og i FAQ-komponenten, med forskellig
   ordlyd og forskelligt antal. Nu laeser begge fra src/content/faq.ts, saa
   struktureret data altid beskriver det der faktisk staar paa siden. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
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
      {/* Heroen siger hvad AIK laver, i én sætning, med filmen som baggrund.
          Før stod det rigtige udsagn kun for skærmlæsere, og det man så var
          et "REFERENCER"-mærke og en billedtekst. Filmens linje om kunderne
          står nu nederst i heroen, som bevis og ikke som overskrift. */}
      {/* Fortællingen en køber går igennem: hvad laver I (heroen), hvordan
          kan vi bruge jer (to spor), er det ægte (demoerne), hvem stoler på
          jer (casen), hvordan foregår det og er det sikkert (proces og
          tillid), og så et menneske at tale med. FAQ'en tager indvendingerne
          lige før.

          Fra de to tidligere udgaver er taget ud: procesafsnittet i sin
          lange form, de tre ydelsesspalter, den gamle case, midtvejs-CTA'en
          og væggen med fire mørke paneler. Filerne findes stadig; de er
          bare ikke på forsiden. Begge tidligere udgaver ligger på hver sin
          branch: claude/simpel-udgave og claude/ml-udgave.

          Udtalelser kommer fra Strapi og er taget af forsiden. Seed-dataene
          har anonyme udtalelser ("Ledelse, INDKOM") fra kunder vi ikke må
          nævne. Kommer der en navngiven udtalelse fra Lavazza eller J.M Band,
          er komponenten klar til at komme tilbage. Smukfest er J.M Bands
          kunde, ikke vores, og nævnes ikke som vores.

          Holdet er tilbage (Team): det viser kun rigtige navne fra Strapi og
          skjuler pladsholderne ("Navn kommer"). */}
      <HomeHero />
      <ToSpor />
      <DataHistorie />
      <CaseLavazza />
      <ReferencerBaand />
      <SaadanArbejderVi />
      <Team />
      <FAQ />
      <TalMedAlexander />
    </>
  );
}
