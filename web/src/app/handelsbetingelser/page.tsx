import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Handelsbetingelser",
  description:
    "Handelsbetingelser for AI Konsulenterne. Læs vilkår for vores ydelser, betalinger, fortrydelsesret og ansvar.",
  alternates: { canonical: "/handelsbetingelser" },
  robots: { index: true, follow: true },
};

export default function Handelsbetingelser() {
  return (
    <LegalLayout title="Handelsbetingelser" lastUpdated="april 2026">
      <h2>1. Virksomhedsoplysninger</h2>
      <p>
        AI Konsulenterne ApS
        <br />
        CVR: 45569241
        <br />
        Email: kontakt@ai-konsulenterne.dk
        <br />
        Telefon: +45 25 54 70 74
      </p>

      <h2>2. Ydelser</h2>
      <p>
        Vi leverer AI-konsulentydelser, herunder:
      </p>
      <ul>
        <li>Rådgivning og AI-afklaring</li>
        <li>Udvikling af skræddersyede AI-løsninger</li>
        <li>AI-workshops og uddannelse</li>
        <li>AIK Workspace - jeres eget AI-system til hele virksomheden</li>
      </ul>
      <p>
        Omfang, pris og leveringstid aftales skriftligt i hver enkelt aftale.
      </p>

      <h2>3. Aftaleindgåelse</h2>
      <p>
        En aftale indgås, når begge parter har accepteret tilbuddet skriftligt
        (fx via email eller digital underskrift). Første afklaringsmøde er
        gratis og uforpligtende.
      </p>

      <h2>4. Priser og betaling</h2>
      <p>
        Alle priser er i DKK og eksklusive moms, medmindre andet er oplyst.
        Betaling sker efter aftale — typisk delbetaling ved projektstart og
        restbeløb ved levering. Betalingsfrist er 8 dage netto fra
        fakturadato.
      </p>
      <p>
        Ved for sen betaling pålægges morarenter efter rentelovens
        bestemmelser samt rykkergebyr på 100 kr pr. rykker.
      </p>

      <h2>5. Fortrydelsesret</h2>
      <p>
        Fortrydelsesret gælder kun ved handel med private forbrugere. Da vi
        alene leverer til virksomheder (B2B), er der som udgangspunkt ingen
        fortrydelsesret.
      </p>

      <h2>6. Levering</h2>
      <p>
        Leveringstid oplyses i hvert enkelt tilbud. Vi forbeholder os retten
        til rimelige forsinkelser som følge af force majeure eller forhold
        uden for vores kontrol.
      </p>

      <h2>7. Immaterielle rettigheder</h2>
      <p>
        Kundedata og virksomhedsspecifikt materiale, som kunden leverer til
        os, forbliver kundens ejendom. Generelle metoder, frameworks og viden
        som AI Konsulenterne anvender i opgaveløsningen forbliver AI
        Konsulenternes ejendom.
      </p>
      <p>
        Skræddersyede AI-løsninger der udvikles til en specifik kunde
        overdrages til kunden ved fuld betaling, medmindre andet er aftalt.
      </p>

      <h2>8. Databehandling og GDPR</h2>
      <p>
        Når vi behandler personoplysninger på vegne af kunden, indgår vi en
        databehandleraftale. Vi overholder GDPR og databeskyttelsesloven.
      </p>

      <h2>9. Ansvar</h2>
      <p>
        Vores samlede ansvar er begrænset til det beløb kunden har betalt for
        den pågældende opgave i de seneste 12 måneder. Vi er ikke ansvarlige
        for indirekte tab, driftstab eller følgeskader.
      </p>

      <h2>10. Klager</h2>
      <p>
        Klager sendes til{" "}
        <a href="mailto:kontakt@ai-konsulenterne.dk">
          kontakt@ai-konsulenterne.dk
        </a>
        . Vi behandler klager hurtigst muligt — typisk inden for 5
        arbejdsdage.
      </p>

      <h2>11. Lovvalg og værneting</h2>
      <p>
        Aftaler er underlagt dansk ret. Eventuelle tvister skal afgøres ved
        byretten i København som første instans.
      </p>

      <h2>12. Ændringer</h2>
      <p>
        Vi kan ændre disse handelsbetingelser løbende. Den nyeste version
        vises altid på denne side med dato øverst.
      </p>
    </LegalLayout>
  );
}
