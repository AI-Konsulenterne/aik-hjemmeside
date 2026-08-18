import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Midtvejs-CTA.
 *
 * Var en afrundet orange klods midt på siden. Nu: hårfine streger, venstrestillet
 * type og orange kun som knapflade og streg. Filmen ovenfor er sidens ene mørke
 * flade — en til ville stjæle fra den.
 */
export default function MidCTA() {
  return (
    <section className="border-y border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <div className="grid gap-10 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker">Næste skridt</p>
              </div>
              <h2 className="mt-8 max-w-[20ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Femogfyrre minutter. Ingen forberedelse. Ingen regning.
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-gray-600">
                Vi kigger på hvor jeres tid faktisk går hen, og siger ærligt om
                der er noget at hente. Finder vi ikke en konkret mulighed,
                koster mødet ingenting.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
        </FadeIn>
      </div>
    </section>
  );
}
