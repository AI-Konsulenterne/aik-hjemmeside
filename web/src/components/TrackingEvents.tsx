"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Global event-tracking, der ikke hører til en specifik komponent.
 * Lige nu: delegeret lytter på alle tel:-links sitewide → "phone_click".
 */
export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.(
        'a[href^="tel:"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      trackEvent("phone_click", {
        phone_number: link.getAttribute("href")?.replace("tel:", "") ?? "",
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
