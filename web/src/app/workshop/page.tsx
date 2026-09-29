import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import OrdForOrd from "@/components/ui/OrdForOrd";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import SektionHoved from "@/components/side/SektionHoved";
import TrinFlow from "@/components/side/TrinFlow";
import { filmPoster } from "@/content/film";

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
  title: { absolute: "AI workshop for virksomheder | hands-on AI-kursus" },
  description:
    "AI workshop og AI-kursus for virksomheder - bygget op om jeres egne opgaver. I går hjem med skabeloner, konkrete use cases og en plan for, hvad I gør bagefter.",
  alternates: { canonical: "/workshop" },
  keywords: [
    "AI workshop",
    "AI workshop for virksomheder",
    "AI kursus virksomhed",
    "AI kursus for virksomheder",
    "ChatGPT kursus virksomhed",
    "AI træning medarbejdere",
  ],
  openGraph: {
    title: "AI-workshop for virksomheder, bygget til jer",
    description:
      "En AI-workshop bygget op om jeres egne opgaver. I går hjem med skabeloner, use cases og en plan.",
    url: "/workshop",
  },
};

/**
 * Workshop hos jer.
 *
 * Bygget om i forsidens sprog: workshop-skuddet fra filmen i heroen,
 * pakkerne som tre kort med pris-ankeret fra FAQ'en ("starter typisk
 * omkring 25.000 kr."), forløbet som scroll-flow, emnerne synlige på én
 * gang i stedet for bag faner, casen på mørk flade og AI-Minds som næste
 * skridt på siden selv (ikke et link ud til Skool, jf. main).
 *
 * Indholdet er sidens eget, strammet op. Retail Partner-casen står som
 * før; om navnet må bruges, er ikke afgjort (se CLAUDE.md).
 */

const PAKKER = [
  {
    etiket: "Halv dag",
    titel: "Microsoft 365 Copilot: kickstart",
    tekst: "Undervisning i de vigtigste funktioner, så hele teamet kommer i gang med de licenser, I allerede betaler for.",
    punkter: ["Copilot i Outlook, Word, Teams og Excel", "Hands-on øvelser på jeres egne opgaver", "Prompts og skabeloner, I kan bruge dagen efter"],
    knap: { label: "Book en halv dag", href: "/kontakt" },
  },
  {
    etiket: "Hel dag",
    titel: "Microsoft 365 Copilot: A til Z",
    tekst: "Hele paletten med tid til at gå i dybden, fra de daglige værktøjer til jeres konkrete arbejdsgange.",
    punkter: ["Alt fra halvdagen, med mere tid til øvelser", "Copilot Chat, assistenter og automatisering", "En plan for forankring, så det bliver brugt bagefter"],
    knap: { label: "Book en hel dag", href: "/kontakt" },
  },
  {
    etiket: "Sat sammen til jer",
    titel: "Jeres egen workshop",
    tekst: "I vælger ikke en færdig pakke. Vi udvælger og vægter emnerne sammen med jer, ud fra jeres opgaver og niveau.",
    punkter: ["Emnerne, der giver mening for jer", "Copilot, ChatGPT eller Claude", "Fysisk eller online, i hele Danmark"],
    knap: { label: "Se emnerne", href: "#emner" },
  },
];

const TRIN = [
  {
    titel: "Jeres mål og hverdag",
    tekst: "Vi tager udgangspunkt i jeres opgaver, udfordringer og niveau, så det giver mening fra start.",
    faar: "En dag, der er sat sammen til jer, ikke trukket ned fra hylden.",
  },
  {
    titel: "Hænderne i bolledejen",
    tekst: "I arbejder med konkrete øvelser og skabeloner på jeres egne opgaver, så AI bliver noget, I kan bruge, ikke bare høre om.",
    faar: "Prompts og skabeloner, I kan bruge dagen efter.",
  },
  {
    titel: "Næste skridt",
    tekst: "Vi samler op og prioriterer de bedste use cases, så I ved præcis, hvad I kan gøre, når workshoppen er slut.",
    faar: "En plan for, hvad I gør bagefter, og hvem der gør det.",
  },
];

const EMNER = [
  ["Kom godt i gang", "En rolig introduktion til, hvad AI kan og ikke kan, og hvordan I bruger det fornuftigt i hverdagen."],
  ["Prompting, der virker", "Sådan beder I AI'en om det rigtige, så I får svar, I kan bruge, første gang."],
  ["Tekst og kommunikation", "Mails, tilbud og opslag, der ellers tager tid, skrevet hurtigere og stadig i jeres egen tone."],
  ["Idéer og planlægning", "AI som sparringspartner, når I skal i gang med en opgave og mangler det første udkast."],
  ["Kvalitet og fejl", "Hvornår kan I stole på svaret, og hvordan fanger I de steder, hvor AI tager fejl?"],
  ["GDPR og data", "Hvad I trygt kan dele, og hvad der skal blive internt, så I bruger AI uden at gå på kompromis med data."],
  ["Use cases", "Vi finder de opgaver i jeres hverdag, hvor AI gør størst forskel, og prioriterer dem sammen."],
  ["AI i strategien", "Hvor AI passer ind på den lange bane, så det bliver en del af måden, I arbejder på."],
];

const FASER = ["Afmystificering og live-demoer", "Dybdegående promptteknik", "Assistenter", "Agenter"];

const SPOERGSMAAL = [
  {
    q: "Hvad koster en workshop?",
    a: "Workshops starter typisk omkring 25.000 kr. Efter første snak ved vi nok til at give jer en konkret pris.",
  },
  {
    q: "Kan workshoppen holdes online?",
    a: "Ja. Vi holder workshops både fysisk og online, i hele Danmark.",
  },
  {
    q: "Hvilke værktøjer arbejder vi med?",
    a: "Microsoft Copilot, ChatGPT og Claude. Vi vælger ud fra det, I bruger i hverdagen.",
  },
  {
    q: "Hvad går vi hjem med?",
    a: "Skabeloner, konkrete use cases og en plan for, hvad I gør bagefter.",
  },
  {
    q: "Hvad sker der efter workshoppen?",
    a: "I kan fortsætte i AI-Minds, vores læringsplatform, med korte videoer og en live Q&A hver måned. Eller vi bygger videre på de use cases, I fandt.",
  },
];

function Flueben() {
  return (
    <svg className="mt-[0.2rem] h-4 w-4 flex-none text-gray-900" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Workshop() {
  return (
    <>
      <JsonLd data={workshopSchema} />

      <SideHero
        id="workshop-titel"
        kicker="Workshop hos jer"
        titel={["En AI-workshop,", "bygget på jeres opgaver."]}
        tekst="Vi finder ud af, hvor I står, og bygger dagen op om det, I laver. Hands-on i Microsoft Copilot, ChatGPT og Claude, og I går hjem med skabeloner, use cases og en plan."
        primaer={{ label: "Book en snak", href: "/kontakt" }}
        sekundaer={{ label: "Se pakkerne", href: "#pakker" }}
        skud={["workshop"]}
        fakta={[
          ["Halv eller hel dag", "eller sat sammen til jer"],
          ["Fysisk eller online", "i hele Danmark"],
          ["Hands-on", "på jeres egne opgaver"],
          ["Med hjem", "skabeloner, use cases og en plan"],
        ]}
      />

      {/* --- Pakkerne --- */}
      <section id="pakker" className="section-y scroll-mt-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Pakker"
            titel="Til jer, der bare vil i gang."
            tekst="Mange af vores kunder sidder med Copilot-licenser, der ikke bliver brugt. En workshop får brugen sat i system, sparer tid i hverdagen og skaber værdi med AI i jeres teams."
          />
          <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
            {PAKKER.map((p, i) => (
              <FadeIn key={p.titel} delay={i * 100} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-gray-50 p-7 ring-1 ring-black/[0.05] lg:p-9">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gray-600">{p.etiket}</p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight tracking-heading text-gray-900">{p.titel}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-gray-600">{p.tekst}</p>
                  <ul className="mt-7 space-y-3 border-t border-gray-200 pt-6">
                    {p.punkter.map((pk) => (
                      <li key={pk} className="flex gap-3 text-[0.975rem] leading-snug text-gray-700">
                        <Flueben />
                        {pk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href={p.knap.href} size="lg" variant={i === 2 ? "secondary" : "primary"} className="w-full justify-center">
                      {p.knap.label}
                    </Button>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="mt-10 max-w-[60ch] text-[0.975rem] leading-relaxed text-gray-600">
              Workshops starter typisk omkring 25.000 kr. Efter første snak ved vi
              nok til at give jer en konkret pris.
            </p>
          </FadeIn>
        </div>
      </section>

      <TrinFlow
        graa
        kicker="Sådan gør vi"
        titel="Bygget op om jer, med en fast ramme."
        tekst="Vi starter med jeres hverdag og sætter workshoppen sammen derfra. I får et klart udbytte og noget, der kan bruges i praksis."
        trin={TRIN}
      />

      {/* --- Emnerne --- */}
      <section id="emner" className="section-y scroll-mt-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Emner"
            titel="Otte emner. I vælger og vægter."
            tekst="Workshoppen bygges af de emner, der giver mening for jer, og beskrivelserne tilretter vi sammen."
          />
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {EMNER.map(([t, s], i) => (
              <FadeIn key={t} delay={(i % 4) * 80}>
                <div className="border-t border-gray-300 pt-6">
                  <p className="text-sm font-semibold tabular-nums text-gray-600">{String(i + 1).padStart(2, "0")}</p>
                  <dt className="mt-3 text-lg font-bold tracking-heading text-gray-900">{t}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-gray-600">{s}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Casen --- */}
      <section id="case" data-header="moerk" className="section-y scroll-mt-20 bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="kicker text-white/60">Case: Retail Partner</p>
          <OrdForOrd className="mt-6 max-w-[22ch] text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-white">
            Fra &quot;hvad kan AI?&quot; til færdige prompts, på én dag.
          </OrdForOrd>
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="space-y-10 lg:col-span-7">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/60">Udfordringen</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/80">
                  Retail Partner arbejder hver dag med produktstamdata, kampagner og
                  kommunikation på tværs af mange principaler og tusindvis af
                  varenumre. Nogle medarbejdere brugte AI dagligt, andre havde
                  aldrig åbnet et værktøj, og bekymringerne var de klassiske:
                  &quot;Overtager AI mit job?&quot; Og hvad med de følsomme data?
                </p>
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/60">Løsningen</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/80">
                  En hands-on workshop, hvor hver fase sluttede med øvelser på
                  opgaver fra deres egen hverdag: stamdata og produktdata,
                  konkurrent- og prisovervågning, oversættelser og mails. Et
                  konkret eksempel: et sæt prompts til deres stamdata, hvor én
                  beriger produktdata ud fra EAN, og én mapper faktaark ind i deres
                  skabelon med en &quot;verificér&quot;-markering på hvert felt.
                </p>
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/60">Resultatet</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/80">
                  Medarbejderne gik fra &quot;hvad kan AI?&quot; til færdige prompts,
                  klar til brug dagen efter, og bekymringerne blev til noget
                  håndgribeligt, de selv kan styre.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={150} className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:p-9">
                <p className="text-[4.5rem] font-bold leading-none tracking-display text-white">16</p>
                <p className="mt-3 max-w-[32ch] text-[0.975rem] leading-relaxed text-white/70">
                  medarbejdere, fra nybegyndere til daglige brugere, gik hjem med
                  færdige prompts til deres egne opgaver.
                </p>
                <p className="mt-8 border-t border-white/10 pt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Dagens fire faser
                </p>
                <ol className="mt-4 space-y-3">
                  {FASER.map((f, i) => (
                    <li key={f} className="flex items-baseline gap-4 text-[1rem] text-white">
                      <span className="w-5 text-sm font-semibold tabular-nums text-white/50">{i + 1}</span>
                      {f}
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Efter workshoppen: AI-Minds --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-6">
              <div className="afsloer relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
                <Image src={filmPoster("ondemand")} alt="" fill sizes="(min-width: 1024px) 40rem, 100vw" className="afsloer-zoom object-cover" />
              </div>
            </FadeIn>
            <div className="lg:col-span-6">
              <p className="kicker text-gray-600">Efter workshoppen</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Fortsæt, hvor I slap.
              </OrdForOrd>
              <FadeIn delay={200}>
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-gray-600">
                  En dag giver et skub. Det, der holder, er at blive ved. AI-Minds
                  er vores læringsplatform på dansk, med korte videoer, konkrete
                  opgaver og et community, der hjælper hinanden.
                </p>
                <Link href="/academy" className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <span className="understreg">Se AI-Minds læringsplatform</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={SPOERGSMAAL} kicker="Spørgsmål om workshops" titel="Det, I plejer at spørge om" graa />

      <TalMedAlexander
        kicker="Næste skridt"
        titel="Hvad passer til jer?"
        tekst="Vi starter med en kort snak, hvor vi finder ud af, hvad I har brug for, og siger ærligt, om en workshop er det rigtige lige nu."
        punkter={[
          ["En kort snak", "Om jeres folk, jeres værktøjer og jeres opgaver."],
          ["Et forslag", "Halv dag, hel dag eller sat sammen til jer."],
          ["Et ærligt svar", "Er en workshop ikke det rigtige lige nu, siger vi det."],
        ]}
        knap={{ label: "Book en snak", href: "/kontakt" }}
      />
    </>
  );
}
