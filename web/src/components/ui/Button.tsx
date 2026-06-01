"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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

type ButtonProps = {
  variant?: "primary" | "secondary" | "white";
  size?: "default" | "lg" | "sm";
  href?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Når true: knappen åbner Cal.com booking-modal i stedet for at navigere.
   * Fallback til href hvis Cal.com ikke er konfigureret.
   */
  cal?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
  white: "bg-white text-primary hover:bg-gray-50",
};

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  default: "px-6 py-3 text-sm",
  lg: "px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base",
};

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  cal = false,
  ...props
}: ButtonProps) {
  const initialized = useRef(false);
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME;

  useEffect(() => {
    if (!cal || !username || initialized.current) return;
    initialized.current = true;
    loadCalScript();
    const calApi = window.Cal;
    if (!calApi) return;
    calApi("init", {
      origin: process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://app.cal.com",
    });
    calApi("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: { "cal-brand": "#ff9a00" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [cal, username]);

  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Cal.com booking mode — åbner kalender i popup
  if (cal && username) {
    return (
      <button
        className={classes}
        data-cal-link={username}
        data-cal-config='{"layout":"month_view","theme":"light"}'
        {...props}
      >
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
