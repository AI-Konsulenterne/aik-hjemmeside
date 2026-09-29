"use client";

import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Glider blødt ind første gang, elementet kommer ind på skærmen.
 *
 * Indholdet står fremme fra serveren og skjules først, når JavaScript kører
 * og elementet ligger under folden. Før var det skjult fra start, så uden
 * JavaScript stod dele af siden tomme, og det, der allerede var på skærmen
 * ved indlæsning, ventede på hydrering, før det kom frem.
 *
 * Bevægelsen: 24 px op, et lille slør der letter, og samme kurve som resten
 * af siden (hurtig start, lang blød landing). prefers-reduced-motion: ingen
 * bevægelse, indholdet står bare der.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilstand, setTilstand] = useState<"start" | "skjult" | "vist">("start");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Første svar kommer med det samme: ligger elementet under folden,
    // skjules det, ellers bliver det bare stående.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTilstand("vist");
          observer.disconnect();
        } else {
          setTilstand((t) => (t === "start" ? "skjult" : t));
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bevaegelse =
    tilstand === "vist"
      ? "transition-[opacity,translate,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      : tilstand === "skjult"
        ? "translate-y-6 opacity-0 blur-[4px]"
        : "";

  return (
    <div
      ref={ref}
      className={`${bevaegelse} motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:transition-none ${className}`}
      style={tilstand === "vist" && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
