import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SubpageCTA from "@/components/sections/SubpageCTA";
import JsonLd from "@/components/ui/JsonLd";

const workshopSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Workshop for Virksomheder",
  description:
    "Hands-on AI-workshop for danske virksomheder. Lær ChatGPT, prompt engineering og praktisk brug af AI.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  courseMode: "onsite",
  educationalLevel: "Intermediate",
  inLanguage: "da",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "DK" },
    },
  },
};

export const metadata: Metadata = {
  title: "AI Workshop for Virksomheder | Hands-on AI Kursus",
  description:
    "AI-workshop for danske virksomheder. Hands-on kursus i ChatGPT, prompt engineering og AI-værktøjer — så medarbejderne kan bruge AI fra dag 1.",
  alternates: { canonical: "/workshop" },
  keywords: [
    "AI workshop virksomhed",
    "AI kursus",
    "ChatGPT kursus virksomhed",
    "prompt engineering kursus",
    "AI træning medarbejdere",
  ],
  openGraph: {
    title: "AI Workshop for Virksomheder — Hands-on Kursus",
    description:
      "AI-workshop til danske virksomheder. Fra ChatGPT til skræddersyede AI-løsninger.",
    url: "/workshop",
  },
};

const includes = [
  {
    title: "En workshop bygget om jeres behov",
    description:
      "Skal I have det grundlæggende på plads? Lære at prompte ordentligt? Eller springe direkte til konkrete use cases I allerede har i tankerne? Vi snakker det igennem med jer på forhånd og bygger dagen omkring det - med den rigtige blanding af oplæg og hands-on.",
    iconPath: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
  {
    title: "Tilpasset jer, ikke en standardpakke",
    description:
      "En workshop for et marketingsbureau ligner ikke en for et byggefirma - og det skal den heller ikke. Vi bygger om jeres branche, jeres opgaver og jeres niveau.",
    iconPath: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  },
  {
    title: "Værktøjer I kan bruge dagen efter",
    description:
      "Alle går hjem med en konkret plan for deres egne opgaver og adgang til de værktøjer vi har gennemgået.",
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const formats = [
  {
    title: "Halv dag (3 timer)",
    description:
      "En god første smagsprøve. Vi gennemgår de vigtigste AI-værktøjer og prøver dem af på et par konkrete opgaver fra jeres hverdag.",
    suited: "Bedst til: Teams på 5-15 personer der vil i gang",
    highlight: false,
  },
  {
    title: "Hel dag (6 timer)",
    description:
      "Vi går mere i dybden. Halv dag oplæg og hands-on, halv dag på jeres egne use cases. Alle går hjem med en plan for hvad de selv kan bruge AI til.",
    suited: "Bedst til: Afdelinger og ledergrupper",
    highlight: true,
  },
];

export default function Workshop() {
  return (
    <>
      <JsonLd data={workshopSchema} />
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                  AI Workshop
                </p>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                  En dag hvor jeres team prøver kræfter med AI
                </h1>
                <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                  Vi tilpasser dagen til jer - fra generel AI-forståelse og
                  prompt school til konkrete use cases I sidder med lige nu. Vi
                  snakker sammen med jer om hvor I står, og finder den rigtige
                  blanding af teori og praksis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Button variant="primary" size="lg" href="/kontakt" cal>
                    Book en workshop
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                <Image
                  src="/team/alexander-hero.png"
                  alt="AI-workshop med AI Konsulenterne"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's included — list-stil for at adskille fra format-kortene */}
      <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 mb-10 lg:mb-12">
              Hvad får I med hjem?
            </h2>
          </FadeIn>
          <div className="flex flex-col divide-y divide-gray-200">
            {includes.map((item, i) => (
              <FadeIn key={item.title} delay={i * 120}>
                <div className="flex items-start gap-5 py-6 lg:py-7">
                  <div className="w-11 h-11 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center">
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
                        d={item.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold tracking-heading mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-12">
              Vælg det format der passer jer
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {formats.map((format, i) => (
              <FadeIn key={format.title} delay={i * 150}>
                <div
                  className={`rounded-2xl p-8 h-full transition-colors ${
                    format.highlight
                      ? "border-2 border-primary bg-primary/5"
                      : "border-2 border-gray-200 hover:border-primary"
                  }`}
                >
                  {format.highlight && (
                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                      Mest populær
                    </p>
                  )}
                  <h3 className="text-xl font-bold tracking-heading mb-3">
                    {format.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    {format.description}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    {format.suited}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SubpageCTA
        heading="Klar til at løfte jeres team?"
        description="Kontakt os for en uforpligtende snak om hvilken workshop der passer til jeres virksomhed."
      />
    </>
  );
}
