---
title: "AI-agenter og sikkerhed: 5 spørgsmål til jeres leverandør"
slug: "ai-agenter-sikkerhed-5-spoergsmaal-til-leverandoeren"
excerpt: "En sårbarhed med topkarakter i Googles agent-værktøj ramte i denne uge. Her er hvad en virksomhed med 20 ansatte skal spørge om, før den køber en AI-agent."
category: "news"
author: "AI Konsulenterne"
publishedAt: "2026-09-11T06:52:44.224Z"
updatedAt: "2026-09-11T06:52:44.100Z"
seoTitle: "AI-agenter og sikkerhed: 5 spørgsmål"
seoDescription: "Kritisk hul i Googles agent-værktøj den 9. september. Se hvad en virksomhed med 20 ansatte skal spørge sin AI-leverandør om, før agenten går i drift."
keywords: ["ai-agenter sikkerhed", "ai agent risiko", "ai leverandør spørgsmål", "sikker ai i virksomheden", "ai agent rettigheder"]
---

## Kort svar: hullet lå ikke i AI'en, men i værktøjet omkring den

Den 9. september blev der offentliggjort en sårbarhed med den højest mulige alvorlighed - 10,0 ud af 10 - i Google Cloud Agent Development Kit for Python, et af de værktøjer udviklere bygger AI-agenter med. Bygger I ikke selv på Google ADK, er I ikke ramt, og der er ingen grund til panik. Men sagen siger noget, der gælder alle: en AI-agent er ganske almindelig software. Den skal købes ind, sættes op og holdes ved lige med de samme øjne som alt andet, I lukker ind i jeres systemer.

## Hvad skete der helt konkret?

Google Cloud Agent Development Kit er et udviklerværktøj til at bygge AI-agenter. Sårbarheden, der har nummeret CVE-2026-79696, ramte webdelen af værktøjet i version 2.0.0 til 2.6.0 og gjorde det muligt for en udefrakommende at køre sin egen kode - uden at logge ind først. Den blev offentliggjort 9. september 2026 og fik CVSS-score 10,0, som er det højeste, skalaen går til.

Detaljerne kan læses hos [THREATINT](https://cve.threatint.com/CVE/CVE-2026-79696) og i [CVE Brief for 9. september](https://cvebrief.com/archive/2026/09/09/), hvor den optræder sammen med huller i andre byggeklodser fra AI-verdenen.

Læg mærke til, hvad fejlen ikke var. Det var ikke sprogmodellen, der blev narret. Det var ikke prompts, der løb løbsk. Det var en helt klassisk programmeringsfejl i rørene omkring modellen. Det er værd at holde fast i, fordi samtalen om AI-sikkerhed næsten altid handler om modellen - og problemerne i praksis oftere ligger i alt det andet.

## Hvorfor rager det en virksomhed med 20 ansatte?

Fordi I sandsynligvis ikke bygger agenten selv. I køber den.

Og når I køber en AI-agent, køber I i praksis en kæde: jeres leverandør, det framework de bygger på, den model de kalder, og de systemer agenten får adgang til hos jer. I kan ikke gennemgå koden i det hele. Men I kan spørge - og en leverandør, der er værd at handle med, kan svare uden at blive utilpas.

Det er også derfor, en agent adskiller sig fra en chatbot. En chatbot skriver et svar, som et menneske læser. En agent gør noget: henter data, opdaterer felter, sender beskeder. Jo mere den må, jo mere betyder det, hvem der står bag den. Vi har skrevet mere om den forskel i [Copilot Cowork: når Copilot går fra at svare til at gøre](/viden-om-ai/copilot-cowork-naar-ai-udfoerer-opgaver-for-jer).

## De fem spørgsmål I skal stille jeres AI-leverandør

Tag dem med til næste møde. De tager ti minutter og afslører mere end en produktdemo.

1. Hvad er agenten bygget på, og hvordan får vi besked, når der kommer en sikkerhedsopdatering? I skal ikke kunne koden. I skal vide, at nogen holder øje, og at I hører fra dem.
2. Hvilke rettigheder får agenten hos os, og hvem har besluttet dem? Det rigtige svar er en kort, konkret liste - ikke "den kører bare som en almindelig bruger".
3. Hvor ligger vores data, og bliver de brugt til at træne noget? Skal svaret være brugbart, skal det omfatte underleverandører. Jeres leverandørs model kan sagtens være en anden virksomheds model.
4. Hvad sker der, hvis agenten tager fejl? Er der et godkendelsestrin før handlinger, der ikke kan fortrydes? Kan I se bagefter, hvad den har gjort?
5. Hvordan lukker vi den ned? Hvis I opsiger samarbejdet i morgen, hvem fjerner så adgangene, og hvor lang tid tager det?

Et ærligt "det ved jeg ikke, men jeg finder ud af det" er et fint svar. Et undvigende er ikke.

## Hvad kan I selv gøre i denne uge?

Det meste af sikkerheden ligger hos jer, ikke hos leverandøren.

- Giv agenten adgang til det, den skal bruge - ikke til hele huset. Det er den enkeltbeslutning, der betyder mest.
- Start i et afgrænset område. Én proces, én afdeling, data I kender.
- Bed om log. I skal kunne se, hvad agenten har lavet, uden at ringe til nogen.
- Sæt en ejer på. En agent uden en navngiven ansvarlig bliver ikke vedligeholdt.

Det er i øvrigt samme disciplin som den, der ligger bag god databehandling i det hele taget. Har I ikke styr på grundlaget endnu, så start i [AI og GDPR: sådan bruger I AI uden at bryde reglerne](/viden-om-ai/ai-og-gdpr-saadan-bruger-i-ai-sikkert).

## Betyder det, at I skal vente med AI-agenter?

Nej. Sårbarheder bliver fundet i al software - det er derfor, de får numre og bliver lukket. At der blev offentliggjort et hul i et agent-værktøj, er ikke et argument mod agenter, lige så lidt som et hul i en browser er et argument mod internettet.

Det er et argument for at vælge leverandør med omhu og for at give agenten så lidt magt som muligt, indtil I har set den arbejde.

Det er sådan vi selv bygger. For [Lavazza](/cases/lavazza-hr-agent) var kravet, at HR-agenten skulle køre i et lukket miljø på virksomhedens egne dokumenter. For [J.M Band](/cases/jm-band-ai-agent) gik agenten på tværs af CRM, Shopify og interne systemer - og så er netop rettigheder det første, man lægger fast, ikke det sidste. Skal jeres løsning bygges til jeres data og ikke omvendt, er det dét, [skræddersyede AI-løsninger](/skraeddersyede-ai) handler om.

## Ofte stillede spørgsmål

### Er vi ramt af sårbarheden i Google ADK?

Kun hvis I eller jeres leverandør bygger på Google Cloud Agent Development Kit for Python i version 2.0.0 til 2.6.0. Det gør de færreste mindre virksomheder direkte. Spørg jeres leverandør - det er et rimeligt spørgsmål, og svaret tager et minut.

### Er AI-agenter mere usikre end almindelig software?

Ikke i sig selv. Forskellen er, at en agent typisk får adgang til flere systemer på én gang og kan handle selv. Det gør konsekvensen af en fejl større, ikke sandsynligheden.

### Hvad er det vigtigste, vi kan gøre?

Begræns rettigheder. En agent, der kun kan læse de tre mapper den skal bruge, er et lille problem, hvis noget går galt. En agent med adgang til alt er et stort et.

### Skal vi have en IT-afdeling for at bruge AI-agenter forsvarligt?

Nej. I skal have en leverandør, der kan svare på de fem spørgsmål ovenfor, og en person hos jer, der ejer løsningen. Det kan sagtens være en, der også laver noget andet.

### Hvordan ved vi, om en agent har gjort noget forkert?

Ved at kræve log og godkendelsestrin fra starten. Bed om at se det, inden I skriver under - ikke første gang I får brug for det.

## Skal vi kigge på jeres opsætning?

Er I i gang med at købe en AI-agent, eller har I allerede en kørende, I ikke helt ved hvad må - så tag en gratis AI-afklaring med os. 45 minutter, ingen forpligtelse, og I skal ikke forberede noget. Vi kigger på, hvad løsningen har adgang til, og siger ærligt, om det hænger sammen.

Ring til Alexander på +45 25 54 70 74, eller [book et møde her](/kontakt).
