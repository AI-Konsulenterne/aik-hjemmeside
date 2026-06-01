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
    body: "Vi gider ikke projekter der trækker i langdrag, og vi vil gerne have at I kommer i gang hurtigst muligt.",
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

function StepCard({ step }: { step: Step }) {
  return (
    <div className="bg-white ring-1 ring-gray-200 rounded-2xl p-6 lg:p-8 h-full flex flex-col shadow-sm">
      <span className="text-2xl lg:text-3xl font-bold tracking-heading text-primary mb-3">
        {step.number}
      </span>
      <h3 className="text-lg lg:text-xl font-bold tracking-heading text-gray-900 mb-2">
        {step.title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-[15px]">
        {step.body}
      </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 80}>
              <StepCard step={step} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
