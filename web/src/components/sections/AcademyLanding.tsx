import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const SKOOL_URL = "https://www.skool.com/aik-academy-9764";

// Knap-klasser til eksterne <a>-links (matcher Button-komponenten)
const ghostBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 border-[1.5px] border-gray-300 text-gray-900 hover:border-gray-900 px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";
const lightBtn =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-white text-gray-900 hover:bg-gray-100 px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base";

const ArrowRight = () => (
  <svg
    className="w-[18px] h-[18px]"
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

// ── Ikoner ────────────────────────────────────────────────
const NetworkIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <line x1="6.7" y1="7" x2="10" y2="11" />
    <line x1="17.3" y1="7" x2="14" y2="11" />
    <line x1="6.7" y1="17" x2="10" y2="13" />
    <line x1="17.3" y1="17" x2="14" y2="13" />
  </svg>
);

const ChatIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <circle cx="9.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const SparkleIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a3 3 0 0 1 2.6 1.5 3 3 0 0 1 3.9 3.9A3 3 0 0 1 21 12a3 3 0 0 1-2.5 2.6 3 3 0 0 1-3.9 3.9A3 3 0 0 1 12 21a3 3 0 0 1-2.6-1.5 3 3 0 0 1-3.9-3.9A3 3 0 0 1 3 12a3 3 0 0 1 2.5-2.6 3 3 0 0 1 3.9-3.9A3 3 0 0 1 12 3z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
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

const values = [
  {
    title: "På dansk",
    description:
      "Hele platformen, alle videoer og alt materiale er på dansk - bygget til den måde, danske virksomheder arbejder på.",
    iconPath:
      "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802",
  },
  {
    title: "Konkret, ikke abstrakt",
    description:
      "Hver video viser en konkret use case live på skærmen. Ingen slides om “AI’s potentiale”.",
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Bygget til hverdagen",
    description:
      "Videoer på 3-7 minutter. Folk ser dem i kaffepausen og bruger dem samme dag.",
    iconPath: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Levende community",
    description:
      "Månedlig live Q&A og et forum, hvor I får svar inden for 24 timer.",
    iconPath:
      "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Rollebaserede moduler",
    description:
      "Find moduler der passer til din specifikke arbejdssituation, så du får undervisning i at bruge AI som fx sælger, marketingchef osv.",
    iconPath:
      "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
  },
  {
    title: "Værktøjer til hver lektion",
    description:
      "Prompt-ark, Excel-skabeloner og tjeklister. Materialet bliver brugt længe efter, videoen er set.",
    iconPath:
      "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  },
];

const checklist = [
  "Adgang til alle moduler og alle fremtidige opdateringer",
  "Månedlig live Q&A - stil spørgsmål direkte til AIK-teamet",
  "Prompt-bibliotek, der opdateres løbende",
  "Et forum med andre danske virksomheder, der bruger AI",
  "Nye moduler hver måned - også når AI-landskabet rykker",
];

const faqs = [
  {
    q: "Hvad koster det?",
    a: "Fra 249 kr. pr. medarbejder om måneden. I får et samlet ark med priser, I kan tage med til resten af ledelsen.",
  },
  {
    q: "Hvor meget af mine folks tid tager det?",
    a: "Videoer på 3-7 minutter, set i deres eget tempo. De øver på opgaver, de alligevel sidder med - så det koster ikke en hel arbejdsdag.",
  },
  {
    q: "Er vi bundet til noget?",
    a: "I kan opsige når som helst.",
  },
  {
    q: "Bruger de det overhovedet bagefter?",
    a: "Det er præcis derfor, det er korte videoer med rigtige opgaver og en månedlig Q&A - i stedet for ét langt kursus, der er glemt ugen efter.",
  },
];

// ── Course-cover komponent ────────────────────────────────
function CourseCover({
  variant,
  word,
  glyph,
  motif,
  logo,
  logoAlt,
}: {
  variant: "dark" | "soft" | "tint";
  word?: string;
  glyph?: React.ReactNode;
  motif: React.ReactNode;
  logo?: string;
  logoAlt?: string;
}) {
  const bg =
    variant === "dark"
      ? "bg-gray-900"
      : variant === "soft"
        ? "bg-[#f1ede8]"
        : "bg-gradient-to-br from-[#2a2521] to-[#1a1714]";
  const wordColor = variant === "soft" ? "text-gray-900" : "text-white";
  return (
    <div
      className={`relative h-[180px] overflow-hidden border-b border-gray-200 ${bg}`}
    >
      {motif}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {logo ? (
          <div className="relative z-[2] w-[74%] max-w-[230px] h-[84px] bg-white rounded-2xl px-6 py-4 shadow-[0_14px_30px_-12px_rgba(0,0,0,.30)] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={logoAlt ?? ""}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <>
            {glyph}
            <span
              className={`text-[22px] font-bold tracking-tight leading-none text-center ${wordColor}`}
            >
              {word}
              <span className="block w-10 h-[3px] bg-primary rounded-sm mx-auto mt-2.5" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function CourseCard({
  badge,
  tag,
  title,
  desc,
  cover,
}: {
  badge?: string;
  tag: string;
  title: string;
  desc: string;
  cover: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-[22px] border border-gray-200 overflow-hidden transition-all duration-200 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        {badge && (
          <span className="absolute top-4 left-4 z-10 text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full bg-primary text-white shadow-md">
            {badge}
          </span>
        )}
        {cover}
      </div>
      <div className="flex flex-col flex-1 p-7 pb-8">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">
          {tag}
        </span>
        <h3 className="text-[23px] font-bold tracking-tight text-gray-900 mt-3">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-500 mt-2.5">
          {desc}
        </p>
      </div>
    </div>
  );
}

const glyphTile = (variant: "orange" | "dark", icon: React.ReactNode) => (
  <span
    className={`w-14 h-14 rounded-[15px] flex items-center justify-center text-white ${
      variant === "orange" ? "bg-primary" : "bg-gray-900"
    }`}
  >
    {icon}
  </span>
);

export default function AcademyLanding() {
  return (
    <>
      {/* ══════════ HERO ══════════ */}
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
                <Eyebrow>AIK Academy</Eyebrow>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.04] mt-4 text-balance">
                  I betaler allerede for AI licenser,{" "}
                  <span className="text-primary">
                    nu skal jeres medarbejdere også bruge dem
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed max-w-xl">
                  Et online læringsunivers, hvor jeres medarbejdere lærer at
                  bruge AI til deres faktiske arbejde - på dansk og i øjenhøjde.
                  Ingen teknisk jargon, ingen 40-timers lange kurser. Bare korte
                  og konkrete videoer, specifikke use cases og et community, der
                  hjælper hinanden.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9">
                  <Button variant="primary" size="lg" cal>
                    Book en snak
                    <ArrowRight />
                  </Button>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ghostBtn}
                  >
                    Se Academy
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Floating course cards */}
            <FadeIn delay={200}>
              <div
                className="relative hidden lg:block min-h-[500px]"
                aria-hidden="true"
              >
                <div
                  className="pointer-events-none absolute -inset-10"
                  style={{
                    background:
                      "radial-gradient(circle at 66% 34%, rgba(255,154,0,.18), transparent 58%)",
                  }}
                />
                <div className="absolute -top-2 right-8 z-[4] flex items-center gap-2 bg-primary text-white text-[13px] font-bold tracking-wide px-[18px] py-[11px] rounded-full shadow-[0_18px_32px_-10px_rgba(255,154,0,.55)]">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  4 moduler
                </div>

                <div className="absolute top-[18px] left-1.5 z-[2] w-[322px] flex items-center gap-4 bg-white border border-gray-200 rounded-[20px] p-5 shadow-[0_34px_64px_-26px_rgba(0,0,0,.32)] rotate-[-4deg] hover:rotate-0 hover:-translate-y-1 hover:z-[5] transition-transform duration-300">
                  {glyphTile("orange", <NetworkIcon className="w-6 h-6" />)}
                  <span>
                    <span className="block text-[17px] font-bold tracking-tight text-gray-900">
                      AI Grundlæggende
                    </span>
                    <span className="block text-[13px] text-gray-500 mt-0.5">
                      Fundamentet - uden jargon
                    </span>
                  </span>
                </div>

                <div className="absolute top-[176px] right-0 z-[3] w-[322px] flex items-center gap-4 bg-white border border-gray-200 rounded-[20px] p-5 shadow-[0_34px_64px_-26px_rgba(0,0,0,.32)] rotate-[3deg] hover:rotate-0 hover:-translate-y-1 hover:z-[5] transition-transform duration-300">
                  {glyphTile("dark", <ChatIcon className="w-6 h-6" />)}
                  <span>
                    <span className="block text-[17px] font-bold tracking-tight text-gray-900">
                      Copilot
                    </span>
                    <span className="block text-[13px] text-gray-500 mt-0.5">
                      Fra agenter til daglige værktøjer
                    </span>
                  </span>
                </div>

                <div className="absolute top-[332px] left-6 z-[2] w-[322px] flex items-center gap-4 bg-white border border-gray-200 rounded-[20px] p-5 shadow-[0_34px_64px_-26px_rgba(0,0,0,.32)] rotate-[-2deg] hover:rotate-0 hover:-translate-y-1 hover:z-[5] transition-transform duration-300">
                  {glyphTile("dark", <SparkleIcon className="w-6 h-6" />)}
                  <span>
                    <span className="block text-[17px] font-bold tracking-tight text-gray-900">
                      ChatGPT &amp; Claude
                    </span>
                    <span className="block text-[13px] text-gray-500 mt-0.5">
                      Fra nybegynder til ekspert
                    </span>
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════ PAIN ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <Eyebrow>Lyder det bekendt?</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
              I har købt licenserne.{" "}
              <span className="text-primary">Men hvem bruger dem?</span>
            </h2>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              I har købt licenser. I har gjort opmærksom på at de eksisterer.
              Men ingen bruger dem? Ikke fordi folk er dovne - men fordi ingen
              har vist dem hvordan de gør.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ CURRICULUM ══════════ */}
      <section id="curriculum" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-10 flex-wrap">
              <div className="max-w-2xl">
                <Eyebrow>Det lærer jeres team</Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] mt-4">
                  Moduler der er bygget til en{" "}
                  <span className="text-primary">travl hverdag</span>.
                </h2>
              </div>
              <p className="text-[17px] text-gray-600 max-w-[380px]">
                Start med Grundlæggende AI - eller dyk direkte ned i det værktøj,
                jeres folk bruger til dagligt.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            <FadeIn>
              <CourseCard
                badge="Start her"
                tag="Fundament"
                title="Grundlæggende AI"
                desc="Forstå hvordan AI fungerer, og hvad man kan bruge det til."
                cover={
                  <CourseCover
                    variant="dark"
                    word="AI Grundlæggende"
                    glyph={glyphTile("orange", <NetworkIcon />)}
                    motif={
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 320 180"
                        preserveAspectRatio="xMidYMid slice"
                        fill="none"
                        aria-hidden="true"
                      >
                        <g stroke="#ff9a00" strokeWidth="1" opacity="0.30">
                          <line x1="60" y1="40" x2="160" y2="90" />
                          <line x1="260" y1="40" x2="160" y2="90" />
                          <line x1="60" y1="140" x2="160" y2="90" />
                          <line x1="260" y1="140" x2="160" y2="90" />
                          <line x1="60" y1="40" x2="60" y2="140" />
                          <line x1="260" y1="40" x2="260" y2="140" />
                        </g>
                        <g fill="#ff9a00" opacity="0.5">
                          <circle cx="60" cy="40" r="4" />
                          <circle cx="260" cy="40" r="4" />
                          <circle cx="60" cy="140" r="4" />
                          <circle cx="260" cy="140" r="4" />
                        </g>
                      </svg>
                    }
                  />
                }
              />
            </FadeIn>

            <FadeIn delay={80}>
              <CourseCard
                tag="Værktøj"
                title="Microsoft Copilot"
                desc="Outlook, Teams, Word, Excel og PowerPoint. Konkrete use cases, jeres medarbejdere kan bruge mandag morgen."
                cover={
                  <CourseCover
                    variant="soft"
                    logo="/logos/integrations/copilot.svg"
                    logoAlt="Microsoft Copilot"
                    motif={
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 320 180"
                        preserveAspectRatio="xMidYMid slice"
                        fill="none"
                        aria-hidden="true"
                      >
                        <g fill="#ff9a00" opacity="0.14">
                          {[40, 80, 120, 200, 240, 280].map((x) => (
                            <circle key={`t${x}`} cx={x} cy="30" r="3" />
                          ))}
                          {[40, 80, 120, 200, 240, 280].map((x) => (
                            <circle key={`b${x}`} cx={x} cy="150" r="3" />
                          ))}
                        </g>
                      </svg>
                    }
                  />
                }
              />
            </FadeIn>

            <FadeIn delay={160}>
              <CourseCard
                tag="Værktøj · OpenAI"
                title="ChatGPT"
                desc="Forstå at bruge og få optimalt udbytte af ChatGPT - hvad den er særligt god til, og hvilke begrænsninger den har."
                cover={
                  <CourseCover
                    variant="dark"
                    logo="/logos/integrations/chatgpt.svg"
                    logoAlt="ChatGPT"
                    motif={
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 320 180"
                        preserveAspectRatio="xMidYMid slice"
                        fill="none"
                        aria-hidden="true"
                      >
                        <g stroke="#ff9a00" opacity="0.22" fill="none">
                          <circle cx="160" cy="90" r="30" />
                          <circle cx="160" cy="90" r="55" />
                          <circle cx="160" cy="90" r="80" />
                        </g>
                      </svg>
                    }
                  />
                }
              />
            </FadeIn>

            <FadeIn delay={80}>
              <CourseCard
                tag="Værktøj · Anthropic"
                title="Claude"
                desc="Lær at bruge en af de stærkeste modeller til kode, design og andre spændende ting."
                cover={
                  <CourseCover
                    variant="tint"
                    logo="/logos/integrations/claude.svg"
                    logoAlt="Claude"
                    motif={
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 320 180"
                        preserveAspectRatio="xMidYMid slice"
                        fill="none"
                        aria-hidden="true"
                      >
                        <g stroke="#ff9a00" strokeWidth="1" opacity="0.28">
                          <line x1="160" y1="20" x2="160" y2="160" />
                          <line x1="90" y1="90" x2="230" y2="90" />
                          <line x1="110" y1="40" x2="210" y2="140" />
                          <line x1="210" y1="40" x2="110" y2="140" />
                        </g>
                        <circle cx="160" cy="90" r="6" fill="#ff9a00" opacity="0.4" />
                      </svg>
                    }
                  />
                }
              />
            </FadeIn>

            {/* Coming soon */}
            <FadeIn delay={160}>
              <div className="flex flex-col items-center justify-center text-center gap-3.5 h-full rounded-[22px] border border-dashed border-gray-300 bg-gray-50 p-10">
                <span className="w-[52px] h-[52px] rounded-[14px] bg-primary/10 text-primary flex items-center justify-center">
                  <svg
                    className="w-[26px] h-[26px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                <div>
                  <div className="text-[19px] font-bold tracking-tight text-gray-900">
                    Nye moduler kommer løbende
                  </div>
                  <div className="text-[15px] text-gray-500 mt-1.5 max-w-[240px]">
                    AI-landskabet bevæger sig med lynets hast - vi sørger for at
                    holde jer opdateret.
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex items-center gap-3.5 mt-7 text-[15px] text-gray-500">
            <span className="w-[7px] h-[7px] rounded-full bg-primary" />
            Usikker på hvor I skal starte? Book en snak, så finder vi det rette
            forløb sammen.
          </div>
        </div>
      </section>

      {/* ══════════ HVORFOR AIK ══════════ */}
      <section id="academy" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Hvorfor AIK Academy</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                AI-undervisning <span className="text-primary">i øjenhøjde</span>.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 70}>
                <div className="h-full rounded-[20px] border border-gray-200 p-9 transition-all duration-200 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="w-14 h-14 rounded-[14px] bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={v.iconPath}
                      />
                    </svg>
                  </span>
                  <h3 className="text-[22px] font-bold tracking-tight text-gray-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SÅDAN SER DET UD I PRAKSIS ══════════ */}
      <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl">
              <Eyebrow>Sådan ser det ud i praksis</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Det, I får <span className="text-primary">adgang til</span>.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-start mt-14">
            <ul>
              {checklist.map((item, i) => (
                <FadeIn key={item} delay={i * 60}>
                  <li className="grid grid-cols-[30px_1fr] gap-[18px] items-start py-5 border-t border-gray-200 first:border-t-0 text-[19px] leading-snug text-gray-900">
                    <span className="w-[30px] h-[30px] rounded-full bg-primary text-white flex items-center justify-center mt-0.5">
                      <Check />
                    </span>
                    {item}
                  </li>
                </FadeIn>
              ))}
            </ul>

            <FadeIn delay={120}>
              <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-11">
                <div
                  className="pointer-events-none absolute -top-[190px] -right-[130px] w-[420px] h-[420px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,154,0,.16), transparent 62%)",
                  }}
                  aria-hidden="true"
                />
                <span className="relative text-xs font-bold tracking-[0.22em] uppercase text-primary">
                  Se det selv
                </span>
                <h3 className="relative text-[26px] font-bold tracking-tight leading-snug mt-4 text-balance">
                  Det her er ikke teori - folk bruger det bagefter.
                </h3>
                <p className="relative mt-5 text-[16px] leading-relaxed text-gray-400">
                  Vi viser jer det hellere, end vi fortæller om det. Book et
                  opkald, så går vi gennem konkrete eksempler fra Academy - og
                  hvad jeres team kan få ud af det.
                </p>
                <div className="relative mt-7">
                  <Button variant="white" size="lg" cal>
                    Book en snak
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <p className="mt-10 max-w-[900px] border-l-[3px] border-primary bg-primary/10 rounded-r-2xl px-7 py-5 text-[19px] leading-snug text-gray-900 font-medium">
              I skal ikke være en stor virksomhed for at få noget ud af det - I
              skal bare have adgang til AI.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ OUTCOME ══════════ */}
      <section className="py-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-14 items-start">
              <Eyebrow>Hvad I sidder tilbage med</Eyebrow>
              <p className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.42] tracking-tight text-gray-900 font-medium text-pretty">
                AI går fra at blive brugt sporadisk til at blive anvendt{" "}
                <span className="text-primary">
                  systematisk og med et målrettet fokus
                </span>
                . Det er ikke længere noget, medarbejdere skal blive mindet om at
                bruge.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ TIL LEDELSEN ══════════ */}
      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[28px] bg-gray-900 text-white px-9 py-12 lg:px-[72px] lg:py-16 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
              <div
                className="pointer-events-none absolute -bottom-[260px] -left-[120px] w-[500px] h-[500px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,154,0,.14), transparent 62%)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <Eyebrow>Til ledelsen</Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-heading leading-[1.1] mt-3.5 text-balance">
                  I skal ikke selv være AI-eksperter.
                </h2>
              </div>
              <p className="relative text-[19px] leading-relaxed text-gray-400">
                Det er hele pointen. I skal ikke drive det, holde oplæg eller
                svare på de svære spørgsmål.{" "}
                <strong className="text-white font-semibold">
                  Vi tager jeres medarbejdere i hånden
                </strong>{" "}
                - med korte videoer, månedlig live Q&amp;A og et forum, de altid
                kan vende tilbage til.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="bg-gray-50 py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start">
          <FadeIn>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4">
                Relevant <span className="text-primary">viden.</span>
              </h2>
              <p className="text-[17px] text-gray-600 mt-5 leading-relaxed">
                Har du et spørgsmål, der ikke står her? Tag det med på opkaldet.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="border-t border-gray-200">
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

      {/* ══════════ FINAL CTA ══════════ */}
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
                <Eyebrow>Klar til at få teamet i gang?</Eyebrow>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-white leading-[1.06] mt-4 text-balance">
                  Book en <span className="text-primary">kort snak</span>.
                </h2>
                <p className="text-[19px] leading-relaxed text-gray-400 mt-5 max-w-md">
                  Vi viser jer Academy, taler om, hvad jeres team har brug for, og
                  siger ærligt, om det er den rigtige løsning for jer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9">
                  <Button variant="primary" size="lg" cal>
                    Book en snak
                    <ArrowRight />
                  </Button>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={lightBtn}
                  >
                    Se Academy
                  </a>
                </div>
              </div>

              <div className="relative bg-white rounded-[22px] p-9 shadow-[0_30px_60px_-28px_rgba(0,0,0,.5)]">
                <div className="flex items-center gap-4">
                  <span className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold shrink-0">
                    A
                  </span>
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
                    "Vi viser jer Academy live",
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
