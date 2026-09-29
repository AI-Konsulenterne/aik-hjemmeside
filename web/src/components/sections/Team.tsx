import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";
import { HOLD, type Holdmedlem } from "@/content/team";

/**
 * Holdet: de fire, man faktisk taler med. Data og fotos ligger i repoet
 * (content/team.ts, public/team), ikke i Strapi.
 */

/** Portrætterne. På mørk flade (heroen på /om-os) er teksten hvid. */
export function HoldListe({
  folk = HOLD,
  mork = false,
  className = "",
}: {
  folk?: Holdmedlem[];
  mork?: boolean;
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 ${className}`}>
      {folk.map((m, i) => (
        <li key={m.navn}>
          <FadeIn delay={i * 90}>
            <figure className="group">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${mork ? "bg-white/[0.06]" : "bg-gray-100"}`}>
                <Image
                  src={m.foto}
                  alt={m.navn}
                  fill
                  sizes="(min-width: 1024px) 18rem, 50vw"
                  className="object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5">
                <p className={`text-lg font-bold leading-tight tracking-heading ${mork ? "text-white" : "text-gray-900"}`}>{m.navn}</p>
                <p className={`mt-1 text-[0.9375rem] ${mork ? "text-white/65" : "text-gray-600"}`}>{m.titel}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${mork ? "text-white" : "text-gray-900"}`}
                  >
                    <span className="understreg">LinkedIn</span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">(åbner i en ny fane)</span>
                  </a>
                )}
              </figcaption>
            </figure>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}

export default function Team() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="kicker text-gray-600">Holdet</p>
            <OrdForOrd className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
              Dem, I faktisk taler med.
            </OrdForOrd>
          </div>
          <FadeIn delay={250} className="lg:col-span-5">
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-gray-600">
              Den, I møder på første møde, er også den, der bygger løsningen.
              Der sidder ingen account manager imellem.
            </p>
          </FadeIn>
        </div>

        <HoldListe className="mt-14 lg:mt-20" />
      </div>
    </section>
  );
}
