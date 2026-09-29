/**
 * Logoet i navigationen: det lange logo, der folder sig sammen til AIK.
 *
 * Øverst på siden står det fulde logo, AI KONSULENTERNE med den lange
 * understregning. Når man scroller, forsvinder bogstaverne O-N-S-U-L-E-N-
 * T-E-R-N-E ind mod K'et bagfra, og understregningen trækker sig ind, til
 * den kun ligger under K'et. Så står det korte logo, AIK, tilbage. De to
 * er brandets egne udgaver: det korte er det lange med resten af ordet
 * taget væk, og K'et og stregen står samme sted i begge.
 *
 * Tegningen er brandets egen: det officielle PNG er skåret i tre masker
 * (public/logo): stammen (AI og K), halen (bogstaverne efter K) og
 * understregningen. Hvert stykke er et span med masken som maske og
 * currentColor som farve, så logoet kan tone mellem orange og hvidt som
 * navigationen. Understregningen er tre stykker: to ender og en midte,
 * der er ensartet og derfor kan skaleres uden at ændre formen. Stykkerne
 * overlapper et par pixel, så der ikke opstår sømme ved brøkdele af pixel.
 *
 * Mål i pixel fra det officielle PNG (1177 x 194). AI er 166 px højt og
 * er enheden: 1em = AI's højde. Bevægelsen ligger i globals.css (.logo-morf).
 */

const S = 166; // AI's højde i kildens pixel = 1em
const OX = 31; // AI's venstre kant
const OY = 15; // AI's top
const IW = 1177;
const IH = 194;

const em = (px: number) => `${(px / S).toFixed(4)}em`;

function stykke(maske: string, x0: number, y0: number, x1: number, y1: number): React.CSSProperties {
  const url = `url(${maske})`;
  const str = `${em(IW)} ${em(IH)}`;
  const pos = `${em(-x0)} ${em(-y0)}`;
  return {
    left: em(x0 - OX),
    top: em(y0 - OY),
    width: em(x1 - x0 + 1),
    height: em(y1 - y0 + 1),
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: str,
    maskSize: str,
    WebkitMaskPosition: pos,
    maskPosition: pos,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
}

/* Bogstaverne efter K'et, som x-intervaller i kilden (O ... E). */
const HALE: [number, number][] = [
  [305, 391], [399, 473], [483, 539], [545, 614], [624, 673], [682, 731],
  [741, 816], [825, 890], [899, 949], [956, 1022], [1030, 1104], [1113, 1163],
];

/* Understregningen: venstre ende 245-258, midte 256-1150, højre ende
   1149-1161. Kort udgave: 245-309, lige under K'et, som i det korte logo. */
const MIDTE = [256, 1150] as const;
const HOEJRE = [1149, 1161] as const;
const KORT_SLUT = 309;
/* Midten ændrer bredde, den skaleres ikke: skaleret ned til 5 % blev dens
   kant samplet om, og der opstod en mørk pixel mellem midte og ende. */
const kortMidte = em(KORT_SLUT - (HOEJRE[1] - HOEJRE[0]) - MIDTE[0] + 2);
const langMidte = em(MIDTE[1] - MIDTE[0] + 1);
const flyt = em(KORT_SLUT - HOEJRE[1]);

export default function LogoMorf({ kompakt, className = "" }: { kompakt: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`logo-morf ${className}`}
      data-kompakt={kompakt ? "true" : "false"}
      style={{ width: kompakt ? em(KORT_SLUT + 2 - OX) : em(1164 - OX) }}
    >
      <span className="logo-del" style={stykke("/logo/aik-stamme.png", 29, 13, 311, 183)} />
      {HALE.map(([x0, x1], i) => (
        <span
          key={x0}
          className="logo-del logo-bogstav"
          style={{ ...stykke("/logo/aik-hale.png", x0, 12, x1, 108), "--i": i } as React.CSSProperties}
        />
      ))}
      <span className="logo-del" style={stykke("/logo/aik-streg.png", 245, 134, 258, 151)} />
      <span
        className="logo-del logo-streg-midte"
        style={
          {
            ...stykke("/logo/aik-streg.png", MIDTE[0], 134, MIDTE[1], 151),
            width: undefined,
            "--lang": langMidte,
            "--kort": kortMidte,
          } as React.CSSProperties
        }
      />
      <span
        className="logo-del logo-streg-ende"
        style={{ ...stykke("/logo/aik-streg.png", HOEJRE[0], 134, HOEJRE[1], 151), "--flyt": flyt } as React.CSSProperties}
      />
    </span>
  );
}
