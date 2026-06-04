import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, buildUserMessage, type AnalyseInput } from "@/lib/analyse-prompt";

/**
 * AI-analyse lead magnet endpoint.
 *
 * Flow når en bruger udfylder 4-trins formularen:
 *   1. Validér struktureret input
 *   2. Generér en personlig rapport med 3 use cases via Claude
 *   3. Send rapporten på email (kunde + Alexander) via Resend
 *   4. Notificér intern Slack-kanal (hvis konfigureret)
 *   5. Opret lead i LeadAgent med rapport + data vedhæftet
 *
 * Env-vars:
 *   ANTHROPIC_API_KEY (påkrævet), RESEND_API_KEY (påkrævet),
 *   LEADAGENT_WEBHOOK_KEY, SLACK_WEBHOOK_URL (valgfri),
 *   ANTHROPIC_MODEL, ANALYSE_FROM_EMAIL, ALEXANDER_EMAIL
 */

export const maxDuration = 60;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL =
  process.env.ANALYSE_FROM_EMAIL ||
  "AI Konsulenterne <analyse@ai-konsulenterne.dk>";
const ALEXANDER_EMAIL =
  process.env.ALEXANDER_EMAIL || "alexander@ai-konsulenterne.dk";
const LEADAGENT_URL =
  process.env.LEADAGENT_WEBHOOK_URL ||
  "https://leads.ai-konsulenterne.dk/webhook/lead";
const LEADAGENT_KEY = process.env.LEADAGENT_WEBHOOK_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = AnalyseInput & {
  company: string;
  name: string;
  email: string;
  bookCall?: boolean;
};

async function generateReport(input: AnalyseInput): Promise<string> {
  if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY mangler");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1500,
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: buildUserMessage(input) }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API fejl ${res.status}: ${err.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error("Claude returnerede tom rapport");
  return text.trim();
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// Renderer markdown-rapporten (## , ### , - punkter, **fed**) til HTML.
function reportToHtml(company: string, report: string, withCalendar: boolean): string {
  const lines = report.split("\n");
  let html = "";
  let inList = false;
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html += `<h3 style="font-size:16px;color:#171717;margin:20px 0 6px;">${inline(line.slice(4))}</h3>`;
    } else if (line.startsWith("## ")) {
      closeList();
      html += `<h2 style="font-size:18px;color:#171717;margin:26px 0 8px;">${inline(line.slice(3))}</h2>`;
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html += `<ul style="margin:0 0 12px;padding-left:18px;color:#404040;line-height:1.6;">`;
        inList = true;
      }
      html += `<li style="margin-bottom:4px;">${inline(line.slice(2))}</li>`;
    } else {
      closeList();
      html += `<p style="margin:0 0 14px;line-height:1.6;color:#404040;">${inline(line)}</p>`;
    }
  }
  closeList();

  const calendar = withCalendar
    ? `<div style="margin-top:20px;padding:16px;background:#fff7ed;border-radius:12px;">
         <p style="margin:0 0 10px;color:#404040;font-size:14px;">I bad om at blive ringet op - book gerne 20 minutter med det samme:</p>
         <a href="https://ai-konsulenterne.dk/kontakt" style="display:inline-block;background:#ff9a00;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px;">Book et møde</a>
       </div>`
    : `<a href="https://ai-konsulenterne.dk/kontakt" style="display:inline-block;margin-top:16px;background:#ff9a00;color:#fff;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:999px;">Book en gratis snak</a>`;

  return `<!DOCTYPE html><html lang="da"><body style="margin:0;background:#fafafa;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="margin-bottom:24px;">
      <span style="font-size:24px;font-weight:bold;color:#ff9a00;">AI</span>
      <span style="font-size:14px;font-weight:bold;letter-spacing:1px;color:#ff9a00;text-transform:uppercase;"> KONSULENTERNE</span>
    </div>
    <div style="background:#ffffff;border-radius:16px;padding:32px;border:1px solid #f0f0f0;">
      <h1 style="font-size:22px;color:#171717;margin:0 0 4px;">Jeres 3 AI use cases</h1>
      <p style="font-size:14px;color:#a3a3a3;margin:0 0 20px;">Lavet til ${escapeHtml(company)}</p>
      ${html}
      ${calendar}
    </div>
    <p style="font-size:12px;color:#a3a3a3;text-align:center;margin-top:24px;line-height:1.5;">
      Denne rapport er et første udgangspunkt - vil I have den uddybet, så tag fat i os.<br>
      AI Konsulenterne · +45 25 54 70 74 · kontakt@ai-konsulenterne.dk
    </p>
  </div></body></html>`;
}

async function sendEmail(to: string[], subject: string, html: string) {
  if (!RESEND_KEY) throw new Error("RESEND_API_KEY mangler");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend fejl ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function sendToLeadAgent(payload: Record<string, string | undefined>) {
  if (!LEADAGENT_KEY) return;
  const clean = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v && v.trim() !== ""),
  );
  await fetch(LEADAGENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": LEADAGENT_KEY },
    body: JSON.stringify(clean),
  }).catch((e) => console.error("[AI-analyse] LeadAgent fejl:", e));
}

async function notifySlack(text: string) {
  if (!SLACK_WEBHOOK_URL) return;
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).catch((e) => console.error("[AI-analyse] Slack fejl:", e));
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const email = body.email?.trim().toLowerCase();
    const company = body.company?.trim();
    const name = body.name?.trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Indtast en gyldig email-adresse" }, { status: 400 });
    }
    if (!company || !name) {
      return NextResponse.json({ error: "Udfyld venligst virksomhed og navn" }, { status: 400 });
    }

    const input: AnalyseInput = {
      branche: body.branche || "Ikke angivet",
      stoerrelse: body.stoerrelse || "Ikke angivet",
      tidsforbrug: Array.isArray(body.tidsforbrug) ? body.tidsforbrug : [],
      systemer: Array.isArray(body.systemer) ? body.systemer : [],
      friTekst: body.friTekst?.trim() || undefined,
    };
    const bookCall = !!body.bookCall;
    const sourceUrl = req.headers.get("referer") || "https://ai-konsulenterne.dk/ai-guide";

    const leadSummary =
      `Branche: ${input.branche} · Størrelse: ${input.stoerrelse}\n` +
      `Tidsforbrug: ${input.tidsforbrug.join(", ") || "-"}\n` +
      `Systemer: ${input.systemer.join(", ") || "-"}\n` +
      `Booket samtale: ${bookCall ? "ja" : "nej"}` +
      (input.friTekst ? `\nVil helst løse: ${input.friTekst}` : "");

    // 1. Generér rapport
    let report: string;
    try {
      report = await generateReport(input);
    } catch (err) {
      console.error("[AI-analyse] Generering fejlede:", err);
      // Fallback: gem lead + send fallback-mail + høj-prioritet Slack
      await sendToLeadAgent({
        company, name, email, domain: email.split("@")[1],
        message: `[RAPPORT FEJLEDE - følg op manuelt]\n${leadSummary}`,
        source: "ai-analyse", source_url: sourceUrl,
      });
      await notifySlack(`:rotating_light: Rapport-generering FEJLEDE for ${company} (${email}) - følg op manuelt.\n${leadSummary}`);
      try {
        await sendEmail([email],
          "Tak for jeres henvendelse - AI Konsulenterne",
          `<p style="font-family:sans-serif;">Tak fordi I udfyldte formularen. Vi vender tilbage manuelt med jeres 3 AI use cases inden for 24 timer.</p>`);
      } catch {}
      return NextResponse.json({ success: true, fallback: true });
    }

    // 2. Email til kunde + Alexander
    const html = reportToHtml(company, report, bookCall);
    const emailErrors: string[] = [];
    try {
      await sendEmail([email], "Jeres 3 AI use cases - fra AI Konsulenterne", html);
    } catch (err) {
      emailErrors.push(`kunde: ${err instanceof Error ? err.message : err}`);
    }
    try {
      await sendEmail([ALEXANDER_EMAIL], `Nyt lead: ${company}`,
        `<p style="font-family:sans-serif;"><strong>${escapeHtml(name)}</strong> · ${escapeHtml(email)}</p>
         <p style="font-family:sans-serif;white-space:pre-line;">${escapeHtml(leadSummary)}</p><hr>${html}`);
    } catch (err) {
      emailErrors.push(`alexander: ${err instanceof Error ? err.message : err}`);
    }
    if (emailErrors.length) console.error("[AI-analyse] Email-fejl:", emailErrors.join(" | "));

    // 3. Slack-notifikation
    await notifySlack(
      `:tada: Nyt lead: *${company}* (${input.branche}, ${input.stoerrelse})\n` +
      `Kontakt: ${name} · ${email}\n` +
      `Tidsforbrug: ${input.tidsforbrug.join(", ") || "-"}\n` +
      `Systemer: ${input.systemer.join(", ") || "-"}\n` +
      `Booket samtale: ${bookCall ? "ja" : "nej"}` +
      (input.friTekst ? `\n> ${input.friTekst}` : ""),
    );

    // 4. Lead i LeadAgent med rapport vedhæftet
    await sendToLeadAgent({
      company, name, email, domain: email.split("@")[1],
      message: `${leadSummary}\n\n— Genereret rapport —\n${report}`,
      source: "ai-analyse", source_url: sourceUrl,
    });

    return NextResponse.json({ success: true, emailDelivered: emailErrors.length === 0, bookCall });
  } catch (error) {
    console.error("[AI-analyse] Uventet fejl:", error);
    return NextResponse.json(
      { error: "Noget gik galt. Prøv igen, eller ring til os på +45 25 54 70 74." },
      { status: 500 },
    );
  }
}
