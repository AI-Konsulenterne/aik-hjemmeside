# Deployment Guide — AI Konsulenterne

Sitet er ét Next.js-projekt i `web/`, der deployes til **Vercel** (gratis tier er
nok). Der er intet CMS: artikler, cases og holdet ligger i repoet (Strapi blev
lukket 29/9 2026), så alt indhold bygges med ved hvert deploy.

---

## Deploy til Vercel

### Forudsætninger

- GitHub-konto (siden skal pushes til et repo — kan være privat)
- Vercel-konto (gratis — opret via GitHub login på [vercel.com](https://vercel.com))

### Trin 1 — Push koden til GitHub

Hvis repo'et ikke allerede er på GitHub:

```bash
cd "Ny AIK hjemmeside"
git init  # hvis ikke allerede gjort
git add .
git commit -m "Initial commit"

# Opret repo på github.com → kopier URL
git remote add origin git@github.com:<bruger>/aik-hjemmeside.git
git branch -M main
git push -u origin main
```

**⚠️ Tjek inden push:** `.env.local` skal være i `.gitignore` (det er den allerede).

### Trin 2 — Import projektet til Vercel

1. Gå til **[vercel.com/new](https://vercel.com/new)**
2. Klik **"Import Git Repository"**
3. Vælg AIK-repo'et
4. **Root Directory:** `./` (default — lad være som det er)
5. **Framework Preset:** Next.js (auto-detecteres)
6. **Build Command:** `npm run build` (default)

### Trin 3 — Tilføj environment variables

Inden du klikker "Deploy" — klik **"Environment Variables"** og tilføj:

**Cal.com (virker allerede):**
```
NEXT_PUBLIC_CAL_USERNAME = alexanderaik/45-min.-ai-afklaring
NEXT_PUBLIC_CAL_ORIGIN = https://app.cal.eu
NEXT_PUBLIC_CAL_EMBED_URL = https://app.cal.eu/embed/embed.js
```

**Cookiebot (tilføj senere når I har kontoen):**
```
NEXT_PUBLIC_COOKIEBOT_ID = <tomt indtil I har ID>
```

**Google Analytics (tilføj senere):**
```
NEXT_PUBLIC_GA_ID = <tomt indtil I har GA4-property>
```

**ActiveCampaign (tilføj senere):**
```
ACTIVECAMPAIGN_API_URL = 
ACTIVECAMPAIGN_API_KEY = 
ACTIVECAMPAIGN_LIST_ID = 
ACTIVECAMPAIGN_TAG = ai-guide-download
```

Tomme variabler er OK — siden virker uden dem (fallback-adfærd i koden).

### Trin 4 — Deploy

Klik **"Deploy"** → tager 2-3 min.

Du får en Vercel preview URL: `aik-hjemmeside-xxxx.vercel.app`

### Trin 5 — Custom domæne

Når du er klar til launch:

1. Vercel Dashboard → Project → **Settings** → **Domains**
2. Tilføj `ai-konsulenterne.dk`
3. Opdater DNS hos Simply (jeres domæneudbyder):
   - Type: `A` → Værdi: `76.76.21.21` (Vercel's IP)
   - Eller CNAME for www: `cname.vercel-dns.com`
4. Vent 1-24 timer på DNS-propagation

### Trin 6 — Redeploys

- Hver `git push` til `main` trigger automatisk deploy
- Andre branches får preview URLs
- Manual redeploy: Vercel Dashboard → Deployments → Redeploy

---

## ✅ Efter deploy — tjek-liste

- [ ] `https://din-domæne.com` loader forside
- [ ] `/cases` viser de tre cases, og `/viden-om-ai` viser alle artikler
- [ ] Cal.com popup virker (klik "Få jeres gratis AI-plan")
- [ ] Nyhedsbrev-form på footer returnerer success
- [ ] `/privatlivspolitik`, `/cookiepolitik`, `/handelsbetingelser` loader
- [ ] Mobil-visning ser ok ud (test på telefon)
- [ ] Cookie-banner vises (når Cookiebot-ID er sat)
- [ ] GA4 tracker events (når GA-ID er sat)

---

## 🔐 Sikkerhed — checklist før launch

- [ ] Alle API tokens er **read-only** hvor det er muligt
- [ ] `.env.local` er i `.gitignore` (tjek: `git check-ignore .env.local`)

---

## 🚨 Rollback

Hvis noget går galt efter deploy:

**Vercel:**
- Dashboard → Deployments → find forrige good deployment → **"Promote to Production"**

---

*Opdateret: September 2026 (Strapi lukket)*
