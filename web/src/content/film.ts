/**
 * Referencefilmen — to påstande, ét datasæt.
 *
 * Filmen kører i to akter, fordi de to påstande ikke er den samme:
 *
 *   kunder   "Vi har hjulpet dem, der …"      — virksomheder AIK har bygget til
 *   laering  "Og nu lærer vi det fra os —"    — det AIK selv leverer
 *
 * ⚠️ Det er hele pointen med `act`. Læg aldrig en virksomhed ind under
 * "kunder", som AIK ikke selv har haft som kunde. Steder hvor vores folk
 * tidligere har leveret gennem et andet selskab (Apple, TDC Net, Semler,
 * Arla, OK, Damstahl, Sonohaler, IDA) hører hjemme i logostriben under
 * "erfaring fra" — ikke her.
 *
 * `sector` er en intern note om hvem shottet peger på. Den vises ikke.
 */

export type FilmAct = "kunder" | "laering";

/** Første halvdel af sætningen. Skifter når akten skifter. */
export const FILM_INTRO: Record<FilmAct, string> = {
  kunder: "Vi har hjulpet dem, der",
  laering: "Og nu lærer vi det fra os:",
};

export type FilmShot = {
  /** Bruges som React-key og i filnavne. */
  id: string;
  /** Hvilken påstand shottet står under. */
  act: FilmAct;
  /** Anden halvdel af sætningen. */
  line: string;
  /** Intern note — hvem shottet refererer til. Vises ikke. */
  sector: string;
  /** Kort brancheord til fuldskærmsversionen. */
  label: string;
  /** Alt-tekst til posterframe. */
  alt: string;
  /**
   * Om shottet er i luften. Posterframen skal ligge i public/film/<id>.webp.
   */
  enabled: boolean;
  /**
   * Om shottet også kører i båndet på forsiden. Båndet er kort med vilje —
   * seks skud, valgt så spændvidden er størst muligt, og det sidste er vores
   * eget tilbud. /referencer kører hele rækken.
   */
  inBand: boolean;
  /**
   * Om der findes en public/film/<id>.mp4. Er den false, står posterframen
   * stille — og det er et fuldgyldigt valg, ikke en mangel. Uden flaget ville
   * komponenten bede om en video der ikke findes.
   */
  hasClip: boolean;
};

const ALL_SHOTS: FilmShot[] = [
  {
    id: "kaffe",
    act: "kunder",
    line: "brygger din kaffe",
    sector: "Lavazza — HR-agent trænet på deres egne HR-dokumenter",
    label: "Fødevarer",
    alt: "Nybrændte kaffebønner falder fra en industriristers tromle ned i et køletruget.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "kirke",
    act: "kunder",
    line: "holder kirken i byen ved lige",
    sector: "VMB — vedligehold af kirker",
    label: "Byggeri",
    alt: "Dagslys falder ned gennem et højt vindue på stengulvet i en kalket landsbykirke under restaurering.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "armbaand",
    act: "kunder",
    line: "lavede armbåndet, du havde på til festival",
    sector: "J.M Band — kundeservice-AI på deres egen vidensbase",
    label: "Events",
    alt: "Et vævet stofarmbånd om et håndled i skumringen med festivalens lyskæder ude af fokus bagved.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "undertoej",
    act: "kunder",
    line: "finder den bh, der endelig passer",
    sector: "Wunderwear — ordrebehandling automatiseret på tværs af Shopify og CRM",
    label: "Detail",
    alt: "En lingeributik efter lukketid med bøjlestang, prøverumsforhæng og et målebånd på disken.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "vindmoelle",
    act: "kunder",
    line: "bygger møllen, din strøm kommer fra",
    sector: "Siemens — R&D og produktudvikling",
    label: "Energi",
    alt: "Nacellen og vingeroden på en vindmølle set tæt nedefra mod en overskyet himmel.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "kontor",
    act: "kunder",
    line: "har tegnet kontoret, du sidder i",
    sector: "C.F. Møller — arkitekttegnestue",
    label: "Rådgivning",
    alt: "En hvid arkitekturmodel på et egetræsbord i en tegnestue med morgenlys hen over betongulvet.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
  {
    id: "chokolade",
    act: "kunder",
    line: "er grunden til at chokoladen knækker rigtigt",
    sector: "AAK — vegetabilske olier og fedtstoffer",
    label: "Ingredienser",
    alt: "En mørk chokoladeplade knækket i to på en kølig skiferflade med kakaokrummer omkring.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
  {
    id: "koekken",
    act: "kunder",
    line: "har bygget køkkenet, du står i hver morgen",
    sector: "Vordingborg Køkkenet",
    label: "Bolig",
    alt: "En hånd hælder kogende vand i en kop på en lys stenbordplade i et køkken om morgenen.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
  {
    id: "lift",
    act: "kunder",
    line: "lejer maskinen ud på byggepladsen",
    sector: "Loxam — maskin- og materieludlejning",
    label: "Udlejning",
    alt: "En lift hævet højt op ad en betonfacade i skumringen med en arbejdslampe tændt i kurven.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
  {
    id: "panser",
    act: "kunder",
    line: "laver pladen, der beskytter dem, der rykker ud",
    sector: "Integris Composites — kompositpanser",
    label: "Materialer",
    alt: "Den lagdelte kant af en kompositpanserplade på en børstet stålbænk.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },

  /* --- Akt 2: læring. Vores eget, ikke en kundes. --- */
  {
    id: "workshop",
    act: "laering",
    line: "ude hos jer",
    sector: "Workshops hos kunder",
    label: "Workshop",
    alt: "Hænder omkring et langbord med notesbøger, laptops og kopper under en lav pendel.",
    enabled: true,
    inBand: true,
    hasClip: true,
  },
  {
    id: "live",
    act: "laering",
    line: "live på skærmen",
    sector: "Online læring, live",
    label: "Live",
    alt: "En person set bagfra ved et skrivebord om aftenen med en lysende laptop og en tændt bordlampe.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
  {
    id: "ondemand",
    act: "laering",
    line: "eller når det passer jer",
    sector: "On demand på vores egen læringsplatform",
    label: "On demand",
    alt: "Et tomt skrivebord i morgenlys med en tændt laptop og en tom stol trukket lidt tilbage.",
    enabled: true,
    inBand: false,
    hasClip: false,
  },
];

/** Alt der er i luften, i rækkefølge. Brugt af /referencer. */
export const FILM_SHOTS: FilmShot[] = ALL_SHOTS.filter((s) => s.enabled);

/** Kun kunderne. Registret på /referencer er en kundeliste — vores egne
 *  læringsklip hører ikke til der. */
export const FILM_SHOTS_KUNDER: FilmShot[] = FILM_SHOTS.filter(
  (s) => s.act === "kunder"
);

/** Den korte version til forsiden. */
export const FILM_SHOTS_BAND: FilmShot[] = FILM_SHOTS.filter((s) => s.inBand);

/** Alt der endnu ikke er optaget. Bruges ikke i UI — kun til overblik. */
export const FILM_SHOTS_PENDING: FilmShot[] = ALL_SHOTS.filter(
  (s) => !s.enabled
);

/** Hvor længe hvert shot står, før det næste tager over. */
export const FILM_SHOT_MS = 3600;

export const filmPoster = (id: string) => `/film/${id}.webp`;
export const filmClip = (id: string) => `/film/${id}.mp4`;
