import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function FinalCTA() {
  return (
    <section className="py-[clamp(4rem,10vw,7rem)] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">
              Hvad ville du gøre med 200.000 kr ekstra om året?
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed">
              Det starter med én samtale. 45 minutter. Gratis. Du går derfra
              med en konkret AI-plan — eller det koster dig ingenting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="primary" size="lg" href="/kontakt" cal>
                Book et møde i dag
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <a
                href="tel:+4525547074"
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                Eller ring direkte: +45 25 54 70 74
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              Vi tager et begrænset antal nye kunder pr. måned for at sikre kvaliteten.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
