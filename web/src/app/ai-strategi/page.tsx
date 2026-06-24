import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "AI-strategi til virksomheder | AI-analyse & roadmap | AI Konsulenterne" },
  description:
    "Få en AI-strategi, der bliver til noget. Vi laver AI-analysen, lægger en konkret roadmap og hjælper jer hele vejen til implementering. Gratis AI-afklaring.",
  alternates: { canonical: "/ai-strategi" },
  keywords: [
    "AI strategi",
    "AI roadmap",
    "AI analyse",
    "AI implementering",
    "AI strategi og roadmap",
    "AI strategi virksomhed",
  ],
  openGraph: {
    title: "AI-strategi til virksomheder | AI-analyse & roadmap",
    description:
      "En konkret AI-strategi: AI-analyse, roadmap og implementering. Vi hjælper danske virksomheder fra plan til resultater.",
    url: "/ai-strategi",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI-strategi og roadmap",
  serviceType: "AI Strategy Consulting",
  description:
    "AI-strategi til danske virksomheder. Vi laver AI-analysen, lægger en konkret roadmap og hjælper med implementering.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/ai-strategi",
};

const faqs = [
  {
    q: "Hvad koster en AI-strategi?",
    a: "Det afhænger af, hvor stor en del af forretningen vi kigger på. Vi starter altid med en gratis AI-afklaring, hvor vi finder ud af, hvad I har brug for - og giver jer en fast pris bagefter, så I ved præcis, hvad I siger ja til.",
  },
  {
    q: "Hvor lang tid tager det at lægge en AI-strategi?",
    a: "En første AI-analyse og roadmap er typisk på plads inden for et par uger. Vi gør det konkret og handlingsorienteret - I skal ikke vente måneder på et dokument, men have en plan, I kan begynde at bruge med det samme.",
  },
  {
    q: "Kan I også hjælpe med implementeringen bagefter?",
    a: "Ja. En strategi er kun noget værd, når den bliver til drift. Vi bygger og integrerer løsningerne med jeres systemer - eller klæder jeres egne folk på til at gøre det. Vi vil være jeres AI-samarbejdspartner hele vejen.",
  },
  {
    q: "Vi er en mindre virksomhed - er en AI-strategi relevant for os?",
    a: "Ja, måske endda mere. Når ressourcerne er små, betaler det sig at vide præcis, hvor AI giver mest værdi, før I bruger tid og penge. En AI-strategi sikrer, at I starter det rigtige sted - ikke med spredte forsøg, der sjældent skalerer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const STEPS = [
  {
    n: "01",
    h: "AI-analyse",
    p: "Vi kortlægger jeres processer og finder konkret, hvor AI sparer mest tid - og hvor det ikke kan betale sig.",
  },
  {
    n: "02",
    h: "Strategi & roadmap",
    p: "Vi prioriterer jeres use cases og lægger en konkret AI-roadmap med rækkefølge, ansvar og forventet effekt.",
  },
  {
    n: "03",
    h: "Implementering",
    p: "Vi bygger og integrerer løsningerne med jeres systemer - eller klæder jeres egne folk på til selv at køre dem.",
  },
  {
    n: "04",
    h: "AI-samarbejdspartner",
    p: "Vi står ved jeres side, så strategien bliver til drift og resultater - ikke et dokument, der samler støv.",
  },
];

const STATS = [
  {
    figure: "20-30%",
    text: "af arbejdstiden i administrative processer kan spares med AI.",
    source: "McKinsey",
  },
  {
    figure: "40%",
    text: "hurtigere løser AI-assisterede medarbejdere deres opgaver.",
    source: "MIT-studie",
  },
  {
    figure: "1 plan",
    text: "i stedet for spredte AI-forsøg, der sjældent skalerer.",
    source: "Derfor en strategi",
  },
];

const HUB = [
  {
    href: "/skraeddersyede-ai",
    h: "AI-løsninger & automatisering",
    p: "Når strategien skal bygges - skræddersyet AI integreret med jeres systemer.",
  },
  {
    href: "/academy",
    h: "AI-kursus & uddannelse",
    p: "Klæd hele organisationen på med vores online AI-læringsunivers.",
  },
  {
    href: "/workshop",
    h: "AI-workshop",
    p: "En hands-on dag, hvor jeres team kommer i gang med AI i praksis.",
  },
  {
    href: "/visionai",
    h: "AIK Workspace",
    p: "Jeres eget AI-system til hele virksomheden - samlet ét sted.",
  },
];

export default function AiStrategi() {
  return (
    <div>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── Hero ── */}
      <section className="pt-[clamp(4rem,11vw,8rem)] pb-[clamp(3rem,8vw,5.5rem)] relative overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-primary">
              AI-strategi
            </p>
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-bold tracking-heading text-gray-900 leading-[1.05] mt-4 text-balance">
              AI-strategi til danske virksomheder -{" "}
              <span className="text-primary">der rent faktisk bliver til noget.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
              En AI-strategi er ikke et 80-siders dokument, der samler støv. Det
              er en konkret plan for, hvor AI giver jer mest værdi - og hvordan I
              kommer i gang. Vi laver AI-analysen, lægger en roadmap og hjælper
              jer hele vejen til implementering.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <Button variant="primary" size="lg" cal>
                Book en gratis AI-afklaring
              </Button>
              <Button variant="secondary" size="lg" href="/ai-guide">
                Få en gratis AI-analyse
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-5">
              Finder vi ikke en konkret AI-mulighed, der kan spare jer tid -
              koster det ingenting.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Hvad er en AI-strategi ── */}
      <section className="py-[clamp(3.5rem,8vw,6rem)] bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Hvad er en AI-strategi - i praksis?
            </h2>
            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
              En AI-strategi er en plan for, hvordan jeres virksomhed bruger AI
              til at spare tid og skabe værdi. Den starter med en AI-analyse af
              jeres processer, prioriterer de use cases, der betaler sig hurtigst,
              og ender i en konkret roadmap for, hvad I gør - og i hvilken
              rækkefølge.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
              Det handler ikke om at bruge AI for at bruge AI. Det handler om at
              vælge de rigtige steder at starte, de rigtige værktøjer og en plan,
              som jeres folk faktisk kan følge - så I ikke ender med spredte
              forsøg, der aldrig bliver til drift.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Proces ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Sådan gør vi
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Fra AI-analyse til roadmap til implementering
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 90}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow">
                  <span className="text-2xl font-bold text-primary">{s.n}</span>
                  <h3 className="text-lg font-bold tracking-heading text-gray-900 mt-4 leading-tight">
                    {s.h}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed text-[0.95rem]">
                    {s.p}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hvorfor ── */}
      <section className="py-[clamp(4rem,10vw,7rem)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Derfor betaler det sig
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                En AI-strategi er forskellen på effekt og spildte forsøg
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <FadeIn key={s.source} delay={i * 90}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 p-8">
                  <p className="text-4xl lg:text-5xl font-bold tracking-heading text-primary">
                    {s.figure}
                  </p>
                  <p className="text-gray-700 mt-4 leading-relaxed">{s.text}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold mt-4">
                    {s.source}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hub / interne links ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] max-w-2xl">
              Når strategien er på plads - så hjælper vi videre
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HUB.map((c, i) => (
              <FadeIn key={c.href} delay={i * 80}>
                <Link
                  href={c.href}
                  className="group block h-full bg-white rounded-2xl border border-gray-100 p-7 hover:border-gray-900 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-heading text-gray-900 leading-tight">
                      {c.h}
                    </h3>
                    <span className="text-primary text-2xl transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 leading-relaxed">{c.p}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[clamp(4rem,10vw,7rem)] bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] text-center">
              Spørgsmål om AI-strategi
            </h2>
          </FadeIn>
          <div className="mt-12 flex flex-col gap-4">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 60}>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-base lg:text-lg font-bold tracking-heading text-gray-900 leading-tight">
                    {f.q}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Skal vi lægge jeres AI-strategi?
            </h2>
            <p className="text-gray-500 mt-5 max-w-xl mx-auto leading-relaxed text-lg">
              Vi starter med en gratis AI-afklaring. Vi finder ud af, hvor AI
              giver jer mest værdi - og siger ærligt til, hvis det ikke kan betale
              sig endnu.
            </p>
            <div className="mt-9 flex justify-center">
              <Button variant="primary" size="lg" cal>
                Book en gratis AI-afklaring
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
