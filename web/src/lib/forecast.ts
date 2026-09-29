/**
 * Forudsigelse — Holt-Winters med ugentlig sæson, i browseren.
 *
 * Samme princip som tinynet.ts: det her er ikke en tegning af en prognose,
 * det er en prognose. Modellen fittes på historikken i det øjeblik feltet
 * bliver synligt, parametrene findes ved at prøve 27 kombinationer og tage
 * den med mindst fejl, og båndet er beregnet — ikke tegnet på med øjemål.
 *
 * Model: ETS(A,A,A). Additivt niveau, trend og sæson, periode 7.
 * Båndet: variansformlen for additiv Holt-Winters (Hyndman m.fl., Forecasting
 * with Exponential Smoothing, kap. 6). Det er derfor det bliver bredere jo
 * længere frem man ser, og det er pointen: jo længere ude, jo mindre ved den.
 *
 * Dataene er syntetiske og står som det på siden. Mønsteret er det man ser
 * i næsten enhver supportindbakke: travle mandage, stille weekender, en svag
 * stigning over tid.
 */

export const PERIODE = 7;

export type Serie = {
  /** Dag 0 er en mandag. */
  y: number[];
};

export type Fit = {
  alpha: number;
  beta: number;
  gamma: number;
  /** Én-skridts-prognoser inde i historikken, til at måle fejlen. */
  fitted: number[];
  /** Standardafvigelse på én-skridts-fejlen. */
  sigma: number;
  /** Tilstand efter sidste observation. */
  level: number;
  trend: number;
  season: number[];
};

export type Prognose = {
  mid: number[];
  lav: number[];
  hoej: number[];
};

/** Normalfordelt støj, Box-Muller. */
function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Otte ugers henvendelser. Mandag travlest, weekenden næsten tom. */
export function lavSerie(uger = 8): Serie {
  /* Tillæg pr. ugedag, mandag først. Summer til ca. nul. */
  const uge = [34, 18, 10, 4, -8, -30, -28];
  const niveau = 96 + Math.random() * 18;
  const stigning = 0.25 + Math.random() * 0.35;
  const y: number[] = [];
  for (let t = 0; t < uger * PERIODE; t++) {
    const v = niveau + stigning * t + uge[t % PERIODE] + gauss() * 7;
    y.push(Math.max(0, Math.round(v)));
  }
  return { y };
}

function koer(y: number[], a: number, b: number, g: number) {
  const m = PERIODE;
  /* Start: niveau = første uges gennemsnit, trend = forskellen mellem de to
     første ugers gennemsnit pr. dag, sæson = første uge minus niveauet. */
  const u1 = y.slice(0, m).reduce((s, v) => s + v, 0) / m;
  const u2 = y.slice(m, 2 * m).reduce((s, v) => s + v, 0) / m;
  let l = u1;
  let tr = (u2 - u1) / m;
  const s = y.slice(0, m).map((v) => v - u1);
  const fitted: number[] = [];
  let sse = 0;
  let n = 0;
  for (let t = 0; t < y.length; t++) {
    const sIdx = t % m;
    const f = l + tr + s[sIdx];
    fitted.push(f);
    if (t >= m) {
      const e = y[t] - f;
      sse += e * e;
      n++;
    }
    const lNy = a * (y[t] - s[sIdx]) + (1 - a) * (l + tr);
    const trNy = b * (lNy - l) + (1 - b) * tr;
    s[sIdx] = g * (y[t] - lNy) + (1 - g) * s[sIdx];
    l = lNy;
    tr = trNy;
  }
  return { fitted, sse, n, l, tr, s };
}

/**
 * Finder α, β og γ ved at prøve dem. 27 kombinationer er få nok til at køre
 * på et øjeblik og mange nok til at man ikke har valgt svaret på forhånd.
 */
export function fit(serie: Serie): Fit {
  const A = [0.15, 0.35, 0.6];
  const B = [0.01, 0.05, 0.15];
  const G = [0.05, 0.2, 0.45];
  let bedst: ReturnType<typeof koer> & { a: number; b: number; g: number } | null = null;
  for (const a of A)
    for (const b of B)
      for (const g of G) {
        const r = koer(serie.y, a, b, g);
        if (!bedst || r.sse < bedst.sse) bedst = { ...r, a, b, g };
      }
  const r = bedst!;
  return {
    alpha: r.a,
    beta: r.b,
    gamma: r.g,
    fitted: r.fitted,
    sigma: Math.sqrt(r.sse / Math.max(1, r.n - 3)),
    level: r.l,
    trend: r.tr,
    season: r.s,
  };
}

/** z for et tosidet 80%-interval. */
const Z80 = 1.2816;

export function prognose(f: Fit, h: number, tStart: number): Prognose {
  const m = PERIODE;
  const mid: number[] = [];
  const lav: number[] = [];
  const hoej: number[] = [];
  /* Variansen for h skridt frem: σ²·(1 + Σ c_j²), hvor
     c_j = α(1 + jβ) + γ·[j er et helt antal perioder]. */
  let acc = 0;
  for (let k = 1; k <= h; k++) {
    if (k > 1) {
      const j = k - 1;
      const c = f.alpha * (1 + j * f.beta) + (j % m === 0 ? f.gamma : 0);
      acc += c * c;
    }
    const sIdx = (tStart + k - 1) % m;
    const v = f.level + k * f.trend + f.season[sIdx];
    const sd = f.sigma * Math.sqrt(1 + acc);
    mid.push(Math.max(0, v));
    lav.push(Math.max(0, v - Z80 * sd));
    hoej.push(v + Z80 * sd);
  }
  return { mid, lav, hoej };
}
