"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Klik-for-afspil YouTube-facade (GDPR-venlig to-klik-løsning).
 * Ingen requests til YouTube før brugeren aktivt trykker play -
 * thumbnail serveres lokalt fra /public.
 */
export default function LessonVideo({
  videoId,
  title,
  thumbnailSrc,
}: {
  videoId: string;
  title: string;
  thumbnailSrc: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video rounded-[24px] overflow-hidden bg-gray-900 shadow-[0_34px_64px_-26px_rgba(0,0,0,.45)] ring-1 ring-gray-200">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-cookieconsent="ignore"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Afspil video: ${title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            <Image
              src={thumbnailSrc}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span
              className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(255,154,0,.65)] transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="w-8 h-8 lg:w-9 lg:h-9 translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5.5v13l11-6.5-11-6.5z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="text-[13px] text-gray-400 mt-3 text-center">
        Videoen afspilles via YouTube, når du trykker play.
      </p>
    </div>
  );
}
