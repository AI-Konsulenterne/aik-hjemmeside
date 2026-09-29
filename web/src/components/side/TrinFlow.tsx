"use client";

import { useEffect, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";

/**
 * Et forløb i trin, fortalt mens man scroller. Samme bevægelse som
 * "Sådan arbejder vi" på forsiden, som komponent til undersiderne: en
 * streg fyldes i sort, sektionens ene tændte lampe sidder for enden af
 * den, og hvert trin bliver skarpt og viser "Det får I", når lampen når
 * det. Overskriften står stille til venstre.
 *
 * Ingen React-state under scroll: tilstanden skrives som data-attributter
 * og CSS-variabler. Uden JavaScript står alle trin fuldt fremme.
 */

export type Trin = { titel: string; tekst: string; faar?: string };

export default function TrinFlow({
  kicker,
  titel,
  tekst,
  trin,
  graa = false,
  children,
}: {
  kicker: string;
  titel: string;
  tekst?: string;
  trin: Trin[];
  graa?: boolean;
  children?: React.ReactNode;
}) {
  const liste = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = liste.current;
    if (!ol) return;
    const knuder = Array.from(ol.querySelectorAll<HTMLElement>("[data-knude]"));
    const punkter = Array.from(ol.querySelectorAll<HTMLElement>("[data-trin]"));
    if (!knuder.length) return;
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
      const linje = window.innerHeight * (window.innerWidth >= 1024 ? 0.56 : 0.62);
      const y = linje - ol.getBoundingClientRect().top;
      const h = Math.max(1, midter[midter.length - 1] - midter[0]);
      ol.style.setProperty("--fyld", Math.min(1, Math.max(0, (y - midter[0]) / h)).toFixed(4));
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

  const bg = graa ? "bg-gray-50" : "bg-white";

  return (
    <section className={`section-y ${bg}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="kicker text-gray-600">{kicker}</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                {titel}
              </OrdForOrd>
              {(tekst || children) && (
                <FadeIn delay={250}>
                  {tekst && <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-gray-600">{tekst}</p>}
                  {children}
                </FadeIn>
              )}
            </div>
          </div>

          <ol ref={liste} className="group/liste relative lg:col-span-7 lg:pt-3">
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
            {trin.map((x, i) => (
              <li
                key={x.titel}
                data-trin
                className="group/trin relative pb-14 pl-10 last:pb-0 sm:pl-14 lg:min-h-[32svh] lg:pb-16 lg:last:min-h-0 lg:last:pb-0"
              >
                <div className="relative flex items-center gap-3">
                  <span
                    data-knude
                    aria-hidden="true"
                    className="absolute -left-10 top-1/2 h-2 w-2 -translate-y-1/2 border border-gray-300 bg-white transition-colors duration-500 group-data-[tilstand=aktiv]/trin:border-gray-900 group-data-[tilstand=aktiv]/trin:bg-gray-900 group-data-[tilstand=forbi]/trin:border-gray-900 group-data-[tilstand=forbi]/trin:bg-gray-900 motion-reduce:transition-none sm:-left-14"
                  />
                  <span className="text-sm font-semibold tabular-nums text-gray-900 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                  <span className="text-sm tabular-nums text-gray-500">{String(trin.length).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-[clamp(1.625rem,2.8vw,2.375rem)] font-bold leading-[1.08] tracking-display text-gray-900 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                  {x.titel}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-gray-600 transition-colors duration-500 group-data-[tilstand=kommende]/trin:text-gray-500 motion-reduce:transition-none">
                  {x.tekst}
                </p>
                {x.faar && (
                  <div className="mt-6 max-w-[46ch] border-l border-gray-300 pl-4 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[tilstand=kommende]/trin:translate-y-2 group-data-[tilstand=kommende]/trin:opacity-0 motion-reduce:transition-none">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-600">Det får I</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-gray-900">{x.faar}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
