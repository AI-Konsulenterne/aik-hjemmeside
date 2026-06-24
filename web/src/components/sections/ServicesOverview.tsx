import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function ServicesOverview() {
  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Hvad vi tilbyder
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1]">
            Tre veje til AI i jeres virksomhed
          </h2>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-14 lg:mt-16">
          {/* Large featured card */}
          <FadeIn delay={100}>
            <Link href="/skraeddersyede-ai" className="group block h-full">
              <div className="relative bg-gray-900 rounded-2xl p-8 lg:p-10 h-full min-h-[320px] flex flex-col justify-between overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-[6rem]" aria-hidden="true" />

                {/* Dekorativ AI-netværks-illustration (transparent) */}
                <svg
                  className="absolute -bottom-6 -right-4 w-72 h-72 lg:w-96 lg:h-96 opacity-[0.18] pointer-events-none"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* forbindelser */}
                  <g stroke="#ffffff" strokeWidth="1">
                    <line x1="40" y1="60" x2="100" y2="40" />
                    <line x1="40" y1="60" x2="90" y2="110" />
                    <line x1="100" y1="40" x2="150" y2="70" />
                    <line x1="100" y1="40" x2="90" y2="110" />
                    <line x1="90" y1="110" x2="150" y2="70" />
                    <line x1="90" y1="110" x2="60" y2="160" />
                    <line x1="150" y1="70" x2="160" y2="130" />
                    <line x1="90" y1="110" x2="160" y2="130" />
                    <line x1="60" y1="160" x2="130" y2="170" />
                    <line x1="160" y1="130" x2="130" y2="170" />
                  </g>
                  {/* noder */}
                  <g>
                    <circle cx="40" cy="60" r="5" fill="#ffffff" />
                    <circle cx="100" cy="40" r="7" fill="#ff9a00" />
                    <circle cx="150" cy="70" r="5" fill="#ffffff" />
                    <circle cx="90" cy="110" r="9" fill="#ff9a00" />
                    <circle cx="160" cy="130" r="5" fill="#ffffff" />
                    <circle cx="60" cy="160" r="6" fill="#ffffff" />
                    <circle cx="130" cy="170" r="7" fill="#ff9a00" />
                  </g>
                </svg>
                <div className="relative z-10">
                  <span className="inline-block bg-primary/20 text-primary text-[11px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full mb-4">
                    Mest populær
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-heading text-white leading-[1.15]">
                    Skræddersyede AI-løsninger
                  </h3>
                  <p className="text-white/50 mt-3 leading-relaxed max-w-md">
                    Vi bygger AI ind i jeres hverdag - med udgangspunkt i jeres data, jeres systemer og det I rent faktisk har brug for. Ikke bare en standardpakke.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white/60 group-hover:text-primary transition-colors mt-6">
                  Læs mere
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Two stacked cards */}
          <div className="grid grid-rows-2 gap-5">
            <FadeIn delay={200}>
              <Link href="/workshop" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold tracking-heading group-hover:text-primary transition-colors">
                        AIK Workshop
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      En hel dag hvor jeres team får lov at prøve kræfter med AI med afsæt i jeres egne opgaver. I går hjem med konkrete værktøjer, teknikker og nye måder at arbejde med AI på.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-primary transition-colors mt-4">
                    Læs mere
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={300}>
              <Link href="/visionai" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold tracking-heading group-hover:text-primary transition-colors">
                        AIK Workspace
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Jeres helt eget AI-system, som er forankret i jeres data, jeres systemer og jeres måde at gøre tingene på.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-primary transition-colors mt-4">
                    Læs mere
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
