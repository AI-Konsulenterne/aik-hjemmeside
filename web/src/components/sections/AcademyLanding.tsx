import Image from "next/image";
import { Fragment } from "react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import ValueCalculator from "@/components/sections/ValueCalculator";

const SKOOL_URL = "https://www.skool.com/aiminds";

// Knap-klasser til eksterne <a>-links (matcher Button-komponenten)
const ghostBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 border-[1.5px] border-gray-300 text-gray-900 hover:border-gray-900 px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";
const lightBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-white text-gray-900 hover:bg-gray-100 px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";

const ArrowRight = ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[13px] font-bold tracking-[0.22em] uppercase text-primary">
    {children}
  </span>
);

const Check = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Cross = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

// ── Værdikæden: Licens → Læring → Anvendelse → Værdi ──────
function ValueChain({ dark = false }: { dark?: boolean }) {
  const steps = ["Licens", "Læring", "Anvendelse", "Værdi"];
  return (
    <div className="flex flex-wrap items-center gap-2.5" aria-label="Licens til læring til anvendelse til værdi">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <Fragment key={step}>
            <span
              className={`px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase ${
                isLast
                  ? "bg-primary text-white"
                  : dark
                    ? "border border-white/25 text-white"
                    : "border border-gray-300 text-gray-700"
              }`}
            >
              {step}
            </span>
            {!isLast && (
              <ArrowRight
                className={`w-4 h-4 ${dark ? "text-white/50" : "text-gray-400"}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ── Indhold ───────────────────────────────────────────────
const problemCards = [
  {
    nr: "01",
    quote: "“Hvad kan jeg egentlig bruge det til?”",
    body: "Medarbejderne har ikke brug for endnu en præsentation om AI. De har brug for konkrete eksempler på deres egne arbejdsopgaver.",
    highlight: null,
  },
  {
    nr: "02",
    quote: "“Jeg har ikke tid til et helt kursus.”",
    body: "Det er de færreste, der har lyst til at afsætte en hel dag til AI-uddannelse. Derfor er AI-Minds bygget til en travl arbejdsdag.",
    highlight: "En lektion. Få minutter. Én konkret ting at lære.",
  },
  {
    nr: "03",
    quote: "“Hvem skal holde øje med alt det nye?”",
    body: "Copilot udvikler sig hele tiden. Nye funktioner kommer til, muligheder ændrer sig, og det, der var relevant for nogle måneder siden, er ikke nødvendigvis det vigtigste i dag.",
    highlight: null,
  },
];

const howSteps = [
  {
    nr: "01",
    title: "Se",
    body: "Korte videoer på under 15 minutter. Vi viser én konkret funktion, metode eller arbejdsgang ad gangen.",
  },
  {
    nr: "02",
    title: "Prøv",
    body: "Medarbejderen prøver det af på en rigtig opgave. Ikke et tænkt skoleeksempel. Deres egen mail. Deres eget dokument. Deres eget møde.",
  },
  {
    nr: "03",
    title: "Brug",
    body: "Næste gang den samme opgave dukker op, ved medarbejderen, hvad Copilot kan hjælpe med. Det er sådan, nye vaner bliver til.",
  },
];

const productAnnotations = [
  { title: "Korte moduler", body: "Lær én konkret ting ad gangen." },
  { title: "Tydelig progression", body: "Start enkelt og byg videre, når du er klar." },
  { title: "Praktiske guides", body: "Brug det, du lærer, direkte i arbejdet." },
  { title: "Q&A", body: "Få hjælp, når du sidder fast." },
  { title: "Løbende nyt indhold", body: "Når Copilot udvikler sig, gør AI-Minds det også." },
];

const copilotModules = [
  {
    title: "Kom godt fra start",
    body: "Forstå de grundlæggende principper, og lær at skrive prompts, der giver brugbare resultater.",
  },
  {
    title: "Outlook",
    body: "Brug Copilot til mails, opsummeringer, svar og forberedelse.",
  },
  {
    title: "Word",
    body: "Kom hurtigere fra tom side til første udkast. Få hjælp til at skrive, omskrive og opsummere dokumenter.",
  },
  {
    title: "Excel",
    body: "Brug Copilot til at forstå data, finde mønstre og komme videre med opgaver.",
  },
  {
    title: "PowerPoint",
    body: "Arbejd hurtigere med præsentationer, struktur og indhold.",
  },
  {
    title: "Teams",
    body: "Få mere ud af møder med opsummeringer, overblik og opfølgning.",
  },
  {
    title: "Research & analyse",
    body: "Lær at bruge de mere avancerede Copilot-muligheder, når medarbejderne er klar.",
  },
  {
    title: "AI-agenter",
    body: "Gå fra at bruge Copilot som assistent til at bygge agenter, der kan hjælpe med konkrete opgaver og processer.",
  },
];

const pillars = [
  {
    nr: "01",
    title: "Lav friktion",
    lead: "Under 15 minutter ad gangen.",
    body: "Ingen kursusdage. Ingen lange undervisningsforløb. Medarbejderne kan lære, når det passer ind i arbejdsdagen.",
  },
  {
    nr: "02",
    title: "Høj relevans",
    lead: "Lær på de værktøjer og opgaver, medarbejderne allerede bruger.",
    body: "Vi tager udgangspunkt i Microsoft 365 og den virkelighed, medarbejderne står i.",
  },
  {
    nr: "03",
    title: "Løbende udvikling",
    lead: "Copilot ændrer sig. AI-Minds følger med.",
    body: "Når Microsoft lancerer nye funktioner og muligheder, omsætter vi dem til korte, praktiske lektioner.",
  },
];

const notYourJob = [
  "bygge interne AI-kurser",
  "finde de nyeste Copilot-funktioner",
  "producere undervisningsmateriale",
  "holde oplæg for medarbejderne",
  "svare på alle spørgsmål",
  "følge med i alle Microsoft-opdateringer",
];

const buyChecklist = [
  "En samlet Copilot-uddannelse",
  "Korte, praktiske lektioner med øvelser",
  "Nye lektioner løbende - også når Copilot ændrer sig",
  "Månedlig live Q&A med AIK-teamet",
  "Guides, templates og prompts",
  "Et community med andre danske virksomheder",
  "Flere AI-forløb: ChatGPT, Claude, AI-grundlæggende og AI-sikkerhed",
];

const bonusTracks = [
  {
    title: "Claude",
    body: "Lær at bygge AI-assistenter og arbejde mere avanceret med AI.",
  },
  {
    title: "ChatGPT",
    body: "Lær at bruge ChatGPT til blandt andet research, idéudvikling, skrivning og problemløsning.",
  },
  {
    title: "AI-grundlæggende",
    body: "Et enkelt fundament for medarbejdere, der gerne vil forstå AI uden teknisk jargon.",
  },
  {
    title: "AI-sikkerhed",
    body: "Lær, hvad medarbejderne skal være opmærksomme på, når de bruger AI-værktøjer.",
  },
  {
    title: "Guides & templates",
    body: "Få konkrete skabeloner, prompts og workflows, der kan bruges direkte.",
  },
];

const courseFlow = ["Én kursusdag", "Alle får det samme", "Kurset slutter"];
const mindsFlow = [
  "Korte lektioner",
  "Egen arbejdsdag",
  "Løbende hjælp",
  "Nyt indhold",
  "Nye kompetencer",
];

const processSteps = [
  {
    nr: "01",
    title: "Vi tager en snak",
    body: "På 30 minutter viser vi jer AI-Minds live. Vi taler om jeres organisation, jeres medarbejdere og jeres brug af Copilot.",
    result: "En live demo, svar på jeres spørgsmål og en konkret pris.",
  },
  {
    nr: "02",
    title: "Vi hjælper jer i gang",
    body: "Vi hjælper jer med at få medarbejderne godt introduceret til platformen. Intet stort IT-projekt. Ingen lange implementeringsforløb.",
    result: null,
  },
  {
    nr: "03",
    title: "Medarbejderne lærer i deres eget tempo",
    body: "De starter med korte lektioner og arbejder sig gennem Copilot-forløbet - på deres egne opgaver og med hjælp undervejs.",
    result: null,
  },
  {
    nr: "04",
    title: "Vi holder det levende",
    body: "Copilot udvikler sig. Det gør AI-Minds også. Vi følger udviklingen, laver nye lektioner og holder platformen relevant.",
    result: null,
  },
];

const faqs = [
  {
    q: "Hvad koster AI-Minds?",
    a: "Prisen er pr. medarbejder og afhænger af, hvor mange I er. Vi giver jer et konkret prisforslag efter demoen - og et samlet prisark, I kan tage med til resten af ledelsen.",
  },
  {
    q: "Skal vi have Copilot-licenser i forvejen?",
    a: "I får mest ud af Copilot-forløbet, hvis medarbejderne allerede har adgang til Copilot. Har I ikke licenser endnu, kan medarbejderne starte med AI-grundlæggende, ChatGPT og Claude - og tage Copilot-forløbet, når licenserne er på plads.",
  },
  {
    q: "Hvor meget tid skal medarbejderne bruge?",
    a: "Lektionerne er korte videoer på under 15 minutter, som medarbejderne tager i deres eget tempo. Mange øvelser tager udgangspunkt i opgaver, de alligevel sidder med. Ingen kursusdage. Ingen lange undervisningsforløb.",
  },
  {
    q: "Er AI-Minds bare et onlinekursus?",
    a: "Nej. AI-Minds er en løbende læringsplatform med Copilot-lektioner, live Q&A, guides, templates, community og løbende opdateringer. Copilot ændrer sig hele tiden - derfor skal læringen også gøre det.",
  },
  {
    q: "Hvad sker der, når Microsoft lancerer nye Copilot-funktioner?",
    a: "Vi følger udviklingen og laver nye lektioner, når der kommer funktioner, som er relevante for medarbejdernes hverdag. I behøver ikke selv holde øje med alle ændringer.",
  },
  {
    q: "Kan medarbejderne stille spørgsmål?",
    a: "Ja. Der er månedlig live Q&A, og i forummet får de svar inden for 24 timer.",
  },
  {
    q: "Hvad med medarbejdere, der allerede er gode til Copilot?",
    a: "De kan gå direkte til de mere avancerede dele af forløbet - blandt andet research, analyse og AI-agenter. Og når de vil videre end Copilot, har de også adgang til vores øvrige AI-forløb.",
  },
  {
    q: "Hvad med sikkerhed og GDPR?",
    a: "AI-Minds indeholder et selvstændigt forløb i AI-sikkerhed, hvor medarbejderne lærer, hvad de må dele med en AI - og hvad der skal blive internt.",
  },
  {
    q: "Er vi bundet til noget?",
    a: "Nej, der er ingen binding. Det kører løbende måned + 1 måned, så I kan opsige, når det passer jer.",
  },
  {
    q: "Kan vi prøve det, før vi beslutter os?",
    a: "Ja. Book en 30 minutters demo, hvor vi viser jer platformen live og går gennem konkrete lektioner sammen med jer.",
  },
];

export default function AcademyLanding() {
  return (
    <>
      {/* ══════════ 01 · HERO ══════════ */}
      <section className="relative overflow-hidden pt-[clamp(3.5rem,9vw,6rem)] pb-[clamp(3rem,8vw,5.5rem)]">
        <div
          className="pointer-events-none absolute -top-[380px] -right-[260px] w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,154,0,.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <Eyebrow>AI-Minds Copilot Academy</Eyebrow>
                <h1 className="text-4xl lg:text-5xl xl:text-[3.4rem] font-bold tracking-heading text-gray-900 leading-[1.06] mt-4 text-balance">
                  I har allerede Copilot.{" "}
                  <span className="text-primary">
                    Nu skal medarbejderne have det i hænderne.
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed max-w-xl">
                  AI-Minds hjælper jeres medarbejdere med at få Copilot ind i
                  hverdagen gennem korte, praktiske lektioner på dansk - som de
                  kan tage, når de har tid. Under 15 minutter ad gangen.
                  Konkrete arbejdsopgaver. Løbende opdateringer. Og I skal ikke
                  selv drive endnu et AI-projekt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9">
                  <Button variant="primary" size="lg" cal>
                    Få en 30 min. demo
                    <ArrowRight />
                  </Button>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ghostBtn}
                  >
                    Se AI-Minds
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Vi viser jer platformen, taler om jeres organisation og giver
                  jer et konkret prisforslag.
                </p>
                <div className="mt-8">
                  <ValueChain />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full">
                <div
                  className="pointer-events-none absolute -inset-10"
                  style={{
                    background:
                      "radial-gradient(circle at 66% 34%, rgba(255,154,0,.16), transparent 58%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-[1]">
                  <Image
                    src="/ai-minds.jpg"
                    alt="AI-Minds læringsplatformen"
                    width={720}
                    height={383}
                    priority
                    className="w-full rounded-[24px] shadow-[0_34px_64px_-26px_rgba(0,0,0,.4)]"
                  />
                  <div className="absolute -bottom-4 left-5 z-[4] flex items-center gap-2 bg-white text-gray-900 text-[13px] font-bold tracking-wide px-[18px] py-[11px] rounded-full shadow-[0_18px_36px_-12px_rgba(0,0,0,.35)] ring-1 ring-gray-100">
                    <span
                      className="w-2 h-2 rounded-full bg-primary shrink-0"
                      aria-hidden="true"
                    />
                    Allerede brugt af 25+ virksomheder
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════ 02 · PROBLEM ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <Eyebrow>Har I allerede Copilot?</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
                Så er det næste spørgsmål ikke, om medarbejderne har adgang.{" "}
                <span className="text-primary">
                  Det er, om de får nok ud af det.
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 mt-6 leading-relaxed">
                Nogle medarbejdere bruger Copilot hver dag. Andre har prøvet det
                et par gange. Og nogle ved måske stadig ikke helt, hvad de skal
                bruge det til. Det er helt normalt. Adgang til Copilot er nemlig
                kun første skridt - medarbejderne skal også lære, hvornår det
                giver mening at bruge det, og hvordan de får et godt resultat.
                Det er dét, AI-Minds er bygget til.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {problemCards.map((card, i) => (
              <FadeIn key={card.nr} delay={i * 80}>
                <div className="h-full bg-white rounded-[20px] border border-gray-200 p-8 flex flex-col">
                  <span className="text-[13px] font-bold tracking-[0.18em] text-primary">
                    {card.nr}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-3 leading-snug">
                    {card.quote}
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mt-3 flex-grow">
                    {card.body}
                  </p>
                  {card.highlight && (
                    <p className="mt-5 border-l-[3px] border-primary bg-primary/10 rounded-r-xl px-4 py-3 text-[15px] font-semibold text-gray-900">
                      {card.highlight}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-10 text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
              I skal ikke selv følge med i det hele.{" "}
              <span className="text-primary">Det gør vi.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 03 · SÅDAN VIRKER DET ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Sådan virker det</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Se. Prøv. <span className="text-primary">Brug.</span>
              </h2>
              <p className="text-lg text-gray-600 mt-5 leading-relaxed">
                AI-Minds er ikke bygget til, at medarbejderne skal sidde og se
                lange videoer. Det er bygget til, at de lærer noget konkret og
                bruger det bagefter.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {howSteps.map((step, i) => (
              <FadeIn key={step.nr} delay={i * 80}>
                <div className="h-full rounded-[20px] border border-gray-200 p-8">
                  <span className="text-[13px] font-bold tracking-[0.18em] uppercase text-primary">
                    {step.nr} · {step.title}
                  </span>
                  <p className="text-[16px] text-gray-600 leading-relaxed mt-4">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-10 max-w-[820px] text-xl lg:text-2xl leading-snug tracking-tight text-gray-900">
              Målet er ikke, at medarbejderne skal vide alt om Copilot.{" "}
              <strong className="font-bold">
                Målet er, at de bruger det, når det giver mening.
              </strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 04 · PRODUKTOPLEVELSE ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>AI-Minds i praksis</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                En læringsplatform, der er{" "}
                <span className="text-primary">nem at gå til</span>.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center mt-14">
            <FadeIn>
              <Image
                src="/ai-minds.jpg"
                alt="Skærmbillede af AI-Minds platformen med moduler"
                width={720}
                height={383}
                className="w-full rounded-[24px] shadow-[0_34px_64px_-26px_rgba(0,0,0,.35)] ring-1 ring-gray-200"
              />
            </FadeIn>
            <FadeIn delay={120}>
              <ul className="flex flex-col">
                {productAnnotations.map((a) => (
                  <li
                    key={a.title}
                    className="grid grid-cols-[14px_1fr] gap-4 items-baseline py-4 border-t border-gray-200 first:border-t-0"
                  >
                    <span
                      className="w-[10px] h-[10px] rounded-full bg-primary translate-y-[1px]"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[15px] font-bold tracking-[0.08em] uppercase text-gray-900">
                        {a.title}
                      </span>
                      <span className="block text-[15px] text-gray-600 mt-1">
                        {a.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════ 05 · COPILOT-FORLØBET ══════════ */}
      <section id="curriculum" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-10 flex-wrap">
              <div className="max-w-2xl">
                <Eyebrow>Microsoft Copilot</Eyebrow>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                  Fra første prompt til{" "}
                  <span className="text-primary">egne AI-agenter</span>.
                </h2>
              </div>
              <p className="text-[17px] text-gray-600 max-w-[380px]">
                AI-Minds starter med det, medarbejderne har brug for i hverdagen
                - og giver dem mulighed for at bygge videre.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {copilotModules.map((m, i) => (
              <FadeIn key={m.title} delay={(i % 4) * 70}>
                <div className="h-full rounded-[20px] border border-gray-200 p-7 transition-all duration-200 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-[12px] font-bold tracking-[0.16em] text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[19px] font-bold tracking-tight text-gray-900 mt-2.5">
                    {m.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mt-2">
                    {m.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-10 text-lg font-semibold text-gray-900">
              Copilot udvikler sig.{" "}
              <span className="text-primary">Det gør jeres læring også.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 06 · HVORFOR AI-MINDS ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Det er kombinationen</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
                Lav friktion. Høj relevans.{" "}
                <span className="text-primary">Løbende udvikling.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {pillars.map((p, i) => (
              <FadeIn key={p.nr} delay={i * 80}>
                <div className="h-full bg-white rounded-[20px] border border-gray-200 p-8">
                  <span className="text-[13px] font-bold tracking-[0.18em] uppercase text-primary">
                    {p.nr} · {p.title}
                  </span>
                  <p className="text-[17px] font-bold text-gray-900 mt-4">
                    {p.lead}
                  </p>
                  <p className="text-[15px] text-gray-600 leading-relaxed mt-2.5">
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-10 max-w-[820px] text-lg text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                Det er kombinationen, der gør forskellen.
              </strong>{" "}
              Ikke mere AI-teori. Bare løbende læring, der bliver omsat til
              brug.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 07 · TIL LEDELSEN ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[28px] bg-gray-900 text-white px-9 py-12 lg:px-[72px] lg:py-16">
              <div
                className="pointer-events-none absolute -bottom-[260px] -left-[120px] w-[500px] h-[500px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,154,0,.14), transparent 62%)",
                }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
                <div>
                  <Eyebrow>Til ledelsen</Eyebrow>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-heading leading-[1.1] mt-3.5 text-balance">
                    I skal ikke være dem, der driver AI-uddannelsen.
                  </h2>
                  <p className="text-[17px] text-gray-400 mt-5 leading-relaxed">
                    I har rigeligt at holde styr på. I giver medarbejderne
                    adgang - vi giver dem et sted at lære, prøve ting af og få
                    hjælp. Og vi holder indholdet relevant, når Copilot
                    udvikler sig.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-bold tracking-[0.12em] uppercase text-gray-500">
                    I skal ikke:
                  </p>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {notYourJob.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 py-2.5 border-b border-white/10 text-[15px] text-gray-300"
                      >
                        <span className="text-gray-500 shrink-0">
                          <Cross />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xl font-bold text-white">
                    Det gør vi.
                  </p>
                  <p className="mt-4 text-[17px] text-gray-400 leading-relaxed">
                    <strong className="text-white font-semibold">
                      AI-Minds er jeres løbende Copilot-uddannelse.
                    </strong>{" "}
                    Ikke endnu et projekt, I selv skal drive.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 08 · DET ER DET, I KØBER ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
            <FadeIn>
              <div>
                <Eyebrow>Det er det, I køber</Eyebrow>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                  I køber ikke bare{" "}
                  <span className="text-primary">adgang til videoer</span>.
                </h2>
                <p className="text-lg text-gray-600 mt-5 leading-relaxed">
                  I får en løsning, der hjælper jer med at få Copilot ud at leve
                  i organisationen.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <ul>
                {buyChecklist.map((item, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[30px_1fr] gap-[18px] items-start py-4 border-t border-gray-200 first:border-t-0 text-[17px] leading-snug text-gray-900"
                  >
                    <span className="w-[30px] h-[30px] rounded-full bg-primary text-white flex items-center justify-center mt-0.5">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════ 09 · MERE END COPILOT ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Mere end Copilot</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Copilot er kernen.{" "}
                <span className="text-primary">AI-Minds stopper ikke dér.</span>
              </h2>
              <p className="text-lg text-gray-600 mt-5 leading-relaxed">
                Når medarbejderne har styr på Copilot, kan de bygge videre. Som
                en del af AI-Minds får de også adgang til vores øvrige
                AI-forløb.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {bonusTracks.map((t, i) => (
              <FadeIn key={t.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-[20px] border border-gray-200 p-7 transition-all duration-200 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-[19px] font-bold tracking-tight text-gray-900">
                    {t.title}
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mt-2">
                    {t.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-10 text-lg font-semibold text-gray-900">
              Copilot er udgangspunktet.{" "}
              <span className="text-gray-600 font-normal">
                AI-Minds giver medarbejderne mulighed for at bygge videre
                derfra.
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 10 · FRA ADGANG TIL ADOPTION ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Fra adgang til adoption</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
              Det er ikke nok, at medarbejderne har adgang.{" "}
              <span className="text-primary">
                I skal kunne se, om de kommer i gang.
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 leading-relaxed">
              For det er dét, ledelsen har brug for at vide: bliver det brugt?
              I får indsigt i medarbejdernes aktivitet og progression på
              platformen - så AI-Minds ikke bare giver adgang til læring, men
              gør det muligt at følge, om organisationen faktisk kommer i gang.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 11 · REGN PÅ VÆRDIEN ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Regn på værdien</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Små forbedringer bliver hurtigt{" "}
                <span className="text-primary">store i en organisation</span>.
              </h2>
              <p className="text-lg text-gray-600 mt-5 leading-relaxed">
                Forestil jer 100 medarbejdere. Hvis hver medarbejder bare finder
                15 minutter om ugen gennem smartere brug af Copilot, svarer det
                til 25 arbejdstimer om ugen - og cirka 1.300 arbejdstimer på et
                år. Det er ikke et løfte om, at AI-Minds skaber præcis den
                besparelse. Det er et eksempel på, hvorfor selv små forbedringer
                kan have betydning.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="mt-12">
              <ValueCalculator />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 12 · PRIS ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Enkelt at komme i gang</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
              Én pris pr. medarbejder.{" "}
              <span className="text-primary">Ingen lang binding.</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 leading-relaxed">
              Prisen er pr. medarbejder og afhænger af, hvor mange I er. Vi
              giver jer et konkret prisforslag efter demoen - og et samlet
              prisark, I kan tage med til resten af ledelsen.
            </p>
            <p className="mt-8 inline-block border-l-[3px] border-primary bg-primary/10 rounded-r-2xl px-7 py-4 text-[17px] leading-snug text-gray-900 font-medium text-left">
              Ingen lang binding. Det kører løbende måned + 1 måned, så I kan
              opsige, når det passer jer.
            </p>
            <p className="text-lg text-gray-600 mt-8 leading-relaxed">
              I behøver ikke tage en stor beslutning. Start med jeres
              organisation. Se, om medarbejderne kommer i gang. Fortsæt, hvis
              AI-Minds skaber værdi for jer.
            </p>
            <div className="mt-9">
              <Button variant="primary" size="lg" cal>
                Få en konkret pris for jeres virksomhed
                <ArrowRight />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 13 · KURSUS VS. AI-MINDS ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Den store forskel</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Et kursus har en slutdato.{" "}
                <span className="text-primary">Det har Copilot ikke.</span>
              </h2>
              <p className="text-lg text-gray-600 mt-5 leading-relaxed">
                En kursusdag kan være en god start. Men Copilot ændrer sig.
                Medarbejderne glemmer ting. Nye funktioner kommer til, og
                behovene er forskellige fra medarbejder til medarbejder. Derfor
                er AI-Minds bygget som en løbende Copilot-uddannelse.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 max-w-4xl">
            <FadeIn>
              <div className="h-full rounded-[20px] border border-gray-200 bg-gray-50 p-8">
                <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-gray-500">
                  Traditionelt kursus
                </p>
                <ul className="mt-5">
                  {courseFlow.map((item, i) => (
                    <li key={item} className="text-[17px] text-gray-700">
                      {i > 0 && (
                        <span
                          className="block text-gray-400 py-1.5 pl-1"
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="h-full rounded-[20px] bg-gray-900 text-white p-8">
                <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-primary">
                  AI-Minds
                </p>
                <ul className="mt-5">
                  {mindsFlow.map((item, i) => (
                    <li key={item} className="text-[17px] text-gray-100">
                      {i > 0 && (
                        <span
                          className="block text-primary py-1.5 pl-1"
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <p className="mt-10 max-w-[820px] text-lg font-semibold text-gray-900">
              Det er forskellen på at lære Copilot én gang - og at blive bedre
              til at bruge det over tid.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 15 · SOCIAL PROOF ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Allerede i brug hos 25+ virksomheder</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
              Vi er allerede i gang hos{" "}
              <span className="text-primary">virksomheder som jer</span>.
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 leading-relaxed">
              Mere end 25 virksomheder har valgt AI-Minds som en del af deres
              løbende AI-uddannelse. De bruger platformen til at give
              medarbejderne en enkel måde at lære Copilot på - uden lange
              kurser og uden selv at skulle bygge en intern AI-uddannelse.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 16 · SÅDAN KOMMER I I GANG ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Nemt at komme i gang</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Fra første samtale til medarbejdere,{" "}
                <span className="text-primary">der er i gang</span>.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {processSteps.map((step, i) => (
              <FadeIn key={step.nr} delay={i * 80}>
                <div className="h-full rounded-[20px] border border-gray-200 p-7 flex flex-col">
                  <span className="text-3xl font-bold text-primary/30 tabular-nums">
                    {step.nr}
                  </span>
                  <h3 className="text-[19px] font-bold tracking-tight text-gray-900 mt-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mt-2.5 flex-grow">
                    {step.body}
                  </p>
                  {step.result && (
                    <p className="mt-4 pt-4 border-t border-gray-100 text-[14px] leading-snug">
                      <span className="font-bold text-primary">I får: </span>
                      <span className="text-gray-700">{step.result}</span>
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 17 · FAQ ══════════ */}
      <section id="faq" className="bg-gray-50 py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div>
              <Eyebrow>Spørgsmål?</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Det vil I sikkert{" "}
                <span className="text-primary">gerne vide.</span>
              </h2>
              <p className="text-[17px] text-gray-600 mt-5 leading-relaxed">
                Har du et spørgsmål, der ikke står her? Tag det med på demoen.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="border-t border-gray-200 mt-12">
              {faqs.map((item, i) => (
                <details
                  key={item.q}
                  open={i === 0}
                  className="group border-b border-gray-200"
                >
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-6 py-7 text-xl font-semibold tracking-tight text-gray-900 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="shrink-0 w-[30px] h-[30px] rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-500 transition-all duration-300 group-open:rotate-45 group-open:bg-primary group-open:border-primary group-open:text-white">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-7 -mt-1 text-[17px] leading-relaxed text-gray-600 max-w-[760px]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 18 · FINAL CTA ══════════ */}
      <section id="kontakt" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[32px] bg-gray-900 px-8 py-14 lg:px-20 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
              <div
                className="pointer-events-none absolute -top-[300px] -right-[180px] w-[700px] h-[700px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,154,0,.16) 0%, transparent 62%)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <Eyebrow>I har allerede investeret i Copilot</Eyebrow>
                <h2 className="text-3xl lg:text-[2.6rem] font-bold tracking-heading text-white leading-[1.1] mt-4 text-balance">
                  Spørgsmålet er ikke, om medarbejderne skal have adgang.{" "}
                  <span className="text-primary">
                    Spørgsmålet er, om de får nok ud af den.
                  </span>
                </h2>
                <div className="mt-7">
                  <ValueChain dark />
                </div>
                <p className="text-[17px] leading-relaxed text-gray-400 mt-6 max-w-md">
                  Korte lektioner. Praktiske opgaver. Løbende opdateringer.
                  Hjælp undervejs. Og en platform, I ikke selv skal drive.{" "}
                  <strong className="text-white font-semibold">
                    Allerede brugt af 25+ virksomheder.
                  </strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9">
                  <Button variant="primary" size="lg" cal>
                    Få en 30 min. demo
                    <ArrowRight />
                  </Button>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={lightBtn}
                  >
                    Se AI-Minds
                  </a>
                </div>
                <p className="text-[15px] text-gray-500 mt-6">
                  Ingen skal lære alt om AI. De skal bare lære det, der gør
                  deres egen arbejdsdag lettere.
                </p>
              </div>

              <div className="relative bg-white rounded-[22px] p-9 shadow-[0_30px_60px_-28px_rgba(0,0,0,.5)]">
                <div className="flex items-center gap-4">
                  <Image
                    src="/alexander.png"
                    alt="Alexander, AI Konsulenterne"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      Alexander
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      AI Konsulenterne
                    </div>
                  </div>
                </div>
                <p className="text-[17px] leading-relaxed text-gray-700 mt-6">
                  &ldquo;Vi møder jer hvor I er - og gør AI konkret og brugbart
                  fra dag ét.&rdquo;
                </p>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {[
                    "30 minutter",
                    "Vi viser jer AI-Minds live",
                    "Ærlig vurdering af om det passer til jer",
                  ].map((li) => (
                    <li
                      key={li}
                      className="flex items-center gap-3 text-[15px] text-gray-700"
                    >
                      <span className="text-primary shrink-0">
                        <Check className="w-[18px] h-[18px]" />
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
