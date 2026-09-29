#!/usr/bin/env node
/**
 * Tjekker artiklerne i web/content/blog, før de pushes.
 *
 *     npm run tjek-blog            (alle artikler)
 *     npm run tjek-blog -- min-slug (én artikel)
 *
 * Fejl (stopper, exit 1):
 *   - toppen mellem --- kan ikke læses, eller en værdi er ikke gyldig JSON
 *   - title, slug, excerpt eller publishedAt mangler, eller slug != filnavn
 *   - seoTitle er over 41 tegn (siden føjer " | AI Konsulenterne" til)
 *   - brødteksten har en #-overskrift (sidens H1 er title), eller bruger det
 *     rendereren ikke kan (tabeller, kodeblokke, rå HTML, --- i teksten)
 *   - et internt link peger på en side eller artikel, der ikke findes
 *   - McKinsey-tallet 20-30 %, INDKOM, Lavazza "trænet på" eller tankestreger
 *   - en artikel, som gamle adresser sender videre til (redirects i
 *     next.config.ts), mangler eller er sat til draft
 *
 * Samme læsning af toppen som src/lib/blog.ts: én linje pr. felt, "felt:
 * værdi", og værdien er JSON. Ingen pakker; kører med ren Node.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROD = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAPPE = path.join(ROD, "content", "blog");

const SIDER = new Set([
  "/", "/academy", "/workshop", "/skraeddersyede-ai", "/visionai", "/ai-strategi",
  "/ai-i-hr", "/ai-kundeservice", "/ai-analyse", "/ai-i-e-commerce", "/cases",
  "/cases/lavazza-hr-agent", "/cases/jm-band-ai-agent", "/cases/wunderwear-automation",
  "/viden-om-ai", "/om-os", "/kontakt", "/ai-guide", "/referencer",
  "/privatlivspolitik", "/cookiepolitik", "/handelsbetingelser",
]);

const FORBUDT = [
  [/McKinsey[^.\n]*20\s*[-–]\s*30|20\s*[-–]\s*30\s*%[^.\n]*McKinsey/i, "McKinsey-tallet 20-30 % (kilden kendes ikke)"],
  [/INDKOM/i, "INDKOM må ikke nævnes"],
  [/Lavazza[^.\n]*trænet på|trænet på[^.\n]*Lavazza/i, 'Lavazzas agent er ikke "trænet på" dokumenterne; den svarer ud fra dem'],
  [/[—–]/, "tankestreg (brug en bindestreg eller omskriv)"],
];

function laes(fil) {
  const navn = path.basename(fil);
  const raa = fs.readFileSync(fil, "utf8").replace(/\r\n/g, "\n");
  const m = raa.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { navn, fejl: ["toppen mangler: filen skal starte med en blok mellem to linjer med ---"] };
  const felter = {};
  const fejl = [];
  m[1].split("\n").forEach((linje, i) => {
    if (!linje.trim()) return;
    const k = linje.indexOf(":");
    if (k < 1) return fejl.push(`linje ${i + 2}: forventede "felt: værdi"`);
    const felt = linje.slice(0, k).trim();
    try {
      felter[felt] = JSON.parse(linje.slice(k + 1).trim());
    } catch {
      fejl.push(`linje ${i + 2}: værdien for "${felt}" er ikke gyldig JSON (tekst skal i "anførselstegn")`);
    }
  });
  return { navn, felter, krop: m[2], fejl };
}

// Artikler, som gamle adresser fra WordPress-sitet sender videre til.
const REDIRECTS = new Set(
  [...fs.readFileSync(path.join(ROD, "next.config.ts"), "utf8").matchAll(/destination:\s*"\/viden-om-ai\/([^"#?]+)"/g)].map((m) => m[1]),
);

const filer = fs.readdirSync(MAPPE).filter((f) => f.endsWith(".md")).sort();
const slugs = new Set(filer.map((f) => f.replace(/\.md$/, "")));
const valgt = process.argv[2];
let antalFejl = 0;
let antalAdv = 0;

for (const s of REDIRECTS) {
  if (!valgt && !slugs.has(s)) {
    console.log(`\nnext.config.ts\n  FEJL  redirect til /viden-om-ai/${s}, men artiklen findes ikke`);
    antalFejl++;
  }
}

for (const f of filer) {
  if (valgt && f !== `${valgt}.md`) continue;
  const { navn, felter = {}, krop = "", fejl } = laes(path.join(MAPPE, f));
  const adv = [];

  for (const k of ["title", "slug", "excerpt", "publishedAt"]) {
    if (typeof felter[k] !== "string" || !felter[k]) fejl.push(`mangler "${k}"`);
  }
  if (felter.slug && felter.slug !== navn.replace(/\.md$/, "")) fejl.push(`slug "${felter.slug}" skal være det samme som filnavnet`);
  if (felter.seoTitle && felter.seoTitle.length > 41) fejl.push(`seoTitle er ${felter.seoTitle.length} tegn (maks 41)`);
  if (felter.seoDescription && (felter.seoDescription.length < 110 || felter.seoDescription.length > 160)) {
    adv.push(`seoDescription er ${felter.seoDescription.length} tegn (sigt efter 140-155)`);
  }
  if (felter.publishedAt && Number.isNaN(Date.parse(felter.publishedAt))) fejl.push("publishedAt er ikke en dato");
  if (felter.draft === true && REDIRECTS.has(navn.replace(/\.md$/, ""))) {
    fejl.push("gamle adresser sender videre hertil (next.config.ts); ret redirects, før artiklen skjules");
  }

  const tekst = krop.trim();
  if (/^# /m.test(tekst)) fejl.push("#-overskrift i brødteksten (sidens H1 er title; brug ##)");
  if (/^\|.*\|\s*$/m.test(tekst)) fejl.push("tabel fundet (rendereren kan ikke vise tabeller)");
  if (/^```/m.test(tekst)) fejl.push("kodeblok fundet (brug `kode` inde i en linje)");
  if (/<\/?[a-z][^>]*>/i.test(tekst)) fejl.push("rå HTML fundet");
  if (/^---\s*$/m.test(tekst)) fejl.push("--- i brødteksten (vises ikke som streg)");

  for (const [, url] of tekst.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (!url.startsWith("/")) continue;
    const sti = url.split("#")[0].replace(/\/$/, "") || "/";
    const blog = sti.match(/^\/viden-om-ai\/(.+)$/);
    if (blog ? !slugs.has(blog[1]) : !SIDER.has(sti)) fejl.push(`internt link til en side, der ikke findes: ${url}`);
  }
  for (const [re, besked] of FORBUDT) {
    const linje = tekst.split("\n").find((l) => re.test(l)) ?? (re.test(felter.excerpt ?? "") ? felter.excerpt : null);
    if (linje) fejl.push(`${besked}: "${linje.trim().slice(0, 80)}"`);
  }
  const ord = tekst.split(/\s+/).length;
  if (ord < 500 && felter.draft !== true) adv.push(`kun ${ord} ord`);

  if (fejl.length || adv.length) {
    console.log(`\n${navn}`);
    fejl.forEach((x) => console.log(`  FEJL  ${x}`));
    adv.forEach((x) => console.log(`  obs.  ${x}`));
  }
  antalFejl += fejl.length;
  antalAdv += adv.length;
}

console.log(`\n${valgt ? "1 artikel" : `${filer.length} artikler`} tjekket: ${antalFejl} fejl, ${antalAdv} bemærkninger.`);
process.exit(antalFejl ? 1 : 0);
