# Blog-backlog — AI Konsulenterne

Denne fil styrer den løbende blog-kadence. Den ugentlige automatik læser listen,
vælger det **øverste emne der IKKE allerede er udgivet** (tjek mod Strapi-slugs),
skriver indlægget, udgiver til Strapi og deployer.

Rediger frit: tilføj emner nederst, omprioritér ved at flytte linjer op/ned,
eller fjern emner du ikke vil have skrevet.

---

## Emne-kø (prioriteret — øverst skrives først)

| # | Primært søgeord (volumen) | Vinkel | Case som proof | Intern-link |
|---|---|---|---|---|
| 1 | ai automatisering (200) | Hvad kan AI automatisere i en virksomhed — konkrete steder | Wunderwear, J.M Band | /skraeddersyede-ai |
| 2 | ai implementering (100) | Sådan implementerer I AI uden at det strander | INDKOM | /ai-strategi |
| 3 | ai og gdpr | Kan man bruge AI GDPR-sikkert? Ja - sådan | Lavazza | /skraeddersyede-ai |
| 4 | chatgpt vs skræddersyet ai | Hvornår rækker ChatGPT, og hvornår skal I bygge selv | Wunderwear, J.M Band | /skraeddersyede-ai |
| 5 | generativ ai (generativ ai kursus 100) | Hvad er generativ AI - forklaret for virksomheder | - | /academy |
| 6 | ai i hr (80) | 5 HR-opgaver AI kan tage fra jer | Lavazza | /ai-i-hr |
| 7 | ai kundeservice (100) | Sådan bygger man en AI-kundeservice der faktisk svarer rigtigt | Wunderwear, J.M Band | /ai-kundeservice |
| 8 | hvad koster ai / ai roi | Hvad koster en AI-løsning - og hvornår tjener den sig hjem | INDKOM | /ai-analyse |
| 9 | ai i sundhedsvæsenet (50) | AI i sundhed & pleje - hvor det giver mening | - | /skraeddersyede-ai |
| 10 | ai foredrag (150) | Hvad får I ud af et AI-foredrag - og hvornår er en workshop bedre | - | /workshop |

Når listen er tom: skriv et fordybende opfølgnings-indlæg til et af de
bedst-performende emner (dybere guide, ny vinkel, opdaterede eksempler).

---

## Skrive-regler (SKAL følges — ellers skader indlægget brandet)

- **Sprog:** Dansk. AIK's stemme "AI i øjenhøjde" — nede på jorden, ærlig,
  konkret, jargonfri. Selvsikker, men ikke smart-i-en-fart.
- **Tegnsætning:** BINDESTREG (-), aldrig tankestreg (—). Kapital "I"/"jer".
- **Længde:** 700-900 ord. 5-7 `##`-overskrifter, korte afsnit, gerne 1-2
  punktlister. Start evt. med en klar definition (godt til Googles snippet).
- **ALDRIG opdigt:** ingen fabrikerede tal, citater eller cases. Kun disse
  rigtige cases må nævnes:
  - **Wunderwear** — webshop; automatiseret ordrehåndtering + AI-kundeservice
    der besvarer 80% af de gentagne spørgsmål.
  - **J.M Band** — AI-agent der samler data på tværs af CRM, Shopify og interne
    systemer.
  - **Lavazza** — datasikker HR-agent trænet på interne dokumenter, lukket miljø.
  - **INDKOM** — AIK som ekstern AI-afdeling: kortlagde processer, fandt 3 use
    cases, byggede dem ind.
  - Case-links: /cases/wunderwear-automation, /cases/jm-band-ai-agent,
    /cases/lavazza-hr-agent, /cases/indkom-ai-partnerskab
- **Generelle tal:** kun research-baserede med kilde. McKinsey (20-30%
  tidsbesparelse i administrative processer med AI), MIT-studie (~40% hurtigere
  opgaveløsning). Kun hvis relevant.
- **Afslut** med en blød CTA: gratis AI-afklaring (ingen forpligtelse), evt.
  Alexander på +45 25 54 70 74. Væv 1-2 interne links naturligt ind (kolonnen
  ovenfor + relevante løsnings-sider).

---

## Strapi-felter (blog-posts collection)

POST til `/api/blog-posts?status=published` med `{"data": {...}}`:

- `title` — fængende, keyword forrest, ~55-65 tegn
- `slug` — kebab-case, æøå → ae/oe/aa, ikke allerede brugt
- `category` — "guide" (eller business-case / compliance)
- `excerpt` — 1-2 sætninger, ~150 tegn
- `content` — markdown, start med `##` (IKKE `#` — H1 sættes af siden)
- `seoTitle` — **≤41 tegn** (siden føjer " | AI Konsulenterne" til → ≤60)
- `seoDescription` — ≤155 tegn, keyword + værdi
- `keywords` — array med 5 relevante
- `readingTime` — tal (minutter)
- `author` — "AI Konsulenterne"

Efter udgivelse: kør en produktions-rebuild (`vercel --prod`) så indlægget
kommer med i sitemap og statisk genereres.
