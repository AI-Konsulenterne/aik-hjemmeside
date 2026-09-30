"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { trackLeadConversion } from "@/lib/analytics";

export default function ContactForm() {
  const id = useId();
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);
  const submission = useRef<{ payload: string; requestId: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (submitted) resultRef.current?.focus();
    else if (error) errorRef.current?.focus();
  }, [submitted, error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const data = new FormData(event.currentTarget);
    const fields = Object.fromEntries(["name", "email", "company", "phone", "message", "website"].map((key) => [key, String(data.get(key) || "").trim()]));
    if (!fields.name || !fields.email) {
      setError("Udfyld navn og email, så vi kan kontakte dig.");
      return;
    }
    sending.current = true;
    setPending(true);
    setError("");
    try {
      const payload = JSON.stringify(fields);
      if (submission.current?.payload !== payload) submission.current = { payload, requestId: crypto.randomUUID() };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({ ...fields, requestId: submission.current.requestId }),
      });
      const result = await response.json();
      if (!response.ok || result?.success !== true || result?.accepted !== true) {
        setError(typeof result?.error === "string" ? result.error : "Din henvendelse blev ikke sendt. Prøv igen, eller ring til os.");
        return;
      }
      setSubmitted(true);
      // Only accepted enquiries are conversions. Contact details never go to analytics.
      trackLeadConversion("contact");
    } catch {
      setError("Vi kunne ikke bekræfte, at henvendelsen blev sendt. Prøv igen, eller ring til os.");
    } finally {
      sending.current = false;
      setPending(false);
    }
  }

  if (submitted) return (
    <div ref={resultRef} tabIndex={-1} role="status" className="py-6 focus:outline-none">
      <div aria-hidden="true" className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-2xl text-gray-900">✓</div>
      <h3 className="text-2xl font-bold tracking-heading text-gray-900">Tak for din henvendelse</h3>
      <p className="mt-3 text-gray-600 leading-relaxed">Alexander vender tilbage, så I kan finde en tid til jeres gratis AI-afklaring. Mødet er først booket, når I har aftalt en tid.</p>
      <a href="tel:+4525547074" className="mt-6 inline-block font-semibold text-gray-900 underline underline-offset-4">Vil du tale nu? Ring på +45 25 54 70 74</a>
    </div>
  );

  const inputClass = "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60";
  return (
    <form onSubmit={submit} aria-busy={pending} className="text-left">
      <h3 className="text-2xl font-bold tracking-heading text-gray-900">Få en gratis AI-afklaring</h3>
      <p className="mt-3 mb-6 text-gray-600 leading-relaxed">Skriv til os her. Alexander kontakter dig, så I kan aftale 45 minutter om jeres muligheder med AI. Helt uforpligtende.</p>
      <fieldset disabled={pending} className="space-y-5">
        <legend className="sr-only">Dine kontaktoplysninger</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor={`${id}-name`} className="text-sm font-semibold">Navn</label><input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100} className={inputClass} /></div>
          <div><label htmlFor={`${id}-email`} className="text-sm font-semibold">Email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor={`${id}-company`} className="text-sm font-semibold">Virksomhed <span className="font-normal text-gray-500">(valgfrit)</span></label><input id={`${id}-company`} name="company" autoComplete="organization" maxLength={150} className={inputClass} /></div>
          <div><label htmlFor={`${id}-phone`} className="text-sm font-semibold">Telefon <span className="font-normal text-gray-500">(valgfrit)</span></label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} /></div>
        </div>
        <div><label htmlFor={`${id}-message`} className="text-sm font-semibold">Hvad vil I gerne have hjælp til? <span className="font-normal text-gray-500">(valgfrit)</span></label><textarea id={`${id}-message`} name="message" rows={3} maxLength={2000} className={`${inputClass} resize-y`} /></div>
        <div hidden aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
        <p className="text-xs text-gray-500 leading-relaxed">Vi bruger oplysningerne til at besvare din henvendelse. Du bliver ikke tilmeldt et nyhedsbrev. <Link href="/privatlivspolitik" className="underline underline-offset-2">Læs vores privatlivspolitik.</Link></p>
        {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm text-gray-900 focus:outline-none">{error}</p>}
        <button type="submit" disabled={pending} className="w-full rounded-full bg-primary px-6 py-4 font-semibold text-black transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60">{pending ? "Sender…" : "Kontakt mig om en gratis AI-afklaring"}</button>
      </fieldset>
      <p className="mt-5 text-sm text-gray-600">Vil du hellere ringe? <a href="tel:+4525547074" className="font-semibold text-gray-900 underline underline-offset-4">+45 25 54 70 74</a></p>
    </form>
  );
}
