"use client";

import { trackEvent } from "@/lib/analytics";

type CalBookingProps = {
  calUsername?: string;
  className?: string;
  /** Bevaret for API-kompatibilitet — bruges ikke i den midlertidige link-version. */
  layout?: "month_view" | "week_view" | "column_view";
};

/**
 * MIDLERTIDIGT: den indlejrede Cal.com-kalender er slået fra (blokeret af
 * Cookiebot). Viser i stedet et kort med direkte link til booking-siden, som
 * åbner i en ny fane. Rul tilbage til den inline embed, når Cookiebot-fixet er
 * på plads.
 */
export default function CalBooking({
  calUsername,
  className = "",
}: CalBookingProps) {
  const username = calUsername || process.env.NEXT_PUBLIC_CAL_USERNAME;
  const origin = process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://app.cal.com";
  const bookingUrl = username ? `${origin}/${username}` : "/kontakt";

  return (
    <div
      className={`bg-gray-50 rounded-2xl ring-1 ring-gray-100 p-8 lg:p-10 text-center flex flex-col items-center justify-center ${className}`}
    >
      <h3 className="text-xl lg:text-2xl font-bold tracking-heading text-gray-900">
        Book en gratis AI-afklaring
      </h3>
      <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
        45 minutter med Alexander - ingen forpligtelse. Vælg en tid i
        kalenderen, der passer dig.
      </p>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("book_click", { method: "direct-link" })}
        className="inline-flex items-center gap-2 mt-7 bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
      >
        Åbn booking-kalenderen →
      </a>
      <p className="text-sm text-gray-500 mt-6">
        Eller ring til Alexander på{" "}
        <a
          href="tel:+4525547074"
          className="text-primary font-semibold hover:underline"
        >
          +45 25 54 70 74
        </a>
      </p>
    </div>
  );
}
