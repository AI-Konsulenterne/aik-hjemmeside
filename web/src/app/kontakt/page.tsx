import type { Metadata } from "next";
import CalBooking from "@/components/ui/CalBooking";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Kontakt AI Konsulenterne | Book Gratis AI-Afklaring",
  description:
    "Book en gratis 45-minutters AI-afklaring med Alexander. Ingen forpligtelse — finder vi ikke en mulighed, koster det ingenting. Ring +45 25 54 70 74.",
  alternates: { canonical: "/kontakt" },
  keywords: [
    "kontakt AI konsulent",
    "book AI møde",
    "AI afklaring gratis",
    "AI rådgivning København",
  ],
  openGraph: {
    title: "Kontakt — Book Gratis AI-Afklaring",
    description:
      "45 min gratis AI-afklaring med Alexander. Ingen forberedelse, ingen forpligtelse.",
    url: "/kontakt",
  },
};

export default function Kontakt() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Lad os tage en snak
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                Ring direkte, send en mail, eller book en gratis 45-minutters
                AI-afklaring. Vi er klar til at hjælpe.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact options */}
      <section className="pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Phone */}
            <a
              href="tel:+4525547074"
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-heading mb-1">
                Ring til os
              </h2>
              <p className="text-primary font-semibold group-hover:underline">
                +45 25 54 70 74
              </p>
              <p className="text-sm text-gray-400 mt-1">Alexander</p>
            </a>

            {/* Email */}
            <a
              href="mailto:kontakt@ai-konsulenterne.dk"
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-heading mb-1">
                Send en mail
              </h2>
              <p className="text-primary font-semibold group-hover:underline text-sm">
                kontakt@ai-konsulenterne.dk
              </p>
            </a>

            {/* Book */}
            <a
              href="#booking"
              className="bg-primary/5 border-2 border-primary rounded-2xl p-8 text-center hover:shadow-md transition-shadow group block"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-heading mb-1">
                Book et møde
              </h2>
              <p className="text-sm text-gray-500">
                Gratis 45-minutters AI-afklaring
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Cal.com Booking */}
      <section id="booking" className="pb-[clamp(3rem,8vw,6rem)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900">
                Book din gratis AI-afklaring
              </h2>
              <p className="text-gray-500 mt-3">
                Vælg en tid der passer dig — mødet tager 45 minutter.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <CalBooking className="max-w-5xl mx-auto min-h-[680px]" />
          </FadeIn>
        </div>
      </section>

      {/* Info */}
      <section className="py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            AI Konsulenterne — CVR: 45569241
          </p>
        </div>
      </section>
    </>
  );
}
