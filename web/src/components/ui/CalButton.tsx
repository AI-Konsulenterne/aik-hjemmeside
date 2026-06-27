"use client";

import { useEffect, useRef } from "react";
import { registerCalBookingTracking } from "@/lib/analytics";

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

  (function (C: Window, A: string, L: string) {
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
  })(
    window,
    process.env.NEXT_PUBLIC_CAL_EMBED_URL || "https://app.cal.com/embed/embed.js",
    "init",
  );
}

type CalButtonProps = {
  children: React.ReactNode;
  className?: string;
  calUsername?: string;
  /** Hvis true: bruger en simpel <a> til /kontakt som fallback hvis Cal ikke kan loade */
  fallbackHref?: string;
};

/**
 * Knap der åbner Cal.com booking i et popup overlay.
 * Bruger data-cal-link så Cal.com's script håndterer åbning.
 */
export default function CalButton({
  children,
  className = "",
  calUsername,
  fallbackHref = "/kontakt#booking",
}: CalButtonProps) {
  const username = calUsername || process.env.NEXT_PUBLIC_CAL_USERNAME;
  const initialized = useRef(false);

  useEffect(() => {
    if (!username || initialized.current) return;
    initialized.current = true;
    loadCalScript();
    const cal = window.Cal;
    if (!cal) return;
    cal("init", {
      origin: process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://app.cal.com",
    });
    cal("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: {
          "cal-brand": "#ff9a00",
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    registerCalBookingTracking();
  }, [username]);

  if (!username) {
    return (
      <a href={fallbackHref} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      data-cal-link={username}
      data-cal-config='{"layout":"month_view","theme":"light"}'
    >
      {children}
    </button>
  );
}
