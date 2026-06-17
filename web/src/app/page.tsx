import Hero from "@/components/sections/Hero";
import SocialProofBar from "@/components/sections/SocialProofBar";
import Barriers from "@/components/sections/Barriers";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ServicesOverview from "@/components/sections/ServicesOverview";
import CaseHighlight from "@/components/sections/CaseHighlight";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vi har ikke en IT-afdeling - kan vi stadig få AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja - og I er faktisk i godt selskab. Det er størstedelen af vores kunder. I behøver hverken IT-folk eller intern AI-viden for at komme i gang, det er det vi er her til. Vi sætter det op, viser jer hvordan det bruges, og er der hvis noget driller.",
      },
    },
    {
      "@type": "Question",
      name: "Hvilke platforme bruger I?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi er ikke gift med én leverandør. Vi bruger det der passer bedst til opgaven - Azure OpenAI, Claude, Gemini, åbne modeller, eller en kombination. Vi sælger ikke licenser, vi løser opgaver.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan sikrer I at medarbejderne faktisk bruger løsningen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det er nok det sværeste i hele AI-historien - og det er der de fleste projekter falder fra hinanden. Vi bygger løsningen ind i de værktøjer folk bruger i forvejen. Efter lancering kigger vi sammen på hvem der bruger det, og hvor der skal justeres.",
      },
    },
    {
      "@type": "Question",
      name: "Er det GDPR-sikkert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Vi bygger altid setups der overholder GDPR - jeres data ender ikke i åbne modeller, og bliver ikke brugt til at træne noget. Hvor strengt setuppet skal være kommer an på jer - nogle kører fint med en cloud-løsning og en databehandleraftale, andre vil have alt liggende internt.",
      },
    },
    {
      "@type": "Question",
      name: "Hvad koster det?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det kommer an på hvad vi bygger. Workshops starter typisk omkring 25.000 kr. Mindre AI-løsninger ligger fra 50.000 kr og opefter. Efter første snak giver vi jer en fast pris, så I ved præcis hvad I siger ja til.",
      },
    },
    {
      "@type": "Question",
      name: "Kan vi ikke bare bruge ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selvfølgelig kan I det - vi bruger den også selv. ChatGPT er fin til de hurtige opgaver. Men når I rammer et reelt behov der kræver jeres egne data, jeres systemer eller en proces der skal køre af sig selv, så er en standardchat ikke nok. Der bygger vi noget der løser den specifikke ting.",
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
      <ServicesOverview />
      <CaseHighlight />
      <Testimonials />
      <MidCTA />
      <Team />
      <FAQ />
    </>
  );
}
