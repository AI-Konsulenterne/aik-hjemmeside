---
title: "Copilot bygger nu apps: hvad det betyder for jeres regneark"
slug: "copilot-bygger-apps-hvad-det-betyder-for-jeres-regneark"
excerpt: "Microsoft åbnede den 10. september for at bygge apps ved at snakke med Copilot. Her er, hvad det kan, hvad det kræver, og hvornår I skal lade være."
category: "news"
author: "AI Konsulenterne"
publishedAt: "2026-09-13T06:05:51.739Z"
updatedAt: "2026-09-29T12:00:00.000Z"
seoTitle: "Copilot bygger apps: hvad kan det?"
seoDescription: "Microsoft lader jer nu bygge apps ved at snakke med Copilot. Se, hvad funktionen kan, hvad den koster, og hvornår det giver mening for en dansk SMV."
keywords: ["copilot apps", "copilot studio", "byg app uden kode", "copilot cowork", "interne systemer smv"]
---

## Kort svar: I kan nu beskrive en app i ord og få den bygget

Microsoft åbnede den 10. september for at bygge egentlige forretningsapps ved at snakke med Copilot. I beskriver, hvad appen skal kunne, Copilot bygger et første udkast, og I retter til, tester og udgiver den til kollegerne. Den kan hente data fra jeres eksisterende systemer og skrive tilbage i dem. For en virksomhed med 20 ansatte er det interessant af én grund: alle de små ting, I har levet med i et regneark i årevis, fordi det aldrig kunne betale sig at få dem bygget.

Det er stadig i preview, og det er ikke gratis. Mere om begge dele nedenfor.

## Hvad er det, Microsoft har åbnet for?

Funktionen findes to steder: i Copilot Cowork, hvor man skriver `/app` i chatten, og i Copilot Studio. I Cowork kræver det, at I er med i Frontier, Microsofts program for tidlig adgang. I Copilot Studio ruller det ud som offentlig preview. Microsoft beskriver det selv i [Build apps in Copilot Cowork and Copilot Studio](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/build-apps-in-copilot-cowork-and-copilot-studio/).

Den 25. september fulgte Microsoft op med Code, en del af den nye Copilot, som også bygger apps, dashboards og små værktøjer ud fra en beskrivelse. Den ruller først ud gennem Frontier. Vi har skrevet om den i [artiklen om Copilot Autopilot](/viden-om-ai/copilot-autopilot-hvad-det-betyder-for-jer).

Det vigtige er ikke, at man kan lave en app uden at kode. Det har kunnet lade sig gøre i årevis med Power Apps og lignende. Det nye er tre ting:

- Appen bygges i en samtale. I skriver, hvad den skal kunne, i stedet for at klikke en formular sammen.
- Den er koblet til jeres data via connectors og kan både læse og skrive tilbage i systemerne.
- Den arver jeres eksisterende sikkerhed. Login går gennem Microsoft Entra, og jeres politikker for data og connectors gælder som udgangspunkt.

Microsofts egne eksempler er en onboarding-app, der viser en ny medarbejders fremdrift, og en serviceapp, der henter teknisk baggrund og guider en tekniker gennem trinene.

## Hvorfor er det interessant med 20 ansatte?

Fordi I har listen allerede. De fleste mindre virksomheder har en håndfuld småting, som alle er enige om er irriterende, og som ingen nogensinde har fået lavet:

- Regnearket med, hvem der har hvilke certifikater, og hvornår de udløber
- Den delte mappe, hvor tilbud ligger i ni forskellige versioner
- Onboarding, der bor i hovedet på én person
- Den ugentlige status, som nogen samler manuelt hver fredag

Ingen af dem har været store nok til at retfærdiggøre et udviklingsprojekt. Det er præcis det hul, den her type værktøj sigter efter. Når prisen for at prøve falder til en samtale, flytter grænsen for, hvad der kan betale sig.

## Hvad er hagen?

Tre ting, og I skal kende dem, før I går i gang.

**Det er preview.** Funktioner i preview ændrer sig, og de kommer ikke med samme garantier som færdige produkter. Byg ikke noget forretningskritisk på det endnu.

**Det afregnes efter forbrug.** Både Cowork og app-bygningen kører på forbrugsafregning oven i jeres Copilot-licens. Det er ikke en fast pris pr. bruger, og en app, der kører tit, koster mere end en, der kører sjældent. Vi har regnet på den samlede Copilot-økonomi, med priserne i kroner, i [Copilot-priser 2026](/viden-om-ai/copilot-priser-2026-hvad-ai-koster-med-20-ansatte).

**Nogen skal eje apperne.** Det her er den vigtigste. Når det bliver nemt at bygge, bliver det også nemt at bygge 30 halvfærdige apps, som ingen vedligeholder, og som holder op med at virke, når den, der lavede dem, holder op. Microsoft har da også lagt en oversigt over udgivne apps ind i Microsoft 365 Administration, sammen med versionsstyring og udgivelsestrin. Brug den.

## Hvilke apps skal I bygge, og hvilke skal I ikke?

En brugbar tommelfingerregel:

1. Byg det, der i dag lever i et regneark, og som kun jeres egne folk bruger. Lav risiko, hurtig gevinst.
2. Byg det, der handler om at holde styr på noget: lister, status, frister, tjeklister.
3. Byg det ikke, hvis det rører ved penge, kontrakter eller persondata, før I har en fast ejer og en aftale om, hvem der kigger på det.
4. Byg det ikke, hvis det er selve jeres forretning. Ligger jeres værdi i webshoppen, produktionen eller et branchesystem, skal den integration bygges ordentligt.

Den sidste er værd at holde fast i. En Copilot-app er god til det, der ligger rundt om arbejdet. Den erstatter ikke en rigtig integration mellem jeres systemer. Vi har skrevet om, hvor grænsen går, i [ChatGPT vs. skræddersyet AI](/viden-om-ai/chatgpt-vs-skraeddersyet-ai).

## Hvad gør I, hvis I vil prøve det?

Start småt og struktureret:

- Vælg én irritation fra listen. Den mindste, ikke den vigtigste.
- Sæt en person på som ejer, med navn. Ikke "IT".
- Byg den, lad tre kolleger bruge den i to uger, og se, om nogen savner den, hvis I slukker den.
- Tjek i Microsoft 365 Administration, hvad der faktisk er udgivet, inden I bygger nummer to.

Det lyder småt, og det skal det være. Værdien kommer ikke af den første app. Den kommer af, at I finder ud af, hvilke af jeres processer der overhovedet er værd at automatisere. Den afklaring kan I også tage med os på en [workshop](/workshop), hvor vi finder og prioriterer de opgaver, hvor AI gør størst forskel hos jer.

Skal jeres folk kunne bruge Copilot ordentligt, inden I begynder at bygge oven på den, er det dét, [AI-Minds](/academy) er til. Og skal der bygges noget rigtigt til jeres egne data og systemer, er det en [skræddersyet løsning](/skraeddersyede-ai), ikke en preview-funktion.

## Ofte stillede spørgsmål

### Kan vi bruge det med det samme?

I Cowork kræver det en Microsoft 365 Copilot-licens, forbrugsafregning og adgang gennem Frontier-programmet. I Copilot Studio ruller det ud som offentlig preview. Tjek i Microsoft 365 Administration, hvad der er slået til hos jer, før I lover kollegerne noget.

### Skal vi kunne kode?

Nej. Pointen er, at appen beskrives i almindeligt sprog. Men I skal kunne beskrive processen præcist, og det er sværere, end det lyder. Uklare processer bliver til uklare apps.

### Er vores data sikre i sådan en app?

Appen bruger jeres eksisterende login gennem Microsoft Entra og arver de politikker, I allerede har for data og connectors. Det betyder også, at hvis jeres rettigheder er rodede i forvejen, bliver appen ikke bedre end dem.

### Hvad koster det?

Det afregnes efter forbrug oven i Copilot-licensen, ikke som en fast pris pr. bruger. Både at bygge og at køre apperne tæller med. Sæt et forbrugsloft, inden I begynder at eksperimentere.

### Erstatter det Power Apps?

Det siger Microsoft ikke noget om i annonceringen. Har I allerede noget kørende i Power Platform, er der ingen grund til at rive det ned for at prøve det nye.

## Skal vi finde de rigtige at bygge?

Den svære del er ikke at bygge appen. Det er at vælge, hvilke processer der er værd at bygge til, og hvilke der bare skal laves om. Tag en gratis AI-afklaring med os: 45 minutter, ingen forpligtelse, og I skal ikke forberede noget. Vi kigger på jeres processer og siger ærligt, hvad der er værd at gå videre med. Finder vi ikke en konkret mulighed, koster mødet ingenting.

Ring til Alexander på +45 25 54 70 74, eller [book et møde her](/kontakt).
