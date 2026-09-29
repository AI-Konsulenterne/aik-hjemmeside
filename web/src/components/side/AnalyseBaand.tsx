import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Båndet med den gratis AI-analyse: tre use cases på mail, uden at tale
 * med nogen først. Står på /skraeddersyede-ai og i bloggen, hvor læseren
 * er nysgerrig, men ikke klar til et møde.
 */
export default function AnalyseBaand({
  titel = "Se, hvad AI kunne gøre hos jer.",
  graa = false,
}: {
  titel?: string;
  graa?: boolean;
}) {
  return (
    <section className={`section-y ${graa ? "bg-gray-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div
            className={`flex flex-col gap-8 rounded-3xl p-8 ring-1 ring-black/[0.05] lg:flex-row lg:items-center lg:justify-between lg:p-14 ${
              graa ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="max-w-2xl">
              <p className="kicker text-gray-600">Gratis AI-analyse</p>
              <p className="mt-5 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-display text-gray-900">
                {titel}
              </p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-gray-600">
                Fortæl kort om jeres virksomhed, så får I tre konkrete use cases
                på mail. Uden at tale med nogen først.
              </p>
            </div>
            <Link
              href="/ai-guide"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gray-900 px-7 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-black lg:self-center"
            >
              Få jeres use cases
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
