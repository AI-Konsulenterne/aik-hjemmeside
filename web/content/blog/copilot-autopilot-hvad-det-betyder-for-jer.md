---
title: "Copilot Autopilot: AI-agenten der arbejder videre uden jer"
slug: "copilot-autopilot-hvad-det-betyder-for-jer"
excerpt: "Microsoft præsenterede den nye Copilot den 25. september med Home, Code og Autopilot. Her er, hvad en agent med sit eget login betyder for en virksomhed med 20 ansatte."
category: "news"
author: "AI Konsulenterne"
publishedAt: "2026-09-29T06:20:52.416Z"
updatedAt: "2026-09-29T12:00:00.000Z"
seoTitle: "Copilot Autopilot: hvad betyder det?"
seoDescription: "Microsoft præsenterede Copilot Autopilot 25. september 2026: en AI-agent med eget login, der arbejder videre alene. Hvad det betyder for danske SMV'er."
keywords: ["copilot autopilot", "microsoft copilot 2026", "ai-agent virksomhed", "copilot credits", "ai agent sikkerhed"]
---

## Copilot Autopilot: kort fortalt

Den 25. september 2026 præsenterede Microsoft en ny udgave af Copilot i tre dele: Home, Code og Autopilot. Autopilot er den, der ændrer mest: en AI-agent med sit eget login, sin egen hukommelse og sin egen arbejdsplads, som arbejder videre på en opgave, selv når ingen sidder og skriver til den. Microsoft udvider den til en lukket preview ved udgangen af september, og den afregnes efter forbrug. For en virksomhed med 20 ansatte er det vigtigste i denne måned ikke at komme i gang. Det er at beslutte, hvad en agent som den må få adgang til, og hvad den må koste.

## Hvad Microsoft faktisk annoncerede

Microsoft samlede Copilot i tre navngivne dele i [sit officielle blogindlæg den 25. september](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/):

- **Home** er den nye startskærm. Chat og Cowork er lagt sammen, og Word, Excel og PowerPoint er bygget ind i selve Copilot.
- **Code** lader almindelige medarbejdere bygge deres egne små løsninger, fx en app, et dashboard eller en automatisering, ud fra en beskrivelse og køre dem i et styret miljø. Teknologien under motorhjelmen er den samme, som driver GitHub Copilot.
- **Autopilot** er en vedvarende, proaktiv agent, der bliver ved med at arbejde, når I ikke gør.

Home og Code begynder at rulle ud gennem Frontier, Microsofts program for tidlig adgang, i løbet af de kommende uger. Autopilot udvides til en lukket preview ved udgangen af september. For de fleste virksomheder er ingen af delene altså noget, I kan tænde i morgen. Det er faktisk en fordel: det giver jer tid til at forberede jer, mens de første kunder tester.

Autopilot er i øvrigt ikke bygget fra bunden. Det er den agent, Microsoft [præsenterede som Scout](https://www.microsoft.com/en-us/copilot/blog/2026/06/02/introducing-microsoft-scout-your-always-on-personal-agent/) den 2. juni 2026, nu under et nyt navn. Allerede dengang fik agenten sin egen styrede identitet i Microsoft Entra, og Purview-reglerne for databeskyttelse gælder for det, den gør.

## Hvad er forskellen på Autopilot og det Copilot, I kender?

Den Copilot, de fleste kender, svarer. I spørger, den svarer, samtalen slutter. [Cowork, som blev generelt tilgængelig i juni](/viden-om-ai/copilot-cowork-naar-ai-udfoerer-opgaver-for-jer), udfører: I giver den en opgave, og den arbejder sig igennem den, mens I følger med.

Autopilot deltager. [VentureBeat beskriver den](https://venturebeat.com/technology/microsoft-revamps-its-copilot-ai-with-a-persistent-autopilot-agent-and-hosting-for-ai-generated-apps) som en agent med sin egen identitet, sin egen hukommelse, sit eget computermiljø og sin egen arbejdsplads inde i virksomhedens Microsoft 365. I giver den et mål og en rolle i stedet for en opgave. Den kan følge en samtale, rykke for manglende svar, passe et tilbagevendende ansvar og tage en sag op igen efter flere dage. Medarbejderne taler med den i Teams, Outlook og dokumenter og kan nævne den med @ ligesom en kollega.

Den vigtigste detalje er, at agenten får sit eget login. Ifølge [The New Stack](https://thenewstack.io/copilot-agents-identity-runtime/) får hver Autopilot sin egen styrede identitet i Entra og sin egen agentkonto, så dens rettigheder og dens aktivitet er adskilt fra den medarbejder, der har oprettet den. Den kan have sin egen mailadresse og kalender. Vil I forstå, hvad det egentlig vil sige, har vi skrevet grundlaget her: [hvad er en AI-agent](/viden-om-ai/hvad-er-en-ai-agent).

## Hvad betyder det for en virksomhed med 20 ansatte?

Tre ærlige ting.

**Den er tænkt til det arbejde, ingen ejer.** Opfølgning, rykkere, koordinering: den slags, som ligger og fylder hos alle og hører til hos ingen. Det er sjældent det, man starter et AI-projekt for, men det er ofte der, timerne forsvinder. Hvor pålideligt Autopilot klarer det hos almindelige kunder, ved ingen endnu. Det må preview-perioden vise.

**Prisen er variabel, ikke fast.** Autopilot kræver en Copilot-licens, og arbejdet afregnes oveni efter forbrug i Copilot Credits, ligesom Cowork og Code. Regningen følger altså, hvor meget agenten arbejder, og ikke kun hvor mange licenser I har købt. Det er en anden økonomi end den, I kender fra Microsoft 365, og vi har skrevet om, hvordan regnestykket ser ud for en mindre virksomhed, i [Copilot-priser 2026](/viden-om-ai/copilot-priser-2026-hvad-ai-koster-med-20-ansatte).

**Risikoen flytter sig.** Med en chatbot er spørgsmålet, hvad AI'en svarer. Med en agent, der har sit eget login og handler af sig selv, er spørgsmålet, hvad den gør, og hvem der har givet den lov. Det er ikke et argument for at holde sig væk. Det er et argument for at sætte rammerne, før I tænder.

## Fire ting I skal have styr på, før en agent får sit eget login

1. **Adgang.** Hvilke mapper, mailkasser og systemer må agenten se? Start så småt, at I næsten synes, det er for lidt, og udvid derfra. Det er langt nemmere end at trække adgang tilbage.
2. **Omkostningsloft.** Forbruget styres i Microsoft 365 Administration under Copilot og Cost Management. Sæt et loft for både hele organisationen og de enkelte grupper, før agenter begynder at bruge kreditter. Ellers opdager I forbruget på fakturaen.
3. **Livscyklus.** Agenternes identiteter ligger i Microsoft Entra, hvor man kan lægge betingede adgangsregler på dem, give dem adgang, der udløber, og køre adgangsgennemgange. Flere af de funktioner kræver licenser, som mange mindre virksomheder ikke har, blandt andet Entra ID P1 og Microsoft Agent 365, så spørg jeres IT-leverandør, hvad I har. En agent, ingen har slukket, er det samme problem som en tidligere medarbejder, der stadig kan logge ind.
4. **Ansvar.** Én navngiven person ejer hver agent. Ikke "IT" og ikke "ledelsen", men en person, der kan svare på, hvad den er sat i verden for, og som får besked, når den gør noget uventet. Entra har selv en rolle til det: en sponsor, der står til ansvar for agentens adgang og levetid.

De fire punkter er den korte version. Den længere findes i [5 spørgsmål til jeres AI-leverandør](/viden-om-ai/ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren) og i vores guide til [en AI-politik, der faktisk bliver brugt](/viden-om-ai/ai-politik-for-virksomheder).

## Hvornår er Autopilot relevant, og hvornår er det ikke?

Det er relevant, når I allerede har et sted, hvor arbejdet falder mellem to stole. Leverandøropfølgning, tilbudsproces, onboarding af nye kunder, den ugentlige rapport, som nogen altid laver i sidste øjeblik.

Det er ikke relevant, hvis Copilot står ubrugt hos halvdelen af medarbejderne i dag. En agent, der arbejder af sig selv, løser ikke et problem, der handler om vaner og oplæring. Det gør [en ordentlig indføring](/academy) derimod, og vi har skrevet om, hvorfor det oftest går i stå: [hvorfor bruger medarbejderne ikke Copilot](/viden-om-ai/hvorfor-bruger-medarbejderne-ikke-copilot).

Og husk, at I ikke behøver vente på Microsoft for at få en agent, der samler data på tværs af systemer. Det findes i dag. Vi har bygget en til [J.M Band, der henter og analyserer data på tværs af CRM, Shopify og interne systemer](/cases/jm-band-ai-agent), og en datasikker HR-agent til [Lavazza i et lukket miljø](/cases/lavazza-hr-agent).

## Sådan bruger I de næste tre måneder

1. Skriv ned, hvilke to processer hos jer der lider under manglende opfølgning. Det er jeres kandidater.
2. Bed jeres IT-ansvarlige eller leverandør om at sætte et forbrugsloft på Copilot Credits nu, uanset om I bruger agenter endnu.
3. Beslut, hvem der må oprette en agent hos jer. Ét svar, skrevet ned.
4. Følg Autopilot på afstand, mens den er i preview, og hold jer til det, der virker i dag.

## Ofte stillede spørgsmål

### Kan vi få Copilot Autopilot nu?

Næppe. Microsoft udvider Autopilot til en lukket preview ved udgangen af september 2026, og Home og Code ruller ud gennem Frontier-programmet i de kommende uger. Microsoft har ikke givet en dato for, hvornår Autopilot bliver almindeligt tilgængelig.

### Hvad kommer Autopilot til at koste?

Det kræver en Copilot-licens, og arbejdet afregnes oveni efter forbrug i Copilot Credits, ligesom Cowork og Code. Microsoft har ikke oplyst, hvad en typisk Autopilot-opgave koster. Det gør det svært at budgettere præcist på forhånd, og det er netop derfor, forbrugslofter i Microsoft 365 Administration er det første, I bør sætte op.

### Er en agent med eget login sikkert nok til vores data?

Værktøjerne er der: agenten får sin egen styrede identitet, dens handlinger bliver logget, og Purview-reglerne gælder for den. Men sikkerheden ligger i, hvordan I sætter den op, ikke i produktet. En agent med adgang til alt er usikker, uanset platformen.

### Skal vi vente på Autopilot, eller bygge en agent selv nu?

Det afhænger af, hvor snævert behovet er. Skal agenten arbejde inde i Microsoft 365 på tværs af mail, møder og dokumenter, er det oftest værd at vente og lade Microsoft løfte integrationen. Skal den hente data fra jeres eget CRM, webshop eller branchesystem, kan en [skræddersyet løsning](/skraeddersyede-ai) være både hurtigere og billigere i dag.

### Hvad sker der med Cowork?

Cowork forsvinder ikke. Den bliver lagt sammen med Chat i den nye startskærm, Home, så det bliver ét sted i stedet for to.

## Skal vi se på det sammen?

Vi tilbyder en gratis AI-afklaring på 45 minutter. Ingen forpligtelse, og I skal ikke forberede noget. Vi ser på jeres processer og siger ærligt, om en agent er det rigtige næste skridt hos jer, eller om pengene er bedre brugt et andet sted.

Ring til Alexander på +45 25 54 70 74, eller [book et tidspunkt](/kontakt). Finder vi ikke en konkret AI-mulighed, der kan spare jer tid, koster mødet ingenting.
