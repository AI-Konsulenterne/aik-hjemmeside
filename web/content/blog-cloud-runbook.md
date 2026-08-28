# Cloud-runbook: automatisk blogudgivelse

Denne fil er **facit for cloud-routines** (`aik-blog-trend-tirsdag` og
`aik-blog-keyword-torsdag`). Den lokale `aik-blog`-skill findes ikke i skyen,
så alle regler står her. Retter du reglerne, så ret dem HER - så følger begge
routines automatisk med uden at routine-prompten skal ændres.

## Forudsætninger (tjek FØRST - stop hvis noget mangler)

Kør denne kontrol før alt andet:

    test -n "$STRAPI_API_URL" && test -n "$STRAPI_API_TOKEN" && echo "STRAPI OK" || echo "STRAPI MANGLER"
    test -n "$VERCEL_TOKEN" && echo "VERCEL OK" || echo "VERCEL MANGLER"

Mangler STRAPI-variablerne: **STOP med det samme**. Skriv ikke posten, og
rapportér at hemmelighederne ikke er sat. Udgiv aldrig halvfærdigt.

Mangler kun VERCEL_TOKEN: du må gerne udgive til Strapi (posten går live via
ISR), men du kan ikke opdatere sitemap. Sig det tydeligt i rapporten.

## Trin 0: undgå dubletter (ALTID først)

1. Læs `web/content/blog-log.md` - alle udgivne emner. Gentag aldrig et emne.
2. Hent live slugs fra Strapi (`-g` er påkrævet, ellers fejler curl på `[]`):

       curl -sS -g -H "Authorization: Bearer $STRAPI_API_TOKEN" \
         "$STRAPI_API_URL/api/blog-posts?pagination[pageSize]=100&fields[0]=slug&fields[1]=title"

3. Jagter en eksisterende artikel samme søgeord, så vælg det næste emne.

## Emnevalg

**Spor TREND (tirsdag):** find via websøgning hvad der er sket i AI de seneste
7 dage, og som betyder noget for en dansk SMV. Prioritér: Copilot-nyt og
adoption øverst, derefter værktøjer SMV'er faktisk kan bruge, så markedsanalyser.
Vinkl til "hvad betyder det for en dansk virksomhed med 20 ansatte" - ikke
"OpenAI lancerer X". Kildehenvis alle nyheder med link. `category: "news"`.

**Spor KEYWORD (torsdag):** tag det øverste emne i `web/content/blog-backlog.md`
som ikke allerede er udgivet. `category: "guide"`.
Bemærk: Search Console er ikke tilgængelig i skyen, så keyword-valget er
backlog-drevet. Kør den lokale opgave, hvis du vil have GSC-baseret prioritering.

## Skriveregler

- Dansk, AIK's stemme "AI i øjenhøjde": nede på jorden, ærlig, konkret,
  jargonfri. Selvsikker, aldrig smart-i-en-fart.
- **Tegnsætning: BINDESTREG (-), aldrig tankestreg.** Kapital "I"/"jer".
- 800-1.400 ord. Åbn med 2-4 sætninger der besvarer kernespørgsmålet direkte
  (det er blokken AI-svar citerer). H2'er som spørgsmål hvor det er naturligt.
- FAQ-sektion nederst: `## Ofte stillede spørgsmål` med hvert spørgsmål som `###`.
- Mindst 2 interne links + blød CTA til sidst.

### Intet falsk bevis

Ingen opdigtede tal, citater, priser eller cases. Kun disse fire rigtige cases:

- **Wunderwear** - webshop; automatiseret ordrehåndtering + AI-kundeservice der
  besvarer 80% af de gentagne spørgsmål. `/cases/wunderwear-automation`
- **J.M Band** - AI-agent der samler data på tværs af CRM, Shopify og interne
  systemer. `/cases/jm-band-ai-agent`
- **Lavazza** - datasikker HR-agent trænet på interne dokumenter, lukket miljø.
  `/cases/lavazza-hr-agent`
- **INDKOM** - AIK som ekstern AI-afdeling: kortlagde processer, fandt 3 use
  cases, byggede dem ind. `/cases/indkom-ai-partnerskab`

Generelle tal kun med kilde: McKinsey (20-30% tidsbesparelse i administrative
processer), MIT-studie (~40% hurtigere opgaveløsning).

CTA: gratis AI-afklaring, 45 minutter, ingen forpligtelse. Alexander: +45 25 54 70 74.

### Link-mål der findes

`/academy` `/workshop` `/skraeddersyede-ai` `/ai-strategi` `/ai-i-hr`
`/ai-kundeservice` `/ai-analyse` `/ai-i-e-commerce` `/visionai` `/kontakt`
`/cases` samt artikler under `/viden-om-ai/`.

**`/copilot-kursus` findes IKKE (404).** Brug `/academy` som CTA på Copilot-emner.
Er du i tvivl om en side, så tjek den - men bemærk at ukendte blog-slugs svarer
**HTTP 200 med titlen "Artikel ikke fundet"**, så statuskoden alene beviser intet.

### Markdown-begrænsninger (rendereren er minimal)

Virker: `##`-`######`, afsnit, `-`/`*`-lister, `1.`-lister, `**fed**`, `*kursiv*`,
`[tekst](url)`, `` `kode` ``, `>` citat.

Virker IKKE - brug aldrig: tabeller · kodeblokke med backticks · rå HTML ·
`---` · indrykkede lister · fed og link i samme udtryk (`**[x](/y)**` og
`[**x**](/y)` går begge i stykker - hold dem adskilt).

**Content skal starte med `##`**, ikke `#`. Sidens H1 er `title`-feltet.
Skriv ikke JSON-LD - `Article`-schema udsendes automatisk af siden.

## Udgivelse til Strapi

POST til `{STRAPI_API_URL}/api/blog-posts?status=published` med `{"data": {...}}`:

- `title` - keyword forrest, ~55-65 tegn. Bliver sidens H1.
- `slug` - kebab-case, æøå bliver ae/oe/aa. Må ikke være brugt.
- `category` - `guide` (keyword) eller `news` (trend).
- `excerpt` - 1-2 sætninger, ~150 tegn.
- `content` - markdown, starter med `##`.
- `seoTitle` - **MAKS 41 tegn** (siden føjer " | AI Konsulenterne" til).
- `seoDescription` - 140-155 tegn.
- `keywords` - array med 5.
- `readingTime` - minutter (ord / 200).
- `author` - `"AI Konsulenterne"`.

Bekræft **HTTP 201** + `documentId` + `publishedAt`. Fejler POST'en: STOP,
rapportér, og deploy ikke.

## Sitemap + deploy

`web/public/sitemap-0.xml` er et committet artefakt. Vercel kører `next build`
direkte, så `postbuild`/`next-sitemap` aldrig fyrer i produktion. Uden dette
trin mangler indlægget i sitemap.

**Vigtigt om timing:** buildet henter posterne fra Strapi. Bygger du i samme
øjeblik, du har udgivet, kan det nye indlæg mangle. Vent ~30 sekunder efter
udgivelse, byg, og **verificér** at slug'en står i sitemappet, før du deployer.

    sleep 30
    cd web && rm -rf .next && npm ci && npm run build
    grep -c "DIN-SLUG" public/sitemap-0.xml     # skal give 1 - ellers byg igen

Deploy derefter fra repo-roden:

    npx vercel --prod --yes --force --token "$VERCEL_TOKEN"

## Verificér live

Statuskoden alene er ikke nok (ukendte slugs giver også 200):

    curl -s https://ai-konsulenterne.dk/viden-om-ai/DIN-SLUG | grep -o "<title>[^<]*</title>"

Titlen skal være artiklens - ikke "Artikel ikke fundet". Tjek også:

    curl -s https://ai-konsulenterne.dk/sitemap-0.xml | grep -c "DIN-SLUG"   # 1

## Efter udgivelse

1. Tilføj en linje i `web/content/blog-log.md`: dato, spor, keyword, slug, URL.
2. Er emnet taget fra `blog-backlog.md`, så lad rækken stå - loggen er facit
   for hvad der er udgivet.
3. Commit `web/content/blog-log.md` og `web/public/sitemap-0.xml` med
   `blog: [titel]` og push til `main`.
4. Rapportér: emne og hvorfor, titel, slug, fuld URL, excerpt, bekræftelse på
   at det er live, og hvor mange emner der er tilbage i backloggen.
   Gik noget galt: rapportér fejlen tydeligt i stedet for at pynte på den.
