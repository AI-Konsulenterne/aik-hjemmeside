import type { Metadata } from "next";
import CalBooking from "@/components/ui/CalBooking";

export const metadata: Metadata = {
  title: { absolute: "Kontakt AI Konsulenterne - gratis AI-afklaring" },
  description: "Få en gratis 45-minutters AI-afklaring med Alexander. Send en henvendelse direkte her, eller ring på +45 25 54 70 74. Helt uforpligtende.",
  alternates: { canonical: "/kontakt" },
  keywords: ["kontakt AI konsulent", "book AI møde", "AI afklaring gratis", "AI rådgivning København"],
  openGraph: {
    title: "Kontakt — Gratis AI-afklaring",
    description: "45 min gratis AI-afklaring med Alexander. Ingen forberedelse, ingen forpligtelse.",
    url: "/kontakt",
  },
};

export default function Kontakt() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Lad os tage en snak</p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-heading text-gray-900 leading-[1.1]">Find jeres næste skridt med AI</h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">I behøver ikke have en færdig plan. På en gratis 45-minutters AI-afklaring taler I med Alexander om jeres hverdag og hvor AI kan hjælpe.</p>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>Ingen forberedelse nødvendig</li>
            <li>Plads til både konkrete idéer og de første spørgsmål</li>
            <li>Helt uforpligtende</li>
          </ul>
          <div className="mt-8 border-t border-gray-200 pt-6 space-y-3">
            <p className="font-semibold text-gray-900">Vil du hellere kontakte os direkte?</p>
            <p><a href="tel:+4525547074" className="font-semibold underline underline-offset-4 hover:text-primary-dark">Ring til Alexander: +45 25 54 70 74</a></p>
            <p><a href="mailto:kontakt@ai-konsulenterne.dk" className="text-sm underline underline-offset-4 hover:text-primary-dark break-all">kontakt@ai-konsulenterne.dk</a></p>
          </div>
          <p className="mt-8 text-xs text-gray-500">AI Konsulenterne ApS · CVR: 45569241</p>
        </div>
        <div id="booking" className="scroll-mt-24"><CalBooking /></div>
      </div>
    </section>
  );
}
