"use client";

import { useEffect, useRef, useState } from "react";
import { registerCalBookingTracking } from "@/lib/analytics";

type CalBookingProps = {
  calUsername?: string;
  className?: string;
  /** Cal.com layout. "month_view" er default, brug "column_view" for smallere plads */
  layout?: "month_view" | "week_view" | "column_view";
};

// Cal.com embed script — vanilla JS pattern fra docs
// Initialiseres én gang globalt, derefter kan vi bruge window.Cal
type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalFn>;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

function loadCalScript() {
  if (typeof window === "undefined" || window.Cal) return;

  const script = (function (C: Window, A: string, L: string) {
    const p = function (a: CalFn, ar: IArguments) {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal as CalFn;
        // eslint-disable-next-line prefer-rest-params
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement("script");
          s.src = A;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function (this: unknown) {
            // eslint-disable-next-line prefer-rest-params
            p(api as CalFn, arguments);
          } as CalFn;
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns = cal.ns || {};
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace] as unknown as IArguments);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    return C.Cal;
  })(
    window,
    process.env.NEXT_PUBLIC_CAL_EMBED_URL || "https://app.cal.com/embed/embed.js",
    "init",
  );

  return script;
}

export default function CalBooking({
  calUsername,
  className = "",
  layout = "month_view",
}: CalBookingProps) {
  const username = calUsername || process.env.NEXT_PUBLIC_CAL_USERNAME;
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || !containerRef.current) return;

    try {
      loadCalScript();
      const cal = window.Cal;
      if (!cal) return;

      cal("init", {
        origin:
          process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://app.cal.com",
      });
      cal("inline", {
        elementOrSelector: containerRef.current,
        calLink: username,
        layout,
        config: {
          theme: "light",
          hideEventTypeDetails: "false",
        },
      });

      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#ff9a00",
          },
        },
        hideEventTypeDetails: false,
        layout,
      });
      registerCalBookingTracking();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunne ikke indlæse booking");
    }
  }, [username, layout]);

  if (!username) {
    return (
      <div className={`bg-gray-50 rounded-2xl p-8 text-center ${className}`}>
        <p className="text-gray-500 mb-3">
          Booking kan ikke indlæses — ring i stedet:
        </p>
        <a
          href="tel:+4525547074"
          className="text-primary font-semibold text-lg hover:underline"
        >
          +45 25 54 70 74
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gray-50 rounded-2xl p-8 text-center ${className}`}>
        <p className="text-gray-500 mb-3">
          Booking-kalenderen kunne ikke indlæses. Book direkte her:
        </p>
        <a
          href={`https://cal.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white rounded-full px-6 py-3 font-semibold hover:bg-primary-dark transition-colors"
        >
          Åbn kalender hos Cal.com →
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`cal-embed ${className}`}
      style={{ minHeight: 600 }}
    />
  );
}
