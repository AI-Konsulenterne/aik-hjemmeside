import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

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

// ── Indhold ───────────────────────────────────────────────
const problemCards = [
  {
    quote: "“Hvad kan jeg bruge det til?”",
    body: "Medarbejderne mangler ikke endnu en AI-præsentation. De mangler eksempler på deres egne opgaver.",
  },
  {
    quote: "“Jeg har ikke tid til et kursus.”",
    body: "En lektion. Under 15 minutter. Én konkret ting.",
  },
  {
    quote: "“Hvem følger med i alt det nye?”",
    body: "Copilot ændrer sig hver måned. Det gør vi. Derfor er det et abonnement - ikke et kursus med slutdato.",
  },
];

const howSteps = [
  { nr: "01", title: "Se", body: "Kort video - under 15 minutter." },
  {
    nr: "02",
    title: "Prøv",
    body: "På en rigtig opgave - egen mail, eget dokument.",
  },
  { nr: "03", title: "Brug", body: "Næste gang opgaven dukker op." },
];

const faqs = [
  {
    q: "Hvad koster det?",
    a: "249 kr. pr. medarbejder pr. måned.",
  },
  {
    q: "Skal vi have Copilot-licenser i forvejen?",
    a: "I får mest ud af Copilot-forløbet, hvis medarbejderne allerede har adgang til Copilot. Har I ikke licenser endnu, kan medarbejderne starte med AI-grundlæggende, ChatGPT og Claude.",
  },
  {
    q: "Hvor meget tid skal medarbejderne bruge?",
    a: "Lektionerne er under 15 minutter og tages i eget tempo. Ingen kursusdage.",
  },
  {
    q: "Er det bare et onlinekursus?",
    a: "Nej. Nye lektioner løbende, live Q&A og community. Copilot ændrer sig - det gør læringen også.",
  },
  {
    q: "Er vi bundet?",
    a: "Nej, der er ingen binding. Det kører løbende måned + 1 måned, så I kan opsige, når det passer jer.",
  },
  {
    q: "Hvad med GDPR og sikkerhed?",
    a: "AI-sikkerhed er et selvstændigt forløb i AI-Minds: medarbejderne lærer, hvad de må dele med en AI - og hvad der skal blive internt.",
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
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>AI-Minds Copilot Academy</Eyebrow>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.06] mt-4 text-balance">
              I har allerede Copilot.{" "}
              <span className="text-primary">
                Nu skal medarbejderne have det i hænderne.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto">
              Korte, praktiske lektioner på dansk - alle under 15 minutter, på
              deres egne arbejdsopgaver, opdateret i takt med, at Copilot
              udvikler sig. Og I skal ikke selv drive endnu et AI-projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-9 justify-center">
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
            <p className="flex items-center justify-center gap-3 text-sm font-semibold text-gray-500 mt-8">
              <span
                className="hidden sm:block w-10 h-px bg-gray-300"
                aria-hidden="true"
              />
              Allerede i brug hos 25+ virksomheder
              <span
                className="hidden sm:block w-10 h-px bg-gray-300"
                aria-hidden="true"
              />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 02 · PROBLEM ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Har I allerede Copilot?</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Adgang er ikke det samme som{" "}
                <span className="text-primary">brug</span>.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {problemCards.map((card, i) => (
              <FadeIn key={card.quote} delay={i * 80}>
                <div className="h-full bg-white rounded-[20px] border border-gray-200 p-8">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 leading-snug">
                    {card.quote}
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mt-3">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 · SÅDAN VIRKER DET ══════════ */}
      <section id="curriculum" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Sådan virker det</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Korte lektioner.{" "}
                <span className="text-primary">Deres egne opgaver.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {howSteps.map((step, i) => (
              <FadeIn key={step.nr} delay={i * 80}>
                <div className="h-full rounded-[20px] border border-gray-200 p-7">
                  <span className="text-[13px] font-bold tracking-[0.18em] uppercase text-primary">
                    {step.nr} · {step.title}
                  </span>
                  <p className="text-[16px] text-gray-600 leading-relaxed mt-3">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={120}>
            <div className="mt-12">
              <Image
                src="/ai-minds.jpg"
                alt="AI-Minds platformen: Copilot i praksis, AI-agent builder, guides & templates, Q&As og PRO-pakken med 1:1 sparring"
                width={720}
                height={383}
                className="w-full max-w-4xl mx-auto rounded-[24px] shadow-[0_34px_64px_-26px_rgba(0,0,0,.35)] ring-1 ring-gray-200"
              />
            </div>
          </FadeIn>

          <FadeIn>
            <p className="mt-12 max-w-3xl mx-auto text-center text-lg text-gray-600 leading-relaxed">
              Copilot-forløbet dækker Outlook, Word, Excel, PowerPoint og Teams
              - og fortsætter til research, analyse og egne AI-agenter.{" "}
              <strong className="text-gray-900 font-semibold">
                Med i prisen:
              </strong>{" "}
              forløb i Claude, ChatGPT, AI-grundlæggende og AI-sikkerhed + live
              Q&A, templates og community.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 04 · TIL LEDELSEN ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Til ledelsen</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
              I skal ikke selv drive{" "}
              <span className="text-primary">AI-uddannelsen</span>.
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 leading-relaxed">
              I skal ikke bygge kurser, følge Microsoft-opdateringer eller
              svare på spørgsmål. Det gør vi - gennem lektionerne, live Q&A og
              community.
            </p>
            <p className="text-lg lg:text-xl font-semibold text-gray-900 mt-6">
              I giver medarbejderne adgang. Resten står vi for.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 05 · PRIS ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Prisen</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
              Én pris pr. medarbejder.{" "}
              <span className="text-primary">Ingen lang binding.</span>
            </h2>

            <div className="mt-12 mx-auto max-w-sm rounded-[24px] border border-gray-200 bg-white p-10 shadow-[0_30px_60px_-40px_rgba(0,0,0,.25)]">
              <p className="text-5xl font-bold tracking-tight text-gray-900">
                249 kr.
              </p>
              <p className="text-[15px] text-gray-500 mt-2">
                pr. medarbejder/måned
              </p>
              <p className="text-[15px] text-gray-600 mt-5 pt-5 border-t border-gray-100">
                Ingen binding - løbende måned + 1 måned, så I kan opsige, når
                det passer jer.
              </p>
              <div className="mt-7">
                <Button variant="primary" size="lg" cal>
                  Få en 30 min. demo
                </Button>
              </div>
            </div>

            <p className="text-[16px] text-gray-500 mt-8">
              Start med at prøve det - fortsæt, hvis det skaber værdi.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 06 · BEVIS ══════════ */}
      <section className="bg-gray-50 py-[clamp(3.5rem,8vw,5.5rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              <span className="text-primary">25+ virksomheder</span> er i gang.
            </h2>
            <p className="text-lg text-gray-600 mt-5 leading-relaxed">
              De bruger AI-Minds til at give medarbejderne en enkel måde at
              lære Copilot på - uden lange kurser og uden selv at skulle bygge
              en intern AI-uddannelse.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 07 · FAQ ══════════ */}
      <section id="faq" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div>
              <Eyebrow>Spørgsmål?</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Det vil I sikkert{" "}
                <span className="text-primary">gerne vide.</span>
              </h2>
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

      {/* ══════════ 08 · AFSLUTTENDE CTA ══════════ */}
      <section id="kontakt" className="pb-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[32px] bg-gray-900 px-8 py-14 lg:px-20 lg:py-20 text-center">
              <div
                className="pointer-events-none absolute -top-[300px] -right-[180px] w-[700px] h-[700px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,154,0,.16) 0%, transparent 62%)",
                }}
                aria-hidden="true"
              />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-white leading-[1.08] text-balance">
                  Copilot er købt.{" "}
                  <span className="text-primary">Nu skal den bruges.</span>
                </h2>
                <p className="text-[18px] leading-relaxed text-gray-400 mt-6">
                  Korte lektioner. Rigtige opgaver. Løbende opdateringer. Og en
                  platform, I ikke selv skal drive.{" "}
                  <strong className="text-white font-semibold">
                    Allerede i brug hos 25+ virksomheder.
                  </strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9 justify-center">
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
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
