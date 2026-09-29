# Tailwind v4 Setup (AIK)

Tailwind v4 erstatter `tailwind.config.js` med inline `@theme` i CSS. Sådan sætter du et nyt AIK-projekt op.

## 1. Installation

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

## 2. PostCSS-config

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

## 3. globals.css

Kopiér indholdet fra [`../tokens/tailwind-theme.css`](../tokens/tailwind-theme.css) ind i `src/app/globals.css`.

## 4. Importér globals.css

I `src/app/layout.tsx`:

```tsx
import "./globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={raleway.variable}>
      <body>{children}</body>
    </html>
  );
}
```

## 5. Verifikation

I en komponent:

```tsx
<button className="bg-primary text-black px-6 py-3 rounded-full font-semibold">
  Test
</button>
```

Hvis baggrunden er `#ff9a00` og fonten er Raleway — du er klar.

## Hvad du IKKE behøver

- ❌ `tailwind.config.js` — Tailwind v4 har det ikke længere
- ❌ `@tailwind base; @tailwind components; @tailwind utilities;` — erstattet af `@import "tailwindcss";`
- ❌ Separate `colors.js` eller plugin-filer for tokens — alt ligger i `@theme inline`

## Versioner brugt på AIK

Bekræftet at virke på:
- Next.js 16.x (App Router)
- React 19.x
- Tailwind CSS v4
- @tailwindcss/postcss
