import { LANG_HALE, LANG_STAMME, type Form } from "@/components/ui/logo-data";

/**
 * Logoet i navigationen: det lange logo, der folder sig sammen til AIK.
 *
 * Øverst på siden står det fulde logo, AI KONSULENTERNE med den lange
 * understregning. Når man scroller, forsvinder bogstaverne O-N-S-U-L-E-N-
 * T-E-R-N-E ind mod K'et bagfra, og understregningen trækker sig ind, til
 * den kun ligger under K'et. Så står det korte logo, AIK, tilbage.
 *
 * Tegningen er AIKs egne vektorer (logo-data.ts, genereret fra de officielle
 * SVG-filer), tegnet med currentColor, så logoet tager farven fra
 * navigationen. Før var det PNG-masker, som browseren skalerede ca. fem
 * gange ned; de tynde streger i KONSULENTERNE blev bløde, især på
 * almindelige skærme. Vektorer tegnes skarpt i alle størrelser.
 *
 * Understregningen er tre stykker: to ender og en midte. Enderne har det
 * lange logos form og trækkes sammen til det korte logos (hjørnerne er
 * 10,85 enheder brede i det lange logo og 5,74 i det korte); midten
 * overlapper enderne med 0,5 enhed, så der ikke opstår en søm undervejs.
 * Bevægelsen ligger i globals.css (.logo-morf).
 */

/** AI's højde i SVG-enheder = 1em. */
const H = 82.78;
/** AI's top i det lange logo. */
const TOP = 0.71;
/** Bredden af det lange og det korte logo. */
const LANG = 573.13;
const KORT = 146.26;

const em = (u: number) => `${(u / H).toFixed(4)}em`;

function Tegn({ f }: { f: Form }) {
  return f.d ? <path d={f.d} transform={f.transform} /> : <polygon points={f.points} transform={f.transform} />;
}

export default function LogoMorf({ kompakt, className = "" }: { kompakt: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`logo-morf ${className}`}
      data-kompakt={kompakt ? "true" : "false"}
      style={{ width: kompakt ? em(KORT) : em(LANG) }}
    >
      {/* Tegnefladen starter ved AI's top (0,71), så logoet står på hele
          pixel øverst i stedet for 0,27 px forskudt; det gør kanterne skarpere. */}
      <svg
        viewBox={`0 ${TOP} ${LANG} ${H}`}
        fill="currentColor"
        focusable="false"
        style={{ top: 0, width: em(LANG), height: "1em" }}
      >
        {LANG_STAMME.map((f, i) => (
          <Tegn key={i} f={f} />
        ))}
        {LANG_HALE.map((f, i) => (
          <g key={i} className="logo-bogstav" style={{ "--i": i } as React.CSSProperties}>
            <Tegn f={f} />
          </g>
        ))}
        {/* Understregningen: venstre ende, midte, højre ende (koordinaterne er
            stregen fra aik-lang.svg, delt op). */}
        <path className="logo-streg-venstre" d="M125.76,61.25C123.36,61.25,114.91,61.69,114.91,64.09V67.78H125.76Z" />
        <rect className="logo-streg-midte" x="125.26" y="61.25" width="437.5" height="6.53" />
        <path className="logo-streg-hoejre" d="M562.26,61.25C564.66,61.25,573.1,61.69,573.1,64.09V67.78H562.26Z" />
      </svg>
    </span>
  );
}
