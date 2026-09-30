import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SektionHoved from "@/components/side/SektionHoved";
import { ERFARING } from "@/components/sections/DeveloperExperience";

/**
 * Hvor vores udviklere har erfaring fra, stort og tydeligt på /om-os.
 *
 * Før stod logoerne som en lille grå strimmel nederst på siden, i 60 %
 * gennemsigtighed. Nu står de lige under holdet, i deres egne farver, i en
 * væg af felter. Det sjette felt er til den, der læser: "Og nu jer?", med
 * vej til Alexander, som det sidste kort på /referencer.
 *
 * Ordlyden holder sig til det, sitet altid har sagt: udviklerne har
 * erfaring fra dem, og de har leveret løsninger til dem. Det er ikke
 * AIK's kunder, og de står ikke under referencer eller cases.
 */
export default function ErfaringFra() {
  return (
    <section aria-labelledby="erfaring-titel" className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SektionHoved
          id="erfaring-titel"
          kicker="Vores udviklere har erfaring fra"
          titel="Erfaring fra de store. Bygget i jeres størrelse."
          tekst="Før AI Konsulenterne har vores udviklere leveret løsninger til nogle af de største virksomheder i Danmark og udlandet. Den erfaring får I med, i en størrelse, der passer til jer."
        />

        <ul className="mt-14 grid grid-cols-2 border-l border-t border-gray-200 sm:grid-cols-3 lg:mt-20">
          {ERFARING.map((c, i) => (
            <li key={c.name} className="border-b border-r border-gray-200">
              <FadeIn delay={(i % 3) * 80} className="flex aspect-[4/3] items-center justify-center p-6 sm:aspect-[16/10] lg:p-10">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  className={`${c.stor} w-auto max-w-full object-contain`}
                />
              </FadeIn>
            </li>
          ))}
          <li className="border-b border-r border-gray-200">
            <Link
              href="/kontakt"
              className="group flex aspect-[4/3] h-full flex-col justify-between bg-ink p-4 transition-colors duration-300 hover:bg-ink-soft sm:aspect-[16/10] sm:p-5 lg:p-8"
            >
              <span className="lamp" data-lit="true" aria-hidden="true" />
              <span>
                {/* Etiketten er skjult på telefon, hvor feltet er for lavt til tre linjer og en etiket. */}
                <span className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/70 sm:block">
                  Jeres virksomhed
                </span>
                <span className="block text-[0.9375rem] font-bold leading-snug tracking-heading text-white sm:mt-1.5 sm:text-[clamp(1.0625rem,1.8vw,1.5rem)]">
                  Og nu jer? Tag en snak med Alexander.{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
