import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import OrdForOrd from "@/components/ui/OrdForOrd";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import SektionHoved from "@/components/side/SektionHoved";
import TrinFlow from "@/components/side/TrinFlow";
import { KortRoadmap } from "@/components/side/EksempelKort";

export const metadata: Metadata = {
  title: { absolute: "AI-strategi til virksomheder | AI Konsulenterne" },
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
    a: "Det afhænger af, hvor stor en del af forretningen vi kigger på. Vi starter altid med en gratis AI-afklaring, hvor vi finder ud af, hvad I har brug for. Bagefter får I en fast pris, så I ved præcis, hvad I siger ja til.",
  },
  {
    q: "Hvor lang tid tager det at lægge en AI-strategi?",
    a: "En første AI-analyse og roadmap er typisk på plads inden for et par uger. I skal ikke vente måneder på et dokument. I får en plan, I kan begynde at bruge med det samme.",
  },
  {
    q: "Kan I også hjælpe med implementeringen bagefter?",
    a: "Ja. En strategi er kun noget værd, når den bliver til drift. Vi bygger løsningerne og kobler dem på jeres systemer, eller vi klæder jeres egne folk på til at gøre det. Vi bliver gerne hele vejen.",
  },
  {
    q: "Vi er en mindre virksomhed. Er en AI-strategi relevant for os?",
    a: "Ja, måske endda mere. Når ressourcerne er små, betaler det sig at vide præcis, hvor AI giver mest værdi, før I bruger tid og penge. Med en strategi starter I det rigtige sted og ikke med spredte forsøg, der sjældent bliver til mere.",
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

/**
 * AI-strategi. Bygget om i forsidens sprog: filmen i heroen med en
 * eksempel-roadmap, intro i to spalter, forløbet fra analyse til drift
 * som scroll-flow med "Det får I", tallene på mørk flade, de fire ydelser
 * strategien fører videre til, FAQ og Alexander. Indholdet er sidens eget.
 */

const TRIN = [
  {
    titel: "AI-analyse",
    tekst: "Vi kortlægger jeres processer og finder konkret, hvor AI sparer mest tid, og hvor det ikke kan betale sig.",
    faar: "Et overblik over, hvor AI giver mening hos jer, og hvor det ikke gør.",
  },
  {
    titel: "Strategi og roadmap",
    tekst: "Vi prioriterer jeres use cases og lægger en konkret roadmap med rækkefølge, ansvar og forventet effekt.",
    faar: "En roadmap, I kan begynde at bruge med det samme.",
  },
  {
    titel: "Implementering",
    tekst: "Vi bygger og integrerer løsningerne med jeres systemer, eller klæder jeres egne folk på til selv at køre dem.",
    faar: "De første løsninger i brug.",
  },
  {
    titel: "AI-samarbejdspartner",
    tekst: "Vi står ved jeres side, så strategien bliver til drift og resultater, ikke et dokument, der samler støv.",
    faar: "En partner, der sørger for, at planen bliver fulgt.",
  },
];

const TAL = [
  ["20-30%", "af arbejdstiden i administrative processer kan spares med AI.", "McKinsey"],
  ["40%", "hurtigere løser AI-assisterede medarbejdere deres opgaver.", "MIT-studie"],
  ["Et par uger", "fra første møde til en roadmap, I kan begynde at bruge.", "Typisk forløb hos os"],
];

const VIDERE = [
  ["/skraeddersyede-ai", "Skræddersyet AI", "Når strategien skal bygges: AI koblet på jeres egne systemer."],
  ["/academy", "AI-Minds læringsplatform", "Klæd hele organisationen på med korte moduler på dansk."],
  ["/workshop", "Workshop hos jer", "En hands-on dag, hvor jeres team kommer i gang med AI i praksis."],
  ["/visionai", "AIK Workspace", "Jeres eget AI-system til hele virksomheden, samlet ét sted."],
];

export default function AiStrategi() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <SideHero
        id="strategi-titel"
        kicker="AI-strategi"
        titel={["En AI-strategi, der", "bliver til noget."]}
        tekst="En AI-strategi er ikke et 80-siders dokument, der samler støv. Det er en konkret plan for, hvor AI giver jer mest værdi, og hvordan I kommer i gang."
        primaer={{ label: "Book en gratis AI-afklaring", href: "/kontakt" }}
        sekundaer={{ label: "Få en gratis AI-analyse", href: "/ai-guide" }}
        skud={["kontor", "vindmoelle"]}
        fakta={[
          ["Et par uger", "til analyse og roadmap"],
          ["Fast pris", "efter afklaringen"],
          ["45 min.", "gratis AI-afklaring"],
          ["Hele vejen", "til drift"],
        ]}
        eksempel={<KortRoadmap />}
      />

      {/* --- Hvad er det i praksis --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="kicker text-gray-600">I praksis</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-display text-gray-900">
                En plan, jeres folk kan følge.
              </OrdForOrd>
            </div>
            <FadeIn delay={200} className="space-y-5 lg:col-span-7 lg:pt-14">
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-gray-600">
                En AI-strategi er en plan for, hvordan jeres virksomhed bruger AI
                til at spare tid og skabe værdi. Den starter med en analyse af
                jeres processer, prioriterer de use cases, der betaler sig
                hurtigst, og ender i en konkret roadmap for, hvad I gør, og i
                hvilken rækkefølge.
              </p>
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-gray-600">
                Det handler ikke om at bruge AI for at bruge AI. Det handler om at
                vælge de rigtige steder at starte, de rigtige værktøjer og en plan,
                I kan følge, så I ikke ender med spredte forsøg, der aldrig bliver
                til drift.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <TrinFlow
        graa
        kicker="Sådan gør vi"
        titel="Fra analyse til roadmap til drift."
        tekst="Konkret og handlingsorienteret. I skal ikke vente måneder på et dokument."
        trin={TRIN}
      />

      {/* --- Derfor betaler det sig --- */}
      <section data-header="moerk" className="section-y bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved mork kicker="Derfor betaler det sig" titel="Forskellen på effekt og spildte forsøg." />
          <dl className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20">
            {TAL.map(([tal, tekst, kilde], i) => (
              <FadeIn key={tal} delay={i * 100}>
                <div className="border-t border-white/15 pt-6">
                  <dt className="text-[clamp(2.75rem,4.5vw,3.75rem)] font-bold leading-none tracking-display text-white">{tal}</dt>
                  <dd className="mt-4 max-w-[30ch] text-[1rem] leading-relaxed text-white/70">{tekst}</dd>
                  <dd className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/50">{kilde}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Når strategien er på plads --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Når strategien er på plads"
            titel="Så hjælper vi videre."
            tekst="Strategien peger på, hvad der skal ske. Her er de fire måder, vi kan tage det videre sammen med jer."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {VIDERE.map(([href, titel, tekst], i) => (
              <FadeIn key={href} delay={i * 80} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl bg-gray-50 p-7 ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold tracking-heading text-gray-900">{titel}</h3>
                    <span aria-hidden="true" className="text-xl text-gray-900 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-gray-600">{tekst}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} kicker="Spørgsmål om AI-strategi" titel="Det, vores kunder spørger om" graa />

      <TalMedAlexander
        kicker="Næste skridt"
        titel="Skal vi lægge jeres AI-strategi?"
        tekst="Vi starter med en gratis AI-afklaring. Vi finder ud af, hvor AI giver jer mest værdi, og siger ærligt til, hvis det ikke kan betale sig endnu."
        knap={{ label: "Book en gratis AI-afklaring", href: "/kontakt" }}
      />
    </>
  );
}
