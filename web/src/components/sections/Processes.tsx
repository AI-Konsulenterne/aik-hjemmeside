import FadeIn from "@/components/ui/FadeIn";

const processes = [
  {
    icon: "📧",
    title: "Kundeservice på email",
    description: "AI svarer 24/7 på de 80% mest stillede spørgsmål",
  },
  {
    icon: "📦",
    title: "Ordrebehandling",
    description: "Automatisk håndtering på tværs af Shopify og CRM",
  },
  {
    icon: "👥",
    title: "HR-spørgsmål",
    description: "Datasikker intern agent der frigør HR-afdelingen",
  },
  {
    icon: "📊",
    title: "Rapportering",
    description: "Auto-genereret direkte fra jeres data",
  },
  {
    icon: "🧾",
    title: "Fakturamatching",
    description: "Automatisk validering og afstemning",
  },
  {
    icon: "🎯",
    title: "Leadkvalificering",
    description: "AI scorer og prioriterer leads i jeres CRM",
  },
  {
    icon: "📚",
    title: "Intern vidensbase",
    description: "Medarbejderne finder hurtigt svar",
  },
  {
    icon: "✍️",
    title: "Content og produkttekster",
    description: "Skaleret produktion uden at miste kvalitet",
  },
];

export default function Processes() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Hvad kan vi automatisere?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1] max-w-3xl mx-auto">
            Processer vi typisk starter med
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            I behøver ikke vide hvilken. Vi finder den sammen — men her er hvor de fleste virksomheder får størst effekt.
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {processes.map((p, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="bg-white rounded-xl p-5 lg:p-6 h-full border border-gray-100 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-3xl lg:text-4xl mb-3">{p.icon}</div>
                <h3 className="text-sm lg:text-base font-bold tracking-heading text-gray-900 leading-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p className="text-center mt-10 lg:mt-12 text-sm text-gray-500">
            Ingen af ovenstående? <span className="text-gray-900 font-semibold">Vi har sikkert løst noget lignende.</span>{" "}
            <a href="#booking" className="text-primary font-semibold hover-underline">Tag en gratis snak med os.</a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
