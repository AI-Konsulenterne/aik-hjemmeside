import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import OrdForOrd from "@/components/ui/OrdForOrd";
import Taeller from "@/components/ui/Taeller";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import SektionHoved from "@/components/side/SektionHoved";
import TrinFlow from "@/components/side/TrinFlow";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Skræddersyede AI-løsninger",
  serviceType: "AI Consulting & Development",
  description:
    "Skræddersyede AI-løsninger til danske virksomheder. Custom AI bygget og integreret med jeres CRM, ERP og eksisterende systemer.",
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
  title: { absolute: "AI-løsninger & AI-automatisering | AI Konsulenterne" },
  description:
    "Vi bygger AI-løsninger og AI-automatisering, der passer ind i jeres forretning - integreret med jeres CRM og systemer. AI-implementering uden intern AI-viden.",
  alternates: { canonical: "/skraeddersyede-ai" },
  keywords: [
    "AI løsninger",
    "AI automatisering",
    "AI implementering",
    "AI udvikling",
    "skræddersyet AI",
    "AI integration",
  ],
  openGraph: {
    title: "AI-løsninger & AI-automatisering til virksomheder",
    description:
      "Vi bygger AI-løsninger og AI-automatisering, der passer ind i jeres forretning - integreret med jeres systemer. Gratis AI-afklaring.",
    url: "/skraeddersyede-ai",
  },
};

/**
 * Skræddersyet AI: udviklingssporet.
 *
 * Bygget om i forsidens sprog. Kundeskud fra filmen i heroen, RAND-tallet
 * som sidens argument, "mål to gange og sav én gang" som tilgangen, J.M
 * Band-casen med et rigtigt skærmbillede af deres supportværktøj, de fem
 * trin som scroll-flow med "Det får I", og den gratis AI-analyse som
 * sekundær vej ind.
 *
 * Logostriben ("Vi har udviklet AI-løsninger til") er taget af: den viste
 * kunder, vi ikke må nævne. J.M Band står som case, og /referencer viser
 * resten. Alt indhold er sidens eget; prisen (typisk 50.000 til 250.000 kr.
 * med et konkret bud før der bygges) står i FAQ'en og i schema.
 */

const TRIN = [
  {
    titel: "Vi finder ud af, hvor skoen trykker",
    tekst: "Vi starter med forretningen, ikke teknologien: hvordan I arbejder i dag, og hvor der bliver brugt tid på det forkerte.",
    faar: "Et klart billede af, hvor det giver mest mening at gå i gang.",
  },
  {
    titel: "Vi lægger en plan",
    tekst: "Hvad skal bygges, hvordan spiller det sammen med jeres systemer, og hvordan er jeres data i sikre hænder? Intet overlades til tilfældighederne.",
    faar: "En klar plan for, hvad vi bygger, og hvordan.",
  },
  {
    titel: "Vi bygger og får det i gang",
    tekst: "Vi bygger i korte spring og får løsningen hurtigt i brug, så I kan mærke forskellen tidligt, i stedet for at vente på et stort projekt.",
    faar: "En første version, som vi tilpasser undervejs.",
  },
  {
    titel: "Vi ser, hvad der virker",
    tekst: "Når jeres medarbejdere bruger løsningen, ser vi sammen på, hvad der rammer plet, og hvad der skal justeres.",
    faar: "En løsning, der kører i drift.",
  },
  {
    titel: "Vi er med jer hele vejen",
    tekst: "Vi hjælper med at få løsningen helt ind i hverdagen, så den ikke står og falder med én person.",
    faar: "En AI-partner, der er med jer videre.",
  },
];

const HVORFOR = [
  ["AI siden 2016", "Vi har arbejdet med AI siden 2016 og ved, hvordan man udvikler, implementerer og drifter det i praksis."],
  ["Jeres data bliver i EU", "Vi vægter datasuverænitet højt, derfor ligger jeres data kun på servere i Sverige. De forlader ikke EU."],
  ["Ingen teknisk jargon", "Vi gør AI så håndgribeligt som muligt og taler om jeres opgaver, ikke om modeller og parametre."],
];

const SPOERGSMAAL = [
  {
    q: "Vi ved ikke, hvor vi skal starte.",
    a: "Det er helt normalt, og det er præcis det, første trin handler om. I behøver ikke have styr på det hele, før I ringer.",
  },
  {
    q: "Hvad koster det?",
    a: "Det afhænger af opgaven. En skræddersyet løsning ligger typisk mellem 50.000 og 250.000 kr., og I får altid et konkret bud, før der bliver bygget noget.",
  },
  {
    q: "Hvor lang tid tager det?",
    a: "Det varierer med opgaven, men typisk ser I en første version inden for få uger. Vi bygger i korte spring, så I mærker forskellen tidligt.",
  },
  {
    q: "Hvad sker der med vores data?",
    a: "Jeres data træner ingen modeller, hverken vores eller leverandørernes. I bestemmer, hvor løsningen kører: i skyen med en databehandleraftale eller helt internt.",
  },
];

export default function SkraeddersyedeAi() {
  return (
    <>
      <JsonLd data={serviceSchema} />

      <SideHero
        id="udvikling-titel"
        kicker="Skræddersyet AI"
        titel={["Bygget på jeres data.", "Koblet til jeres systemer."]}
        tekst="Vi bygger AI, der passer til jer, ikke en standardløsning. Vi tager udgangspunkt i jeres udfordringer, jeres systemer og jeres måde at arbejde på."
        primaer={{ label: "Book en samtale", href: "/kontakt" }}
        sekundaer={{ label: "Se hvem vi har hjulpet", href: "/referencer" }}
        skud={["kaffe", "vindmoelle", "armbaand", "kontor"]}
        fakta={[
          ["Siden 2016", "har vi arbejdet med AI"],
          ["Få uger", "til en første version"],
          ["Et konkret bud", "før der bygges noget"],
          ["Data i EU", "på servere i Sverige"],
        ]}
      />

      {/* --- Problemet --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="kicker text-gray-600">Problemet</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det er ikke teknologien, der dræber AI-projekter.
              </OrdForOrd>
            </div>
            <FadeIn delay={200} className="lg:col-span-5">
              <p className="text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-display text-gray-900">
                <Taeller til={80} suffiks="%" />
              </p>
              <p className="mt-3 max-w-[42ch] text-[0.975rem] leading-relaxed text-gray-600">
                af AI-projekter slår fejl, dobbelt så mange som almindelige
                IT-projekter. Studiet peger på uklare mål, data, der aldrig blev
                gjort klar, og løsninger, der blev bygget for teknologiens skyld.
              </p>
              <p className="mt-2 text-xs text-gray-600">RAND Corporation, 2024</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Tilgangen --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="kicker text-gray-600">Vores tilgang</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Mål to gange, sav én gang.
              </OrdForOrd>
              <FadeIn delay={200}>
                <p className="mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-gray-600">
                  Vi bruger tiden på at forstå jeres forretning, før vi bygger:
                  hvordan I arbejder, hvor skoen trykker, og hvor AI kan gøre den
                  største forskel. Det er den del, de fleste springer over, og
                  derfor ender så mange projekter med en løsning, ingen bruger.
                </p>
                <p className="mt-8 max-w-[34ch] border-l border-gray-300 pl-6 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-snug tracking-heading text-gray-900">
                  Vi vil hellere bruge en uge ekstra på at forstå end et halvt år på at bygge det forkerte.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={150} className="lg:col-span-5 lg:pt-16">
              <aside className="rounded-3xl bg-ink p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <span className="lamp" data-lit="true" aria-hidden="true" />
                  <p className="kicker text-white/60">AI Konsulenterne</p>
                </div>
                <p className="mt-6 text-[clamp(1.9rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-display text-white">
                  ai i øjenhøjde
                </p>
                <p className="mt-5 text-[0.975rem] leading-relaxed text-white/70">
                  Løsninger bliver bedst, når vi forstår hinanden. Derfor gør vi AI
                  så lavpraktisk og jordnært som muligt.
                </p>
              </aside>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Casen: J.M Band --- */}
      <section id="cases" data-header="moerk" className="section-y scroll-mt-20 overflow-hidden bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="kicker text-white/60">Case: J.M Band</p>
              <OrdForOrd className="mt-6 hyphens-auto text-balance text-[clamp(2rem,3.3vw,3rem)] font-bold leading-[1.04] tracking-display text-white">
                Kundeserviceagenten, der lærer af sine fejl.
              </OrdForOrd>
              <FadeIn delay={200}>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
                  J.M Band sælger i flere lande og får de samme kundespørgsmål igen
                  og igen. Vi byggede en AI, der hjælper med at svare, bygget på
                  deres egne svar og koblet til deres helpdesk.
                </p>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/75">
                  Det særlige: når AI&apos;en rammer ved siden af, skal de ikke vente
                  på en udvikler. De retter den selv. AI&apos;en foreslår, de godkender,
                  og den bliver lidt bedre for hver gang.
                </p>
                <Link href="/referencer" className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  <span className="understreg">Hvem vi ellers har hjulpet</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <figure className="afsloer overflow-hidden rounded-2xl bg-white ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="ml-3 text-xs text-gray-600">jmband.dk/support</span>
                </div>
                <Image
                  src="/screenshots/jmband-ai-support-web.png"
                  alt="J.M Bands supportværktøj: AI'en spørger, hvad den kan hjælpe med at rette, og foreslår rettelser, som teamet godkender."
                  width={2880}
                  height={1405}
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <TrinFlow
        kicker="Sådan arbejder vi"
        titel="Trin for trin, hånd i hånd."
        tekst="Vi starter med forretningen, ikke teknologien, og bygger i korte spring, så I mærker forskellen tidligt."
        trin={TRIN}
      />

      {/* --- Hvorfor os --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved kicker="Hvorfor os" titel="Vi vil være dem, I ringer til." />
          <dl className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3 lg:mt-20">
            {HVORFOR.map(([t, s], i) => (
              <FadeIn key={t} delay={i * 90}>
                <div className="border-t border-gray-300 pt-6">
                  <dt className="text-lg font-bold tracking-heading text-gray-900">{t}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-gray-600">{s}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      <DeveloperExperience />

      {/* --- Den gratis AI-analyse --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col gap-8 rounded-3xl bg-gray-50 p-8 ring-1 ring-black/[0.05] lg:flex-row lg:items-center lg:justify-between lg:p-14">
              <div className="max-w-2xl">
                <p className="kicker text-gray-600">Gratis AI-analyse</p>
                <p className="mt-5 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-display text-gray-900">
                  Se, hvad AI kunne gøre hos jer.
                </p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-gray-600">
                  Fortæl kort om jeres virksomhed, så får I tre konkrete use cases
                  på mail. Uden at tale med nogen først.
                </p>
              </div>
              <Link
                href="/ai-guide"
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gray-900 px-7 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-black lg:self-center"
              >
                Få jeres use cases
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <FAQ items={SPOERGSMAAL} kicker="Spørgsmål om udvikling" titel="Det, vores kunder spørger om" graa />

      <TalMedAlexander />
    </>
  );
}
