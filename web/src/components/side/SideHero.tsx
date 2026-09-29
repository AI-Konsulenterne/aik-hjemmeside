"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { filmClip, filmPoster } from "@/content/film";

/**
 * Heroen på undersiderne.
 *
 * Samme sprog som forsiden: filmen fylder skærmen, navigationen ligger
 * gennemsigtigt ovenpå, og teksten står nederst til venstre som en
 * titel i en film. Hver side vælger de skud fra referencefilmen, der
 * passer til den (AI-Minds: undervisningen live og on demand; workshop:
 * workshoppen; udvikling: kunderne), så undersiderne og forsiden er én
 * film og ikke tolv forskellige stockfotos.
 *
 * Under teksten står et par fakta, som en rulletekst. De skal være sande
 * og stå andre steder på siden; heroen opfinder ingenting.
 *
 * Kun det aktive og det næste klip hentes. Filmen står stille uden for
 * skærmen, i en skjult fane og ved prefers-reduced-motion (så vises kun
 * posteren).
 */

export type Knap = { label: string; href: string };

type Props = {
  id: string;
  kicker: string;
  titel: string[];
  tekst: string;
  primaer: Knap;
  sekundaer?: Knap;
  skud: string[];
  fakta?: [string, string][];
};

const SKUD_MS = 6000;

export default function SideHero({ id, kicker, titel, tekst, primaer, sekundaer, skud, fakta = [] }: Props) {
  const [index, setIndex] = useState(0);
  const [aktiv, setAktiv] = useState(true);
  const [reduceret, setReduceret] = useState(false);
  const sektion = useRef<HTMLElement>(null);
  const videoer = useRef<(HTMLVideoElement | null)[]>([]);
  const antal = skud.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sektion.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAktiv(e.isIntersecting && !document.hidden), { threshold: 0.15 });
    io.observe(el);
    const fane = () => {
      const r = el.getBoundingClientRect();
      setAktiv(!document.hidden && r.top < window.innerHeight && r.bottom > 0);
    };
    document.addEventListener("visibilitychange", fane);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", fane);
    };
  }, []);

  /* Skift skud, når der er mere end ét. */
  useEffect(() => {
    if (antal < 2 || !aktiv || reduceret) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % antal), SKUD_MS);
    return () => window.clearInterval(t);
  }, [antal, aktiv, reduceret]);

  useEffect(() => {
    videoer.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && aktiv && !reduceret) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else v.pause();
    });
  }, [index, aktiv, reduceret]);

  const naeste = (index + 1) % antal;
  const forrige = (index - 1 + antal) % antal;

  return (
    <section
      ref={sektion}
      aria-labelledby={id}
      data-header="moerk"
      className="relative -mt-16 flex min-h-[max(40rem,100svh)] flex-col overflow-hidden bg-ink lg:-mt-20"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {skud.map((s, i) => {
          if (i !== index && i !== naeste && i !== forrige) return null;
          const vilVideo = !reduceret && (i === index || i === naeste);
          return (
            <div key={s} className="film-shot" data-active={i === index}>
              <Image src={filmPoster(s)} alt="" fill sizes="100vw" priority={i === 0} className="object-cover" />
              {vilVideo && (
                <video
                  ref={(el) => {
                    videoer.current[i] = el;
                  }}
                  src={filmClip(s)}
                  poster={filmPoster(s)}
                  muted
                  playsInline
                  loop={antal === 1}
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          );
        })}
        <div className="film-vignette" data-tall="true" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-10 pt-36 lg:px-8 lg:pb-14">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">{kicker}</p>
          </div>
          <h1
            id={id}
            className="mt-6 text-[clamp(2.5rem,5.6vw,5rem)] font-bold leading-[1.0] tracking-display text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]"
          >
            {titel.map((linje) => (
              <span key={linje} className="block text-balance">
                {linje}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)] sm:text-lg">
            {tekst}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <Button href={primaer.href} size="lg">
              {primaer.label}
            </Button>
            {sekundaer && (
              <Button href={sekundaer.href} size="lg" variant="ghost">
                {sekundaer.label}
              </Button>
            )}
          </div>
        </div>

        {fakta.length > 0 && (
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4 lg:mt-20">
            {fakta.map(([vaerdi, label]) => (
              <div key={label} className="flex flex-col-reverse gap-1">
                <dt className="text-sm leading-snug text-white/65">{label}</dt>
                <dd className="text-[1.375rem] font-bold leading-none tracking-heading text-white">{vaerdi}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
