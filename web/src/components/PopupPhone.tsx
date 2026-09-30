"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DISMISSED_KEY = "aik-popup-dismissed";

function isFormInteraction(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("form, input, textarea, select, [contenteditable]"))
  );
}

function EnquiryPrompt({ dismissedRef }: { dismissedRef: RefObject<boolean> }) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed || dismissedRef.current || isFormInteraction(document.activeElement)) {
      return;
    }

    try {
      if (sessionStorage.getItem(DISMISSED_KEY)) {
        dismissedRef.current = true;
        return;
      }
    } catch {
      // The in-memory ref still remembers dismissal when storage is blocked.
    }

    let enoughTime = false;
    let formStarted = false;

    function considerShowing() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const enoughScroll =
        scrollableHeight > 0 && window.scrollY / scrollableHeight >= 0.5;

      if (
        enoughTime &&
        enoughScroll &&
        !formStarted &&
        !dismissedRef.current &&
        document.visibilityState === "visible" &&
        !isFormInteraction(document.activeElement)
      ) {
        setVisible(true);
      }
    }

    function onFormInteraction(event: Event) {
      if (isFormInteraction(event.target)) {
        formStarted = true;
        // Leave visitors to finish a form for the rest of this page visit.
        setClosed(true);
      }
    }

    const timer = window.setTimeout(() => {
      enoughTime = true;
      considerShowing();
    }, 45_000);

    window.addEventListener("scroll", considerShowing, { passive: true });
    document.addEventListener("visibilitychange", considerShowing);
    document.addEventListener("focusin", onFormInteraction);
    document.addEventListener("input", onFormInteraction);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", considerShowing);
      document.removeEventListener("visibilitychange", considerShowing);
      document.removeEventListener("focusin", onFormInteraction);
      document.removeEventListener("input", onFormInteraction);
    };
  }, [closed, dismissedRef]);

  function dismiss() {
    dismissedRef.current = true;
    setClosed(true);

    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Dismissal must still work without access to browser storage.
    }
  }

  if (!visible || closed) return null;

  return (
    <aside
      aria-labelledby="enquiry-prompt-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") dismiss();
      }}
      className="relative mx-4 mt-6 mb-24 rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-lg lg:fixed lg:bottom-16 lg:left-6 lg:z-30 lg:m-0 lg:w-80"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Luk kontaktforslag"
        className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <h2
        id="enquiry-prompt-title"
        className="pr-9 text-lg leading-snug font-bold tracking-heading"
      >
        Hvor kan AI spare jer tid?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Få en gratis, uforpligtende afklaring med Alexander.
      </p>
      <Link
        href="/kontakt#booking"
        onClick={dismiss}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
      >
        Få en gratis AI-afklaring
      </Link>
    </aside>
  );
}

export default function PopupPhone() {
  const pathname = usePathname();
  const dismissedRef = useRef(false);
  const page = pathname.split("/")[1];

  if (page === "kontakt" || page === "ai-guide") return null;

  // A new route starts its own reading timer without losing dismissal state.
  return <EnquiryPrompt key={pathname} dismissedRef={dismissedRef} />;
}
