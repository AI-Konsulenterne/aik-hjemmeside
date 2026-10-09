import FadeIn from "@/components/ui/FadeIn";

const steps = [
  {
    number: "1",
    title: "Vi finder ud af hvor I skal starte",
    description:
      "I skal ikke vide noget på forhånd. Vi kortlægger jeres processer, forstår hvor I taber tid - og finder de 2-3 muligheder der giver størst effekt hurtigst.",
    duration: "45 min",
    addresses: "Løser: \"Vi ved ikke hvor vi skal starte\"",
  },
  {
    number: "2",
    title: "Vi bygger, tester og integrerer",
    description:
      "I behøver ikke have en IT-afdeling eller interne AI-kompetencer. Vi vælger den rigtige platform, bygger løsningen og tilslutter den jeres systemer. I modtager et færdigt produkt.",
    duration: "1-2 uger",
    addresses: "Løser: \"Vi har ingen intern viden\"",
  },
  {
    number: "3",
    title: "Vi sørger for det bliver brugt",
    description:
      "Onboarding, træning tilpasset hver rolle, og support indtil jeres team bruger det dagligt. Vi måler faktisk brug - ikke bare at det er live.",
    duration: "30-60 dage",
    addresses: "Løser: \"Medarbejderne bruger det ikke\"",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Sådan virker det
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1]">
            Fra første samtale til AI i drift
          </h2>
        </FadeIn>

        <div className="mt-14 lg:mt-20">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 150}>
              <div className={`flex flex-col lg:flex-row gap-6 lg:gap-16 items-start ${i < steps.length - 1 ? "pb-12 lg:pb-16 mb-12 lg:mb-16 border-b border-gray-100" : ""}`}>
                {/* Large step number */}
                <div className="flex-shrink-0 lg:w-32">
                  <span className="text-[5rem] lg:text-[7rem] font-bold tracking-heading text-gray-100 leading-none select-none">
                    {step.number}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1 lg:pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold tracking-heading text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold bg-sand px-2.5 py-1 rounded-full whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-body text-gray-700 max-w-lg">
                    {step.description}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold mt-4">
                    {step.addresses}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
