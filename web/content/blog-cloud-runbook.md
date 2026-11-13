# Cloud-runbook: automatisk blogudgivelse

Denne fil er **facit for cloud-routines** (`aik-blog-trend-tirsdag` og
`aik-blog-keyword-torsdag`). Den lokale `aik-blog`-skill findes ikke i skyen,
så alle regler står her. Retter du reglerne, så ret dem HER - så følger begge
routines automatisk med uden at routine-prompten skal ændres.

## Forudsætninger (tjek FØRST - stop hvis noget mangler)

Kør denne kontrol før alt andet:

    test -n "$STRAPI_API_URL" && test -n "$STRAPI_API_TOKEN" && echo "STRAPI OK" || echo "STRAPI MANGLER"

Mangler STRAPI-variablerne: **STOP med det samme**. Skriv ikke posten, og
rapportér at hemmelighederne ikke er sat. Udgiv aldrig halvfærdigt.

Det er den eneste hemmelighed du skal bruge. Der kræves **ikke** noget
Vercel-token, og der skal ikke bygges eller deployes - se "Sitemap" nedenfor.

## Trin 0: undgå dubletter (ALTID først)

1. Læs `web/content/blog-log.md` - alle udgivne emner. Gentag aldrig et emne.
2. Hent live slugs fra Strapi (`-g` er påkrævet, ellers fejler curl på `[]`):

       curl -sS -g -H "Authorization: Bearer $STRAPI_API_TOKEN" \
         "$STRAPI_API_URL/api/blog-posts?pagination[pageSize]=100&fields[0]=slug&fields[1]=title"

3. Jagter en eksisterende artikel **samme søgeord**, så vælg et andet søgeord.

Reglen går på søgeordet, ikke på emnet. Samme **emne** må gerne gå igen - også
to dage i træk - hvis emnet har reel søgevolumen (fx undervisning i Copilot).
Kravet er, at hvert indlæg har sit eget søgeord, sin egen vinkel og sin egen
slug, og at indlæggene linker til hinanden. To indlæg, der jagter samme søgeord,
konkurrerer internt i Google, og så rangerer begge dårligere end ét godt indlæg
ville have gjort.

## SEO-fokus (fra 2026-11-02) - LÆS FØR EMNEVALG

Dette afsnit har forrang i emnevalg og links. Kilde: AIK's SEO-strategi
(Keyword Planner + Search Console, okt. 2026).

**Formålet er leads, ikke trafik.** Hvert indlæg skal styrke én af tre søjler
og sende læseren videre til søjlens hub-side:

| Søjle | Hub-side(r) | Andel af indlæg |
|---|---|---|
| 1. Undervisning: Copilot-kursus, AI-workshop, online-forløb | `/workshop` (fysisk/in-house), `/academy` (online, AI-Minds) | ca. halvdelen |
| 2. Rådgivning: AI-konsulent, AI-strategi | `/` (forsiden), `/ai-strategi` | ca. en fjerdedel |
| 3. Udvikling: AI-løsninger, AI-agenter, automatisering | `/skraeddersyede-ai`, `/ai-kundeservice`, `/ai-i-hr` | ca. en fjerdedel |

**De 10 vigtigste søgeord ejes af sider, ikke af blogindlæg.** Brug dem aldrig
som et indlægs primære søgeord - skriv long-tail-varianter og link til siden.
Volumen = gns. månedlige søgninger i Danmark (Google Keyword Planner):

| Søgeord | Søgninger/md | Ejes af |
|---|---|---|
| ai konsulent | 100-1.000 | `/` |
| ai konsulenter | 100-1.000 | `/` |
| ai konsulenthus | under 10 (men 176 visninger/90 dage i GSC) | `/` |
| copilot kursus | 100-1.000 (+900% på 3 mdr.) | `/academy` (indtil `/copilot-kursus` findes) |
| copilot workshop | 10-100 | `/workshop` |
| microsoft copilot kursus | 10-100 | `/academy` |
| ai workshop for virksomheder | under 10 (men 474 visninger/90 dage i GSC) | `/workshop` |
| ai workshop | 10-100 | `/workshop` |
| ai kursus online | 10-100 | `/academy` |
| ai rådgivning | 10-100 | `/ai-strategi` |

**Regler for hvert indlæg:**

1. Notér i `blog-log.md` hvilken søjle indlægget støtter (fx "søjle 1").
2. Link til søjlens hub-side i artiklens første tredjedel - med et af de 10
   søgeord som linktekst, hvor det falder naturligt.
3. CTA til sidst: søjlens hub-side eller `/kontakt` (gratis AI-afklaring).
4. Spring over: rene modellanceringer, forbrugerprodukter, AI-billeder/video
   og emner, der ikke kan kobles til en søjle.

## Emnevalg

**Spor TREND (tirsdag):** find via websøgning hvad der er sket i AI de seneste
7 dage, og som betyder noget for en dansk virksomhed. Prioritér i denne rækkefølge:
(a) Microsoft Copilot-nyt og adoption (søjle 1), (b) AI-forordningen, især
artikel 4 om AI-kompetencer hos medarbejdere (søjle 1), (c) AI-agenter og
automatisering virksomheder kan bruge (søjle 3), (d) danske tal om AI i
virksomheder (søjle 2). To tests: vil en dansk leder google det om 14 dage, og
kan det kobles til en søjle? Består intet emne begge tests, så skriv i stedet
det øverste ikke-udgivne emne fra emnekøen i `blog-backlog.md` som `guide`, og
sig det i rapporten.
Vinkl til "hvad betyder det for en dansk virksomhed med 20 ansatte" - ikke
"OpenAI lancerer X". Kildehenvis alle nyheder med link. `category: "news"`.

Store emner må gerne dækkes som en **klynge** over flere dage: ét emne, flere
søgeord. Fx undervisning i Copilot kan blive "hvad koster et Copilot-kursus",
"hvor lang tid tager det at lære Copilot" og "hvorfor bruger medarbejderne ikke
Copilot" - tre indlæg, tre søgeord, links mellem dem, CTA til `/academy`.
Vælg klynge frem for et tyndt nyt emne, når nyhedsstrømmen er tynd: et emne
folk faktisk søger på slår en nyhed, ingen googler om 14 dage.

**Spor KEYWORD (torsdag):** tag det øverste emne i **"Emne-kø fra 2026-11-02"**
i `web/content/blog-backlog.md`, som ikke allerede er udgivet. `category: "guide"`.
Den gamle kø (#1-#33) er arkiv - brug den ikke til at vælge emner.
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

CTA: gratis AI-afklaring, 30 minutter, ingen forpligtelse. Alexander: +45 25 54 70 74.

### Link-mål der findes

`/academy` `/workshop` `/skraeddersyede-ai` `/ai-strategi` `/ai-i-hr`
`/ai-kundeservice` `/ai-analyse` `/ai-i-e-commerce` `/visionai` `/kontakt`
`/cases` samt artikler under `/viden-om-ai/`.

**`/copilot-kursus` findes IKKE (404).** Brug `/academy` som CTA på Copilot-emner.
Er du i tvivl om en side, så tjek den - men bemærk at ukendte blog-slugs svarer
**HTTP 200 med titlen "Artikel ikke fundet"**, så statuskoden alene beviser intet.

### Markdown-begrænsninger (rendereren er minimal)

Virker: `##`-`######`, afsnit, `-`/`*`-lister, `1.`-lister, `**fed**`, `*kursiv*`,
`[tekst](url)`, `` `kode` ``, `>` citat, og billeder på egen linje:
`![alt-tekst](https://...media.strapiapp.com/... "Foto: Navn / Unsplash")`
(kun billeder fra Strapis mediebibliotek vises - andre URL'er bliver sprunget over).

Virker IKKE - brug aldrig: tabeller · kodeblokke med backticks · rå HTML ·
`---` · indrykkede lister · fed og link i samme udtryk (`**[x](/y)**` og
`[**x**](/y)` går begge i stykker - hold dem adskilt).

**Content skal starte med `##`**, ikke `#`. Sidens H1 er `title`-feltet.
Skriv ikke JSON-LD - `Article`-schema udsendes automatisk af siden.

## Billeder (OBLIGATORISK fra 2026-11-13)

Et indlæg uden billeder ser ufærdigt ud og sælger ikke. **Hvert indlæg skal have:**

1. **Et forsidebillede** (`featuredImage`). Det vises på oversigten `/viden-om-ai`,
   øverst i artiklen og som preview på LinkedIn.
2. **2-3 billeder inde i teksten**, placeret mellem H2-afsnit (aldrig to billeder
   lige efter hinanden, aldrig før første afsnit). Ét billede for hver ca. 400 ord.

### Hvordan billederne skal se ud: corporate, men menneskeligt

- Rigtige mennesker og rigtige arbejdssituationer: møder, workshops, folk ved
  en skærm, kontormiljøer, ledelsesmøder, hænder på tastatur.
- Lyse, rolige, nordiske/skandinaviske miljøer: dagslys, træ, glas, beton,
  dæmpede farver. Professionelt og roligt, ikke opstillet reklame.
- Liggende format (landscape), mindst 1600 px bredt. Skarpt, ikke kornet.
- Billedet skal passe til afsnittet: et afsnit om undervisning får et
  undervisnings-/workshopbillede, et afsnit om data får en skærm med tal osv.
- Gerne Aarhus/danske motiver, hvor det passer (Aarhus Ø, havnen, kontorer).

**Aldrig:** robotter, glødende hjerner, blå/lilla "AI"-grafik, neonnetværk,
humanoide hænder, kunstigt genererede billeder, tekst eller logoer i billedet,
kendte personer, varemærker (fx et tydeligt Apple- eller Microsoft-logo),
overdrevent smilende stockfotos.

### Hvor billederne må komme fra

Kun **Unsplash** (unsplash.com) eller **Pexels** (pexels.com). Begge har en
licens, der tillader gratis kommerciel brug. Ingen billeder fra Google
Billeder, andre hjemmesider eller nyhedsmedier (ophavsret).

Find et billede med websøgning (fx `site:unsplash.com office meeting
scandinavian`), åbn fotoets side, og hent det i fuld størrelse
(Unsplash: `https://unsplash.com/photos/<id>/download?force=true`).
Notér fotografens navn til billedteksten.

### Upload til Strapi (billeder må ikke hotlinkes)

1. Hent billedet ned: `curl -sSL -o billede.jpg "<download-url>"`
2. Upload det til Strapis mediebibliotek:

       curl -sS -H "Authorization: Bearer $STRAPI_API_TOKEN" \
         -F "files=@billede.jpg" \
         -F 'fileInfo={"alternativeText":"Beskrivende alt-tekst på dansk","caption":"Foto: Navn / Unsplash"}' \
         "$STRAPI_API_URL/api/upload"

   Svaret er en liste: brug `[0].id` (til `featuredImage`) og `[0].url`
   (til billeder i teksten).
3. **Forsidebillede:** sæt `featuredImage` til billedets `id` i POST'en.
4. **Billeder i teksten:** indsæt på egen linje, med tom linje før og efter:

       ![Medarbejdere til workshop om Copilot](https://...media.strapiapp.com/... "Foto: Navn / Unsplash")

   Alt-teksten beskriver billedet på dansk (det er også SEO). Billedteksten i
   anførselstegn krediterer fotografen.

### Hvis billederne fejler

Giver upload 401/403, eller kan billedet ikke hentes (netværk), så udgiv
indlægget alligevel, men skriv **ØVERST i rapporten: "BILLEDER MANGLER"** med
fejlbeskeden, så et menneske kan rette det. Opdigt aldrig et billede eller en
URL.

### Gamle indlæg uden billeder

Ved hver kørsel: find ét ældre indlæg uden `featuredImage`
(`fields[0]=slug&populate[0]=featuredImage`) og giv det et forsidebillede og
2-3 billeder i teksten med `PUT $STRAPI_API_URL/api/blog-posts/<documentId>`.
Ændr ikke indlæggets øvrige tekst. Nævn det i rapporten.

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
- `featuredImage` - id fra upload (se "Billeder"). Påkrævet.

Bekræft **HTTP 201** + `documentId` + `publishedAt`. Fejler POST'en: STOP,
rapportér, og deploy ikke.

## Sitemap - der er intet at gøre

**Byg ikke, og deploy ikke.** Siden bygger ikke længere sitemap som et
committet artefakt. `web/src/app/sitemap.ts` henter sider, blogindlæg og cases
direkte fra Strapi ved **hver forespørgsel** (`export const dynamic =
"force-dynamic"`). ISR var ikke nok: Next.js emitterede så sitemap.xml som en
statisk fil, og Vercel serverede den fra edge uden at ramme origin.

Det betyder: sitemappet er opdateret med det samme, og selve artiklen er live
inden for ~60 sekunder (siden bruger ISR). Uden build, uden deploy, uden
Vercel-token.

(Historik: før 2026-08-28 lå sitemap i `public/sitemap-0.xml`, genereret af
`next-sitemap` som `postbuild`. Vercel kører `next build` direkte, så det trin
fyrede aldrig i produktion - derfor skulle en lokal maskine bygge og committe
filen ved hvert indlæg. Det var netop dét, der bandt udgivelsen til en tændt
laptop. `/sitemap-0.xml` redirecter nu permanent til `/sitemap.xml`.)

## Verificér live

Vent ~60 sekunder efter POST, så artikelsidens ISR-cache har hentet det nye
indhold. Sitemappet er dynamisk og behøver ingen ventetid.

Statuskoden alene er ikke nok (ukendte slugs giver også 200):

    curl -s https://ai-konsulenterne.dk/viden-om-ai/DIN-SLUG | grep -o "<title>[^<]*</title>"

Titlen skal være artiklens - ikke "Artikel ikke fundet". Tjek også:

    curl -s https://ai-konsulenterne.dk/sitemap.xml | grep -c "DIN-SLUG"   # 1

Mangler slug'en i sitemap, er det et reelt problem - sitemappet bygges per
forespørgsel, så der er ingen cache at vente på. Tjek at posten faktisk er
`published` i Strapi, og rapportér det. Byg ikke og deploy ikke for at "tvinge"
den igennem.

## Efter udgivelse

1. Tilføj en linje i `web/content/blog-log.md`: dato, spor, keyword, søjle, slug, URL.
2. Er emnet taget fra `blog-backlog.md`, så lad rækken stå - loggen er facit
   for hvad der er udgivet.
3. Commit `web/content/blog-log.md` med `blog: [titel]` og push til `main`.
   Det er den eneste fil, der ændrer sig - sitemap er dynamisk.
4. Rapportér: emne og hvorfor, titel, slug, fuld URL, excerpt, bekræftelse på
   at det er live, og hvor mange emner der er tilbage i backloggen.
   Gik noget galt: rapportér fejlen tydeligt i stedet for at pynte på den.
