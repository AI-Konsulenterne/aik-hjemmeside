import Image from "next/image";

/**
 * Hvor AIK's udviklere har erfaring fra. Bruges her som diskret strimmel
 * (/skraeddersyede-ai) og stort på /om-os (ErfaringFra.tsx). `cls` er
 * højden i strimlen, `stor` i den store væg; højderne er sat pr. logo, så
 * de fylder lige meget for øjet.
 */
export const ERFARING = [
  { name: "Apple", logo: "/logos/apple.svg", width: 814, height: 1000, cls: "h-7 lg:h-8", stor: "h-10 sm:h-12 lg:h-[4.25rem]" },
  { name: "TDC Net", logo: "/logos/tdc-net.svg", width: 704, height: 203, cls: "h-6 lg:h-7", stor: "h-7 sm:h-9 lg:h-12" },
  { name: "Semler Mobility", logo: "/logos/semler-mobility.svg", width: 709, height: 325, cls: "h-10 lg:h-11", stor: "h-10 sm:h-12 lg:h-16" },
  { name: "Arla", logo: "/logos/arla.svg", width: 150, height: 100, cls: "h-10 lg:h-11", stor: "h-11 sm:h-14 lg:h-[4.5rem]" },
  { name: "Damstahl", logo: "/logos/damstahl.svg", width: 172, height: 40, cls: "h-6 lg:h-7", stor: "h-6 sm:h-8 lg:h-11" },
];

const companies = ERFARING;

/** Diskret tillids-strip: hvor AIK's udviklere har erfaring fra. Ensfarvet grå, så den ikke konkurrerer med kundelogoerne. */
export default function DeveloperExperience() {
  return (
    <section className="py-10 lg:py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold text-center mb-7">
          Vores udviklere har erfaring fra
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-16">
          {companies.map((c) => (
            <Image
              key={c.name}
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              className={`${c.cls} w-auto object-contain grayscale opacity-60`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
