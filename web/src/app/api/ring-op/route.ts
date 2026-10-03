import { NextRequest, NextResponse } from "next/server";

/**
 * Ring-op-formularen på /kontakt.
 *
 * Samme leveringskanaler som /api/subscribe og /api/ai-analyse:
 *   - LeadAgent (X-API-Key, LEADAGENT_WEBHOOK_KEY)
 *   - Email til Alexander via Resend (RESEND_API_KEY)
 *   - Slack (SLACK_WEBHOOK_URL)
 *
 * Henvendelsen regnes som modtaget, hvis mindst én kanal tager imod den.
 * Er ingen kanal konfigureret (dev), logges den og der svares success.
 */

const LEADAGENT_URL =
  process.env.LEADAGENT_WEBHOOK_URL ||
  "https://leads.ai-konsulenterne.dk/webhook/lead";
const LEADAGENT_KEY = process.env.LEADAGENT_WEBHOOK_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL =
  process.env.ANALYSE_FROM_EMAIL ||
  "AI Konsulenterne <analyse@ai-konsulenterne.dk>";
const ALEXANDER_EMAIL =
  process.env.ALEXANDER_EMAIL || "alexander@ai-konsulenterne.dk";
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const WHEN_OPTIONS = ["I dag", "I morgen", "Senere på ugen"] as const;

type Payload = {
  name: string;
  phone: string;
  company?: string;
  when?: string;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendToLeadAgent(payload: Record<string, string | undefined>) {
  if (!LEADAGENT_KEY) return false;
  const clean = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v && v.trim() !== ""),
  );
  const res = await fetch(LEADAGENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": LEADAGENT_KEY },
    body: JSON.stringify(clean),
  });
  if (res.status === 201 || res.status === 409) return true;
  console.error(`[Ring op] LeadAgent afviste (${res.status}):`, (await res.text()).slice(0, 300));
  return false;
}

async function emailAlexander(subject: string, html: string) {
  if (!RESEND_KEY) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to: [ALEXANDER_EMAIL], subject, html }),
  });
  if (res.ok) return true;
  console.error(`[Ring op] Resend fejl ${res.status}:`, (await res.text()).slice(0, 200));
  return false;
}

async function notifySlack(text: string) {
  if (!SLACK_WEBHOOK_URL) return false;
  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = body.name?.trim().slice(0, 120);
    const phone = body.phone?.trim().slice(0, 40);
    const company = body.company?.trim().slice(0, 160) || undefined;
    const when = WHEN_OPTIONS.find((w) => w === body.when) || "Ikke angivet";

    if (!name) {
      return NextResponse.json({ error: "Skriv dit navn" }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json({ error: "Skriv et gyldigt telefonnummer" }, { status: 400 });
    }

    const sourceUrl = req.headers.get("referer") || "https://ai-konsulenterne.dk/kontakt";
    const summary = `Ring op: ${when}\nNavn: ${name}\nTelefon: ${phone}\nVirksomhed: ${company || "-"}`;

    if (!LEADAGENT_KEY && !RESEND_KEY && !SLACK_WEBHOOK_URL) {
      console.log(`[Ring op] Modtaget (ingen leveringskanal konfigureret)\n${summary}`);
      return NextResponse.json({ success: true, mode: "dev-no-delivery" });
    }

    const results = await Promise.allSettled([
      sendToLeadAgent({
        name,
        phone,
        company,
        message: `Ønsker at blive ringet op: ${when}`,
        source: "ring-op",
        source_url: sourceUrl,
      }),
      emailAlexander(
        `Ring op: ${name}${company ? ` (${company})` : ""} - ${when}`,
        `<p style="font-family:sans-serif;white-space:pre-line;">${escapeHtml(summary)}</p>
         <p style="font-family:sans-serif;"><a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}">Ring ${escapeHtml(phone)}</a></p>`,
      ),
      notifySlack(`:telephone_receiver: Ring op (${when}): *${name}*${company ? ` · ${company}` : ""} · ${phone}`),
    ]);

    results.forEach((r) => {
      if (r.status === "rejected") console.error("[Ring op] Kanal fejlede:", r.reason);
    });
    const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

    if (!delivered) {
      return NextResponse.json(
        { error: "Vi kunne ikke modtage din henvendelse lige nu. Ring til os på +45 25 54 70 74." },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Ring op] Uventet fejl:", error);
    return NextResponse.json(
      { error: "Noget gik galt. Ring til os på +45 25 54 70 74." },
      { status: 500 },
    );
  }
}
