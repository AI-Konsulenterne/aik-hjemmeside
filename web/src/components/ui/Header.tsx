"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LogoMorf from "@/components/ui/LogoMorf";
import { usePathname } from "next/navigation";
import Button from "./Button";

/**
 * Navigationen.
 *
 * Bygget op om de to ting AIK sælger: undervisning og udvikling. Før var
 * der otte punkter på stribe ("Hjælp til AI", "Viden om AI", "Referencer",
 * "Cases" …) og en firkantet orange knap, og ingen af dem sagde hvad
 * virksomheden laver. Nu står de to spor forrest, og resten er skåret ned
 * til det en køber leder efter. Alt der røg ud, ligger stadig i footeren.
 *
 * Den følger fladen den ligger på. Over den mørke hero er den
 * gennemsigtig med hvidt logo, det primære logo ifølge designsystemet. Over
 * de andre mørke sektioner (markeret med data-header="moerk") er den mørk,
 * og over lyse flader er den hvid. Før var den hvid og 92 % dækkende
 * overalt, og over sort blev den en grå, mudret bjælke, hvor sektionens
 * orange knap skinnede sløret igennem.
 *
 * Knappen i navigationen er bevidst rolig (hvid eller sort): det orange
 * hører til sektionernes egne handlinger, så der kun er én orange knap i
 * synsfeltet ad gangen. Telefonnummeret står ved siden af på store skærme,
 * fordi den faste bjælke i bunden kun er på telefoner.
 */

type MenuPunkt = { label: string; href: string; tekst: string };

const menuer: { label: string; punkter: MenuPunkt[] }[] = [
  {
    label: "Undervisning",
    punkter: [
      {
        label: "AI-Minds læringsplatform",
        href: "/academy",
        tekst: "40+ korte moduler i Copilot, Claude og AI-sikkerhed. På dansk, til hele organisationen",
      },
      { label: "Workshop hos jer", href: "/workshop", tekst: "En dag, hvor jeres egne opgaver er materialet" },
    ],
  },
  {
    label: "Udvikling",
    punkter: [
      { label: "Skræddersyet AI", href: "/skraeddersyede-ai", tekst: "Agenter og automatisering på jeres data og systemer" },
      { label: "AIK Workspace", href: "/visionai", tekst: "Ét AI-system til hele virksomheden" },
    ],
  },
];

const links = [
  { label: "Cases", href: "/cases" },
  { label: "Viden", href: "/viden-om-ai" },
  { label: "Om os", href: "/om-os" },
];

/** Sider hvor heroen er mørk og fylder hele skærmen, så navigationen kan
 *  ligge gennemsigtigt ovenpå den. */
const MOERK_HERO = new Set([
  "/",
  "/academy",
  "/workshop",
  "/skraeddersyede-ai",
  "/ai-i-hr",
  "/ai-kundeservice",
  "/ai-analyse",
  "/ai-i-e-commerce",
  "/ai-strategi",
  "/visionai",
  "/om-os",
  "/kontakt",
  "/ai-guide",
  "/cases",
  "/viden-om-ai",
  "/referencer",
]);

/** Undersider med en mørk hero ud over dem i listen: hver case. */
const MOERK_HERO_UNDER = ["/cases/"];

function harMoerkHero(sti: string) {
  return MOERK_HERO.has(sti) || MOERK_HERO_UNDER.some((p) => sti.startsWith(p));
}

/** Ligger punktet y (fra toppen af vinduet) over en mørk sektion? */
function moerkVed(y: number) {
  for (const el of document.querySelectorAll<HTMLElement>('[data-header="moerk"]')) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) return true;
  }
  return false;
}

const TELEFON_IKON =
  "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z";

export default function Header() {
  const sti = usePathname();
  const [scrollet, setScrollet] = useState(false);
  /* Før første måling gættes der ud fra siden, så forsiden bliver
     server-renderet med den gennemsigtige navigation og ikke blinker. */
  const [moerkUnder, setMoerkUnder] = useState(() => harMoerkHero(sti));
  const [mobilAaben, setMobilAaben] = useState(false);
  const [aaben, setAaben] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Måler én gang pr. frame mens der scrolles: hvor langt nede er vi, og
     hvilken flade ligger under navigationens midte. Måles igen når man
     skifter side, fordi sektionerne så er nogle andre. */
  useEffect(() => {
    let raf = 0;
    const maal = () => {
      raf = 0;
      const midt = (headerRef.current?.offsetHeight ?? 64) / 2;
      setScrollet(window.scrollY > 24);
      setMoerkUnder(moerkVed(midt));
    };
    const planlaeg = () => {
      if (!raf) raf = requestAnimationFrame(maal);
    };
    planlaeg();
    window.addEventListener("scroll", planlaeg, { passive: true });
    window.addEventListener("resize", planlaeg);
    /* Sidens indhold streames ind bag loading.tsx og vises først lidt
       efter, at navigationen er klar. Måltes der kun ved scroll og resize,
       fandt første måling ingen mørk hero (den havde ingen højde endnu), og
       forsidens navigation blev hvid over filmen, til man scrollede. Nu
       måles der igen, hver gang sidens størrelse ændrer sig. */
    const ro = new ResizeObserver(planlaeg);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", planlaeg);
      window.removeEventListener("resize", planlaeg);
    };
  }, [sti]);

  /* Luk dropdown ved klik udenfor og ved Escape. */
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAaben(null);
    };
    const tast = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAaben(null);
        setMobilAaben(false);
      }
    };
    document.addEventListener("mousedown", klik);
    document.addEventListener("keydown", tast);
    return () => {
      document.removeEventListener("mousedown", klik);
      document.removeEventListener("keydown", tast);
    };
  }, []);

  /* Lås baggrunden mens mobilmenuen er åben. */
  useEffect(() => {
    document.documentElement.style.overflow = mobilAaben ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobilAaben]);

  /* Mobilmenuen er hvid, så når den er åben, er navigationen det også. */
  const paaMoerk = moerkUnder && !mobilAaben;
  const gennemsigtig = paaMoerk && !scrollet && harMoerkHero(sti);

  const linkFarve = paaMoerk
    ? "text-white/75 hover:text-white"
    : "text-gray-600 hover:text-gray-900";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        gennemsigtig
          ? "border-transparent bg-transparent"
          : paaMoerk
            ? "border-white/[0.08] bg-ink/80 backdrop-blur-md backdrop-saturate-150"
            : "border-black/[0.06] bg-white/[0.92] backdrop-blur-md backdrop-saturate-150"
      }`}
    >
      <div
        ref={navRef}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8"
      >
        {/* Det lange logo øverst på siden; det folder sig sammen til AIK,
            når man scroller. Farven følger fladen under navigationen. */}
        <Link href="/" className="relative flex items-center" aria-label="AI Konsulenterne, forside">
          <LogoMorf
            kompakt={scrollet || mobilAaben}
            className={`text-[1.75rem] transition-colors duration-300 lg:text-[2rem] ${paaMoerk ? "text-white" : "text-primary"}`}
          />
        </Link>

        {/* --- Desktop --- */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hovedmenu">
          {menuer.map((m) => {
            const erAaben = aaben === m.label;
            return (
              <div key={m.label} className="relative">
                <button
                  type="button"
                  onClick={() => setAaben(erAaben ? null : m.label)}
                  aria-expanded={erAaben}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${linkFarve}`}
                >
                  {m.label}
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${erAaben ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {erAaben && (
                  <div
                    className="animate-popup-in absolute left-1/2 top-full mt-3 w-[22rem] -translate-x-1/2 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]"
                    role="menu"
                  >
                    {m.punkter.map((pkt) => (
                      <Link
                        key={pkt.href}
                        href={pkt.href}
                        role="menuitem"
                        onClick={() => setAaben(null)}
                        className="group block rounded-xl px-4 py-3.5 transition-colors hover:bg-gray-50"
                      >
                        <span className="flex items-center justify-between text-[0.9375rem] font-semibold text-gray-900">
                          {pkt.label}
                          <span
                            aria-hidden="true"
                            className="text-gray-400 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-1 block text-[0.8125rem] leading-snug text-gray-600">
                          {pkt.tekst}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${linkFarve}`}
            >
              {l.label}
            </Link>
          ))}

          <span
            aria-hidden="true"
            className={`mx-2 hidden h-5 w-px xl:block ${paaMoerk ? "bg-white/20" : "bg-black/10"}`}
          />
          <a
            href="tel:+4525547074"
            className={`hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors xl:flex ${linkFarve}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={TELEFON_IKON} />
            </svg>
            +45 25 54 70 74
          </a>

          <Button href="/kontakt" size="sm" variant={paaMoerk ? "white" : "dark"} className="ml-3 xl:ml-1">
            Book en samtale
          </Button>
        </nav>

        {/* --- Mobil --- */}
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          onClick={() => setMobilAaben(!mobilAaben)}
          aria-label={mobilAaben ? "Luk menu" : "Åbn menu"}
          aria-expanded={mobilAaben}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[1.5px] w-6 transition-all duration-200 ${paaMoerk ? "bg-white" : "bg-gray-900"} ${
                mobilAaben && i === 0 ? "translate-y-[6.5px] rotate-45" : ""
              } ${mobilAaben && i === 1 ? "opacity-0" : ""} ${
                mobilAaben && i === 2 ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          ))}
        </button>
      </div>

      {mobilAaben && (
        <div className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-black/[0.06] bg-white lg:hidden">
          <nav className="flex flex-col px-6 pb-10 pt-6" aria-label="Mobilmenu">
            {menuer.map((m) => (
              <div key={m.label} className="border-b border-black/[0.06] py-5">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  {m.label}
                </p>
                {m.punkter.map((pkt) => (
                  <Link
                    key={pkt.href}
                    href={pkt.href}
                    onClick={() => setMobilAaben(false)}
                    className="mt-3 block"
                  >
                    <span className="block text-lg font-semibold text-gray-900">{pkt.label}</span>
                    <span className="block text-sm text-gray-600">{pkt.tekst}</span>
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobilAaben(false)}
                  className="py-2.5 text-lg font-semibold text-gray-900"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Button href="/kontakt" size="lg" className="mt-4 w-full">
              Book en samtale
            </Button>
            <a
              href="tel:+4525547074"
              className="mt-4 text-center text-sm font-semibold text-gray-600"
            >
              Eller ring til Alexander på +45 25 54 70 74
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
