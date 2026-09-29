import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";
import { getTeamMembers, strapiImageUrl, type TeamMember } from "@/lib/strapi";

/**
 * Holdet, på forsiden igen.
 *
 * Sektionen blev taget af forsiden, da den blev bygget om til to spor,
 * fordi seed-dataene havde tre medlemmer, der hed "Navn kommer". Men i
 * produktion kommer holdet fra Strapi med rigtige navne og fotos, og det
 * er dem, en køber vil se: hvem sidder der egentlig.
 *
 * Regler:
 * - Pladsholdere ("Navn kommer") vises aldrig.
 * - Har Strapi intet foto, bruges de fotos vi har i repoet (Alexander og
 *   Martin, samme sort-hvide serie). Ellers initialer, ikke en silhuet.
 * - Alexanders titel er "AI-konsulent", uanset hvad der står i Strapi.
 * - Uden Strapi (eller uden rigtige navne) vises sektionen slet ikke.
 */

const PLADSHOLDER = /navn kommer/i;

function foto(m: TeamMember): string | null {
  const upload = strapiImageUrl(m.photo);
  if (upload) return upload;
  if (m.isPrimary || /alexander/i.test(m.name)) return "/team/alexander-hero.png";
  if (/martin/i.test(m.name)) return "/martin.webp";
  return null;
}

function rolle(m: TeamMember): string | undefined {
  if (m.isPrimary || /alexander/i.test(m.name)) return "AI-konsulent";
  return m.role || undefined;
}

function initialer(navn: string) {
  return navn
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((d) => d[0]!.toUpperCase())
    .join("");
}

export default async function Team() {
  const alle = await getTeamMembers().catch(() => [] as TeamMember[]);
  const folk = alle
    .filter((m) => m.name?.trim() && !PLADSHOLDER.test(m.name))
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || (a.order ?? 0) - (b.order ?? 0));

  if (folk.length === 0) return null;
  const kolonner = Math.min(folk.length, 4);

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

        <ul
          className={`mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-[repeat(var(--kolonner),minmax(0,1fr))] ${
            kolonner <= 2 ? "lg:max-w-3xl" : ""
          }`}
          style={{ "--kolonner": kolonner } as React.CSSProperties}
        >
          {folk.map((m, i) => {
            const src = foto(m);
            const titel = rolle(m);
            return (
              <li key={m.id}>
                <FadeIn delay={i * 90}>
                  <figure className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                      {src ? (
                        <Image
                          src={src}
                          alt={m.name}
                          fill
                          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                          className="object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl font-bold tracking-display text-gray-400" aria-hidden="true">
                          {initialer(m.name)}
                        </div>
                      )}
                    </div>
                    <figcaption className="mt-5">
                      <p className="text-lg font-bold leading-tight tracking-heading text-gray-900">{m.name}</p>
                      {titel && <p className="mt-1 text-[0.9375rem] text-gray-600">{titel}</p>}
                      {m.linkedinUrl && (
                        <a
                          href={m.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gray-900"
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
            );
          })}
        </ul>
      </div>
    </section>
  );
}
