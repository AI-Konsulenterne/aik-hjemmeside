import FadeIn from "@/components/ui/FadeIn";

const steps = [
  {
    number: "01",
    title: "Vi finder ud af, hvor I står",
    body: "Vi tager en snak om hvordan jeres hverdag ser ud, og hvor I kunne hente noget. Nogle gange er der en konkret use case klar med det samme. Andre gange er det første skridt en workshop, lidt oplæring eller bare at få ryddet op i hvor I overhovedet skal starte. Vi siger ærligt hvad der giver mening - også hvis svaret er at I skal vente lidt endnu.",
    output: "Et klart næste skridt - det rigtige for jer",
  },
  {
    number: "02",
    title: "Vi finder den løsning der passer til jer",
    body: "Nogle skal have alt kørende på egne servere. Andre er fint med en cloud-løsning. Vi finder ud af hvad der giver bedst mening hos jer - og bygger altid compliant AI, der overholder GDPR.",
    output: "Løsningsdesign, fast pris, og en plan I kan følge med i",
  },
  {
    number: "03",
    title: "Vi bygger første version - hurtigt",
    body: "I stedet for et halvt års projekt får I noget i hånden på få uger. Så kan I mærke om det virker, før vi bygger videre.",
    output: "Første version i drift inden for 4-8 uger",
  },
  {
    number: "04",
    title: "Vi kigger på hvad der virker",
    body: "Når folk er begyndt at bruge det, ser vi sammen på hvor det rammer plet, og hvor der skal justeres. AI er sjældent perfekt fra dag ét - og det er helt fint.",
    output: "En løsning der bliver bedre, jo længere I bruger den",
  },
  {
    number: "05",
    title: "Vi udvider, når I er klar",
    body: "Når den første case kører, kigger vi på den næste. En bid ad gangen - aldrig en stor plan I ikke har lyst til at sige ja til.",
    output: "AI der vokser i jeres tempo",
  },
];

type Step = (typeof steps)[number];

// Opdel trin i rækker af 2 (til pile imellem)
const rows: Step[][] = [];
for (let i = 0; i < steps.length; i += 2) {
  rows.push(steps.slice(i, i + 2));
}

function Arrow() {
  return (
    <div
      className="flex items-center justify-center text-primary shrink-0 rotate-90 md:rotate-0"
      aria-hidden="true"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex-1 bg-white ring-1 ring-gray-200 rounded-2xl p-6 lg:p-8 h-full flex flex-col shadow-sm">
      <span className="text-2xl lg:text-3xl font-bold tracking-heading text-primary mb-3">
        {step.number}
      </span>
      <h3 className="text-lg lg:text-xl font-bold tracking-heading text-gray-900 mb-2">
        {step.title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-[15px] flex-grow">
        {step.body}
      </p>
      <div className="mt-4 inline-flex items-start gap-2 rounded-lg bg-primary/10 px-3.5 py-2 self-start">
        <span className="text-[11px] uppercase tracking-widest text-primary font-bold mt-0.5 flex-shrink-0">
          Output
        </span>
        <span className="text-sm text-gray-700 leading-snug">{step.output}</span>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Sådan ser et forløb ud
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed">
              Det skal ikke være kompliceret at komme i gang med AI. Her er
              hvordan vi typisk gør - uanset om I er klar til at bygge, eller
              bare skal finde ud af hvor I står.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8 lg:gap-10">
          {rows.map((row, rowIdx) => (
            <FadeIn key={rowIdx} delay={rowIdx * 100}>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-5">
                <StepCard step={row[0]} />
                {row[1] ? (
                  <>
                    <Arrow />
                    <StepCard step={row[1]} />
                  </>
                ) : (
                  // Tom plads så enligt kort beholder halv bredde på desktop
                  <div className="hidden md:block flex-1" aria-hidden="true" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
