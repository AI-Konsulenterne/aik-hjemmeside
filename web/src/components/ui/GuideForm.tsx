"use client";

import { useState, useEffect, useRef } from "react";

type CvrMatch = {
  found: boolean;
  name?: string;
  vat?: number | null;
  industry?: string | null;
  employees?: number | null;
  city?: string | null;
  zipcode?: string | null;
  address?: string | null;
};

export default function GuideForm() {
  const [company, setCompany] = useState("");
  const [challenge, setChallenge] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // CVR-opslag / enrichment
  const [cvr, setCvr] = useState<CvrMatch | null>(null);
  const [confirmedCvr, setConfirmedCvr] = useState<CvrMatch | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced CVR-opslag når virksomhedsnavnet ændres
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Skjul forslag hvis allerede bekræftet med samme navn
    if (confirmedCvr && confirmedCvr.name === company) {
      setCvr(null);
      return;
    }
    if (company.trim().length < 2) {
      setCvr(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cvr?q=${encodeURIComponent(company.trim())}`);
        const data: CvrMatch = await res.json();
        setCvr(data.found ? data : null);
      } catch {
        setCvr(null);
      }
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [company, confirmedCvr]);

  function selectCvr(match: CvrMatch) {
    setCompany(match.name || company);
    setConfirmedCvr(match);
    setCvr(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          message: challenge,
          source: "ai-analyse",
          cvr: confirmedCvr?.vat ?? null,
          industry: confirmedCvr?.industry ?? null,
          employees: confirmedCvr?.employees ?? null,
          city: confirmedCvr?.city ?? null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Noget gik galt");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-heading mb-2">
          Tak! Jeres AI-analyse er på vej.
        </h2>
        <p className="text-gray-500">
          Tjek din indbakke om et øjeblik — vi har sendt en konkret AI-analyse
          baseret på jeres svar. Alexander følger op hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold tracking-heading mb-2">
        Få jeres gratis AI-analyse
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Fortæl os kort om jer, så vender vi tilbage med konkrete forslag til
        hvor I bør starte jeres rejse med AI.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Virksomhed
          </label>
          <input
            type="text"
            required
            placeholder="Jeres virksomhedsnavn"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
          />

          {/* CVR-forslag */}
          {cvr && cvr.found && (
            <button
              type="button"
              onClick={() => selectCvr(cvr)}
              className="mt-2 w-full text-left bg-primary/5 ring-1 ring-primary/20 rounded-xl px-4 py-2.5 hover:bg-primary/10 transition-colors"
            >
              <span className="block text-sm font-semibold text-gray-900">
                {cvr.name}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                {[cvr.industry, cvr.city, cvr.vat ? `CVR ${cvr.vat}` : null]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </button>
          )}

          {/* Bekræftet CVR-match */}
          {confirmedCvr && confirmedCvr.name === company && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Fundet i CVR
              {confirmedCvr.industry ? ` · ${confirmedCvr.industry}` : ""}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Arbejdsmail
          </label>
          <input
            type="email"
            required
            placeholder="dig@virksomhed.dk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Hvor trykker skoene mest?{" "}
            <span className="font-normal text-gray-400">(valgfri)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Fx kundeservice, ordrehåndtering, rapportering, bogføring …"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Genererer jeres analyse…" : "Få min gratis AI-analyse"}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Tager 30 sekunder. Vi vender tilbage inden for 24 timer.
        </p>
      </form>
    </>
  );
}
