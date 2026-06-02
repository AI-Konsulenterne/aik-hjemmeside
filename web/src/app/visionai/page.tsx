import type { Metadata } from "next";
import Image from "next/image";
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
      "Jeres viden ligger spredt i SharePoint, Teams og dokumenter. VisionAI samler det hele og gør det brugbart.",
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
    iconPath:
      "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
  {
    title: "Salg & Kundeservice",
    description:
      "Find hurtigt oplysninger om produkter, kontrakter og kundehistorik - direkte i VisionAI.",
    iconPath:
      "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
  {
    title: "Juridisk & Compliance",
    description:
      "Søg i kontrakter, politikker og regulatoriske dokumenter.",
    iconPath:
      "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c.621.084 1.237.18 1.849.291.811.147 1.401.85 1.401 1.677v1.85c0 1.025-.95 1.788-1.94 1.539a3.75 3.75 0 00-1.86 0c-.99.249-1.94-.514-1.94-1.54V5.732m0 0c-.621-.084-1.237-.18-1.849-.291m1.849.291L18.75 9m-1.849-3.769A48.5 48.5 0 0012 4.97m6.75.262L20.6 9M5.25 4.97L3.4 9m1.85-3.769c-.621.084-1.237.18-1.849.291-.811.147-1.401.85-1.401 1.677v1.85c0 1.025.95 1.788 1.94 1.539a3.75 3.75 0 011.86 0c.99.249 1.94-.514 1.94-1.54V5.732",
  },
  {
    title: "IT & Support",
    description:
      "Giv medarbejderne selvbetjening til teknisk support og dokumentation.",
    iconPath:
      "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  },
  {
    title: "Marketing & Kommunikation",
    description:
      "Find og genbrug eksisterende indhold, cases og produktinformation - og skab hurtigere, mere konsistent kommunikation.",
    iconPath:
      "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46",
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <FadeIn>
              <div>
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
                <div className="flex flex-wrap items-center gap-2.5 mt-8">
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
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Button variant="primary" size="lg" href="/kontakt" cal>
                    Book en demo
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                <Image
                  src="/screenshots/aik-gpt.png"
                  alt="VisionAI - jeres eget AI-system i et lukket miljø"
                  width={768}
                  height={502}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </FadeIn>
          </div>
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
                Jeres data bliver i et sikkert miljø under jeres kontrol
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
                <div className="bg-white rounded-2xl p-7 ring-1 ring-gray-100 h-full hover:ring-primary/30 hover:shadow-md transition-all duration-300">
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
                        d={u.iconPath}
                      />
                    </svg>
                  </div>
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
                hukommelse. Træk i stregen for at se jeres pris.
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
