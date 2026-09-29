/**
 * Det lille, vi skal bruge af WebGL2 til partikelscenen: kompilér shadere
 * og et par 4x4-matricer. Uden three.js, fordi scenen kun er ét kald til
 * drawArrays, og et bibliotek på 600 kB ikke ville gøre den pænere.
 */

export function program(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const lav = (type: number, kilde: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, kilde);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error(`shader: ${log}`);
    }
    return s;
  };
  const p = gl.createProgram()!;
  gl.attachShader(p, lav(gl.VERTEX_SHADER, vert));
  gl.attachShader(p, lav(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(`link: ${gl.getProgramInfoLog(p)}`);
  return p;
}

export type Mat4 = Float32Array;

export function perspektiv(fovGrader: number, aspekt: number, naer: number, fjern: number): Mat4 {
  const f = 1 / Math.tan((fovGrader * Math.PI) / 360);
  const nf = 1 / (naer - fjern);
  const m = new Float32Array(16);
  m[0] = f / aspekt;
  m[5] = f;
  m[10] = (fjern + naer) * nf;
  m[11] = -1;
  m[14] = 2 * fjern * naer * nf;
  return m;
}

/** Kamera: flyttet tilbage langs z og drejet om x (hældning) og y. */
export function kamera(afstand: number, rotX: number, rotY: number): Mat4 {
  const cx = Math.cos(rotX), sx = Math.sin(rotX);
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  // R = Rx * Ry, derefter translation (0, 0, -afstand). Kolonne-major.
  const m = new Float32Array(16);
  m[0] = cy;
  m[1] = sx * sy;
  m[2] = -cx * sy;
  m[4] = 0;
  m[5] = cx;
  m[6] = sx;
  m[8] = sy;
  m[9] = -sx * cy;
  m[10] = cx * cy;
  m[14] = -afstand;
  m[15] = 1;
  return m;
}
