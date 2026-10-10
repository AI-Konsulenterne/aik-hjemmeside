"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * "Tre spor til AI i jeres virksomhed" (design-handoff "Tre spor").
 * Vælger øverst fremhæver det matchende kort. Hvert kort har en lille visual:
 * animeret dataflow (Få det bygget), Workspace-screenshot og Copilot-videoen
 * (klik-for-afspil, YouTube indlæses først ved klik).
 */

const buildLinks = [
  { label: "AI-strategi", href: "/ai-strategi" },
  { label: "AI-løsninger til jeres data og systemer", href: "/skraeddersyede-ai" },
  { label: "AIK Workshop", href: "/workshop" },
];

const workspaceChips = ["GDPR-compliant", "Data i Azure EU", "Hurtig opsætning"];

const learnChips = ["40+ moduler", "Fællesskab", "Live Q&A's", "+ Claude-bonus", "AI Act"];

const picks = ["have det bygget for os", "have vores eget AI-system", "lære det selv"];

const VIDEO_ID = "-MePqDXITi8";
const VIDEO_TITLE = "Forbedre dine resultater med Copilot på 15 minutter";

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// Kort 1: Mail/ERP/Excel → AI-løsning → færdig. Faser tændes én ad gangen.
function FlowVisual({ phase }: { phase: number }) {
  const line1 = phase >= 1;
  const glow = phase >= 2;
  const line2 = phase >= 3;
  const done = phase >= 4;
  return (
    <div className="bg-white rounded-2xl h-[200px] p-5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center" aria-hidden="true">
      <div className="flex flex-col gap-2">
        {["Mail", "ERP", "Excel"].map((s) => (
          <span key={s} className="border border-gray-200 rounded-full px-3 py-1.5 text-[13px] font-semibold text-gray-900 text-center bg-white">
            {s}
          </span>
        ))}
      </div>
      <span className={`h-0.5 mx-1 transition-colors duration-[400ms] ${line1 ? "bg-primary" : "bg-gray-200"}`} />
      <div
        className={`bg-gray-900 rounded-xl px-3.5 py-3 transition-shadow duration-[400ms] ${
          glow ? "shadow-[0_0_0_6px_rgba(255,154,0,0.18)]" : ""
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Bygget til jer</p>
        <p className="text-sm font-bold text-white mt-0.5">AI-løsning</p>
      </div>
      <span className={`h-0.5 mx-1 transition-colors duration-[400ms] ${line2 ? "bg-primary" : "bg-gray-200"}`} />
      <span
        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors duration-[400ms] ${
          done ? "bg-primary border-primary text-white" : "bg-white border-gray-200 text-transparent"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    </div>
  );
}

function VideoVisual() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-700 bg-[#0b0f2a]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={VIDEO_TITLE}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          data-cookieconsent="ignore"
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Afspil video: ${VIDEO_TITLE}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <Image
            src="/lektion-prompting.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_12px_28px_-8px_rgba(255,154,0,.65)] transition-transform duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function TwoPaths() {
  const [pick, setPick] = useState(-1);
  const [tick, setTick] = useState(4);

  // Dataflow-animation i kort 1. Står i slutfasen (alt tændt) ved reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(id);
  }, []);
  const phase = tick % 6;

  const cardState = (i: number) =>
    pick === -1
      ? ""
      : pick === i
        ? "motion-safe:-translate-y-1.5 shadow-[0_0_0_2px_#ff9a00,0_24px_48px_rgba(0,0,0,0.10)]"
        : "opacity-40";

  return (
    <section className="bg-white py-[clamp(4rem,10vw,7rem)] px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {/* Topbar: overskrift + vælger */}
        <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-6">
          <FadeIn>
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-heading text-gray-900 leading-[1.05] max-w-[640px] text-balance">
              Tre spor til AI i jeres virksomhed
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-500">Vi vil gerne…</p>
              <div className="flex flex-wrap gap-2">
                {picks.map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={pick === i}
                    onClick={() => setPick(pick === i ? -1 : i)}
                    className={`rounded-full px-5 py-3 text-[15px] font-semibold whitespace-nowrap border transition-colors duration-200 ${
                      pick === i
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-300 text-gray-900 hover:border-primary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Kort */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6 items-stretch">
          {/* Kort 1: Få det bygget */}
          <FadeIn delay={100} className="h-full">
            <div className={`h-full flex flex-col gap-7 bg-sand rounded-[24px] p-[clamp(28px,3vw,40px)] transition-all duration-[350ms] ease-out ${cardState(0)}`}>
              <FlowVisual phase={phase} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Få det bygget</p>
                <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold tracking-heading text-gray-900 leading-[1.15] mt-3">
                  Få bygget AI ind i forretningen
                </h3>
                <p className="text-[17px] leading-[1.65] text-gray-700 mt-4">
                  Vi finder opgaverne, hvor AI sparer tid, og bygger løsningen til
                  jeres systemer.
                </p>
              </div>
              <ul className="border-t border-gray-200">
                {buildLinks.map((l) => (
                  <li key={l.label} className="border-b border-gray-200">
                    <Link
                      href={l.href}
                      className="flex items-center justify-between gap-4 py-[18px] text-[17px] font-semibold text-gray-900 transition-all duration-200 hover:text-primary-dark hover:pl-1.5"
                    >
                      {l.label}
                      <ArrowRight />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button variant="primary" size="lg" href="/skraeddersyede-ai">
                  Se hvordan vi arbejder
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Kort 2: AIK Workspace */}
          <FadeIn delay={200} className="h-full">
            <div className={`h-full flex flex-col gap-7 bg-white border border-gray-200 rounded-[24px] p-[clamp(28px,3vw,40px)] transition-all duration-[350ms] ease-out ${cardState(1)}`}>
              <div className="relative h-[200px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src="/screenshots/workspace-assistent.png"
                  alt="AIK Workspace dashboard med opgaver, forslag og assistent"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-[center_top]"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Jeres eget AI-system</p>
                <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold tracking-heading text-gray-900 leading-[1.15] mt-3">
                  AIK Workspace
                </h3>
                <p className="text-[17px] leading-[1.65] text-gray-700 mt-4">
                  Chat, agenter og vidensbase samlet ét sted - forankret i jeres
                  data, jeres systemer og jeres måde at gøre tingene på.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {workspaceChips.map((c) => (
                  <li key={c} className="bg-sand rounded-full px-4 py-[9px] text-sm font-semibold text-gray-700">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button variant="secondary" size="lg" href="/visionai">
                  Se AIK Workspace
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Kort 3: AI-Minds */}
          <FadeIn delay={300} className="h-full">
            <div className={`h-full flex flex-col gap-7 bg-gray-900 rounded-[24px] p-[clamp(28px,3vw,40px)] transition-all duration-[350ms] ease-out ${cardState(2)}`}>
              <VideoVisual />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Lær det selv</p>
                <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold tracking-heading text-white leading-[1.15] mt-3">
                  Hands-on undervisning i Copilot
                </h3>
                <p className="text-[17px] leading-[1.65] text-gray-300 mt-4">
                  AI-Minds: korte videoer på dansk, månedlig live Q&amp;A og nye
                  moduler hver måned.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {learnChips.map((c) => (
                  <li key={c} className="bg-gray-800 border border-gray-700 rounded-full px-4 py-[9px] text-sm font-semibold text-white">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href="/academy"
                  className="inline-flex items-center justify-center rounded-full bg-white text-primary-dark font-semibold px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base transition-all duration-200 hover:bg-primary hover:text-gray-900 hover:-translate-y-0.5"
                >
                  Se AI-Minds
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
