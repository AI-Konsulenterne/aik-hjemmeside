import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Hvad vi tilbyder.
 *
 * Den gamle udgave brød stort set alle husets regler på én gang: afrundede
 * kort med skygge, en orange gradient ned over hjørnet, en pille der sagde
 * "Mest populær", ikonfliser i primary/10 — og nederst til højre en tegnet
 * neuralt netværk med noder og forbindelser. Præcis den generiske AI-æstetik
 * vi ellers holder os fra, midt på forsiden.
 *
 * Her er de tre ydelser i stedet sat som tre spalter adskilt af hårfine
 * streger. Substansen skal komme fra indholdet, ikke fra kasserne: hver
 * spalte siger hvad man konkret får, punkt for punkt. Et kort med tre
 * linjer blurb fylder lige så meget og siger mindre.
 *
 * Hver linje under "det får I" kan holdes op mod noget vi allerede siger
 * andre steder på siden — i FAQ'en, i procesafsnittet eller i sidens
 * strukturerede data. Ingen af dem er skrevet frit.
 */

const services = [
  {
    n: "01",
    title: "Skræddersyede AI-løsninger",
    href: "/skraeddersyede-ai",
    lead: "Bygget til én opgave hos jer, ikke en standardpakke I skal tilpasse jer.",
    items: [
      "Koblet på jeres egne data",
      "Integreret med de systemer I har",
      "Første version hurtigt, og justeret derfra",
      "Fast pris efter første møde",
    ],
  },
  {
    n: "02",
    title: "AIK Workshop",
    href: "/workshop",
    lead: "En hel dag hos jer, hvor jeres eget arbejde er materialet.",
    items: [
      "Jeres egne opgaver som cases",
      "Værktøjer I kan bruge dagen efter",
      "Ingen forudsætninger, heller ikke en IT-afdeling",
      "Hele teamet, ikke kun de teknisk stærke",
    ],
  },
  {
    n: "03",
    title: "AIK Workspace",
    href: "/visionai",
    lead: "Ét AI-system til hele virksomheden i stedet for femten løse abonnementer.",
    items: [
      "Chat, agenter og vidensbase samlet ét sted",
      "Jeres dokumenter som grundlag",
      "Styring af hvem der har adgang til hvad",
      "Setup der overholder GDPR",
    ],
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-y bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker">Hvad vi tilbyder</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-20">
            {/* Første udkast sagde "de fleste starter med en workshop og
                opdager undervejs hvad der er værd at bygge". Det lyder rigtigt,
                men det er en påstand om AIKs egne kunder som ingen har talt
                efter. Her står der i stedet hvad vi mener om opgaven, og det
                kan vi stå inde for. */}
            <h2 className="max-w-[18ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
              Det begynder sjældent med en model. Det begynder med en opgave.
            </h2>
            <p className="max-w-[46ch] text-base leading-relaxed text-gray-500">
              Nogle ved præcis hvad de vil have bygget. Andre skal først se
              hvad der overhovedet er muligt hos dem. Derfor er der tre
              indgange og ikke én.
            </p>
          </div>
        </FadeIn>

        {/* Tre spalter, ingen kasser. Stregerne gør arbejdet. */}
        <div className="mt-16 grid border-t border-gray-200 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeIn
              key={s.n}
              delay={i * 90}
              /* Stregerne er spaltens, ikke linkets: den lodrette skal stå
                 mellem spalterne, og den vandrette kun så længe de ligger
                 under hinanden. Yderkanterne har ingen indrykning, så
                 første og sidste spalte flugter med resten af siden. */
              className={`border-b border-gray-200 py-9 last:border-b-0 lg:border-b-0 lg:py-11 ${
                i === 0
                  ? "lg:pr-10 xl:pr-14"
                  : i === services.length - 1
                    ? "lg:border-l lg:border-gray-200 lg:pl-10 xl:pl-14"
                    : "lg:border-l lg:border-gray-200 lg:px-10 xl:px-14"
              }`}
            >
              <Link
                href={s.href}
                className="group flex h-full flex-col"
              >
                <span className="text-xs font-semibold tabular-nums tracking-widest text-gray-400">
                  {s.n}
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug tracking-heading text-gray-900 transition-colors group-hover:text-primary lg:text-2xl">
                  {s.title}
                </h3>

                <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-gray-500">
                  {s.lead}
                </p>

                <ul className="mt-8 space-y-0">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="border-t border-gray-200/80 py-3 text-[0.9rem] leading-snug text-gray-600"
                    >
                      {it}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-2 pt-9 text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary">
                  Læs mere
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-precise group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
