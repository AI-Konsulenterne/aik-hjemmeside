"use client";

import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// Serveren renderer altid indholdet synligt: det, der er på skærmen ved
// indlæsning, må ikke vente på JavaScript (LCP). Kun elementer under folden
// skjules efter mount og toner ind, når de scrolles frem.
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motion =
    phase === "hidden"
      ? "opacity-0 translate-y-8"
      : phase === "shown"
        ? "transition-all duration-700 ease-out opacity-100 translate-y-0"
        : "";

  return (
    <div
      ref={ref}
      className={`${motion} ${className}`}
      style={phase === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
