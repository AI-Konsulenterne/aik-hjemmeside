"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FILM_INTRO,
  FILM_SHOTS,
  FILM_SHOT_MS,
  filmClip,
  filmPoster,
} from "@/content/film";

type Variant = "band" | "full";

/**
 * Referencefilmen.
 *
 * Klippene er baggrund — sætningen er rigtig DOM-tekst. Det er derfor teksten
 * er skarp på alle skærme, kan indekseres, og kan rettes uden at rendere video
 * om. Klip og tekst deler den samme CSS-overgang (--film-fade), så skiftet
 * læses som ét snit i stedet for to ting der sker næsten samtidig.
 *
 * Ydelse: kun tre shots findes i DOM'en ad gangen (forrige, nuværende, næste),
 * og kun nuværende + næste får et <video>-element. Resten er posterframes.
 */
export default function ProofFilm({ variant = "band" }: { variant?: Variant }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const count = FILM_SHOTS.length;
  const isFull = variant === "full";

  /* Respektér brugerens bevægelsesindstilling — og reagér hvis den ændres. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Filmen kører kun mens den faktisk er synlig. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* …og heller ikke når fanen ligger i baggrunden. */
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setActive(false);
      else if (sectionRef.current) {
        const r = sectionRef.current.getBoundingClientRect();
        setActive(r.top < window.innerHeight && r.bottom > 0);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback((next: number) => {
    startRef.current = null;
    setProgress(0);
    setIndex(((next % FILM_SHOTS.length) + FILM_SHOTS.length) % FILM_SHOTS.length);
  }, []);

  /* Ét ur driver både fremdriftsstregen og skiftet, så de aldrig glider fra hinanden. */
  useEffect(() => {
    if (!active || reduced) return;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      if (elapsed >= FILM_SHOT_MS) {
        startRef.current = now;
        setProgress(0);
        setIndex((i) => (i + 1) % FILM_SHOTS.length);
      } else {
        setProgress(elapsed / FILM_SHOT_MS);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, reduced]);

  /* Spol det aktive klip tilbage og afspil det; sæt alle andre på pause. */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && active && !reduced) {
        v.currentTime = 0;
        /* Autoplay kan afvises — posterframen bliver stående, og det er fint. */
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, active, reduced]);

  /* Kun nabo-shots holdes i DOM'en. */
  const near = useMemo(() => {
    const prev = (index - 1 + count) % count;
    const next = (index + 1) % count;
    return { prev, next, set: new Set([prev, index, next]) };
  }, [index, count]);

  const shot = FILM_SHOTS[index];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="film-heading"
      className={`relative w-full overflow-hidden bg-ink ${
        isFull ? "min-h-[100svh]" : "h-[min(78svh,44rem)] min-h-[26rem]"
      }`}
    >
      {/* --- Billedlag --- */}
      <div className="absolute inset-0" aria-hidden="true">
        {FILM_SHOTS.map((s, i) => {
          if (!near.set.has(i)) return null;
          const isActive = i === index;
          const wantsVideo = i === index || i === near.next;
          return (
            <div key={s.id} className="film-shot" data-active={isActive}>
              <Image
                src={filmPoster(s.id)}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              {/* Nuværende + næste klip. Næste hentes helt, ellers er der
                  et hul i snittet når det skal ind. */}
              {wantsVideo && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={filmClip(s.id)}
                  poster={filmPoster(s.id)}
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          );
        })}
        <div className="film-vignette" />
      </div>

      {/* --- Tekstlag --- */}
      <div className="relative flex h-full flex-col justify-end">
        <div
          className={`mx-auto w-full max-w-[1400px] px-6 lg:px-10 ${
            isFull ? "pb-[clamp(4rem,10vh,7rem)] pt-[clamp(6rem,18vh,12rem)]" : "pb-[clamp(2.5rem,5vw,4rem)] pt-24"
          }`}
        >
          <h2 id="film-heading" className="sr-only">
            Virksomheder vi har bygget AI til
          </h2>

          <p className="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.18em] text-white/50">
            Referencer
          </p>

          <p
            className={`mt-6 font-bold tracking-display text-white ${
              isFull
                ? "text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05]"
                : "text-[clamp(1.75rem,4.4vw,3.75rem)] leading-[1.08]"
            }`}
          >
            <span className="text-white/55">{FILM_INTRO}</span>{" "}
            {/* Alle linjer ligger i DOM'en — kun den aktive er synlig.
                Det holder højden stabil og gør teksten indekserbar. */}
            <span className="relative inline-grid max-w-full align-top">
              {FILM_SHOTS.map((s, i) => (
                <span
                  key={s.id}
                  className="film-line col-start-1 row-start-1 text-primary"
                  data-active={i === index}
                  aria-hidden={i !== index}
                >
                  {s.line}
                </span>
              ))}
            </span>
          </p>

          {isFull && (
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-white/60">
              Forskellige brancher, meget forskellige problemer. Ingen af dem
              løste vi med den samme model — men alle startede med det samme
              spørgsmål: hvor går tiden egentlig hen?
            </p>
          )}

          {/* --- Fremdrift --- */}
          <div className="mt-10 flex items-center gap-6 lg:mt-14">
            <div className="flex flex-1 items-center gap-2">
              {FILM_SHOTS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Vis ${s.label}: ${FILM_INTRO} ${s.line}`}
                  aria-current={i === index}
                  className="film-tick cursor-pointer"
                  style={
                    {
                      "--tick-progress":
                        i < index ? 1 : i === index ? progress : 0,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <p className="hidden shrink-0 text-xs font-semibold tabular-nums tracking-widest text-white/40 sm:block">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              <span className="ml-4 text-white/60">{shot.label}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hele sætningsrækken, læsbar for skærmlæsere og søgemaskiner. */}
      <ul className="sr-only">
        {FILM_SHOTS.map((s) => (
          <li key={s.id}>
            {FILM_INTRO} {s.line}. Branche: {s.label}. {s.alt}
          </li>
        ))}
      </ul>
    </section>
  );
}
