import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

// Kundelogoer vist i gråtoner på hvid. Logoerne er lavet til det orange bånd:
// de hvide gøres mørke ("mono"), de farvede med egen baggrund vises i gråtoner.
const clients = [
  { name: "Lavazza", logo: "/logos/lavazza.png", width: 3840, height: 2400, cls: "h-9 lg:h-11", tone: "mono" },
  { name: "INDKOM", logo: "/logos/indkom.png", width: 400, height: 74, cls: "h-5 lg:h-6", tone: "mono" },
  { name: "Wunderwear", logo: "/logos/wunderwear.svg", width: 498, height: 47, cls: "h-3 lg:h-[15px]", tone: "mono" },
  { name: "Turbinehallen", logo: "/logos/turbinehallen.png", width: 264, height: 242, cls: "h-11 lg:h-12", tone: "mono" },
  { name: "MALT Fest & Event", logo: "/logos/malt.png", width: 357, height: 199, cls: "h-8 lg:h-10", tone: "mono" },
  { name: "Stretchfit", logo: "/logos/stretchfit.png", width: 600, height: 180, cls: "h-6 lg:h-7", tone: "mono" },
  { name: "J.M Band", logo: "/logos/jmband.png", width: 494, height: 242, cls: "h-7 lg:h-8", tone: "gray" },
  { name: "Fregat", logo: "/logos/fregat.png", width: 400, height: 112, cls: "h-6 lg:h-7", tone: "gray" },
  { name: "Retail Partner", logo: "/logos/retail-partner.png", width: 324, height: 46, cls: "h-4 lg:h-5", tone: "mono" },
] as const;

export default function Hero() {
  return (
    <section className="pt-[clamp(3.5rem,9vw,7rem)] pb-[clamp(3.5rem,8vw,6rem)] relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-x-16 gap-y-12 lg:gap-y-16 items-center">
          {/* Venstre: tekst */}
          <div>
            <FadeIn>
              <h1 className="text-[2.125rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.625rem] font-bold tracking-heading text-gray-900 leading-[1.08] text-balance">
                Vi bygger AI ind i danske virksomheder -{" "}
                <span className="text-primary">
                  også jer, der ikke ved, hvor I skal starte.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-lead text-gray-700 mt-6 lg:mt-7 max-w-xl">
                AI-værktøjerne ændrer sig hver måned. Vi finder de opgaver, hvor
                AI sparer jeres medarbejdere tid, og bygger løsningen - uden at I
                skal have en IT-afdeling.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-wrap items-center gap-3 mt-8 lg:mt-9">
                <Button variant="primary" size="lg" href="/kontakt" cal>
                  Book en gratis AI-afklaring
                </Button>
                <Button variant="secondary" size="lg" href="/ai-guide">
                  Få en gratis AI-analyse
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Højre: Alexanders portræt */}
          <FadeIn delay={200} className="order-3 lg:order-none">
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                <Image
                  src="/team/alexander-hero.png"
                  alt="Alexander, AI-konsulent hos AI Konsulenterne"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 384px"
                  className="object-cover"
                />
              </div>

              {/* Kaffe-kort */}
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-xl shadow-lg p-4 lg:p-5 max-w-[260px] ring-1 ring-gray-100">
                <p className="text-sm lg:text-[0.95rem] text-gray-900 font-semibold leading-snug">
                  ☕ Klar til en kop kaffe
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" aria-hidden="true" />
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">Alexander</span> - AI-Konsulent
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Kundelogoer: efter knapperne på mobil, fuld bredde under hero på desktop */}
          <FadeIn delay={400} className="order-2 lg:order-none lg:col-span-2">
            <div className="flex flex-col gap-5 lg:pt-10 lg:border-t lg:border-gray-100">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-semibold">
                Virksomheder vi har hjulpet
              </p>
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-5 xl:justify-between xl:gap-x-6">
                {clients.map((c) => (
                  <li key={c.name} className="flex items-center">
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={c.width}
                      height={c.height}
                      sizes="160px"
                      className={`${c.cls} w-auto max-w-[170px] object-contain ${
                        c.tone === "mono" ? "brightness-0 opacity-55" : "grayscale opacity-70"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
