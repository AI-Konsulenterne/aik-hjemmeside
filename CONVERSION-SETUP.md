# Conversion measurement

## Contact enquiries

The form at `/kontakt#booking` uses `/api/contact` and the site's existing Resend account. It sends a single plain-text enquiry to Alexander, with the visitor's email as Reply-To. It does not subscribe the visitor to marketing, create a calendar booking, or add a CRM record.

Before deployment, verify these server-side hosting variables without placing secrets in GitHub:

- `RESEND_API_KEY`: the existing Resend key used by the AI analysis route.
- `CONTACT_FROM_EMAIL` (optional): a verified sender. Defaults to `ANALYSE_FROM_EMAIL`, then `AI Konsulenterne <analyse@ai-konsulenterne.dk>`.
- `ALEXANDER_EMAIL` (optional): recipient. Defaults to `alexander@ai-konsulenterne.dk`.

The endpoint returns an error when delivery is unconfigured, rejected, timed out, or missing a provider receipt. A successful response means Resend accepted the message; it does not prove inbox delivery. Confirm one real receipt with the business before considering delivery verified end to end. No real email was sent during development tests.

The existing AI-analysis form's “Ring mig op” option now requires a telephone number. The number is included in Alexander's email and the existing lead summary. Both normal report generation and the manual-follow-up fallback require Resend to accept the internal email before the form confirms the request. If the customer report cannot be sent, the form says Alexander will follow up rather than claiming a report was delivered. This is a callback request, not a scheduled appointment. Verify this path with one controlled inbox receipt as well; mocked tests do not verify production credentials or inbox delivery.

Retrying the same form content reuses a submission ID, supplied to Resend as an idempotency key. The handler validates input, bounds request size, checks browser origins, includes a honeypot, and limits submissions per process. Configure a matching proxy/edge rate limit on `POST /api/contact` before public rollout; the in-memory limiter is not shared between instances or persistent over restarts. Only trust client-IP headers written by the deployment proxy.

## Enquiry events

`trackLeadConversion("contact")` is called only after the contact endpoint confirms that the email provider accepted the enquiry. A click, a validation error, or a failed delivery must not call this helper. Existing newsletter and guide events retain their names; they are not automatically promoted to sales enquiries.

The helper sends GA4 `generate_lead` with a static form identifier after explicit Cookiebot **statistics** consent. Mark that event as a key event in the GA4 property to report enquiries. Phone and email clicks remain `phone_click` / `email_click` intent events, with no phone number or email address in their payloads.

## Optional ChatGPT Ads measurement

The OpenAI integration stays off while `NEXT_PUBLIC_OPENAI_PIXEL_ID` is blank. Before enabling it:

1. Create or choose the website's conversion source in the correct Ads Manager account. Use its **Pixel ID**, not its source ID or an API key.
2. Check the source's **automatic advanced matching** setting. OpenAI documents that it can read and hash customer information from forms, and sources created through the Ads API enable it automatically. This website does not supply user information in tracking calls. Keep the Pixel ID blank unless automatic advanced matching is confirmed disabled for this source. The current public SDK documentation provides no client-side switch to disable it; do not invent one. If this cannot be configured, resolve it with OpenAI before activation.
3. Set `NEXT_PUBLIC_OPENAI_PIXEL_ID` in the hosting environment and rebuild the site. Keep preview deployments unset. Verify Cookiebot's marketing category and the website's privacy/cookie information reflect the enabled measurement.
4. Configure an Ads Manager conversion event using the standard event **`lead_created`**, connect this source, and attach the event to the intended campaign. Installing website code alone does not perform those account steps.
5. Validate a controlled, consented submission and confirm receipt in Ads Manager's event diagnostics. Then inspect attributed reporting with eligible traffic. No production lead or test conversion was sent as part of these code changes.

The SDK is requested only after explicit **marketing** consent. Consent is initialized as denied before Pixel initialization, then synchronized with Cookiebot. Withdrawing consent sends `oaiq("consent", false)` and stops subsequent lead events. Events from before consent, or while the SDK is still loading, are dropped and never replayed. Ad blockers, denied consent, and SDK load failures can therefore lower measured counts.

The only explicit Pixel event payload is `lead_created` with `{ type: "customer_action" }`. No form values, email addresses, telephone numbers, or names are supplied. OpenAI's SDK handles ad-click/browser identifiers after consent. There is no server-side Conversions API integration and no duplicate event sent from the server.

If a Content Security Policy is added later, use OpenAI's documented CDN and collection origins rather than broad wildcard permissions.

## Local checks

From `web/`, on Node 22.18+ or Node 24, run `node --experimental-strip-types --test tests/*.test.mjs`. Tests use in-memory stand-ins for the SDK, script elements and email provider: no ad events, emails, or requests reach external services.

Official references, checked 25 September 2026:

- [OpenAI Measurement Pixel](https://developers.openai.com/ads/measurement-pixel)
- [OpenAI supported events](https://developers.openai.com/ads/supported-events)
- [OpenAI conversion setup](https://developers.openai.com/ads/api-reference/conversion-setup)
- [GA4 recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead)
- [Google privacy controls](https://developers.google.com/tag-platform/security/guides/privacy)
- [Cookiebot developer reference](https://www.cookiebot.com/en/developer/)
