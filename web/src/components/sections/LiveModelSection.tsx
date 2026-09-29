import FadeIn from "@/components/ui/FadeIn";
import ForecastTile from "@/components/ui/ForecastTile";
import InboxTile from "@/components/ui/InboxTile";
import LiveModel from "@/components/ui/LiveModel";

/**
 * Tre modeller, lige under filmen.
 *
 * Første udgave var én spiral. Den var ægte, men den var abstrakt: to
 * farver der bliver skilt ad siger ikke en direktør noget om hans indbakke.
 * Mobbin viste mønsteret hos dem der tør mest (SpaceXAI, ElevenLabs,
 * Retool): under heroen står ikke én demo, men en væg af levende
 * produktflader, og hver af dem løser noget genkendeligt.
 *
 * Så nu er der tre, og alle tre regner i browseren mens man kigger:
 *
 *   Forudsiger   Holt-Winters på otte ugers henvendelser. Slår "samme dag
 *                sidste uge" med 5,6% mod 7,1% fejl, målt på uger den
 *                ikke har set.
 *   Sorterer     Naive Bayes trænet på fyrre mails. Er den under halvt
 *                sikker, går mailen til et menneske. Den tager fejl én gang
 *                ud af tolv, og det står der.
 *   Lærer        Spiralen. 337 vægte der starter tilfældigt.
 *
 * Fliserne har hver deres format, fordi indholdet har det: tid er vandret,
 * så prognosen får hele bredden; en indbakke er en liste; spiralen er
 * kvadratisk data.
 *
 * Lamperne: husets regel er én tændt lampe pr. sektion. Her kan der lyse
 * tre, og det er med vilje — hver er status for sin egen proces, og de
 * lyser kun mens der faktisk regnes. Derfor er der heller ingen lampe ved
 * overskriften; den ville ikke betyde noget.
 */

const fliser = {
  forudsiger: {
    h: "Den forudsiger.",
    p: "Hvor mange henvendelser får I på mandag? Den har set otte uger og har selv lært at mandage er travle og weekender stille. Båndet er hvor sikker den er, og det bliver bredere jo længere frem den ser.",
    note: "Syntetiske data. Holt-Winters med ugentlig sæson.",
  },
  sorterer: {
    h: "Den sorterer.",
    p: "Hvilken mail skal hvem have? Den har set fyrre eksempler. Er den under halvt sikker, gætter den ikke. Så går mailen til et menneske.",
    note: "Eksempelmails. Naive Bayes, trænet på 40 mails.",
  },
  laerer: {
    h: "Den lærer.",
    p: "Og sådan bliver en model til: 337 tal der starter tilfældigt og retter sig selv, indtil de kan kende to spiraler fra hinanden.",
    note: "Neuralt net, 2 → 16 → 16 → 1.",
  },
};

function Billedtekst({ h, p, note }: { h: string; p: string; note: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-xl font-bold tracking-heading text-gray-900">{h}</h3>
      <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-gray-600">{p}</p>
      <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gray-600">{note}</p>
    </div>
  );
}

export default function LiveModelSection() {
  return (
    <section className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="amber-cast amber-cast-soft left-1/2 top-[-16rem] h-[46rem] w-[46rem] -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <p className="kicker text-gray-600">Kører nu, i din browser</p>

          {/* To sætninger, to linjer, og hele bredden til dem. I en halv
              spalte brækkede første sætning selv, så "Det er AI." endte på
              tredje linje og pointen mistede sin rytme. */}
          <h2 className="mt-8 text-[clamp(2.1rem,4.6vw,4.25rem)] font-bold leading-[1.0] tracking-display text-gray-900">
            <span className="block">Det her er ikke billeder af AI.</span>
            <span className="block">Det er AI.</span>
          </h2>
          <div className="mt-8 lg:ml-auto lg:max-w-[46ch]">
            <p className="max-w-[46ch] text-base leading-relaxed text-gray-600">
              Tre små modeller regner lige nu, mens du kigger. Ingen video,
              intet optaget, og der bliver ikke sendt noget nogen steder hen.
              Tallene i bunden af hver flade er aflæst på modellen. De
              skifter, fordi den regner forfra.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:mt-20 lg:grid-cols-12">
          <FadeIn className="lg:col-span-12">
            <Billedtekst {...fliser.forudsiger} />
            <ForecastTile />
          </FadeIn>

          <FadeIn delay={80} className="flex flex-col lg:col-span-5">
            <Billedtekst {...fliser.sorterer} />
            <div className="flex-1">
              <InboxTile />
            </div>
          </FadeIn>

          <FadeIn delay={160} className="flex flex-col lg:col-span-7">
            <Billedtekst {...fliser.laerer} />
            <div className="flex-1">
              <LiveModel />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <p className="mt-16 max-w-[62ch] border-t border-gray-200 pt-8 text-base leading-relaxed text-gray-600">
            Jeres opgave er hverken to spiraler eller tolv eksempelmails. Men
            mekanikken er den samme. Forskellen er hvad man giver den at
            kigge på, og det er den svære del.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
