import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";

/**
 * Sektionshovedet, som på forsiden: etiket og overskrift til venstre
 * (overskriften rejser sig ord for ord), en kort tekst til højre. Samme
 * mål og farver som forsidens sektioner, så undersiderne ikke har deres
 * eget typografiske system.
 */
export default function SektionHoved({
  kicker,
  titel,
  tekst,
  mork = false,
  id,
  children,
}: {
  kicker: string;
  titel: string;
  tekst?: string;
  mork?: boolean;
  id?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
      <div className="lg:col-span-7">
        <p className={`kicker ${mork ? "text-white/60" : "text-gray-600"}`}>{kicker}</p>
        <OrdForOrd
          id={id}
          className={`mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display ${
            mork ? "text-white" : "text-gray-900"
          }`}
        >
          {titel}
        </OrdForOrd>
      </div>
      {(tekst || children) && (
        <FadeIn delay={250} className="lg:col-span-5">
          {tekst && (
            <p className={`max-w-[44ch] text-[1.0625rem] leading-relaxed ${mork ? "text-white/70" : "text-gray-600"}`}>
              {tekst}
            </p>
          )}
          {children}
        </FadeIn>
      )}
    </div>
  );
}
