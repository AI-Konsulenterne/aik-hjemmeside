import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const valueStack = [
  {
    item: "45 min AI-gennemgang af jeres virksomhed",
    value: "5.000 kr",
  },
  {
    item: "Konkret AI-plan med 2-3 anbefalinger",
    value: "3.000 kr",
  },
  {
    item: "ROI-beregning for jeres specifikke case",
    value: "2.000 kr",
  },
];

export default function RiskReversal() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Value stack */}
          <FadeIn>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                Hvad I får — helt gratis
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] mb-8">
                Jeres gratis AI-afklaring er{" "}
                <span className="text-primary">10.000 kr værd</span>
              </h2>

              <div className="space-y-4">
                {valueStack.map((item) => (
                  <div
                    key={item.item}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-gray-900 font-medium">{item.item}</span>
                    </div>
                    <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-2">
                <span className="text-lg font-bold text-gray-900">Jeres pris:</span>
                <span className="text-2xl font-bold text-primary">0 kr</span>
              </div>
            </div>
          </FadeIn>

          {/* Guarantee */}
          <FadeIn delay={200}>
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/20 mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold tracking-heading text-gray-900 leading-[1.15] mb-4">
                Vores garanti: Finder vi ikke en mulighed —{" "}
                <span className="text-primary">koster mødet ingenting.</span>
              </h3>

              <p className="text-gray-500 leading-relaxed mb-6">
                Ingen risiko, ingen skjulte omkostninger, ingen salgstricks.
                Vi bruger 45 minutter på at forstå jeres virksomhed.
                Finder vi ikke en konkret AI-mulighed — skylder I os ingenting.
              </p>

              <Button variant="primary" href="/kontakt" cal>
                Book et møde i dag
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
