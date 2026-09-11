# Blog-log — AI Konsulenterne

Løbende log over udgivne blogposts. **Læs denne fil FØR hvert nyt post**, så emner
ikke gentages. Bruges af `aik-blog`-skillen (spor: TREND tirsdag / KEYWORD torsdag).

Posts udgives til **Strapi** (collection `blog-posts`), ikke som markdown-filer i
repoet. Se udgivelsesnoter nederst.

| Dato | Spor | Keyword / emne | Slug | URL |
|---|---|---|---|---|
| 2026-08-28 | keyword | ai konsulent | `hvad-laver-en-ai-konsulent` | [/viden-om-ai/hvad-laver-en-ai-konsulent](https://ai-konsulenterne.dk/viden-om-ai/hvad-laver-en-ai-konsulent) |
| 2026-08-28 | keyword | generativ ai | `hvad-er-generativ-ai` | [/viden-om-ai/hvad-er-generativ-ai](https://ai-konsulenterne.dk/viden-om-ai/hvad-er-generativ-ai) |
| 2026-08-28 | trend | Microsoft samler Copilot i én app (august 2026) | `copilot-en-app-hvad-betyder-det-for-jeres-data` | [/viden-om-ai/copilot-en-app-hvad-betyder-det-for-jeres-data](https://ai-konsulenterne.dk/viden-om-ai/copilot-en-app-hvad-betyder-det-for-jeres-data) |
| ukendt (fundet i Strapi, aldrig logget) | trend | Microsoft-analyse: kulturen bremser AI | `microsoft-analyse-kulturen-bremser-jeres-ai` | [/viden-om-ai/microsoft-analyse-kulturen-bremser-jeres-ai](https://ai-konsulenterne.dk/viden-om-ai/microsoft-analyse-kulturen-bremser-jeres-ai) |
| 2026-09-04 | keyword | ai i hr | `ai-i-hr-5-opgaver-ai-kan-overtage` | [/viden-om-ai/ai-i-hr-5-opgaver-ai-kan-overtage](https://ai-konsulenterne.dk/viden-om-ai/ai-i-hr-5-opgaver-ai-kan-overtage) |
| 2026-09-04 | trend | Copilot skifter til forbrugsbetaling (Copilot Credits) | `copilot-priser-2026-hvad-ai-koster-med-20-ansatte` | [/viden-om-ai/copilot-priser-2026-hvad-ai-koster-med-20-ansatte](https://ai-konsulenterne.dk/viden-om-ai/copilot-priser-2026-hvad-ai-koster-med-20-ansatte) |
| 2026-09-08 | trend | Copilot Cowork — agentisk Copilot ruller ud på Windows/macOS | `copilot-cowork-naar-ai-udfoerer-opgaver-for-jer` | [/viden-om-ai/copilot-cowork-naar-ai-udfoerer-opgaver-for-jer](https://ai-konsulenterne.dk/viden-om-ai/copilot-cowork-naar-ai-udfoerer-opgaver-for-jer) |
| 2026-09-09 | keyword | hvad koster ai / ai roi | `hvad-koster-en-ai-loesning` | [/viden-om-ai/hvad-koster-en-ai-loesning](https://ai-konsulenterne.dk/viden-om-ai/hvad-koster-en-ai-loesning) |
| 2026-09-10 | keyword | ai i sundhedsvæsenet (backlog #9 - #7 "ai kundeservice" sprunget over, dækket af `ai-automatisering-af-kundeservice`) | `ai-i-sundhedsvaesenet-hvor-det-giver-mening` | [/viden-om-ai/ai-i-sundhedsvaesenet-hvor-det-giver-mening](https://ai-konsulenterne.dk/viden-om-ai/ai-i-sundhedsvaesenet-hvor-det-giver-mening) |
| 2026-09-11 | trend | AI-agent-sikkerhed - kritisk hul (CVE-2026-79696) i Google ADK 09-09 | `ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren` | [/viden-om-ai/ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren](https://ai-konsulenterne.dk/viden-om-ai/ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren) |

---

## Tidligere posts (før loggen blev oprettet)

Udgivet via `blog-backlog.md`-køen. Medtaget her, så emnerne ikke gentages.

| Dato | Keyword / emne | Slug |
|---|---|---|
| 2026-08-28 | chatgpt vs skræddersyet ai | `chatgpt-vs-skraeddersyet-ai` |
| 2026-08-19 | ai og gdpr | `ai-og-gdpr-saadan-bruger-i-ai-sikkert` |
| 2026-07-13 | ai implementering | `ai-implementering-saadan-lykkes-det` |
| 2026-07-05 | ai automatisering | `ai-automatisering-hvad-kan-i-automatisere` |
| 2026-07-05 | ai marketing | `hvad-er-ai-marketing` |
| 2026-07-05 | ai rådgivning | `ai-raadgivning-saadan-faar-din-virksomhed-vaerdi` |
| 2026-07-05 | ai automatisering kundeservice | `ai-automatisering-af-kundeservice` |
| 2026-07-05 | første ai use case | `saadan-vaelger-i-jeres-foerste-ai-use-case` |
| 2026-07-04 | ai kursus for virksomheder | `ai-kursus-for-virksomheder-saadan-vaelger-i-det-rigtige` |
| 2026-07-04 | ai i produktion | `ai-i-produktion-spar-tid` |

---

## Udgivelsesnoter (gælder dette repo)

- **Publicering:** POST til `{STRAPI_API_URL}/api/blog-posts?status=published` med
  `{"data": {...}}`. Felter og regler: se [`blog-backlog.md`](blog-backlog.md).
- **`seoTitle` skal være ≤41 tegn** — ikke 60. Siden føjer selv
  `" | AI Konsulenterne"` til, så det rendrede `<title>` lander på ≤60.
- **Sitemap:** intet at gøre. `web/src/app/sitemap.ts` henter sider, blogindlæg
  og cases direkte fra Strapi med 60s ISR, så et nyt indlæg står i
  `/sitemap.xml` cirka et minut efter udgivelse - uden build og uden deploy.
  (Før 2026-08-28 var det et committet artefakt genereret af `next-sitemap`,
  som krævede lokalt build + deploy ved hvert indlæg.)
- **Link-mål der findes:** `/academy`, `/workshop`, `/skraeddersyede-ai`,
  `/ai-strategi`, `/ai-i-hr`, `/ai-kundeservice`, `/ai-analyse`, `/ai-i-e-commerce`,
  `/visionai` samt cases under `/cases/`.
- **`/copilot-kursus` findes IKKE** (404 pr. 2026-08-28). Link ikke dertil,
  før siden er bygget - brug `/academy` som CTA i stedet.
- **Cloud-sandkassen kan ikke nå `ai-konsulenterne.dk`** (pr. 2026-09-04):
  egress-gateway'en svarer `curl: (56) CONNECT tunnel failed, response 403`.
  Strapi kan nås fint, så udgivelsen virker - men live-tjekket af `<title>`
  og `/sitemap.xml` kan ikke køres fra skyen. Verificér i stedet via Strapi
  (`?status=published` + `publishedAt`), og tjek siden manuelt i en browser.
