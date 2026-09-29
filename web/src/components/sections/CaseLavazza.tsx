import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Kundecasen.
 *
 * Premium-sider leder deres cases med et tal ("800 % mere trafik"). Det
 * har vi ikke fra Lavazza, og et opdigtet tal er værre end intet. Så casen
 * står på det vi kan stå inde for: hvad problemet var, hvad vi byggede, og
 * hvordan den opfører sig. Billedet er kafferisteriet fra filmen, så casen
 * og heroen hænger sammen.
 *
 * Kommer der et målt resultat fra Lavazza — timer sparet, andel af
 * spørgsmål agenten tager — skal det stå allerøverst i tekstspalten.
 */

const fakta = [
  ["Bygget på", "Lavazzas egne HR-dokumenter"],
  ["Hvert svar", "Med kilde til afsnittet det kom fra"],
  ["Uden dækning", "Siger den det, i stedet for at gætte"],
];

export default function CaseLavazza() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
              <Image
                src="/film/kaffe.webp"
                alt="Nybrændte kaffebønner falder fra en industriristers tromle."
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-6">
                <Image
                  src="/logos/lavazza-hvid.png"
                  alt="Lavazza"
                  width={900}
                  height={232}
                  className="h-7 w-auto lg:h-9"
                />
                <p className="text-right text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                  HR · Intern AI
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-5">
            <p className="kicker text-gray-600">Kundecase</p>
            <h2 className="mt-6 text-[clamp(1.9rem,3.4vw,2.875rem)] font-bold leading-[1.05] tracking-display text-gray-900">
              HR-agenten, der svarer, så HR ikke skal.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-gray-600">
              Lavazzas HR-afdeling brugte for mange timer på de samme
              spørgsmål: feriedage, barsel, opsigelsesvarsler. Svarene stod
              allerede i personalehåndbogen. Vi byggede en agent oven på
              deres egne dokumenter, som svarer på dansk og altid skriver
              hvor svaret kom fra.
            </p>

            <dl className="mt-8 border-t border-gray-200">
              {fakta.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-gray-200 py-3.5">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-600">{k}</dt>
                  <dd className="text-[0.9375rem] text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link
                href="#se-det-virke"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors hover:text-primary"
              >
                Prøv agenten
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
              </Link>
              <Link
                href="/referencer"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors hover:text-primary"
              >
                Hvem vi ellers har hjulpet
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
