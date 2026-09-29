"use client";

import { useEffect, useRef } from "react";

/** Tæller op til tallet første gang det kommer ind på skærmen. Serveren
 *  og dem uden JavaScript ser tallet med det samme. */
export default function Taeller({ til, suffiks = "" }: { til: number; suffiks?: string }) {
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
