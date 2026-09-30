"use client";

import { useEffect } from "react";
import { trackContactIntent } from "@/lib/analytics";

/**
 * Global event-tracking, der ikke hører til en specifik komponent.
 * Telefon- og e-mail-klik er hensigtssignaler, aldrig lead-konverteringer.
 */
export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.(
        'a[href^="tel:"], a[href^="mailto:"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      trackContactIntent(link.getAttribute("href")?.startsWith("tel:") ? "phone" : "email");
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
