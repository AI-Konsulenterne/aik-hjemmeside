---
title: "AI og GDPR: Sådan bruger I AI uden at bryde reglerne"
slug: "ai-og-gdpr-saadan-bruger-i-ai-sikkert"
excerpt: "GDPR forbyder ikke AI, men stiller krav til, hvordan I behandler data. Her er de fire spørgsmål, I skal kunne svare på, før I sætter AI i drift."
category: "guide"
author: "AI Konsulenterne"
publishedAt: "2026-09-28T05:08:18.918Z"
updatedAt: "2026-09-29T12:00:00.000Z"
seoTitle: "AI og GDPR: Ja, I må godt bruge AI"
seoDescription: "AI og GDPR kan godt gå hånd i hånd, når I ved, hvor data lander. Få de fire spørgsmål, I skal kunne svare på, og de typiske faldgruber forklaret enkelt."
keywords: ["ai og gdpr", "gdpr og ai", "ai datasikkerhed", "ai persondata", "gdpr sikker ai"]
---

## AI og GDPR: det korte svar

GDPR forbyder ikke AI. Reglerne siger ikke noget om, hvilken teknologi I må bruge. De siger noget om, hvordan I må behandle personoplysninger. Et AI-værktøj er i den forstand endnu et system, der behandler data. Kan I forklare, hvilke data der går ind, hvor de ender, og hvorfor I må bruge dem, har I styr på det vigtigste.

Så ja: I kan godt bruge AI og overholde GDPR. Det kræver bare, at I tager stilling til nogle få ting, inden I går i gang, ikke bagefter.

## Problemet er sjældent AI. Det er, hvor data lander

En typisk GDPR-fejl er ikke avanceret. Den ser sådan her ud: en medarbejder kopierer en kundeklage, en ansøgning eller en note med personoplysninger ind i et gratis AI-værktøj for at få hjælp til at formulere et svar.

I det øjeblik er data sendt ud af huset til en leverandør, I ikke har en aftale med, på en server, I ikke kender, måske uden for EU.

Teknologien er ikke problemet. Problemet er, at ingen har taget stilling til, hvor data må ende.

## Fire spørgsmål, I skal kunne svare på

Inden I sætter AI ind i en arbejdsgang, så tag de her fire. De dækker det meste:

- **Hvilke data rører løsningen?** Er der overhovedet personoplysninger involveret? Mange AI-opgaver rører slet ingen: produktbeskrivelser, interne vejledninger, referater uden navne.
- **Hvad er jeres grundlag for at behandle dem?** I skal have et gyldigt grundlag for at behandle personoplysninger (det hedder et behandlingsgrundlag), og det bliver hverken bedre eller dårligere af, at det er AI, der gør arbejdet. Men bruger I oplysningerne til noget nyt, fx til at træne en model, skal I tjekke, at det nye formål også er i orden.
- **Hvor bliver data behandlet og gemt?** Hvilken leverandør, hvilket land, hvor længe. Og har I en databehandleraftale på plads?
- **Bliver data brugt til at træne leverandørens model?** På gratis- og forbrugerversioner er svaret ofte ja som udgangspunkt. På erhvervsaftaler er det typisk slået fra. Tjek det, gæt ikke.

Kan I svare på alle fire, er I godt på vej.

## Hvor det typisk går galt

- **Ingen regler, så laver folk deres egne.** Uden en politik bruger medarbejderne ofte AI alligevel, bare på deres private konti, hvor I hverken kan se eller styre det.
- **Alt data i én stor bunke.** Løsningen får adgang til hele drevet i stedet for de mapper, den faktisk skal bruge. Dataminimering er ikke bare pænt, det er et krav i GDPR.
- **Ingen sletning.** Ingen tager stilling til, hvor længe samtaler, uploads og logs bliver liggende. GDPR kræver, at personoplysninger ikke gemmes længere end nødvendigt.
- **Ingen mennesker i beslutningen.** AI må gerne forberede, sortere og foreslå. Men beslutninger med konsekvenser for et menneske bør et menneske stå på mål for. GDPR giver som udgangspunkt folk ret til ikke at være underlagt afgørelser, der alene bygger på automatisk behandling, hvis afgørelsen har retsvirkning for dem eller på lignende måde påvirker dem betydeligt.

Ingen af de fire kræver et stort juridisk projekt at rette op på. De kræver, at nogen tager stilling.

## Sådan ser et datasikkert AI-setup ud i praksis

For Lavazza byggede vi en HR-agent, der svarer ud fra virksomhedens egne HR-dokumenter, personalehåndbog og politikker og kører i et lukket miljø. Medarbejderne får svar på sekunder i stedet for dage, og data forlader ikke virksomheden og bruges ikke til at træne modeller.

Pointen er ikke selve agenten. Pointen er, at datasikkerhed var et krav fra starten, ikke noget, der skulle løses, da agenten var i drift. Det er ofte forskellen på et AI-projekt, der kan udvides, og et, der bliver lukket ned igen.

Læs hele historien i [casen om Lavazzas HR-agent](/cases/lavazza-hr-agent).

Nogle gange er svaret et almindeligt AI-værktøj på en erhvervsaftale med ordentlige indstillinger. Det er billigt, hurtigt og fint til alt det, der ikke rører følsomme data.

Andre gange skal løsningen bygges, så data bliver, hvor de er: eget miljø, adgang kun til de dokumenter, der er nødvendige, logning, I selv ejer, og sletteregler, I selv sætter. Det er typisk der, vi bygger [skræddersyede AI-løsninger](/skraeddersyede-ai), ikke fordi det er finere, men fordi det er sådan, I får både gevinsten og kontrollen.

Valget mellem de to kræver som regel en kort snak, ikke et halvt års udredning.

## Og hvad med EU's AI-forordning?

EU's AI-forordning stiller krav efter, hvor risikofyldt anvendelsen er. For de fleste danske virksomheder er to krav de mest relevante. Det ene handler om AI-færdigheder: I skal træffe foranstaltninger, der støtter medarbejdernes evne til at bruge AI fornuftigt. Det andet handler om gennemsigtighed: fra 2. august 2026 skal AI-systemer, der taler direkte med mennesker, som udgangspunkt være lavet, så folk får at vide, at de taler med en AI. Vi har gennemgået kravene i [AI-politik for virksomheder](/viden-om-ai/ai-politik-for-virksomheder).

Vi er ikke jurister, og de endelige vurderinger skal I have fra nogen, der er. Men i praksis peger GDPR og AI-forordningen samme vej: hold styr på jeres data, vid, hvad løsningen gør, og lad et menneske have det sidste ord.

## Kom i gang uden at male jer op i et hjørne

Start med en arbejdsgang, hvor der ikke er personoplysninger i spil. Få gevinsten hjem, find ud af, hvordan I arbejder med det, og tag så det næste skridt med data, der kræver mere omtanke.

Er I i tvivl om, hvor jeres data må ende, så tag en gratis AI-afklaring med os. 45 minutter, ingen forpligtelse, og I skal ikke forberede noget. Vi kigger på jeres arbejdsgange og siger ærligt, hvad der kan lade sig gøre inden for GDPR, og hvad der ikke kan.

Ring til Alexander på +45 25 54 70 74, eller [skriv til os](/kontakt).
