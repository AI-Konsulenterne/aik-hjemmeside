---
title: "AI der tager telefonen: hvad det koster for jer i praksis"
slug: "ai-der-tager-telefonen-hvad-det-koster"
excerpt: "Stemme-AI kan nu tage telefonen, og selve stemmen koster cirka 33 øre i minuttet. Vi regner på, hvad det reelt koster med 20 ansatte, og hvor I skal starte."
category: "news"
author: "AI Konsulenterne"
publishedAt: "2026-09-15T06:18:05.927Z"
updatedAt: "2026-09-29T12:00:00.000Z"
seoTitle: "AI der tager telefonen: hvad koster det"
seoDescription: "OpenAI åbnede 10. september for stemme-AI til 0,05 dollar i minuttet. Se hvad det reelt koster med 20 ansatte, hvor det giver mening, og hvad I skal teste."
keywords: ["ai der tager telefonen", "stemme-ai", "ai kundeservice telefon", "gpt-live-1", "ai telefonsvarer"]
---

## Kan AI tage telefonen for jer nu?

Teknisk set, ja. Den 10. september 2026 gjorde OpenAI stemmemodellen GPT-Live-1 tilgængelig i sit API til 0,05 dollar i minuttet, altså cirka 33 øre for hvert minut, samtalen varer. Modellen er full duplex, det vil sige, at den lytter og taler på samme tid, så en kunde kan afbryde midt i en sætning, uden at samtalen bryder sammen. Og den kan kobles på telefonnettet, så den kan sidde for enden af et rigtigt telefonnummer. Men prisen dækker kun stemmelaget, og OpenAI skriver selv, at modellen på nogle sprog kan have en accent eller huller i den flydende tale. Så det korte svar til en virksomhed med 20 ansatte er: ja, det kan lade sig gøre, men I skal ikke sætte den på hovednummeret i denne uge.

## Hvad blev der egentlig annonceret?

OpenAI beskriver GPT-Live-1 som en stemmemodel til samtaler i realtid, og den blev åbnet for udviklere i API'et den 10. september 2026. Se [OpenAIs egen annoncering](https://openai.com/index/introducing-gpt-live-1-in-the-api/) og [prisen i OpenAIs dokumentation](https://developers.openai.com/api/docs/models/gpt-live-1).

De tre ting, der faktisk betyder noget for jer:

- **Full duplex.** Modellen lytter, mens den taler. Det lyder som en detalje, men det er præcis det, der har gjort ældre telefonrobotter uudholdelige: man skulle vente på, at stemmen blev færdig, før man kunne sige noget. Nu kan man afbryde.
- **Telefoni.** Modellen kan kobles direkte på telefoni, og OpenAI fremhæver bedre håndtering af pauser, afbrydelser og baggrundsstøj. Ifølge flere gennemgange af lanceringen er den også blevet bedre til at forstå koder med tal og bogstaver, som ordrenumre og postnumre.
- **Prisen er offentlig.** 0,05 dollar i minuttet for stemmen, afregnet pr. sekund. Det betyder, at I kan lave et groft overslag, før I taler med en leverandør.

## Hvad koster det for en virksomhed med 20 ansatte?

Lad os regne på det med nogle åbne forudsætninger. Sig, at I får 300 opkald om måneden, og at et gennemsnitligt opkald varer 4 minutter. Det er 1.200 minutter. Til 0,05 dollar i minuttet bliver stemmelaget cirka 60 dollar, altså omkring 400 kroner om måneden med dollarkursen i september 2026.

Det tal er rigtigt, men misvisende, hvis I stopper der. Prisen dækker kun stemmen. Oven i kommer:

- Den model, der tænker bag stemmen. Den afgør, om AI'en svarer rigtigt, og den bliver afregnet for sig.
- Telefonnummer og telefoniudbyder.
- Integrationen til jeres systemer. En AI, der ikke kan se jeres ordrer, kan ikke svare på "hvor er min pakke".
- Opsætning, test og løbende justering. Efter vores vurdering er det her, de fleste penge og den meste tid går det første år.

Realistisk er selve minutprisen den mindste post på regnskabet. Det gode ved annonceringen er ikke, at AI-telefoni er blevet billigt. Det er, at den variable pris nu er så lav, at det hele afhænger af, om løsningen bliver bygget rigtigt. Vil I have en mere generel gennemgang af, hvordan man regner på det, har vi skrevet om [hvad en AI-løsning koster](/viden-om-ai/hvad-koster-en-ai-loesning).

## Hvor giver det mening, og hvor gør det ikke?

Stemme-AI er, ligesom anden AI i kundeservice, stærkest til det snævre og svagest til det brede. Start her:

1. **Opkald uden for åbningstid.** Telefonen ringer klokken 19. I dag ringer den forgæves. En AI, der tager beskeden, bekræfter den i en mail og opretter en sag, er bedre end telefonsvareren og meget nemmere at forsvare end en AI, der skal løse sagen.
2. **De samme tre spørgsmål.** Åbningstider, leveringstid, status på en ordre. Kan I skrive svaret ned, kan AI'en også sige det.
3. **Visitering.** AI'en finder ud af, hvad opkaldet handler om, og stiller det om til den rigtige person med besked om sagen. Mennesket tager stadig samtalen, men starter ikke forfra.

Og lad være med at begynde her:

- Klagesager og opsigelser. Det er de opkald, hvor en kunde mest af alt skal høre et menneske.
- Alt, hvor AI'en skal love noget bindende: pris, garanti, kreditering.
- Samtaler med mange helbreds- eller personoplysninger, hvor en misforståelse er dyr. Overvej i det hele taget, hvilke data der forlader huset, når lyd sendes til en ekstern model.

## Dansk er det første, I skal teste

Her er det ærlige forbehold. Da OpenAI lancerede GPT-Live i ChatGPT i juli, skrev de selv, at modellen er optimeret til de mest brugte sprog i ChatGPT, og at den på visse sprog kan have en accent, der ikke lyder indfødt, eller huller i den flydende tale. Ifølge OpenAI kommer der flere sprog og stemmer i de kommende måneder. Om dansk holder i dag, skal I høre med egne ører.

Praktisk betyder det: før I beslutter noget som helst, skal I høre den tale dansk. Ikke en demo på engelsk. Ring op, sig noget med bynavne, sig et ordrenummer med bogstaver i, tal hen over den midt i en sætning, og hør, om det holder. Kan I ikke holde ud at lytte til den i to minutter, kan jeres kunder heller ikke.

Tekst tilgiver meget, lyd tilgiver ingenting. Derfor er mail og chat som regel et nemmere sted at starte end telefonen: barren for "godt nok" er lavere. For [Wunderwear](/cases/wunderwear-automation) byggede vi en AI-agent i kundeservicen, der besvarer 80 procent af de gentagne spørgsmål om levering, returnering og produkter, og vi automatiserede ordrebehandlingen på tværs af Shopify og CRM.

## Sådan ville vi gribe det an

Hvis I vil vide, om det er noget for jer, behøver I ikke et projekt. I behøver to uger:

1. Lav en liste over de opkald, I faktisk får. En uges opkald skrevet ned i hånden er nok.
2. Tæl, hvor mange af dem der har samme svar hver gang. Er det under 20 procent, er telefonen ikke jeres første AI-opgave.
3. Vælg ét scenarie, typisk opkald uden for åbningstid.
4. Byg en prototype, og lad den kun tage det ene scenarie. Test den på dansk med jeres egne folk som kunder.
5. Beslut derefter. Ikke før.

Er svaret, at telefonen ikke er stedet at starte, er det et godt resultat. Det billigste AI-projekt er det, I ikke satte i gang.

En sidste ting, som gælder al stemme-AI: den skal have adgang til jeres systemer for at være nyttig, og dermed bliver den en agent med rettigheder. Inden I køber, så gå [de fem spørgsmål til en AI-leverandør om sikkerhed](/viden-om-ai/ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren) igennem. Skal automatiseringen i stedet starte på skrift og i chat, har vi samlet det under [AI i kundeservice](/ai-kundeservice).

## Ofte stillede spørgsmål

### Kan AI'en tale dansk?

Det skal I teste, før I tror på det. OpenAI skriver selv, at modellen er optimeret til de mest brugte sprog, og at den på visse sprog kan have en accent eller huller i den flydende tale. Derfor er en dansk lyttetest det første, I skal lave, og ikke noget, I tager leverandørens ord for.

### Hvad koster det at lade AI tage telefonen?

Stemmelaget koster 0,05 dollar i minuttet i OpenAIs API, afregnet pr. sekund (prisen pr. 10. september 2026). Modellen bag, telefoni og integration kommer oven i, og opsætningen er typisk den største post det første år. Regn med, at minutprisen er den mindste del af regnestykket.

### Kan kunderne høre, at det er en AI?

Ikke nødvendigvis, og derfor skal I sige det. Full duplex gør samtalen langt mere naturlig end gamle telefonrobotter, men en kunde, der føler sig snydt, er dyrere end en kunde, der ventede to minutter. Sig det i første sætning, og gør det nemt at komme videre til et menneske. Fra 2. august 2026 kræver EU's AI-forordning desuden som udgangspunkt, at AI-systemer, der taler direkte med mennesker, er lavet, så folk får at vide, at de taler med en AI, medmindre det er åbenlyst. Kravet ligger formelt hos den, der udbyder systemet, men det er jer, kunden hører.

### Skal vi vente på, at det bliver bedre?

Vent med hovednummeret. Men brug ventetiden på at finde ud af, hvilke opkald der overhovedet kan automatiseres. Den viden bliver ikke forældet, uanset hvilken model der vinder.

### Er det her noget andet end vores nuværende telefonmenu?

Ja. En telefonmenu beder kunden vælge mellem jeres kasser. En stemme-AI lader kunden forklare problemet med sine egne ord og finder selv ud af, hvad det handler om. Det er derfor, visitering ofte er et godt sted at starte.

## Skal vi se på det sammen?

Vi tilbyder en gratis AI-afklaring på 45 minutter. Ingen forpligtelse, og I skal ikke forberede noget. Vi ser på jeres opkald og processer og siger ærligt, om telefonen er det rigtige sted at begynde. Ofte er den ikke, og så siger vi det.

Ring til Alexander på +45 25 54 70 74, eller [book et møde her](/kontakt).
