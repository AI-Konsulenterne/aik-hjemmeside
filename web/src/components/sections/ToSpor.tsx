import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";

/**
 * De to spor: undervisning og udvikling.
 *
 * Det er de to ting AIK sælger, og før stod de ikke nogen steder som to
 * ting. Siden havde tre spalter ("Skræddersyede AI-løsninger / AIK Workshop
 * / AIK Workspace") med lister under — pæne, men de sagde ikke at der er to
 * veje ind, og at de hænger sammen.
 *
 * Mønstret er fra 1Password og MasterClass at Work på Mobbin: to store kort,
 * et stærkt billede, en lille etiket, en titel. Hvert billede har et lille
 * hvidt UI-element over sig, der viser hvad sporet leverer, i stedet for at
 * påstå det — det er grebet fra Intercom og Sana.
 *
 * Alt i teksterne findes allerede andre steder på sitet (procesafsnittet,
 * ydelsessiderne, FAQ'en). Intet er skrevet frit.
 */

const spor = [
  {
    id: "undervisning",
    etiket: "Undervisning",
    titel: "Vi lærer jeres folk at bruge AI.",
    tekst:
      "AI-Minds er vores online læringsplatform: 40+ korte moduler i Copilot, Claude og AI-sikkerhed, på dansk, til hele organisationen. Og når I vil i gang sammen, kommer vi ud og holder workshop hos jer.",
    billede: "/film/live.webp",
    alt: "En person ved et skrivebord om aftenen, der følger et modul på sin laptop.",
    links: [
      { label: "AI-Minds læringsplatform", href: "/academy" },
      { label: "Workshop hos jer", href: "/workshop" },
    ],
  },
  {
    id: "udvikling",
    etiket: "Udvikling",
    titel: "Vi bygger AI, der kører på jeres data.",
    tekst:
      "Agenter og automatiseringer koblet på de systemer I allerede har. Første version kommer hurtigt, vi justerer den med jer, og vi bliver hængende når den er i drift.",
    billede: "/site/udvikling.webp",
    alt: "Et skrivebord om aftenen med kode på skærmen, en notesbog med systemskitser og en tændt lampe.",
    links: [
      { label: "Skræddersyet AI", href: "/skraeddersyede-ai" },
      { label: "AIK Workspace", href: "/visionai" },
    ],
  },
];

/** Et modul i AI-Minds, som det ser ud på platformen: modulet, lektionen
 *  der er i gang, og hvor langt man er. Lektionerne er under 15 minutter. */
function AIMindsKort() {
  return (
    <div className="w-[17.5rem] rounded-2xl bg-white/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-600">AI-Minds · modul</p>
        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[0.625rem] font-semibold text-white">Dansk</span>
      </div>
      <p className="mt-2.5 text-[0.9375rem] font-semibold leading-tight text-gray-900">Microsoft Copilot</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-black" aria-hidden="true">
          <svg className="ml-0.5 h-3 w-3" viewBox="0 0 12 12" fill="currentColor"><path d="M2.5 1.5v9l8-4.5z" /></svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex justify-between text-[0.8125rem] text-gray-800">
            <span className="truncate">Copilot i Outlook</span>
            <span className="ml-2 flex-none tabular-nums text-gray-600">12 min</span>
          </p>
          <div className="mt-1.5 h-1 rounded-full bg-gray-200">
            <div className="h-1 w-[62%] rounded-full bg-gray-900" />
          </div>
        </div>
      </div>
      <p className="mt-3 border-t border-gray-100 pt-2.5 text-[0.75rem] text-gray-600">Næste: Copilot i Teams</p>
    </div>
  );
}

function Agentkort() {
  return (
    <div className="w-[18rem] rounded-2xl bg-white/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="lamp" data-lit="true" aria-hidden="true" />
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-600">HR-agent</p>
      </div>
      <p className="mt-3 text-[0.8125rem] leading-snug text-gray-900">
        Du har 12 feriedage tilbage. Op til 5 kan overføres til næste år.
      </p>
      <p className="mt-2.5 border-t border-gray-100 pt-2.5 text-[0.75rem] text-gray-600">
        Kilde: Personalehåndbog, afsnit 4.2
      </p>
    </div>
  );
}

export default function ToSpor() {
  return (
    <section id="to-spor" className="section-y scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="kicker text-gray-600">Det vi laver</p>
            <OrdForOrd className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
              Lær det. Eller få det bygget.
            </OrdForOrd>
          </div>
          <FadeIn delay={250}>
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-gray-600">
              To spor med de samme folk bag. I kan tage det ene, det andet
              eller begge, og I behøver ikke vide hvilket før vi har talt
              sammen.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {spor.map((s, i) => (
            <FadeIn key={s.id} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-gray-50 ring-1 ring-black/[0.04]">
                <Link href={s.links[0].href} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={s.billede}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 620px, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 hidden transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:block">
                    {s.id === "undervisning" ? <AIMindsKort /> : <Agentkort />}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gray-600">
                    {s.etiket}
                  </p>
                  <h3 className="mt-3 text-[1.625rem] font-bold leading-[1.15] tracking-heading text-gray-900 lg:text-[1.875rem]">
                    <Link href={s.links[0].href} className="transition-colors hover:text-gray-700">
                      {s.titel}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[0.975rem] leading-relaxed text-gray-600">{s.tekst}</p>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-7">
                    {s.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="group/l inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900"
                      >
                        <span className="understreg">{l.label}</span>
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover/l:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <span className="sr-only">{s.alt}</span>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
