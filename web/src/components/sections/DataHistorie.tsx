"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { lavFormationer } from "@/lib/partikler";
import { kamera, perspektiv, program } from "@/lib/gl";

/**
 * "Fra spredt viden til svar": udviklingssporet fortalt med partikler.
 *
 * Erstatter demovinduet ("Det kører. Lige nu, i din browser."). Det viste,
 * at vi kan kode, men en køber skal se, hvad AI gør med *deres* data. Her
 * er de samme partikler fire ting efter hinanden, styret af scroll:
 * spredte fragmenter, en væg af dokumenter, en graf hvor et spørgsmål
 * finder vej, og en prognose med usikkerheden vist. Ved siden af står et
 * lille kort med et konkret eksempel på hvert trin.
 *
 * Teknik: WebGL2 og ét drawArrays-kald. Hver partikel har fire positioner
 * (én pr. form), og vertex-shaderen blander mellem dem med en forsinkelse,
 * der følger x, så overgangen går som en bølge fra venstre mod højre.
 * Ingen biblioteker. Tegner kun, mens sektionen er på skærmen.
 *
 * Tilgængelighed: lærredet og kortene er pynt (aria-hidden); al tekst står
 * i kapitlerne. prefers-reduced-motion: ingen hvirvel eller åndedræt, og
 * formen skifter uden at flyve. Uden WebGL2 står teksten alene på mørk
 * baggrund.
 */

const KAPITLER = [
  {
    etiket: "Det vi bygger",
    titel: "Det meste af jeres viden ligger spredt.",
    tekst:
      "I mails, dokumenter, regneark og systemer, der ikke taler sammen. Det er råmaterialet, og det er grunden til, at folk bruger tid på at lede i stedet for at arbejde.",
  },
  {
    etiket: "01 · Vi samler det",
    titel: "Vi læser det ind og gør det søgbart.",
    tekst:
      "Vi kobler jeres systemer på og læser jeres egne dokumenter ind, afsnit for afsnit. Intet af det bliver brugt til at træne en model, hverken vores eller leverandørernes.",
  },
  {
    etiket: "02 · Den svarer",
    titel: "Så kan I spørge. Og få svar med kilde.",
    tekst:
      "En agent finder de afsnit, der passer, og svarer ud fra dem. Står det ikke i jeres materiale, siger den det i stedet for at gætte. Sådan kører den hos Lavazza.",
  },
  {
    etiket: "03 · Den ser frem",
    titel: "Og se, hvad der kommer.",
    tekst:
      "Med jeres historik kan en model sige noget om næste uge: ordrer, henvendelser, bemanding. Med usikkerheden vist, så I ved, hvor meget I kan læne jer op ad den.",
  },
];

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aP0;
layout(location=1) in vec3 aP1;
layout(location=2) in vec3 aP2;
layout(location=3) in vec3 aP3;
layout(location=4) in vec4 aG;
layout(location=5) in vec4 aR;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uProg;
uniform float uTid;
uniform float uBevaeg;
uniform float uStr;
uniform float uSkala;
uniform float uIntro;
uniform vec2 uForskyd;
uniform vec2 uMus;
out float vGloed;
out float vAlfa;
void main() {
  float p = clamp(uProg, 0.0, 3.0);
  float seg = min(floor(p), 2.0);
  float t = p - seg;
  // Bølgen: hver partikel flyver i 30 % af kapitlet, i rækkefølge efter x.
  // Så er omkring en tredjedel i luften ad gangen, og formen står skarpt
  // på begge sider af fronten.
  float d = aR.w * 0.7;
  float tt = smoothstep(d, d + 0.3, t);
  vec3 A = seg < 0.5 ? aP0 : (seg < 1.5 ? aP1 : aP2);
  vec3 B = seg < 0.5 ? aP1 : (seg < 1.5 ? aP2 : aP3);
  float gA = seg < 0.5 ? aG.x : (seg < 1.5 ? aG.y : aG.z);
  float gB = seg < 0.5 ? aG.y : (seg < 1.5 ? aG.z : aG.w);
  vec3 pos = mix(A, B, tt);
  float flyv = sin(tt * 3.14159265);
  vec3 hvirvel = vec3(sin(aR.x * 31.0 + uTid * 0.9), cos(aR.y * 23.0 + uTid * 0.7), sin(aR.z * 17.0 + uTid * 0.8));
  pos += flyv * 0.2 * hvirvel * uBevaeg;
  pos += 0.010 * uBevaeg * vec3(sin(uTid * 0.8 + aR.x * 40.0), cos(uTid * 0.7 + aR.y * 33.0), sin(uTid * 0.6 + aR.z * 27.0));
  pos *= mix(0.15, 1.0, uIntro) * uSkala;
  vec4 mv = uView * vec4(pos, 1.0);
  vec4 clip = uProj * mv;
  clip.xy += uForskyd * clip.w;
  vec2 fra = clip.xy / clip.w - uMus;
  float skub = smoothstep(0.24, 0.0, length(fra)) * 0.07 * uBevaeg;
  clip.xy += normalize(fra + 1e-5) * skub * clip.w;
  gl_Position = clip;
  float g = min(mix(gA, gB, tt), 1.0);
  // Dokumenterne: et blødt lys glider hen over siderne, mens de læses ind
  float w1 = clamp(1.0 - abs(p - 1.0) * 2.0, 0.0, 1.0);
  float laes = exp(-pow((aP1.x - (fract(uTid * 0.1) * 6.0 - 3.0)) * 3.0, 2.0)) * w1 * uBevaeg;
  // Grafen: en puls løber ad stien fra spørgsmålet ud til kilderne
  float w2 = clamp(1.0 - abs(p - 2.0) * 2.0, 0.0, 1.0);
  float s2 = aG.z - 1.0;
  float puls = step(0.0, s2) * exp(-pow((s2 - (fract(uTid * 0.32) * 1.5 - 0.25)) * 6.0, 2.0)) * w2 * uBevaeg;
  vGloed = g;
  gl_PointSize = max(1.0, uStr * (0.55 + aR.y * 0.9) * (1.0 + g * 0.55 + puls * 0.7) / -mv.z);
  vAlfa = (0.3 + 0.7 * aR.z) * smoothstep(11.0, 3.0, -mv.z) * uIntro * (1.0 + laes * 0.8 + puls * 2.2);
}`;

/* Lyset summeres i en float-buffer og tonemappes bagefter. Direkte additiv
   blanding klippede hver kanal for sig, så tæt orange blev gul. Her
   skaleres farven samlet, så tonen holder, og kun lysstyrken mættes. */
const SKAERM_VERT = `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const SKAERM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uLys;
uniform float uMobil;
in vec2 vUv;
out vec4 ud;
void main() {
  vec3 a = texture(uLys, vUv).rgb;
  float m = max(max(a.r, a.g), a.b);
  float k = m > 1e-5 ? (1.0 - exp(-m * 1.3)) / m : 1.3;
  vec3 lys = a * k;
  // Sløret mod kanterne og bag teksten ligger her i stedet for i CSS.
  // Oven på lærredet gav det trin på én gråtone i 8 bit.
  float fraTop = 1.0 - vUv.y;
  float maske;
  if (uMobil > 0.5) {
    maske = (1.0 - 0.6 * (1.0 - smoothstep(0.0, 0.14, fraTop))) * (1.0 - 0.92 * smoothstep(0.5, 0.66, fraTop));
  } else {
    maske = (1.0 - 0.85 * (1.0 - smoothstep(0.0, 0.18, fraTop)))
          * (1.0 - 0.9 * smoothstep(0.78, 1.0, fraTop))
          * (1.0 - 0.75 * (1.0 - smoothstep(0.0, 0.45, vUv.x)));
  }
  // Støj på en halv gråtone, så gløden ikke får trin
  float stoej = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  vec3 bg = vec3(10.0 / 255.0);
  ud = vec4(bg + lys * maske * (1.0 - bg) + (stoej - 0.5) / 255.0, 1.0);
}`;

/** Kameraets vinkel pr. form: dokumenterne ses næsten lige forfra, grafen
 *  drejet så dybden viser sig, prognosen igen tæt på forfra. */
const VINKEL_Y = [-0.26, -0.03, 0.3, 0.06];
const VINKEL_X = [-0.1, -0.04, -0.14, -0.02];
function vinkel(liste: number[], p: number) {
  const i = Math.min(2, Math.max(0, Math.floor(p)));
  const t = Math.min(1, Math.max(0, p - i));
  const e = t * t * (3 - 2 * t);
  return liste[i] + (liste[i + 1] - liste[i]) * e;
}

const FRAG = `#version 300 es
precision highp float;
in float vGloed;
in float vAlfa;
uniform vec3 uHvid;
uniform vec3 uOrange;
out vec4 ud;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r2 = dot(c, c);
  if (r2 > 0.25) discard;
  float a = exp(-r2 * 14.0) * vAlfa;
  ud = vec4(mix(uHvid, uOrange, vGloed) * a, a);
}`;

function antalPartikler(bredde: number) {
  const kerner = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
  const basis = bredde >= 1280 ? 90000 : bredde >= 1024 ? 70000 : bredde >= 640 ? 45000 : 26000;
  return Math.round(basis * (kerner <= 4 ? 0.6 : 1));
}

export default function DataHistorie() {
  const sektion = useRef<HTMLElement>(null);
  const lag = useRef<HTMLDivElement>(null);
  const laerred = useRef<HTMLCanvasElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const [udenGl, setUdenGl] = useState(false);

  useEffect(() => {
    const sek = sektion.current;
    const cv = laerred.current;
    const holder = lag.current;
    if (!sek || !cv || !holder) return;

    let gl: WebGL2RenderingContext | null = null;
    let raf = 0;
    let synlig = false;
    let startet = false;
    let introStart = 0;
    let prog = 0;
    let sidst = performance.now();
    let aktivNu = 0;
    const mus = { x: 9, y: 9, mx: 9, my: 9 };
    const reduceret = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const uni: Record<string, WebGLUniformLocation | null> = {};
    let prgPunkter: WebGLProgram | null = null;
    let prgSkaerm: WebGLProgram | null = null;
    let vaoPunkter: WebGLVertexArrayObject | null = null;
    let vaoTom: WebGLVertexArrayObject | null = null;
    let fbo: WebGLFramebuffer | null = null;
    let tex: WebGLTexture | null = null;
    let hdr = false;
    let n = 0;
    let bredde = 0, hoejde = 0, dpr = 1;

    const tilpas = () => {
      if (!gl) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      bredde = holder.clientWidth;
      hoejde = holder.clientHeight;
      cv.width = Math.round(bredde * dpr);
      cv.height = Math.round(hoejde * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      if (hdr && tex) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, cv.width, cv.height, 0, gl.RGBA, gl.HALF_FLOAT, null);
      }
    };

    const start = () => {
      if (startet) return;
      startet = true;
      gl = cv.getContext("webgl2", { alpha: false, antialias: false, premultipliedAlpha: true, powerPreference: "high-performance" });
      if (!gl) {
        setUdenGl(true);
        return;
      }
      try {
        prgPunkter = program(gl, VERT, FRAG);
        prgSkaerm = program(gl, SKAERM_VERT, SKAERM_FRAG);
      } catch {
        setUdenGl(true);
        return;
      }
      const prg = prgPunkter;
      n = antalPartikler(window.innerWidth);
      const { former, tilfaeldig } = lavFormationer(n);
      vaoPunkter = gl.createVertexArray();
      gl.bindVertexArray(vaoPunkter);
      const buffer = (data: Float32Array, lok: number, str: number) => {
        const b = gl!.createBuffer();
        gl!.bindBuffer(gl!.ARRAY_BUFFER, b);
        gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.STATIC_DRAW);
        gl!.enableVertexAttribArray(lok);
        gl!.vertexAttribPointer(lok, str, gl!.FLOAT, false, 0, 0);
      };
      former.forEach((f, i) => buffer(f.pos, i, 3));
      const gloed = new Float32Array(n * 4);
      for (let i = 0; i < n; i++) for (let k = 0; k < 4; k++) gloed[i * 4 + k] = former[k].gloed[i];
      buffer(gloed, 4, 4);
      buffer(tilfaeldig, 5, 4);
      gl.useProgram(prg);
      for (const navn of ["uProj", "uView", "uProg", "uTid", "uBevaeg", "uStr", "uSkala", "uIntro", "uForskyd", "uMus", "uHvid", "uOrange"])
        uni[navn] = gl.getUniformLocation(prg, navn);
      gl.uniform3f(uni.uHvid, 0.86, 0.88, 0.9);
      gl.uniform3f(uni.uOrange, 1.0, 0.604, 0.0);
      gl.bindVertexArray(null);
      vaoTom = gl.createVertexArray();
      // Float-buffer til lyset, hvis browseren kan tegne i den
      hdr = !!gl.getExtension("EXT_color_buffer_float");
      if (hdr) {
        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, 1, 1, 0, gl.RGBA, gl.HALF_FLOAT, null);
        fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        hdr = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.useProgram(prgSkaerm);
      gl.uniform1i(gl.getUniformLocation(prgSkaerm!, "uLys"), 0);
      uni.uMobil = gl.getUniformLocation(prgSkaerm!, "uMobil");
      gl.useProgram(prg);
      // Med float-bufferen ligger sløret i shaderen, og CSS-sløret skjules
      holder.dataset.hdr = hdr ? "1" : "0";
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.disable(gl.DEPTH_TEST);
      tilpas();
      introStart = performance.now();
    };

    const tegn = (nu: number) => {
      raf = 0;
      if (!synlig) return;
      const dt = Math.min(0.05, (nu - sidst) / 1000);
      sidst = nu;
      // fremdrift: 0 når sektionen rammer toppen, 3 når sidste kapitel står
      const r = sek.getBoundingClientRect();
      const rejse = Math.max(1, r.height - window.innerHeight);
      const maal = Math.min(1, Math.max(0, -r.top / rejse)) * 3;
      prog = reduceret ? Math.round(maal) : prog + (maal - prog) * (1 - Math.exp(-dt * 5));
      // Skift kort lidt efter midten, så det ikke blinker, hvis man stopper der
      if (Math.abs(prog - aktivNu) > 0.56) {
        aktivNu = Math.round(prog);
        setAktiv(aktivNu);
      }
      // Uden WebGL følger kortene stadig kapitlerne; der tegnes bare ikke
      if (!gl) {
        raf = requestAnimationFrame(tegn);
        return;
      }
      mus.mx += (mus.x - mus.mx) * (1 - Math.exp(-dt * 6));
      mus.my += (mus.y - mus.my) * (1 - Math.exp(-dt * 6));
      const tid = nu / 1000;
      const intro = reduceret ? 1 : 1 - Math.pow(1 - Math.min(1, (nu - introStart) / 1600), 3);
      const desktop = bredde >= 1024;
      const aspekt = bredde / Math.max(1, hoejde);
      const skala = desktop ? 0.78 : Math.min(0.95, aspekt / 1.25);
      const synsX = desktop && mus.mx < 5 ? mus.mx : 0;
      const synsY = desktop && mus.my < 5 ? mus.my : 0;
      gl.useProgram(prgPunkter);
      gl.uniformMatrix4fv(uni.uProj, false, perspektiv(38, aspekt, 0.1, 50));
      gl.uniformMatrix4fv(
        uni.uView,
        false,
        kamera(4.8, vinkel(VINKEL_X, prog) + synsY * 0.06, vinkel(VINKEL_Y, prog) + (reduceret ? 0 : Math.sin(tid * 0.12) * 0.06) + synsX * 0.12)
      );
      gl.uniform1f(uni.uProg, prog);
      gl.uniform1f(uni.uTid, tid);
      gl.uniform1f(uni.uBevaeg, reduceret ? 0 : 1);
      gl.uniform1f(uni.uStr, 10.5 * dpr);
      gl.uniform1f(uni.uSkala, skala);
      gl.uniform1f(uni.uIntro, intro);
      gl.uniform2f(uni.uForskyd, desktop ? 0.3 : 0, desktop ? 0.05 : 0.34);
      gl.uniform2f(uni.uMus, desktop ? mus.mx : 9, desktop ? mus.my : 9);
      if (hdr) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.clearColor(0, 0, 0, 0);
      } else {
        gl.clearColor(10 / 255, 10 / 255, 10 / 255, 1);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.bindVertexArray(vaoPunkter);
      gl.drawArrays(gl.POINTS, 0, n);
      if (hdr) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.disable(gl.BLEND);
        gl.useProgram(prgSkaerm);
        gl.uniform1f(uni.uMobil, desktop ? 0 : 1);
        gl.bindVertexArray(vaoTom);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(tegn);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        synlig = e.isIntersecting;
        if (synlig) {
          start();
          if (!raf) {
            sidst = performance.now();
            raf = requestAnimationFrame(tegn);
          }
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(sek);

    const ro = new ResizeObserver(() => tilpas());
    ro.observe(holder);

    const bevaeg = (e: PointerEvent) => {
      const r = holder.getBoundingClientRect();
      mus.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mus.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const ud = () => {
      mus.x = 9;
      mus.y = 9;
    };
    holder.addEventListener("pointermove", bevaeg);
    holder.addEventListener("pointerleave", ud);
    const skjul = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (synlig && !raf) {
        sidst = performance.now();
        raf = requestAnimationFrame(tegn);
      }
    };
    document.addEventListener("visibilitychange", skjul);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      holder.removeEventListener("pointermove", bevaeg);
      holder.removeEventListener("pointerleave", ud);
      document.removeEventListener("visibilitychange", skjul);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <section
      ref={sektion}
      id="data-historie"
      data-header="moerk"
      aria-labelledby="data-titel"
      className="relative bg-ink"
    >
      {/* Lærredet står stille, mens kapitlerne scroller hen over det */}
      <div ref={lag} className="group sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={laerred} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {udenGl && <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_65%_50%,rgba(255,255,255,0.06),transparent)]" />}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 group-data-[hdr=1]:hidden bg-[linear-gradient(to_bottom,rgba(10,10,10,0.85),transparent_18%,transparent_78%,rgba(10,10,10,0.9)),linear-gradient(to_right,rgba(10,10,10,0.75),transparent_45%)] max-lg:bg-[linear-gradient(to_bottom,rgba(10,10,10,0.6),transparent_14%,transparent_50%,rgba(10,10,10,0.92)_66%)]"
        />
        {/* Kortene: ét eksempel pr. kapitel, kun på store skærme */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[7%] right-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] hidden w-[19rem] lg:block">
          {KORT.map((K, i) => (
            <div
              key={i}
              className={`absolute bottom-0 right-0 w-full transition-[opacity,translate] duration-700 ease-out ${
                aktiv === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <K aktiv={aktiv === i} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 -mt-[100svh]">
        {KAPITLER.map((k, i) => (
          <div key={k.titel} className="flex min-h-[100svh] items-end pb-[14svh] lg:items-center lg:pb-0">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="max-w-[26rem]">
                <div className="flex items-center gap-3">
                  {i === 0 && <span className="lamp" data-lit="true" aria-hidden="true" />}
                  <p className={`kicker ${i === 0 ? "text-white/80" : "text-white/60"}`}>{k.etiket}</p>
                </div>
                {i === 0 ? (
                  <h2 id="data-titel" className="mt-5 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-white">
                    {k.titel}
                  </h2>
                ) : (
                  <h3 className="mt-5 text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.06] tracking-display text-white">
                    {k.titel}
                  </h3>
                )}
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/75">{k.tekst}</p>
                {i === KAPITLER.length - 1 && (
                  <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                    <Link href="/skraeddersyede-ai" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Skræddersyet AI
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                    <Link href="/visionai" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      AIK Workspace
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                )}
                {/* På tablets står kortet under teksten. På telefonen er der
                    ikke plads til både figur, tekst og kort, så det udelades. */}
                <div aria-hidden="true" className="mt-8 hidden md:block lg:hidden">
                  {(() => {
                    const K = KORT[i];
                    return <K aktiv={aktiv === i} />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Kortene. Tallene er et eksempel og siger det selv.                  */
/* ------------------------------------------------------------------ */

function Kortramme({ titel, lys, children }: { titel: string; lys: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111316]/85 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/70">
          <span className="lamp" data-lit={lys ? "true" : "false"} />
          {titel}
        </p>
        <p className="text-[0.625rem] text-white/45">Eksempel</p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function KortKilder() {
  const r = [
    ["Personalehåndbog.pdf", "214 sider"],
    ["Delte drev", "3.812 filer"],
    ["Indbakke, HR", "1.206 mails"],
    ["CRM og økonomi", "4 systemer"],
  ];
  return (
    <Kortramme titel="Kilder i dag" lys={false}>
      <ul className="divide-y divide-white/[0.07]">
        {r.map(([a, b]) => (
          <li key={a} className="flex justify-between py-1.5 text-[0.8125rem]">
            <span className="text-white/85">{a}</span>
            <span className="tabular-nums text-white/55">{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[0.75rem] leading-snug text-white/55">Fire steder. Ingen søgning på tværs.</p>
    </Kortramme>
  );
}

function KortIndeks({ aktiv }: { aktiv: boolean }) {
  return (
    <Kortramme titel="Læst ind" lys>
      <p className="text-[1.375rem] font-semibold leading-none tabular-nums text-white">
        2.140 <span className="text-[0.8125rem] font-normal text-white/60">dokumenter</span>
      </p>
      <p className="mt-1.5 text-[0.8125rem] tabular-nums text-white/60">18.431 afsnit med kilde</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[1600ms] ease-out"
          style={{ width: aktiv ? "100%" : "8%" }}
        />
      </div>
      <p className="mt-3 flex justify-between border-t border-white/[0.07] pt-2 text-[0.75rem] text-white/60">
        <span>Brugt til at træne en model</span>
        <span className="tabular-nums text-white">0</span>
      </p>
    </Kortramme>
  );
}

const SPOERGSMAAL = "Hvor mange feriedage har jeg tilbage?";
const SVAR = "Du har 12 feriedage tilbage. Op til 5 kan overføres til næste år.";

function KortSvar({ aktiv }: { aktiv: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!aktiv) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setN(i);
      if (i >= SVAR.length) window.clearInterval(id);
    }, 28);
    return () => {
      window.clearInterval(id);
      setN(0);
    };
  }, [aktiv]);
  const faerdig = n >= SVAR.length;
  return (
    <Kortramme titel="HR-agent" lys={aktiv && !faerdig}>
      <p className="text-[0.8125rem] text-white/60">
        <span className="mr-1.5 text-white/40">&gt;</span>
        {SPOERGSMAAL}
      </p>
      <p className="mt-2 min-h-[2.6rem] text-[0.875rem] leading-snug text-white">{SVAR.slice(0, n)}</p>
      <p className={`mt-2.5 border-t border-white/[0.07] pt-2 text-[0.75rem] text-white/60 transition-opacity duration-300 ${faerdig ? "opacity-100" : "opacity-0"}`}>
        Kilde: Personalehåndbog, afsnit 4.2
      </p>
    </Kortramme>
  );
}

function KortPrognose() {
  // Ugentlig sæson, en svag trend, og en vifte efter i dag.
  const hist = Array.from({ length: 22 }, (_, i) => 36 - 14 * Math.sin((i / 7) * Math.PI * 2) - i * 0.35);
  const frem = Array.from({ length: 8 }, (_, i) => 36 - 14 * Math.sin(((22 + i) / 7) * Math.PI * 2) - (22 + i) * 0.35);
  const x = (i: number) => (i / 29) * 260;
  const sti = hist.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${v.toFixed(1)}`).join(" ");
  const fremSti = frem.map((v, i) => `${i ? "L" : "M"}${x(21 + i).toFixed(1)},${v.toFixed(1)}`).join(" ");
  const oevre = frem.map((v, i) => `${x(21 + i).toFixed(1)},${(v - 2 - i * 1.6).toFixed(1)}`);
  const nedre = frem.map((v, i) => `${x(21 + i).toFixed(1)},${(v + 2 + i * 1.6).toFixed(1)}`).reverse();
  return (
    <Kortramme titel="Prognose, næste uge" lys>
      <p className="text-[0.8125rem] text-white/60">Henvendelser til kundeservice</p>
      <svg viewBox="0 0 260 64" className="mt-2 h-16 w-full" aria-hidden="true">
        <polygon points={[...oevre, ...nedre].join(" ")} fill="rgba(255,154,0,0.22)" />
        <path d={sti} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <path d={fremSti} fill="none" stroke="#ff9a00" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1={x(21)} x2={x(21)} y1="2" y2="62" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 3" />
      </svg>
      <p className="mt-2 flex justify-between text-[0.75rem] tabular-nums">
        <span className="text-white/60">I dag</span>
        <span className="text-white">man. 157 ±12</span>
      </p>
    </Kortramme>
  );
}

const KORT: ((p: { aktiv: boolean }) => React.ReactElement)[] = [
  () => <KortKilder />,
  ({ aktiv }) => <KortIndeks aktiv={aktiv} />,
  ({ aktiv }) => <KortSvar aktiv={aktiv} />,
  () => <KortPrognose />,
];
