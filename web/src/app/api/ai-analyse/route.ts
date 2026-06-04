import { NextRequest, NextResponse } from "next/server";

/**
 * AI-analyse endpoint.
 *
 * Flow når en bruger udfylder AI-analyse-formularen:
 *   1. Validér input (virksomhed, udfordring, email)
 *   2. Generér en skræddersyet AI-analyse med Claude (Anthropic)
 *   3. Send analysen på email via Resend — til BÅDE kunden og Alexander
 *   4. Opret lead i LeadAgent med analysen vedhæftet
 *
 * Nødvendige env-vars:
 *   ANTHROPIC_API_KEY        — Claude API-nøgle
 *   RESEND_API_KEY           — Resend API-nøgle
 *   LEADAGENT_WEBHOOK_KEY    — (allerede sat) LeadAgent webhook
 * Valgfri:
 *   ANTHROPIC_MODEL          — default "claude-sonnet-4-5"
 *   ANALYSE_FROM_EMAIL       — default "AI Konsulenterne <analyse@ai-konsulenterne.dk>"
 *   ALEXANDER_EMAIL          — default "alexander@ai-konsulenterne.dk"
 */

export const maxDuration = 60; // analysen kan tage et par sekunder

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AnalysePayload = {
  email: string;
  company: string;
  message: string; // brugerens beskrivelse af hvor de bruger tid
  name?: string;
  // CVR-enrichment (valgfri, fra autocomplete)
  cvr?: number | string | null;
  industry?: string | null;
  employees?: number | null;
  city?: string | null;
};

const SYSTEM_PROMPT = `Du er senior AI-konsulent hos AI Konsulenterne (AIK), et dansk konsulenthus der hjælper SMV'er med at komme i gang med AI.

AIK's tone of voice: nede på jorden, ærlig, konkret, venlig og selvsikker — ALDRIG buzzword-bingo, hype eller generisk AI-snak. Skriv på dansk.

Din opgave: Ud fra en virksomheds beskrivelse af hvor de bruger mest tid på manuelt arbejde, skal du skrive en kort, konkret AI-analyse der hjælper dem i gang.

Analysen skal indeholde præcis disse afsnit, i denne rækkefølge:
1. "Det vigtigste først" — 2-3 sætninger der anerkender deres situation konkret.
2. "Hvor AI kan hjælpe jer" — 2-3 konkrete, realistiske use cases baseret på det de har beskrevet. Vær specifik, ikke generisk.
3. "Jeres første skridt" — ÉT anbefalet sted at starte (det med størst effekt og lavest risiko), med en kort begrundelse.
4. "Realistisk gevinst" — et nøgternt bud på hvad de kan spare (tid/ressourcer). Brug forsigtige formuleringer ("typisk", "ofte"), ikke garantier.

Regler:
- Maks ~350 ord i alt.
- Ingen overdrevne løfter. Vær ærlig hvis noget kræver mere afklaring.
- Afslut IKKE med en signatur eller "kontakt os" — det håndteres separat.
- Returnér KUN ren tekst med korte afsnitsoverskrifter (ingen markdown-symboler som # eller *).`;

async function generateAnalysis(
  company: string,
  challenge: string,
  context = "",
): Promise<string> {
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
      max_tokens: 1200,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Virksomhed: ${company}${context}\n\nHvor de bruger mest tid på manuelt arbejde i dag:\n${challenge}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API fejl ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error("Claude returnerede tom analyse");
  return text.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function analysisToHtml(company: string, analysis: string): string {
  const paragraphs = analysis
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      // Heading-linje: enten "## ..." eller en linje der er helt omsluttet af **...**
      const headingMatch =
        trimmed.match(/^#{1,3}\s*(.+)$/) ||
        trimmed.match(/^\*\*(.+?)\*\*$/);
      if (headingMatch) {
        return `<h2 style="font-size:16px;color:#171717;margin:24px 0 8px;">${escapeHtml(headingMatch[1].trim())}</h2>`;
      }
      // Almindeligt afsnit — konvertér **fed** → <strong> og linjeskift → <br>
      const html = escapeHtml(trimmed)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
      return `<p style="margin:0 0 16px;line-height:1.6;color:#404040;">${html}</p>`;
    })
    .join("");

  return `<!DOCTYPE html><html lang="da"><body style="margin:0;background:#fafafa;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="margin-bottom:24px;">
      <span style="font-size:24px;font-weight:bold;color:#ff9a00;">AI</span>
      <span style="font-size:14px;font-weight:bold;letter-spacing:1px;color:#ff9a00;text-transform:uppercase;"> KONSULENTERNE</span>
    </div>
    <div style="background:#ffffff;border-radius:16px;padding:32px;border:1px solid #f0f0f0;">
      <h1 style="font-size:22px;color:#171717;margin:0 0 8px;">Jeres AI-analyse</h1>
      <p style="font-size:14px;color:#a3a3a3;margin:0 0 24px;">Lavet til ${company}</p>
      ${paragraphs}
      <a href="https://ai-konsulenterne.dk/kontakt" style="display:inline-block;margin-top:16px;background:#ff9a00;color:#ffffff;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:999px;">Book en gratis snak med Alexander</a>
    </div>
    <p style="font-size:12px;color:#a3a3a3;text-align:center;margin-top:24px;line-height:1.5;">
      Denne analyse er et første udgangspunkt — vil I have den uddybet, så tag fat i os.<br>
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend fejl ${res.status}: ${err.slice(0, 300)}`);
  }
  return res.json();
}

async function sendToLeadAgent(payload: Record<string, string | undefined>) {
  if (!LEADAGENT_KEY) return;
  const clean = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v && v.trim() !== ""),
  );
  await fetch(LEADAGENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": LEADAGENT_KEY,
    },
    body: JSON.stringify(clean),
  }).catch((e) => console.error("[AI-analyse] LeadAgent fejl:", e));
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<AnalysePayload>;
    const email = body.email?.trim().toLowerCase();
    const company = body.company?.trim();
    // Udfordrings-feltet er valgfrit — fald tilbage til en generel formulering
    const challenge =
      body.message?.trim() ||
      "De har ikke uddybet, hvor de bruger mest tid - giv en generel AI-analyse ud fra virksomhedens navn og branche.";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Indtast en gyldig email-adresse" },
        { status: 400 },
      );
    }
    if (!company) {
      return NextResponse.json(
        { error: "Udfyld venligst jeres virksomhedsnavn" },
        { status: 400 },
      );
    }

    const domain = email.split("@")[1];
    const sourceUrl = req.headers.get("referer") || "https://ai-konsulenterne.dk/ai-guide";

    // CVR-enrichment → kontekst til Claude + note på leadet
    const cvrBits = [
      body.industry ? `Branche: ${body.industry}` : null,
      body.employees ? `Antal ansatte: ${body.employees}` : null,
      body.city ? `By: ${body.city}` : null,
      body.cvr ? `CVR: ${body.cvr}` : null,
    ].filter(Boolean);
    const cvrContext = cvrBits.length ? `\n${cvrBits.join("\n")}` : "";

    // 1. Generér analysen med Claude
    let analysis: string;
    try {
      analysis = await generateAnalysis(company, challenge, cvrContext);
    } catch (err) {
      console.error("[AI-analyse] Generering fejlede:", err);
      // Fald tilbage: gem stadig leadet, så Alexander kan følge op manuelt
      await sendToLeadAgent({
        company,
        domain,
        name: body.name,
        email,
        message: `[AI-analyse formular — auto-analyse fejlede]\n\nDe bruger mest tid på:\n${challenge}`,
        source: "ai-analyse",
        source_url: sourceUrl,
      });
      return NextResponse.json(
        {
          error:
            "Vi kunne ikke generere analysen lige nu, men vi har modtaget jeres henvendelse og vender tilbage hurtigst muligt.",
        },
        { status: 502 },
      );
    }

    // 2. Send email til kunde + Alexander
    const html = analysisToHtml(company, analysis);
    const emailErrors: string[] = [];
    try {
      await sendEmail([email], "Jeres AI-analyse fra AI Konsulenterne", html);
    } catch (err) {
      emailErrors.push(`kunde: ${err instanceof Error ? err.message : err}`);
    }
    try {
      await sendEmail(
        [ALEXANDER_EMAIL],
        `Ny AI-analyse: ${company}`,
        `<p style="font-family:sans-serif;">Ny AI-analyse genereret via hjemmesiden.</p>
         <p style="font-family:sans-serif;"><strong>Virksomhed:</strong> ${company}<br>
         <strong>Email:</strong> ${email}</p>
         <p style="font-family:sans-serif;"><strong>De bruger mest tid på:</strong><br>${challenge}</p>
         <hr>${html}`,
      );
    } catch (err) {
      emailErrors.push(`alexander: ${err instanceof Error ? err.message : err}`);
    }
    if (emailErrors.length) {
      console.error("[AI-analyse] Email-fejl:", emailErrors.join(" | "));
    }

    // 3. Opret lead i LeadAgent med analysen + CVR-data vedhæftet
    await sendToLeadAgent({
      company,
      domain,
      name: body.name,
      industry: body.industry ?? undefined,
      message: `De bruger mest tid på:\n${challenge}${cvrContext ? `\n\n— CVR-data —${cvrContext}` : ""}\n\n— AI-analyse sendt automatisk —\n${analysis}`,
      email,
      source: "ai-analyse",
      source_url: sourceUrl,
    });

    return NextResponse.json({
      success: true,
      emailDelivered: emailErrors.length === 0,
    });
  } catch (error) {
    console.error("[AI-analyse] Uventet fejl:", error);
    return NextResponse.json(
      { error: "Noget gik galt. Prøv igen, eller ring til os på +45 25 54 70 74." },
      { status: 500 },
    );
  }
}
