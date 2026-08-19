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
    quote: "Vi ved ikke hvad vores første use case skal være",
    answer: "Vi afdækker, undersøger og finder den use case der giver bedst mening for jer",
  },
  {
    quote: "Der er 100 AI-platforme - hvilken skal vi vælge?",
    answer: "Vi ved hvor de forskellige platforme brillerer og har testet dem alle, så vi skal nok hjælpe jer med at finde den platform der passer bedst til jeres behov.",
  },
  {
    quote: "Vores medarbejdere kommer aldrig til at bruge det",
    answer: "Hvis jeres medarbejdere ikke ser værdi i værktøjerne bruger de det ikke, derfor hjælper vi jer med at lægge en konkret plan for at få AI ud at leve i organisationen",
  },
];

/**
 * Indvendingerne, sat som et register i stedet for kort.
 * Venstre spalte er hvad kunden siger, højre er hvad vi svarer — adskilt af
 * hårfine streger. Ingen kasser, ingen skygger, ingen ikoner.
 */
export default function Barriers() {
  return (
    <section className="section-y border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-gray-600">Kender I den?</p>
              </div>
              <h2 className="mt-8 max-w-[15ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det svære er ikke AI. Det er at vide hvor man starter.
              </h2>
              <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-gray-600">
                Vi hører de samme fem sætninger i næsten hvert eneste første
                møde. I behøver ikke have svarene — det er derfor vi findes.
              </p>
            </div>
          </FadeIn>

          {/* Ingen nummerering: de fem indvendinger er en mængde, ikke en
              rækkefølge. Et 01–05 ville hævde en logik der ikke findes. */}
          <div>
            {barriers.map((b, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="border-t border-black/10 py-9 first:border-t-0 first:pt-0 lg:py-11">
                  <p className="text-lg font-semibold leading-snug tracking-heading text-gray-900 lg:text-2xl">
                    &ldquo;{b.quote}&rdquo;
                  </p>
                  <p className="mt-4 max-w-[54ch] text-[0.95rem] leading-relaxed text-gray-500">
                    {b.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
