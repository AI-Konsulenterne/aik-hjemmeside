/**
 * Spørgsmål og svar — ét sted.
 *
 * Før stod de to gange: fire stykker i FAQ-komponenten og seks i forsidens
 * JSON-LD, med forskellig ordlyd på dem der overlappede ("Hvad med GDPR?"
 * mod "Er det GDPR-sikkert?"). Struktureret data lovede altså Google to
 * spørgsmål der ikke fandtes på siden, og svarede anderledes på resten.
 *
 * Nu læser både komponenten og JSON-LD'en herfra, så de ikke kan glide fra
 * hinanden igen.
 */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Vi har ikke en IT-afdeling. Kan vi stadig få AI?",
    a: "Ja, og I er i godt selskab. Det er størstedelen af vores kunder. I behøver hverken IT-folk eller intern AI-viden for at komme i gang, det er det vi er her til. Vi sætter det op, viser jer hvordan det bruges, og er der hvis noget driller.",
  },
  {
    q: "Hvilke platforme bruger I?",
    a: "Vi er ikke gift med én leverandør. Vi bruger det der passer bedst til opgaven: Azure OpenAI, Claude, Gemini, åbne modeller, eller en kombination. Vi sælger ikke licenser, vi løser opgaver, så vi vælger det værktøj der gør jobbet bedst.",
  },
  {
    q: "Hvad koster det?",
    a: "Det kommer an på hvad vi bygger, og det ville være useriøst at give et tal her uden at have set jeres setup. Workshops starter typisk omkring 25.000 kr. Mindre AI-løsninger ligger fra 50.000 kr og opefter. Efter første snak ved vi nok til at give jer en fast pris, så I ved præcis hvad I siger ja til.",
  },
  {
    q: "Er det GDPR-sikkert?",
    a: "Ja. Vi bygger altid setups der overholder GDPR. Jeres data ender ikke i åbne modeller og bliver ikke brugt til at træne noget. Hvor strengt setuppet skal være kommer an på jer: nogle kører fint med en cloud-løsning og en databehandleraftale, andre vil have alt liggende internt.",
  },
  {
    q: "Hvordan sikrer I at medarbejderne faktisk bruger løsningen?",
    a: "Det er nok det sværeste i hele AI-historien, og det er der de fleste projekter falder fra hinanden. Vi bygger løsningen ind i de værktøjer folk bruger i forvejen. Efter lancering kigger vi sammen på hvem der bruger det, og hvor der skal justeres.",
  },
  {
    q: "Kan vi ikke bare bruge ChatGPT?",
    a: "Selvfølgelig kan I det, vi bruger den også selv. ChatGPT er fin til de hurtige opgaver: en mail, et resumé, et oplæg. Men når I rammer et reelt behov i forretningen, noget der kræver jeres egne data, jeres systemer eller en proces der skal køre af sig selv, så er en standardchat ikke nok. Der bygger vi noget der løser den specifikke udfordring.",
  },
];
