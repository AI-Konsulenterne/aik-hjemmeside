"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PopupPhone() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("aik-popup-dismissed")) return;

    // Show popup after user has scrolled 50% of the page
    function onScroll() {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    }

    // Also show after 45 seconds as fallback (for users who read slowly)
    const timer = setTimeout(() => {
      setVisible(true);
      window.removeEventListener("scroll", onScroll);
    }, 45000);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    sessionStorage.setItem("aik-popup-dismissed", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-overlay-in"
      onClick={dismiss}
    >
      <div
        className="bg-black rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-popup-in relative grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Luk popup"
          className="absolute top-4 right-4 z-10 text-white hover:text-primary transition-colors"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left — Alexander portrait */}
        <div className="relative h-64 md:h-auto md:min-h-[440px] bg-black">
          <Image
            src="/team/alexander.png"
            alt="Alexander, AI-konsulent hos AI Konsulenterne"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right — copy + CTA */}
        <div className="p-8 lg:p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-heading text-primary leading-tight">
              Giv mig et kald og lad os starte jeres AI rejse
            </h2>
            <p className="mt-6 text-gray-300 leading-relaxed text-sm lg:text-base">
              Mit navn er Alexander! Jeg er AI-konsulent og vil rigtig gerne hjælpe jer med at komme i gang med AI. Lad os afklare jeres behov og finde et konkret forslag til næste skridt. Uforpligtende og lige til.
            </p>

            <div className="mt-6 space-y-2 text-sm lg:text-base">
              <p className="text-gray-300">
                <span className="font-semibold text-white">Telefonnummer:</span>{" "}
                <a
                  href="tel:+4525547074"
                  className="text-primary font-semibold hover:underline"
                >
                  +45 2554 7074
                </a>
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Email:</span>{" "}
                <a
                  href="mailto:alexander@ai-konsulenterne.dk"
                  className="text-primary font-semibold hover:underline break-all"
                >
                  alexander@ai-konsulenterne.dk
                </a>
              </p>
            </div>
          </div>

          <a
            href="tel:+4525547074"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-full px-6 py-3.5 text-base hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 w-full"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            Ring til Alexander
          </a>
        </div>
      </div>
    </div>
  );
}
