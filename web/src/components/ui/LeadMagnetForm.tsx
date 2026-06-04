"use client";

import { useState, useEffect, useRef } from "react";
import CalBooking from "./CalBooking";

const BRANCHER = [
  "Produktion",
  "Handel / e-commerce",
  "Service & rådgivning",
  "Bygge & anlæg",
  "Sundhed & pleje",
  "Offentlig",
  "Andet",
];
const STOERRELSER = ["1-10", "11-50", "51-200", "200+"];
const TIDSFORBRUG = [
  "Kundeservice & support",
  "Tilbud & ordrer",
  "Fakturering & bogføring",
  "Rapportering & dataudtræk",
  "Møder & referater",
  "Dokumenter & kontrakter",
  "Salg & opsøgende arbejde",
  "HR & rekruttering",
  "Intern videndeling",
  "Marketing & content",
  "Andet",
];
const SYSTEMER = [
  "Microsoft 365",
  "Google Workspace",
  "ERP (Business Central / Dynamics / Navision)",
  "CRM (HubSpot / Pipedrive / Salesforce)",
  "Bogføring (e-conomic / Dinero / Billy)",
  "SharePoint / Intranet / fildrev",
  "Andet",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left text-sm rounded-xl px-4 py-3 ring-1 transition-colors ${
        active
          ? "bg-primary/10 ring-primary text-gray-900 font-semibold"
          : "bg-white ring-gray-200 text-gray-600 hover:ring-primary/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function LeadMagnetForm() {
  const [step, setStep] = useState(1);
  const [branche, setBranche] = useState("");
  const [stoerrelse, setStoerrelse] = useState("");
  const [tidsforbrug, setTidsforbrug] = useState<string[]>([]);
  const [systemer, setSystemer] = useState<string[]>([]);
  const [friTekst, setFriTekst] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookCall, setBookCall] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // CVR-opslag på virksomhedsfeltet
  const [cvr, setCvr] = useState<{ name: string; industry?: string | null; city?: string | null } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (company.trim().length < 2) {
      setCvr(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cvr?q=${encodeURIComponent(company.trim())}`);
        const d = await res.json();
        setCvr(d.found ? d : null);
      } catch {
        setCvr(null);
      }
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [company]);

  function toggle(arr: string[], setArr: (v: string[]) => void, value: string, max?: number) {
    if (arr.includes(value)) {
      setArr(arr.filter((v) => v !== value));
    } else {
      if (max && arr.length >= max) return;
      setArr([...arr, value]);
    }
  }

  const stepValid: Record<number, boolean> = {
    1: !!branche && !!stoerrelse,
    2: tidsforbrug.length >= 1 && tidsforbrug.length <= 3,
    3: systemer.length >= 1,
    4: !!company.trim() && !!name.trim() && EMAIL_REGEX.test(email),
  };

  function next() {
    setError("");
    if (!stepValid[step]) {
      setError("Udfyld venligst feltet/felterne for at fortsætte.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stepValid[4] || loading) {
      if (!stepValid[4]) setError("Udfyld venligst virksomhed, navn og en gyldig email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branche,
          stoerrelse,
          tidsforbrug,
          systemer,
          friTekst,
          company,
          name,
          email,
          bookCall,
          source: "ai-analyse",
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Noget gik galt");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  // ── Takkeside ──
  if (submitted) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-heading mb-2">Tak! Jeres rapport er på vej.</h2>
        <p className="text-gray-500 mb-8">
          Tjek din indbakke om et øjeblik - vi har sendt jeres 3 konkrete AI use cases.
        </p>
        <div className="border-t border-gray-100 pt-8 text-left">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Mens I venter - book 20 minutter med os
          </p>
          <p className="text-sm text-gray-500 mb-5">
            Så går vi dybere ind i den case I synes lyder mest interessant.
          </p>
          <CalBooking className="min-h-[520px]" layout="month_view" />
        </div>
      </div>
    );
  }

  // ── Formular ──
  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest">
          Trin {step} af 4
        </p>
        <p className="text-xs text-gray-400">{Math.round((step / 4) * 100)}%</p>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Trin 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Branche</label>
              <select
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black bg-white focus:outline-none focus:border-primary"
              >
                <option value="">Vælg branche…</option>
                {BRANCHER.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Antal medarbejdere</label>
              <select
                value={stoerrelse}
                onChange={(e) => setStoerrelse(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black bg-white focus:outline-none focus:border-primary"
              >
                <option value="">Vælg…</option>
                {STOERRELSER.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Trin 2 */}
        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Hvor bruger I mest tid? <span className="font-normal text-gray-400">(vælg op til 3)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {TIDSFORBRUG.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  active={tidsforbrug.includes(t)}
                  onClick={() => toggle(tidsforbrug, setTidsforbrug, t, 3)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trin 3 */}
        {step === 3 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Hvilke systemer bruger I?
            </label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {SYSTEMER.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={systemer.includes(s)}
                  onClick={() => toggle(systemer, setSystemer, s)}
                />
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Den ene opgave I helst vil løse først{" "}
                <span className="font-normal text-gray-400">(valgfri)</span>
              </label>
              <textarea
                rows={2}
                value={friTekst}
                onChange={(e) => setFriTekst(e.target.value)}
                placeholder="Beskriv kort den opgave der tager mest tid eller giver mest hovedpine…"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* Trin 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Virksomhed</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Jeres virksomhedsnavn"
                autoComplete="organization"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
              {cvr && cvr.name !== company && (
                <button
                  type="button"
                  onClick={() => { setCompany(cvr.name); setCvr(null); }}
                  className="mt-2 w-full text-left bg-primary/5 ring-1 ring-primary/20 rounded-xl px-4 py-2.5 hover:bg-primary/10 transition-colors"
                >
                  <span className="block text-sm font-semibold text-gray-900">{cvr.name}</span>
                  <span className="block text-xs text-gray-500">
                    {[cvr.industry, cvr.city].filter(Boolean).join(" · ")}
                  </span>
                </button>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Navn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dit navn"
                autoComplete="name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Arbejdsmail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dig@virksomhed.dk"
                autoComplete="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={bookCall}
                onChange={(e) => setBookCall(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-600">Ring mig op og book direkte</span>
            </label>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="text-sm font-semibold text-gray-500 hover:text-gray-900 px-4 py-3"
            >
              Tilbage
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark transition-colors"
            >
              Videre
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Genererer jeres forslag…" : "Få vores 3 forslag"}
            </button>
          )}
        </div>

        {step === 4 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Tager 30 sekunder. Vi sender rapporten på mail inden for få minutter.
          </p>
        )}
      </form>
    </div>
  );
}
