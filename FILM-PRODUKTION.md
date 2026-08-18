# Referencefilmen — produktionsbrief

Alt hvad der skal til for at producere klippene til `ProofFilm`. Skrevet så en
ny session kan tage over uden at have samtalen med.

**Status:** koden er færdig og pushet. Klippene mangler — alle `generate_*`-kald
mod Higgsfield returnerede `MCP tool call requires approval` i den session hvor
koden blev skrevet. Der er ikke brugt credits.

---

## Sådan gør du

1. Generér de fire plates (`generate_image_batch`, prompts nedenfor).
2. Kig dem igennem. Kravet er at **de fire ligner hinanden** — samme grade,
   samme kornstruktur, præcis ét varmt orange lyspunkt i hver. Ellers om igen.
3. Animér hver plate til et klip (`generate_video_batch`, plate som `start_image`).
4. Hent filerne ned i `web/public/film/` med navnene i tabellen.
5. Sæt `enabled: true` på de shots i `web/src/content/film.ts` der har fået klip.

---

## Modelvalg

| Trin | Model | Indstillinger | Hvorfor |
|---|---|---|---|
| Plates | `nano_banana_pro` | `resolution: 4k`, `aspect_ratio: 16:9` | Bedste promptfølgsomhed — vi har brug for at "ingen logoer, ingen tekst" bliver overholdt. 4K fordi posterframes bruges i fuld bredde på `/referencer`, og nedskalering slår opskalering. |
| Klip | `seedance_2_5` | `mode: omni_reference`, `duration: 5`, `resolution: 1080p`, `bitrate_mode: high`, `generate_audio: false`, plate som `start_image` | Nyere end 2.0 og har `omni_reference`, der er bygget til at holde ét look på tværs af separate generationer. Maks 1080p, men det er alligevel loftet: otte 4K-klip ville sprænge LCP-budgettet i CLAUDE.md. |

**Lyd skal være slået fra.** Klippene er baggrund, ikke video med lyd.

---

## Testrunden: fire shots

Valgt så de presser graden mest muligt. Holder ét look på tværs af de fire,
holder det på tværs af alle otte.

| Fil | Linje | Hvad shottet tester |
|---|---|---|
| `kaffe` | brygger din kaffe | Varmt interiør, tungsten |
| `bil` | importerer din bil | Koldt eksteriør, vidvinkel, dis |
| `mobilnet` | bygger mobilnettet, du ringer på | Blå time, silhuet, stor dybde |
| `telefon` | samler telefonen i din lomme | Koldt interiør, makro |

Filnavne: `web/public/film/<id>.webp` (poster) og `<id>.mp4` (klip).

De fire resterende ligger i `film.ts` med `enabled: false` — tekst og alt-tekst
er skrevet, klip mangler: `mejeri`, `staal`, `kirke`, `kontor`.

---

## Fælles style-DNA

Skal stå **ordret ens** i alle fire prompts. Det er den der holder looket samlet:

> Cinematic documentary still, shot on 35mm anamorphic lens at f/2.0, shallow
> depth of field with soft creamy bokeh, muted desaturated cool-neutral colour
> grade of slate greys and off-white and cool steel, broken by exactly one warm
> amber-orange practical light source inside the frame, soft diffused overcast
> industrial light, fine natural 35mm film grain, subtle halation bloom around
> the orange highlight, composition placed off-centre with generous empty
> negative space in the upper third, photorealistic.

Og til sidst i hver prompt:

> STRICT: no visible faces, no text of any kind, no logos, no brand marks, no
> signage, no lettering, no numbers, no watermarks, no labels.

Det tomme felt i øverste tredjedel er ikke pynt — headeren og teksten ligger
oven på klippet.

---

## De fire subjects

Sæt ind mellem style-DNA og STRICT-linjen.

**kaffe**
> SUBJECT: interior of an industrial coffee roastery, freshly roasted dark coffee
> beans cascading in a thick stream out of the steel drum of a large roaster into
> a circular cooling tray, beans caught in mid-air motion, the roaster burner port
> glowing warm amber-orange, a worker's gloved hands resting on the drum lever
> blurred in the background.

**bil** *(tilføj `no badges, no number plates` til STRICT)*
> SUBJECT: a vehicle import terminal on a quay at dawn, long converging rows of
> brand-new unbadged silver and grey cars parked in perfect formation on wet
> asphalt, the open steel ramp of a roll-on roll-off cargo ship rising in the misty
> background, a single warm amber-orange sodium quay lamp glowing on a mast above
> the rows.

**mobilnet** *(brug kold blågrå i stedet for slate/off-white i grade-linjen)*
> SUBJECT: a tall telecommunications lattice mast at blue hour rising above a low
> sea of fog, a rigger in a safety harness silhouetted small and far away near the
> top seen from behind, working on an antenna array, a warm amber-orange aviation
> warning light glowing on the mast beside them, cold blue-grey sky.

**telefon** *(brug cool white / machined aluminium / slate grey i grade-linjen)*
> SUBJECT: interior of a precision electronics manufacturing cleanroom, a gloved
> hand lowering a machined bare aluminium unibody chassis onto a black fixture on a
> CNC machine bed, fine metal chips and cutting fluid visible, a warm amber-orange
> status LED glowing on the machine housing, cool white cleanroom light.

---

## Bevægelse i klippene

Hvert klip: **én langsom, ensartet bevægelse**, intet andet. Enten et roligt
push-in eller en langsom sideglidning — men samme slags i alle fire, ellers
falder rytmen fra hinanden. Ingen klip inde i klippet, ingen kamerarykl, ingen
zoom-out. Motivet må gerne bevæge sig (bønner der falder, tåge der driver);
kameraet skal næsten stå stille.

Overgangen mellem shots ligger i CSS (`--film-fade` i `globals.css`), ikke i
videoen. Klippene skal derfor hverken starte eller slutte med fade — de skal
være "flade" hele vejen igennem.

---

## ⚠️ Skal afklares med Alexander før det går i luften

1. **`kirke` og `kontor`.** De to linjer kom fra oplægget, men jeg ved ikke
   hvilke kunder de peger på. Alle andre shots kan spores til et logo der
   allerede lå i `web/public/logos/`.
2. **Registret på `/referencer`.** Hver brancherække mangler én sætning om hvad
   vi konkret byggede. Den er bevidst efterladt tom — der er ikke gættet på
   resultater.
3. **Grundlaget for headlinen.** "Danmarks største virksomheder" dækker både
   reelle kunder og steder hvor vores folk har siddet som ansatte. Underteksten
   siger det ærligt, men Alexander skal bekræfte at formuleringen holder.
