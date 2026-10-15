import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

// Trinene lyser op på skift (1 → 2 → 3) i et 9-sekunders loop; de negative
// forsinkelser forskyder hvert trin med 3 sekunder (se .aik-step i globals.css).
const steps = [
  { text: "I tager en opgave med fra hverdagen", delay: "0s" },
  { text: "Vi løser den med AI sammen", delay: "-6s" },
  { text: "I går hjem og bruger det i morgen", delay: "-3s" },
];

export default function HowWeWork() {
  return (
    <section className="bg-white py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(48px,7vw,112px)] items-center">
          {/* Venstre: tekst */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Sådan arbejder vi
              </p>
              <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.06] tracking-heading text-gray-900 text-balance">
                Medarbejderne prøver AI på deres egne opgaver
              </h2>
              <p className="text-lead text-gray-700 max-w-[560px] text-pretty">
                Ingen <span className="aik-strike">slides om AI&apos;s potentiale</span>.
                Vi sidder med jeres medarbejdere, tager de opgaver, de har i dag,
                og løser dem med AI sammen med dem.
              </p>
            </div>
          </FadeIn>

          {/* Højre: workshopfoto med trin-kort */}
          <FadeIn delay={200}>
            <figure className="relative mx-auto w-full max-w-[560px] pb-8">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/workshop-1.jpg"
                  alt="Workshop hos en kunde, hvor medarbejderne arbejder med AI på en storskærm"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover object-[50%_55%]"
                />
              </div>

              <div className="absolute bottom-16 left-2 min-[480px]:left-[clamp(-40px,-3vw,-12px)] box-border w-[min(300px,80%)] flex flex-col gap-2 rounded-[16px] border border-gray-200 bg-white p-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.10)]">
                <p className="px-1 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
                  På workshoppen
                </p>
                <ol className="flex flex-col gap-2">
                  {steps.map((step, i) => (
                    <li
                      key={step.text}
                      className="aik-step flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5"
                      style={{ animationDelay: step.delay }}
                    >
                      <span
                        aria-hidden="true"
                        className="aik-step-num flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500"
                        style={{ animationDelay: step.delay }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold leading-[1.35] text-gray-900">
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <figcaption className="mt-4 text-sm text-gray-500">
                Fra en af vores workshops.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
