import type { Metadata } from "next";
import Link from "next/link";
import ProofFilm from "@/components/sections/ProofFilm";
import FadeIn from "@/components/ui/FadeIn";
import { FILM_INTRO, FILM_SHOTS } from "@/content/film";

export const metadata: Metadata = {
  title: "Referencer",
  description:
    "Vi har bygget AI til virksomheder i otte brancher — fra kaffebrænding og bilimport til teleinfrastruktur og præcisionselektronik. Se hvad vi har bygget.",
  alternates: { canonical: "/referencer" },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://ai-konsulenterne.dk/referencer",
    siteName: "AI Konsulenterne",
    title: "Referencer | AI Konsulenterne",
    description:
      "Otte brancher, otte meget forskellige problemer. Se hvad vi har bygget.",
  },
};

export default function Referencer() {
  return (
    <>
      <ProofFilm variant="full" />

      <section className="section-y border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3">
                  <span className="lamp" data-lit="true" aria-hidden="true" />
                  <p className="kicker">Hvorfor ingen navne</p>
                </div>
                <h2 className="mt-8 max-w-[16ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                  De fleste af dem må vi ikke nævne.
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="space-y-6 text-base leading-relaxed text-gray-600 lg:text-lg">
                <p>
                  Når man bygger ind i et lager­system, en kundeservice eller en
                  produktions­linje, får man adgang til ting virksomheder ikke
                  har lyst til at læse om andre steder. Det er en del af
                  aftalen, og vi holder den.
                </p>
                <p>
                  Så her står brancherne i stedet for navnene. Vil I hellere se
                  konkrete forløb med navn, tal og hvad der gik galt undervejs —
                  dem har vi også.
                </p>
                <Link
                  href="/cases"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                >
                  Se de navngivne cases
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-precise group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Registret. Én række pr. shot i filmen, samme rækkefølge.
          ⚠️ Alexander: hver række mangler én sætning om hvad vi konkret byggede.
          Den skal skrives af jer — jeg gætter ikke på resultater. */}
      <section className="section-y">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-baseline justify-between border-b border-black/10 pb-6">
            <p className="kicker">Register</p>
            <p className="kicker tabular-nums">
              {String(FILM_SHOTS.length).padStart(2, "0")} brancher
            </p>
          </div>

          <ul>
            {FILM_SHOTS.map((shot, i) => (
              <li key={shot.id}>
                <FadeIn delay={i * 60}>
                  <div className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-black/10 py-8 md:grid-cols-[4rem_14rem_1fr] lg:py-10">
                    <span className="text-sm font-semibold tabular-nums text-gray-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Grå, ikke orange: otte orange labels ville gøre orange
                        til en kategorifarve i stedet for en statusmarkør. */}
                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {shot.label}
                    </span>
                    <span className="col-start-2 text-lg font-semibold leading-snug tracking-heading text-gray-900 md:col-start-3 lg:text-2xl">
                      <span className="text-gray-400">{FILM_INTRO}</span>{" "}
                      {shot.line}
                    </span>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink section-y">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <h2 className="max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.02] tracking-display text-white">
              Skal vi kigge på, hvor jeres tid går hen?
            </h2>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
        </div>
      </section>
    </>
  );
}
