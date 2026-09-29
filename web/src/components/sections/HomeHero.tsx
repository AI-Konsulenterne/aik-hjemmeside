"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { FILM_INTRO, FILM_SHOTS, filmClip, filmPoster } from "@/content/film";

/**
 * Forsidens hero.
 *
 * Første ting en besøgende skal vide er hvad AIK laver. Før stod der
 * "REFERENCER" over en poetisk sætning om kaffe, og den ene sætning der
 * sagde det — "AI Konsulenterne bygger AI til danske virksomheder" — fandtes
 * kun for skærmlæsere. En IT-chef der landede her, kunne ikke se om vi var
 * et konsulenthus, en softwareleverandør eller et kursussted.
 *
 * Nu siger overskriften det i ét åndedrag: de to ting vi sælger. Filmen
 * kører stadig bagved, men som stemning og ikke som tekst der kæmper med
 * billedet. Kundelinjen — "Vi har hjulpet dem, der …" — er flyttet ned som
 * en undertekst, lige som en kreditering i en film. Den er stadig sidens
 * bedste idé; den skal bare ikke bære positioneringen.
 *
 * Mønstret er fra de mest eksklusive AI-sider på Mobbin (Giga, Sana,
 * Mistral): én klar sætning, én rolig knap, billedet som atmosfære.
 *
 * Tempo: 5,2 sekunder pr. skud mod 3,6 før. Klippene er 5 sekunder lange,
 * og ved 3,6 nåede man hverken billedet eller sætningen.
 */

/* inBand holder heroen kurateret: fem skud valgt på spændvidde. Da alle
   kundeskud fik klip, ville hasClip alene have gjort heroen til ti skud og
   et minut lang. De resterende kører på /referencer. */
const SKUD = FILM_SHOTS.filter((s) => s.act === "kunder" && s.hasClip && s.inBand);
const SKUD_MS = 5200;

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [fremdrift, setFremdrift] = useState(0);
  const [aktiv, setAktiv] = useState(true);
  const [reduceret, setReduceret] = useState(false);

  const sektion = useRef<HTMLElement>(null);
  const videoer = useRef<(HTMLVideoElement | null)[]>([]);
  const start = useRef<number | null>(null);
  const antal = SKUD.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceret(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Filmen kører kun mens den er synlig og fanen er i forgrunden. */
  useEffect(() => {
    const el = sektion.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAktiv(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const synlighed = () => {
      if (document.hidden) setAktiv(false);
      else {
        const r = el.getBoundingClientRect();
        setAktiv(r.top < window.innerHeight && r.bottom > 0);
      }
    };
    document.addEventListener("visibilitychange", synlighed);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", synlighed);
    };
  }, []);

  const gaaTil = useCallback(
    (n: number) => {
      start.current = null;
      setFremdrift(0);
      setIndex(((n % antal) + antal) % antal);
    },
    [antal]
  );

  /* Ét ur for både skift og fremdrift. */
  useEffect(() => {
    if (!aktiv || reduceret) return;
    let raf = 0;
    const tik = (nu: number) => {
      if (start.current === null) start.current = nu;
      const t = nu - start.current;
      if (t >= SKUD_MS) {
        start.current = nu;
        setFremdrift(0);
        setIndex((i) => (i + 1) % antal);
      } else setFremdrift(t / SKUD_MS);
      raf = requestAnimationFrame(tik);
    };
    raf = requestAnimationFrame(tik);
    return () => {
      cancelAnimationFrame(raf);
      start.current = null;
    };
  }, [aktiv, reduceret, antal]);

  useEffect(() => {
    videoer.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && aktiv && !reduceret) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else v.pause();
    });
  }, [index, aktiv, reduceret]);

  const naer = useMemo(() => {
    const forrige = (index - 1 + antal) % antal;
    const naeste = (index + 1) % antal;
    return { naeste, saet: new Set([forrige, index, naeste]) };
  }, [index, antal]);

  const skud = SKUD[index];

  return (
    <section
      ref={sektion}
      aria-labelledby="hero-titel"
      data-header="moerk"
      className="relative -mt-16 flex min-h-[640px] flex-col overflow-hidden bg-ink lg:-mt-20 h-[100svh]"
    >
      {/* --- Filmen --- */}
      <div className="absolute inset-0" aria-hidden="true">
        {SKUD.map((s, i) => {
          if (!naer.saet.has(i)) return null;
          const vilVideo = i === index || i === naer.naeste;
          return (
            <div key={s.id} className="film-shot" data-active={i === index}>
              <Image
                src={filmPoster(s.id)}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              {vilVideo && (
                <video
                  ref={(el) => {
                    videoer.current[i] = el;
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
        {/* Tre lag mørke: under navigationen, bag overskriften og under
            underteksten. Midten er dæmpet nok til hvid tekst i alle fem
            skud, målt — ikke skønnet. */}
        <div className="hero-scrim absolute inset-0" />
      </div>

      {/* --- Positioneringen --- */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pt-24 text-center lg:px-8 lg:pt-28">
        <h1
          id="hero-titel"
          className="text-[clamp(2.35rem,6.2vw,5.75rem)] font-bold leading-[1.02] tracking-display text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]"
        >
          {/* Balanceret, ellers efterlod telefonen "AI." og "dem." alene
              på hver deres linje. */}
          <span className="block text-balance">Vi lærer jeres folk AI.</span>
          <span className="block text-balance">Og bygger den til dem.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)] sm:text-lg">
          AI-Minds klæder hele organisationen på. Og vi bygger løsningerne
          på jeres egne data og systemer.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/kontakt" size="lg">
            Book en samtale
          </Button>
          <Button href="/academy" size="lg" variant="ghost">
            Se læringsplatformen
          </Button>
        </div>
      </div>

      {/* --- Undertekst: hvem vi har hjulpet --- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 lg:px-8 lg:pb-10">
        <div className="flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[0.9375rem] leading-snug text-white/60 sm:text-base" aria-live="off">
            {FILM_INTRO.kunder}{" "}
            <span className="relative inline-grid align-top">
              {SKUD.map((s, i) => (
                <span
                  key={s.id}
                  className="film-line col-start-1 row-start-1 font-semibold text-white"
                  data-active={i === index}
                  aria-hidden={i !== index}
                >
                  {s.line}.
                </span>
              ))}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <div className="flex w-40 items-center gap-1.5" role="group" aria-label="Vælg kunde">
              {SKUD.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => gaaTil(i)}
                  aria-label={`Vis ${s.label}: ${FILM_INTRO.kunder} ${s.line}`}
                  aria-current={i === index}
                  className="flex flex-1 cursor-pointer py-2.5"
                >
                  {/* Stregen er et barn af knappen: knappen er det man
                      rammer, stregen er det man ser. */}
                  <span
                    className="film-tick block"
                    style={
                      {
                        "--tick-progress": i < index ? 1 : i === index ? fremdrift : 0,
                      } as React.CSSProperties
                    }
                  />
                </button>
              ))}
            </div>
            <Link
              href="/referencer"
              className="group whitespace-nowrap text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              Alle referencer
              <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <p className="sr-only">
        Branche lige nu: {skud.label}. {skud.alt}
      </p>
    </section>
  );
}
