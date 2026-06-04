import { NextRequest, NextResponse } from "next/server";

/**
 * CVR-opslag via det gratis danske cvrapi.dk.
 * GET /api/cvr?q=<virksomhedsnavn>
 * Returnerer det bedste match med branche, antal ansatte, by m.m.
 * Bruges til autocomplete/enrichment på AI-analyse-formularen.
 */

const UA = "AI-Konsulenterne-website/1.0 (kontakt@ai-konsulenterne.dk)";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ found: false });
  }

  try {
    const res = await fetch(
      `https://cvrapi.dk/api?name=${encodeURIComponent(q)}&country=dk`,
      {
        headers: { "User-Agent": UA },
        // CVR-data ændrer sig sjældent — cache 1 time
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return NextResponse.json({ found: false });

    const data = await res.json();

    // cvrapi returnerer { error: "..." } hvis intet match
    if (!data || data.error || !data.name) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      name: data.name,
      vat: data.vat ?? null,
      industry: data.industrydesc ?? null,
      industrycode: data.industrycode ?? null,
      employees: data.employees ?? null,
      city: data.city ?? null,
      zipcode: data.zipcode ?? null,
      address: data.address ?? null,
    });
  } catch (err) {
    console.error("[CVR] opslag fejlede:", err);
    return NextResponse.json({ found: false });
  }
}
