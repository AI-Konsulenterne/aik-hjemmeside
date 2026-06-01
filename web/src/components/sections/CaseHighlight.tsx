import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function CaseHighlight() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-6">
              Kundecase — Lavazza
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-heading text-gray-900 leading-none">
              HR-agent der svarer<br className="hidden sm:block" /> så medarbejderne{" "}
              <span className="text-primary">ikke skal</span>
            </h2>
            <p className="text-gray-500 text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
              Datasikker AI der frigør tid i HR-afdelingen ved at besvare
              medarbejdernes spørgsmål automatisk.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex justify-center mt-10 lg:mt-12">
            <Image
              src="/logos/lavazza.png"
              alt="Lavazza — kundecase hos AI Konsulenterne"
              width={200}
              height={60}
              className="w-auto h-9 lg:h-11 object-contain"
            />
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="max-w-3xl mx-auto mt-10 lg:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
              <div>
                <p className="text-2xl font-bold tracking-heading text-gray-900">Lavazza</p>
                <p className="text-sm text-gray-400 mt-1">HR / Intern AI</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-heading text-gray-900">Datasikker</p>
                <p className="text-sm text-gray-400 mt-1">GDPR-compliant AI-agent</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-heading text-primary">Frigjort tid</p>
                <p className="text-sm text-gray-400 mt-1">i hele HR-afdelingen</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-500 leading-relaxed text-center">
                Lavazzas HR-afdeling brugte uforholdsmæssigt mange timer på at
                besvare de samme medarbejderspørgsmål igen og igen. Vi byggede en
                datasikker AI-agent der automatisk besvarer HR-relaterede spørgsmål
                — så teamet kan fokusere på det der virkelig kræver mennesker.
              </p>
            </div>

            <div className="flex justify-center mt-10">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary transition-colors group"
              >
                Se alle kundehistorier
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
