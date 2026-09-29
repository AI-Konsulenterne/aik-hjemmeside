import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import SektionHoved from "@/components/side/SektionHoved";

/**
 * Skabelonen til use case-siderne (HR, kundeservice, analyse, e-commerce).
 *
 * Bygget om i forsidens sprog: filmen i heroen med et lille eksempelkort
 * (fx HR-agentens svar med kilde), en intro i to spalter, de fire måder
 * at bruge det på, casene på mørk flade, FAQ, relaterede sider og
 * Alexander til sidst. Samme props som før, så siderne og deres SEO-tekst
 * er uændrede; titel, skud og eksempel er nye og valgfrie.
 *
 * Faktaene under heroen står på alle fire sider i FAQ'en eller på
 * forsiden: afklaringen er gratis og 45 minutter, prisen er fast efter
 * den, mindre løsninger starter typisk fra 50.000 kr., og jeres data
 * træner ingen modeller.
 */

export type UseCaseStep = { n: string; h: string; p: string };
export type UseCaseProof = {
  href: string;
  company: string;
  headline: string;
  blurb: string;
  stat?: string;
};
export type UseCaseFaq = { q: string; a: string };
export type UseCaseRelated = { href: string; label: string; desc: string };

export type UseCaseLandingProps = {
  eyebrow: string;
  h1Pre: string;
  h1Accent: string;
  lead: string;
  intro: { h2: string; paragraphs: string[] };
  steps: { h2: string; items: UseCaseStep[] };
  cases: { h2: string; intro?: string; items: UseCaseProof[] };
  faqs: { h2: string; items: UseCaseFaq[] };
  related: { h2: string; items: UseCaseRelated[] };
  final: { h2: string; lead: string };
  /** Overskriften som linjer. Uden den bruges h1Pre og h1Accent. */
  titel?: string[];
  /** Skud fra referencefilmen til heroen. */
  skud?: string[];
  /** Et eksempelkort til heroen. */
  eksempel?: React.ReactNode;
};

const FAKTA: [string, string][] = [
  ["45 min.", "gratis AI-afklaring"],
  ["Fast pris", "efter afklaringen"],
  ["Fra 50.000 kr.", "for mindre løsninger"],
  ["Ingen træning", "på jeres data"],
];

export default function UseCaseLanding({
  eyebrow,
  h1Pre,
  h1Accent,
  lead,
  intro,
  steps,
  cases,
  faqs,
  related,
  final,
  titel,
  skud = ["kontor"],
  eksempel,
}: UseCaseLandingProps) {
  const linjer = titel ?? [h1Pre.replace(/\s*-\s*$/, ""), h1Accent];

  return (
    <>
      <SideHero
        id="usecase-titel"
        kicker={eyebrow}
        titel={linjer}
        tekst={lead}
        primaer={{ label: "Book en gratis AI-afklaring", href: "/kontakt" }}
        sekundaer={{ label: "Få en gratis AI-analyse", href: "/ai-guide" }}
        skud={skud}
        fakta={FAKTA}
        eksempel={eksempel}
      />

      {/* --- Hvad er det --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="kicker text-gray-600">{eyebrow}</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-display text-gray-900">
                {intro.h2}
              </OrdForOrd>
            </div>
            <FadeIn delay={200} className="space-y-5 lg:col-span-7 lg:pt-14">
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Sådan virker det --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved kicker="Sådan virker det" titel={steps.h2} />
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {steps.items.map((s, i) => (
              <FadeIn key={s.h} delay={i * 80}>
                <div className="border-t border-gray-300 pt-6">
                  <p className="text-sm font-semibold tabular-nums text-gray-500">{s.n}</p>
                  <dt className="mt-3 text-lg font-bold leading-snug tracking-heading text-gray-900">{s.h}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-gray-600">{s.p}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Det har vi bygget --- */}
      <section data-header="moerk" className="section-y bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved mork kicker="Det har vi bygget" titel={cases.h2} tekst={cases.intro} />
          <div className={`mt-14 grid gap-6 lg:mt-20 ${cases.items.length > 1 ? "lg:grid-cols-2" : "lg:max-w-3xl"}`}>
            {cases.items.map((c, i) => (
              <FadeIn key={c.href + c.company} delay={i * 110} className="h-full">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] lg:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="kicker text-white/60">{c.company}</p>
                    {c.stat && (
                      <p className="text-[2.5rem] font-bold leading-none tracking-display text-white">{c.stat}</p>
                    )}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold leading-snug tracking-heading text-white">{c.headline}</h3>
                  <p className="mt-4 text-[1rem] leading-relaxed text-white/70">{c.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-white">
                    <span className="understreg">Læs casen</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs.items} kicker="Spørgsmål" titel={faqs.h2} />

      {/* --- Se også --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved kicker="Mere om det, vi bygger" titel={related.h2} />
          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:mt-16">
            {related.items.map((r, i) => (
              <FadeIn key={r.href} delay={i * 80} className="h-full">
                <Link
                  href={r.href}
                  className="group flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold tracking-heading text-gray-900">{r.label}</h3>
                    <span aria-hidden="true" className="text-xl text-gray-900 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-gray-600">{r.desc}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TalMedAlexander
        kicker="Næste skridt"
        titel={final.h2}
        tekst={final.lead}
        knap={{ label: "Book en gratis AI-afklaring", href: "/kontakt" }}
      />
    </>
  );
}
