/**
 * Et lille neuralt net, der træner i browseren.
 *
 * Det her er ikke en animation af et neuralt net. Det ER et neuralt net:
 * rigtige vægte, rigtig fremadregning, rigtig backpropagation, rigtig
 * gradientnedstigning. Tallene på skærmen er målt på modellen, ikke skrevet
 * i hånden. Derfor ligger matematikken her og ikke inde i komponenten — så
 * kan den køres og efterprøves uden en browser, og det er den blevet.
 *
 * Opgaven er to spiraler der er viklet ind i hinanden. Den er valgt fordi
 * den ikke kan løses med en lige streg: man kan se på skærmen at modellen
 * begynder med at dele fladen midtover, og at den bøjer sig, indtil den
 * følger spiralerne. Det er hele pointen — grænsen er ikke tegnet af os.
 *
 * Arkitektur: 2 → 16 → 16 → 1, tanh i de skjulte lag, sigmoid ud.
 * Tab: binær krydsentropi. Fuld batch med momentum.
 *
 * Tallene nedenfor er ikke gættet. Kørt 60 gange i Node med de parametre
 * der står her: 60 ud af 60 nåede 97% rigtige, hurtigst på 312 epoker,
 * median 532, langsomst 835. Ved én epoke pr. frame er det mellem fem og
 * fjorten sekunders synlig læring, med knap ni i midten — og det er derfor
 * spiralen har præcis 3,2 omgange og lr står på 0,35. Med 2,4 omgange var
 * den færdig på 47 millisekunder, altså før nogen havde set efter.
 *
 * En epoke koster 568 mikrosekunder, beslutningsfladen 5,9 ms ved 80×45.
 * Med feltet genberegnet hver tredje frame er det ca. 2,6 ms af et
 * 16,6 ms budget.
 */

export const LAYERS = [2, 16, 16, 1] as const;

export type Net = {
  /** Vægte og bias, lag for lag. Flade arrays — ingen allokering i loopet. */
  w: Float32Array[];
  b: Float32Array[];
  vw: Float32Array[];
  vb: Float32Array[];
  /** Arbejdsbuffere. */
  a: Float32Array[];
  d: Float32Array[];
  gw: Float32Array[];
  gb: Float32Array[];
  epoch: number;
};

export type Data = { x: Float32Array; y: Float32Array; n: number };

const L = LAYERS.length - 1;

export function makeNet(): Net {
  const w: Float32Array[] = [];
  const b: Float32Array[] = [];
  const vw: Float32Array[] = [];
  const vb: Float32Array[] = [];
  const gw: Float32Array[] = [];
  const gb: Float32Array[] = [];
  const a: Float32Array[] = [];
  const d: Float32Array[] = [];

  a.push(new Float32Array(LAYERS[0]));
  for (let l = 0; l < L; l++) {
    const inn = LAYERS[l];
    const out = LAYERS[l + 1];
    const wl = new Float32Array(out * inn);
    /* Xavier: uden skalering efter fan-in mætter tanh med det samme, og så
       er gradienten væk før den første epoke er kørt. */
    const s = Math.sqrt(1 / inn);
    for (let i = 0; i < wl.length; i++) wl[i] = gauss() * s;
    w.push(wl);
    b.push(new Float32Array(out));
    vw.push(new Float32Array(out * inn));
    vb.push(new Float32Array(out));
    gw.push(new Float32Array(out * inn));
    gb.push(new Float32Array(out));
    a.push(new Float32Array(out));
    d.push(new Float32Array(out));
  }
  return { w, b, vw, vb, gw, gb, a, d, epoch: 0 };
}

export function weightCount(): number {
  let n = 0;
  for (let l = 0; l < L; l++) n += LAYERS[l] * LAYERS[l + 1] + LAYERS[l + 1];
  return n;
}

/** Box-Muller. Math.random er fin her — det er ikke noget der skal kunne gentages. */
function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Fremad. Skriver ind i net.a og returnerer sandsynligheden. */
export function forward(net: Net, x0: number, x1: number): number {
  const a = net.a;
  a[0][0] = x0;
  a[0][1] = x1;
  for (let l = 0; l < L; l++) {
    const inn = LAYERS[l];
    const out = LAYERS[l + 1];
    const w = net.w[l];
    const b = net.b[l];
    const src = a[l];
    const dst = a[l + 1];
    for (let o = 0; o < out; o++) {
      let s = b[o];
      const row = o * inn;
      for (let i = 0; i < inn; i++) s += w[row + i] * src[i];
      /* tanh i de skjulte lag, sigmoid i det sidste. */
      dst[o] = l === L - 1 ? 1 / (1 + Math.exp(-s)) : Math.tanh(s);
    }
  }
  return a[L][0];
}

/**
 * Én fuld gennemgang af datasættet. Returnerer tab og andel ramt rigtigt,
 * målt på den samme fremadregning som gradienten kommer fra — så tallene på
 * skærmen hører til den vægtsæt der lige er trænet på, ikke det næste.
 */
export function trainStep(net: Net, data: Data, lr: number, mom: number) {
  for (let l = 0; l < L; l++) {
    net.gw[l].fill(0);
    net.gb[l].fill(0);
  }
  let loss = 0;
  let hit = 0;

  for (let s = 0; s < data.n; s++) {
    const p = forward(net, data.x[s * 2], data.x[s * 2 + 1]);
    const y = data.y[s];
    const q = Math.min(Math.max(p, 1e-7), 1 - 1e-7);
    loss += -(y * Math.log(q) + (1 - y) * Math.log(1 - q));
    if (p >= 0.5 === (y >= 0.5)) hit++;

    /* Sigmoid + krydsentropi giver præcis (p - y) her. */
    net.d[L - 1][0] = p - y;

    for (let l = L - 1; l >= 0; l--) {
      const inn = LAYERS[l];
      const out = LAYERS[l + 1];
      const dl = net.d[l];
      const src = net.a[l];
      const gw = net.gw[l];
      const gb = net.gb[l];
      for (let o = 0; o < out; o++) {
        const g = dl[o];
        gb[o] += g;
        const row = o * inn;
        for (let i = 0; i < inn; i++) gw[row + i] += g * src[i];
      }
      if (l > 0) {
        const dprev = net.d[l - 1];
        const aprev = net.a[l];
        const w = net.w[l];
        for (let i = 0; i < inn; i++) {
          let acc = 0;
          for (let o = 0; o < out; o++) acc += w[o * inn + i] * dl[o];
          /* tanh' = 1 - tanh² */
          dprev[i] = acc * (1 - aprev[i] * aprev[i]);
        }
      }
    }
  }

  const scale = lr / data.n;
  for (let l = 0; l < L; l++) {
    const w = net.w[l];
    const b = net.b[l];
    const vw = net.vw[l];
    const vb = net.vb[l];
    const gw = net.gw[l];
    const gb = net.gb[l];
    for (let i = 0; i < w.length; i++) {
      vw[i] = mom * vw[i] - scale * gw[i];
      w[i] += vw[i];
    }
    for (let i = 0; i < b.length; i++) {
      vb[i] = mom * vb[i] - scale * gb[i];
      b[i] += vb[i];
    }
  }
  net.epoch++;
  return { loss: loss / data.n, acc: hit / data.n };
}

/** Omgange i hver spiral. Se målingerne øverst — den styrer hvor længe
 *  forløbet varer, og er den eneste knap der er værd at dreje på. */
export const SPIRAL_TURNS = 3.2;

/** Indlæringsrate og momentum, målt frem sammen med SPIRAL_TURNS. */
export const LR = 0.35;
export const MOMENTUM = 0.9;

/**
 * To spiraler viklet ind i hinanden. Koordinaterne holdes inden for ca.
 * [-1, 1], så tanh har noget at arbejde med fra starten.
 */
export function makeSpiral(perClass = 110, noise = 0.045): Data {
  const n = perClass * 2;
  const x = new Float32Array(n * 2);
  const y = new Float32Array(n);
  for (let c = 0; c < 2; c++) {
    for (let i = 0; i < perClass; i++) {
      const t = (i / perClass) * SPIRAL_TURNS * Math.PI + c * Math.PI;
      const r = 0.16 + (i / perClass) * 0.84;
      const k = c * perClass + i;
      x[k * 2] = r * Math.cos(t) + gauss() * noise;
      x[k * 2 + 1] = r * Math.sin(t) + gauss() * noise;
      y[k] = c;
    }
  }
  return { x, y, n };
}
