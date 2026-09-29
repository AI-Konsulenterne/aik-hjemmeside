import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Afslutningen: et menneske, ikke en bjælke.
 *
 * Konsulenthuse der sælger til store virksomheder viser den person man
 * kommer til at tale med. Før lukkede siden med en bjælke og et
 * telefonnummer ("Ring til Alexander nu"), og en popup med samme besked
 * efter ti sekunder. Her står han i stedet, med tilbuddets vilkår ved
 * siden af — de tre ting der gør det let at sige ja.
 *
 * Vilkårene er dem CLAUDE.md og designsystemet foreskriver (Hormozi:
 * ingen forberedelse, ingen krav, risikoen er vores). Titlen er den siden
 * allerede bruger om ham; der er ikke opfundet en ny.
 */

const vilkaar = [
  ["45 minutter", "Vi kigger på hvor jeres tid går hen, og om der er noget at hente."],
  ["Ingen forberedelse", "I møder op og fortæller hvad I laver. Resten er vores job."],
  ["Ingen regning", "Finder vi ikke en konkret mulighed, koster mødet ingenting."],
];

export default function TalMedAlexander() {
  return (
    <section data-header="moerk" data-alexander className="section-y relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl bg-gray-900 lg:max-w-none">
              <Image
                src="/team/alexander-hero.png"
                alt="Alexander fra AI Konsulenterne"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-6 left-6">
                <p className="text-lg font-semibold text-white">Alexander</p>
                <p className="text-sm text-white/70">AI-konsulent, AI Konsulenterne</p>
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="lamp" data-lit="true" aria-hidden="true" />
              <p className="kicker text-white/60">Næste skridt</p>
            </div>
            <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.0] tracking-display text-white">
              Tal med Alexander.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/70">
              Ikke et salgsmøde. En afklaring af hvad AI kan gøre hos jer, og
              et ærligt svar hvis det ikke er noget.
            </p>

            <dl className="mt-10 border-t border-white/12">
              {vilkaar.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-white/12 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[0.975rem] font-semibold text-white">{k}</dt>
                  <dd className="text-[0.975rem] leading-relaxed text-white/65">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button href="/kontakt" size="lg">
                Book en samtale
              </Button>
              <a
                href="tel:+4525547074"
                className="text-[0.9375rem] font-semibold text-white/75 transition-colors hover:text-white"
              >
                Eller ring på +45 25 54 70 74
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
