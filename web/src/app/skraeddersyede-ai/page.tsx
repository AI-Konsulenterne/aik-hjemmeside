import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SubpageCTA from "@/components/sections/SubpageCTA";
import JsonLd from "@/components/ui/JsonLd";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Skræddersyede AI-løsninger",
  serviceType: "AI Consulting & Development",
  description:
    "Skræddersyede AI-løsninger til danske SMV'er. Custom AI bygget og integreret med jeres CRM, ERP og eksisterende systemer.",
  provider: { "@id": "https://ai-konsulenterne.dk/#organization" },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/skraeddersyede-ai",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    description: "Skræddersyet AI-løsning, typisk 50.000-250.000 kr",
  },
};

export const metadata: Metadata = {
  title: "Skræddersyede AI-løsninger til SMV'er | Custom AI Udvikling",
  description:
    "Vi bygger skræddersyede AI-løsninger til danske SMV'er — integreret med jeres CRM, ERP og webshop. Platformsuafhængig rådgivning. Gratis AI-afklaring.",
  alternates: { canonical: "/skraeddersyede-ai" },
  keywords: [
    "skræddersyede AI-løsninger",
    "custom AI løsning",
    "AI udvikling virksomhed",
    "AI til SMV",
    "AI integration CRM",
    "AI implementering Danmark",
  ],
  openGraph: {
    title: "Skræddersyede AI-løsninger til SMV'er",
    description:
      "Custom AI til danske SMV'er — integreret med jeres systemer. Gratis AI-afklaring.",
    url: "/skraeddersyede-ai",
  },
};

const benefits = [
  {
    title: "Bygget til jeres virksomhed",
    description:
      "Vi analyserer jeres arbejdsgange og bygger AI der passer præcis til jeres behov — ikke en one-size-fits-all løsning.",
    iconPath: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
  },
  {
    title: "Integration med jeres systemer",
    description:
      "Vi integrerer AI direkte i de systemer I allerede bruger. CRM, ERP, e-commerce, kundeservice — vi binder det hele sammen.",
    iconPath: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
  },
  {
    title: "Ingen IT-afdeling krævet",
    description:
      "Vi tager os af alt det tekniske. I skal ikke have en IT-afdeling eller teknisk viden for at komme i gang.",
    iconPath: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
  {
    title: "Målbare resultater fra dag 1",
    description:
      "Vi definerer klare KPI'er fra start, så I kan se præcis hvad AI gør for jeres bundlinje.",
    iconPath: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Afklaring",
    description:
      "Vi starter med en gratis 45-minutters samtale om jeres virksomhed, udfordringer og muligheder med AI.",
  },
  {
    step: 2,
    title: "Analyse & forslag",
    description:
      "Vi dykker ned i jeres arbejdsgange og præsenterer et konkret forslag med forventet ROI og tidsplan.",
  },
  {
    step: 3,
    title: "Udvikling",
    description:
      "Vi bygger løsningen i tæt samarbejde med jer. I får løbende opdateringer og kan teste undervejs.",
  },
  {
    step: 4,
    title: "Lancering & support",
    description:
      "Vi implementerer løsningen i jeres hverdag og sikrer at alt kører. Vi står klar med support bagefter.",
  },
];

export default function SkraeddersyedeAI() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                Skræddersyede løsninger
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                AI der passer præcis til jeres virksomhed
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                Vi bygger ikke standardløsninger. Vi bygger AI der løser jeres
                specifikke udfordringer — og som integrerer med de systemer I
                allerede bruger.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book et møde i dag
                </Button>
                <Button variant="secondary" size="lg" href="/cases">
                  Se eksempler
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-12">
              Hvad gør vores løsninger anderledes?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={benefit.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-heading mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-12">
              Fra idé til løsning
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 150}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold tracking-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SubpageCTA
        heading="Klar til at automatisere?"
        description="Book en gratis 45-minutters AI-afklaring. Vi finder ud af præcis hvor AI kan spare jer tid — uden forpligtelser."
      />
    </>
  );
}
