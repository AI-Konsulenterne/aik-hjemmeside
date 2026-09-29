"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import OrdForOrd from "@/components/ui/OrdForOrd";
import FadeIn from "@/components/ui/FadeIn";
import { FILM_SHOTS, filmClip, filmPoster } from "@/content/film";

/**
 * Indgangen til /referencer længere nede på forsiden.
 *
 * Heroen kører filmen, men den er stemning bag en overskrift, og linket
 * "Alle referencer" nederst i den er let at overse. Her står kunderne
 * som en række stills, der glider langsomt forbi, hver med branche og
 * den linje, filmen bruger om dem. Holder man musen over et billede,
 * spiller klippet. Én tydelig knap fører videre.
 *
 * Kun de ti kundeskud: de tre fra undervisningen er ikke referencer.
 *
 * Rækken er pynt for skærmlæsere (aria-hidden); knappen er handlingen.
 * Klippene hentes først ved hover (preload="none"), og rækken står
 * stille ved prefers-reduced-motion og kan scrolles i stedet.
 */

const KUNDER = FILM_SHOTS.filter((s) => s.act === "kunder");

function Kort({ id, label, line, alt }: { id: string; label: string; line: string; alt: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const spil = () => {
    const v = video.current;
    if (!v) return;
    if (!v.src) v.src = filmClip(id);
    void v.play().catch(() => {});
  };
  const stop = () => video.current?.pause();
  return (
    <Link
      href="/referencer"
      tabIndex={-1}
      onPointerEnter={spil}
      onPointerLeave={stop}
      className="group/kort relative block aspect-[4/5] w-[15rem] shrink-0 overflow-hidden rounded-2xl bg-ink-soft sm:w-[17rem]"
    >
      <Image
        src={filmPoster(id)}
        alt={alt}
        fill
        sizes="272px"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/kort:scale-[1.04]"
      />
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover/kort:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-5 bottom-5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/70">{label}</p>
        <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-white">
          {line.charAt(0).toUpperCase() + line.slice(1)}
        </p>
      </div>
    </Link>
  );
}

export default function ReferencerBaand() {
  return (
    <section data-header="moerk" className="section-y overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="kicker text-white/60">Referencer</p>
            <OrdForOrd className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-white">
              Kaffe, kirker, vindmøller og festivalarmbånd.
            </OrdForOrd>
          </div>
          <FadeIn delay={250} className="lg:col-span-5">
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/70">
              Ti meget forskellige virksomheder. Ingen af dem fik den samme
              løsning, men alle startede med det samme spørgsmål: hvor går
              tiden hen?
            </p>
            <Link
              href="/referencer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Se hvem vi har hjulpet
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Rækken glider langsomt og står stille, mens musen er over den.
          Listen står to gange, så løkken ikke har et hul. */}
      <div aria-hidden="true" className="referencer-raekke mt-14 lg:mt-20">
        <div className="referencer-spor flex w-max gap-4 sm:gap-5">
          {[...KUNDER, ...KUNDER].map((s, i) => (
            <div key={`${s.id}-${i}`} data-kopi={i >= KUNDER.length ? "" : undefined} className="contents">
              <Kort id={s.id} label={s.label} line={s.line} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
