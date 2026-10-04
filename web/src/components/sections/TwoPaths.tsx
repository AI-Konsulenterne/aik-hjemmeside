import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const buildLinks = [
  { label: "AI-strategi", href: "/ai-strategi" },
  { label: "AI-løsninger til jeres data og systemer", href: "/skraeddersyede-ai" },
  { label: "AIK Workshop", href: "/workshop" },
];

const learnChips = [
  "40+ moduler",
  "Fra 249 kr. pr. medarbejder/md",
  "Løbende måned + 1 måned",
];

// To veje lige under hero: få det bygget af os, eller lær det selv (AI-Minds).
export default function TwoPaths() {
  return (
    <section className="py-[clamp(3.5rem,8vw,6rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
            Hvad har I brug for?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 lg:mt-12">
          {/* Kort 1: Få det bygget */}
          <FadeIn delay={100} className="h-full">
            <div className="h-full flex flex-col bg-sand rounded-[20px] p-7 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
                Få det bygget
              </p>
              <h3 className="text-2xl lg:text-[1.75rem] font-bold tracking-heading text-gray-900 leading-[1.15] mt-3">
                Få bygget AI ind i forretningen
              </h3>
              <p className="text-body text-gray-700 mt-4">
                Vi finder opgaverne, hvor AI sparer tid, og bygger løsningen til
                jeres systemer.
              </p>
              <ul className="mt-6 border-t border-gray-200">
                {buildLinks.map((l) => (
                  <li key={l.href + l.label} className="border-b border-gray-200">
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between gap-4 py-3.5 text-body font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {l.label}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button variant="primary" href="/skraeddersyede-ai">
                  Se hvordan vi arbejder
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Kort 2: Lær det selv */}
          <FadeIn delay={200} className="h-full">
            <div className="h-full flex flex-col bg-gray-900 text-white rounded-[20px] p-7 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
                Lær det selv
              </p>
              <h3 className="text-2xl lg:text-[1.75rem] font-bold tracking-heading leading-[1.15] mt-3">
                Hands-on undervisning i Copilot
              </h3>
              <p className="text-body text-white/80 mt-4">
                AI-Minds: korte videoer på dansk, månedlig live Q&amp;A og nye
                moduler hver måned.
              </p>
              <ul className="flex flex-wrap gap-2 mt-6">
                {learnChips.map((c) => (
                  <li
                    key={c}
                    className="text-sm font-semibold text-white bg-white/10 ring-1 ring-white/15 rounded-full px-3.5 py-1.5"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button variant="white" href="/academy">
                  Se Copilot-uddannelsen
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
