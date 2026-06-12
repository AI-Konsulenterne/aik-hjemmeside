import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { Icon, Logo } from "@/components/sections/workspace/parts";
import {
  McpView,
  PricingCalc,
  FaqList,
} from "@/components/sections/workspace/WorkspaceInteractive";
import "./workspace.css";

export const metadata: Metadata = {
  title: "AIK Workspace - Jeres eget AI-system til hele virksomheden",
  description:
    "AIK Workspace er jeres eget AI-system. Chat, agenter, vidensbase og styring i én platform - forankret i jeres data, GDPR-sikkert og med frit valg af AI-model.",
  alternates: { canonical: "/visionai" },
  keywords: [
    "AIK Workspace",
    "AI system virksomhed",
    "privat ChatGPT",
    "GDPR AI",
    "AI agenter",
    "AI platform dansk",
  ],
  openGraph: {
    title: "AIK Workspace - Jeres eget AI-system",
    description:
      "Jeres eget AI-system til hele virksomheden. Chat, agenter, vidensbase og styring i én platform - forankret i jeres data.",
    url: "/visionai",
  },
};

const HERO_CHIPS: [string, string][] = [
  ["users", "400+ daglige brugere"],
  ["shield-check", "GDPR-compliant"],
  ["flag", "Data i EU"],
  ["zap", "Hurtig opsætning"],
];

const BENTO_MODELS: [string, string, string][] = [
  ["claude", "Claude Opus 4.8", "anthropic/claude-opus-4-8"],
  ["chatgpt", "ChatGPT 5.5", "openai/gpt-5.5"],
  ["gemini", "Gemini 3.1 Pro", "google/gemini-3.1-pro"],
  ["gemini", "Nano Banana", "google/gemini-2.5-flash-image"],
  ["azure", "Azure OpenAI", "azure/gpt-5.5"],
];

const BENTO_FEATURES: [string, string, string][] = [
  [
    "message",
    "Chat med jeres agenter",
    "Få jeres agenter til at arbejde sammen om at løse en opgave.",
  ],
  [
    "files",
    "Vidensbase og dokumenter",
    "I Workspace kan I samle jeres dokumenter og vidensartikler ét sted og finde den information, I skal bruge, på få sekunder.",
  ],
];

const USAGE_MODELS: [string, string][] = [
  ["ChatGPT", "#10A37F"],
  ["Claude", "#D97757"],
  ["Gemini", "#8B5CF6"],
  ["Azure", "#2086D8"],
];
const USAGE: [string, string, string, number, number[]][] = [
  ["Marketing", "2,00 mio.", "312 kr", 100, [42, 30, 18, 10]],
  ["Salg & Kundeservice", "1,45 mio.", "226 kr", 73, [30, 45, 15, 10]],
  ["IT & Support", "1,18 mio.", "184 kr", 59, [24, 28, 20, 28]],
  ["HR & Onboarding", "0,98 mio.", "153 kr", 49, [35, 42, 13, 10]],
  ["Juridisk & Compliance", "0,64 mio.", "100 kr", 32, [18, 56, 16, 10]],
];

const SECURITY: [string, string, string][] = [
  ["flag", "Data i EU", "Fuld GDPR-compliance og europæisk hosting."],
  [
    "shield",
    "Datasuverænitet",
    "Jeres data bliver i Microsoft Azure (EU) og deles aldrig med OpenAI, Anthropic eller andre.",
  ],
  [
    "sliders",
    "Kildestyring",
    "I vælger præcist hvilke sites, biblioteker og postkasser der indekseres.",
  ],
  [
    "quote",
    "Kildehenvisning",
    "Alle svar ledsages af en kildehenvisning, så I altid kan verificere svaret.",
  ],
];

const DEPTS: [string, string, string][] = [
  ["users", "HR & Onboarding", "Onboarding, politikker og HR-svar på sekunder."],
  ["message", "Salg & Kundeservice", "Produkter, kontrakter og kundehistorik ét sted."],
  ["scale", "Juridisk & Compliance", "Søg i kontrakter, politikker og regler."],
  ["wrench", "IT & Support", "Selvbetjening til teknisk support og dokumentation."],
  [
    "megaphone",
    "Marketing & Kommunikation",
    "Genbrug indhold og skab konsistent kommunikation.",
  ],
];

export default function VisionAI() {
  return (
    <div className="aik-ws">
      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <FadeIn>
          <div className="container hero-center">
            <p className="eyebrow">AIK Workspace · jeres eget AI-system</p>
            <h1 className="display hero-title">
              AI-platformen der <span className="accent">samler det hele</span>
            </h1>
            <p className="lead hero-lead">
              AIK Workspace er jeres AI-system til hele virksomheden - forankret i
              jeres egen data, systemer og forretningslogik.
            </p>
            <div className="hero-cta">
              <Button variant="primary" size="lg" cal>
                Book en demo
                <Icon name="arrow-right" size={18} />
              </Button>
              <a href="#platform" className="btn btn-ghost btn-lg">
                Se platformen
              </a>
            </div>
            <div className="hero-chips">
              {HERO_CHIPS.map(([ic, t]) => (
                <span className="chip" key={t}>
                  <Icon name={ic} /> {t}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="container hero-shot-wrap">
            <div className="hero-shot">
              <div className="appwin">
                <div className="appwin-bar">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <div className="appwin-url">workspace.ai-konsulenterne.dk</div>
                </div>
                <div className="appwin-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/screenshots/workspace-dashboard.png"
                    alt="AIK Workspace dashboard"
                    width={2632}
                    height={1616}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Platform bento ── */}
      <section className="section bento-section" id="platform">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">AIK Workspace</p>
              <h2 className="h2">Alt jeres AI - samlet ét sted</h2>
              <p className="lead">
                Chat, agenter, vidensbase og styring i én sammenhængende platform
                - bygget til jeres virksomhed.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bento">
              <div className="bento-tile bento-lg">
                <div className="bento-copy">
                  <h3 className="h3">Byg jeres egne agenter</h3>
                  <p>
                    Byg dedikerede AI-agenter til salg, marketing, data osv. - hver
                    med sin egen viden og sin egen rolle. De kender jeres
                    forretning og er bygget til de opgaver, I sidder med.
                  </p>
                </div>
                <div className="bento-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/screenshots/workspace-agenter.png"
                    alt="Agenter i AIK Workspace"
                    width={2626}
                    height={1232}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="bento-tile bento-tall">
                <div className="bento-copy">
                  <h3 className="h3">Vælg den model, der passer bedst</h3>
                  <p>
                    Vælg frit mellem ChatGPT, Claude, Gemini og Azure OpenAI, og
                    bestem selv, hvem der må bruge hvad.
                  </p>
                </div>
                <div className="bento-models">
                  <div className="bento-models-head">
                    <span>Standardmodeller</span>
                    <span className="bento-models-add">
                      <Icon name="plus" size={13} /> Tilføj
                    </span>
                  </div>
                  {BENTO_MODELS.map(([lg, nm, base]) => (
                    <div className="bento-model" key={nm}>
                      <span className="bento-model-logo">
                        <Logo name={lg} size={18} />
                      </span>
                      <span className="bento-model-info">
                        <span className="bento-model-name">{nm}</span>
                        <span className="bento-model-base">{base}</span>
                      </span>
                      <span className="dot-live" />
                    </div>
                  ))}
                </div>
              </div>

              {BENTO_FEATURES.map(([ic, t, d]) => (
                <div className="bento-tile bento-sm" key={t}>
                  <div className="icon-tile">
                    <Icon name={ic} />
                  </div>
                  <h3 className="h3 bento-sm-title">{t}</h3>
                  <p>{d}</p>
                </div>
              ))}

              <div className="bento-tile bento-wide">
                <div className="usage-head">
                  <div>
                    <div className="bento-sm-ic">
                      <Icon name="activity" size={20} />
                    </div>
                    <h3 className="h3 usage-title">Fuld transparens</h3>
                    <p className="usage-sub">
                      Tokenforbrug på tværs af organisationen · juni 2026
                    </p>
                  </div>
                  <div className="usage-total">
                    <span className="usage-total-tok">6,25 mio. tokens</span>
                    <span className="usage-total-cost">975 kr</span>
                  </div>
                </div>
                <div className="usage-legend">
                  {USAGE_MODELS.map(([n, c]) => (
                    <span className="usage-leg" key={n}>
                      <span
                        className="usage-leg-dot"
                        style={{ background: c }}
                      />
                      {n}
                    </span>
                  ))}
                </div>
                <div className="usage-rows">
                  {USAGE.map(([dept, tok, cost, fill, split]) => (
                    <div className="usage-row" key={dept}>
                      <span className="usage-dept">{dept}</span>
                      <span className="usage-track">
                        <span className="usage-fill" style={{ width: fill + "%" }}>
                          {split.map((s, i) => (
                            <span
                              key={i}
                              style={{ width: s + "%", background: USAGE_MODELS[i][1] }}
                            />
                          ))}
                        </span>
                      </span>
                      <span className="usage-tok">{tok}</span>
                      <span className="usage-cost">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Integrationer · MCP ── */}
      <section className="section integ-section">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Integrationer</p>
              <h2 className="h2">Integrér direkte med jeres systemer</h2>
              <p className="lead">
                AIK Workspace forbinder sig til jeres systemer, databaser og
                API&apos;er, så al jeres viden bliver nemt tilgængelig.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <McpView />
          </FadeIn>
        </div>
      </section>

      {/* ── Datasikkerhed (mørk) ── */}
      <section className="section sec-section" id="sikkerhed">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Datasikkerhed &amp; GDPR</p>
              <h2 className="h2 on-dark">
                Jeres data bliver i et sikkert miljø under jeres kontrol
              </h2>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="sec-grid">
              {SECURITY.map(([ic, t, d]) => (
                <div className="sec-card" key={t}>
                  <div className="sec-icon">
                    <Icon name={ic} size={20} />
                  </div>
                  <h3 className="h3 sec-title">{t}</h3>
                  <p className="sec-desc">{d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Afdelinger ── */}
      <section className="section dept-section" id="afdelinger">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Brugsscenarier</p>
              <h2 className="h2">
                Brug AIK Workspace på tværs af hele virksomheden
              </h2>
              <p className="lead">
                Fra HR til marketing - hver afdeling får sin egen AI-assistent,
                forankret i netop deres data og arbejdsgange.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="dept-app-frame">
              <div className="appwin">
                <div className="appwin-bar">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <div className="appwin-url">
                    workspace.ai-konsulenterne.dk/afdelinger
                  </div>
                </div>
                <div className="dept-app">
                  <div className="dept-app-head">
                    <div className="mcp-title">
                      Afdelinger
                      <span className="mcp-sub"> · agenter til hver afdeling</span>
                    </div>
                    <button className="mcp-new">
                      <Icon name="plus" size={16} /> Ny afdeling
                    </button>
                  </div>
                  <div className="dept-cards">
                    {DEPTS.map(([ic, name, desc]) => (
                      <div className="dept-app-card" key={name}>
                        <div className="dept-app-top">
                          <span className="dept-app-ic">
                            <Icon name={ic} size={22} />
                          </span>
                          <div className="dept-app-headtext">
                            <div className="dept-app-name">{name}</div>
                            <div className="dept-app-meta">
                              Claude Sonnet 4.6 · privat
                            </div>
                          </div>
                        </div>
                        <p className="dept-app-desc">{desc}</p>
                        <div className="dept-app-actions">
                          <button className="dept-act">
                            <Icon name="pencil" size={15} /> Redigér
                          </button>
                          <button className="dept-act ghost">
                            <Icon name="copy" size={15} /> Duplikér
                          </button>
                          <button className="dept-arch" aria-label="Arkivér">
                            <Icon name="archive" size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pris ── */}
      <section className="section price-section" id="priser">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Pris</p>
              <h2 className="h2">Beregn jeres pris</h2>
              <p className="lead">
                Enkel pris pr. bruger - inklusive tokens, søgninger og
                hukommelse. Træk i stregen for at se jeres pris.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <PricingCalc />
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section" id="faq">
        <div className="container faq-container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2 className="h2">Ofte stillede spørgsmål</h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <FaqList />
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section final-section" id="demo">
        <div className="container">
          <FadeIn>
            <div className="final-card">
              <div className="final-glow" aria-hidden="true" />
              <h2 className="h2 final-title">
                Klar til at transformere
                <br />
                jeres virksomhed?
              </h2>
              <p className="lead final-lead">
                Lad os vise jer, hvordan AIK Workspace kan styrke jeres
                medarbejdere og frigøre tid til det, der virkelig skaber værdi.
              </p>
              <div className="final-cta">
                <Button variant="primary" size="lg" cal>
                  Book en gratis demo
                </Button>
                <a href="tel:+4525547074" className="final-phone">
                  <Icon name="phone" size={17} /> Eller ring: +45 25 54 70 74
                </a>
              </div>
              <div className="final-chips">
                <span>Ingen binding</span>
                <span className="sep">·</span>
                <span>GDPR-compliant</span>
                <span className="sep">·</span>
                <span>Hurtig opsætning</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
