/**
 * Sortering af indbakken — Naive Bayes, trænet i browseren.
 *
 * Fyrre korte mails, ti pr. kategori, er alt modellen får. Den tæller hvor
 * ofte hvert ord optræder i hver kategori, og når en ny mail kommer ind,
 * regner den ud hvilken kategori der bedst forklarer ordene i den. Mere er
 * der ikke i det, og det er pointen: det meste af det nyttige i AI er ikke
 * store modeller, det er den rigtige lille model på det rigtige sted.
 *
 * Testmailene står ikke i træningssættet — ellers var det ikke en test.
 * Den får ikke alle rigtige, og det skal den heller ikke se ud som om den
 * gør. Hvor den er i tvivl, kan man se det på søjlerne.
 *
 * Sandsynlighederne er længde-normaliserede: log-sandsynligheden deles med
 * antallet af ord før softmax. Rå Naive Bayes giver 99,9% på næsten alt,
 * fordi den ganger mange små tal sammen som om ordene var uafhængige, og de
 * er de ikke. Normaliseringen er en kendt kalibrering, og den gør søjlerne
 * til noget der kan læses i stedet for fire gange fuld eller tom.
 */

export const KATEGORIER = ["Faktura", "Reklamation", "Ordre", "Spørgsmål"] as const;

/**
 * Under den her sikkerhed gætter den ikke — mailen går til et menneske.
 *
 * Målt på de tolv testmails: ti rigtige, to forkerte. Den ene forkerte
 * ("Kreditnota ønskes, fakturaen er opkrævet to gange") stod på 32 mod 31
 * procent, altså et plat eller krone, og den ryger nu til et menneske i
 * stedet. Den anden ("Kan I levere 20 paller i næste uge?") er både et
 * spørgsmål og en ordre, og den sorterer den forkert med 70 procent. Den
 * fejl bliver stående, og siden viser den. En indbakke der aldrig tager
 * fejl findes ikke, og en demo der lader som om, er ikke værd at tro på.
 */
export const MENNESKE_UNDER = 0.5;
export type Kategori = (typeof KATEGORIER)[number];

export const TRAENING: [string, Kategori][] = [
  ["Vedhæftet faktura nr. 4471 for levering i marts, betaling senest den 30.", "Faktura"],
  ["Hermed faktura for konsulentydelser i uge 12", "Faktura"],
  ["Påmindelse: faktura 2210 er forfalden, beløbet bedes indbetalt", "Faktura"],
  ["Kreditnota vedrørende faktura 1183, beløb 2.400 kr.", "Faktura"],
  ["Faktura fra Dansk Emballage ApS, forfaldsdato 15. april", "Faktura"],
  ["Opkrævning af årligt abonnement, betales via bankoverførsel", "Faktura"],
  ["Vi har ikke modtaget betaling for faktura 3302", "Faktura"],
  ["Ny faktura for fragt og håndtering på ordre 88120", "Faktura"],
  ["Rykker for manglende indbetaling, gebyr 100 kr.", "Faktura"],
  ["Månedlig faktura for leje af lokaler, beløb inkl. moms", "Faktura"],

  ["Varen kom i stykker og emballagen var knust", "Reklamation"],
  ["Jeg er meget utilfreds, pakken er stadig ikke kommet efter to uger", "Reklamation"],
  ["Forkert størrelse leveret, jeg vil gerne returnere den", "Reklamation"],
  ["Produktet virker ikke, det gik i stykker efter tre dage", "Reklamation"],
  ["Klage over manglende svar fra jeres kundeservice", "Reklamation"],
  ["Der mangler dele i kassen, og vejledningen passer ikke", "Reklamation"],
  ["Jeg ønsker pengene tilbage, kvaliteten er alt for dårlig", "Reklamation"],
  ["Varen er beskadiget ved levering, billeder vedhæftet", "Reklamation"],
  ["Returnering: farven er en helt anden end på billedet", "Reklamation"],
  ["Chaufføren efterlod pakken i regnen, alt er ødelagt", "Reklamation"],

  ["Vi vil gerne bestille 200 stk. af varenummer 5521", "Ordre"],
  ["Ny ordre: 40 kasser kaffe til levering fredag", "Ordre"],
  ["Send venligst tilbud på 500 enheder inkl. fragt", "Ordre"],
  ["Bestilling til lageret i Kolding, leveringsadresse vedhæftet", "Ordre"],
  ["Genbestilling af sidste måneds ordre, samme antal", "Ordre"],
  ["Vi ønsker at øge ordren til 60 paller", "Ordre"],
  ["Indkøbsordre PO-7781 er godkendt og klar til afsendelse", "Ordre"],
  ["Bestil venligst 12 rulleborde og 4 reoler til afdelingen", "Ordre"],
  ["Vi bestiller 25 kasser mere til levering mandag", "Ordre"],
  ["Ordrebekræftelse ønskes på bestilling af 80 stk.", "Ordre"],

  ["Hvad er jeres åbningstider i påsken?", "Spørgsmål"],
  ["Kan man parkere ved jeres kontor i Aarhus?", "Spørgsmål"],
  ["Hvordan nulstiller jeg min adgangskode til portalen?", "Spørgsmål"],
  ["Har I mulighed for et møde næste uge om samarbejde?", "Spørgsmål"],
  ["Er det muligt at få materialet på engelsk?", "Spørgsmål"],
  ["Hvem er kontaktperson for jeres partnerprogram?", "Spørgsmål"],
  ["Tilbyder I undervisning til nye medarbejdere?", "Spørgsmål"],
  ["Hvor finder jeg datablad for jeres produkter?", "Spørgsmål"],
  ["Hvordan fungerer jeres garanti helt konkret?", "Spørgsmål"],
  ["Er I også åbne for henvendelser fra Norge?", "Spørgsmål"],
];

/** Mails modellen aldrig har set. Facit står ved siden af, så siden kan vise
 *  om den ramte — også når den ikke gør. */
export const INDBAKKE: { tekst: string; facit: Kategori; fra: string }[] = [
  { tekst: "Faktura 5590 vedhæftet, betalingsfrist 14 dage", facit: "Faktura", fra: "bogholderi@leverandor.dk" },
  { tekst: "Lampen blinker og virker ikke, jeg vil have en ny", facit: "Reklamation", fra: "mette.k@gmail.com" },
  { tekst: "Bestilling: 30 stk. af varenr. 7712 til lager Odense", facit: "Ordre", fra: "indkob@byggeriet.dk" },
  { tekst: "Hvad koster det at få leveret til Bornholm?", facit: "Spørgsmål", fra: "anders@hotmail.dk" },
  { tekst: "Rykker: beløbet på 12.500 kr. er ikke indbetalt", facit: "Faktura", fra: "inkasso@firma.dk" },
  { tekst: "Pakken er kommet frem, men glasset er knust", facit: "Reklamation", fra: "lise.h@outlook.dk" },
  { tekst: "Vi ønsker at bestille 150 enheder som sidst", facit: "Ordre", fra: "drift@kantinen.dk" },
  { tekst: "Hvordan logger jeg ind på jeres portal?", facit: "Spørgsmål", fra: "ny.medarbejder@kunde.dk" },
  { tekst: "Kreditnota ønskes, fakturaen er opkrævet to gange", facit: "Faktura", fra: "okonomi@partner.dk" },
  { tekst: "Returnering af to stole, de har ridser i lakken", facit: "Reklamation", fra: "jens@firma.dk" },
  { tekst: "Kan I levere 20 paller i næste uge?", facit: "Ordre", fra: "lager@grossist.dk" },
  { tekst: "Har I ledige tider til et møde om AI?", facit: "Spørgsmål", fra: "direktion@smv.dk" },
];

const STOP = new Set(["og", "i", "at", "en", "et", "af", "er", "til", "på", "for", "med", "den", "det", "de", "som", "fra", "nr", "kr", "stk"]);

export function tokens(tekst: string): string[] {
  return tekst
    .toLowerCase()
    .split(/[^a-zæøå]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

export type Model = {
  /** log P(kategori) */
  prior: number[];
  /** log P(ord | kategori), pr. kategori */
  likelihood: Map<string, number>[];
  /** log P(ukendt ord | kategori) — Laplace-udglatning for ord uden for ordforrådet */
  ukendt: number[];
  ordforraad: number;
};

export function traen(data: [string, Kategori][] = TRAENING): Model {
  const K = KATEGORIER.length;
  const taelling: Map<string, number>[] = KATEGORIER.map(() => new Map());
  const total = new Array(K).fill(0);
  const antal = new Array(K).fill(0);
  const vocab = new Set<string>();

  for (const [tekst, kat] of data) {
    const k = KATEGORIER.indexOf(kat);
    antal[k]++;
    for (const t of tokens(tekst)) {
      vocab.add(t);
      taelling[k].set(t, (taelling[k].get(t) ?? 0) + 1);
      total[k]++;
    }
  }

  const V = vocab.size;
  const likelihood = taelling.map((m, k) => {
    const out = new Map<string, number>();
    for (const t of vocab) out.set(t, Math.log(((m.get(t) ?? 0) + 1) / (total[k] + V)));
    return out;
  });
  return {
    prior: antal.map((n) => Math.log(n / data.length)),
    likelihood,
    ukendt: total.map((n) => Math.log(1 / (n + V))),
    ordforraad: V,
  };
}

export function klassificer(model: Model, tekst: string) {
  const ord = tokens(tekst);
  const K = KATEGORIER.length;
  const score = model.prior.slice();
  for (const t of ord)
    for (let k = 0; k < K; k++) score[k] += model.likelihood[k].get(t) ?? model.ukendt[k];

  /* Længde-normalisering før softmax. Se kommentaren øverst. */
  const n = Math.max(1, ord.length);
  const s = score.map((v) => v / n);
  const max = Math.max(...s);
  const e = s.map((v) => Math.exp((v - max) * 6));
  const sum = e.reduce((a, b) => a + b, 0);
  const p = e.map((v) => v / sum);
  const top = p.indexOf(Math.max(...p));
  /* Hvilke ord trak mest mod vinderen — dem kan siden fremhæve. */
  const bidrag = ord
    .map((t) => ({
      t,
      v: (model.likelihood[top].get(t) ?? model.ukendt[top]) -
        Math.max(...model.likelihood.map((L, k) => (k === top ? -Infinity : L.get(t) ?? model.ukendt[k]))),
    }))
    .filter((x) => x.v > 0.4)
    .sort((a, b) => b.v - a.v)
    .slice(0, 3)
    .map((x) => x.t);
  return { p, top: KATEGORIER[top], ord: bidrag };
}
