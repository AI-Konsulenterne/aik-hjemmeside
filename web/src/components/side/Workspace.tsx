"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "@/components/ui/Button";
import { KortSvar } from "@/components/side/EksempelKort";

/**
 * De levende dele af siden om AIK Workspace: prisberegneren og
 * HR-agentens svar, der skrives ud, når kortet kommer ind i billedet.
 *
 * Prisen er den samme som i den tidligere beregner: 150 kr. pr. bruger om
 * måneden, og pr. bruger følger 3 mio. tokens, 200 søgninger og 1,2 GB
 * hukommelse med.
 */

const da = (n: number) => n.toLocaleString("da-DK");

const MIN = 10;
const MAKS = 150;
const PRIS = 150;

export function PrisBeregner() {
  const [n, setN] = useState(25);
  const pct = ((n - MIN) / (MAKS - MIN)) * 100;
  const hukommelse = da(Math.round(n * 1.2 * 10) / 10);

  return (
    <div className="rounded-3xl bg-white p-7 ring-1 ring-black/[0.06] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.35)] sm:p-10">
      <div className="flex items-baseline justify-between gap-6">
        <label htmlFor="pris-antal" className="text-[0.9375rem] font-semibold text-gray-900">
          Antal medarbejdere
        </label>
        <output htmlFor="pris-antal" className="text-[2.25rem] font-bold leading-none tabular-nums tracking-display text-gray-900">
          {n}
        </output>
      </div>
      <input
        id="pris-antal"
        type="range"
        min={MIN}
        max={MAKS}
        value={n}
        onChange={(e) => setN(+e.target.value)}
        className="pris-slider mt-6"
        style={{ "--pct": `${pct}%` } as CSSProperties}
      />
      <div className="mt-1 flex justify-between text-[0.8125rem] tabular-nums text-gray-500">
        <span>{MIN}</span>
        <span>{MAKS}</span>
      </div>

      <dl className="mt-8 grid grid-cols-3 divide-x divide-gray-200 border-y border-gray-200">
        {[
          ["Tokens", `${da(n * 3)} mio.`],
          ["Søgninger", da(n * 200)],
          ["Hukommelse", `${hukommelse} GB`],
        ].map(([l, v]) => (
          <div key={l} className="flex flex-col-reverse gap-1 px-4 py-5 first:pl-0">
            <dt className="text-[0.8125rem] text-gray-600">{l} med i prisen</dt>
            <dd className="text-lg font-bold tabular-nums tracking-heading text-gray-900">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.8125rem] text-gray-600">Pr. måned for hele virksomheden</p>
          <p className="mt-1 text-[clamp(2.5rem,5vw,3.25rem)] font-bold leading-none tabular-nums tracking-display text-gray-900" aria-live="polite">
            {da(n * PRIS)} kr.
          </p>
          <p className="mt-2 text-[0.8125rem] text-gray-600">{PRIS} kr. pr. bruger</p>
        </div>
        <Button href="/kontakt" size="lg">
          Book en demo
        </Button>
      </div>
    </div>
  );
}

/** HR-agentens svar skrives ud første gang, kortet er i billedet. */
export function SynligSvar() {
  const ref = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAktiv(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <KortSvar aktiv={aktiv} />
    </div>
  );
}
