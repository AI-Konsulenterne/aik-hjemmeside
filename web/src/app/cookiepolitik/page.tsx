import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";
import CookieDeclaration from "@/components/ui/CookieDeclaration";

export const metadata: Metadata = {
  title: "Cookiepolitik",
  description:
    "AI Konsulenterne's cookiepolitik. Få overblik over cookies på hjemmesiden, og hvordan du styrer dit samtykke.",
  alternates: { canonical: "/cookiepolitik" },
  robots: { index: true, follow: true },
};

export default function Cookiepolitik() {
  return (
    <LegalLayout title="Cookiepolitik" lastUpdated="april 2026">
      <h2>Hvad er en cookie?</h2>
      <p>
        En cookie er en lille tekstfil, der lagres i din browser. Cookies bruges
        til at siden kan huske dine valg, til statistik, og til at forbedre din
        oplevelse.
      </p>

      <h2>Vores brug af cookies</h2>
      <p>
        Vi bruger kun cookies der er strengt nødvendige for sidens funktion,
        samt, hvis du giver samtykke, cookies til statistik og marketing.
      </p>

      <h3>Nødvendige cookies</h3>
      <p>
        Disse bruges uden samtykke (de er forudsætningen for at siden kan
        fungere):
      </p>
      <ul>
        <li>
          <strong>Session cookies</strong>: huske tilstand mellem sideskift
        </li>
        <li>
          <strong>Cookie consent</strong>: gemme dit cookie-valg
        </li>
      </ul>

      <h3>Statistik-cookies (kræver samtykke)</h3>
      <ul>
        <li>
          <strong>Google Analytics (GA4)</strong>: hjælper os med at forstå
          hvordan siden bruges. IP anonymiseres.
        </li>
      </ul>

      <h3>Marketing-cookies (kræver samtykke)</h3>
      <ul>
        <li>
          <strong>Cal.com</strong>: bruges når du åbner booking-kalenderen
        </li>
      </ul>

      <h2>Aktuel cookie-liste på hjemmesiden</h2>
      <p>
        Listen nedenfor opdateres automatisk af vores consent-system
        (Cookiebot). Her ser du præcis hvilke cookies der bruges, deres formål
        og levetid.
      </p>
      <div className="not-prose my-6">
        <CookieDeclaration />
      </div>

      <h2>Sådan styrer du dine cookies</h2>
      <p>
        Du kan til enhver tid ændre eller trække dit samtykke tilbage via
        cookie-banneret nederst på siden. Du kan også slette cookies i din
        browser:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/da-dk/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/da/kb/rydde-cookies-og-website-data-firefox"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
      </ul>

      <h2>Kontakt</h2>
      <p>
        Har du spørgsmål til vores cookiepolitik? Skriv til{" "}
        <a href="mailto:kontakt@ai-konsulenterne.dk">
          kontakt@ai-konsulenterne.dk
        </a>
        .
      </p>
    </LegalLayout>
  );
}
