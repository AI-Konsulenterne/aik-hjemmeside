"use client";

import { useEffect, useState } from "react";

/**
 * Eksempelkortene: små, konkrete billeder af, hvad en løsning gør. De står
 * ved partikelscenen på forsiden og i heroen på use case-siderne. Tallene
 * er eksempler, og hvert kort siger det selv ("Eksempel").
 */

/* ------------------------------------------------------------------ */
/* Kortene. Tallene er et eksempel og siger det selv.                  */
/* ------------------------------------------------------------------ */

export function Kortramme({ titel, lys, children }: { titel: string; lys: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111316]/85 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/70">
          <span className="lamp" data-lit={lys ? "true" : "false"} />
          {titel}
        </p>
        <p className="text-[0.625rem] text-white/60">Eksempel</p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function KortKilder() {
  const r = [
    ["Personalehåndbog.pdf", "214 sider"],
    ["Delte drev", "3.812 filer"],
    ["Indbakke, HR", "1.206 mails"],
    ["CRM og økonomi", "4 systemer"],
  ];
  return (
    <Kortramme titel="Kilder i dag" lys={false}>
      <ul className="divide-y divide-white/[0.07]">
        {r.map(([a, b]) => (
          <li key={a} className="flex justify-between py-1.5 text-[0.8125rem]">
            <span className="text-white/85">{a}</span>
            <span className="tabular-nums text-white/55">{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[0.75rem] leading-snug text-white/55">Fire steder. Ingen søgning på tværs.</p>
    </Kortramme>
  );
}

export function KortIndeks({ aktiv }: { aktiv: boolean }) {
  return (
    <Kortramme titel="Læst ind" lys>
      <p className="text-[1.375rem] font-semibold leading-none tabular-nums text-white">
        2.140 <span className="text-[0.8125rem] font-normal text-white/60">dokumenter</span>
      </p>
      <p className="mt-1.5 text-[0.8125rem] tabular-nums text-white/60">18.431 afsnit med kilde</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[1600ms] ease-out"
          style={{ width: aktiv ? "100%" : "8%" }}
        />
      </div>
      <p className="mt-3 flex justify-between border-t border-white/[0.07] pt-2 text-[0.75rem] text-white/60">
        <span>Brugt til at træne en model</span>
        <span className="tabular-nums text-white">0</span>
      </p>
    </Kortramme>
  );
}

const SPOERGSMAAL = "Hvor mange feriedage har jeg tilbage?";
const SVAR = "Du har 12 feriedage tilbage. Op til 5 kan overføres til næste år.";

export function KortSvar({ aktiv }: { aktiv: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!aktiv) return;
    /* Med reduceret bevægelse står svaret færdigt med det samme. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setN(SVAR.length), 0);
      return () => window.clearTimeout(t);
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setN(i);
      if (i >= SVAR.length) window.clearInterval(id);
    }, 28);
    return () => {
      window.clearInterval(id);
      setN(0);
    };
  }, [aktiv]);
  const faerdig = n >= SVAR.length;
  return (
    <Kortramme titel="HR-agent" lys={aktiv && !faerdig}>
      <p className="text-[0.8125rem] text-white/60">
        <span className="mr-1.5 text-white/40">&gt;</span>
        {SPOERGSMAAL}
      </p>
      <p className="mt-2 min-h-[2.6rem] text-[0.875rem] leading-snug text-white">{SVAR.slice(0, n)}</p>
      <p className={`mt-2.5 border-t border-white/[0.07] pt-2 text-[0.75rem] text-white/60 transition-opacity duration-300 ${faerdig ? "opacity-100" : "opacity-0"}`}>
        Kilde: Personalehåndbog, afsnit 4.2
      </p>
    </Kortramme>
  );
}

export function KortPrognose() {
  // Ugentlig sæson, en svag trend, og en vifte efter i dag.
  const hist = Array.from({ length: 22 }, (_, i) => 36 - 14 * Math.sin((i / 7) * Math.PI * 2) - i * 0.35);
  const frem = Array.from({ length: 8 }, (_, i) => 36 - 14 * Math.sin(((22 + i) / 7) * Math.PI * 2) - (22 + i) * 0.35);
  const x = (i: number) => (i / 29) * 260;
  const sti = hist.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${v.toFixed(1)}`).join(" ");
  const fremSti = frem.map((v, i) => `${i ? "L" : "M"}${x(21 + i).toFixed(1)},${v.toFixed(1)}`).join(" ");
  const oevre = frem.map((v, i) => `${x(21 + i).toFixed(1)},${(v - 2 - i * 1.6).toFixed(1)}`);
  const nedre = frem.map((v, i) => `${x(21 + i).toFixed(1)},${(v + 2 + i * 1.6).toFixed(1)}`).reverse();
  return (
    <Kortramme titel="Prognose, næste uge" lys>
      <p className="text-[0.8125rem] text-white/60">Henvendelser til kundeservice</p>
      <svg viewBox="0 0 260 64" className="mt-2 h-16 w-full" aria-hidden="true">
        <polygon points={[...oevre, ...nedre].join(" ")} fill="rgba(255,154,0,0.22)" />
        <path d={sti} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <path d={fremSti} fill="none" stroke="#ff9a00" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1={x(21)} x2={x(21)} y1="2" y2="62" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 3" />
      </svg>
      <p className="mt-2 flex justify-between text-[0.75rem] tabular-nums">
        <span className="text-white/60">I dag</span>
        <span className="text-white">man. 157 ±12</span>
      </p>
    </Kortramme>
  );
}

const MAILS = [
  ["Hvornår kommer min pakke?", "Levering", "Besvaret"],
  ["Kan jeg bytte til en anden størrelse?", "Returnering", "Besvaret"],
  ["Min ordre er kommet i stykker", "Reklamation", "Til et menneske"],
];

export function KortIndbakke() {
  return (
    <Kortramme titel="Indbakke, kundeservice" lys>
      <ul className="divide-y divide-white/[0.07]">
        {MAILS.map(([emne, kat, status]) => (
          <li key={emne} className="py-2">
            <p className="text-[0.8125rem] leading-snug text-white/85">{emne}</p>
            <p className="mt-1 flex justify-between text-[0.6875rem] text-white/55">
              <span>{kat}</span>
              <span className={status === "Besvaret" ? "text-white/80" : "text-primary"}>{status}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[0.75rem] leading-snug text-white/55">Er den i tvivl, går mailen til et menneske.</p>
    </Kortramme>
  );
}

const TRIN_ORDRE = ["Ordre modtaget i Shopify", "Lagerstatus tjekket", "Kunden har fået besked", "Faktura sendt til bogholderiet"];

export function KortOrdre() {
  return (
    <Kortramme titel="Ordre #10482" lys>
      <ol className="space-y-2.5">
        {TRIN_ORDRE.map((t) => (
          <li key={t} className="flex items-center gap-2.5 text-[0.8125rem] text-white/85">
            <svg className="h-3.5 w-3.5 flex-none text-white/70" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t}
          </li>
        ))}
      </ol>
      <p className="mt-3 border-t border-white/[0.07] pt-2 text-[0.75rem] text-white/60">Behandlet uden at nogen rørte den.</p>
    </Kortramme>
  );
}

const ROADMAP = [
  ["HR-spørgsmål", "Høj effekt", "Nu"],
  ["Mailsortering i kundeservice", "Høj effekt", "Om 2 mdr."],
  ["Prognose på bemanding", "Mellem", "Om 4 mdr."],
];

export function KortRoadmap() {
  return (
    <Kortramme titel="Roadmap" lys>
      <ol className="divide-y divide-white/[0.07]">
        {ROADMAP.map(([navn, effekt, start], i) => (
          <li key={navn} className="grid grid-cols-[1.25rem_1fr_auto] items-baseline gap-2 py-2">
            <span className="text-[0.75rem] tabular-nums text-white/50">{i + 1}</span>
            <span className="text-[0.8125rem] leading-snug text-white/85">
              {navn}
              <span className="mt-0.5 block text-[0.6875rem] text-white/55">{effekt}</span>
            </span>
            <span className={`text-[0.6875rem] ${i === 0 ? "text-primary" : "text-white/60"}`}>{start}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[0.75rem] leading-snug text-white/55">Prioriteret efter effekt og indsats.</p>
    </Kortramme>
  );
}
