import Link from "next/link";
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
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              HR-agent der svarer<br className="hidden sm:block" /> så medarbejderne{" "}
              <span className="text-primary">ikke skal</span>
            </h2>
            <p className="text-gray-500 text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
              Datasikker AI der frigør tid i HR-afdelingen ved at besvare
              medarbejdernes spørgsmål automatisk.
            </p>
          </div>
        </FadeIn>

        {/* Illustration — AI HR-agent chat */}
        <FadeIn delay={150}>
          <div className="max-w-md mx-auto mt-10 lg:mt-12">
            <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-lg p-5">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-heading text-gray-900">
                    AI HR-agent
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    Online · svarer med det samme
                  </p>
                </div>
              </div>

              {/* Beskeder */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-end">
                  <p className="bg-gray-100 text-gray-700 text-sm rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[82%] leading-snug">
                    Hvor mange feriedage har jeg tilbage i år?
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="bg-primary/10 text-gray-800 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[88%] leading-snug">
                    Du har 12 feriedage tilbage. Ifølge personalehåndbogen kan op
                    til 5 overføres til næste år. Skal jeg vise reglerne?
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              Eksempel — bygget på Lavazzas egne HR-dokumenter
            </p>
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
                — så teamet kan fokusere på det der virkelig kræver et menneske.
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
