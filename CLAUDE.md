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
Brug research-backed tal med en kilde, vi kan pege på — ikke AIK-specifikke:
- MIT-studie (Noy og Zhang, *Science* 2023): professionelle brugte 40 % kortere tid på skriveopgaver med ChatGPT. Brug det med netop den afgrænsning, ikke som "alle opgaver 40 % hurtigere".
- ~~McKinsey: 20-30 % af arbejdstiden~~ — brug ikke. AIK kender ikke kilden, og tallet er fjernet fra sitet (29/9).
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

### Kort fra Alexander (erstattede popup'en, september 2026)
- Et lille kort nederst til venstre på store skærme, ikke en modal og intet slør over siden
- Kommer én gang pr. session: ved 50 % scroll eller efter 45 sekunder
- Trækker sig mens sektionen "Tal med Alexander" er i billedet (`data-alexander`)
- Indhold: Alexanders foto, navn og titel, telefon som orange knap (sort tekst) og link til booking
- Lukkes med ét klik eller Escape, og vises ikke igen i samme session
- Vises ikke på `/kontakt`, hvor Alexander, telefonen og mailen allerede står øverst
- Vises ikke på telefoner: der har bundbjælken allerede "Ring til Alexander"
- Hvorfor: den modale popup afbrød læseren midt i casen og var det mest lille-virksomheds-agtige på siden

### Fast bar i bunden
- Vises på alle sider, når man har scrollet forbi første skærm, **kun under 1024 px** (telefoner og tablets)
- Indhold: 📞 "Ring til Alexander" + orange "Book en samtale"
- Mobil-optimeret (thumb-friendly)
- På store skærme står telefonnummer og "Book en samtale" i den faste navigation i stedet; en bar eller pille dernede dækkede indhold

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
- Sitemap genereres dynamisk af `web/src/app/sitemap.ts` (henter sider, blog og
  cases fra Strapi, 60s ISR) — ikke et committet artefakt, intet build nødvendigt
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
│   │   ├── PopupPhone.tsx      # Kort fra Alexander (ikke-modalt, kun store skærme)
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
| 5 | Målte tekstkontrast med `getComputedStyle().color` læst som RGB. Tailwind v4 skriver farver med alfa som `lab(100 0 0 / 0.75)`, så hvid tekst blev læst som mørkerød, fik forkert polaritet, og heroens undertitel blev meldt til 3,1:1. Den var 5,8:1. Undertitlen blev "rettet" på et forkert tal. | Parse `lab()`/`oklab()` før polariteten bestemmes, og se på et udsnit af skærmbilledet før et måltal får lov at styre en ændring. |
| 6 | Fulgte nr. 2 og graderede nye klip med `eq=brightness`. Den er heltalsafrundet i trin på ca. 2,5 luma-niveauer og trækker 1 niveau fra, så snart den er aktiv: +0,005 gjorde billedet *mørkere*. Skiftede til `lutyuv` i 8 bit, men afdæmpede motiver har farvekanaler tæt på 128, så afrundingen gjorde mætningen trappeformet, og en Newton-løsning løb løbsk (mætning 72 mod målet 43,6). | Gradér med `lutyuv` i kildens egen bitdybde (10 bit fra Seedance): forstærkning på Y omkring sortpunktet, skalering af U/V omkring midten, først derefter `format=yuv420p`. Find værdierne med en indrammet søgning, ikke Newton, og mål klip og poster ad **samme vej** (fuld opløsning ud af ffmpeg, skaleret i PIL); ffmpeg-skalering i YUV gav 0,7 højere luminans og 1,8 lavere mætning. |
| 7 | Satte `uProj` i partikelscenen, før `useProgram` skiftede tilbage fra tonemap-programmet. Fra anden frame landede matricen på det forkerte program, så perspektivet aldrig blev opdateret ved størrelsesskift. Browseren sagde det i konsollen (`location is not from the associated program`), men kun i den WebGL-kørsel, jeg ikke læste til ende. | Bind programmet, før dets uniforms sættes, og læs hele konsollen fra en WebGL-kørsel, også advarslerne. |
| 8 | Lagde en scroll-drevet zoom (`animation-timeline: view()`) på et billede inde i en ramme med `overflow: hidden`. Rammen er selv en scroll-container, så billedets tidslinje målte mod rammen og stod stille (scale 1,023 i alle positioner). Det så rigtigt ud i ét skærmbillede. | Giv rammen `view-timeline-name` og lad billedet følge den navngivne tidslinje. Mål den animerede værdi i mindst tre scroll-positioner, før den meldes virkende. |
| 9 | Meldte i runde 3, at "FadeIn står fremme uden JavaScript", ud fra computed styles i DOM'en. Men hele sidens indhold ligger bag Suspense-grænsen fra `app/loading.tsx`; uden JavaScript står det i en skjult `div`, og man ser kun de tre orange prikker. Målingen fandt overskrifterne i DOM'en og så ikke, at de lå i `[hidden]`. | Tjek "uden JS" med et skærmbillede af det, man faktisk ser, og spørg om elementet er inde i `main` og uden for `[hidden]`, ikke kun om dets opacitet er 1. |
| 10 | Lagde det mørke bagtæppe i AIK Workspace-heroen fra sektionens bund (`bottom-[clamp(...)]`). På 390 px voksede sektionen under skærmen (faktaboksen), og første række fakta endte på den mørke flade i mørk tekst: 1,07:1. På 1440 så det rigtigt ud. | Forankr bagtæppet til det element, der skal stå halvt på det (skærmen), og læg alt andet uden for sektionen. Mål kontrast på 390, ikke kun på 1440. |
| 11 | Foldede logoets streg sammen med `scaleX(0.048)` på et element med CSS-maske. Masken blev samplet om i den lille skala, og der kom en mørk søm på ca. 1 px midt i stregen (pixelværdi 81 mod 255). | Animér bredden (`width` mellem to CSS-variabler) på maskerede elementer, ikke `scale`, og mål den sammenfoldede tilstand på pixels. |
| 12 | Gav tekstlaget i `/referencer`-filmen `h-full` under en forælder, der kun havde `min-height`. Procenthøjden faldt tilbage til indholdets højde, og tidslinjen stod midt i videoen i stedet for i bunden. | `h-full` virker ikke under en forælder med kun `min-height`. Brug `flex flex-col` på forælderen og `flex-1` på barnet, og mål afstanden til bunden ved flere skærmhøjder. |

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
| 2026-09-29 | Tre modeller under filmen: forudsigelse, sortering, læring | Færdig | Holt-Winters slår "samme dag sidste uge" (5,6 % mod 7,1 % fejl på usete uger). Naive Bayes: 10/12, under 50 % sikkerhed går mailen til et menneske, én fejl står synligt. 0 af 136 tekster under WCAG AA. Fallback uden modellerne: branch `claude/simpel-udgave`. |
| 2026-09-29 | Forsiden bygget om til én udgave der sælger to spor: undervisning og udvikling | Færdig | Heroen siger hvad AIK laver i én sætning over filmen. Derefter to spor-kort, fire live-demoer i ét vindue med faner, Lavazza-casen, proces og datasikkerhed, FAQ og Alexander. Navigationen følger fladen under den (mørk over mørke sektioner), bundbjælken er kun på mobil, og telefonnummeret står i navigationen fra 1280 px. Udtalelser og team er taget af forsiden: seed-dataene har "Navn kommer" og kunder vi ikke må nævne. FAQ'en starter med GDPR i stedet for "vi har ikke en IT-afdeling". Kontrast målt på pixels ved 1440 og 390: alt over WCAG AA undtagen hvid tekst på orange knapper (2,13:1, designsystemets egen regel). CLS 0 ved 1440/1024/390, 60 fps i alle fire demoer. De to tidligere udgaver ligger på `claude/simpel-udgave` og `claude/ml-udgave`. |
| 2026-09-29 | Anbefalingerne rettet ind, og de syv manglende filmklip produceret | Færdig | Sort tekst på orange overalt (2,13:1 → 9,9:1), også i designsystemet. Popup'en er erstattet af et ikke-modalt kort fra Alexander på store skærme. Syv klip med seedance_2_5 (omni_reference, 5 s, 1080p, høj bitrate, uden lyd); køkkenet blev skudt om, fordi kedlen gled ud af billedet. 480 credits i alt. Modellen fortolker startbilledet frit, så posteren er nu klippets første billede efter grade (1920x1080, webp q82, dRGB under 0,25). Grade med lutyuv i 10 bit og indrammet søgning: alle syv inden for 0,3 af familiens mål. Heroen er låst til de fem kuraterede skud (inBand), /referencer kører alle 13. De eksisterende seks klip er ikke rørt. Playwrights Chromium kan ikke afspille H.264, så afspilning er kontrolleret med ffprobe og netværkskald, ikke i browseren. |
| 2026-09-29 | Partikelfortælling i WebGL, "Sådan arbejder vi" som scroll-flow, high-end detaljer og kontrast på undersiderne | Færdig | Demovinduet ("Det kører. Lige nu, i din browser.") er erstattet af `DataHistorie`: 90.000 partikler (26.000 på telefon) bevæger sig mellem fire former styret af scroll (spredt viden, dokumenter, graf med en puls fra spørgsmål til kilde, prognose med usikkerhed). WebGL2 uden biblioteker, lys summeret i en float-buffer og tonemappet, så orange forbliver orange. Sløret ligger i shaderen med støj: den tomme flade måler nu 10,0 i alle kolonner mod 9,5-10,4 før. Uden WebGL står teksten og kortene alene og følger stadig kapitlerne. "Sådan arbejder vi": en streg fyldes i sort med scroll, sektionens ene lampe sidder for enden, og hvert trin viser "Det får I". Overskrifter ord for ord, FadeIn står fremme uden JavaScript, Lavazza-billedet åbner sig med scroll (ren CSS). Kontrast målt på pixels på 15 undersider: ca. 180 fund → kun målefejl tilbage (skjulte FAQ-svar, ringen om knapper). CLS 0 ved 1440/1024/390, 60 fps i proces-scroll. Lint uændret (de to kendte fejl). WebGL-billedraten er ikke målt på rigtig GPU; Playwright tegner i software. |
| 2026-09-29 | Runde 4: logoet folder sig sammen, hele filmen på forsiden, holdet tilbage, og alle undersider bygget om i forsidens sprog | Færdig | Logoet er det officielle ordmærke som CSS-masker (`public/logo/`): fuldt "AI KONSULENTERNE" øverst, foldet til "AIK" ved scroll, farven følger fladen. Forsidens film kører alle 13 skud med begge akter; `ReferencerBaand` er et andet CTA til /referencer længere nede. Holdet er tilbage fra Strapi (pladsholdere skjult, fotos fra repoet som reserve). Tidslinjen på /referencer sidder 43 px fra bunden ved 1440/1920/2560. Navigationen måles igen, når indholdet streames ind (ResizeObserver): 6/6 gennemsigtig over filmen. Undersider: AI-Minds, workshop, skræddersyet AI, fire use cases, AI-strategi, AIK Workspace (produktet i heroen, skærmen retter sig op 20→0 grader over 520 px), om os, kontakt, gratis AI-analyse, cases og casesider (kundens filmskud), Viden om AI (liste med filtre), juridiske sider (typografien manglede helt) og 404. Fælles byggeklodser i `components/side/`. " - " og tankestreger er skrevet ud af teksten; Strapi-tekster normaliseres ved visning. Målt: 20 ruter uden vandret scroll på 390, CLS 0 på 10 nye sider ved 1440/1024/390, kontrast på 12 sider ved 1440 og 390 (ét rigtigt fund, faktaboksen på /visionai, rettet; resten målefejl), sider uden Strapi viser rolige tomme tilstande. Lint uændret. Uden JavaScript viser hele sitet kun indlæsningsprikkerne (se fejl 9 og åbne punkter). |
| 2026-09-29 | Runde 4, opfølgning: AIKs svar på de åbne punkter | Færdig | `app/loading.tsx` er fjernet efter AIKs OK. Uden JavaScript står hele siden nu fremme (h1 synlig i `main` på 5/5 sider; før kun tre prikker), HTML'en har ingen skjulte stream-blokke, og cases eller artikler, der ikke findes, svarer nu 404 i stedet for 200. Navigationen er gennemsigtig over filmen 6/6, klientnavigation virker, CLS 0 på 5 sider ved 1440/1024/390. AIK Workspace: 3 måneders binding i FAQ, prisafsnit og kontaktlisten ("Uforpligtende demo" i stedet for "Ingen binding"). AI-Minds' "løbende måned + 1" er AIKs egen tekst og er ikke rørt. McKinsey-tallet (20-30 %) er fjernet fra /ai-strategi og fra briefen og designsystemet; MIT-tallet står med kilden og afgrænsningen (skriveopgaver, Science 2023). Smukfest er J.M Bands kunde, ikke vores; det nævnes ikke på sitet, og noterne er rettet. Uden JavaScript kan FAQ-svarene stadig ikke foldes ud. |

**Åbent efter 18/8:** sætningen til logostriben ("Før AIK byggede vi til…" vs "Vores stifter har leveret løsninger til…") mangler Benjamins valg. Registret på `/referencer` mangler én sætning pr. kunde om hvad vi konkret byggede — den skal skrives af AIK, ikke gættes. Vindmølleklippet bør skydes om; grade-passet slebet dens amber-lys næsten væk. *(Løst 19/8 i `318bfda`: ny plate med lampen tæt på kameraet.)*

**Åbent efter 29/9:** *(Løst samme dag: sort tekst på orange, og popup'en er blevet til et ikke-modalt kort.)* *(Løst i runde 3: orange tekst på lyse flader er væk fra undersiderne; etiketter er mørkegrå, fremhævede ord mellemgrå, tal sorte.)* Kortet fra Alexander dækker en del af indholdet nederst til venstre, mens det er fremme (én gang pr. session, lukkes med ét klik). Lavazza-casen mangler ét resultat med tal, fra AIK. En navngiven udtalelse fra Lavazza eller J.M Band kan sætte `Testimonials` tilbage på forsiden (Smukfest er J.M Bands kunde, ikke vores). `GuideForm.tsx` og `LeadMagnetForm.tsx` har stadig to lint-fejl (setState i effect).

**Åbent efter runde 3 (29/9), skal afgøres af AIK:** `/workshop` nævner Retail Partner med logo og en hel case, og tre use case-sider (`/ai-analyse`, `/ai-kundeservice`, `/ai-i-e-commerce`) nævner INDKOM og Wunderwear i casekort; aftalen var kun J.M Band og Lavazza (Smukfest er J.M Bands kunde, ikke vores). AI-Minds-billedet (`public/ai-minds.jpg`) er en neon-hjerne i lilla og cyan, præcis det designsystemet udelukker. `/academy` siger både "40+ moduler" og "4 moduler". `/workshop` har to procesafsnit ("Sådan gør vi" og "Proces"). `/om-os` åbner med "Vi er kun fire mennesker". `/skraeddersyede-ai` siger servere i Sverige, `/visionai` siger Microsoft Azure (EU); er det Azure Sweden Central, så skriv det begge steder. `/kontakt` har ingen booking, fordi Cal er parkeret. Partikelscenen er ikke prøvet på iPhone eller en langsom Android. *(Løst i runde 4: AI-Minds-billedet bruges ikke længere, /academy siger "40+ moduler i fire spor" hele vejen, /workshop har ét forløb, /om-os siger "et lille hold", og /kontakt har telefon og mail som de to store handlinger.)*

**Åbent efter runde 4 (29/9), skal afgøres af AIK:** `src/app/loading.tsx` lægger hele sidens indhold bag en Suspense-grænse, så uden JavaScript ser man kun tre prikker (indholdet står i HTML'en, men skjult). Anbefaling: fjern filen; vi sletter ikke filer uden jeres OK. Strapi har INDKOM og Wunderwear som cases (seed-dataene), og /cases viser det, Strapi indeholder; afpublicér dem i Strapi, hvis de ikke må stå. Retail Partner-casen står stadig på /workshop (uden logo). Martins titel kommer fra Strapi. McKinsey-tallet (20-30 %) på /ai-strategi kommer fra briefen her og er ikke efterprøvet. AIK Workspace: modelnavnene og forbruget i bentoen er eksempler, og "Ingen binding" er overtaget fra den gamle side; bekræft vilkårene. Privatlivspolitikken nævner Cal.com som databehandler, selvom booking er parkeret. Servere i Sverige mod Azure (EU) er stadig åbent. *(Afgjort af AIK 29/9: `loading.tsx` er fjernet. AIK Workspace har 3 måneders binding. McKinsey-tallet er fjernet, fordi kilden ikke kendes. Smukfest er J.M Bands kunde, ikke vores.)*

---

*Version 1.6 — Opdateret: September 2026*
