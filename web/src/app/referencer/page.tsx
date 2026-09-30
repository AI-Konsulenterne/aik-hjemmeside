import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import ProofFilm from "@/components/sections/ProofFilm";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import FilmKort, { type FilmKortData } from "@/components/side/FilmKort";
import { BrancheKort, CaseKort } from "@/components/side/ReferenceKort";
import SektionHoved from "@/components/side/SektionHoved";
import { CASES, KATEGORI } from "@/content/cases";
import { FILM_SHOTS_KUNDER } from "@/content/film";

export const metadata: Metadata = {
  title: "Referencer",
  description:
    "Vi har bygget AI til virksomheder på tværs af brancher, fra kaffebrænding og kirkevedligehold til vindmøller og lingeri. Se hvad vi har bygget.",
  alternates: { canonical: "/referencer" },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://ai-konsulenterne.dk/referencer",
    siteName: "AI Konsulenterne",
    title: "Referencer | AI Konsulenterne",
    description: "Forskellige brancher, meget forskellige problemer. Se hvad vi har bygget.",
  },
};

/**
 * Referencer.
 *
 * Før: filmen, en sektion der startede med "De fleste af dem må vi ikke
 * nævne", et register med ti tekstlinjer, der alle begyndte med "Vi har
 * hjulpet dem, der", og en afslutning med sin egen firkantede knap.
 *
 * Nu, i forsidens sprog:
 * 1. Filmen fylder skærmen under den gennemsigtige navigation.
 * 2. De tre, vi må nævne (Lavazza, J.M Band, Wunderwear), som store kort
 *    med deres skud, hvad vi byggede, og hvad det gav.
 * 3. De syv andre som et galleri af skud med branche og filmens linje,
 *    uden navne, og med en ærlig linje om hvorfor.
 * 4. Den anden akt: vi lærer det også fra os (AI-Minds og workshop).
 * 5. Alexander.
 *
 * Kundenavnene i content/film.ts ("sector") vises ikke; de er interne.
 */

const FORMATER: FilmKortData[] = [
  {
    skud: "workshop",
    etiket: "Workshop",
    titel: "Ude hos jer",
    tekst: "En workshop bygget op om jeres egne opgaver, som start på forløbet eller når I vil videre.",
    link: { label: "Workshop hos jer", href: "/workshop" },
  },
  {
    skud: "live",
    etiket: "Live",
    titel: "Live på skærmen",
    tekst: "En live Q&A hver måned i AI-Minds, hvor jeres folk stiller spørgsmål direkte til os.",
    link: { label: "AI-Minds", href: "/academy" },
  },
  {
    skud: "ondemand",
    etiket: "On demand",
    titel: "Når det passer jer",
    tekst: "Korte videoer på dansk, man ser, når der er tid, med prompt-ark og skabeloner til hver lektion.",
    link: { label: "AI-Minds", href: "/academy" },
  },
];

export default function Referencer() {
  const navngivne = CASES.filter((c) => c.skud).map((c) => ({
    slug: c.slug,
    kunde: c.customer,
    kategori: KATEGORI[c.category],
    titel: c.title,
    kort: c.kort,
    skud: c.skud!,
    logo: c.logo,
  }));
  const navngivneSkud = new Set(navngivne.map((c) => c.skud));
  const oevrige = FILM_SHOTS_KUNDER.filter((s) => !navngivneSkud.has(s.id));

  return (
    <>
      <ProofFilm variant="full" />

      {/* --- De tre med navn --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Med navn og resultat"
            titel="Tre, vi gerne fortæller om."
            tekst="Hvad de kæmpede med, hvad vi byggede, og hvad det gav. Hele forløbet står i hver case."
          />
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {navngivne.map((c, i) => (
              <CaseKort key={c.slug} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- De andre --- */}
      <section data-header="moerk" className="section-y bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            mork
            kicker={`${oevrige.length} brancher til`}
            titel="Og dem, der helst er fri for at stå med navn."
            tekst="Når vi bygger ind i et lagersystem, en kundeservice eller en produktionslinje, ser vi ting, virksomheder ikke vil læse om andre steder. Derfor står brancherne her i stedet for navnene."
          />
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
            {oevrige.map((s, i) => (
              <li key={s.id}>
                <BrancheKort skud={s.id} branche={s.label} linje={s.line} i={i} />
              </li>
            ))}
            <li>
              <FadeIn delay={(oevrige.length % 4) * 90} className="h-full">
                <Link
                  href="/kontakt"
                  className="group flex aspect-[4/5] h-full flex-col justify-between rounded-2xl border border-white/15 p-4 transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.04] sm:p-5"
                >
                  <span className="lamp" data-lit="true" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                      Jeres branche
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] font-semibold leading-snug text-white sm:text-[1rem]">
                      Skal I være den næste? Tag en snak med Alexander.
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-4 inline-block text-white transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </FadeIn>
            </li>
          </ul>
        </div>
      </section>

      {/* --- Den anden akt --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Undervisning"
            titel="Og vi lærer det fra os."
            tekst="Det samme hold, der bygger løsningerne, underviser i AI-Minds og holder workshops ude hos kunderne."
          />
          <div className="mt-14 lg:mt-20">
            <FilmKort kort={FORMATER} />
          </div>
        </div>
      </section>

      <TalMedAlexander titel="Skal vi kigge på, hvor jeres tid går hen?" />
    </>
  );
}
