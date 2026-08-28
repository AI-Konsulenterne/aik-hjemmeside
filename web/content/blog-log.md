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
- **Sitemap:** opdateres IKKE af Vercel-buildet. Efter udgivelse køres fra `web/`:
  `rm -rf .next/cache && npm run build`, derefter deploy fra repo-roden med
  `npx vercel --prod --yes --force`. Verificér at slug'en står i
  `public/sitemap-0.xml`.
- **Link-mål der findes:** `/academy`, `/workshop`, `/skraeddersyede-ai`,
  `/ai-strategi`, `/ai-i-hr`, `/ai-kundeservice`, `/ai-analyse`, `/ai-i-e-commerce`,
  `/visionai` samt cases under `/cases/`.
- **`/copilot-kursus` findes IKKE** (404 pr. 2026-08-28). Link ikke dertil,
  før siden er bygget - brug `/academy` som CTA i stedet.
