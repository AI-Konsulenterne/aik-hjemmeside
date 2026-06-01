import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VisionAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "VisionAI er AI Konsulenternes eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede miljø, forankret i jeres egne data og systemer.",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
  },
  provider: { "@id": "https://ai-konsulenterne.dk/#organization" },
};

export const metadata: Metadata = {
  title: "VisionAI - Jeres eget AI-system i et lukket miljø",
  description:
    "VisionAI er vores eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede, GDPR-sikre miljø, forankret i jeres data. Fuld modelfrihed og kildehenvisning.",
  alternates: { canonical: "/visionai" },
  keywords: [
    "AI dashboard",
    "AI business intelligence",
    "AI rapportering",
    "AI dataanalyse virksomhed",
  ],
  openGraph: {
    title: "VisionAI - Jeres eget AI-system",
    description:
      "Vores eget AI-system. Ligesom ChatGPT, men i jeres eget lukkede miljø, forankret i jeres data.",
    url: "/visionai",
  },
};

const features = [
  {
    title: "Fuld modelfrihed",
    description:
      "Vælg og kombinér ChatGPT, Claude, Gemini eller jeres egne modeller. I bestemmer hvilken model der løser hvilken opgave.",
    iconPath: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Forankret i jeres data",
    description:
      "VisionAI forbindes til SharePoint, Teams, dokumenter, Visma, Slack og Salesforce, så svarene altid bygger på jeres egen viden.",
    iconPath: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
  {
    title: "Altid med kildehenvisning",
    description:
      "Hvert svar kommer med kildehenvisning, så I altid kan verificere hvor svaret stammer fra. Ingen sorte bokse.",
    iconPath: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  },
  {
    title: "Skalerbar og datasikker",
    description:
      "Vokser fra én afdeling til hele organisationen. EU-hosting, GDPR-compliant, og jeres data deles aldrig med OpenAI eller Anthropic.",
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function VisionAI() {
  return (
    <>
      <JsonLd data={productSchema} />
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                VisionAI · Vores eget AI-system
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Ligesom ChatGPT - men i jeres eget lukkede miljø
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                VisionAI er vores eget AI-system, bygget til hele jeres
                virksomhed. Det føles som ChatGPT, men svarene er forankret i
                jeres egne data, systemer og forretningslogik - i et lukket,
                GDPR-sikkert miljø.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Få en demo
                </Button>
                <Button variant="secondary" size="lg" href="/cases">
                  Se VisionAI i praksis
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Product preview placeholder */}
      <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gray-200 rounded-2xl aspect-video max-w-4xl mx-auto flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>
                <span className="text-gray-400 text-sm">
                  VisionAI dashboard preview
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Natural language example */}
      <section className="py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold text-center mb-4">
                Prøv det selv
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-10">
                Stil spørgsmål på dansk
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-400 mb-1">Du spørger:</p>
                    <p className="font-semibold">
                      &ldquo;Hvilke kunder har vi ikke kontaktet i over 30 dage?&rdquo;
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <p className="text-sm text-primary mb-1">VisionAI svarer:</p>
                    <p className="text-gray-700">
                      Jeg har fundet 12 kunder der ikke er kontaktet i over 30 dage.
                      3 af dem har åbne tilbud. Skal jeg oprette opfølgningsopgaver?
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-12">
              Hvad kan VisionAI?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
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
                        d={feature.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-heading mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading">
                Klar til at se jeres data i et nyt lys?
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed">
                Book en gratis demo og se hvordan VisionAI kan give jer overblik
                over jeres virksomhed.
              </p>
              <div className="mt-8">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book en demo
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
