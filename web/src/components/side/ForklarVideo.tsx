"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * En kort forklarende film med plakat. Plakaten står, til man klikker; først
 * da hentes filmen, så siden ikke betaler for den, hvis ingen ser den.
 *
 * Bruges til AIKs egen film om en AI-agent (23 s, uden lyd, danske tekster
 * brændt ind i billedet). Designsystemet siger nej til robotikoner; figuren
 * her er AIKs eget valg og står kun, hvor den forklarer noget.
 */
export default function ForklarVideo({
  src,
  plakat,
  titel,
  varighed,
}: {
  src: string;
  plakat: string;
  titel: string;
  varighed: string;
}) {
  const [spiller, setSpiller] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.45)]">
      {spiller ? (
        <video
          src={src}
          poster={plakat}
          controls
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setSpiller(true)}
          aria-label={`Afspil filmen: ${titel} (${varighed}, uden lyd)`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={plakat}
            alt=""
            fill
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Knappen står nede til venstre, ikke midt i billedet, så figuren
              står frit. Hele plakaten er knappen. */}
          <span aria-hidden="true" className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <span className="flex items-center gap-2 rounded-full bg-primary py-2 pl-3 pr-4 text-[0.9375rem] font-semibold text-black shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.04] sm:py-2.5 sm:pl-3.5 sm:pr-5 sm:text-base lg:py-3 lg:pl-4 lg:pr-6 lg:text-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 lg:h-6 lg:w-6">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              Se filmen
            </span>
            <span className="rounded-full bg-black/60 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {varighed} · uden lyd
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
