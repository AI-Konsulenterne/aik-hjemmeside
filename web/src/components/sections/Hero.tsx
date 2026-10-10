import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroPainCard from "@/components/sections/HeroPainCard";

// Kundelogoer vist i gråtoner på hvid. Logoerne er lavet til det orange bånd:
// de hvide gøres mørke ("mono"), de farvede med egen baggrund vises i gråtoner.
const clients = [
  { name: "Lavazza", logo: "/logos/lavazza.png", width: 3840, height: 2400, cls: "h-10 lg:h-12", tone: "mono" },
  { name: "INDKOM", logo: "/logos/indkom.png", width: 400, height: 74, cls: "h-5 lg:h-7", tone: "mono" },
  { name: "Wunderwear", logo: "/logos/wunderwear.svg", width: 498, height: 47, cls: "h-3.5 lg:h-[17px]", tone: "mono" },
  { name: "Turbinehallen", logo: "/logos/turbinehallen.png", width: 264, height: 242, cls: "h-11 lg:h-14", tone: "mono" },
  { name: "MALT Fest & Event", logo: "/logos/malt.png", width: 357, height: 199, cls: "h-9 lg:h-11", tone: "mono" },
  { name: "Stretchfit", logo: "/logos/stretchfit.png", width: 600, height: 180, cls: "h-7 lg:h-8", tone: "mono" },
  { name: "J.M Band", logo: "/logos/jmband.png", width: 494, height: 242, cls: "h-8 lg:h-9", tone: "gray" },
  { name: "Fregat", logo: "/logos/fregat.png", width: 400, height: 112, cls: "h-7 lg:h-8", tone: "gray" },
  { name: "Retail Partner", logo: "/logos/retail-partner.png", width: 324, height: 46, cls: "h-4 lg:h-6", tone: "mono" },
] as const;

const promises = ["30 minutter", "Ingen forpligtelse", "I skal ikke forberede noget"];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LogoStrip({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex items-center gap-[clamp(48px,5vw,72px)] pr-[clamp(48px,5vw,72px)] shrink-0" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className="flex items-center shrink-0">
          <Image
            src={c.logo}
            alt={hidden ? "" : c.name}
            width={c.width}
            height={c.height}
            sizes="180px"
            className={`${c.cls} w-auto max-w-[180px] object-contain ${
              c.tone === "mono" ? "brightness-0 opacity-60" : "grayscale opacity-75"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}

// Hero med rolig indgangsanimation (ren CSS, så teksten ikke venter på JavaScript),
// roterende "hvor trykker skoen"-kort, kaffe-kort og uendelig logo-marquee.
export default function Hero() {
  const rise = (delay: number, distance = 12) => ({
    animationDelay: `${60 + delay}ms`,
    ["--aik-rise" as string]: `${distance}px`,
  });

  return (
    <section className="relative overflow-hidden bg-white pt-[clamp(4rem,11vw,8rem)] px-6">
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col gap-[clamp(56px,8vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(48px,6vw,96px)] items-center">
          {/* Venstre: tekst og knapper */}
          <div className="flex flex-col gap-8">
            <h1 className="font-bold text-gray-900 text-[clamp(2.75rem,6.2vw,5.25rem)] leading-[1.02] tracking-[-0.025em] text-balance">
              <span className="block aik-rise" style={rise(0)}>
                Vi bygger AI ind i danske virksomheder -
              </span>
              <span className="block aik-rise text-primary italic text-[0.78em] leading-[1.1] mt-[0.15em]" style={rise(150)}>
                også jer, der ikke ved, hvor I skal starte.
              </span>
            </h1>
            <p className="aik-rise text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.65] text-gray-700 max-w-[600px]" style={rise(300)}>
              Det kan være udfordrende at vide, hvilke opgaver AI kan bidrage
              til. Vi finder ud af i fællesskab med jer, hvor skoen trykker, og
              bygger AI-løsningen, der skaber værdi for jeres forretning.
            </p>
            <div className="aik-rise flex flex-col gap-[18px]" style={rise(450)}>
              <div className="flex flex-wrap gap-3.5">
                <Button variant="primary" size="lg" href="/kontakt" cal className="gap-2">
                  Book en gratis AI-afklaring
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="secondary" size="lg" href="/ai-guide">
                  Få en gratis AI-analyse
                </Button>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 pl-1 text-sm text-gray-600">
                {promises.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Højre: foto og flydende kort */}
          <div className="aik-rise relative justify-self-center w-full max-w-[520px] pt-7 pb-10" style={{ ...rise(200, 20), animationDuration: "900ms" }}>
            <div className="relative aspect-[552/585] rounded-[28px] overflow-hidden bg-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/team/alexander-hero.png"
                alt="Alexander, AI-konsulent hos AI Konsulenterne"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>

            {/* Kort A: hvor trykker skoen (over skulderen, ikke over ansigtet) */}
            <HeroPainCard className="hidden sm:flex absolute bottom-[120px] right-3 xl:-right-8 w-[min(260px,62%)] box-border" />

            {/* Kort B: klar til en kop kaffe */}
            <div className="absolute bottom-0 left-3 xl:-left-7 bg-white border border-gray-200 rounded-2xl px-[22px] py-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.10)] flex flex-col gap-3.5">
              <p className="flex items-center gap-2.5 text-[17px] font-semibold text-gray-900">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                  <path d="M10 2v2" />
                  <path d="M14 2v2" />
                  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                  <path d="M6 2v2" />
                </svg>
                Klar til en kop kaffe
              </p>
              <p className="flex items-center gap-2 border-t border-gray-200 pt-3 text-sm text-gray-500">
                <span className="aik-pulse inline-block w-[9px] h-[9px] rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-gray-900">Alexander</span> - AI-Konsulent
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Logo-bar: uendelig marquee med fadede kanter */}
        <div className="border-t border-gray-200 pt-10 pb-[clamp(3rem,6vw,5rem)] flex flex-col gap-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-600">
            Virksomheder vi har hjulpet
          </p>
          <div className="aik-marquee-mask overflow-hidden">
            <div className="aik-marquee-track">
              <LogoStrip />
              <LogoStrip hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
