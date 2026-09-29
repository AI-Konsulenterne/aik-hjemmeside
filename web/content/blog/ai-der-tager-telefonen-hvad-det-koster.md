---
title: "AI der tager telefonen: hvad det koster for jer i praksis"
slug: "ai-der-tager-telefonen-hvad-det-koster"
excerpt: "Stemme-AI kan nu tage telefonen for cirka 30 øre i minuttet. Vi regner på hvad det reelt koster med 20 ansatte - og hvor I skal starte."
category: "news"
author: "AI Konsulenterne"
publishedAt: "2026-09-15T06:18:05.927Z"
updatedAt: "2026-09-15T06:18:05.826Z"
seoTitle: "AI der tager telefonen: hvad koster det"
seoDescription: "OpenAI åbnede 10. september for stemme-AI til 0,05 dollar i minuttet. Se hvad det reelt koster med 20 ansatte, hvor det giver mening, og hvad I skal teste."
keywords: ["ai der tager telefonen", "stemme-ai", "ai kundeservice telefon", "gpt-live-1", "ai telefonsvarer"]
---

## Kan AI tage telefonen for jer nu?

Teknisk set: ja. Den 10. september 2026 gjorde OpenAI stemmemodellen GPT-Live-1 tilgængelig i sit API til 0,05 dollar i minuttet - altså omkring 30-35 øre for hvert minut, den taler. Modellen er full-duplex, hvilket betyder at den lytter og taler samtidig, så en kunde kan afbryde midt i en sætning uden at samtalen bryder sammen. Og den understøtter telefoni, så den kan sidde for enden af et rigtigt telefonnummer. Men prisen dækker kun stemmelaget, og dansk er ikke det sprog, den er bedst til. Så det korte svar til en virksomhed med 20 ansatte er: ja, det kan lade sig gøre - nej, I skal ikke sætte den på hovednummeret i denne uge.

## Hvad blev der egentlig annonceret?

OpenAI beskriver GPT-Live-1 som en stemmemodel bygget til samtaler i realtid, og den blev åbnet for udviklere i API'et den 10. september 2026. Se [OpenAIs egen annoncering](https://openai.com/index/introducing-gpt-live-1-in-the-api/) og [Neowins gennemgang af prisen](https://www.neowin.net/news/openai-brings-chatgpts-gpt-live-1-voice-model-to-developers-for-005-per-minute/).

De tre ting, der faktisk betyder noget for jer:

- **Full duplex.** Modellen lytter, mens den taler. Det lyder som en detalje, men det er præcis dét, der har gjort ældre telefonrobotter uudholdelige: du skulle vente på, at stemmen blev færdig, før du kunne sige noget. Nu kan man afbryde.
- **Telefoni.** Modellen er lavet til at håndtere et telefonopkald: at opfange hvornår en person er færdig med at tale, at forstå tal og bogstavkombinationer som ordrenumre og registreringsnumre, og at fungere med baggrundsstøj.
- **Prisen er kendt.** 0,05 dollar i minuttet for stemmen. Det er første gang, en SMV kan regne på "AI der tager telefonen" uden at ringe til en leverandør først.

## Hvad koster det for en virksomhed med 20 ansatte?

Lad os regne på det med nogle åbne forudsætninger. Sig at I får 300 opkald om måneden, og at et gennemsnitligt opkald varer 4 minutter. Det er 1.200 minutter. Til 0,05 dollar i minuttet bliver stemmelaget cirka 60 dollar, altså i omegnen af 400 kroner om måneden.

Det tal er rigtigt - og alligevel misvisende, hvis I stopper der. Prisen dækker kun stemmen. Oven i skal lægges:

- Den model, der tænker bag stemmen. Den afgør, om AI'en svarer rigtigt, og den faktureres særskilt.
- Telefonnummer og telefoni-udbyder.
- Integrationen til jeres systemer. En AI, der ikke kan se jeres ordrer, kan ikke svare på "hvor er min pakke".
- Opsætning, test og løbende justering. Det er her, langt størstedelen af pengene og tiden ligger første år.

Realistisk er selve minutprisen den mindste post på regnskabet. Det gode ved annonceringen er ikke, at AI-telefoni er blevet billigt - det er, at den variable pris nu er lav nok til, at det hele afhænger af, om I bygger det rigtigt. Vil I have en mere generel gennemgang af, hvordan man regner på det, har vi skrevet om [hvad en AI-løsning koster](/viden-om-ai/hvad-koster-en-ai-loesning).

## Hvor giver det mening - og hvor gør det ikke?

Vores erfaring fra kundeprojekter er, at stemme-AI er stærk til det snævre og svag til det brede. Start her:

1. **Opkald uden for åbningstid.** Telefonen ringer klokken 19. I dag ringer den forgæves. En AI, der tager beskeden, bekræfter den i en mail og opretter en sag, er bedre end telefonsvareren - og meget nemmere at forsvare end en AI, der skal løse sagen.
2. **De samme tre spørgsmål.** Åbningstider, leveringstid, status på en ordre. Hvis I kan skrive svaret ned, kan AI'en også sige det.
3. **Visitering.** AI'en finder ud af, hvad opkaldet handler om, og stiller det om til den rigtige person med kontekst. Mennesket tager stadig samtalen, men starter ikke forfra.

Og lad være med at begynde her:

- Klagesager og opsigelser. Det er de opkald, hvor en kunde mest af alt skal høre et menneske.
- Alt hvor AI'en skal love noget bindende: pris, garanti, kreditering.
- Sundheds- og persondatatunge samtaler, hvor en misforståelse er dyr. Overvej i det hele taget, hvilke data der forlader huset, når lyd sendes til en ekstern model.

## Dansk er det første, I skal teste

Her er det ærlige forbehold. De sprog, modellen ikke er bygget til i første omgang, kan stadig have en accent, der lyder forkert, eller huller i den flydende tale. Det gælder erfaringsmæssigt små sprog som dansk, og OpenAI melder selv, at sprogunderstøttelsen udvides løbende.

Praktisk betyder det: før I beslutter noget som helst, skal I høre den tale dansk. Ikke en demo på engelsk. Ring op, sig noget med bynavne, sig et ordrenummer med bogstaver i, tal hen over den midt i en sætning, og hør om det holder. Hvis I ikke kan holde ud at lytte til den i to minutter, kan jeres kunder heller ikke.

Det er også det spørgsmål, vi oftest hører fra kunder, der allerede har automatiseret skriftlig kundeservice: tekst tilgiver meget, lyd tilgiver ingenting. For [Wunderwear](/cases/wunderwear-automation) byggede vi AI-kundeservice, der besvarer 80 procent af de gentagne spørgsmål på skrift, plus automatiseret ordrehåndtering. Skriftlig automatisering er stadig det sted, de fleste webshops får mest for pengene hurtigst - netop fordi barren for "godt nok" er lavere end på telefonen.

## Sådan ville vi gribe det an

Hvis I vil vide, om det er noget for jer, behøver I ikke et projekt. I behøver to uger:

1. Træk en liste over de opkald, I faktisk får. En uges opkald håndskrevet på en liste er nok.
2. Tæl hvor mange af dem der har samme svar hver gang. Er det under 20 procent, er telefonen ikke jeres første AI-opgave.
3. Vælg ét scenarie - typisk opkald uden for åbningstid.
4. Byg en prototype, og lad den kun tage det ene scenarie. Test den på dansk, med jeres egne folk som kunder.
5. Beslut derefter. Ikke før.

Er svaret at telefonen ikke er stedet at starte, er det et godt resultat. Det billigste AI-projekt er det, I ikke satte i gang.

En sidste ting, som gælder al stemme-AI: den skal have adgang til jeres systemer for at være nyttig, og dermed bliver den en agent med rettigheder. Inden I køber, så løb [de fem spørgsmål til en AI-leverandør om sikkerhed](/viden-om-ai/ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren) igennem. Skal automatiseringen i stedet starte i skrift og chat, har vi samlet det under [AI i kundeservice](/ai-kundeservice).

## Ofte stillede spørgsmål

### Kan AI'en tale dansk?

Ja, men kvaliteten på små sprog er ikke den samme som på engelsk - accent og flydende tale kan halte. Derfor er dansk lyttetest det første, I skal lave, og ikke noget I tager leverandørens ord for.

### Hvad koster det at lade AI tage telefonen?

Stemmelaget koster 0,05 dollar i minuttet i OpenAIs API pr. 10. september 2026. Modellen bag, telefoni og integration kommer oven i, og opsætningen er den største post det første år. Regn med, at minutprisen er den mindste del af regnestykket.

### Kan kunderne høre, at det er en AI?

Ja - og I skal sige det. Full duplex gør samtalen langt mere naturlig end gamle telefonrobotter, men en kunde, der føler sig snydt, er dyrere end en kunde, der ventede to minutter. Sig det i første sætning, og gør det nemt at komme videre til et menneske.

### Skal vi vente på at det bliver bedre?

Vent med hovednummeret. Men brug ventetiden på at finde ud af, hvilke opkald der overhovedet kan automatiseres. Den viden bliver ikke forældet, uanset hvilken model der vinder.

### Er det her noget andet end vores nuværende telefonmenu?

Ja. En telefonmenu beder kunden vælge mellem jeres kasser. En stemme-AI lader kunden forklare problemet med sine egne ord og finder selv ud af, hvad det handler om. Det er derfor, visitering ofte er det bedste sted at starte.

## Skal vi se på det sammen?

Vi tilbyder en gratis AI-afklaring på 45 minutter. Ingen forpligtelse, og I skal ikke forberede noget - vi ser på jeres opkald og processer og siger ærligt, om telefonen er det rigtige sted at begynde. Ofte er den ikke, og så siger vi det.

Ring til Alexander på 25 54 70 74, eller [book et møde her](/kontakt).
