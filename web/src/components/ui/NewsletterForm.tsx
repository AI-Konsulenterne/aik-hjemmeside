"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
  dark?: boolean;
};

export default function NewsletterForm({
  source = "footer-newsletter",
  compact = true,
  dark = false,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Noget gik galt");
      setStatus("success");
      setEmail("");
      trackEvent("newsletter_signup", { source });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Noget gik galt");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
        <span className="text-primary font-semibold">Tak!</span> Du hører fra os
        snart.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${compact ? "flex-col sm:flex-row" : "flex-col"} gap-2`}
    >
      <label htmlFor={`newsletter-email-${source}`} className="sr-only">
        Email
      </label>
      <input
        id={`newsletter-email-${source}`}
        type="email"
        required
        placeholder="din@email.dk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className={`flex-1 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-60 ${
          dark
            ? "bg-white/5 border border-white/15 text-white placeholder:text-gray-500"
            : "bg-white border border-gray-200 placeholder:text-gray-400"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-primary text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === "loading" ? "..." : "Tilmeld"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1 col-span-full">{error}</p>
      )}
    </form>
  );
}
