import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description:
    "AI Konsulenterne's privatlivspolitik. Læs hvordan vi behandler dine persondata i overensstemmelse med GDPR.",
  alternates: { canonical: "/privatlivspolitik" },
  robots: { index: true, follow: true },
};

export default function Privatlivspolitik() {
  return (
    <LegalLayout
      title="Privatlivspolitik"
      lastUpdated="oktober 2026"
    >
      <h2>1. Dataansvarlig</h2>
      <p>
        AI Konsulenterne ApS (CVR: 45569241) er dataansvarlig for behandlingen af
        personoplysninger indsamlet via denne hjemmeside.
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        Email: kontakt@ai-konsulenterne.dk
        <br />
        Telefon: +45 25 54 70 74
      </p>

      <h2>2. Hvilke data indsamler vi?</h2>
      <p>Vi indsamler følgende data, afhængigt af hvordan du bruger siden:</p>
      <ul>
        <li>
          <strong>Kontaktoplysninger</strong> (navn, email, telefon) - når du
          booker et møde, henter vores AI-guide, eller sender os en henvendelse
        </li>
        <li>
          <strong>Virksomhedsoplysninger</strong> (firmanavn, branche) - når du
          selv angiver dem
        </li>
        <li>
          <strong>Teknisk data</strong> (IP-adresse, browsertype,
          skærmstørrelse) - kun i vores hostingudbyders tekniske logs, som
          bruges til drift og sikkerhed
        </li>
        <li>
          <strong>Cookies</strong> - se vores cookiepolitik for detaljer
        </li>
      </ul>

      <h2>3. Formål med behandlingen</h2>
      <p>Vi behandler dine data til følgende formål:</p>
      <ul>
        <li>
          Besvare henvendelser og levere den ydelse du har bedt om (fx booking
          af møde)
        </li>
        <li>Udsendelse af nyhedsbrev og relevant materiale, hvis du har tilmeldt dig</li>
        <li>Forbedring af vores hjemmeside og ydelser</li>
        <li>Overholdelse af lovgivning (bogføringsloven m.fl.)</li>
      </ul>

      <h2>4. Retsgrundlag</h2>
      <p>
        Vi behandler dine persondata på baggrund af:
      </p>
      <ul>
        <li>
          <strong>Dit samtykke</strong> (GDPR art. 6, stk. 1, litra a) - fx
          ved tilmelding til nyhedsbrev
        </li>
        <li>
          <strong>Kontrakt</strong> (GDPR art. 6, stk. 1, litra b) - når du er
          kunde eller på vej til at blive det
        </li>
        <li>
          <strong>Legitim interesse</strong> (GDPR art. 6, stk. 1, litra f) -
          fx til driftsmæssige formål og sikkerhed
        </li>
      </ul>

      <h2>5. Opbevaring</h2>
      <p>
        Vi opbevarer dine data så længe det er nødvendigt for formålet. Typisk:
      </p>
      <ul>
        <li>Kundedata: op til 5 år efter sidste kontakt (bogføringsloven)</li>
        <li>Nyhedsbrev-tilmelding: indtil du framelder dig</li>
        <li>Kontaktformular: op til 12 måneder hvis du ikke bliver kunde</li>
      </ul>

      <h2>6. Videregivelse</h2>
      <p>
        Vi videregiver ikke dine personoplysninger til tredjepart, medmindre:
      </p>
      <ul>
        <li>
          Du har givet samtykke
        </li>
        <li>
          Vi har en lovmæssig forpligtelse
        </li>
        <li>
          Det sker til databehandlere der assisterer os (fx email-udbyder,
          hosting, CRM). Vi har databehandleraftaler med alle vores
          databehandlere.
        </li>
      </ul>

      <h2>7. Databehandlere</h2>
      <p>Vi bruger følgende databehandlere:</p>
      <ul>
        <li>
          <strong>Cal.com</strong> - booking af møder (EU-hosting)
        </li>
        <li>
          <strong>ActiveCampaign</strong> - email-marketing og CRM
        </li>
        <li>
          <strong>Cloudflare</strong> - CDN og sikkerhed
        </li>
        <li>
          <strong>Hetzner / Vercel</strong> - hosting af hjemmesiden
        </li>
      </ul>

      <h2>8. Dine rettigheder</h2>
      <p>Du har ret til:</p>
      <ul>
        <li>At få indsigt i hvilke data vi behandler om dig</li>
        <li>At få rettet forkerte data</li>
        <li>At få slettet dine data (retten til at blive glemt)</li>
        <li>At begrænse behandlingen</li>
        <li>Dataportabilitet</li>
        <li>At trække dit samtykke tilbage</li>
        <li>At klage til Datatilsynet (datatilsynet.dk)</li>
      </ul>
      <p>
        Skriv til <a href="mailto:kontakt@ai-konsulenterne.dk">kontakt@ai-konsulenterne.dk</a> hvis du vil udøve dine rettigheder.
      </p>

      <h2>9. Sikkerhed</h2>
      <p>
        Vi beskytter dine data via tekniske og organisatoriske
        sikkerhedsforanstaltninger: kryptering, adgangsbegrænsning, logning,
        regelmæssige sikkerhedsopdateringer og databehandleraftaler.
      </p>

      <h2>10. Ændringer</h2>
      <p>
        Vi kan opdatere denne politik. Nyeste version vises altid på denne side
        med dato øverst.
      </p>
    </LegalLayout>
  );
}
