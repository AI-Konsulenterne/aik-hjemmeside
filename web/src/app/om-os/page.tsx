import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import ReferencerBaand from "@/components/sections/ReferencerBaand";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import ToSpor from "@/components/sections/ToSpor";
import { HoldListe, hentHold } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Om Os | Mød Holdet Bag AI Konsulenterne",
  description:
    "AI Konsulenterne er et dansk AI-konsulenthus i København med fokus på danske virksomheder. Mød Alexander og resten af teamet der bygger skræddersyede AI-løsninger.",
  alternates: { canonical: "/om-os" },
  keywords: [
    "AI konsulenter Danmark",
    "AI konsulenthus København",
    "Alexander AI konsulent",
    "dansk AI bureau",
  ],
  openGraph: {
    title: "Om os | AI Konsulenterne",
    description:
      "Mød holdet bag AI Konsulenterne. Et lille, dansk hold med fokus på danske virksomheder.",
    url: "/om-os",
  },
};

/**
 * Om os. Siden handler om mennesker, så heroen er holdet selv: en kort
 * erklæring og portrætterne på mørk flade (fra Strapi, uden pladsholdere,
 * se Team.tsx). Derefter de fire ting, det betyder at arbejde med os, de
 * kunder vi har hjulpet (samme filmstrimmel som på forsiden), de to spor
 * og hvor udviklerne kommer fra.
 *
 * "Vi er kun fire mennesker" er skiftet ud med "et lille hold": Strapi
 * viser ikke nødvendigvis fire rigtige navne, og tallet skal ikke kunne
 * blive forkert. Fakta i heroen står andre steder på sitet (København i
 * metadata, AI siden 2016 på /skraeddersyede-ai).
 */

const VAERDIER = [
  {
    titel: "I taler med os hele vejen",
    tekst:
      "Vi er et lille hold. Den, I taler med på første møde, er også den, der bygger og leverer. Ingen account manager imellem, og intet \"lige et øjeblik, jeg tjekker med en kollega\".",
  },
  {
    titel: "Vi forklarer det, så I kan bruge det",
    tekst:
      "I behøver ikke vide noget om AI for at arbejde med os. Vi forklarer tingene i et sprog, I kan tage med videre, også til kollegaen, der ikke var med til mødet.",
  },
  {
    titel: "Vi siger til, hvis det ikke giver mening",
    tekst:
      "Er I ikke klar, eller er AI ikke det rigtige for jer lige nu, så får I det at vide. Vi vil hellere passe på jer end sælge et projekt, der ikke virker.",
  },
  {
    titel: "Vi forsvinder ikke efter lanceringen",
    tekst:
      "Når løsningen kører, er vi der stadig. Vi følger op, hjælper, når noget driller, og retter det, der ikke fungerer. Også når der ikke lige er en faktura imellem.",
  },
];

const FAKTA: [string, string][] = [
  ["København", "og hele Danmark"],
  ["Siden 2016", "har vi arbejdet med AI"],
  ["To spor", "undervisning og udvikling"],
  ["Ét hold", "fra første møde til drift"],
];

export default async function OmOs() {
  const folk = await hentHold();

  return (
    <>
      {/* --- Hero: holdet --- */}
      <section
        aria-labelledby="om-titel"
        data-header="moerk"
        className="relative -mt-16 overflow-hidden bg-ink lg:-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[20rem] -top-[10rem] h-[50rem] w-[50rem] bg-[radial-gradient(closest-side,rgba(255,154,0,0.12),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker text-white/85">Om AI Konsulenterne</p>
          </div>
          <h1
            id="om-titel"
            className="mt-6 max-w-5xl text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.0] tracking-display text-white"
          >
            Et lille, dansk hold med AI i øjenhøjde.
          </h1>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
              Vi hjælper danske virksomheder med at spare tid med AI. Vi lærer jeres folk at
              bruge den, og vi bygger løsningerne på jeres egne data. Nede på jorden, ikke
              raketvidenskab.
            </p>
            <div className="flex flex-none flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button href="/kontakt" size="lg">
                Book en samtale
              </Button>
              <Button href="/referencer" size="lg" variant="ghost">
                Se hvem vi har hjulpet
              </Button>
            </div>
          </div>

          {/* Med ét eller to portrætter står fakta i spalten ved siden af, så
              heroen ikke står halvt tom. Med flere fylder holdet bredden. */}
          <div
            className={`mt-16 grid gap-14 lg:mt-24 ${
              folk.length > 0 && folk.length <= 2 ? "lg:grid-cols-12 lg:items-end lg:gap-16" : ""
            }`}
          >
            {folk.length > 0 && (
              <HoldListe folk={folk} mork fyld={folk.length <= 2} className={folk.length <= 2 ? "lg:col-span-8" : ""} />
            )}
            <dl
              className={`grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-6 ${
                folk.length > 0 && folk.length <= 2
                  ? "lg:col-span-4 lg:grid-cols-1 lg:gap-y-0 lg:border-t-0 lg:pt-0"
                  : "sm:grid-cols-4"
              }`}
            >
              {FAKTA.map(([vaerdi, label]) => (
                <div
                  key={vaerdi}
                  className={`flex flex-col-reverse gap-1 ${
                    folk.length > 0 && folk.length <= 2 ? "lg:border-t lg:border-white/15 lg:py-5" : ""
                  }`}
                >
                  <dt className="text-sm leading-snug text-white/65">{label}</dt>
                  <dd className="text-[1.375rem] font-bold leading-none tracking-heading text-white">{vaerdi}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* --- Sådan er vi at arbejde med --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="kicker text-gray-600">Sådan er vi at arbejde med</p>
                <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                  Fire ting, I kan holde os op på.
                </OrdForOrd>
              </div>
            </div>
            <ol className="lg:col-span-7">
              {VAERDIER.map((v, i) => (
                <li key={v.titel} className="border-t border-gray-200 py-9 first:border-t-0 first:pt-0 lg:py-11">
                  <FadeIn delay={i * 60}>
                    <p className="text-sm font-semibold tabular-nums text-gray-600">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-[clamp(1.625rem,2.8vw,2.375rem)] font-bold leading-[1.08] tracking-display text-gray-900">
                      {v.titel}
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-gray-600">{v.tekst}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ReferencerBaand />

      <ToSpor />

      <DeveloperExperience />

      <TalMedAlexander />
    </>
  );
}
