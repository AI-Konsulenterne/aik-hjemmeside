"use client";

import { useEffect, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";

/**
 * Proces og tillid, fortalt mens man scroller.
 *
 * Fire trin med én sætning hver, og under hvert trin det, kunden står med
 * bagefter. RAND-tallet står ved siden af som begrundelsen og bliver
 * stående (sticky), mens trinnene glider forbi.
 *
 * Bevægelsen: en streg løber ned gennem trinnene og fyldes i sort i takt
 * med scroll. For enden af den sidder sektionens ene tændte lampe, brandets
 * orange, og markerer hvor vi er. Når lampen når et trin, bliver trinnet
 * skarpt og "Det får I" kommer frem. Efter sidste trin bliver lampen
 * stående ved drift, fordi det er det, der fortsætter.
 *
 * Ref: Dovetails procesliste (aktivt trin fremhævet, resten dæmpet langs én
 * streg) og Adas streg, der fyldes med scroll. Begge fundet via Mobbin.
 *
 * Teknik: ingen React-state under scroll. Én passiv scroll-lytter, ét
 * requestAnimationFrame pr. frame, og tilstanden skrives som data-attributter
 * og CSS-variabler, som Tailwind-varianterne læser. Uden JavaScript står alle
 * trin fuldt fremme, bare uden streg. prefers-reduced-motion: ingen
 * overgange og ingen optælling; stregen følger stadig scroll, fordi det er
 * brugeren, der flytter den.
 *
 * Trin 1 og 4 bygger på det, siden allerede lover andre steder: afklaringen
 * er gratis og tager 45 minutter, prisen er fast efter afklaringen, og vi
 * drifter det, vi bygger.
 */

const trin = [
  {
    n: "01",
    t: "Afklaring",
    s: "Vi finder ud af, hvor jeres tid går hen, og om der er noget at hente.",
    f: "45 minutter, gratis. En ærlig vurdering, og en fast pris, hvis der er noget at bygge.",
  },
  {
    n: "02",
    t: "Første version",
    s: "Bygget på jeres data og klar hurtigt, så I kan prøve den på rigtige opgaver.",
    f: "En løsning, der kører på jeres egne data. Ikke en præsentation.",
  },
  {
    n: "03",
    t: "I brug",
    s: "Vi lærer jeres folk at bruge den og justerer efter det, der virker.",
    f: "Oplæring af dem, der skal bruge den, og justeringer ud fra det, de oplever.",
  },
  {
    n: "04",
    t: "Drift",
    s: "Vi bliver hængende, drifter løsningen og bygger videre med jer.",
    f: "Drift og support fra dem, der byggede den.",
  },
];

const tillid = [
  { t: "Jeres data træner ingen modeller", s: "Hverken vores eller leverandørernes." },
  { t: "I bestemmer hvor den kører", s: "Cloud med databehandleraftale, eller alt internt." },
  { t: "Ikke bundet til én leverandør", s: "Azure OpenAI, Claude, Gemini eller åbne modeller." },
  { t: "GDPR fra første dag", s: "Ikke noget vi lapper på bagefter." },
];

/** Tæller op til tallet første gang det kommer ind på skærmen. Serveren
 *  og dem uden JavaScript ser tallet med det samme. */
function Taeller({ til, suffiks = "" }: { til: number; suffiks?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Står tallet allerede på skærmen ved indlæsning, rører vi det ikke
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = `0${suffiks}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const trin = (nu: number) => {
          const t = Math.min(1, (nu - start) / 1400);
          const e2 = 1 - Math.pow(1 - t, 4);
          el.textContent = `${Math.round(til * e2)}${suffiks}`;
          if (t < 1) raf = requestAnimationFrame(trin);
        };
        raf = requestAnimationFrame(trin);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = `${til}${suffiks}`;
    };
  }, [til, suffiks]);
  return (
    <span ref={ref} className="tabular-nums">
      {`${til}${suffiks}`}
    </span>
  );
}

export default function SaadanArbejderVi() {
  const liste = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = liste.current;
    if (!ol) return;
    const knuder = Array.from(ol.querySelectorAll<HTMLElement>("[data-knude]"));
    const punkter = Array.from(ol.querySelectorAll<HTMLElement>("[data-trin]"));
    if (!knuder.length) return;

    // Knudernes midte, målt fra listens top. Måles kun ved størrelsesskift.
    let midter: number[] = [];
    const maal = () => {
      const top = ol.getBoundingClientRect().top;
      midter = knuder.map((k) => {
        const r = k.getBoundingClientRect();
        return r.top + r.height / 2 - top;
      });
      ol.style.setProperty("--a", `${midter[0]}px`);
      ol.style.setProperty("--h", `${midter[midter.length - 1] - midter[0]}px`);
    };

    let raf = 0;
    let sidst = -2;
    const opdater = () => {
      raf = 0;
      // Læselinjen: lidt under midten af skærmen
      const linje = window.innerHeight * (window.innerWidth >= 1024 ? 0.56 : 0.62);
      const y = linje - ol.getBoundingClientRect().top;
      const h = Math.max(1, midter[midter.length - 1] - midter[0]);
      const fyld = Math.min(1, Math.max(0, (y - midter[0]) / h));
      ol.style.setProperty("--fyld", fyld.toFixed(4));
      let a = -1;
      for (let i = 0; i < midter.length; i++) if (midter[i] <= y + 1) a = i;
      if (a !== sidst) {
        sidst = a;
        ol.dataset.igang = a >= 0 ? "true" : "false";
        punkter.forEach((p, i) => {
          p.dataset.tilstand = i < a ? "forbi" : i === a ? "aktiv" : "kommende";
        });
      }
    };
    const planlaeg = () => {
      if (!raf) raf = requestAnimationFrame(opdater);
    };

    maal();
    opdater();
    ol.dataset.klar = "true";
    window.addEventListener("scroll", planlaeg, { passive: true });
    const ro = new ResizeObserver(() => {
      maal();
      planlaeg();
    });
    ro.observe(ol);
    return () => {
      window.removeEventListener("scroll", planlaeg);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section-y bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Begrundelsen står stille, mens trinnene glider forbi */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="kicker text-gray-600">Sådan arbejder vi</p>
              <OrdForOrd className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det svære er ikke modellen. Det er hverdagen.
              </OrdForOrd>
              <FadeIn delay={250} className="mt-10 border-t border-gray-200 pt-8 lg:mt-14">
                <p className="text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-display text-gray-900">
                  <Taeller til={80} suffiks="%" />
                </p>
                <p className="mt-3 max-w-[40ch] text-[0.975rem] leading-relaxed text-gray-600">
                  af AI-projekter leverer ikke den værdi, virksomheden forventede.
                  Dobbelt så mange som almindelige IT-projekter. Det er derfor vi
                  arbejder sådan her.
                </p>
                <p className="mt-2 text-xs text-gray-600">RAND Corporation, 2024</p>
              </FadeIn>
            </div>
          </div>

          <ol ref={liste} className="group/liste relative lg:col-span-7 lg:pt-3">
            {/* Stregen: spor, fyld og lampen for enden */}
            <span
              aria-hidden="true"
              className="absolute left-1 top-[var(--a,0.75rem)] hidden h-[var(--h,calc(100%_-_1.5rem))] w-px -translate-x-1/2 bg-gray-200 group-data-[klar=true]/liste:block"
            />
            <span
              aria-hidden="true"
              className="absolute left-1 top-[var(--a,0.75rem)] hidden h-[var(--h,0px)] w-px origin-top -translate-x-1/2 scale-y-[var(--fyld,0)] bg-gray-900 group-data-[klar=true]/liste:block"
            />
            <span
              aria-hidden="true"
              className="absolute left-1 top-[var(--a,0.75rem)] hidden h-2.5 w-2.5 translate-x-[-50%] translate-y-[calc(var(--fyld,0)_*_var(--h,0px)_-_50%)] bg-primary opacity-0 shadow-[0_0_0_1px_rgba(255,154,0,0.28),0_0_14px_1px_rgba(255,154,0,0.6)] transition-opacity duration-500 group-data-[igang=true]/liste:opacity-100 group-data-[klar=true]/liste:block motion-reduce:transition-none"
            />

            {trin.map((x) => (
              <li
                key={x.n}
                data-trin
                className="group/trin relative pb-14 pl-10 last:pb-0 sm:pl-14 lg:min-h-[36svh] lg:pb-16 lg:last:min-h-0 lg:last:pb-0"
              >
                <div className="relative flex items-center gap-3">
                  {/* Knuden: tom foran lampen, sort når den er passeret */}
                  <span
                    data-knude
                    aria-hidden="true"
                    className="absolute -left-10 top-1/2 h-2 w-2 -translate-y-1/2 border border-gray-300 bg-gray-50 transition-colors duration-500 group-data-[tilstand=aktiv]/trin:border-gray-900 group-data-[tilstand=aktiv]/trin:bg-gray-900 group-data-[tilstand=forbi]/trin:border-gray-900 group-data-[tilstand=forbi]/trin:bg-gray-900 motion-reduce:transition-none sm:-left-14"
                  />
                  <span className="text-sm font-semibold tabular-nums text-gray-900 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                    {x.n}
                  </span>
                  <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                  <span className="text-sm tabular-nums text-gray-500">0{trin.length}</span>
                </div>
                <h3 className="mt-4 text-[clamp(1.625rem,2.8vw,2.375rem)] font-bold leading-[1.08] tracking-display text-gray-900 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                  {x.t}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-gray-600 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                  {x.s}
                </p>
                <div className="mt-6 max-w-[46ch] border-l border-gray-300 pl-4 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[tilstand=kommende]/trin:translate-y-2 group-data-[tilstand=kommende]/trin:opacity-0 motion-reduce:transition-none">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-600">Det får I</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-gray-900">{x.f}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <FadeIn delay={120}>
          <div className="mt-20 grid gap-8 border-t border-gray-200 pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {tillid.map((x) => (
              <div key={x.t} className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2.5l6 2.25v4.5c0 3.9-2.6 7-6 8.25-3.4-1.25-6-4.35-6-8.25v-4.5L10 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M7.25 10l1.9 1.9 3.6-3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold leading-snug text-gray-900">{x.t}</p>
                  <p className="mt-1 text-sm leading-snug text-gray-600">{x.s}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
