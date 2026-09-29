# Farver

> Kilde: AIK Brand Guideline v1.0 (2024), afsnit D — udvidet med UI-grays fra det eksisterende site.

AI-Konsulenterne anvender et **simpelt, rent farveskema** udelukkende bestående af én primær farve — en mild og varm orange — sat i fokus af sort og hvid.

## Brand-farver

| Rolle | Hex | Brug |
|---|---|---|
| **Primær** | `#ff9a00` | CTAs, accent-linjer, hover-effekter, logo, fokus |
| Primær (dark) | `#e68a00` | Hover-state på primær-knapper |
| **Sekundær (sort)** | `#000000` | Tekst på hvid baggrund, logo på hvid baggrund |
| **Sekundær (hvid)** | `#ffffff` | Baggrund (default), tekst på orange/sort |

## UI gray-skala

Tilføjet til de oprindelige tre brand-farver for praktisk UI-arbejde (subtile borders, deaktiverede states, sekundær tekst). Disse er **ikke** brand-farver — de er hjælpe-tokens og må aldrig erstatte den primære orange som accent.

| Token | Hex | Typisk brug |
|---|---|---|
| `gray-50` | `#fafafa` | Sektion-baggrunde, kort |
| `gray-100` | `#f5f5f5` | Meget lyse panels |
| `gray-200` | `#e5e5e5` | Borders |
| `gray-300` | `#d4d4d4` | Inputs borders, dividers |
| `gray-400` | `#a3a3a3` | Placeholder-tekst, ikoner |
| `gray-500` | `#737373` | Sekundær tekst |
| `gray-600` | `#525252` | Brødtekst (sjælden) |
| `gray-700` | `#404040` | Stærk tekst |
| `gray-800` | `#262626` | Næsten-sort tekst |
| `gray-900` | `#171717` | Tekst (prefer over `black` for blødere udtryk) |

## Brugsregler

1. **Orange er accent — ikke baggrund.** Store orange flader bruges kun bevidst (CTA-sektioner, hero-detaljer, branded zones). Default baggrund er hvid.
2. **Sort/hvid sætter orange i fokus.** Begræns paletten. Tilføj aldrig en accent-farve "for variation."
3. **Ingen lilla gradients.** Det er den klassiske "generisk AI"-fælde — vi gør det modsatte.
4. **Hover på primary-knap:** `#ff9a00` → `#e68a00` (10% mørkere).
5. **Selection-color:** semi-transparent orange (`rgba(255, 154, 0, 0.2)`) — allerede sat globalt.
6. **Focus-ring:** 2px solid `#ff9a00` med 2px offset.

## Tilgængelighed

- `#ff9a00` på hvid: kontrastforhold **2,13:1**. Det dumper WCAG AA for al tekst, også store overskrifter (kravet for stor tekst er 3:1). Orange bærer derfor aldrig tekst på lyse flader; brug den dekorativt (prikker, streger, lamper, ikoner ved siden af tekst).
- Tekst **på** orange er altid sort: `#000` på `#ff9a00` giver **9,9:1**. Hvid tekst på orange giver 2,13:1 og bruges ikke.
- Orange tekst på mørke flader er fint: `#ff9a00` på `#0a0a0a` giver ca. 9,3:1.
- `#171717` på hvid: kontrastforhold >15:1 — opfylder WCAG AAA.
- Tjek altid kontrast når du sætter orange tekst på hvid.

## Token-filer

- CSS variabler: [`../tokens/colors.css`](../tokens/colors.css)
- Tailwind v4 `@theme inline`: [`../tokens/tailwind-theme.css`](../tokens/tailwind-theme.css)
- JSON: [`../tokens/tokens.json`](../tokens/tokens.json)
