import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import { Icon } from "@/components/sections/workshop-landing/icons";
import WorkshopEmner from "@/components/sections/workshop-landing/WorkshopEmner";
import "./workshop.css";

const workshopSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Workshop for Virksomheder",
  description:
    "Hands-on AI-workshop for danske virksomheder. Lær ChatGPT, prompt engineering og praktisk brug af AI.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  courseMode: "onsite",
  educationalLevel: "Intermediate",
  inLanguage: "da",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "DK" },
    },
  },
};

export const metadata: Metadata = {
  title: { absolute: "AI workshop for virksomheder | hands-on AI-kursus" },
  description:
    "AI workshop og AI-kursus for virksomheder - bygget op om jeres egne opgaver. I går hjem med skabeloner, konkrete use cases og en plan for, hvad I gør bagefter.",
  alternates: { canonical: "/workshop" },
  keywords: [
    "AI workshop",
    "AI workshop for virksomheder",
    "AI kursus virksomhed",
    "AI kursus for virksomheder",
    "ChatGPT kursus virksomhed",
    "AI træning medarbejdere",
  ],
  openGraph: {
    title: "AI Workshop for Virksomheder — bygget til jer",
    description:
      "En AI-workshop bygget op om jeres egne opgaver. I går hjem med skabeloner, use cases og en plan.",
    url: "/workshop",
  },
};

const HOW = [
  {
    n: "01",
    h: "Jeres mål og hverdag",
    p: "Vi tager udgangspunkt i jeres opgaver, udfordringer og niveau, så det giver mening for jer fra start.",
  },
  {
    n: "02",
    h: "Undervisning med hænderne i bolledejen",
    p: "I arbejder med konkrete øvelser og skabeloner, så AI bliver noget, I faktisk kan bruge - ikke bare høre om.",
  },
  {
    n: "03",
    h: "Næste skridt",
    p: "Vi samler op og prioriterer de bedste use cases, så I ved præcis, hvad I kan gøre, når workshoppen er slut.",
  },
];

const STEPS = [
  {
    n: "1",
    h: "Kort afklaring",
    p: "60 minutter. Vi afdækker jeres behov og lægger en plan.",
  },
  {
    n: "2",
    h: "Vi tilpasser indholdet",
    p: "Vi sætter moduler og øvelser sammen, så det passer til jeres branche og mål.",
  },
  {
    n: "3",
    h: "Selve workshoppen",
    p: "Træning, øvelser og konkrete eksempler - med plads til spørgsmål undervejs.",
  },
  {
    n: "4",
    h: "Opsamling og næste skridt",
    p: "I får en kort opsamling og en plan for, hvad I gør de næste 2-4 uger.",
  },
];

export default function Workshop() {
  return (
    <div className="aik-ws-shop">
      <JsonLd data={workshopSchema} />

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <FadeIn>
            <div className="hero-copy">
              <p className="eyebrow">AI-konsulenterne</p>
              <h1 className="display hero-title">
                En AI-workshop, der passer til jer{" "}
                <span className="accent">ikke en standardpakke.</span>
              </h1>
              <p className="lead hero-lead">
                Vi kan godt lide at gøre vores arbejde så konkret som muligt, så
                vi starter med at afdække, hvor I står henne på nuværende
                tidspunkt. Derefter opbygger vi en workshop, som tager
                udgangspunkt i det, så I får mest muligt ud af workshoppen. Vi er
                eksperter i Copilot og ChatGPT, og I går hjem med skabeloner, use
                cases og en plan.
              </p>
              <div className="hero-cta">
                <Button variant="primary" size="lg" cal>
                  Book et møde
                </Button>
                <a href="#emner" className="btn btn-ghost btn-lg">
                  Se emnerne
                </a>
              </div>
              <p className="hero-micro">
                <Icon name="phone" /> En kort snak først - så finder vi ud af,
                hvad der passer til jer.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="hero-visual">
              <span className="hero-locbadge">
                <Icon name="flag" />
                Fysiske og online workshops i hele Danmark
              </span>
              <div className="ws-hero-photos">
                <div className="ws-hero-photo">
                  <Image
                    src="/workshop-1.jpg"
                    alt="AI-workshop hos kunde - oplæg foran teamet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 980px) 50vw, 24vw"
                    priority
                  />
                </div>
                <div className="ws-hero-photo">
                  <Image
                    src="/workshop-2.jpg"
                    alt="AI Konsulenterne holder workshop for en gruppe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 980px) 50vw, 24vw"
                  />
                </div>
              </div>
              <div className="hero-takeaway">
                <Icon name="files" size={22} className="ht-ic" />
                <p>
                  I går hjem med noget konkret.
                  <span className="ht-sub">Skabeloner · use cases · en plan</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Referencer ── */}
      <section
        className="section"
        style={{ paddingTop: "clamp(1.5rem, 4vw, 2.5rem)", paddingBottom: 0 }}
      >
        <div className="container">
          <FadeIn>
            <div className="ws-refs">
              <p className="eyebrow">Virksomheder vi har holdt workshop for</p>
              <div className="ws-refs-logos">
                <Image
                  src="/logos/retail-partner.png"
                  alt="Retail Partner"
                  width={324}
                  height={46}
                  className="ws-ref-logo"
                />
              </div>
              <a href="#case" className="ws-refs-link">
                Læs hvordan vi hjalp Retail Partner ↓
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Sådan gør vi ── */}
      <section className="section how-section" id="metode">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Sådan gør vi</p>
              <h2 className="h2">Bygget op om jer - men med en fast ramme.</h2>
              <p className="lead">
                Vi starter med jeres hverdag og sætter workshoppen sammen derfra
                - med hands-on træning i Microsoft Copilot, ChatGPT og Claude. I
                får et klart udbytte og noget, der kan bruges i praksis, ikke en
                pakke vi trækker ned fra hylden.
              </p>
            </div>
          </FadeIn>
          <div className="how-grid">
            {HOW.map((c, i) => (
              <FadeIn key={c.n} delay={i * 90}>
                <article className="card how-card">
                  <span className="how-num">{c.n}</span>
                  <h3 className="h3">{c.h}</h3>
                  <p>{c.p}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emner (interaktiv) ── */}
      <section className="section" id="emner">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Emner</p>
              <h2 className="h2">Typiske emner, vi kan bygge workshoppen af</h2>
              <p className="lead">
                I vælger ikke en færdig pakke - vi udvælger og vægter emnerne
                sammen med jer.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <WorkshopEmner />
          </FadeIn>
        </div>
      </section>

      {/* ── Copilot-standardpakker ── */}
      <section className="section" id="pakker">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Standardpakker</p>
              <h2 className="h2">Til jer der bare gerne vil i gang</h2>
              <p className="lead">
                Rigtig mange af vores kunder sidder med ubrugte
                Copilot-licenser. Det her er jeres chance for at systematisere
                jeres Copilot-brug, effektivisere hverdagen og skabe reel værdi
                med AI i jeres teams.
              </p>
            </div>
          </FadeIn>
          <div className="ws-packs">
            <FadeIn>
              <article className="ws-pack">
                <span className="ws-pack-badge">Halv dag</span>
                <h3>Microsoft 365 Copilot - kickstart</h3>
                <p>
                  Undervisning i de vigtigste funktioner, så hele teamet
                  kommer i gang med de licenser, I allerede betaler for.
                </p>
                <ul>
                  <li>Copilot i Outlook, Word, Teams og Excel</li>
                  <li>Hands-on øvelser på jeres egne opgaver</li>
                  <li>Prompts og skabeloner I kan bruge dagen efter</li>
                </ul>
                <Button variant="primary" cal>
                  Book en halv dag
                </Button>
              </article>
            </FadeIn>
            <FadeIn delay={100}>
              <article className="ws-pack">
                <span className="ws-pack-badge">Hel dag</span>
                <h3>Microsoft 365 Copilot - A til Z</h3>
                <p>
                  Hele paletten med tid til at gå i dybden - fra de daglige
                  værktøjer til jeres konkrete arbejdsgange.
                </p>
                <ul>
                  <li>Alt fra halvdagen - med mere tid til øvelser</li>
                  <li>Copilot Chat, assistenter og automatisering</li>
                  <li>Plan for forankring, så det bliver brugt bagefter</li>
                </ul>
                <Button variant="primary" cal>
                  Book en hel dag
                </Button>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Case: Retail Partner ── */}
      <section className="section" id="case">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Case: Retail Partner</p>
              <h2 className="h2">
                Fra &rdquo;hvad kan AI?&rdquo; til færdige prompts - på én dag
              </h2>
              <p className="lead">
                En hands-on workshop bygget op om Retail Partners egne opgaver -
                stamdata, kampagner og kommunikation på tværs af mange
                principaler og tusindvis af varenumre.
              </p>
            </div>
          </FadeIn>
          <div className="ws-case">
            <FadeIn>
              <div>
                <div className="ws-case-block">
                  <span className="ws-case-label">Udfordringen</span>
                  <p>
                    Retail Partner arbejder hver dag med produktstamdata,
                    kampagner og kommunikation på tværs af mange principaler og
                    tusindvis af varenumre. Nogle medarbejdere brugte AI
                    dagligt, andre havde aldrig åbnet et værktøj - og
                    bekymringerne var de klassiske: &rdquo;Overtager AI mit
                    job?&rdquo; og hvad med de følsomme data?
                  </p>
                </div>
                <div className="ws-case-block">
                  <span className="ws-case-label">Løsningen</span>
                  <p>
                    En hands-on workshop bygget op om ét princip: AI i
                    øjenhøjde. Hver fase sluttede med øvelser på opgaver fra
                    deres egen hverdag:
                  </p>
                  <ul>
                    <li>Stamdata-berigelse og produktdata</li>
                    <li>Konkurrent- og prisovervågning</li>
                    <li>Oversættelser og mailhåndtering</li>
                  </ul>
                  <div className="ws-case-example">
                    <strong>Konkret eksempel:</strong>{" "}et sæt prompts til
                    deres stamdata-flow - ét beriger produktdata ud fra EAN, ét
                    mapper faktaark ind i deres skabelon med
                    &rdquo;verificér&rdquo;-markering på hvert felt.
                  </div>
                </div>
                <div className="ws-case-block">
                  <span className="ws-case-label">Resultatet</span>
                  <p>
                    16 medarbejdere gik fra &rdquo;hvad kan AI?&rdquo; til
                    færdige prompts, klar til brug dagen efter - og
                    bekymringerne blev vendt til noget håndgribeligt, de selv
                    kan styre.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <aside className="ws-case-aside">
                <Image
                  src="/logos/retail-partner.png"
                  alt="Retail Partner"
                  width={324}
                  height={46}
                  className="ws-case-logo"
                />
                <h3>Dagens fire faser</h3>
                <ol className="ws-case-fases">
                  <li>
                    <span className="num">1</span>Afmystificering og live-demoer
                  </li>
                  <li>
                    <span className="num">2</span>Dybdegående promptteknik
                  </li>
                  <li>
                    <span className="num">3</span>Assistenter
                  </li>
                  <li>
                    <span className="num">4</span>Agenter
                  </li>
                </ol>
                <div className="ws-case-stat">
                  <span className="big">16</span>
                  <span className="desc">
                    medarbejdere - fra nybegyndere til daglige brugere - gik
                    hjem med færdige prompts til deres egne opgaver
                  </span>
                </div>
              </aside>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section final-section" id="kontakt">
        <div className="container">
          <FadeIn>
            <div className="final-card">
              <div className="final-glow" aria-hidden="true" />
              <p className="eyebrow">Næste skridt</p>
              <h2 className="h2 final-title">
                Vil du høre, hvad der passer til jer?
              </h2>
              <p className="final-lead">
                Vi starter med en kort snak, hvor vi finder ud af, hvad I har brug
                for - og siger ærligt, om en workshop er det rigtige for jer lige
                nu.
              </p>
              <div className="final-cta">
                <Button variant="primary" size="lg" cal>
                  Book en snak
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
                    <span className="fp-label">Tal med Alexander</span>
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

      {/* ── Proces ── */}
      <section className="section process-section" id="proces">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Proces</p>
              <h2 className="h2">Sådan foregår det</h2>
              <p className="lead">
                Fra første samtale til workshop og næste skridt.
              </p>
            </div>
          </FadeIn>
          <div className="ptl">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 80}>
                <div className={"pstep" + (i % 2 ? " right" : "")}>
                  <div className="pnode">{s.n}</div>
                  <article className="pcard">
                    <h3 className="pc-h">{s.h}</h3>
                    <p>{s.p}</p>
                  </article>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fortsæt i Academy ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeIn>
            <div className="ws-academy">
              <p className="eyebrow">Efter workshoppen</p>
              <h2>Fortsæt hvor I slap</h2>
              <p>
                Få AI ind i dagligdagen med vores læringsunivers, AI-Minds -
                korte videoer, konkrete use cases og et community, der hjælper
                hinanden.
              </p>
              <a
                href="https://www.skool.com/aiminds/classroom"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Gå til AI-Minds →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
