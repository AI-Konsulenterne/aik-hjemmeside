import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Cookiepolitik",
  description:
    "AI Konsulenterne's cookiepolitik. Vi bruger ikke cookies til statistik eller marketing og viser derfor ikke et cookie-banner.",
  alternates: { canonical: "/cookiepolitik" },
  robots: { index: true, follow: true },
};

export default function Cookiepolitik() {
  return (
    <LegalLayout title="Cookiepolitik" lastUpdated="oktober 2026">
      <h2>Hvad er en cookie?</h2>
      <p>
        En cookie er en lille tekstfil, der lagres i din browser. Cookies kan
        bruges til at huske dine valg, til statistik og til marketing.
      </p>

      <h2>Vores brug af cookies</h2>
      <p>
        Vi bruger ikke cookies til statistik eller marketing, og vi følger dig
        ikke på tværs af andre hjemmesider. Derfor viser vi heller ikke et
        cookie-banner.
      </p>

      <h3>Det, der kan blive gemt i din browser</h3>
      <ul>
        <li>
          <strong>Sikkerhed</strong> — vores hostingudbyder (Vercel) kan sætte
          en teknisk nødvendig cookie, der beskytter siden mod misbrug.
        </li>
        <li>
          <strong>Lukket pop-up</strong> — lukker du vores pop-up, husker din
          browser det, indtil du lukker fanen. Det gemmes i browserens
          sessionStorage og ikke som en cookie.
        </li>
      </ul>

      <h3>Video fra YouTube</h3>
      <p>
        Videoen på vores side om AI-Minds hentes først fra YouTube
        (youtube-nocookie.com), når du trykker play. Herefter kan YouTube gemme
        oplysninger i din browser efter Googles egne regler.
      </p>

      <h2>Statistik</h2>
      <p>
        Vi bruger Google Search Console til at se, hvordan vores sider klarer
        sig i Googles søgeresultater. Det kræver ingen cookies på vores
        hjemmeside.
      </p>

      <h2>Sådan sletter du cookies</h2>
      <p>Du kan til enhver tid slette cookies og andre data i din browser:</p>
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
