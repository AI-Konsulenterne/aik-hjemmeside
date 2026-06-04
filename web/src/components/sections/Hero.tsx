"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const useCases = [
  "kundeservice",
  "ordrehåndtering",
  "rapportering",
  "dataanalyse",
  "bogføring",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % useCases.length);
        setIsVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-[clamp(4rem,11vw,8rem)] pb-[clamp(4rem,10vw,7rem)] relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <FadeIn>
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-heading text-gray-900 leading-[1.05]">
                Spar tid på{" "}
                <span className="relative inline-block">
                  <span
                    className={`text-primary transition-all duration-400 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {useCases[currentIndex]}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary/30 rounded-full" />
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 mt-6 lg:mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Vi hjælper danske SMV'er med at komme i gang med AI -
                også jer der ikke ved hvor I skal starte, eller ikke har en
                IT-afdeling at læne jer op ad.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8 lg:mt-10">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Start jeres AI rejse her
                </Button>
                <Button variant="secondary" size="lg" href="/ai-guide">
                  Få en gratis AI-analyse
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                45 min · Gratis · Ingen forberedelse · Uforpligtende
              </p>
            </FadeIn>
          </div>

          {/* Right — Alexander's portrait card */}
          <FadeIn delay={200}>
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full">
              {/* Portrait */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                <Image
                  src="/team/alexander-hero.png"
                  alt="Alexander, AI-konsulent hos AI Konsulenterne"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-xl shadow-lg p-4 lg:p-5 max-w-[260px] ring-1 ring-gray-100">
                <p className="text-sm lg:text-[0.95rem] text-gray-900 font-semibold leading-snug">
                  ☕ Klar til en kop kaffe
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" aria-hidden="true" />
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">Alexander</span> - AI-Konsulent
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
