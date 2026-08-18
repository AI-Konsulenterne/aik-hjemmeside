# CLAUDE.md — AI Konsulenterne (AIK) Ny Hjemmeside

---

## 🎨 Design System

Før **enhver** design-, copy- eller branded UI-opgave skal du læse [`aik-design-system/CLAUDE.md`](aik-design-system/CLAUDE.md).

Den mappe er den autoritative reference for AIKs brand, voice, farver, typografi og komponent-mønstre. Den distillerer den officielle Brand Guideline v1.0 (2024) til kode-førstedokumentation.

---

## ⚠️ REGEL #1: CLAUDE MÅ ALDRIG LYVE OM HVAD DEN HAR GJORT

Efter ENHVER handling skal Claude verificere med konkret bevis:

```bash
# Efter oprettelse af fil:
ls -la path/to/file && echo "✅ Bekræftet"

# Efter at have skrevet kode:
cat path/to/file | head -30

# Efter at have kørt en kommando:
# Vis det faktiske terminal-output — ikke bare "det virkede"
```

Hvis noget fejler: **sig det straks**. Skriv aldrig "Done ✅" uden verifikation.

**Workflow for hver opgave:**
1. Gentag opgaven kort for at bekræfte forståelse
2. Planlæg max 3-5 trin
3. Udfør ét trin
4. Verificér med bevis
5. Næste trin
6. Opsummer hvad der faktisk blev lavet

---

## Projektbeskrivelse

Ny hjemmeside til **AI Konsulenterne (AIK)** — dansk AI-konsulenthus der bygger skræddersyede AI-løsninger til SMV'er.

- **Nuværende site:** https://ai-konsulenterne.dk/
- **Primært mål:** Maksimal konvertering — folk skal booke et møde med Alexander
- **Design mål:** "Wow" — professionelt, moderne, inspireret af frame.io med hvid baggrund

---

## Tech Stack

| Lag | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| CMS | Strapi Cloud |
| Hosting | Hetzner |
| CDN | Cloudflare (gratis tier) |
| Domain | Simply |
| Booking | Cal.com Cloud (embedded) |
| Analytics | Google Analytics 4 |
| Cookie consent | Cookiebot |
| Email marketing | ActiveCampaign |

---

## Brand & Design

### Farver
```css
--color-primary: #ff9a00;   /* AIK orange */
--color-black:   #000000;
--color-white:   #ffffff;
```

### Typografi
- **Font:** Raleway (Google Fonts)
- **Overskrifter:** Raleway Bold
- **Underoverskrifter:** Raleway SemiBold
- **Brødtekst:** Raleway Regular

### Design-inspiration
- **Reference:** https://frame.io — ekstremt clean, confident, whitespace-drevet
- **Baggrund:** Hvid (ikke frame.io's mørke tema)
- **Æstetik:** Minimal, stort typografi, præcise animationer, ingen støj
- **Aldrig:** Generisk AI-æstetik, lilla gradienter, robotikoner, buzzword-bingo

### Tone of voice
AIK er: Nede på jorden, ærlig, til at stole på, frisk, venlig, kompetent, selvsikker
AIK er ikke: For seriøs, kompliceret, selvglad, "smart-i-en-fart"

---

## Kontaktinfo (bruges i kode)

```
Telefon:  +45 25547074  (Alexander)
Email:    kontakt@ai-konsulenterne.dk
CVR:      45569241
```

---

## Konverteringsstrategi (Hormozi Grand Slam Offer)

Siden er bygget til at maksimere konvertering via Hormozi's framework:

### 1. Dream Outcome — vær ekstremt specifik
Brug research-backed tal (McKinsey, MIT, Harvard) — ikke AIK-specifikke:
- McKinsey: Virksomheder der implementerer AI i administrative processer sparer gennemsnitligt 20-30% af arbejdstiden
- MIT-studie: AI-assisterede medarbejdere løser opgaver 40% hurtigere
- Formulér det konkret: *"Spar 1 dag om ugen på manuelle processer — inden 60 dage"*

### 2. Perceived Likelihood — konkret social proof
- Cases med specifikke resultater (ikke bare logoer)
- Navngivne kunder med konkrete udfordringer og løsninger

### 3. Time to Value — gør det hurtigt og ufarligt
- Booking omdefineres som: *"Gratis 45-minutters AI-afklaring — ingen forpligtelse"*
- Ikke et salgsmøde — en gratis service

### 4. Reduce Effort — fjern al friktion
- *"I skal ikke forberede noget"*
- *"Ingen krav om IT-afdeling"*
- *"Vi tager det hele"*

### 5. Risk Reversal — garanti
- *"Finder vi ikke en konkret AI-mulighed der kan spare jer tid — koster mødet ingenting"*

---

## Konverteringselementer

### Pop-up (efter 10 sekunder)
- Vises på alle sider efter 10 sek
- Indhold: Alexanders navn + telefonnummer + "Ring direkte til os"
- Design: Clean modal, orange CTA, nem lukning
- Må ikke vises igen i samme session efter lukning

### Fast bar i bunden
- Vises på alle sider, hele tiden
- Indhold: 📞 +45 25547074 — "Ring til Alexander nu"
- Sekundær CTA: Cal.com booking knap
- Mobil-optimeret (thumb-friendly)

### Lead Magnet — PDF download
- **Titel:** "Hvad kan AI egentlig? + Sådan kommer din virksomhed i gang"
- **Gating:** Email mod download via ActiveCampaign
- **Flow:** Bruger giver email → ActiveCampaign sender PDF automatisk → nurture-flow
- **Placering:** Dedikeret sektion på forsiden + egen landingsside `/ai-guide`

---

## Sider

| Side | Formål |
|---|---|
| `/` | Forside — primær konvertering |
| `/skraeddersyede-ai` | Ydelse — skræddersyede løsninger |
| `/workshop` | Ydelse — workshop |
| `/visionai` | Produkt — VisionAI |
| `/cases` | Social proof — kundehistorier |
| `/viden-om-ai` | Blog / content marketing |
| `/om-os` | Tillid — teamet bag |
| `/kontakt` | Sekundær konvertering |
| `/ai-guide` | Lead magnet landingsside |

---

## Strapi CMS — Indholdstyper

Følgende skal kunne redigeres uden at røre kode:

```
Cases
  - titel
  - kunde (navn + logo)
  - udfordring
  - løsning
  - resultater
  - kategori (Intern AI / Webshop / Vidensbase)

Testimonials
  - citat
  - navn
  - titel
  - virksomhed
  - billede

Blog / Viden om AI
  - titel
  - indhold (rich text)
  - forfatter
  - dato
  - kategori
  - SEO meta

Teammedlemmer
  - navn
  - titel
  - billede
  - bio
  - LinkedIn URL
```

---

## SEO

- Alle sider: `<title>`, `<meta description>`, Open Graph tags (LinkedIn preview)
- Sitemap auto-genereret (`next-sitemap`)
- Struktureret data (JSON-LD) på forsiden og cases
- Dansk sprog: `<html lang="da">`
- Core Web Vitals: LCP < 2.5s, CLS < 0.1

---

## GDPR & Cookies

- **Cookiebot** håndterer consent — ingen tracking uden accept
- **Cal.com widget:** Loader kun efter cookie-accept
- **Google Analytics 4:** Anonymiseret IP, loader kun efter consent
- **ActiveCampaign:** Kun email-capture ved aktiv tilmelding (lead magnet)

---

## Filstruktur

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Forside
│   │   ├── layout.tsx          # Root layout
│   │   └── [slug]/             # Øvrige sider
│   ├── components/
│   │   ├── ui/                 # Genbrugelige UI-elementer
│   │   ├── sections/           # Sidespecifikke sektioner
│   │   ├── PopupPhone.tsx      # 10-sek popup med Alexanders nr.
│   │   ├── BottomBar.tsx       # Fast ring-til-os bar
│   │   └── LeadMagnet.tsx      # PDF download formular
│   ├── lib/                    # Utilities, Strapi client
│   ├── styles/                 # Globale styles
│   └── content/                # Statisk indhold / copy
├── public/                     # Assets, PDF lead magnet
├── .env.local                  # Miljøvariabler (aldrig commit)
└── CLAUDE.md                   # Denne fil
```

---

## Miljøvariabler (.env.local)

```bash
# Strapi
STRAPI_API_URL=
STRAPI_API_TOKEN=

# Google Analytics
NEXT_PUBLIC_GA_ID=

# Cookiebot
NEXT_PUBLIC_COOKIEBOT_ID=

# ActiveCampaign
ACTIVECAMPAIGN_API_URL=
ACTIVECAMPAIGN_API_KEY=

# Cal.com
NEXT_PUBLIC_CAL_USERNAME=
```

---

## Regler Claude IKKE må bryde

- ❌ Sige "done" uden at verificere
- ❌ Ændre eksisterende filer uden godkendelse
- ❌ Slette filer — aldrig
- ❌ Installere nye dependencies uden at spørge
- ❌ Skrive Lorem Ipsum i produktionskode
- ❌ Engelske tekster på sider der skal være på dansk
- ❌ Committe `.env.local` eller API keys

---

## Kendte kunder (til cases & social proof)

Lavazza, INDKOM, Fregat, Wunderwear, Mæglerakademiet, CETC, Stretchfit, J.M Band

---

## Cases — detaljeret indhold

### J.M Band ⚠️ MANGLER UDFYLDNING
- **Type:** Strategisk samarbejdspartner / AI-agent
- **Integrationer:** CRM + Shopify + diverse systemer
- **Løsning:** AI-agent der giver indsigt på tværs af systemer
- **Resultat:** ⚠️ MANGLER — spørg Alexander inden casen publiceres
- **Kategori:** Intern AI / Data & Indsigt

---

---

## 🔁 FEEDBACK LOOP — Claude lærer af sine fejl

### Hvordan det virker
Hver gang Claude laver en fejl, lyver eller snyder — bliver den dokumenteret her.
Claude skal læse denne sektion FØR hver opgave og aktivt undgå kendte fejlmønstre.

### Claude's selvtjek — kør dette mentalt før HVER opgave
```
1. Har jeg læst CLAUDE.md?
2. Er jeg ved at sige "done" uden at verificere?
3. Laver jeg antagelser i stedet for at spørge?
4. Installerer jeg noget uden tilladelse?
5. Har jeg tjekket kendte fejl i tabellen nedenfor?
```

### Kendte fejl & hvad Claude skal gøre i stedet

| # | Fejl Claude lavede | Hvad der skulle have været gjort |
|---|---|---|
| 1 | Skalerede 5504×3072-plates (1,7917:1) til posterframes uden at rette sideforholdet, mens klippene var 1920×1080. Under `object-cover` croppede de forskelligt, og billedet hoppede ~3 px når videoen overtog posteren. | Posterframe og klip skal have **præcis** samme sideforhold. Tjek det med ffprobe frem for at antage at "16:9-ish" er 16:9. |
| 2 | Graduerede video med `lutrgb`. Det halverede luminansen (107 → 58) på HEVC-kilder, fordi de er limited-range og RGB-konverteringen mangler range-metadata. | Brug `eq` (arbejder i YUV) til grade på video. Og mål altid outputtet mod målet bagefter — fejlen var usynlig i filstørrelsen alene. |
| 3 | Skrev prompts fulde af negationer: `no flat blank strip across the top`, `no faces`. Modellen leverede præcis det forbudte — 4 søm ud af 7 billeder, og ansigter i to forsøg i træk. | Beskriv hvad der **er** i billedet. "Væggen fortsætter naturligt i perspektiv" i stedet for "intet fladt felt". "Beskåret i brysthøjde, så hænder og bordflade fylder" i stedet for "ingen ansigter". Gav 0 søm ud af 5. |
| 4 | Sagde at en linje på `/referencer` var blevet misvisende, uden at kontrollere om den stadig var det efter vores egen ændring. Den var sand. | Tjek påstanden mod den nuværende tilstand før den meldes som fejl. |

### Sådan tilføjer du en fejl
Når Claude laver en fejl, sig bare:
> *"Log denne fejl i CLAUDE.md"*

Claude tilføjer den til tabellen med format:
```
| [nr] | [hvad gik galt] | [hvad der skulle have været gjort] |
```

### Sessionslog
Claude skriver en kort log efter hver større opgave:

| Dato | Opgave | Status | Noter |
|---|---|---|---|
| 2026-08-18 | Referencefilmen: fire klip produceret, rysten fejlfundet, filmen bygget om til rigtige kunder | Færdig | Filmen sagde "Vi har hjulpet dem, der …" over Semler, TDC Net og Apple — leveret gennem et tidligere selskab, ikke AIK-kunder. Ude af filmen. Ti rigtige kunder ind, plus tre læringsklip under en anden sætning. Seks klip animeret (forsiden), syv står på posterframe. Graden lægges på **efter** generering: luminansspredning 91,6 → 12,7. |

**Åbent efter 18/8:** sætningen til logostriben ("Før AIK byggede vi til…" vs "Vores stifter har leveret løsninger til…") mangler Benjamins valg. Registret på `/referencer` mangler én sætning pr. kunde om hvad vi konkret byggede — den skal skrives af AIK, ikke gættes. Vindmølleklippet bør skydes om; grade-passet slebet dens amber-lys næsten væk.

---

*Version 1.3 — Opdateret: August 2026*
