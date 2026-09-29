import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import FAQ from "@/components/sections/FAQ";
import SektionHoved from "@/components/side/SektionHoved";
import { vilkaar } from "@/components/sections/TalMedAlexander";

export const metadata: Metadata = {
  title: { absolute: "Kontakt AI Konsulenterne - book gratis AI-afklaring" },
  description:
    "Book en gratis 45-minutters AI-afklaring med Alexander. Ingen forpligtelse. Finder vi ikke en mulighed, koster det ingenting. Ring +45 25 54 70 74.",
  alternates: { canonical: "/kontakt" },
  keywords: [
    "kontakt AI konsulent",
    "book AI møde",
    "AI afklaring gratis",
    "AI rådgivning København",
  ],
  openGraph: {
    title: "Kontakt: book en gratis AI-afklaring",
    description:
      "45 min gratis AI-afklaring med Alexander. Ingen forberedelse, ingen forpligtelse.",
    url: "/kontakt",
  },
};

/**
 * Kontakt. Hver "Book en samtale" på sitet ender her, så siden gør kun én
 * ting: den viser, hvem I taler med, og giver jer de to veje til ham
 * (telefon og mail; Cal-booking er parkeret). Derefter hvad der sker, når
 * I har ringet, og de spørgsmål folk plejer at have, før de ringer.
 *
 * Vilkårene er de samme som i "Tal med Alexander" på de andre sider. Den
 * faste pris efter afklaringen står også på use case-siderne og under
 * AI-strategi.
 */

const FORLOEB: [string, string][] = [
  [
    "Ring eller skriv",
    "Ring til Alexander på +45 25 54 70 74, eller skriv til kontakt@ai-konsulenterne.dk. Så finder vi en tid, der passer jer.",
  ],
  [
    "45 minutters AI-afklaring",
    "Vi kigger på, hvor jeres tid går hen, og om der er noget at hente. I fortæller, hvad I laver. Resten er vores job.",
  ],
  [
    "Et konkret bud",
    "Kan AI hjælpe jer, får I et konkret bud med en fast pris. Finder vi ikke en konkret mulighed, koster mødet ingenting.",
  ],
];

export default function Kontakt() {
  return (
    <>
      {/* --- Hero: Alexander og de to veje til ham --- */}
      <section
        aria-labelledby="kontakt-titel"
        data-header="moerk"
        data-alexander
        className="relative -mt-16 overflow-hidden bg-ink lg:-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[16rem] top-[6rem] h-[46rem] w-[46rem] bg-[radial-gradient(closest-side,rgba(255,154,0,0.1),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-white/85">Kontakt</p>
              </div>
              <h1
                id="kontakt-titel"
                className="mt-6 text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.0] tracking-display text-white"
              >
                Tal med Alexander.
              </h1>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
                Book en gratis AI-afklaring på 45 minutter. Ikke et salgsmøde, men en afklaring
                af, hvad AI kan gøre hos jer, og et ærligt svar, hvis det ikke er noget.
              </p>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                <a
                  href="tel:+4525547074"
                  className="group rounded-2xl bg-primary px-6 py-5 text-black transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-primary-dark"
                >
                  <span className="flex items-center justify-between text-[0.8125rem] font-semibold">
                    Ring til Alexander
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[1.625rem] font-bold leading-none tabular-nums tracking-heading">
                    +45 25 54 70 74
                  </span>
                </a>
                <a
                  href="mailto:kontakt@ai-konsulenterne.dk"
                  className="group rounded-2xl border border-white/20 px-6 py-5 text-white transition-[border-color,background-color,transform] duration-200 hover:-translate-y-px hover:border-white/50 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center justify-between text-[0.8125rem] font-semibold text-white/70">
                    Skriv en mail
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="mt-2 block text-[1.0625rem] font-bold leading-snug tracking-heading [overflow-wrap:anywhere]">
                    kontakt@ai-konsulenterne.dk
                  </span>
                </a>
              </div>
            </div>

            <FadeIn className="lg:col-span-5">
              <figure className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-3xl bg-gray-900 lg:max-w-none">
                <Image
                  src="/team/alexander-hero.png"
                  alt="Alexander fra AI Konsulenterne"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover object-[50%_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-6 left-6">
                  <p className="text-lg font-semibold text-white">Alexander</p>
                  <p className="text-sm text-white/70">AI-konsulent, AI Konsulenterne</p>
                </figcaption>
              </figure>
            </FadeIn>
          </div>

          <dl className="mt-16 grid gap-x-10 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-3 lg:mt-24">
            {vilkaar.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[1.125rem] font-bold tracking-heading text-white">{k}</dt>
                <dd className="mt-1.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/65">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Sådan foregår det --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Sådan foregår det"
            titel="Fra første opkald til et konkret bud."
            tekst="I skal ikke forberede noget, og der er ingen krav om en IT-afdeling. Vi tager det derfra."
          />
          <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3 lg:mt-20">
            {FORLOEB.map(([titel, tekst], i) => (
              <li key={titel}>
                <FadeIn delay={i * 90}>
                  <div className="border-t border-gray-300 pt-6">
                    <p className="text-sm font-semibold tabular-nums text-gray-500">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold leading-tight tracking-heading text-gray-900">
                      {titel}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-gray-600">{tekst}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ kicker="Før I ringer" titel="Det, de fleste spørger om" graa />
    </>
  );
}
