"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FILM_INTRO,
  FILM_SHOTS,
  FILM_SHOTS_BAND,
  FILM_SHOT_MS,
  filmClip,
  filmPoster,
} from "@/content/film";

type Variant = "band" | "full" | "hero";

/**
 * Referencefilmen.
 *
 * Klippene er baggrund — sætningen er rigtig DOM-tekst. Det er derfor teksten
 * er skarp på alle skærme, kan indekseres, og kan rettes uden at rendere video
 * om. Klip og tekst deler den samme CSS-overgang (--film-fade), så skiftet
 * læses som ét snit i stedet for to ting der sker næsten samtidig.
 *
 * Hele sætningen skifter under ét — også dens første halvdel. Filmen kører i
 * to akter, og forskellen mellem "Vi har hjulpet dem, der …" og "Og nu lærer
 * vi det fra os —" er ikke kosmetisk: den ene er en påstand om en kunde, den
 * anden om os selv. Derfor ligger indledningen i datasættet og ikke i koden.
 *
 * Ydelse: kun tre shots findes i DOM'en ad gangen (forrige, nuværende, næste),
 * og kun nuværende + næste får et <video>-element — og kun hvis der findes et
 * klip. Shots uden klip står på deres posterframe, hvilket er et valg og ikke
 * en mangel.
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

  const isFull = variant === "full";
  const isHero = variant === "hero";
  /* Hero og full er begge fuldskaerm; hero er forsidens oeverste blok og
     baerer sidens h1 og primaere CTA. */
  const isTall = isFull || isHero;
  /* Båndet på forsiden er en kort udgave — samme datasæt, færre skud. */
  const shots = useMemo(
    () => (isFull ? FILM_SHOTS : FILM_SHOTS_BAND),
    [isFull]
  );
  const count = shots.length;

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

  const goTo = useCallback(
    (next: number) => {
      startRef.current = null;
      setProgress(0);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  /* Ét ur driver både fremdriftsstregen og skiftet, så de aldrig glider fra hinanden. */
  useEffect(() => {
    if (!active || reduced) return;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      if (elapsed >= FILM_SHOT_MS) {
        startRef.current = now;
        setProgress(0);
        setIndex((i) => (i + 1) % count);
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
  }, [active, reduced, count]);

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

  const shot = shots[index];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="film-heading"
      className={`relative w-full overflow-hidden bg-ink ${
        isTall
          ? "min-h-[100svh]"
          : "h-[min(78svh,44rem)] min-h-[26rem]"
      }`}
    >
      {/* --- Billedlag --- */}
      <div className="absolute inset-0" aria-hidden="true">
        {shots.map((s, i) => {
          if (!near.set.has(i)) return null;
          const isActive = i === index;
          /* Nuværende + næste klip. Næste hentes helt, ellers er der
             et hul i snittet når det skal ind. */
          const wantsVideo = s.hasClip && (i === index || i === near.next);
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
        <div className="film-vignette" data-tall={isTall} />
      </div>

      {/* --- Tekstlag --- */}
      <div className="relative flex h-full flex-col justify-end">
        <div
          className={`mx-auto w-full max-w-[1400px] px-6 lg:px-10 ${
            isTall
              ? "pb-[clamp(4rem,10vh,7rem)] pt-[clamp(6rem,18vh,12rem)]"
              : "pb-[clamp(2.5rem,5vw,4rem)] pt-24"
          }`}
        >
          {isHero ? (
            <h1 id="film-heading" className="sr-only">
              AI Konsulenterne bygger AI til danske virksomheder
            </h1>
          ) : (
            <h2 id="film-heading" className="sr-only">
              Virksomheder vi har bygget AI til
            </h2>
          )}

          <p className="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.18em] text-white/50">
            Referencer
          </p>

          {/* Indledningen står stille. Den er den samme hele akten igennem, så
              den skal ikke blinke ved hvert skift; kun den orange halvdel
              skifter. Ved aktskiftet bytter indledningen én gang, og det er
              meningen: det er der, påstanden bliver en anden.
              Alle linjer ligger i DOM'en, kun den aktive er synlig. Det holder
              højden stabil og gør teksten indekserbar. */}
          <p
            className={`mt-6 font-bold tracking-display text-white ${
              isTall
                ? "text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05]"
                : "text-[clamp(1.75rem,4.4vw,3.75rem)] leading-[1.08]"
            }`}
          >
            <span className={isTall ? "text-white/70" : "text-white/55"}>
              {FILM_INTRO[shot.act]}
            </span>{" "}
            <span className="relative inline-grid max-w-full align-top">
              {shots.map((s, i) => (
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
              løste vi med den samme model, men alle startede med det samme
              spørgsmål: hvor går tiden egentlig hen?
            </p>
          )}

          {isHero && (
            <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <p className="max-w-[46ch] text-base leading-relaxed text-white/60 lg:text-lg">
                Nogle af dem har tolv ansatte. Andre har tolv tusind. Det svære
                ved AI er det samme begge steder: ikke modellen, men at få den
                ind i en hverdag, hvor folk allerede har travlt.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                >
                  Book en gratis AI-afklaring
                </Link>
                <Link
                  href="/referencer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                >
                  Se hvad vi har bygget
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-precise group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* --- Fremdrift --- */}
          <div className="mt-10 flex items-center gap-6 lg:mt-14">
            <div className="flex flex-1 items-center gap-2">
              {shots.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Vis ${s.label}: ${FILM_INTRO[s.act]} ${s.line}`}
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
            {/* Højre padding holder tælleren fri af den faste "scroll til
                top"-knap, der ligger viewport-forankret i samme hjørne. Uden
                den bliver sidste bogstav i brancheordet klippet i vinduer
                omkring 1400-1500 px, hvor containerens kant og knappen mødes. */}
            <p className="hidden shrink-0 text-xs font-semibold tabular-nums tracking-widest text-white/40 sm:block sm:pr-12 lg:pr-14">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              <span className="ml-4 text-white/60">{shot.label}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hele sætningsrækken, læsbar for skærmlæsere og søgemaskiner. */}
      <ul className="sr-only">
        {shots.map((s) => (
          <li key={s.id}>
            {FILM_INTRO[s.act]} {s.line}. Branche: {s.label}. {s.alt}
          </li>
        ))}
      </ul>
    </section>
  );
}
