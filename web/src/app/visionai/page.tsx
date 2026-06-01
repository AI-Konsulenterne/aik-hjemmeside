import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import VisionAIPricing from "@/components/ui/VisionAIPricing";
import VisionAIFaq from "@/components/ui/VisionAIFaq";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VisionAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "VisionAI er AI Konsulenternes eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede miljø, forankret i jeres egne data og systemer.",
  offers: { "@type": "Offer", priceCurrency: "DKK", price: "150" },
  provider: { "@id": "https://ai-konsulenterne.dk/#organization" },
};

export const metadata: Metadata = {
  title: "VisionAI - Jeres eget AI-system i et lukket miljø",
  description:
    "VisionAI er vores eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede, GDPR-sikre miljø, forankret i jeres data. Fuld modelfrihed og kildehenvisning.",
  alternates: { canonical: "/visionai" },
  keywords: [
    "VisionAI",
    "AI system virksomhed",
    "privat ChatGPT",
    "GDPR AI",
    "AI dashboard",
  ],
  openGraph: {
    title: "VisionAI - Jeres eget AI-system",
    description:
      "Vores eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede miljø, forankret i jeres data.",
    url: "/visionai",
  },
};

const badges = [
  "400+ daglige brugere",
  "GDPR-compliant",
  "Data i EU",
  "Hurtig opsætning",
];

const advantages = [
  {
    title: "Kendt oplevelse - skræddersyede svar",
    description:
      "Føles som ChatGPT, men svarene er forankret i jeres egen forretningslogik og data.",
    iconPath:
      "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
  {
    title: "Tag udgangspunkt i jeres egen data",
    description:
      "Jeres viden ligger spredt i SharePoint, Teams og dokumenter. VisionAI samler det hele og gør det brugbart på sekunder.",
    iconPath:
      "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75",
  },
  {
    title: "Fuld modelfrihed",
    description:
      "Vælg og kombinér ChatGPT, Claude, Gemini eller egne modeller - vælg den model der er bedst til opgaven.",
    iconPath:
      "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Skalerbar platform - vokser med jer",
    description:
      "Fra én afdeling til hele organisationen. Platformen udvides nemt og tilpasses nye behov.",
    iconPath:
      "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
  },
];

const security = [
  {
    title: "Data i EU",
    description: "Fuld GDPR-compliance og europæisk hosting.",
  },
  {
    title: "Datasuverænitet",
    description:
      "Jeres data bliver i Microsoft Azure (EU) og deles aldrig med OpenAI, Anthropic eller andre.",
  },
  {
    title: "Kildestyring",
    description:
      "I vælger præcist hvilke sites, biblioteker og postkasser der indekseres.",
  },
  {
    title: "Kildehenvisning",
    description:
      "Alle svar ledsages af en kildehenvisning, så I altid kan verificere svaret.",
  },
];

const useCases = [
  {
    title: "HR & Onboarding",
    description:
      "Automatisér svar på HR-relaterede forespørgsler og giv nye kollegaer en flyvende start med AI-drevet onboarding.",
  },
  {
    title: "Salg & Kundeservice",
    description:
      "Find hurtigt oplysninger om produkter, kontrakter og kundehistorik - direkte i VisionAI.",
  },
  {
    title: "Juridisk & Compliance",
    description:
      "Søg i kontrakter, politikker og regulatoriske dokumenter på sekunder.",
  },
  {
    title: "IT & Support",
    description:
      "Giv medarbejderne selvbetjening til teknisk support og dokumentation.",
  },
  {
    title: "Marketing & Kommunikation",
    description:
      "Find og genbrug eksisterende indhold, cases og produktinformation - og skab hurtigere, mere konsistent kommunikation.",
  },
];

const integrations = ["SharePoint", "Microsoft 365", "Slack", "Salesforce", "Visma", "DeepL"];
const models = ["ChatGPT", "Claude", "Gemini", "Azure OpenAI"];

export default function VisionAI() {
  return (
    <>
      <JsonLd data={productSchema} />

      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                VisionAI · Vores eget AI-system
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Ligesom ChatGPT - men i jeres eget lukkede miljø
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                VisionAI er jeres AI-system til hele virksomheden - forankret i
                jeres egen data, systemer og forretningslogik.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 ring-1 ring-gray-100 rounded-full px-3.5 py-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book en demo
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="pb-[clamp(3rem,8vw,5rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <figure className="bg-gray-900 rounded-2xl p-8 lg:p-10 text-center">
              <blockquote className="text-xl lg:text-2xl font-bold tracking-heading text-white leading-snug">
                &ldquo;VisionAI har hjulpet os i HR-afdelingen med at frigøre tid
                fra rutineopgaver.&rdquo;
              </blockquote>
              <figcaption className="text-primary font-semibold mt-4 text-sm">
                HR · Lavazza
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* Why VisionAI */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Hvorfor VisionAI
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Fire afgørende fordele
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {advantages.map((a, i) => (
              <FadeIn key={a.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 ring-1 ring-gray-100 h-full">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
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
                        d={a.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold tracking-heading text-gray-900 mb-2">
                    {a.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Integrér direkte med jeres systemer
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto">
              VisionAI forbinder sig til jeres systemer, databaser og API&apos;er,
              så al jeres viden bliver nemt tilgængelig.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mt-10 mb-4">
              Datakilder
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="bg-gray-50 ring-1 ring-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mt-10 mb-4">
              AI-modeller
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {models.map((name) => (
                <span
                  key={name}
                  className="bg-primary/5 ring-1 ring-primary/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Security & GDPR */}
      <section className="bg-gray-900 text-white py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Datasikkerhed & GDPR
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading leading-[1.1]">
                Jeres data forbliver sikker og under jeres kontrol
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {security.map((s, i) => (
              <FadeIn key={s.title} delay={i * 80}>
                <div className="bg-white/5 ring-1 ring-white/10 rounded-2xl p-6 h-full">
                  <h3 className="text-base font-bold tracking-heading text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Brug VisionAI på tværs af hele virksomheden
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Fra HR til marketing - VisionAI hjælper hver afdeling med at
                effektivisere arbejdsgange og styrke medarbejderne.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {useCases.map((u, i) => (
              <FadeIn key={u.title} delay={i * 70}>
                <div className="bg-gray-50 rounded-2xl p-7 ring-1 ring-gray-100 h-full">
                  <h3 className="text-lg font-bold tracking-heading text-gray-900 mb-2">
                    {u.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {u.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Pris
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Beregn jeres pris
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Enkel pris pr. bruger - inklusive tokens, søgninger og
                hukommelse. Træk i skyderen og se prisen.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <VisionAIPricing />
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                FAQ
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Ofte stillede spørgsmål
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <VisionAIFaq />
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 text-white py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading">
                Klar til at transformere jeres virksomhed?
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed">
                Lad os vise jer, hvordan VisionAI kan styrke jeres medarbejdere
                og frigøre tid til det, der virkelig skaber værdi.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book en gratis demo
                </Button>
                <a
                  href="tel:+4525547074"
                  className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Eller ring: +45 25 54 70 74
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-white/50">
                <span>Ingen binding</span>
                <span>GDPR-compliant</span>
                <span>Hurtig opsætning</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
