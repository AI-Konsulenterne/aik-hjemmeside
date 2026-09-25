import { createHash } from "node:crypto";

export const runtime = "nodejs";

const MAX_BYTES = 16_384;
const WINDOW_MS = 10 * 60 * 1000;
// Best-effort per-instance limit; the production proxy should also rate-limit this route.
const attempts = new Map<string, { count: number; expires: number }>();
const deliveryError = "Vi kunne ikke sende din henvendelse. Prøv igen, eller ring til Alexander på +45 25 54 70 74.";

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid-body");
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error("body-too-large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [new URL(request.url).origin, "https://ai-konsulenterne.dk", "https://www.ai-konsulenterne.dk"];
  // Next.js may use an internal hostname in request.url behind a proxy.
  // Compare the browser origin with the actual Host header as well.
  let sameHost = false;
  try {
    const originUrl = new URL(origin || "");
    sameHost = ["https:", "http:"].includes(originUrl.protocol) && originUrl.host === request.headers.get("host");
  } catch { /* Invalid origins are rejected below. */ }
  if (origin && !allowedOrigins.includes(origin) && !sameHost) return error("Henvendelsen skal sendes fra vores hjemmeside.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return error("Ugyldigt format.", 415);

  let raw: unknown;
  try {
    raw = await readBody(request);
  } catch (cause) {
    return error("Kontrollér formularen og prøv igen.", cause instanceof Error && cause.message === "body-too-large" ? 413 : 400);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return error("Ugyldig formular.", 400);
  const body = raw as Record<string, unknown>;
  const limits: Record<string, number> = { name: 100, email: 254, company: 150, phone: 40, message: 2000, website: 200, requestId: 36 };
  for (const [key, limit] of Object.entries(limits)) {
    if (body[key] !== undefined && (typeof body[key] !== "string" || body[key].length > limit)) return error("Kontrollér formularens felter og prøv igen.", 400);
  }
  const field = (key: string) => (typeof body[key] === "string" ? body[key].trim() : "");
  const name = field("name");
  const email = field("email").toLowerCase();
  const requestId = field("requestId");
  // Honeypot: reject without pretending an enquiry was delivered.
  if (field("website")) return error("Kontrollér formularen og prøv igen.", 400);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email)) return error("Udfyld navn og en gyldig email-adresse.", 400);
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestId)) return error("Genindlæs siden og prøv igen.", 400);

  const key = process.env.RESEND_API_KEY;
  if (!key) return error(deliveryError, 503);

  const now = Date.now();
  for (const [id, entry] of attempts) if (entry.expires <= now) attempts.delete(id);
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const rateKey = createHash("sha256").update(ip).digest("hex");
  const bucket = attempts.get(rateKey) || { count: 0, expires: now + WINDOW_MS };
  if (bucket.count >= 5 || (!attempts.has(rateKey) && attempts.size >= 10_000)) {
    return Response.json({ error: "Der er sendt flere henvendelser på kort tid. Prøv igen om 10 minutter, eller ring til os." }, { status: 429, headers: { "Retry-After": "600" } });
  }
  bucket.count++;
  attempts.set(rateKey, bucket);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `website-contact/${requestId}` },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || process.env.ANALYSE_FROM_EMAIL || "AI Konsulenterne <analyse@ai-konsulenterne.dk>",
        to: [process.env.ALEXANDER_EMAIL || "alexander@ai-konsulenterne.dk"],
        reply_to: email,
        subject: "Ny henvendelse: gratis AI-afklaring",
        text: ["En besøgende vil gerne kontaktes om en gratis 45-minutters AI-afklaring.", `Navn: ${name}`, `Email: ${email}`, `Virksomhed: ${field("company") || "Ikke angivet"}`, `Telefon: ${field("phone") || "Ikke angivet"}`, "", field("message") || "Ingen besked.", "", "Kilde: hjemmesidens kontaktformular. Dette er en forespørgsel, ikke en bekræftet mødebooking."].join("\n"),
      }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== "string" || !result.id) {
      console.error("[Contact] Email provider did not accept enquiry", response.status);
      return error(deliveryError, 502);
    }
    // Accepted by the mail provider; this is not a scheduled meeting or inbox-delivery receipt.
    return Response.json({ success: true, accepted: true });
  } catch {
    console.error("[Contact] Email provider unavailable");
    return error(deliveryError, 502);
  }
}
