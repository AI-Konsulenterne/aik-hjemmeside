# AI Konsulenterne — hjemmesiden

Next.js-sitet til ai-konsulenterne.dk. Alt indhold ligger i repoet; der er
intet CMS (Strapi blev lukket 29/9 2026).

## Struktur

```
ai-konsulenterne/
├── web/                     ← Next.js hjemmeside (deployes til Vercel)
│   ├── content/blog/        ← artiklerne i Viden om AI, én markdown-fil pr. artikel
│   ├── src/content/         ← cases, holdet, filmen, FAQ
│   └── scripts/tjek-blog.mjs← tjek af artiklerne før push
├── aik-design-system/       ← AIK brand guidelines
└── *.md                     ← Setup guides og dokumentation
```

## Lokal udvikling

```bash
cd web
npm install
npm run dev          # → http://localhost:3000
npm run tjek-blog    # tjekker alle artikler (format, links, forbudte påstande)
```

## Indhold

- **Artikler:** `web/content/blog/<slug>.md`. Format, regler og udgivelse står i
  `web/content/blog-cloud-runbook.md`. En ny artikel er en ny fil, pushet til `main`.
- **Cases:** `web/src/content/cases.ts` (Lavazza, J.M Band, Wunderwear).
- **Holdet:** `web/src/content/team.ts`, fotos i `web/public/team/`.

## Deployment

- **Vercel:** Root directory = `web/` — auto-deploy fra git push til `main`.
  Artikler, cases og sitemap bygges med.

Se `DEPLOY.md` for fuld guide.

## Dokumentation

- `CLAUDE.md` — Kodningsguidelines og brand-info
- `DEPLOY.md` — Hostingdetaljer (Vercel)
- `COOKIEBOT-SETUP.md` — Cookie consent setup
- `SEO-STRATEGI.md` — Keyword-strategi og content-kalender
