import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

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
 * Nummerering kun hvor rækkefølgen betyder noget: trinnene er en sekvens,
 * citaterne er en mængde.
 *
 * Sektionen er mørk og har et filmstill bagved. Første udgave var ren
 * typografi på hvid, og den var for tom — tilbageholdenhed alene bliver
 * ikke til noget dyrt, den bliver bare til lidt. Siden gik desuden fra
 * mørk hero til fem hvide sektioner i træk uden pause. Stillet er kraftigt
 * nedtonet: det skal læses som rum bag teksten, ikke som et billede man
 * kigger på. Det er workshop-skuddet, fordi sektionen handler om hvordan
 * vi arbejder, og fordi det deler grade med filmen ovenfor.
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
    <section className="grid-field grid-field-dark section-y relative overflow-hidden bg-ink">
      {/* Rum, ikke motiv. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/film/workshop.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* --- Venstre: bliver stående mens trinnene ruller --- */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="lamp" data-lit="true" aria-hidden="true" />
                <p className="kicker text-white/60">Sådan arbejder vi</p>
              </div>

              <h2 className="mt-8 max-w-[15ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-white">
                Det svære er ikke AI. Det er at vide hvor man starter.
              </h2>

              <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-white/55">
                Vi hører de samme fem sætninger i næsten hvert eneste første
                møde:
              </p>

              {/* Citaterne er en mængde, ikke en rækkefølge, så de har ingen
                  numre. Svarene er skåret væk: de fem trin til højre er svaret. */}
              <ul className="mt-7 space-y-3">
                {heard.map((q) => (
                  <li
                    key={q}
                    className="border-l border-white/20 pl-5 text-[0.95rem] leading-snug text-white/60"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>

              {/* Tallet sat som et tal. Et kort med ramme og skygge ville gøre
                  det til pynt; sat stort er det et argument. */}
              <div className="mt-12 border-t border-white/15 pt-8">
                <p className="text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none tracking-display tabular-nums text-white">
                  80<span className="text-primary">%</span>
                </p>
                <p className="mt-4 max-w-[36ch] text-[0.95rem] leading-relaxed text-white/55">
                  af AI-projekter leverer ikke den værdi virksomheden
                  forventede. Dobbelt så høj fejlrate som almindelige
                  IT-projekter. Det er derfor vi arbejder som vi gør.
                </p>
                <p className="mt-3 text-xs tracking-wide text-white/55">
                  RAND, 2024
                </p>
              </div>
            </div>
          </FadeIn>

          {/* --- Højre: trinnene. Her betyder rækkefølgen noget. --- */}
          <div>
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 70}>
                <div className="grid grid-cols-[3rem_1fr] gap-x-6 border-t border-white/12 py-9 first:border-t-0 first:pt-0 lg:grid-cols-[4rem_1fr] lg:py-11">
                  <span className="text-sm font-semibold tabular-nums text-white/65">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug tracking-heading text-white lg:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-[54ch] text-[0.95rem] leading-relaxed text-white/55">
                      {s.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={400}>
              <div className="border-t border-white/12 pt-9 lg:pt-11">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
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
