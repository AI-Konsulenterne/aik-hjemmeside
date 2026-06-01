import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

type SubpageCTAProps = {
  heading?: string;
  description?: string;
};

export default function SubpageCTA({
  heading = "Klar til at komme i gang?",
  description = "Book en gratis 45-minutters AI-afklaring. Ingen forpligtelse, ingen forberedelse — vi tager det hele.",
}: SubpageCTAProps) {
  return (
    <section className="py-[clamp(3rem,8vw,6rem)] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900">
              {heading}
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="primary" href="/kontakt" cal>
                Book et møde i dag
              </Button>
              <a
                href="tel:+4525547074"
                className="text-sm font-semibold text-gray-500 hover:text-black transition-colors"
              >
                Eller ring til os: +45 25 54 70 74
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
