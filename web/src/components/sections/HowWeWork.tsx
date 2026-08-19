import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

/**
 * Sådan arbejder vi — én sektion, hvor der før var to.
 *
 * Barriers og ProblemSolution stod lige efter hinanden og sagde det samme:
 * "I ved ikke hvor I skal starte, det finder vi ud af." Den ene som
 * indvendinger, den anden som proces. Oveni siger heroen det nu også, så
 * pointen blev slået an tre gange på de første fire skærme.
 *
 * Her er de foldet sammen til den bevægelse de i virkeligheden er: først
 * hvad folk siger til os, så hvad vi gør ved det. Indvendingernes svar er
 * skåret væk — de var omskrivninger af de fem trin, og trinnene siger det
 * bedre.
 *
 * Visuelt: hårfine streger, ingen kasser, ingen skygger, ingen ikoner.
 * Nummerering kun hvor rækkefølgen betyder noget — trinnene er en sekvens,
 * citaterne er en mængde.
 */

const heard = [
  "Vi ved godt AI er vigtigt, men vi aner ikke hvor vi skal starte",
  "Vi har ingen AI-kompetencer in-house",
  "Vi ved ikke hvad vores første use case skal være",
  "Der er 100 AI-platforme — hvilken skal vi vælge?",
  "Vores medarbejdere kommer aldrig til at bruge det",
];

const steps = [
  {
    n: "01",
    title: "Vi finder ud af, hvor I står",
    body: "Vi afdækker, undersøger og finder ud af præcis hvor skoen trykker. Nogle gange ligger en konkret use case lige til højrebenet. Andre gange er første skridt en workshop, undervisning eller bare at få skabt et overblik.",
  },
  {
    n: "02",
    title: "Vi finder den løsning der passer til jer",
    body: "Her bliver det mere teknisk. Først definerer vi udfordringen og hvad formålet med løsningen er. Derefter afklarer vi det tekniske setup: hvordan jeres data skal håndteres, arkitekturen, og hvilke systemer der skal tale sammen.",
  },
  {
    n: "03",
    title: "Vi udvikler første version",
    body: "Vi kobler modellen sammen med jeres data og systemer og får teknikken til at spille. Vi lærer mest om produktet, når I får det i hænderne, så vi gør en dyd ud af at levere hurtigt og tilpasse undervejs.",
  },
  {
    n: "04",
    title: "Vi kigger på hvad der virker",
    body: "Når jeres medarbejdere er begyndt at bruge løsningen, ser vi sammen på hvad der rammer plet, og hvor der skal justeres. AI-løsninger er ikke perfekte fra starten.",
  },
  {
    n: "05",
    title: "Vi bliver hængende",
    body: "Når løsningen er i luften, forsvinder vi ikke. Vi drifter den sammen med jer, står klar med support, og er der når noget skal justeres eller bygges videre.",
  },
];

export default function HowWeWork() {
  return (
    <section className="section-y border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* --- Venstre: bliver stående mens trinnene ruller --- */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker">Sådan arbejder vi</p>
              </div>

              <h2 className="mt-8 max-w-[15ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Det svære er ikke AI. Det er at vide hvor man starter.
              </h2>

              <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-gray-600">
                Vi hører de samme fem sætninger i næsten hvert eneste første
                møde:
              </p>

              {/* Citaterne er en mængde, ikke en rækkefølge, så de har ingen
                  numre. Svarene er skåret væk: de fem trin til højre er svaret. */}
              <ul className="mt-7 space-y-3">
                {heard.map((q) => (
                  <li
                    key={q}
                    className="border-l border-black/15 pl-5 text-[0.95rem] leading-snug text-gray-500"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>

              {/* Tallet sat som et tal. Et kort med ramme og skygge ville gøre
                  det til pynt; sat stort er det et argument. */}
              <div className="mt-12 border-t border-black/10 pt-8">
                <p className="text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none tracking-display tabular-nums text-gray-900">
                  80<span className="text-primary">%</span>
                </p>
                <p className="mt-4 max-w-[36ch] text-[0.95rem] leading-relaxed text-gray-500">
                  af AI-projekter leverer ikke den værdi virksomheden
                  forventede. Dobbelt så høj fejlrate som almindelige
                  IT-projekter. Det er derfor vi arbejder som vi gør.
                </p>
                <p className="mt-3 text-xs tracking-wide text-gray-400">
                  RAND, 2024
                </p>
              </div>
            </div>
          </FadeIn>

          {/* --- Højre: trinnene. Her betyder rækkefølgen noget. --- */}
          <div>
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 70}>
                <div className="grid grid-cols-[3rem_1fr] gap-x-6 border-t border-black/10 py-9 first:border-t-0 first:pt-0 lg:grid-cols-[4rem_1fr] lg:py-11">
                  <span className="text-sm font-semibold tabular-nums text-gray-300">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug tracking-heading text-gray-900 lg:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-[54ch] text-[0.95rem] leading-relaxed text-gray-500">
                      {s.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={400}>
              <div className="border-t border-black/10 pt-9 lg:pt-11">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                >
                  Book en gratis AI-afklaring
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
        </div>
      </div>
    </section>
  );
}
