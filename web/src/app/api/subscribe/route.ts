import { NextRequest, NextResponse } from "next/server";

/**
 * ActiveCampaign subscribe endpoint.
 *
 * Flow:
 *   1. Validerer email
 *   2. Sync kontakt i AC (opret eller opdater eksisterende)
 *   3. Tilføj kontakt til liste (ACTIVECAMPAIGN_LIST_ID) → triggerer automation med PDF
 *   4. Tilføj tag til kontakt (til segmentering)
 *
 * Hvis AC_URL/AC_KEY ikke er sat: endpoint returnerer success men logger kun.
 * Det gør at form virker i dev uden AC-opsætning.
 */

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL?.replace(/\/$/, "");
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
const AC_LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;
const AC_TAG = process.env.ACTIVECAMPAIGN_TAG || "ai-guide-download";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribePayload = {
  email: string;
  source?: string;
  firstName?: string;
  company?: string;
  message?: string;
};

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
    const source = body.source || "ai-guide-download";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Indtast en gyldig email-adresse" },
        { status: 400 },
      );
    }

    // Hvis AC ikke er konfigureret, log og returner success
    if (!AC_URL || !AC_KEY) {
      console.log(
        `[Subscribe] Lead modtaget (AC ikke konfigureret) — email: ${email}, virksomhed: ${body.company || "-"}, source: ${source}, besked: ${body.message || "-"}`,
      );
      return NextResponse.json({
        success: true,
        mode: "dev-no-ac",
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
