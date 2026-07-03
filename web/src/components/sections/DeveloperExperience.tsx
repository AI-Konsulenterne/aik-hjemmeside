import Image from "next/image";

const companies = [
  { name: "Apple", logo: "/logos/apple.svg", width: 814, height: 1000, cls: "h-7 lg:h-8" },
  { name: "TDC Net", logo: "/logos/tdc-net.svg", width: 704, height: 203, cls: "h-6 lg:h-7" },
  { name: "Semler Mobility", logo: "/logos/semler-mobility.svg", width: 709, height: 325, cls: "h-10 lg:h-11" },
  { name: "Arla", logo: "/logos/arla.svg", width: 150, height: 100, cls: "h-10 lg:h-11" },
  { name: "Damstahl", logo: "/logos/damstahl.svg", width: 172, height: 40, cls: "h-6 lg:h-7" },
];

/** Diskret tillids-strip: hvor AIK's udviklere har erfaring fra. Ensfarvet grå, så den ikke konkurrerer med kundelogoerne. */
export default function DeveloperExperience() {
  return (
    <section className="py-10 lg:py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold text-center mb-7">
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
