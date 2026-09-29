"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { filmClip, filmPoster } from "@/content/film";

/**
 * Kortene på /referencer. Hvert kort er et skud fra referencefilmen:
 * posteren står, og klippet spiller, mens musen er over kortet. Klippet
 * hentes først da (preload none), så siden ikke henter ti film på én gang.
 * Ved reduceret bevægelse spiller intet; posteren står.
 */

function useKlip(skud: string) {
  const video = useRef<HTMLVideoElement>(null);
  const spil = () => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!v.src) v.src = filmClip(skud);
    void v.play().catch(() => {});
  };
  const stop = () => video.current?.pause();
  return { video, spil, stop };
}

function Klip({ skud, video, sizes, prioritet = false }: { skud: string; video: React.RefObject<HTMLVideoElement | null>; sizes: string; prioritet?: boolean }) {
  return (
    <>
      <Image
        src={filmPoster(skud)}
        alt=""
        fill
        sizes={sizes}
        priority={prioritet}
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/kort:scale-[1.04]"
      />
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover/kort:opacity-100"
      />
    </>
  );
}

export type NavngivetCase = {
  slug: string;
  kunde: string;
  kategori: string;
  titel: string;
  kort: string;
  skud: string;
};

/** De tre cases med navn: stort billede, kunde, titel og resultatet i én linje. */
export function CaseKort({ c, i }: { c: NavngivetCase; i: number }) {
  const { video, spil, stop } = useKlip(c.skud);
  return (
    <FadeIn delay={i * 110} className="h-full">
      <Link
        href={`/cases/${c.slug}`}
        onPointerEnter={spil}
        onPointerLeave={stop}
        className="group/kort flex h-full flex-col"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink">
          <Klip skud={c.skud} video={video} sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw" prioritet={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute left-6 top-6 rounded-full bg-black/60 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {c.kategori}
          </p>
          <p className="absolute bottom-6 left-6 text-[clamp(1.75rem,2.6vw,2.25rem)] font-bold leading-none tracking-display text-white">
            {c.kunde}
          </p>
        </div>
        <div className="flex flex-1 flex-col pt-6">
          <h3 className="text-xl font-bold leading-snug tracking-heading text-gray-900">{c.titel}</h3>
          <p className="mt-3 text-[1rem] leading-relaxed text-gray-600">{c.kort}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9375rem] font-semibold text-gray-900">
            <span className="understreg">Læs casen</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover/kort:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}

/** En branche uden navn: skuddet, branchen og filmens linje. */
export function BrancheKort({ skud, branche, linje, i }: { skud: string; branche: string; linje: string; i: number }) {
  const { video, spil, stop } = useKlip(skud);
  return (
    <FadeIn delay={(i % 4) * 90} className="h-full">
      <figure
        onPointerEnter={spil}
        onPointerLeave={stop}
        className="group/kort relative aspect-[4/5] h-full overflow-hidden rounded-2xl bg-ink-soft"
      >
        <Klip skud={skud} video={video} sizes="(min-width: 1024px) 19rem, 50vw" />
        {/* På telefon fylder teksten det meste af kortets nederste halvdel, så
            forløbet er mørkere dér, og etiketten står i fuld hvid. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent sm:via-black/30" />
        <figcaption className="absolute inset-x-4 bottom-4 [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] sm:inset-x-5 sm:bottom-5">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white sm:text-white/85">{branche}</p>
          <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-white sm:text-[1rem]">
            {linje.charAt(0).toUpperCase() + linje.slice(1)}
          </p>
        </figcaption>
      </figure>
    </FadeIn>
  );
}
