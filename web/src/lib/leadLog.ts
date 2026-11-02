/**
 * Cookiefri lead-tracking.
 *
 * Sitet bruger ikke GA4 eller cookies (beslutning 1/10-2026). I stedet får
 * hver Slack-notifikation fra en lead-formular en fast "LEAD-LOG"-linje, så
 * leads kan tælles automatisk (Slack-søgning i #leads) i SEO-dashboardet og
 * månedsrapporten.
 *
 * Der gemmes intet i brugerens browser. Vi bruger kun:
 *   - siden formularen blev sendt fra (Referer-headeren på selve POST'en)
 *   - document.referrer på den side - dvs. hvor besøgeren kom fra lige før
 *     siden blev åbnet. Kom de via en intern side, står der "internt".
 * Kun hostnavnet beholdes (fx "www.google.com"), aldrig den fulde URL.
 */

const SITE_HOSTS = ["ai-konsulenterne.dk", "www.ai-konsulenterne.dk"];

function pathOf(url: string | null | undefined): string {
  if (!url) return "ukendt";
  try {
    return new URL(url).pathname || "/";
  } catch {
    return "ukendt";
  }
}

/** Reducér en referrer-URL til en kort kildebetegnelse. */
export function sourceFromReferrer(ref: unknown): string {
  if (typeof ref !== "string" || ref.trim() === "") return "direkte/ukendt";
  let host: string;
  try {
    host = new URL(ref).hostname.toLowerCase();
  } catch {
    return "direkte/ukendt";
  }
  if (SITE_HOSTS.includes(host) || host.endsWith(".vercel.app")) return "internt";
  if (/(^|\.)google\./.test(host)) return "google";
  if (/(^|\.)bing\.com$/.test(host)) return "bing";
  if (/(^|\.)duckduckgo\.com$/.test(host)) return "duckduckgo";
  if (/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/.test(host)) return "linkedin";
  if (/(^|\.)facebook\.com$|(^|\.)instagram\.com$/.test(host)) return "meta";
  if (/chatgpt\.com$|openai\.com$|perplexity\.ai$|claude\.ai$|copilot\.microsoft\.com$|gemini\.google\.com$/.test(host)) {
    return `ai-assistent (${host})`;
  }
  return host.slice(0, 80);
}

/**
 * Den faste linje der sættes under hver lead-notifikation i Slack.
 * Format: "LEAD-LOG · formular: ring-op · side: /kontakt · kom fra: google"
 */
export function leadLogLine(opts: {
  form: string;
  pageUrl: string | null | undefined;
  referrer: unknown;
}): string {
  return `_LEAD-LOG · formular: ${opts.form} · side: ${pathOf(opts.pageUrl)} · kom fra: ${sourceFromReferrer(opts.referrer)}_`;
}
