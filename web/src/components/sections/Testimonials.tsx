import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import {
  getTestimonials,
  strapiImageUrl,
  type Testimonial,
} from "@/lib/strapi";

/**
 * "Hvad siger vores kunder" (design-handoff "Kundeudtalelser").
 * Udtalelserne hentes fra Strapi (featured). Kortene skifter mellem lyst og mørkt.
 * Den vigtigste sætning markeres med en orange streg, hvis den findes i citatet.
 */

// Sætninger, der markeres, når de står i et citat. Tilføj flere her.
const highlights = ["fungerer virkelig godt", "noget, vi rent faktisk bruger"];

function Quote({ text, dark }: { text: string; dark: boolean }) {
  const hit = highlights.find((h) => text.includes(h));
  if (!hit) return <>{text}</>;
  const i = text.indexOf(hit);
  const color = dark ? "rgba(255,154,0,0.45)" : "rgba(255,154,0,0.28)";
  return (
    <>
      {text.slice(0, i)}
      <span className="aik-mark" style={{ backgroundImage: `linear-gradient(${color}, ${color})` }}>
        {hit}
      </span>
      {text.slice(i + hit.length)}
    </>
  );
}

function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden="true">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export default async function Testimonials() {
  const items = await getTestimonials({ featured: true }).catch(
    () => [] as Testimonial[],
  );

  if (items.length === 0) return null;

  // Samlet rating vises kun, når alle viste udtalelser har en rating i Strapi.
  const rated = items.filter((t) => typeof t.rating === "number" && t.rating > 0);
  const avg =
    rated.length === items.length
      ? Math.round((rated.reduce((s, t) => s + (t.rating ?? 0), 0) / rated.length) * 10) / 10
      : null;

  return (
    <section className="bg-sand py-[clamp(4rem,10vw,7rem)] px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <FadeIn>
          <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Hvad kunderne siger
              </p>
              <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-heading text-gray-900 leading-[1.05]">
                Hvad siger vores kunder
              </h2>
            </div>
            {avg !== null && (
              <div className="flex items-center gap-3.5">
                <span className="flex gap-[3px] text-primary" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span className="text-[15px] font-semibold text-gray-700">
                  {String(avg).replace(".", ",")} af 5 fra vores kunder
                </span>
              </div>
            )}
          </div>
        </FadeIn>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6 items-stretch">
          {items.map((t, i) => {
            const dark = i % 2 === 1;
            const photo = strapiImageUrl(t.authorPhoto);
            const role = [t.authorTitle, t.company].filter(Boolean).join(" · ");
            const short = t.quote.length < 220;
            return (
              <FadeIn key={t.id} delay={i * 150} className="h-full">
                <figure
                  className={`relative overflow-hidden h-full rounded-[24px] p-[clamp(32px,4vw,56px)] flex flex-col gap-10 transition-shadow duration-200 ${
                    dark
                      ? "bg-gray-900 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                      : "bg-white border border-gray-200 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <span
                    className="absolute top-[clamp(8px,1vw,16px)] right-[clamp(24px,3vw,40px)] text-[200px] font-bold leading-none pointer-events-none select-none"
                    style={{ color: dark ? "rgba(255,154,0,0.18)" : "rgba(255,154,0,0.12)" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <blockquote
                    className={`relative font-semibold text-pretty ${
                      dark ? "text-white" : "text-gray-900"
                    } ${
                      short
                        ? "text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.4] tracking-[-0.015em]"
                        : "text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.55] tracking-[-0.01em]"
                    }`}
                  >
                    <Quote text={t.quote} dark={dark} />
                  </blockquote>
                  <figcaption
                    className={`mt-auto pt-7 border-t flex items-center gap-4 ${
                      dark ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    {photo ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <Image src={photo} alt={t.authorName} fill sizes="56px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">{t.authorName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className={`text-[17px] font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                        {t.authorName}
                      </p>
                      {role && (
                        <p className={`text-sm mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{role}</p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
