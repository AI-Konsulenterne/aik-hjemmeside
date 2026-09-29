/**
 * Holdet.
 *
 * De fire lå i Strapi med navn, titel, foto og LinkedIn. Nu står de her, og
 * fotoene ligger i /public/team (samme sort-hvide serie foran vedbenden,
 * 1080 x 1080). Alexander står først: det er ham, man taler med på første
 * møde, og hans titel er "AI-konsulent", som alle andre steder på sitet.
 */

export type Holdmedlem = {
  navn: string;
  titel: string;
  foto: string;
  linkedin?: string;
};

export const HOLD: Holdmedlem[] = [
  {
    navn: "Alexander",
    titel: "AI-konsulent",
    foto: "/team/alexander.webp",
    linkedin: "https://www.linkedin.com/in/alexander-%C3%B8rneborg/",
  },
  {
    navn: "Martin Tvedesøe",
    titel: "Senior AI-udvikler",
    foto: "/team/martin-tvedesoe.webp",
    linkedin: "https://www.linkedin.com/in/martin-tvedes%C3%B8e-44609787/",
  },
  {
    navn: "Nicholas Clausen",
    titel: "AI-konsulent",
    foto: "/team/nicholas-clausen.webp",
    linkedin: "https://www.linkedin.com/in/nicholas-clausen-16078b170/",
  },
  {
    navn: "Benjamin Ejlertsen",
    titel: "Senior AI-udvikler",
    foto: "/team/benjamin-ejlertsen.webp",
    linkedin: "https://www.linkedin.com/in/benjamin-ejlertsen-165707131/",
  },
];
