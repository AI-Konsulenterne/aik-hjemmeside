"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { filmClip, filmPoster } from "@/content/film";

/**
 * Store kort med et skud fra referencefilmen. Klippet spiller, mens musen
 * er over kortet (hentes først da), ellers står posteren. Bruges til
 * formaterne på AI-Minds og workshop-siden: de samme tre skud som filmens
 * anden akt, "ude hos jer", "live på skærmen", "eller når det passer jer".
 */

export type FilmKortData = {
  skud: string;
  etiket: string;
  titel: string;
  tekst: string;
  link?: { label: string; href: string };
};

function Kort({ k, i }: { k: FilmKortData; i: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const spil = () => {
    const v = video.current;
    if (!v) return;
    if (!v.src) v.src = filmClip(k.skud);
    void v.play().catch(() => {});
  };
  const stop = () => video.current?.pause();
  return (
    <FadeIn delay={i * 110} className="h-full">
      <article
        onPointerEnter={spil}
        onPointerLeave={stop}
        className="group/kort flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.05]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <Image
            src={filmPoster(k.skud)}
            alt=""
            fill
            sizes="(min-width: 1024px) 26rem, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/kort:scale-[1.04]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/85">
            {k.etiket}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-7 lg:p-8">
          <h3 className="text-xl font-bold leading-snug tracking-heading text-gray-900">{k.titel}</h3>
          <p className="mt-3 text-[0.975rem] leading-relaxed text-gray-600">{k.tekst}</p>
          {k.link && (
            <Link href={k.link.href} className="group/l mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-gray-900">
              <span className="understreg">{k.link.label}</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover/l:translate-x-0.5">
                →
              </span>
            </Link>
          )}
        </div>
      </article>
    </FadeIn>
  );
}

export default function FilmKort({ kort }: { kort: FilmKortData[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
      {kort.map((k, i) => (
        <Kort key={k.skud} k={k} i={i} />
      ))}
    </div>
  );
}
