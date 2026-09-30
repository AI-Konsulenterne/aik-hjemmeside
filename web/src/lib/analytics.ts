type EventParams = Record<string, unknown>;
type ConsentCategory = "statistics" | "marketing";
type PixelQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };
export type LeadForm = "contact" | "callback" | "lead-magnet" | "ai-analyse-guide";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    Cookiebot?: {
      consent?: {
        statistics?: boolean;
        marketing?: boolean;
        method?: string | null;
      };
      renew?: () => void;
    };
    oaiq?: PixelQueue;
    [key: `ga-disable-${string}`]: boolean;
  }
}

const consentEvents = [
  "CookiebotOnConsentReady",
  "CookiebotOnAccept",
  "CookiebotOnDecline",
];
let configuredGaId: string | undefined;
let configuredPixelId: string | undefined;
let pixelReady = false;

export function hasTrackingConsent(category: ConsentCategory): boolean {
  if (typeof window === "undefined") return false;
  const consent = window.Cookiebot?.consent;
  return consent?.method === "explicit" && consent[category] === true;
}

/** Events uden samtykke kasseres; de gemmes ikke til senere afsendelse. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (!hasTrackingConsent("statistics")) return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    // Måling må aldrig få en ellers gennemført formular til at fejle.
  }
}

/** Kaldes kun efter at serveren har bekræftet levering af henvendelsen. */
export function trackLeadConversion(form: LeadForm): void {
  trackEvent("generate_lead", { form });
  if (!configuredPixelId || !pixelReady || !hasTrackingConsent("marketing")) return;
  try {
    window.oaiq?.("measure", "lead_created", { type: "customer_action" });
  } catch {
    // Ingen genafsendelse eller personoplysninger i målingen.
  }
}

/** Et klik viser hensigt, ikke en gennemført henvendelse. */
export function trackContactIntent(method: "phone" | "email"): void {
  trackEvent(method === "phone" ? "phone_click" : "email_click");
}

/**
 * Loader først målescripts efter udtrykkeligt Cookiebot-samtykke.
 * Manglende Cookiebot eller ID betyder, at den pågældende måling er slået fra.
 */
export function startAnalytics({
  gaId,
  openaiPixelId,
}: {
  gaId?: string;
  openaiPixelId?: string;
}): () => void {
  if (typeof window === "undefined") return () => {};

  const syncConsent = () => {
    const statistics = hasTrackingConsent("statistics");
    const marketing = hasTrackingConsent("marketing");

    if (gaId) {
      // Stopper også GA's automatiske events efter tilbagetrukket samtykke.
      window[`ga-disable-${gaId}`] = !statistics;
      window.gtag?.("consent", "update", {
        analytics_storage: statistics ? "granted" : "denied",
      });

      if (statistics && configuredGaId !== gaId) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
          // gtag bruger argument-objekter i dataLayer.
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
        configuredGaId = gaId;
        window.gtag("js", new Date());
        window.gtag("config", gaId, {
          anonymize_ip: true,
          cookie_flags: "SameSite=None;Secure",
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
        const script = document.createElement("script");
        script.id = "ga4-loader";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
        script.dataset.cookieconsent = "statistics";
        document.head.appendChild(script);
      }
    }

    if (!openaiPixelId) return;
    if (configuredPixelId) {
      window.oaiq?.("consent", marketing);
    } else if (marketing) {
      // Dokumenteret OpenAI-kø. Den indeholder kun init/samtykke, aldrig leads.
      const queue: PixelQueue = (...args) => { queue.q!.push(args); };
      queue.q = [];
      window.oaiq = window.oaiq || queue;
      window.oaiq("consent", false);
      window.oaiq("init", { pixelId: openaiPixelId });
      window.oaiq("consent", true);
      configuredPixelId = openaiPixelId;
      const script = document.createElement("script");
      script.id = "openai-measurement-pixel";
      script.async = true;
      script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
      script.dataset.cookieconsent = "marketing";
      script.onload = () => {
        pixelReady = true;
        window.oaiq?.("consent", hasTrackingConsent("marketing"));
      };
      document.head.appendChild(script);
    }
  };

  syncConsent();
  for (const event of consentEvents) window.addEventListener(event, syncConsent);
  return () => {
    for (const event of consentEvents) window.removeEventListener(event, syncConsent);
  };
}

/**
 * Ingen navne, e-mails, telefonnumre eller formulardata sendes via helpers.
 * Pixelens automatiske avancerede matching styres separat i Ads Manager;
 * se CONVERSION-SETUP.md før NEXT_PUBLIC_OPENAI_PIXEL_ID aktiveres.
 */

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
