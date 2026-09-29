import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Siden blev ikke fundet",
};

/**
 * 404. Mørk flade som de andre heroer, et stort, stille "404" og de sider,
 * folk oftest leder efter. Før stod tallet i orange på hvid bund, som
 * designsystemet ikke bruger til tekst.
 */
const GENVEJE: [string, string, string][] = [
  ["/academy", "AI-Minds læringsplatform", "Korte moduler på dansk til hele organisationen"],
  ["/skraeddersyede-ai", "Skræddersyet AI", "Agenter og automatisering på jeres data"],
  ["/cases", "Cases", "Det har vi bygget"],
  ["/viden-om-ai", "Viden om AI", "Guides og artikler uden buzzwords"],
];

export default function NotFound() {
  return (
    <section data-header="moerk" className="relative -mt-16 overflow-hidden bg-ink lg:-mt-20">
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
        <p aria-hidden="true" className="select-none text-[clamp(7rem,22vw,17rem)] font-bold leading-[0.8] tracking-display text-white/[0.07]">
          404
        </p>
        <div className="-mt-[clamp(2rem,6vw,5rem)] flex items-center gap-3">
          <span className="lamp" data-lit="true" aria-hidden="true" />
          <p className="kicker text-white/85">Siden blev ikke fundet</p>
        </div>
        <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-display text-white">
          Den side findes ikke. Men det gør de her.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/75 sm:text-lg">
          Siden er flyttet eller har aldrig eksisteret. Prøv en af genvejene, eller ring til
          Alexander, hvis I leder efter noget bestemt.
        </p>
        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
          <Button href="/" size="lg">
            Gå til forsiden
          </Button>
          <Button href="/kontakt" size="lg" variant="ghost">
            Kontakt os
          </Button>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {GENVEJE.map(([href, titel, tekst]) => (
            <li key={href} className="bg-ink">
              <Link href={href} className="group flex h-full flex-col p-6 transition-colors hover:bg-white/[0.04]">
                <span className="flex items-center justify-between gap-3 font-semibold text-white">
                  {titel}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
                <span className="mt-2 text-sm leading-snug text-white/60">{tekst}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
