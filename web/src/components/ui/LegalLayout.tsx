import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

/**
 * De juridiske sider (privatliv, cookies, handelsbetingelser).
 *
 * Siderne skriver almindelig HTML (h2, h3, p, ul), men der var ingen
 * typografi til den: Tailwinds nulstilling gjorde overskrifter til
 * brødtekst og fjernede punkterne, så en hel politik stod som én lang
 * strøm af linjer. Nu har indholdet sine egne regler (.juridisk i
 * globals.css), og titlen står i en spalte for sig med dato og kontakt.
 * Etiketten er grå; orange tekst på hvid bund er ude.
 */
export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <article className="bg-white pb-[clamp(4rem,10vw,7rem)] pt-[clamp(3.5rem,8vw,6.5rem)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="kicker text-gray-600">Juridisk</p>
              <h1 className="mt-6 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-[1.04] tracking-display text-gray-900">
                {title}
              </h1>
              <p className="mt-4 text-sm text-gray-600">Sidst opdateret: {lastUpdated}</p>
              <div className="mt-8 border-t border-gray-200 pt-6 text-sm leading-relaxed text-gray-600">
                <p>Spørgsmål til siden?</p>
                <a href="mailto:kontakt@ai-konsulenterne.dk" className="mt-1 inline-block font-semibold text-gray-900">
                  <span className="understreg">kontakt@ai-konsulenterne.dk</span>
                </a>
                <nav aria-label="Juridiske sider" className="mt-6 flex flex-col gap-2">
                  {[
                    ["/privatlivspolitik", "Privatlivspolitik"],
                    ["/cookiepolitik", "Cookiepolitik"],
                    ["/handelsbetingelser", "Handelsbetingelser"],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="text-gray-600 transition-colors hover:text-gray-900">
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>
          <FadeIn delay={100} className="lg:col-span-8">
            <div className="juridisk max-w-[70ch]">{children}</div>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
