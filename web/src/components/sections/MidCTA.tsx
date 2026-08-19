import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Midtvejs-CTA.
 *
 * Var en afrundet orange klods midt på siden. Nu: hårfine streger, venstrestillet
 * type og orange kun som knapflade og streg. Filmen ovenfor er sidens ene mørke
 * flade — en til ville stjæle fra den.
 *
 * Højre halvdel stod tom: overskrift til venstre, knapper nede i hjørnet og
 * 600 gange 250 px ingenting derimellem. Nu står tilbuddets faktiske vilkår
 * der. Det er de tre der fjerner risikoen ved at sige ja, og de er værd at
 * læse lige før man trykker — ikke et sted nede i en FAQ.
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
    <section className="border-y border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <div className="grid gap-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker">Næste skridt</p>
              </div>
              <h2 className="mt-8 max-w-[20ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Femogfyrre minutter. Ingen forberedelse. Ingen regning.
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-gray-600">
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
                  className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
                >
                  Eller ring til Alexander på +45 25 54 70 74
                </a>
              </div>
            </div>

            <dl className="border-t border-gray-200 lg:mt-2">
              {vilkaar.map((v) => (
                <div
                  key={v.k}
                  className="grid gap-1 border-b border-gray-200 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                    {v.k}
                  </dt>
                  <dd className="max-w-[38ch] text-[0.95rem] leading-snug text-gray-700">
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
