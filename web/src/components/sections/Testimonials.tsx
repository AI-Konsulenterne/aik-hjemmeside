import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import {
  getTestimonials,
  strapiImageUrl,
  type Testimonial,
} from "@/lib/strapi";

export default async function Testimonials() {
  const items = await getTestimonials({ featured: true }).catch(
    () => [] as Testimonial[],
  );

  if (items.length === 0) return null;

  return (
    <section className="bg-gray-50 py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Hvad kunderne siger
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1] max-w-3xl mx-auto">
            Hvad siger vores kunder
          </h2>
        </FadeIn>

        <div
          className={`mt-12 lg:mt-16 grid gap-6 lg:gap-8 max-w-6xl mx-auto ${
            items.length === 1
              ? "grid-cols-1 max-w-2xl"
              : items.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((t, i) => {
            const photo = strapiImageUrl(t.authorPhoto);
            const logo = strapiImageUrl(t.companyLogo);
            return (
              <FadeIn key={t.id} delay={i * 100}>
                <figure className="bg-white rounded-2xl p-7 lg:p-8 h-full flex flex-col border-2 border-primary hover:shadow-lg transition-shadow">
                  {/* Stars */}
                  {t.rating && t.rating > 0 && (
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-4 h-4 text-primary fill-current"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  <blockquote className="text-gray-900 leading-relaxed text-[0.98rem] lg:text-base flex-grow italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                    {photo ? (
                      <div className="relative w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 ring-1 ring-gray-200">
                        <Image
                          src={photo}
                          alt={t.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {t.authorName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold tracking-heading text-gray-900 leading-tight">
                        {t.authorName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {[t.authorTitle, t.company].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {logo && (
                      <div className="relative w-12 h-8 flex-shrink-0">
                        <Image
                          src={logo}
                          alt={t.company}
                          fill
                          className="object-contain object-right"
                        />
                      </div>
                    )}
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
