import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import { Icon } from "@/components/sections/skraeddersyede/icons";
import SkraeddersyedeFaq from "@/components/sections/skraeddersyede/SkraeddersyedeFaq";
import "./ai-landing.css";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Skræddersyede AI-løsninger",
  serviceType: "AI Consulting & Development",
  description:
    "Skræddersyede AI-løsninger til danske SMV'er. Custom AI bygget og integreret med jeres CRM, ERP og eksisterende systemer.",
  provider: { "@id": "https://ai-konsulenterne.dk/#organization" },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: "https://ai-konsulenterne.dk/skraeddersyede-ai",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    description: "Skræddersyet AI-løsning, typisk 50.000-250.000 kr",
  },
};

export const metadata: Metadata = {
  title: "Skræddersyede AI-løsninger til SMV'er | Custom AI Udvikling",
  description:
    "Vi bygger AI, der passer ind i jeres forretning - forankret i jeres udfordringer, systemer og måde at arbejde på. Platformsuafhængig rådgivning. Gratis AI-afklaring.",
  alternates: { canonical: "/skraeddersyede-ai" },
  keywords: [
    "skræddersyede AI-løsninger",
    "custom AI løsning",
    "AI udvikling virksomhed",
    "AI til SMV",
    "AI integration CRM",
    "AI implementering Danmark",
  ],
  openGraph: {
    title: "Skræddersyede AI-løsninger til SMV'er",
    description:
      "Custom AI til danske SMV'er - integreret med jeres systemer. Gratis AI-afklaring.",
    url: "/skraeddersyede-ai",
  },
};

const PROOF_LOGOS: {
  name: string;
  logo: string;
  w: number;
  h: number;
  light?: boolean;
}[] = [
  { name: "Lavazza", logo: "/logos/lavazza.png", w: 140, h: 88 },
  { name: "Indkom", logo: "/logos/indkom.png", w: 200, h: 38, light: true },
  { name: "Stretchfit", logo: "/logos/stretchfit.png", w: 150, h: 45 },
  { name: "J.M Band", logo: "/logos/jmband.png", w: 120, h: 59 },
  { name: "Fregat", logo: "/logos/fregat.png", w: 400, h: 112 },
];

const STEPS = [
  {
    n: "01",
    h: "Vi finder ud af, hvor skoen trykker",
    p: "Vi starter med forretningen, ikke teknologien. Vi kigger på, hvordan I arbejder i dag, og hvor der bliver brugt tid på det forkerte.",
    gain: "et klart billede af, hvor det giver mest mening at gå i gang.",
  },
  {
    n: "02",
    h: "Vi lægger en plan",
    p: "Så finder vi ud af, hvad der skal bygges, hvordan det skal spille sammen med jeres systemer, og at jeres data er i sikre hænder. Intet overlades til tilfældighederne.",
    gain: "en klar plan for, hvad vi bygger, og hvordan.",
  },
  {
    n: "03",
    h: "Vi bygger og får det i gang",
    p: "Vi bygger løsningen i korte spring og får den hurtigt i brug, så I kan mærke forskellen tidligt - i stedet for at vente på et stort projekt, der aldrig bliver helt færdigt.",
    gain: "en AI-løsning, der kører i jeres hverdag.",
  },
  {
    n: "04",
    h: "Vi ser, hvad der virker",
    p: "Når jeres folk begynder at bruge den, ser vi sammen på, hvad der rammer plet, og hvad der skal justeres. Vi retter til undervejs.",
    gain: "en løsning, der bliver bedre, jo længere I har den.",
  },
  {
    n: "05",
    h: "Vi sørger for, at det bliver hos jer",
    p: "Når løsningen kører og gør en forskel, hjælper vi med at få den helt ind i hverdagen - så det ikke står og falder med én person, men bliver en del af måden, I arbejder på.",
    gain: "en løsning, jeres egen organisation kan stå på selv.",
  },
];

const WHY = [
  {
    ic: "message",
    h: "25+ års erfaring med AI.",
    p: "Med over 25 års erfaring med AI ved vi godt, hvordan man skal arbejde, udvikle, implementere og drifte AI.",
  },
  {
    ic: "lock",
    h: "Jeres data bliver hos jer.",
    p: "Vi bygger inden for jeres egne rammer - det ryger ikke ud i et åbent AI-system.",
  },
  {
    ic: "users",
    h: "Ingen teknisk jargon.",
    p: "Vi gør en dyd ud af at gøre AI så håndgribeligt som muligt, derfor minimerer vi også brugen af teknisk jargon - så det bliver i øjenhøjde.",
  },
];

export default function SkraeddersyedeAI() {
  return (
    <div className="aik-ai">
      <JsonLd data={serviceSchema} />

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <FadeIn>
            <div className="hero-copy">
              <p className="eyebrow">AI-konsulenterne</p>
              <h1 className="display hero-title">
                AI løsninger der passer ind i{" "}
                <span className="accent">jeres forretning.</span>
              </h1>
              <p className="lead hero-lead">
                Vi bygger AI, der passer til jer, ikke bare en standardløsning.
                Vi tager udgangspunkt i jeres udfordringer, jeres systemer og
                jeres måde at arbejde på.
              </p>
              <div className="hero-cta">
                <Button variant="primary" size="lg" cal>
                  Tag en snak med os
                </Button>
                <a href="#cases" className="btn btn-ghost btn-lg">
                  Se vores cases
                </a>
              </div>
              <p className="hero-micro">
                <Icon name="phone" /> Vi ringer én gang - ikke en sælgerkæde.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="hero-visual">
              <div className="appwin">
                <div className="appwin-bar">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <div className="appwin-url">ai-konsulenterne.dk</div>
                </div>
                <div className="appwin-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/screenshots/skraeddersyede-dashboard.png"
                    alt="Et AI-system bygget til en virksomhed - forankret i deres egne data og systemer"
                    width={2632}
                    height={1616}
                    draggable={false}
                  />
                </div>
              </div>
              <div className="hero-quote-card">
                <Icon name="shield-check" size={22} className="qmark" />
                <p>
                  Forankret i jeres forretningslogik
                  <span className="qrole">Koblet til jeres egne systemer</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problemet ── */}
      <section className="section problem-section">
        <div className="container">
          <FadeIn>
            <div className="problem-wrap">
              <h2 className="h2">
                Det er ikke teknologien, der{" "}
                <span className="accent">dræber AI-projekter</span>
              </h2>
              <p className="problem-body">
                Der bliver brugt milliarder på AI, og alligevel viste MIT i 2025,
                at 95% af projekterne ikke gav noget målbart resultat igen. Det er
                sjældent teknologien, den er gal med. Studiet viser, at det oftest
                skyldes en manglende plan, data, der aldrig blev klargjort, og mål,
                der aldrig blev sat.{" "}
                <strong>Det er præcis dér, vi kommer ind i billedet.</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Tilgang ── */}
      <section className="section" id="tilgang">
        <div className="container approach-grid">
          <FadeIn>
            <div className="approach-copy">
              <p className="eyebrow">Vores tilgang</p>
              <h2 className="h2">Mål to gange og sav én gang</h2>
              <p className="lead">
                Vi bruger tiden på at forstå jeres forretning, før vi bygger. Vi
                afdækker hvordan I arbejder, hvor skoen trykker, og hvor AI kan
                gøre den største forskel. Det er den del, de fleste springer over,
                og derfor ender så mange projekter med en løsning, ingen rigtig
                bruger. Vi vil hellere bruge en uge ekstra på at forstå end et
                halvt år på at bygge det forkerte.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <aside className="slogan-panel">
              <div className="sp-glow" aria-hidden="true" />
              <p className="sp-label">AI Konsulenterne</p>
              <p className="sp-quote">
                &apos;ai i <span className="accent">øjenhøjde&apos;</span>
              </p>
              <p className="sp-foot">
                Løsninger bliver bedst, når vi forstår hinanden. Derfor forsøger
                vi altid at gøre AI så lavpraktisk og jordnært som muligt.
              </p>
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* ── Bevis (cases) ── */}
      <section className="section proof-section" id="cases">
        <div className="container">
          <FadeIn>
            <div className="proof-head">
              <p className="eyebrow">Stol på vores kunder</p>
              <h2 className="h2">Vi har bygget til</h2>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="proof-logos">
              {PROOF_LOGOS.map((c) => (
                <Image
                  key={c.name}
                  src={c.logo}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  className={`proof-logo-img${c.light ? " is-light" : ""}`}
                />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <figure className="proof-quote">
              <Icon name="quote" size={36} className="qmark" />
              <blockquote>
                Vi er rigtig glade for både samarbejdet og den løsning vi er endt
                ud med. Jeres AI-assistent anbefaler produkter fra vores webshop,
                og det fungerer virkelig godt.
              </blockquote>
              <figcaption className="proof-author">
                <Image
                  src="/workshop-hero.webp"
                  alt="Alexander fra AI Konsulenterne og Claus Damsgaard, INDKOM"
                  width={120}
                  height={120}
                  className="proof-author-img"
                />
                <span className="proof-author-name">
                  Claus Damsgaard · Direktør, INDKOM ApS
                </span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* ── Proces ── */}
      <section className="section process-section" id="proces">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Sådan arbejder vi</p>
              <h2 className="h2">Trin for trin - hånd i hånd</h2>
            </div>
          </FadeIn>
          <div className="ptl">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 70}>
                <div className={"pstep" + (i % 2 ? " right" : "")}>
                  <div className="pnode">{s.n}</div>
                  <article className="pcard">
                    <h3 className="pc-h">{s.h}</h3>
                    <p>{s.p}</p>
                    <span className="pc-gain">
                      <Icon name="check" />{" "}
                      <span>
                        <b>I får:</b> {s.gain}
                      </span>
                    </span>
                  </article>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hvorfor os ── */}
      <section className="section" id="hvorfor">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Hvorfor os</p>
              <h2 className="h2">Vi vil være dem I ringer til</h2>
            </div>
          </FadeIn>
          <div className="why-grid">
            {WHY.map((c, i) => (
              <FadeIn key={c.h} delay={i * 90}>
                <article className="card why-card">
                  <div className="icon-tile">
                    <Icon name={c.ic} />
                  </div>
                  <h3 className="h3">{c.h}</h3>
                  <p>{c.p}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section" id="faq">
        <div className="container faq-container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2 className="h2">Hvad spørger vores kunder om?</h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <SkraeddersyedeFaq />
          </FadeIn>
        </div>
      </section>

      {/* ── Afsluttende CTA ── */}
      <section className="section final-section" id="kontakt">
        <div className="container">
          <FadeIn>
            <div className="final-card">
              <div className="final-glow" aria-hidden="true" />
              <p className="eyebrow">Næste skridt</p>
              <h2 className="h2 final-title">Skal vi tage en snak?</h2>
              <p className="final-lead">
                Ring til Alexander på +45 25 54 70 74, eller skriv til os. Vi
                finder ud af, hvor I står, og giver jer et konkret bud på næste
                skridt - og siger ærligt, om vi er de rette til opgaven.
              </p>
              <div className="final-cta">
                <Button variant="primary" size="lg" cal>
                  Tag en snak med os
                </Button>
                <div className="final-phone">
                  <Image
                    src="/alexander.png"
                    alt="Alexander, AI Konsulenterne"
                    width={58}
                    height={58}
                    className="fp-av"
                  />
                  <span className="fp-text">
                    <span className="fp-label">Snak med et menneske</span>
                    <a href="tel:+4525547074" className="fp-num">
                      <Icon name="phone" /> +45 25 54 70 74
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
