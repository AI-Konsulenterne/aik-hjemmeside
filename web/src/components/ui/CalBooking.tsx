import ContactForm from "./ContactForm";

type CalBookingProps = {
  calUsername?: string;
  className?: string;
  /** Bevaret for API-kompatibilitet — bruges ikke. */
  layout?: "month_view" | "week_view" | "column_view";
};

/**
 * Kalenderen er ikke aktiveret. Send en forespørgsel direkte fra siden;
 * en mødetid bekræftes først, når Alexander og kunden har aftalt den.
 */
export default function CalBooking({ className = "" }: CalBookingProps) {
  return (
    <div
      className={`bg-gray-50 rounded-2xl ring-1 ring-gray-100 p-5 sm:p-8 lg:p-10 ${className}`}
    >
      <ContactForm />
    </div>
  );
}
