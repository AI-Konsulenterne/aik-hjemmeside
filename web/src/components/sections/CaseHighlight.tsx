import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Kundecase Lavazza (design-handoff "Kundecase Lavazza").
 * Tekst til venstre, animeret chat med HR-agenten til højre og en faktarække nedenunder.
 * Chatten er et illustrativt eksempel. Animationen er ren CSS (aik-chat-* i globals.css).
 */

const facts = [
  { title: "Datasikker", sub: "Lever op til GDPR", accent: false },
  { title: "Frigjort tid", sub: "i hele HR-afdelingen", accent: true },
];

export default function CaseHighlight() {
  return (
    <section className="bg-white py-[clamp(4rem,10vw,7rem)] px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-[clamp(48px,6vw,72px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(48px,6vw,96px)] items-center">
          {/* Venstre: casens tekst */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Kundecase - Lavazza
              </p>
              <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.06] tracking-[-0.02em] text-gray-900 text-balance">
                HR-agenten der svarer så medarbejderne{" "}
                <span className="text-primary">ikke skal</span>
              </h2>
              <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-gray-700 text-pretty">
                AI der frigør tid i HR-afdelingen ved at besvare medarbejdernes
                spørgsmål automatisk.
              </p>
              <p className="text-body leading-[1.7] text-gray-600 text-pretty">
                Lavazzas HR-afdeling brugte alt for mange timer på at besvare de
                samme spørgsmål igen og igen. Vi byggede en datasikker AI-agent,
                der automatisk besvarer HR-spørgsmålene - så teamet kan bruge
                tiden på det, der virkelig kræver et menneske.
              </p>
              <Link
                href="/cases"
                className="self-start inline-flex items-center gap-2.5 hover:gap-3.5 py-1.5 text-base font-semibold text-gray-900 hover:text-primary-dark border-b-2 border-primary transition-all duration-200 ease-out"
              >
                Se alle kundehistorier
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Højre: chat med HR-agenten */}
          <FadeIn delay={200}>
            <figure className="flex flex-col gap-3.5">
              <div className="bg-sand rounded-[24px] p-[clamp(20px,3vw,36px)]">
                <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_24px_48px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="flex items-center gap-3.5 px-[22px] py-[18px] border-b border-gray-200">
                    <span className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      </svg>
                    </span>
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-base font-bold text-gray-900">HR-agenten</span>
                      <span className="inline-flex items-center gap-2 text-[13px] text-gray-500">
                        <span className="aik-pulse w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                        Online · svarer med det samme
                      </span>
                    </div>
                  </div>

                  <div className="p-[22px] flex flex-col gap-3.5 min-h-[260px]">
                    <p className="aik-chat-q self-end max-w-[82%] bg-gray-900 text-white rounded-[18px_18px_4px_18px] px-4 py-3 text-[15px] leading-[1.5]">
                      Hvor mange feriedage har jeg tilbage i år?
                    </p>
                    <div className="grid justify-items-start">
                      <div className="aik-chat-typing [grid-area:1/1] bg-gray-100 rounded-[18px_18px_18px_4px] px-4 py-3.5 flex gap-[5px]" aria-hidden="true">
                        {[0, 200, 400].map((d) => (
                          <span key={d} className="aik-chat-dot w-[7px] h-[7px] rounded-full bg-gray-500" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                      <div className="aik-chat-a [grid-area:1/1] max-w-[88%] flex flex-col gap-2">
                        <p className="bg-[#fff4e5] rounded-[18px_18px_18px_4px] px-4 py-3.5 text-[15px] leading-[1.55] text-gray-800">
                          Du har 12 feriedage tilbage. Ifølge personalehåndbogen
                          kan op til 5 overføres til næste år. Skal jeg vise
                          reglerne?
                        </p>
                        <span className="aik-chat-src self-start inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-[11px] py-[5px]">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary-dark" aria-hidden="true">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          </svg>
                          Kilde: Personalehåndbog
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="text-sm text-gray-500 text-center">
                Eksempel - bygget på Lavazzas egne HR-dokumenter
              </figcaption>
            </figure>
          </FadeIn>
        </div>

        {/* Faktarække */}
        <FadeIn delay={250}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-y border-gray-200">
            <div className="flex flex-col gap-1.5 px-1 py-8">
              <div className="h-[clamp(1.8rem,2.9vw,2.4rem)] flex items-center">
                <Image
                  src="/logos/lavazza.png"
                  alt="Lavazza"
                  width={3840}
                  height={2400}
                  sizes="120px"
                  className="h-[180%] w-auto brightness-0"
                />
              </div>
              <span className="text-[15px] text-gray-500">HR / intern AI</span>
            </div>
            {facts.map((f) => (
              <div key={f.title} className="flex flex-col gap-1.5 px-1 py-8">
                <span className={`text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.01em] ${f.accent ? "text-primary" : "text-gray-900"}`}>
                  {f.title}
                </span>
                <span className="text-[15px] text-gray-500">{f.sub}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
