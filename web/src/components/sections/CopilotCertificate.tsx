import Image from "next/image";
import { Lora } from "next/font/google";
import FadeIn from "@/components/ui/FadeIn";

const serif = Lora({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

const navy = "#1b2a47";
const gold = "#c98a3d";

/** Eksempel på det certifikat, medarbejderne får efter AI-Minds' Copilot-forløb. */
export default function CopilotCertificate() {
  return (
    <section className="bg-sand py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <FadeIn>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-primary">
              Certifikat
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.08] mt-4 text-balance">
              Medarbejderne får et Copilot-certifikat
            </h2>
            <p className="text-body text-gray-700 mt-5 max-w-md">
              Når forløbet er gennemført, og den afsluttende prøve er bestået,
              får medarbejderen et personligt certifikat. Det dokumenterer, at
              de kan bruge Copilot i det daglige arbejde.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <figure>
              <div
                className="relative rounded-[20px] bg-[#f2f0eb] p-3 sm:p-5 shadow-[0_30px_60px_-34px_rgba(0,0,0,.35)] ring-1 ring-black/5"
                aria-label="Eksempel på et Copilot-certifikat fra AI-Minds"
                role="img"
              >
                <div
                  className="relative aspect-[1.414/1] flex flex-col items-center text-center border px-[6%] pt-[6%] pb-[5%] overflow-hidden"
                  style={{ borderColor: gold, color: navy, containerType: "inline-size" }}
                >
                  {/* Dekorative buer nederst til venstre */}
                  <div
                    className="pointer-events-none absolute -left-[22%] -bottom-[48%] w-[50%] aspect-square rounded-full border border-black/[0.07]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -left-[16%] -bottom-[38%] w-[36%] aspect-square rounded-full border border-black/[0.07]"
                    aria-hidden="true"
                  />

                  <p className="font-bold tracking-[0.3em] text-[2.2cqw]">AI-MINDS</p>
                  <p className="font-bold tracking-[0.3em] text-[2.2cqw] mt-[6%]" style={{ color: gold }}>
                    CERTIFIKAT
                  </p>
                  <p className={`${serif.className} font-semibold leading-none text-[7.4cqw] mt-[2.5%]`}>
                    Copilot-certificeret
                  </p>
                  <div className="w-[8%] h-px mt-[4%]" style={{ background: gold }} />
                  <p className="text-[2cqw] text-[#5b6b85] mt-[3.5%]">Tildeles</p>
                  <p className={`${serif.className} font-medium leading-none text-[4.6cqw] mt-[1.5%] opacity-60`}>
                    Medarbejderens navn
                  </p>
                  <p className="text-[1.95cqw] leading-[1.5] mt-[3.5%] max-w-[86%] font-medium">
                    har bestået den afsluttende prøve i AI-Minds&apos; Copilot-forløb med
                    dokumenterede færdigheder i prompting, Copilot i Word, Outlook,
                    PowerPoint og Excel samt udvikling af Copilot-agenter.
                  </p>

                  <div className="mt-auto w-full flex items-end justify-between text-left">
                    <div className="flex gap-[6cqw] pl-[3%]">
                      <div>
                        <p className="font-bold tracking-[0.25em] text-[1.3cqw]" style={{ color: gold }}>UDSTEDT</p>
                        <p className="text-[1.75cqw] text-[#5b6b85] mt-[0.6cqw]">13. september 2026</p>
                      </div>
                      <div>
                        <p className="font-bold tracking-[0.25em] text-[1.3cqw]" style={{ color: gold }}>GYLDIGT TIL</p>
                        <p className="text-[1.75cqw] text-[#5b6b85] mt-[0.6cqw]">13. september 2027</p>
                      </div>
                    </div>
                    <div className="w-[26%] pr-[2%]">
                      <Image
                        src="/certifikat-underskrift.png"
                        alt=""
                        width={290}
                        height={56}
                        className="w-[72%] h-auto ml-[2%]"
                      />
                      <div className="h-px w-full" style={{ background: navy, opacity: 0.6 }} />
                      <p className="text-[1.75cqw] mt-[0.8cqw]">Martin Tvedesøe</p>
                      <p className="text-[1.3cqw] text-[#5b6b85] mt-[0.2cqw]">AI Konsulenterne · Aarhus</p>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="text-sm text-gray-500 mt-3">
                Eksempel på certifikatet.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
