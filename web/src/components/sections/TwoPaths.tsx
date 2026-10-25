"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * "To spor til AI i jeres virksomhed".
 * Vælger øverst fremhæver det matchende kort. Hvert kort har en lille animeret
 * visual: dataflow (Få det bygget) og læringsforløb (Lær det selv).
 */

const buildLinks = [
  { label: "AI-strategi", href: "/ai-strategi" },
  { label: "AI-løsninger til jeres data og systemer", href: "/skraeddersyede-ai" },
  { label: "AIK Workshop", href: "/workshop" },
];

const learnChips = ["40+ moduler", "Fællesskab", "Live Q&A's", "+ Claude-bonus", "AI Act"];

const picks = ["have det bygget for os", "lære det selv"];

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

// Kort 2: Copilot/ChatGPT/Claude fyldes op én ad gangen, i samme rytme som kort 1.
function LearnVisual({ phase }: { phase: number }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl h-[200px] p-6 flex flex-col justify-center gap-5" aria-hidden="true">
      {["Copilot", "ChatGPT", "Claude"].map((tool, i) => {
        const done = phase >= i + 2;
        return (
          <div key={tool} className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
            <span className="text-[13px] font-semibold text-white">{tool}</span>
            <span className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
              <span
                className={`block h-full rounded-full bg-primary transition-[width] duration-[600ms] ease-out ${done ? "w-full" : "w-0"}`}
              />
            </span>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-[400ms] ${
                done ? "bg-primary text-white" : "bg-gray-700 text-transparent"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </div>
        );
      })}
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
              To spor til AI i jeres virksomhed
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
                  Vi hjælper med strategien, udvikler løsningerne og lærer
                  medarbejderne at bruge dem.
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

          {/* Kort 2: AI-Minds */}
          <FadeIn delay={200} className="h-full">
            <div className={`h-full flex flex-col gap-7 bg-gray-900 rounded-[24px] p-[clamp(28px,3vw,40px)] transition-all duration-[350ms] ease-out ${cardState(1)}`}>
              <LearnVisual phase={phase} />
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
