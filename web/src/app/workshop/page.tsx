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
  title: "AI Workshop for Virksomheder | Hands-on AI Kursus",
  description:
    "En AI-workshop bygget op om jeres egne opgaver - ikke en standardpakke. I går hjem med skabeloner, konkrete use cases og en plan for, hvad I gør bagefter.",
  alternates: { canonical: "/workshop" },
  keywords: [
    "AI workshop virksomhed",
    "AI kursus",
    "ChatGPT kursus virksomhed",
    "prompt engineering kursus",
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
    h: "Træning med hænderne i bolden",
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
                Vi afdækker først, hvad I står med, og bygger workshoppen op om
                jeres egne opgaver. Vi opgraderer jer i de værktøjer, I allerede
                har - især Microsoft Copilot, men også ChatGPT og Claude. I går
                hjem med skabeloner, konkrete use cases og en plan for, hvad I
                gør bagefter.
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

      {/* ── Problem ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="problem-wrap">
              <h2 className="h2">De fleste AI-kurser bliver glemt ugen efter.</h2>
              <p className="problem-body">
                Man sidder en dag og hører om &ldquo;AI&apos;s potentiale&rdquo;,
                nikker - og er tilbage i de gamle vaner om mandagen. Det sker,
                fordi det aldrig handlede om jeres opgaver.{" "}
                <strong>
                  Vores workshop tager udgangspunkt i det, I rent faktisk sidder
                  med
                </strong>
                , så det, I lærer, hænger ved.
              </p>
            </div>
          </FadeIn>
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
                Få AI ind i dagligdagen med vores læringsunivers, AIK Academy -
                korte videoer, konkrete use cases og et community, der hjælper
                hinanden.
              </p>
              <a
                href="https://www.skool.com/aik-academy-9764/classroom"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Gå til AIK Academy →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
