import FadeIn from "@/components/ui/FadeIn";

/**
 * Proces og tillid, på én skærm.
 *
 * Procesafsnittet var før 1,3 skærmhøjde tæt tekst: fem citater, et stort
 * tal og fem trin med hver sit afsnit. Indholdet var godt, men en direktør
 * læser ikke fem afsnit for at forstå hvordan et samarbejde forløber. Nu er
 * det fire trin med én sætning hver — alle fire trukket direkte fra de gamle
 * trin — og RAND-tallet står ved siden af som begrundelsen.
 *
 * Under trinnene står det en enterprise-køber spørger om før noget andet:
 * hvad sker der med vores data. Alle fire linjer er svar vi allerede giver
 * i FAQ'en.
 */

const trin = [
  { n: "01", t: "Afklaring", s: "Vi finder ud af, hvor jeres tid går hen, og om der er noget at hente." },
  { n: "02", t: "Første version", s: "Bygget på jeres data og klar hurtigt, så I kan prøve den på rigtige opgaver." },
  { n: "03", t: "I brug", s: "Vi lærer jeres folk at bruge den og justerer efter det, der virker." },
  { n: "04", t: "Drift", s: "Vi bliver hængende, drifter løsningen og bygger videre med jer." },
];

const tillid = [
  { t: "Jeres data træner ingen modeller", s: "Hverken vores eller leverandørernes." },
  { t: "I bestemmer hvor den kører", s: "Cloud med databehandleraftale, eller alt internt." },
  { t: "Ikke bundet til én leverandør", s: "Azure OpenAI, Claude, Gemini eller åbne modeller." },
  { t: "GDPR fra første dag", s: "Ikke noget vi lapper på bagefter." },
];

export default function SaadanArbejderVi() {
  return (
    <section className="section-y bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="kicker text-gray-600">Sådan arbejder vi</p>
              <h2 className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det svære er ikke modellen. Det er hverdagen.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-display text-gray-900">
                80<span className="text-primary">%</span>
              </p>
              <p className="mt-3 max-w-[40ch] text-[0.975rem] leading-relaxed text-gray-600">
                af AI-projekter leverer ikke den værdi, virksomheden forventede.
                Dobbelt så mange som almindelige IT-projekter. Det er derfor vi
                arbejder sådan her.
              </p>
              <p className="mt-2 text-xs text-gray-600">RAND Corporation, 2024</p>
            </div>
          </div>
        </FadeIn>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-gray-200 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {trin.map((x, i) => (
            <li key={x.n} className="bg-white">
              <FadeIn delay={i * 80} className="flex h-full flex-col p-6 sm:p-7 lg:p-8">
                <span className="flex items-center gap-2.5 text-sm font-semibold tabular-nums text-gray-900">
                  <span className="h-1.5 w-1.5 bg-primary" aria-hidden="true" />
                  {x.n}
                </span>
                <span className="mt-4 text-xl font-bold tracking-heading text-gray-900 sm:mt-10">{x.t}</span>
                <span className="mt-2 text-[0.9375rem] leading-relaxed text-gray-600">{x.s}</span>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={200}>
          <div className="mt-16 grid gap-8 border-t border-gray-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {tillid.map((x) => (
              <div key={x.t} className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2.5l6 2.25v4.5c0 3.9-2.6 7-6 8.25-3.4-1.25-6-4.35-6-8.25v-4.5L10 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M7.25 10l1.9 1.9 3.6-3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold leading-snug text-gray-900">{x.t}</p>
                  <p className="mt-1 text-sm leading-snug text-gray-600">{x.s}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
