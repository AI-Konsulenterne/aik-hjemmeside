"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Kortet fra Alexander.
 *
 * Her lå en modal i fuld størrelse. Den kom ved halvvejs scroll eller efter
 * 45 sekunder, lagde et mørkt slør over siden og afbrød læseren midt i
 * Lavazza-casen. Det var det eneste på forsiden, der stadig føltes som en
 * lille-virksomheds-side, og det er det sidste en it-chef vil møde.
 *
 * Nu er det et lille kort nederst til venstre på store skærme. Siden kan
 * læses videre ved siden af det, og det lukkes med ét klik eller Escape.
 * Det kommer én gang pr. session, ved samme tidspunkt som før, og trækker
 * sig mens "Tal med Alexander" er i billedet, så han ikke står der to gange.
 *
 * På telefoner vises det ikke. Der har bundbjælken allerede "Ring til
 * Alexander", og et kort ville dække halvdelen af skærmen.
 *
 * Nøglen i sessionStorage er den samme som popup'ens, så den der har lukket
 * popup'en i denne session, heller ikke får kortet.
 *
 * På /kontakt vises det aldrig: der står Alexander, telefonen og mailen
 * allerede øverst på siden, og kortet ville bare gentage den.
 */

const NOEGLE = "aik-popup-dismissed";

export default function PopupPhone() {
  const [klar, setKlar] = useState(false);
  const [lukket, setLukket] = useState(false);
  const [alexanderISyne, setAlexanderISyne] = useState(false);
  const sti = usePathname();

  /* Samme udløser som popup'en: mere end halvdelen af siden læst, eller
     45 sekunder på siden. Alt sker i callbacks, ikke direkte i effekten. */
  useEffect(() => {
    let afvist = false;
    try {
      afvist = !!sessionStorage.getItem(NOEGLE);
    } catch {}
    if (afvist) return;

    let timer = 0;
    const vis = () => {
      setKlar(true);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
    function onScroll() {
      const ialt = document.documentElement.scrollHeight - window.innerHeight;
      if (ialt > 0 && window.scrollY / ialt > 0.5) vis();
    }
    timer = window.setTimeout(vis, 45000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Træk kortet væk mens sektionen med Alexander er synlig. */
  useEffect(() => {
    if (!klar) return;
    const sektion = document.querySelector("[data-alexander]");
    if (!sektion) return;
    const io = new IntersectionObserver(([e]) => setAlexanderISyne(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(sektion);
    return () => io.disconnect();
  }, [klar]);

  function luk() {
    try {
      sessionStorage.setItem(NOEGLE, "true");
    } catch {}
    setLukket(true);
  }

  const synlig = klar && !lukket && !alexanderISyne;

  if (!klar || lukket || sti === "/kontakt") return null;

  return (
    <aside
      aria-label="Kontakt Alexander"
      aria-hidden={!synlig}
      onKeyDown={(e) => {
        if (e.key === "Escape") luk();
      }}
      className={`fixed bottom-8 left-8 z-40 hidden w-[22rem] rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.35)] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none lg:block ${
        synlig ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={luk}
        aria-label="Luk"
        tabIndex={synlig ? 0 : -1}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-center gap-3.5 pr-8">
        <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-gray-100">
          <Image
            src="/team/alexander-hero.png"
            alt=""
            fill
            sizes="48px"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <div>
          <p className="text-[0.9375rem] font-semibold leading-tight text-gray-900">Alexander</p>
          <p className="mt-0.5 text-[0.8125rem] leading-tight text-gray-600">AI-konsulent, AI Konsulenterne</p>
        </div>
      </div>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-gray-700">
        Har I en opgave, I tror AI kan tage? Ring direkte, så finder vi ud af
        det sammen. Det er ikke et salgsopkald.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <a
          href="tel:+4525547074"
          tabIndex={synlig ? 0 : -1}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.9} viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          +45 25 54 70 74
        </a>
        <Link
          href="/kontakt"
          tabIndex={synlig ? 0 : -1}
          className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900"
        >
          Book en samtale
        </Link>
      </div>
    </aside>
  );
}
