import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import OrdForOrd from "@/components/ui/OrdForOrd";
import LessonVideo from "@/components/sections/LessonVideo";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SideHero from "@/components/side/SideHero";
import SektionHoved from "@/components/side/SektionHoved";
import FilmKort, { type FilmKortData } from "@/components/side/FilmKort";

/**
 * AI-Minds, læringsplatformen. Den side AIK helst vil sælge fra.
 *
 * Før var siden bygget af en skabelon: neonhjerne, svævende kort,
 * centrerede afsnit og ikonfliser med orange ord i overskrifterne. Nu er
 * den bygget som forsiden: filmen i heroen (undervisningen, live og on
 * demand), store sætninger, og pensum som en liste ved siden af et kort,
 * der står stille med pris og knap, mens man læser (mønstret fra Sketch
 * og Webflow University på Mobbin).
 *
 * Alt indhold er det, siden sagde i forvejen, strammet op: 40+ moduler på
 * dansk, videoer under 15 minutter, live Q&A hver måned, forum med svar
 * inden for 24 timer, fra 249 kr. pr. medarbejder om måneden uden binding
 * (løbende måned + 1). Lektionen og "Se en rigtig lektion" er Nicholas'
 * fra main: køberen bliver på siden i stedet for at blive sendt til Skool.
 */

const SPOR = [
  {
    titel: "Grundlæggende AI",
    etiket: "Start her",
    tekst: "Hvordan AI fungerer, og hvad man kan bruge det til. Fundamentet, uden jargon.",
  },
  {
    titel: "Microsoft Copilot",
    etiket: "Værktøj",
    tekst: "Outlook, Teams, Word, Excel og PowerPoint. Konkrete opgaver, jeres folk kan bruge mandag morgen.",
  },
  {
    titel: "ChatGPT og Claude",
    etiket: "Værktøj",
    tekst: "Fra nybegynder til øvet i de to mest brugte assistenter, også til kode og design.",
  },
  {
    titel: "AI-sikkerhed",
    etiket: "Tryghed",
    tekst: "Hvad må man dele med en AI, og hvad skal blive internt? AI brugt trygt, uden at sætte data eller GDPR på spil.",
  },
];

const ADGANG = [
  "40+ moduler i fire spor",
  "Videoer under 15 minutter",
  "Alt på dansk",
  "Live Q&A med AIK-teamet hver måned",
  "Forum med svar inden for 24 timer",
  "Prompt-ark, skabeloner og tjeklister",
  "Nye moduler hver måned",
];

const FORMATER: FilmKortData[] = [
  {
    skud: "ondemand",
    etiket: "On demand",
    titel: "Når det passer jer",
    tekst: "Korte videoer, man ser, når der er tid. Hver lektion har prompt-ark og skabeloner med.",
  },
  {
    skud: "live",
    etiket: "Live",
    titel: "Live på skærmen",
    tekst: "En live Q&A hver måned, hvor jeres folk stiller spørgsmål direkte til AIK-teamet.",
  },
  {
    skud: "workshop",
    etiket: "Workshop",
    titel: "Ude hos jer",
    tekst: "En workshop bygget op om jeres egne opgaver, som start på forløbet eller når I vil videre.",
    link: { label: "Workshop hos jer", href: "/workshop" },
  },
];

const HVORFOR = [
  ["På dansk", "Hele platformen, alle videoer og alt materiale er på dansk og bygget til den måde, danske virksomheder arbejder på."],
  ["Konkret, ikke abstrakt", "Hver video viser en konkret opgave live på skærmen. Ingen slides om AI's potentiale."],
  ["Bygget til hverdagen", "Korte, praktiske videoer under 15 minutter. De passer ind i en kaffepause."],
  ["Et levende community", "En live Q&A hver måned og et forum, hvor I får svar inden for 24 timer."],
  ["Efter rolle", "Moduler til den enkeltes arbejde, fx som sælger eller marketingchef."],
  ["Værktøjer til hver lektion", "Prompt-ark, Excel-skabeloner og tjeklister, der bliver brugt længe efter, videoen er set."],
];

const SPOERGSMAAL = [
  {
    q: "Hvad koster det?",
    a: "Fra 249 kr. pr. medarbejder om måneden. Prisen afhænger af, hvor mange I er. Ring eller book et møde, så får I et konkret prisforslag.",
  },
  {
    q: "Hvor meget tid skal vi bruge på det?",
    a: "Læringen er bygget op fra A til Z, så I får det vigtigste først. Videoerne varer typisk under 15 minutter og passer ind i en kaffepause.",
  },
  {
    q: "Er vi bundet til noget?",
    a: "Nej. Det kører løbende måned plus én måned, så I kan opsige, når det passer jer.",
  },
  {
    q: "Bruger de det overhovedet bagefter?",
    a: "Det er derfor, det er korte videoer med rigtige opgaver og en live Q&A hver måned, i stedet for ét langt kursus, der er glemt ugen efter.",
  },
];

function Flueben() {
  return (
    <svg className="mt-[0.2rem] h-4 w-4 flex-none text-gray-900" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AcademyLanding() {
  return (
    <>
      <SideHero
        id="academy-titel"
        kicker="AI-Minds læringsplatform"
        titel={["Licenserne er købt.", "Nu skal de bruges."]}
        tekst="AI-Minds er vores læringsplatform på dansk. Korte videoer i Copilot, ChatGPT og Claude, en live Q&A hver måned og et forum, hvor jeres folk får svar."
        primaer={{ label: "Book en demo", href: "/kontakt" }}
        sekundaer={{ label: "Se en rigtig lektion", href: "#lektion" }}
        skud={["live", "ondemand"]}
        fakta={[
          ["40+", "moduler i fire spor"],
          ["Under 15 min.", "pr. video"],
          ["Dansk", "hele vejen igennem"],
          ["Fra 249 kr.", "pr. medarbejder om måneden"],
        ]}
      />

      {/* --- Problemet, som én sætning --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="kicker text-gray-600">Lyder det bekendt?</p>
          <FadeIn>
            <p className="mt-8 max-w-[34ch] text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-heading text-gray-900">
              I har købt licenserne og fortalt, at de findes.{" "}
              <span className="text-gray-500">
                Alligevel bliver de ikke brugt, for ingen har vist, hvad man konkret gør med dem.
              </span>{" "}
              AI-Minds viser det, opgave for opgave.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- Pensum og kortet, der står stille --- */}
      <section id="pensum" className="section-y scroll-mt-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="kicker text-gray-600">Det lærer jeres folk</p>
              <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
                Fire spor. Start dér, hvor I står.
              </OrdForOrd>
              <FadeIn delay={200}>
                <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-gray-600">
                  Start med Grundlæggende AI, eller gå direkte til det værktøj,
                  jeres folk bruger hver dag. Oftest er det Microsoft Copilot.
                </p>
              </FadeIn>

              <ol className="mt-12 border-t border-gray-200">
                {SPOR.map((s, i) => (
                  <li key={s.titel}>
                    <FadeIn delay={i * 80}>
                      <div className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-gray-200 py-7 sm:grid-cols-[4rem_1fr]">
                        <span className="pt-1 text-sm font-semibold tabular-nums text-gray-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-xl font-bold tracking-heading text-gray-900 lg:text-2xl">{s.titel}</h3>
                            <span className="rounded-full border border-gray-300 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gray-600">
                              {s.etiket}
                            </span>
                          </div>
                          <p className="mt-2 max-w-[52ch] text-[0.975rem] leading-relaxed text-gray-600">{s.tekst}</p>
                        </div>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ol>
              <FadeIn>
                <p className="mt-8 max-w-[52ch] text-[0.975rem] leading-relaxed text-gray-600">
                  Oven i sporene ligger moduler efter rolle, fx til sælgere og
                  marketingchefer, og der kommer nye til hver måned, også når
                  AI-landskabet rykker.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn className="lg:sticky lg:top-28">
                <aside className="rounded-3xl bg-white p-7 ring-1 ring-black/[0.06] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)] lg:p-9">
                  <div className="flex items-center gap-3">
                    <span className="lamp" data-lit="true" aria-hidden="true" />
                    <p className="kicker text-gray-600">AI-Minds</p>
                  </div>
                  <p className="mt-5 text-2xl font-bold tracking-heading text-gray-900">Det får I adgang til</p>
                  <ul className="mt-6 space-y-3">
                    {ADGANG.map((a) => (
                      <li key={a} className="flex gap-3 text-[0.975rem] leading-snug text-gray-700">
                        <Flueben />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <p className="text-[2.25rem] font-bold leading-none tracking-display text-gray-900">Fra 249 kr.</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      pr. medarbejder om måneden. Ingen binding: løbende måned plus én.
                    </p>
                  </div>
                  <div className="mt-7 flex flex-col gap-3">
                    <Button href="/kontakt" size="lg" className="w-full justify-center">
                      Book en demo
                    </Button>
                    <Link href="#lektion" className="group inline-flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-gray-900">
                      <span className="understreg">Se en rigtig lektion først</span>
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                    </Link>
                  </div>
                </aside>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- En rigtig lektion (fra main) --- */}
      <section id="lektion" data-header="moerk" className="section-y scroll-mt-20 bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            mork
            kicker="Direkte fra platformen"
            titel="Se en rigtig lektion."
            tekst="En lektion om prompting efter Microsofts anbefalinger, præcis som jeres medarbejdere møder den. Så kan I selv vurdere formatet, før vi taler sammen."
          />
          <FadeIn delay={150}>
            <div className="mx-auto mt-14 max-w-5xl lg:mt-20">
              <LessonVideo
                videoId="-MePqDXITi8"
                title="Prompting efter Microsofts anbefalinger - lektion fra AI-Minds"
                thumbnailSrc="/lektion-prompting.jpg"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Tre måder at lære på --- */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Tre måder at lære på"
            titel="Når det passer. Live. Eller ude hos jer."
            tekst="Platformen er kernen. Den live Q&A og workshoppen er der, når I har brug for et menneske i rummet."
          />
          <div className="mt-14 lg:mt-20">
            <FilmKort kort={FORMATER} />
          </div>
        </div>
      </section>

      {/* --- Hvorfor AI-Minds --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved kicker="Hvorfor AI-Minds" titel="AI-undervisning i øjenhøjde." />
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {HVORFOR.map(([t, s], i) => (
              <FadeIn key={t} delay={(i % 3) * 90}>
                <div className="border-t border-gray-300 pt-6">
                  <dt className="text-lg font-bold tracking-heading text-gray-900">{t}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-gray-600">{s}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Til ledelsen --- */}
      <section data-header="moerk" className="section-y bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="kicker text-white/60">Til ledelsen</p>
              <OrdForOrd className="mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-white">
                I skal ikke selv være AI-eksperter.
              </OrdForOrd>
            </div>
            <FadeIn delay={200} className="lg:col-span-6 lg:pt-14">
              <p className="text-[1.0625rem] leading-relaxed text-white/75">
                Det er hele pointen. I skal ikke drive det, holde oplæg eller
                svare på de svære spørgsmål. Vi tager jeres medarbejdere i hånden
                med korte videoer, en live Q&amp;A hver måned og et forum, de altid
                kan vende tilbage til. Og vi holder dem opdateret, når værktøjerne
                ændrer sig.
              </p>
              <p className="mt-10 border-l border-white/20 pl-6 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-snug tracking-heading text-white">
                AI går fra noget, folk skal mindes om, til noget, de bruger hver dag.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <FAQ items={SPOERGSMAAL} kicker="Spørgsmål om AI-Minds" titel="Det, vores kunder spørger om" />

      <TalMedAlexander
        kicker="Klar til at komme i gang?"
        titel="Se AI-Minds med Alexander."
        tekst="Vi viser jer platformen, taler om, hvad jeres team har brug for, og siger ærligt, om det er den rigtige løsning for jer."
        punkter={[
          ["30 minutter", "Vi viser jer AI-Minds live."],
          ["Jeres roller", "Hvilke moduler, der giver mening for netop jeres folk."],
          ["Et ærligt svar", "Passer det ikke til jer, siger vi det."],
        ]}
        knap={{ label: "Book en demo", href: "/kontakt" }}
      />
    </>
  );
}
