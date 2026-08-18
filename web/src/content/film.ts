/**
 * Referencefilmen — "Vi har hjulpet dem, der …"
 *
 * Ét datasæt, to visninger: båndet på forsiden (ProofFilm) og fuldskærms-
 * versionen på /referencer. Rækkefølgen er bevidst: kaffe først, fordi den er
 * den mest hverdagsagtige og afvæbnende, telefon sidst, fordi den er den
 * største. Ingen logoer, ingen firmanavne — pointen er at man selv gætter.
 *
 * ⚠️ Til Alexander: `sector` er den interne note om hvem shottet peger på.
 * Den vises ikke på sitet. Bekræft at hver linje er dækket af et reelt
 * kunde- eller medarbejderforhold, før det her går i luften.
 */

export type FilmShot = {
  /** Bruges som React-key og i filnavne. */
  id: string;
  /** Anden halvdel af sætningen "Vi har hjulpet dem, der …" */
  line: string;
  /** Intern note — hvem shottet refererer til. Vises ikke. */
  sector: string;
  /** Kort brancheord til fuldskærmsversionen. */
  label: string;
  /** Alt-tekst til posterframe. */
  alt: string;
};

export const FILM_INTRO = "Vi har hjulpet dem, der";

export const FILM_SHOTS: FilmShot[] = [
  {
    id: "kaffe",
    line: "brygger din kaffe",
    sector: "Kaffe-import og -brænding",
    label: "Fødevarer",
    alt: "Nybrændte kaffebønner falder fra en industriristers tromle ned i et køletruget.",
  },
  {
    id: "bil",
    line: "importerer din bil",
    sector: "Bilimport og -distribution",
    label: "Mobilitet",
    alt: "Rækker af fabriksnye biler på en kaj ved daggry med rampen til et roro-skib i baggrunden.",
  },
  {
    id: "mobilnet",
    line: "bygger mobilnettet, du ringer på",
    sector: "Teleinfrastruktur",
    label: "Infrastruktur",
    alt: "En rigger arbejder på en antenne højt oppe i en telemast over et tågehav i blå time.",
  },
  {
    id: "mejeri",
    line: "tapper mælken i dit køleskab",
    sector: "Mejeri og fødevareproduktion",
    label: "Produktion",
    alt: "Polerede rustfrie tanke på række i et moderne mejeri med kondens på metallet.",
  },
  {
    id: "staal",
    line: "leverer stålet til dit køkken",
    sector: "Stål og metaldistribution",
    label: "Industri",
    alt: "Stak af børstede rustfrie stålplader i en lagerhal med en travers-kran i baggrunden.",
  },
  {
    id: "kirke",
    line: "restaurerer vores kirker",
    sector: "Restaurering og håndværk",
    label: "Byggeri",
    alt: "Stenhuggerhænder med mejsel mod en forvitret sandstensdetalje i en kalket landsbykirke under restaurering.",
  },
  {
    id: "kontor",
    line: "har tegnet kontoret, du sidder i",
    sector: "Arkitektur og rådgivning",
    label: "Rådgivning",
    alt: "Hvid arkitekturmodel af en kontorbygning på et bord i en tegnestue i skumringen.",
  },
  {
    id: "telefon",
    line: "samler telefonen i din lomme",
    sector: "Præcisionselektronik",
    label: "Elektronik",
    alt: "En handskeklædt hånd sænker et fræset aluminiumschassis ned i en fixtur på en CNC-maskine.",
  },
];

/** Hvor længe hvert shot står, før det næste tager over. */
export const FILM_SHOT_MS = 3600;

export const filmPoster = (id: string) => `/film/${id}.webp`;
export const filmClip = (id: string) => `/film/${id}.mp4`;
