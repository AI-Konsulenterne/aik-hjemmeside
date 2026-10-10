"use client";

import { useEffect, useState } from "react";

// Typiske steder, "hvor skoen trykker". Roterer i kortet ved Alexanders foto.
const tips = [
  { area: "Kundeservice", task: "Svar på de samme mails igen og igen" },
  { area: "Salg", task: "Tilbud, der tager en halv dag at lave" },
  { area: "Viden", task: "Svar, der ligger gemt i mapper og dokumenter" },
  { area: "HR", task: "Onboarding af nye medarbejdere" },
  { area: "Drift", task: "Rapporter, der bygges fra bunden hver uge" },
];

const ROTATE_MS = 3500;
const FADE_MS = 350;

export default function HeroPainCard({ className = "" }: { className?: string }) {
  const [tip, setTip] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let fade: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setShown(false);
      fade = setTimeout(() => {
        setTip((t) => (t + 1) % tips.length);
        setShown(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      clearInterval(id);
      clearTimeout(fade);
    };
  }, []);

  const t = tips[tip];

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl px-5 py-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.10)] flex flex-col gap-3 ${className}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
        Hvor trykker skoen hos jer?
      </p>
      <div
        className="min-h-12 flex flex-col gap-1 transition-all duration-[350ms] ease-out"
        style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(6px)" }}
        aria-live="polite"
      >
        <span className="text-[13px] font-bold text-primary-dark">{t.area}</span>
        <span className="text-base font-semibold text-gray-900 leading-[1.35]">{t.task}</span>
      </div>
      <div className="flex gap-[5px]" aria-hidden="true">
        {tips.map((x, i) => (
          <span
            key={x.area}
            className={`h-[3px] rounded-[3px] transition-all duration-300 ${i === tip ? "bg-primary" : "bg-gray-200"}`}
            style={{ width: i === tip ? 20 : 6 }}
          />
        ))}
      </div>
    </div>
  );
}
