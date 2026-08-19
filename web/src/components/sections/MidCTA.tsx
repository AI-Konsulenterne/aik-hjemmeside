import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Midtvejs-CTA.
 *
 * Tre udgaver på to dage, og det er der en grund til. Først var den en
 * afrundet orange klods. Så blev den hvid med hårfine streger, og
 * kommentaren her sagde at filmen var sidens ene mørke flade, så en til
 * ville stjæle fra den. Det holdt ikke længe: procesafsnittet blev også
 * mørkt, og siden endte med to mørke skærme øverst og fire lyse i træk
 * nedenunder. Nederste halvdel var typografi på ensfarvet papir hele
 * vejen.
 *
 * Derfor er tilbuddet nu sidens tredje mørke flade, og det er det rigtige
 * sted at bruge den: det er her man skal sige ja. Billedet er et bord med
 * lampen tændt over — mødet, lige før det går i gang. Det er ikke et
 * kundeskud, og det ligger derfor i public/site og ikke i public/film,
 * hvor hvert billede peger på en navngiven virksomhed.
 *
 * Gitteret og skæret er husets to nye flade-værktøjer. Se globals.css.
 */

const vilkaar = [
  {
    k: "Forberedelse",
    v: "Ingen. I møder bare op og fortæller hvad I laver.",
  },
  {
    k: "Krav til jer",
    v: "Ingen IT-afdeling, ingen AI-viden, intet setup på forhånd.",
  },
  {
    k: "Hvis vi intet finder",
    v: "Så koster mødet ingenting, og så siger vi det ligeud.",
  },
];

export default function MidCTA() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Rummet bag teksten. Gradienten gør venstre side læsbar og lader
          lampen blive stående til højre. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/site/moede.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      </div>

      <div
        aria-hidden="true"
        className="amber-cast bottom-[-14rem] left-[-8rem] h-[38rem] w-[38rem]"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <div className="grid gap-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-white/60">Næste skridt</p>
              </div>

              <h2 className="mt-8 max-w-[20ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-white">
                Femogfyrre minutter. Ingen forberedelse. Ingen regning.
              </h2>

              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/60">
                Vi kigger på hvor jeres tid faktisk går hen, og siger ærligt om
                der er noget at hente. Ikke et salgsmøde. En afklaring.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-auto lg:pt-12">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                >
                  Book en gratis AI-afklaring
                </Link>
                <a
                  href="tel:+4525547074"
                  className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  Eller ring til Alexander på +45 25 54 70 74
                </a>
              </div>
            </div>

            <dl className="border-t border-white/15 lg:mt-2">
              {vilkaar.map((v) => (
                <div
                  key={v.k}
                  className="grid gap-1 border-b border-white/15 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    {v.k}
                  </dt>
                  <dd className="max-w-[38ch] text-[0.95rem] leading-snug text-white/80">
                    {v.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
