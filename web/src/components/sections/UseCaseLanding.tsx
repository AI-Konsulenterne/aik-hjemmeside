import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

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
};

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
}: UseCaseLandingProps) {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="pt-[clamp(4rem,11vw,8rem)] pb-[clamp(3rem,8vw,5.5rem)] relative overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-primary">
              {eyebrow}
            </p>
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-bold tracking-heading text-gray-900 leading-[1.05] mt-4 text-balance">
              {h1Pre} <span className="text-primary">{h1Accent}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
              {lead}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <Button variant="primary" size="lg" cal>
                Book en gratis AI-afklaring
              </Button>
              <Button variant="secondary" size="lg" href="/ai-guide">
                Få en gratis AI-analyse
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-5">
              Finder vi ikke en konkret AI-mulighed, der kan spare jer tid -
              koster det ingenting.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-[clamp(3.5rem,8vw,6rem)] bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              {intro.h2}
            </h2>
            {intro.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-600 mt-5 leading-relaxed text-lg"
              >
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] max-w-2xl">
              {steps.h2}
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.items.map((s, i) => (
              <FadeIn key={s.n} delay={i * 90}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow">
                  <span className="text-2xl font-bold text-primary">{s.n}</span>
                  <h3 className="text-lg font-bold tracking-heading text-gray-900 mt-4 leading-tight">
                    {s.h}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed text-[0.95rem]">
                    {s.p}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases (proof) ── */}
      <section className="py-[clamp(4rem,10vw,7rem)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Det har vi bygget
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                {cases.h2}
              </h2>
              {cases.intro && (
                <p className="text-gray-600 mt-4 leading-relaxed text-lg">
                  {cases.intro}
                </p>
              )}
            </div>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.items.map((c, i) => (
              <FadeIn key={c.href} delay={i * 90}>
                <Link
                  href={c.href}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 p-8 hover:border-gray-900 hover:shadow-lg transition-all"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold">
                    {c.company}
                  </p>
                  {c.stat && (
                    <p className="text-4xl lg:text-5xl font-bold tracking-heading text-primary mt-3">
                      {c.stat}
                    </p>
                  )}
                  <h3 className="text-xl font-bold tracking-heading text-gray-900 mt-3 leading-tight">
                    {c.headline}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed flex-1">
                    {c.blurb}
                  </p>
                  <span className="text-primary font-semibold mt-5 inline-flex items-center gap-1.5">
                    Læs casen
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] text-center">
              {faqs.h2}
            </h2>
          </FadeIn>
          <div className="mt-12 flex flex-col gap-4">
            {faqs.items.map((f, i) => (
              <FadeIn key={f.q} delay={i * 60}>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-base lg:text-lg font-bold tracking-heading text-gray-900 leading-tight">
                    {f.q}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Relaterede løsninger ── */}
      <section className="py-[clamp(4rem,10vw,7rem)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] max-w-2xl">
              {related.h2}
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.items.map((r, i) => (
              <FadeIn key={r.href} delay={i * 80}>
                <Link
                  href={r.href}
                  className="group block h-full bg-white rounded-2xl border border-gray-100 p-7 hover:border-gray-900 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-heading text-gray-900 leading-tight">
                      {r.label}
                    </h3>
                    <span className="text-primary text-xl transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2.5 leading-relaxed text-[0.95rem]">
                    {r.desc}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              {final.h2}
            </h2>
            <p className="text-gray-500 mt-5 max-w-xl mx-auto leading-relaxed text-lg">
              {final.lead}
            </p>
            <div className="mt-9 flex justify-center">
              <Button variant="primary" size="lg" cal>
                Book en gratis AI-afklaring
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
