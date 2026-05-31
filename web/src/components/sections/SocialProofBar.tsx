"use client";

import Image from "next/image";

const clients = [
  { name: "Lavazza", logo: "/logos/lavazza.png", width: 140, height: 88 },
  { name: "INDKOM", logo: "/logos/indkom.png", width: 140, height: 26 },
  { name: "Wunderwear", logo: "/logos/wunderwear.svg", width: 160, height: 30 },
  { name: "Stretchfit", logo: "/logos/stretchfit.png", width: 150, height: 45 },
  { name: "J.M Band", logo: "/logos/jmband.png", width: 120, height: 59 },
];

// Duplicate for seamless infinite scroll
const marqueeItems = [...clients, ...clients];

export default function SocialProofBar() {
  return (
    <section className="border-y border-gray-100 py-8 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-4">
        <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold text-center">
          Virksomheder vi har hjulpet
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex animate-marquee">
          {marqueeItems.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex-shrink-0 mx-8 lg:mx-12 flex items-center justify-center"
              style={{ minWidth: "160px" }}
            >
              <Image
                src={c.logo}
                alt={c.name}
                width={c.width}
                height={c.height}
                className="h-8 lg:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
