"use client";

import { useState } from "react";

export default function GuideForm() {
  const [company, setCompany] = useState("");
  const [challenge, setChallenge] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          message: challenge,
          source: "ai-analyse",
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
          Tak! Vi er i gang.
        </h2>
        <p className="text-gray-500">
          Vi kigger på jeres svar og vender tilbage hurtigst muligt med en
          konkret AI-analyse.
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
        hvor AI kan spare jer tid — uforpligtende.
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
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Hvor bruger I mest tid på manuelt arbejde i dag?
          </label>
          <textarea
            required
            rows={3}
            placeholder="Fx kundeservice, ordrehåndtering, rapportering, bogføring …"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
          />
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Sender…" : "Få min gratis AI-analyse"}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Ingen forpligtelser — vi sælger ikke jeres data.
        </p>
      </form>
    </>
  );
}
