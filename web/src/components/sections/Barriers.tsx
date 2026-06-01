import FadeIn from "@/components/ui/FadeIn";

const barriers = [
  {
    quote: "Vi ved godt AI er vigtigt, men vi aner ikke hvor vi skal starte",
    answer: "Vi kortlægger jeres processer og finder de 2-3 største muligheder",
  },
  {
    quote: "Vi har ingen AI kompetencer in-house",
    answer: "Vi fungerer som jeres eksterne AI partner, så I ikke behøver at besidde kompetencerne",
  },
  {
    quote: "Vi ved ikke hvilke processer vi skal automatisere først",
    answer: "Vi fokuserer på dem med højest ROI og lavest implementeringsrisiko",
  },
  {
    quote: "Der er 100 AI-platforme - hvilken skal vi vælge?",
    answer: "Vi hjælper jer med at finde den platform der passer bedst til jeres behov.",
  },
  {
    quote: "Vores medarbejdere kommer aldrig til at bruge det",
    answer: "Hvis jeres medarbejdere ikke ser værdi i værktøjerne bruger de dem ikke, derfor hjælper vi jer med at lægge en konkret plan for at få AI ud at leve i organisationen",
  },
];

export default function Barriers() {
  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Kender du den her følelse?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1] max-w-3xl mx-auto">
            Det er ikke AI der er svært. Det er at vide hvor man skal starte.
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            De fleste virksomheder vi møder står med de samme fem spørgsmål. Genkender du nogen?
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {barriers.map((b, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 lg:p-7 h-full border border-gray-100 hover:border-primary/40 hover:shadow-sm transition-all duration-300">
                <p className="text-gray-900 font-semibold italic leading-snug mb-4 text-[0.98rem] lg:text-base">
                  &ldquo;{b.quote}&rdquo;
                </p>
                <div className="flex gap-3 items-start pt-4 border-t border-gray-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm lg:text-[0.95rem] text-gray-600 leading-relaxed">
                    {b.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
          {/* Fill last slot on md with a summary card */}
          <FadeIn delay={barriers.length * 80}>
            <div className="bg-gray-900 text-white rounded-2xl p-6 lg:p-7 h-full flex flex-col justify-center">
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">
                Vores tilgang
              </p>
              <p className="text-lg lg:text-xl font-bold tracking-heading leading-tight mb-3">
                I behøver ikke have svarene.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Det er præcis derfor vi findes. 45 minutter med os - så lægger vi en plan
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
