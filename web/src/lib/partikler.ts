/**
 * Formationerne til partikelscenen på forsiden.
 *
 * Fire former, som de samme partikler bevæger sig imellem, mens man
 * scroller. Hver form er et billede af et trin i det, vi bygger:
 *
 *   0  kaos        jeres data, som den ligger i dag: spredte fragmenter
 *   1  dokumenter  læst ind og ordnet: en væg af sider med tekstlinjer
 *   2  graf        forbundet viden: et spørgsmål finder vej til svaret
 *   3  prognose    historik, en streg for i dag og en vifte af usikkerhed
 *
 * Alt er deterministisk (samme frø, samme billede), så scenen ser ens ud
 * for alle, og den kan tegnes igen uden at hoppe.
 *
 * Hver form har også en "glød" pr. partikel (0 til 1). Den bliver orange i
 * shaderen: det relevante afsnit i dokumenterne, stien gennem grafen,
 * prognosen efter i dag. Resten er hvidt og gråt. Én varm ting pr. billede,
 * som i filmen. I grafen går gløden op til 2: delen over 1 er hvor langt
 * partiklen ligger ad stien, så shaderen kan sende en puls fra spørgsmålet
 * ud til kilderne.
 */

export type Formation = { pos: Float32Array; gloed: Float32Array };

/** mulberry32: lille, hurtig og deterministisk. */
function tal(frø: number) {
  let s = frø >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(r: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = r();
  while (v === 0) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type Punkt = [number, number, number, number]; // x, y, z, glød

/** Kaos: en diffus sky og ~140 små fragmenter (sider, mails, celler),
 *  drejet tilfældigt i rummet. Et par gnister er orange. */
function kaos(n: number, r: () => number): Punkt[] {
  const ud: Punkt[] = [];
  const sky = Math.floor(n * 0.58);
  for (let i = 0; i < sky; i++) {
    const x = Math.max(-2.3, Math.min(2.3, normal(r) * 1.05));
    const y = Math.max(-1.3, Math.min(1.3, normal(r) * 0.62));
    const z = Math.max(-1.4, Math.min(1.4, normal(r) * 0.6));
    ud.push([x, y, z, r() < 0.018 ? 1 : 0]);
  }
  const fragmenter = 140;
  const pr = Math.ceil((n - sky) / fragmenter);
  for (let f = 0; f < fragmenter && ud.length < n; f++) {
    const cx = normal(r) * 1.0;
    const cy = normal(r) * 0.55;
    const cz = normal(r) * 0.55;
    const w = 0.08 + r() * 0.12;
    const h = w * (0.8 + r() * 0.8);
    const a = r() * Math.PI * 2;
    const b = r() * Math.PI;
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const linjer = 3 + Math.floor(r() * 4);
    for (let k = 0; k < pr && ud.length < n; k++) {
      // små tekstlinjer på fragmentet
      const li = Math.floor(r() * linjer);
      let u = (r() - 0.5) * w;
      u = Math.round(u / 0.01) * 0.01;
      const v = (li / Math.max(1, linjer - 1) - 0.5) * h;
      // drej i rummet
      const x1 = u * ca - v * sa;
      const y1 = u * sa + v * ca;
      const z1 = y1 * sb;
      ud.push([cx + x1, cy + y1 * cb, cz + z1, 0]);
    }
  }
  return ud;
}

/** Dokumenter: 18 sider i en let buet væg. Hver side har en overskrift og
 *  tekstlinjer som prikkede streger. Ét afsnit på én side gløder: det er
 *  det, agenten senere svarer ud fra. */
function dokumenter(n: number, r: () => number): Punkt[] {
  const kol = 6, rk = 3;
  const w = 0.44, h = 0.58, gx = 0.12, gy = 0.16;
  const R = 3.4;
  const bredde = kol * w + (kol - 1) * gx;
  const hoejde = rk * h + (rk - 1) * gy;
  const linjerPrSide = 13;
  // forudberegn linjelængder, så siderne har faste "afsnit"
  const laengde: number[][] = [];
  for (let s = 0; s < kol * rk; s++) {
    const l: number[] = [];
    for (let i = 0; i < linjerPrSide; i++) {
      const afsnitSlut = i % 4 === 3;
      l.push(afsnitSlut ? 0.3 + r() * 0.35 : 0.72 + r() * 0.26);
    }
    laengde.push(l);
  }
  const gloedSide = 7; // anden række, anden kolonne fra venstre
  const ud: Punkt[] = [];
  for (let i = 0; i < n; i++) {
    const s = Math.floor(r() * kol * rk);
    const c = s % kol, rr = Math.floor(s / kol);
    const sx0 = -bredde / 2 + c * (w + gx);
    const sy0 = hoejde / 2 - rr * (h + gy);
    const vaelg = r();
    let px: number, py: number;
    let gloed = 0;
    if (vaelg < 0.1) {
      // kant (sparsom)
      const t = r();
      const side = Math.floor(r() * 4);
      px = side < 2 ? t * w : side === 2 ? 0 : w;
      py = side < 2 ? (side === 0 ? 0 : -h) : -t * h;
    } else if (vaelg < 0.2) {
      // overskrift: to tætte linjer øverst
      px = 0.05 * w + r() * 0.55 * w;
      py = -0.08 * h - (r() < 0.5 ? 0 : 0.018);
    } else {
      const li = Math.floor(r() * linjerPrSide);
      const L = laengde[s][li];
      px = 0.06 * w + r() * L * 0.88 * w;
      px = Math.round(px / 0.009) * 0.009;
      py = -0.2 * h - (li / (linjerPrSide - 1)) * 0.72 * h;
      if (s === gloedSide && li >= 4 && li <= 7) gloed = 1;
    }
    const x = sx0 + px;
    const y = sy0 + py;
    // buet væg: x på en cirkelbue, z trækkes mod beskueren i siderne
    const vinkel = x / R;
    const bx = Math.sin(vinkel) * R;
    const bz = Math.cos(vinkel) * R - R;
    ud.push([bx, y, -bz * 0.9 + (r() - 0.5) * 0.01, gloed]);
  }
  return ud;
}

/** Graf: knuder på en fladtrykt kugle, forbundet til deres nærmeste naboer.
 *  En sti fra en knude forrest (spørgsmålet) gennem grafen til tre knuder
 *  (kilderne) gløder. */
function graf(n: number, r: () => number): Punkt[] {
  const antal = 92;
  const knuder: [number, number, number][] = [];
  const gyldne = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < antal; i++) {
    const y = 1 - (i / (antal - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = gyldne * i;
    const jit = 0.1;
    knuder.push([
      (Math.cos(t) * rad + (r() - 0.5) * jit) * 1.35,
      (y + (r() - 0.5) * jit) * 0.95,
      (Math.sin(t) * rad + (r() - 0.5) * jit) * 1.0,
    ]);
  }
  const kanter: [number, number][] = [];
  const set = new Set<string>();
  for (let i = 0; i < antal; i++) {
    const d = knuder
      .map((k, j) => [j, (k[0] - knuder[i][0]) ** 2 + (k[1] - knuder[i][1]) ** 2 + (k[2] - knuder[i][2]) ** 2] as [number, number])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1]);
    for (let k = 0; k < 3; k++) {
      const j = d[k][0];
      const noegle = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!set.has(noegle)) {
        set.add(noegle);
        kanter.push([i, j]);
      }
    }
  }
  // Spørgsmålet: knuden nærmest beskueren. Stien: BFS til tre knuder et
  // stykke inde i grafen.
  let start = 0;
  for (let i = 1; i < antal; i++) if (knuder[i][2] > knuder[start][2]) start = i;
  const nabo: number[][] = Array.from({ length: antal }, () => []);
  for (const [a, b] of kanter) {
    nabo[a].push(b);
    nabo[b].push(a);
  }
  const forrige = new Array(antal).fill(-1);
  const afstand = new Array(antal).fill(-1);
  afstand[start] = 0;
  const koe = [start];
  while (koe.length) {
    const a = koe.shift()!;
    for (const b of nabo[a]) if (afstand[b] < 0) {
      afstand[b] = afstand[a] + 1;
      forrige[b] = a;
      koe.push(b);
    }
  }
  const maal = afstand
    .map((d, i) => [i, d] as [number, number])
    .filter(([, d]) => d === 3)
    .slice(0, 3)
    .map(([i]) => i);
  const gloedKnude = new Set<number>([start]);
  const gloedKant = new Set<string>();
  for (const m of maal) {
    let a = m;
    while (a !== start && a >= 0) {
      const f = forrige[a];
      gloedKnude.add(a);
      gloedKant.add(a < f ? `${a}-${f}` : `${f}-${a}`);
      a = f;
    }
  }
  // Gløden på stien er 1 + hvor langt fra spørgsmålet (0 til 0,98). Farven
  // bruger kun op til 1; resten fortæller shaderen, hvor pulsen er.
  const sti = (d: number) => 1 + Math.min(0.98, (d / 3) * 0.98);
  const ud: Punkt[] = [];
  const iKnuder = Math.floor(n * 0.36);
  for (let i = 0; i < iKnuder; i++) {
    const k = Math.floor(r() * antal);
    const hub = k % 11 === 0 ? 2.2 : 1;
    const s = 0.03 * hub;
    const [x, y, z] = knuder[k];
    ud.push([x + normal(r) * s, y + normal(r) * s, z + normal(r) * s, gloedKnude.has(k) ? sti(afstand[k]) : 0]);
  }
  for (let i = iKnuder; i < n; i++) {
    const [a, b] = kanter[Math.floor(r() * kanter.length)];
    const t = r();
    const A = knuder[a], B = knuder[b];
    const noegle = a < b ? `${a}-${b}` : `${b}-${a}`;
    let g = 0;
    if (gloedKant.has(noegle)) {
      // afstand langs stien: fra den knude, der er nærmest spørgsmålet
      g = afstand[a] <= afstand[b] ? sti(afstand[a] + t) : sti(afstand[b] + 1 - t);
    }
    ud.push([
      A[0] + (B[0] - A[0]) * t + (r() - 0.5) * 0.006,
      A[1] + (B[1] - A[1]) * t + (r() - 0.5) * 0.006,
      A[2] + (B[2] - A[2]) * t + (r() - 0.5) * 0.006,
      g,
    ]);
  }
  return ud;
}

/** Prognose: tegnet som en rigtig prognose. Historikken er målinger, én
 *  pr. dag, forbundet med en tynd hvid streg. En lodret streg markerer i
 *  dag. Efter den fortsætter modellen som en stiplet orange streg, og
 *  usikkerheden åbner sig omkring den, bredere jo længere frem. */
function prognose(n: number, r: () => number): Punkt[] {
  const x0 = -1.7, x1 = 1.75, idag = 0.62, bund = -0.85;
  // Ugemønster med to harmonier (hurtigt dyk, langsomt plateau) og en svag trend
  const uge = 0.52;
  const w = (2 * Math.PI) / uge;
  const f = (x: number) => 0.27 * (Math.sin(w * (x - x0)) + 0.35 * Math.sin(2 * w * (x - x0) + 0.9)) + 0.11 * x;
  // 32 dage med målinger. Hver dag ligger lidt over eller under mønstret.
  const dage = 32;
  const trin = (idag - x0) / (dage - 1);
  const mx = Array.from({ length: dage }, (_, d) => x0 + d * trin);
  const my = mx.map((x) => f(x) + normal(r) * 0.045);
  // Prognosen starter i sidste måling og glider over i mønstret
  const spring = my[dage - 1] - f(idag);
  const frem = (x: number) => f(x) + spring * Math.exp(-(x - idag) / 0.12);
  const streg = 0.055;
  const stregAntal = Math.floor((x1 - idag) / streg);
  const ud: Punkt[] = [];
  for (let i = 0; i < n; i++) {
    const v = r();
    if (v < 0.4) {
      // historikken: rette stykker mellem målingerne
      const d = Math.floor(r() * (dage - 1));
      const t = r();
      ud.push([mx[d] + t * trin, my[d] + (my[d + 1] - my[d]) * t + normal(r) * 0.005, normal(r) * 0.015, 0]);
    } else if (v < 0.54) {
      // målingerne: små, klare prikker
      const d = Math.floor(r() * dage);
      ud.push([mx[d] + normal(r) * 0.007, my[d] + normal(r) * 0.007, normal(r) * 0.007, 0]);
    } else if (v < 0.66) {
      // prognosen: stiplet streg
      const k = Math.floor(r() * stregAntal);
      const x = idag + (k + r() * 0.55) * streg;
      ud.push([x, frem(x) + normal(r) * 0.005, normal(r) * 0.01, 1]);
    } else if (v < 0.9) {
      // usikkerheden: vokser med kvadratroden af horisonten
      const t = r();
      const x = idag + t * (x1 - idag);
      const sigma = 0.012 + 0.16 * Math.sqrt(t);
      ud.push([x, frem(x) + normal(r) * sigma, normal(r) * (0.02 + t * 0.08), 1]);
    } else if (v < 0.93) {
      // i dag: en prikket lodret streg
      const y = bund + r() * 1.8;
      ud.push([idag + normal(r) * 0.003, Math.round(y / 0.05) * 0.05, 0, 0.3]);
    } else {
      // tidsakse med en streg pr. uge
      const x = x0 + r() * (x1 - x0);
      const tick = Math.abs(((x - x0) / (trin * 7)) % 1 - 0.5) > 0.475;
      ud.push([x, bund - (tick ? r() * 0.06 : 0), 0, 0]);
    }
  }
  return ud;
}

/**
 * Laver de fire formationer med n partikler hver. Partiklerne sorteres
 * efter x i hver form og kobles sammen i samme rækkefølge, så en partikel
 * til venstre forbliver til venstre. Overgangen bliver en bølge fra venstre
 * mod højre i stedet for en tilfældig hvirvel.
 */
export function lavFormationer(n: number, frø = 20260929): {
  former: Formation[];
  tilfaeldig: Float32Array;
} {
  const r = tal(frø);
  const lister = [kaos(n, r), dokumenter(n, r), graf(n, r), prognose(n, r)];
  const former: Formation[] = lister.map((liste) => {
    const sorteret = liste
      .map((p) => [p[0] + (r() - 0.5) * 0.25, p] as [number, Punkt])
      .sort((a, b) => a[0] - b[0])
      .map(([, p]) => p);
    const pos = new Float32Array(n * 3);
    const gloed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const p = sorteret[i % sorteret.length];
      pos[i * 3] = p[0];
      pos[i * 3 + 1] = p[1];
      pos[i * 3 + 2] = p[2];
      gloed[i] = p[3];
    }
    return { pos, gloed };
  });
  // frø, størrelse, fase og forsinkelse. Forsinkelsen følger x i
  // udgangsformen, så bølgen går fra venstre mod højre.
  const tilfaeldig = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    tilfaeldig[i * 4] = r();
    tilfaeldig[i * 4 + 1] = r();
    tilfaeldig[i * 4 + 2] = r();
    tilfaeldig[i * 4 + 3] = Math.min(1, Math.max(0, i / n + (r() - 0.5) * 0.18));
  }
  return { former, tilfaeldig };
}
