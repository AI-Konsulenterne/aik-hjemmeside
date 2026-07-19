"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

export default function LeadMagnet() {
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
        body: JSON.stringify({ email }),
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

  return (
    <section className="bg-gray-900 text-white py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Content */}
          <FadeIn>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                Gratis AI-guide
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-heading leading-snug">
                10 spørgsmål der afslører hvor AI giver mest værdi i jeres virksomhed
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed">
                Et konkret værktøj I kan bruge i næste ledermøde. Ingen teori,
                ingen buzzwords — bare de spørgsmål vi selv stiller når vi finder
                AI-muligheder hos vores kunder.
              </p>
              <ul className="text-white/70 text-sm mt-6 space-y-2">
                <li className="flex gap-2 items-start">
                  <span className="text-primary">→</span> Identificér de processer hvor AI har størst effekt
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-primary">→</span> Estimér tid og penge sparet pr. proces
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-primary">→</span> Find ud af hvor I skal starte først
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={200}>
            <div>
              {submitted ? (
                <div className="bg-white/10 rounded-2xl p-8 text-center">
                  <p className="text-xl font-bold mb-2">Tak for din tilmelding!</p>
                  <p className="text-white/60">
                    Tjek din indbakke — guiden er på vej.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label htmlFor="leadmagnet-email" className="sr-only">
                    Din arbejdsmail
                  </label>
                  <input
                    id="leadmagnet-email"
                    type="email"
                    required
                    placeholder="Din arbejdsmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-white placeholder:text-white/40 w-full focus:outline-none focus:border-primary transition-colors"
                  />
                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? "Sender..." : "Hent guiden gratis"}
                  </button>
                  <p className="text-xs text-white/30 text-center">
                    Vi sender kun guiden — ingen spam.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
