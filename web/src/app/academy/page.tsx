import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const SKOOL_URL = "https://www.skool.com/aik-academy-9764";
const DEMO_MAILTO =
  "mailto:alexander@ai-konsulenterne.dk?subject=AIK%20Academy%20%E2%80%93%20Demo";

export const metadata: Metadata = {
  title: "AIK Academy — AI-træning til danske SMV'er | AI-Konsulenterne",
  description:
    "AIK Academy er vores online læringsunivers for danske virksomheder. Lær Copilot, ChatGPT og Claude — på dansk, i øjenhøjde.",
  alternates: { canonical: "/academy" },
  keywords: [
    "AI træning",
    "AI kursus dansk",
    "Copilot kursus",
    "ChatGPT kursus virksomhed",
    "AI læring SMV",
    "AIK Academy",
  ],
  openGraph: {
    title: "AIK Academy — AI-træning til danske SMV'er",
    description:
      "AIK Academy er vores online læringsunivers for danske virksomheder. Lær Copilot, ChatGPT og Claude — på dansk, i øjenhøjde.",
    url: "/academy",
  },
};

// Knap-klasser der matcher Button-komponenten (til eksterne <a>-links)
const primaryBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-primary text-white hover:bg-primary-dark px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";
const secondaryBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";

const modules = [
  {
    title: "Grundlæggende AI",
    description:
      "Hvad er sprogmodeller, hvad kan de, og hvor fejler de. Fundamentet - uden tech-jargon.",
    iconPath:
      "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  },
  {
    title: "Microsoft Copilot",
    description:
      "Outlook, Teams, Word, Excel og PowerPoint. Konkrete use cases medarbejderne kan bruge mandag morgen.",
    iconPath:
      "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
  },
  {
    title: "ChatGPT",
    description:
      "Research, udkast, analyse og automatisering. Hvornår ChatGPT slår Copilot - og hvornår det ikke gør.",
    iconPath:
      "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    title: "Claude",
    description:
      "Den bedste model til lange dokumenter, kode og struktureret tænkning. Hvornår I skal vælge Claude.",
    iconPath:
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  },
];

const benefits = [
  {
    title: "På dansk",
    description:
      "Hele platformen, alle videoer og alt materiale er på dansk. Bygget til den måde danske SMV'er faktisk arbejder.",
    iconPath:
      "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802",
  },
  {
    title: "Konkret, ikke abstrakt",
    description:
      "Hver video viser en konkret use case live på skærmen. Ingen slides om “AI's potentiale”.",
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Bygget til hverdagen",
    description:
      "Videoer på 3-7 minutter. Medarbejderne ser det i kaffepausen og bruger det samme dag.",
    iconPath: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Levende community",
    description:
      "Ugentlige live Q&A, månedlige office hours og et forum hvor I får svar inden for 24 timer.",
    iconPath:
      "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Rollebaserede moduler",
    description:
      "Særlige spor til sælgere, ledere, HR, økonomi og advokater. Folk lærer det der er relevant for dem.",
    iconPath:
      "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
  },
  {
    title: "Take-aways til hver lektion",
    description:
      "Prompt-cheatsheets, Excel-templates og tjeklister. Materialet bliver brugt længe efter videoen er set.",
    iconPath:
      "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
  },
];

const checklist = [
  "Adgang til alle moduler og alle fremtidige opdateringer",
  "Ugentligt live Q&A - stil spørgsmål direkte til AIK-teamet",
  "Prompt-bibliotek der opdateres løbende",
  "Community med andre danske virksomheder der bruger AI",
  "Månedlige office hours hvor I får jeres konkrete problemer løst",
  "Nye moduler hver måned - også når AI-landskabet rykker",
];

export default function Academy() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <FadeIn>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                  AIK Academy
                </p>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                  AI-træning til hele teamet - i øjenhøjde
                </h1>
                <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                  Et online læringsunivers hvor jeres medarbejdere lærer at bruge
                  AI til deres faktiske arbejde. Ingen jargon, ingen 40-timers
                  kurser. Korte videoer, konkrete use cases og et community der
                  svarer på spørgsmål.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primaryBtn}
                  >
                    Se Academy →
                  </a>
                  <a href="#kontakt" className={secondaryBtn}>
                    Book demo til teamet
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                <Image
                  src="/screenshots/academy-modules.png"
                  alt="AIK Academy moduler - Copilot, ChatGPT, Claude, AI Grundlæggende og Q&A"
                  width={1870}
                  height={1258}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Moduler */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Det lærer jeres team
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                Fire moduler, bygget til arbejdet
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((m, i) => (
              <FadeIn key={m.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 ring-1 ring-gray-100 h-full">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={m.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold tracking-heading text-gray-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{m.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Hvorfor AIK Academy */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Hvorfor AIK Academy
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
                AI-læring der faktisk bliver brugt
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 70}>
                <div className="h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={b.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold tracking-heading text-gray-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    {b.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sådan ser det ud i praksis */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] mb-10 lg:mb-12">
              Sådan ser det ud i praksis
            </h2>
          </FadeIn>
          <ul className="space-y-4">
            {checklist.map((item, i) => (
              <FadeIn key={item} delay={i * 60}>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA / kontakt */}
      <section
        id="kontakt"
        className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gray-900 rounded-3xl px-6 py-14 lg:px-12 lg:py-20 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-white leading-[1.1]">
                  Klar til at få teamet i gang?
                </h2>
                <p className="text-white/60 mt-4 leading-relaxed text-lg">
                  Book et 20-minutters opkald. Vi viser Academy, taler om hvad
                  jeres team har brug for, og finder ud af om det er den rigtige
                  løsning.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primaryBtn}
                  >
                    Se Academy →
                  </a>
                  <a
                    href={DEMO_MAILTO}
                    className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 bg-white text-gray-900 hover:bg-gray-100 px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base"
                  >
                    Book demo
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
