type CalBookingProps = {
  calUsername?: string;
  className?: string;
  /** Bevaret for API-kompatibilitet — bruges ikke. */
  layout?: "month_view" | "week_view" | "column_view";
};

/**
 * Cal-booking er parkeret. Booking sker via telefon eller email — viser et
 * kontaktkort med Alexanders nummer og mail.
 */
export default function CalBooking({ className = "" }: CalBookingProps) {
  return (
    <div
      className={`bg-gray-50 rounded-2xl ring-1 ring-gray-100 p-8 lg:p-12 text-center flex flex-col items-center justify-center ${className}`}
    >
      <h3 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900">
        Book en gratis AI-afklaring
      </h3>
      <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
        Ring eller skriv til Alexander, så finder vi en tid til en uforpligtende
        45-minutters AI-afklaring.
      </p>
      <a
        href="tel:+4525547074"
        className="inline-flex items-center gap-2 mt-8 bg-primary text-white font-semibold rounded-full px-8 py-4 text-lg hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
      >
        Ring til Alexander — +45 25 54 70 74
      </a>
      <p className="text-sm text-gray-500 mt-6">
        Eller skriv til{" "}
        <a
          href="mailto:kontakt@ai-konsulenterne.dk"
          className="text-primary font-semibold hover:underline"
        >
          kontakt@ai-konsulenterne.dk
        </a>
      </p>
    </div>
  );
}
