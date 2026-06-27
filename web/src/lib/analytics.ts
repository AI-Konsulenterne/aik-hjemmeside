/**
 * Letvægts-wrapper til GA4-events (gtag).
 *
 * window.gtag defineres af Analytics-komponenten (Consent Mode v2). Events
 * respekterer samtykke automatisk: er statistik-consent ikke givet, holder
 * Cookiebot/Consent Mode dem tilbage.
 */

type EventParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/**
 * Registrerer en lytter på Cal.com's "bookingSuccessful"-event, så en
 * gennemført booking fyrer et GA4-event. Kaldes efter Cal er initialiseret.
 * Module-level flag sikrer, at den kun registreres én gang pr. side.
 */
let calBookingRegistered = false;

export function registerCalBookingTracking(): void {
  if (calBookingRegistered || typeof window === "undefined") return;
  const cal = (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal;
  if (typeof cal !== "function") return;
  calBookingRegistered = true;
  try {
    cal("on", {
      action: "bookingSuccessful",
      callback: () => trackEvent("cal_booking", { method: "cal.com" }),
    });
  } catch {
    calBookingRegistered = false;
  }
}
