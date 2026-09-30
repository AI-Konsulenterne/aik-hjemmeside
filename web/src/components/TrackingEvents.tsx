"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const CTA_SELECTOR =
  'a[href="/kontakt"], a[href^="/kontakt#"], a[href="/ai-guide"], a[href="#kontakt"], a[href$="#lektion"]';

function placementOf(el: Element): string {
  const explicit = el.closest<HTMLElement>("[data-cta-placement]")?.dataset
    .ctaPlacement;
  if (explicit) return explicit;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section");
  if (!section) return "other";
  if (section.id) return section.id;
  const index = Array.from(document.querySelectorAll("section")).indexOf(section);
  return `section-${index + 1}`;
}

/**
 * Global event-tracking, der ikke hører til en specifik komponent:
 * delegerede lyttere på tel:-links ("phone_click") og på alle knapper til
 * booking og gratis AI-analyse ("cta_click" med tekst og placering).
 */
export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      const tel = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (tel) {
        trackEvent("phone_click", {
          phone_number: tel.getAttribute("href")?.replace("tel:", "") ?? "",
          cta_placement: placementOf(tel),
        });
        return;
      }

      const cta = target?.closest?.(CTA_SELECTOR) as HTMLAnchorElement | null;
      if (cta) {
        trackEvent("cta_click", {
          cta_label: (cta.innerText || "").trim().replace(/\s+/g, " "),
          cta_destination: cta.getAttribute("href") ?? "",
          cta_placement: placementOf(cta),
        });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
