"use client";

import { useEffect, useRef } from "react";

/**
 * Cookiebot Cookie Declaration — auto-genereret liste over alle cookies
 * på hjemmesiden. Viser kategorier, cookie-navne, formål og opbevaringstid.
 *
 * Opdateres automatisk af Cookiebot når nye cookies scannes.
 */
export default function CookieDeclaration() {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cookiebotId || !containerRef.current) return;
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = `https://consent.cookiebot.com/${cookiebotId}/cd.js`;
    script.async = true;
    script.type = "text/javascript";
    containerRef.current.appendChild(script);
  }, [cookiebotId]);

  if (!cookiebotId) {
    return (
      <div className="bg-sand rounded-xl p-6 border border-gray-100 text-sm text-gray-500">
        Cookie-oversigten bliver tilgængelig når Cookiebot er konfigureret.
      </div>
    );
  }

  return <div ref={containerRef} className="cookie-declaration" />;
}
