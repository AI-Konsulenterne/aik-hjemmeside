import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function HowWeWork() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-10 items-center">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              Sådan arbejder vi
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1] text-balance">
              Medarbejderne prøver AI på deres egne opgaver
            </h2>
            <p className="text-lead text-gray-700 mt-5 max-w-xl">
              Ingen slides om AI&apos;s potentiale. Vi sidder med jeres
              medarbejdere, tager de opgaver, de har i dag, og løser dem med AI
              sammen med dem.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <figure className="max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-gray-100">
                <Image
                  src="/workshop-1.jpg"
                  alt="Workshop, hvor medarbejdere gennemgår en AI-løsning på storskærm"
                  fill
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-cover object-[50%_55%]"
                />
              </div>
              <figcaption className="text-sm text-gray-500 mt-3">
                Fra en af vores workshops.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
