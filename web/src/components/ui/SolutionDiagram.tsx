/**
 * Generisk "Sådan virker løsningen"-grafik til case-sider.
 * Viser flowet: Jeres systemer & kanaler → AI-agent → Automatiske resultater.
 * Rent CSS/SVG — ingen billeder nødvendige.
 */

function Arrow() {
  return (
    <div
      className="flex items-center justify-center text-primary shrink-0 rotate-90 md:rotate-0"
      aria-hidden="true"
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  );
}

function Node({
  label,
  items,
  variant = "default",
}: {
  label: string;
  items: string[];
  variant?: "default" | "primary";
}) {
  const isPrimary = variant === "primary";
  return (
    <div
      className={`flex-1 w-full rounded-2xl p-5 lg:p-6 text-center ${
        isPrimary
          ? "bg-gray-900 text-white ring-1 ring-gray-900"
          : "bg-white ring-1 ring-gray-100"
      }`}
    >
      <p
        className={`text-sm font-bold tracking-heading mb-3 ${
          isPrimary ? "text-primary" : "text-gray-900"
        }`}
      >
        {label}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`text-xs lg:text-[13px] rounded-lg px-3 py-1.5 leading-snug ${
              isPrimary
                ? "bg-white/10 text-white/90"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SolutionDiagram() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100">
      <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-semibold text-center mb-6">
        Sådan virker løsningen
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
        <Node
          label="Jeres systemer & kanaler"
          items={["Email & kundeservice", "Webshop / CRM", "Interne dokumenter"]}
        />
        <Arrow />
        <Node
          label="AI-agent fra AIK"
          items={["Forstår jeres data", "Arbejder automatisk 24/7", "Tilsluttet jeres systemer"]}
          variant="primary"
        />
        <Arrow />
        <Node
          label="Resultater"
          items={["Automatiske svar", "Frigjort tid", "Skalerer uden flere hænder"]}
        />
      </div>
    </div>
  );
}
