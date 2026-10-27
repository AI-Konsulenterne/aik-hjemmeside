"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * "Vi udvikler og underviser": to spor side om side.
 * Kort 1 har et animeret dataflow, kort 2 Copilot-videoen
 * (klik-for-afspil, YouTube indlæses først ved klik).
 */

const learnChips = ["40+ moduler", "Fællesskab", "Live Q&A's", "+ Claude-bonus", "AI Act"];

const VIDEO_ID = "-MePqDXITi8";
const VIDEO_TITLE = "Forbedre dine resultater med Copilot på 15 minutter";

// Kort 1: Mail/ERP/Excel → AI-løsning → færdig. Faser tændes én ad gangen.
function FlowVisual({ phase }: { phase: number }) {
  const line1 = phase >= 1;
  const glow = phase >= 2;
  const line2 = phase >= 3;
  const done = phase >= 4;
  return (
    <div className="bg-white rounded-2xl aspect-video min-h-[200px] p-5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center" aria-hidden="true">
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
  const [tick, setTick] = useState(4);

  // Dataflow-animation i kort 1. Står i slutfasen (alt tændt) ved reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(id);
  }, []);
  const phase = tick % 6;

  return (
    <section className="bg-white py-[clamp(4rem,10vw,7rem)] px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        <FadeIn>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-heading text-gray-900 leading-[1.05] text-balance">
            Vi udvikler og underviser
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Kort 1: Vi udvikler */}
          <FadeIn delay={100} className="h-full">
            <div className="h-full flex flex-col gap-7 bg-sand rounded-[24px] p-[clamp(28px,3vw,40px)]">
              <FlowVisual phase={phase} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Vi udvikler</p>
                <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold tracking-heading text-gray-900 leading-[1.15] mt-3">
                  Få bygget AI ind i forretningen
                </h3>
                <p className="text-[17px] leading-[1.65] text-gray-700 mt-4">
                  Vi hjælper med strategien, udvikler løsningerne og lærer
                  medarbejderne at bruge dem.
                </p>
              </div>
              <div className="mt-auto">
                <Button variant="primary" size="lg" href="/skraeddersyede-ai">
                  Se hvordan vi arbejder
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Kort 2: Vi underviser (AI-Minds) */}
          <FadeIn delay={200} className="h-full">
            <div className="h-full flex flex-col gap-7 bg-gray-900 rounded-[24px] p-[clamp(28px,3vw,40px)]">
              <VideoVisual />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Vi underviser</p>
                <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold tracking-heading text-white leading-[1.15] mt-3">
                  Hands-on online undervisning i Copilot
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
