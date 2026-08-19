import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import AgentConsole from "@/components/ui/AgentConsole";

/**
 * Kundecasen — og sidens eneste stykke software.
 *
 * Den gamle udgave var to afrundede chatbobler på hvid med skygge under.
 * Den *påstod* at agenten fandtes: to færdige replikker, ingen bevægelse,
 * ingen mekanik. Det er præcis den generiske AI-æstetik vi ellers holder os
 * fra, og det var det tætteste siden kom på at vise et produkt.
 *
 * Her kører agenten i stedet, og man kan klikke sig videre i den.
 *
 * Sektionen er hvid og konsollen mørk. Det er med vilje: en mørk flade på
 * hvidt læses som en overflade man kigger ind i, ikke som en illustration
 * på siden.
 *
 * Bag konsollen ligger skæret fra lampen, og under den en enkelt blød
 * ambient skygge. Huset bruger streger frem for skygger, og det gælder
 * stadig for kort — men det her er ikke et kort. Det er sidens ene
 * produktflade, og uden lys og vægt lå den som et hul i papiret i stedet
 * for som noget der ligger ovenpå.
 *
 * Layoutet er tre celler, ikke to kolonner. På bred skærm står historien i
 * venstre spalte og konsollen i højre over begge rækker. På smal skærm
 * falder de i kildeorden, og det er derfor overskriften er sin egen celle:
 * så kommer konsollen umiddelbart efter den i stedet for efter hele
 * historien og et sektionsafsluttende link.
 *
 * Tallene under er væk. De sagde "Datasikker" og "Frigjort tid" sat i
 * displaygrad, og det er ikke resultater, det er ord. I stedet står der
 * hvad der konkret er bygget, og hver linje kan holdes op mod noget vi
 * allerede siger andre steder på siden.
 */

const spec = [
  {
    k: "Vidensbase",
    v: "Lavazzas egne HR-dokumenter, ikke en generel model",
  },
  {
    k: "Hvert svar",
    v: "Peger tilbage til det afsnit det kom fra",
  },
  {
    k: "Data",
    v: "Bliver ikke brugt til at træne modeller",
  },
];

export default function CaseHighlight() {
  return (
    <section className="grid-field section-y relative overflow-hidden">
      {/* Lampens skær, placeret bag konsollen. */}
      <div
        aria-hidden="true"
        className="amber-cast amber-cast-soft right-[-10%] top-[8%] hidden h-[46rem] w-[46rem] lg:block"
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10 xl:gap-x-20">
          {/* --- Overskriften --- */}
          <FadeIn className="lg:col-start-1 lg:row-start-1">
            <p className="kicker text-gray-600">Kundecase, Lavazza</p>
            <h2 className="mt-8 max-w-[19ch] text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-display text-gray-900">
              HR-agenten der svarer, så medarbejderne{" "}
              <span className="text-primary">ikke skal</span>
            </h2>
          </FadeIn>

          {/* --- Agenten, mens den arbejder --- */}
          <FadeIn
            delay={120}
            className="lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <div className="lg:sticky lg:top-32">
              <AgentConsole />
              <p className="mt-5 max-w-[52ch] text-xs leading-relaxed text-gray-600">
                Eksempel på forløbet. Selve agenten kører hos Lavazza på deres
                egne dokumenter.
              </p>
            </div>
          </FadeIn>

          {/* --- Historien --- */}
          <FadeIn delay={60} className="lg:col-start-1 lg:row-start-2">
            <p className="max-w-[46ch] text-base leading-relaxed text-gray-500">
              Lavazzas HR-afdeling brugte for mange timer på at besvare de
              samme spørgsmål igen og igen. Feriedage, barsel, tillæg,
              opsigelsesvarsler. Svarene stod allerede i personalehåndbogen,
              men ingen gad lede efter dem.
            </p>

            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-gray-500">
              Så vi byggede en agent oven på deres egne dokumenter. Den finder
              afsnittet, svarer på dansk, og skriver hvor svaret kom fra. Er
              der ikke dækning i dokumenterne, siger den det i stedet for at
              gætte.
            </p>

            {/* Specifikation, ikke nøgletal. Vi har ikke målte resultater
                fra Lavazza, og opdigtede procenter er værre end ingen. */}
            <dl className="mt-10 border-t border-gray-200">
              {spec.map((s) => (
                <div
                  key={s.k}
                  className="grid grid-cols-[7.5rem_1fr] gap-x-6 border-b border-gray-200 py-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {s.k}
                  </dt>
                  <dd className="text-[0.9rem] leading-snug text-gray-600">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div className="mt-14 border-t border-gray-200 pt-8">
            <Link
              href="/cases"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-primary"
            >
              Se alle kundehistorier
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-precise group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
