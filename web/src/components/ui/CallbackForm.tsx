"use client";

import { useState } from "react";

const whenOptions = ["I dag", "I morgen", "Senere på ugen"] as const;

const fieldClass =
  "w-full rounded-[12px] border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function CallbackForm({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [when, setWhen] = useState<(typeof whenOptions)[number]>("I dag");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ring-op", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, company, when }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
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
      <div className={`bg-sand rounded-[20px] p-7 lg:p-10 ${className}`} role="status">
        <p className="text-xl font-bold tracking-heading text-gray-900">
          Tak, {name.split(" ")[0]}. Vi har fået dit nummer.
        </p>
        <p className="text-body text-gray-700 mt-2">
          Vi ringer dig op ({when.toLowerCase()}).
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-sand rounded-[20px] p-7 lg:p-10 ${className}`}
    >
      <h2 className="text-2xl font-bold tracking-heading text-gray-900">
        Bliv ringet op
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Navn</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Telefon</span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Virksomhed</span>
          <input
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-gray-900 mb-2">
          Hvornår passer det bedst?
        </legend>
        <div className="flex flex-wrap gap-2">
          {whenOptions.map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name="when"
                value={opt}
                checked={when === opt}
                onChange={() => setWhen(opt)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-red-700 mt-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
      >
        {loading ? "Sender..." : "Ring mig op"}
      </button>
      <p className="text-sm text-gray-500 mt-4">
        Vi bruger kun jeres oplysninger til at ringe jer op. Læs vores{" "}
        <a href="/privatlivspolitik" className="underline hover:text-gray-900">
          privatlivspolitik
        </a>
        .
      </p>
    </form>
  );
}
