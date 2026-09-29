# Forms

Reference: `src/components/ui/NewsletterForm.tsx`, `src/components/ui/GuideForm.tsx`.

## Generelle regler

- **Mindst muligt friction.** Email + submit. Aldrig telefon, navn og firmanavn på første step medmindre nødvendigt.
- **States:** `idle` → `loading` → `success` | `error`. Vis altid en eksplicit success-state ("Tak!" + næste skridt).
- **Inline validation** kun ved submit-fejl, ikke "live" mens brugeren skriver.
- **Knappen får sin egen loading-state** — ingen separat spinner-element.

## Newsletter / Lead magnet pattern

```tsx
"use client";
import { useState, FormEvent } from "react";

export default function EmailCapture({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p className="text-gray-700">
        Tak! Vi har sendt guiden til <strong>{email}</strong>.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="din@email.dk"
        aria-label="Email"
        className="flex-1 px-4 py-3 rounded-full border border-gray-300
                   focus:border-primary focus:outline-none text-base"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 rounded-full font-semibold bg-primary text-black
                   hover:bg-primary-dark disabled:opacity-50 transition-all"
      >
        {state === "loading" ? "Sender..." : "Hent guiden"}
      </button>
      {state === "error" && (
        <p className="text-red-600 text-sm">Noget gik galt. Prøv igen.</p>
      )}
    </form>
  );
}
```

## Inputs

- **Border:** `border border-gray-300` → `focus:border-primary`
- **Radius:** `rounded-full` for korte inputs (email på én linje), `rounded-lg` for textareas
- **Padding:** `px-4 py-3`
- **Placeholder:** dansk, lower-case, eksempel-format (`din@email.dk`, ikke `Indtast din email`)

## Labels

- Aldrig kun placeholder som label — brug `aria-label` eller synlig label.
- Hvis synlig: `<label>` ovenover, `text-sm font-semibold text-gray-700 mb-2`.

## Success-copy

- ✅ *"Tak! Vi har sendt guiden til [email]."*
- ✅ *"Tak — vi vender tilbage inden for 24 timer."*
- ❌ *"Form submitted successfully."*
- ❌ *"Thank you for your submission!"*

## Error-copy

- ✅ *"Noget gik galt. Prøv igen om lidt — eller ring til os på +45 25547074."*
- ❌ *"Error: 500 Internal Server Error"*
