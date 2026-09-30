"use client";

import Script from "next/script";
import { useEffect } from "react";
import { startAnalytics } from "@/lib/analytics";

/**
 * Analytics + Consent Management
 *
 * Flow:
 *   1. Google Consent Mode v2 initialiseres med ALT denied (GDPR-safe default)
 *   2. Cookiebot loader — viser banner, venter på bruger-valg
 *   3. GA4 loader efter statistik-samtykke; OpenAI Pixel efter marketing-samtykke
 *   4. Tilbagetrækning stopper events. Tidligere afviste events afsendes ikke.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  const openaiPixelId = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID;

  useEffect(() => startAnalytics({ gaId, openaiPixelId }), [gaId, openaiPixelId]);

  return (
    <>
      {/* 1. Google Consent Mode v2 — SKAL loades før alt andet */}
      <Script id="gcm-default" strategy="beforeInteractive" data-cookieconsent="ignore">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
        `}
      </Script>

      {/* 2. Cookiebot — viser consent-banner og opdaterer Consent Mode automatisk */}
      {cookiebotId && (
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={cookiebotId}
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
      )}

    </>
  );
}
