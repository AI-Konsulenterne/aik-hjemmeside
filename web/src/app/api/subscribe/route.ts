import { NextRequest, NextResponse } from "next/server";

/**
 * Lead-capture endpoint.
 *
 * Primær levering: LeadAgent (vores eget interne CRM, FastAPI).
 *   POST https://leads.ai-konsulenterne.dk/webhook/lead
 *   Auth: X-API-Key header (LEADAGENT_WEBHOOK_KEY env-var)
 *   201 = oprettet, 409 = findes allerede (begge regnes som succes)
 *
 * Sekundær (valgfri): ActiveCampaign, hvis AC-env-vars er sat.
 *
 * Hvis hverken LeadAgent eller AC er konfigureret: log + returnér success
 * (gør at formularen virker i dev uden opsætning).
 */

const LEADAGENT_URL =
  process.env.LEADAGENT_WEBHOOK_URL ||
  "https://leads.ai-konsulenterne.dk/webhook/lead";
const LEADAGENT_KEY = process.env.LEADAGENT_WEBHOOK_KEY;

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL?.replace(/\/$/, "");
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
const AC_LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;
const AC_TAG = process.env.ACTIVECAMPAIGN_TAG || "ai-guide-download";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribePayload = {
  email: string;
  source?: string;
  firstName?: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
};

/**
 * Sender et lead til LeadAgent. Returnerer true hvis leadet blev
 * accepteret (201 oprettet eller 409 findes allerede).
 */
async function sendToLeadAgent(
  payload: Record<string, string | undefined>,
): Promise<{ ok: boolean; status: number; body: unknown }> {
  if (!LEADAGENT_KEY) return { ok: false, status: 0, body: "no-key" };

  // Fjern tomme felter
  const clean = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v && v.trim() !== ""),
  );

  const res = await fetch(LEADAGENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": LEADAGENT_KEY,
    },
    body: JSON.stringify(clean),
  });
  const data = await res.json().catch(() => ({}));
  // 201 = oprettet, 409 = findes allerede — begge er "leadet er registreret"
  return { ok: res.status === 201 || res.status === 409, status: res.status, body: data };
}

async function acFetch(endpoint: string, body: unknown) {
  if (!AC_URL || !AC_KEY) throw new Error("AC not configured");
  const res = await fetch(`${AC_URL}/api/3/${endpoint}`, {
    method: "POST",
    headers: {
      "Api-Token": AC_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `AC ${endpoint} failed: ${res.status} — ${JSON.stringify(data)}`,
    );
  }
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<SubscribePayload>;
    const email = body.email?.trim().toLowerCase();
    const source = body.source || "website";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Indtast en gyldig email-adresse" },
        { status: 400 },
      );
    }

    // Udled domæne fra email + find source-URL fra referer
    const domain = email.includes("@") ? email.split("@")[1] : undefined;
    const sourceUrl = req.headers.get("referer") || "https://ai-konsulenterne.dk";

    // ── Primær levering: LeadAgent ───────────────────────────────
    if (LEADAGENT_KEY) {
      try {
        const result = await sendToLeadAgent({
          company: body.company,
          domain,
          name: body.name || body.firstName,
          email,
          phone: body.phone,
          message: body.message,
          source,
          source_url: sourceUrl,
        });

        if (result.ok) {
          console.log(
            `[Lead] Sendt til LeadAgent (${result.status}) — ${email} / ${body.company || "-"} / ${source}`,
          );
          return NextResponse.json({ success: true, delivered: "leadagent" });
        }

        // Webhook svarede men ikke 201/409 — log og falder igennem til fejl
        console.error(
          `[Lead] LeadAgent afviste lead (${result.status}):`,
          JSON.stringify(result.body),
        );
        return NextResponse.json(
          {
            error:
              "Vi kunne ikke registrere din henvendelse lige nu. Prøv igen, eller ring til os på +45 25 54 70 74.",
          },
          { status: 502 },
        );
      } catch (err) {
        console.error("[Lead] LeadAgent fetch fejlede:", err);
        return NextResponse.json(
          {
            error:
              "Vi kunne ikke registrere din henvendelse lige nu. Prøv igen, eller ring til os på +45 25 54 70 74.",
          },
          { status: 502 },
        );
      }
    }

    // Hvis hverken LeadAgent eller AC er konfigureret, log og returner success
    if (!AC_URL || !AC_KEY) {
      console.log(
        `[Lead] Modtaget (ingen leveringskanal konfigureret) — email: ${email}, virksomhed: ${body.company || "-"}, source: ${source}, besked: ${body.message || "-"}`,
      );
      return NextResponse.json({
        success: true,
        mode: "dev-no-delivery",
      });
    }

    // 1. Upsert kontakt
    const syncPayload = {
      contact: {
        email,
        ...(body.firstName && { firstName: body.firstName }),
        fieldValues: [
          { field: "source", value: source },
          ...(body.company ? [{ field: "company", value: body.company }] : []),
          ...(body.message ? [{ field: "message", value: body.message }] : []),
        ],
      },
    };
    const synced = await acFetch("contact/sync", syncPayload);
    const contactId = synced?.contact?.id;

    if (!contactId) {
      throw new Error("Contact sync returned no ID");
    }

    // 2. Tilføj til liste (hvis list ID er sat) — trigger automation
    if (AC_LIST_ID) {
      await acFetch("contactLists", {
        contactList: {
          list: Number(AC_LIST_ID),
          contact: contactId,
          status: 1, // 1 = subscribed
        },
      }).catch((err) => {
        console.error("[Subscribe] List add failed (non-fatal):", err);
      });
    }

    // 3. Tilføj tag
    try {
      // Find eller opret tag
      const tagRes = await fetch(
        `${AC_URL}/api/3/tags?search=${encodeURIComponent(AC_TAG)}`,
        { headers: { "Api-Token": AC_KEY, Accept: "application/json" } },
      );
      const tagData = await tagRes.json();
      let tagId = tagData?.tags?.find(
        (t: { tag: string; id: string }) => t.tag === AC_TAG,
      )?.id;

      if (!tagId) {
        const created = await acFetch("tags", {
          tag: { tag: AC_TAG, tagType: "contact" },
        });
        tagId = created?.tag?.id;
      }

      if (tagId) {
        await acFetch("contactTags", {
          contactTag: { contact: contactId, tag: tagId },
        });
      }
    } catch (err) {
      console.error("[Subscribe] Tag add failed (non-fatal):", err);
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Subscribe] Error:", message);
    return NextResponse.json(
      { error: "Noget gik galt. Prøv igen eller skriv til os direkte." },
      { status: 500 },
    );
  }
}
