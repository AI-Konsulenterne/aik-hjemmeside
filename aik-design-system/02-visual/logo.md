# Logo

> Kilde: AIK Brand Guideline v1.0 (2024), afsnit D.

## Udgaver

Der findes **to former** af logoet:

1. **Lang udgave** — `AI|KONSULENTERNE` med orange understregning. Bruges til bannere, headers, breve, dokumenter.
2. **Kort udgave (icon)** — `AI` + lille `K`. Bruges til profilbilleder på sociale medier, favicons, små kontekster.

Og **tre primære farveudgaver:**

| Variant | Brug |
|---|---|
| **Sort** (`#000000`) | På hvid baggrund |
| **Orange** (`#ff9a00`) | På hvid baggrund |
| **Hvid** (`#ffffff`) | På sort eller farvet baggrund — **dette er det primære logo og skal oftest anvendes hvor muligt** |

## Filer

**De officielle vektorer (fra AIK, 30/9 2026), brug dem:**

- [`aik-lang-officiel.svg`](../assets/logo/aik-lang-officiel.svg) — lang udgave, hvid (573,13 x 83,49)
- [`aik-kort-officiel.svg`](../assets/logo/aik-kort-officiel.svg) — kort udgave, hvid (146,26 x 82,78)

Farven skiftes ved at ændre `fill` (eller tegne dem med `currentColor`, som
sitet gør). I sitet ligger de som `web/public/logo/aik-lang.svg` og
`aik-kort.svg`, og navigationen, footeren, favicon og OG-billederne tegnes ud
fra dem via `web/src/components/ui/logo-data.ts`. Det korte logos A, I og K
står præcis som i det lange (målt pixel for pixel), så de kan folde over i
hinanden.

Filerne nedenfor er ældre, håndtegnede efterligninger (den korte er skrevet
med Raleway-tekst). Brug dem ikke:

- `logo-full-black.svg` — sort, lang
- `logo-full-orange.svg` — orange, lang (= eksisterende `public/logo-full.svg`)
- `logo-full-white.svg` — hvid, lang
- `logo-icon-black.svg` — sort, kort
- `logo-icon-orange.svg` — orange, kort (= eksisterende `public/logo-icon.svg`)
- `logo-icon-white.svg` — hvid, kort

(`public/logo-full.svg` og `public/logo-icon.svg` i sitet er de samme efterligninger og bruges ikke længere.)

## Filtyper

- **`.svg`** — primær. Skalerbar, bruges til hjemmeside, PDF-dokumenter, alt digitalt.
- **`.png`** — kun når SVG ikke kan bruges (gammelt billed-software, social media uploads der kræver raster).

## Do's & Don'ts

### ✅ Do

- Behold originale proportioner.
- Vælg farveudgaven der giver bedst kontrast til baggrunden.
- Brug hvid udgave på orange/farvet/sort baggrund.
- Giv logoet "luft" — undgå at klemme det op mod tekst eller kanter.

### ❌ Don't

- **Stræk ikke logoet** ud af form. Det skal altid beholde sine originale proportioner.
- **Skift ikke farve** på logoet, medmindre det er blevet diskuteret og godkendt i forbindelse med specifikke events (fx pink i forbindelse med Støt Brysterne).
- **Lav ikke ændringer** af logoets design — fjern ikke elementer, tilføj ikke skygger, modificér ikke understregningen.
- Brug ikke logoet på en baggrund der gør det svært at læse.
- Roter ikke logoet, brug ikke 3D-effekter, drop ikke skygger, brug ikke gradient-fyld.

## Minimum size

- Lang udgave: minimum bredde **120px** for læsbarhed.
- Kort udgave (icon): minimum **32px**.

## Clear space

Hold mindst en `K`-bogstavhøjde fri rundt om logoet — ingen tekst eller grafik må trænge tættere på.
