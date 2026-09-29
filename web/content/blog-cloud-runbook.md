# Cloud-runbook: automatisk blogudgivelse

Denne fil er **facit for cloud-routines** (`aik-blog-trend-tirsdag` og
`aik-blog-keyword-torsdag`). Den lokale `aik-blog`-skill findes ikke i skyen,
så alle regler står her. Retter du reglerne, så ret dem HER - så følger begge
routines automatisk med uden at routine-prompten skal ændres.

> **Ændret 29/9 2026: Strapi er lukket.** Artiklerne ligger nu som filer i
> repoet (`web/content/blog/<slug>.md`), og en ny artikel er en ny fil, der
> pushes til `main`. Der skal ikke længere POST'es til Strapi, og der kræves
> ingen hemmeligheder. Har din routine-prompt selv et Strapi-tjek, så slet det.

## Forudsætninger (tjek FØRST)

    git checkout main && git pull origin main
    ls web/content/blog | wc -l

Du skal kunne pushe til `main` (det har routinen altid gjort med blog-loggen).
Kan du ikke det: **STOP**, skriv ikke posten, og rapportér det.

## Trin 0: undgå dubletter (ALTID først)

1. Læs `web/content/blog-log.md` - alle udgivne emner. Gentag aldrig et emne.
2. Se de udgivne slugs og titler:

       grep -h '^title:' web/content/blog/*.md

3. Jagter en eksisterende artikel **samme søgeord**, så vælg et andet søgeord.

Reglen går på søgeordet, ikke på emnet. Samme **emne** må gerne gå igen, også
to dage i træk, hvis emnet har reel søgevolumen (fx undervisning i Copilot).
Kravet er, at hvert indlæg har sit eget søgeord, sin egen vinkel og sin egen
slug, og at indlæggene linker til hinanden. To indlæg, der jagter samme søgeord,
konkurrerer internt i Google, og så rangerer begge dårligere end ét godt indlæg
ville have gjort.

## Emnevalg

**Spor TREND (tirsdag):** find via websøgning hvad der er sket i AI de seneste
7 dage, og som betyder noget for en dansk SMV. Prioritér: Copilot-nyt og
adoption øverst, derefter værktøjer SMV'er faktisk kan bruge, så markedsanalyser.
Vinkl til "hvad betyder det for en dansk virksomhed med 20 ansatte" - ikke
"OpenAI lancerer X". Kildehenvis alle nyheder med link. `category: "news"`.

Store emner må gerne dækkes som en **klynge** over flere dage: ét emne, flere
søgeord. Fx undervisning i Copilot kan blive "hvad koster et Copilot-kursus",
"hvor lang tid tager det at lære Copilot" og "hvorfor bruger medarbejderne ikke
Copilot" - tre indlæg, tre søgeord, links mellem dem, CTA til `/academy`.
Vælg klynge frem for et tyndt nyt emne, når nyhedsstrømmen er tynd: et emne
folk faktisk søger på slår en nyhed, ingen googler om 14 dage.

**Spor KEYWORD (torsdag):** tag det øverste emne i `web/content/blog-backlog.md`
som ikke allerede er udgivet. `category: "guide"`.
Bemærk: Search Console er ikke tilgængelig i skyen, så keyword-valget er
backlog-drevet. Kør den lokale opgave, hvis du vil have GSC-baseret prioritering.

## Skriveregler

- Dansk, AIK's stemme "AI i øjenhøjde": nede på jorden, ærlig, konkret,
  jargonfri. Selvsikker, aldrig smart-i-en-fart.
- **Tegnsætning: BINDESTREG (-), aldrig tankestreg (— eller –).** Kapital "I"/"jer".
  Brug " - " med måde; skriv hellere to sætninger.
- 800-1.400 ord. Åbn med 2-4 sætninger der besvarer kernespørgsmålet direkte
  (det er blokken AI-svar citerer). H2'er som spørgsmål hvor det er naturligt.
- FAQ-sektion nederst: `## Ofte stillede spørgsmål` med hvert spørgsmål som `###`.
- Mindst 2 interne links + blød CTA til sidst.

### Intet falsk bevis

Ingen opdigtede tal, citater, priser eller cases. Nyheder verificeres i kilden,
før de skrives; kan en påstand ikke bekræftes, så lad den være. Kun disse tre
cases må nævnes:

- **Lavazza** - datasikker HR-agent, der svarer ud fra Lavazzas egne
  HR-dokumenter, i et lukket miljø. Den er ikke trænet på dem, og data bruges
  ikke til træning; skriv aldrig "trænet på". Medarbejderne får svar på sekunder
  i stedet for dage. `/cases/lavazza-hr-agent`
- **J.M Band** - AI-agent, der samler data på tværs af CRM, Shopify og interne
  systemer, så medarbejderne får svar ét sted. `/cases/jm-band-ai-agent`
- **Wunderwear** - webshop; automatiseret ordrehåndtering + AI-kundeservice, der
  besvarer 80 % af de gentagne spørgsmål. `/cases/wunderwear-automation`

**INDKOM må ikke nævnes** (casen er taget af sitet). Smukfest er J.M Bands
kunde, ikke AIK's.

Generelle tal kun med kilde, man kan pege på. **Brug ikke McKinsey-tallet
"20-30 % af arbejdstiden"**: AIK kender ikke kilden, og det er fjernet fra sitet.
MIT-studiet (Noy og Zhang, *Science* 2023) må bruges præcist: professionelle
brugte 40 % kortere tid på skriveopgaver med ChatGPT. Ikke "alle opgaver 40 %
hurtigere".

AIK's egne tilbud skal stemme med sitet: gratis AI-afklaring (45 minutter,
ingen forpligtelse, Alexander: +45 25 54 70 74); AI-Minds fra 249 kr. pr.
medarbejder om måneden (`/academy`); workshop typisk fra omkring 25.000 kr.
(`/workshop`); mindre skræddersyede løsninger typisk fra 50.000 kr.
(`/skraeddersyede-ai`); AIK Workspace 150 kr. pr. bruger om måneden med 3
måneders binding (`/visionai`).

### Link-mål der findes

`/academy` `/workshop` `/skraeddersyede-ai` `/ai-strategi` `/ai-i-hr`
`/ai-kundeservice` `/ai-analyse` `/ai-i-e-commerce` `/visionai` `/kontakt`
`/ai-guide` `/referencer` `/om-os` `/cases` og de tre cases ovenfor, samt
artikler under `/viden-om-ai/<slug>` (slug = filnavnet i `web/content/blog`).

**`/copilot-kursus` findes IKKE.** Brug `/academy` som CTA på Copilot-emner.
Tjekket i næste trin fanger links til sider, der ikke findes.

### Markdown-begrænsninger (rendereren er minimal)

Virker: `##`-`######`, afsnit, `-`/`*`-lister, `1.`-lister, `**fed**`, `*kursiv*`,
`[tekst](url)`, `` `kode` ``, `>` citat.

Virker IKKE - brug aldrig: tabeller · kodeblokke med backticks · rå HTML ·
`---` i brødteksten · indrykkede lister · fed og link i samme udtryk
(`**[x](/y)**` og `[**x**](/y)` går begge i stykker - hold dem adskilt).

**Brug aldrig `#` i brødteksten.** Sidens H1 er `title`-feltet, så
overskrifterne i teksten starter ved `##`. De 2-4 indledende sætninger står
før den første `##`.
Skriv ikke JSON-LD - `Article`-schema udsendes automatisk af siden.

## Udgivelse: en fil i repoet

Opret `web/content/blog/<slug>.md`. Toppen er én linje pr. felt, og **hver
værdi er JSON** (tekst i dobbelte anførselstegn, lister i `[...]`):

    ---
    title: "Hvad er en AI-agent? Forskellen på en chatbot og en agent"
    slug: "hvad-er-en-ai-agent"
    excerpt: "1-2 sætninger, ~150 tegn."
    category: "guide"
    author: "AI Konsulenterne"
    publishedAt: "2026-10-01T06:00:00.000Z"
    updatedAt: "2026-10-01T06:00:00.000Z"
    seoTitle: "Hvad er en AI-agent?"
    seoDescription: "140-155 tegn med søgeordet forrest."
    keywords: ["hvad er en ai-agent", "ai-agent", "...", "...", "..."]
    ---

    2-4 sætninger, der svarer direkte på spørgsmålet i titlen.

    ## Første overskrift

    Brødtekst ...

- `title` - keyword forrest, ~55-65 tegn. Bliver sidens H1.
- `slug` - kebab-case, æøå bliver ae/oe/aa. **Skal være det samme som filnavnet.**
- `category` - `guide` (keyword) eller `news` (trend).
- `seoTitle` - **MAKS 41 tegn** (siden føjer " | AI Konsulenterne" til).
- Læsetiden regnes ud af teksten; skriv den ikke selv.
- `publishedAt` og `updatedAt` - nu, i ISO-format med `Z`.

**Tjek filen, før du committer.** Det kræver ingen installation:

    cd web && npm run tjek-blog -- <slug>

Tjekket skal slutte med `0 fejl`. Det fanger ulæselig top, forkert slug, for
lang seoTitle, #-overskrifter, tabeller og kodeblokke, links til sider der ikke
findes, McKinsey-tallet, INDKOM, Lavazza "trænet på" og tankestreger. Fejler det: ret filen, og kør igen.
Pushes en fil, der ikke kan læses, fejler buildet, og sitet bliver stående på
den forrige version, så intet går halvt i luften; men artiklen er så heller
ikke udgivet.

## Efter udgivelse

1. Tilføj en linje i `web/content/blog-log.md`: dato, spor, keyword, slug, URL.
2. Er emnet taget fra `blog-backlog.md`, så lad rækken stå - loggen er facit
   for hvad der er udgivet.
3. Commit **artiklen og loggen i samme commit** med `blog: [titel]`, og push
   til `main`. Pushet sætter et nyt deploy i gang; artiklen og sitemappet
   bygges med.

## Verificér live

Vent 3-5 minutter på deployet. Tjek så titlen:

    curl -s https://ai-konsulenterne.dk/viden-om-ai/DIN-SLUG | grep -o "<title>[^<]*</title>"

En slug, der ikke findes, giver nu **404** (før gav den 200 med "Artikel ikke
fundet"). Tjek også sitemappet:

    curl -s https://ai-konsulenterne.dk/sitemap.xml | grep -c "DIN-SLUG"   # 1

Giver artiklen stadig 404 efter 10 minutter, er deployet sandsynligvis fejlet.
Rapportér det tydeligt i stedet for at pushe igen og igen.

Kan sandkassen slet ikke nå `ai-konsulenterne.dk` (se noterne i `blog-log.md`),
så er `npm run tjek-blog` uden fejl og et vellykket push det, du kan vise.
Skriv i rapporten, at siden skal tjekkes i en browser.

## Rette eller skjule en artikel

- **Rette:** ret filen, sæt `updatedAt` til nu, kør tjekket, commit og push.
- **Skjule:** tilføj `draft: true` i toppen. Artiklen forsvinder fra sitet og
  sitemappet, men filen bliver stående. Slet ikke udgivne filer: adressen kan
  være indekseret og linket udefra. Skal den væk for altid, så lav i stedet en
  redirect i `web/next.config.ts` til den artikel, der afløser den.
- **Omdøb aldrig en slug.** Seks artikler tager imod gamle adresser fra det
  tidligere site (redirects i `web/next.config.ts`). Tjekket melder fejl, hvis
  en af dem mangler eller er sat til `draft: true`.

## Rapportér

Emne og hvorfor, titel, slug, fuld URL, excerpt, bekræftelse på at det er live,
og hvor mange emner der er tilbage i backloggen. Gik noget galt: rapportér
fejlen tydeligt i stedet for at pynte på den.
