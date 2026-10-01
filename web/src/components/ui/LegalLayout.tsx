import FadeIn from "@/components/ui/FadeIn";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <article className="pt-[clamp(4rem,10vw,7rem)] pb-[clamp(4rem,10vw,6rem)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Juridisk
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 leading-[1.1]">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mt-4">
            Sidst opdateret: {lastUpdated}
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="prose-article mt-10 text-body text-gray-700">
            {children}
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
