import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function MidCTA() {
  return (
    <section className="py-[clamp(3rem,8vw,5rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="bg-primary rounded-3xl px-6 py-12 lg:px-12 lg:py-16 text-center relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-white leading-[1.1]">
                Klar til at komme i gang med AI?
              </h2>
              <p className="text-white/80 mt-4 leading-relaxed text-lg">
                Tag en uforpligtende snak med os, så finder vi ud af hvor I skal
                starte.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button variant="white" size="lg" href="/kontakt" cal>
                  Book et møde i dag
                </Button>
                <a
                  href="tel:+4525547074"
                  className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Eller ring: +45 25 54 70 74
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
