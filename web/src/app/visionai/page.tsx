import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/ui/JsonLd";
import OrdForOrd from "@/components/ui/OrdForOrd";
import FAQ from "@/components/sections/FAQ";
import TalMedAlexander from "@/components/sections/TalMedAlexander";
import SektionHoved from "@/components/side/SektionHoved";
import { PrisBeregner, SynligSvar } from "@/components/side/Workspace";
import { Logo } from "@/components/sections/workspace/parts";
import { McpView } from "@/components/sections/workspace/WorkspaceInteractive";
import "./workspace.css";

export const metadata: Metadata = {
  title: "AIK Workspace - jeres eget AI-system",
  description:
    "AIK Workspace er jeres eget AI-system. Chat, agenter, vidensbase og styring i én platform - forankret i jeres data, GDPR-sikkert og med frit valg af AI-model.",
  alternates: { canonical: "/visionai" },
  keywords: [
    "AIK Workspace",
    "AI system virksomhed",
    "privat ChatGPT",
    "GDPR AI",
    "AI agenter",
    "AI platform dansk",
  ],
  openGraph: {
    title: "AIK Workspace - Jeres eget AI-system",
    description:
      "Jeres eget AI-system til hele virksomheden. Chat, agenter, vidensbase og styring i én platform - forankret i jeres data.",
    url: "/visionai",
  },
};


/**
 * AIK Workspace. Bygget om i forsidens sprog, men med produktet selv som
 * billede i stedet for filmen: heroen er mørk, og det rigtige dashboard
 * ligger bagover og retter sig op, mens man scroller (ren CSS, se
 * .ws-vindue i globals.css). Skærmen står halvt på den mørke og halvt på
 * den hvide flade, så heroen glider over i resten af siden.
 *
 * Derefter: platformen som bento (agenter, modeller, svar med kilde,
 * forbrug), integrationerne, datasikkerheden på mørk flade, én række pr.
 * afdeling med et eksempel på et spørgsmål, prisberegneren, FAQ og
 * Alexander.
 *
 * Fakta og priser er de samme som før: 150 kr. pr. bruger, data i
 * Microsoft Azure (EU), frit valg af model, i gang inden for få uger.
 * Forbruget i bentoen og HR-svaret er eksempler og siger det selv.
 */

const FAKTA: [string, string][] = [
  ["150 kr.", "pr. bruger om måneden"],
  ["Data i EU", "i Microsoft Azure"],
  ["Frit valg", "mellem ChatGPT, Claude og Gemini"],
  ["Få uger", "fra start til i brug"],
];

const MODELLER: [string, string, string][] = [
  ["claude", "Claude Opus 4.8", "anthropic/claude-opus-4-8"],
  ["chatgpt", "ChatGPT 5.5", "openai/gpt-5.5"],
  ["gemini", "Gemini 3.1 Pro", "google/gemini-3.1-pro"],
  ["gemini", "Nano Banana", "google/gemini-2.5-flash-image"],
  ["azure", "Azure OpenAI", "azure/gpt-5.5"],
];

/* Forbruget er et eksempel. Gråtoner i stedet for leverandørernes farver,
   så den lilla fra Gemini ikke sniger sig ind på siden. */
const FORBRUG_MODELLER: [string, string][] = [
  ["ChatGPT", "#171717"],
  ["Claude", "#525252"],
  ["Gemini", "#8f8f8f"],
  ["Azure", "#c9c9c9"],
];
const FORBRUG: [string, string, string, number, number[]][] = [
  ["Marketing", "2,00 mio.", "312 kr.", 100, [42, 30, 18, 10]],
  ["Salg og kundeservice", "1,45 mio.", "226 kr.", 73, [30, 45, 15, 10]],
  ["IT og support", "1,18 mio.", "184 kr.", 59, [24, 28, 20, 28]],
  ["HR og onboarding", "0,98 mio.", "153 kr.", 49, [35, 42, 13, 10]],
  ["Juridisk og compliance", "0,64 mio.", "100 kr.", 32, [18, 56, 16, 10]],
];

const SIKKERHED: [string, string][] = [
  ["Data i EU", "Europæisk hosting og fuld GDPR-compliance."],
  ["Datasuverænitet", "Jeres data bliver i Microsoft Azure (EU) og deles aldrig med OpenAI, Anthropic eller andre."],
  ["Kildestyring", "I vælger præcist, hvilke sites, biblioteker og postkasser der læses ind."],
  ["Kildehenvisning", "Alle svar har en kilde, så I altid kan tjekke, hvor de kommer fra."],
];

const AFDELINGER: [string, string, string][] = [
  ["HR og onboarding", "Onboarding, politikker og HR-svar på sekunder.", "Hvor mange feriedage har jeg tilbage?"],
  ["Salg og kundeservice", "Produkter, kontrakter og kundehistorik ét sted.", "Hvad aftalte vi med kunden sidst?"],
  ["Juridisk og compliance", "Søg i kontrakter, politikker og regler.", "Hvad er opsigelsesvarslet i leverandøraftalen?"],
  ["IT og support", "Selvbetjening til teknisk support og dokumentation.", "Hvordan sætter jeg VPN op på en ny pc?"],
  ["Marketing og kommunikation", "Genbrug indhold og skriv i samme tone hver gang.", "Skriv et udkast til nyhedsbrevet i vores tone."],
];

const FAQS = [
  {
    q: "Hvordan adskiller AIK Workspace sig fra ChatGPT?",
    a: "Det føles som ChatGPT, men det kender jeres virksomhed. Workspace svarer ud fra jeres egne dokumenter, processer og systemer, så svarene er præcise og passer til jer.",
  },
  {
    q: "Er vores data sikre?",
    a: "Ja. Jeres data bliver i Microsoft Azure (EU) under fuld GDPR-compliance og deles aldrig med tredjeparter som OpenAI eller Anthropic. I vælger selv præcist, hvilke kilder der læses ind.",
  },
  {
    q: "Hvad koster det?",
    a: "150 kr. pr. bruger om måneden. Tokens, søgninger og hukommelse er med i prisen, og der er ingen binding.",
  },
  {
    q: "Hvor lang tid tager det at komme i gang?",
    a: "De fleste virksomheder er i gang inden for få uger. Vi står for opsætning, integration og oplæring, og I skal ikke forberede noget.",
  },
  {
    q: "Hvilke systemer kan AIK Workspace kobles på?",
    a: "SharePoint, Microsoft 365, Slack, Salesforce, Visma, DeepL og mange flere via API. Kan I tilgå et system med en API, kan vi som regel forbinde det.",
  },
  {
    q: "Kan vi vælge forskellige AI-modeller?",
    a: "Ja. I vælger frit mellem ChatGPT, Claude, Gemini og Azure OpenAI og kan skifte model alt efter opgaven.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function Browserlinje({ adresse, mork = false }: { adresse: string; mork?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-4 py-3 ${
        mork ? "border-white/10 bg-[#141518]" : "border-black/[0.06] bg-gray-50"
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full ${mork ? "bg-white/15" : "bg-black/10"}`} />
      ))}
      <span
        className={`mx-auto rounded-md px-3 py-1 text-[0.6875rem] ${
          mork ? "bg-white/[0.06] text-white/70" : "bg-white text-gray-600 ring-1 ring-black/[0.05]"
        }`}
      >
        {adresse}
      </span>
      <span className="w-[3.25rem]" aria-hidden="true" />
    </div>
  );
}

export default function VisionAI() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* --- Hero: produktet selv --- */}
      <section aria-labelledby="ws-titel" className="relative -mt-16 overflow-x-clip bg-white lg:-mt-20">
        <div
          data-header="moerk"
          aria-hidden="true"
          className="absolute inset-x-0 top-0 bottom-[clamp(4.5rem,17vw,17rem)] bg-ink"
        />
        {/* Ét varmt lys over skærmen, som lampen i filmen. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[16rem] h-[28rem] w-[min(92rem,160vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,154,0,0.13),transparent)] lg:top-[24rem] lg:h-[44rem]"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-36 lg:px-8 lg:pt-44">
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker text-white/85">AIK Workspace</p>
          </div>
          <h1
            id="ws-titel"
            className="mt-6 text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.0] tracking-display text-white"
          >
            <span className="block">Føles som ChatGPT.</span>
            <span className="block">Kender jeres virksomhed.</span>
          </h1>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
              Jeres eget AI-system: chat, agenter og vidensbase samlet ét sted. Koblet på jeres
              systemer, og jeres data bliver i EU.
            </p>
            <div className="flex flex-none flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button href="/kontakt" size="lg">
                Book en demo
              </Button>
              <Button href="#priser" size="lg" variant="ghost">
                Beregn jeres pris
              </Button>
            </div>
          </div>

          <div className="ws-scene mt-16 lg:mt-24">
            <div className="ws-vindue overflow-hidden rounded-xl border border-white/10 bg-[#141518] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] lg:rounded-2xl">
              <Browserlinje adresse="workspace.ai-konsulenterne.dk" mork />
              <Image
                src="/screenshots/workspace-dashboard.png"
                alt="AIK Workspace: forsiden med chat, vidensbase og menuen til agenter, dokumenter og forbrug"
                width={2632}
                height={1616}
                priority
                sizes="(min-width: 1280px) 1216px, calc(100vw - 3rem)"
                className="block h-auto w-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Fakta under skærmen. De står uden for heroen, så de aldrig ender
          på den mørke flade, uanset hvor høj skærmen bliver. */}
      <div className="bg-white">
        <dl className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-6 sm:grid-cols-4 lg:mt-20 lg:px-8">
          {FAKTA.map(([vaerdi, label]) => (
            <div key={label} className="flex flex-col-reverse gap-1 border-t border-gray-200 pt-6">
              <dt className="text-sm leading-snug text-gray-600">{label}</dt>
              <dd className="text-[1.375rem] font-bold leading-none tracking-heading text-gray-900">{vaerdi}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* --- Platformen --- */}
      <section id="platform" className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Platformen"
            titel="Chat, agenter og viden. Ét sted."
            tekst="Hver afdeling får agenter med sin egen viden og rolle. Alle svar har en kilde, og I bestemmer selv, hvem der må bruge hvad."
          />

          <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
            {/* Agenter */}
            <FadeIn className="lg:col-span-8">
              <div className="relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-3xl bg-gray-50 ring-1 ring-black/[0.04]">
                <div className="p-8 lg:p-10">
                  <h3 className="text-2xl font-bold tracking-heading text-gray-900">Byg jeres egne agenter</h3>
                  <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-gray-600">
                    Agenter til salg, marketing, HR eller data, hver med sin egen viden og sin egen
                    rolle. De kender jeres forretning og er bygget til de opgaver, I sidder med.
                  </p>
                </div>
                <div className="mt-auto pl-8 lg:pl-10">
                  <div className="overflow-hidden rounded-tl-xl border-l border-t border-black/[0.07] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]">
                    <Image
                      src="/screenshots/workspace-agenter.png"
                      alt="Agenter i AIK Workspace: en agent pr. opgave, fx research, projekter og onboarding"
                      width={2626}
                      height={1232}
                      sizes="(min-width: 1280px) 780px, 90vw"
                      className="block h-auto w-[132%] max-w-none"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Modeller */}
            <FadeIn delay={100} className="lg:col-span-4">
              <div data-header="moerk" className="flex h-full flex-col rounded-3xl bg-ink p-8 text-white lg:p-10">
                <h3 className="text-2xl font-bold tracking-heading">Vælg den model, der passer</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/70">
                  Frit valg mellem ChatGPT, Claude, Gemini og Azure OpenAI. I bestemmer, hvem der må
                  bruge hvad.
                </p>
                <ul className="mt-8 space-y-2">
                  {MODELLER.map(([logo, navn, id], i) => (
                    <li
                      key={navn}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
                    >
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-white">
                        <Logo name={logo} size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.875rem] font-semibold leading-tight">{navn}</span>
                        <span className="block truncate font-mono text-[0.6875rem] text-white/50">{id}</span>
                      </span>
                      {i === 0 && <span className="text-[0.6875rem] text-white/60">Standard</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Svar med kilde */}
            <FadeIn className="lg:col-span-5">
              <div data-header="moerk" className="flex h-full flex-col rounded-3xl bg-ink p-8 text-white lg:p-10">
                <h3 className="text-2xl font-bold tracking-heading">Svar med kilde</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/70">
                  Saml dokumenter og vidensartikler ét sted. Hvert svar viser, hvor det kommer fra,
                  så I altid kan tjekke det.
                </p>
                <div className="mt-auto pt-8">
                  <SynligSvar />
                </div>
              </div>
            </FadeIn>

            {/* Forbrug */}
            <FadeIn delay={100} className="lg:col-span-7">
              <div className="flex h-full flex-col rounded-3xl bg-gray-50 p-8 ring-1 ring-black/[0.04] lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold tracking-heading text-gray-900">Fuldt overblik over forbruget</h3>
                    <p className="mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-gray-600">
                      Tokens og pris pr. afdeling og pr. model. Ingen overraskelser på regningen.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.75rem] text-gray-500">Eksempel, én måned</p>
                    <p className="mt-1 text-[1.75rem] font-bold leading-none tabular-nums tracking-display text-gray-900">975 kr.</p>
                    <p className="mt-1 text-[0.75rem] tabular-nums text-gray-600">6,25 mio. tokens</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                  {FORBRUG_MODELLER.map(([navn, farve]) => (
                    <span key={navn} className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: farve }} />
                      {navn}
                    </span>
                  ))}
                </div>
                <ul className="mt-5 space-y-3.5">
                  {FORBRUG.map(([afd, tokens, pris, fyld, dele]) => (
                    <li key={afd} className="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-4 text-[0.8125rem] sm:grid-cols-[minmax(0,11rem)_1fr_4.5rem_3.5rem]">
                      <span className="truncate font-semibold text-gray-900">{afd}</span>
                      <span className="h-2 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.04]">
                        <span className="flex h-full" style={{ width: `${fyld}%` }}>
                          {dele.map((d, i) => (
                            <span key={i} className="h-full" style={{ width: `${d}%`, background: FORBRUG_MODELLER[i][1] }} />
                          ))}
                        </span>
                      </span>
                      <span className="hidden text-right tabular-nums text-gray-600 sm:block">{tokens}</span>
                      <span className="text-right font-semibold tabular-nums text-gray-900">{pris}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Integrationer --- */}
      <section className="section-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Integrationer"
            titel="Koblet på det, I allerede bruger."
            tekst="SharePoint, Microsoft 365, Slack, Salesforce, Visma og flere. Kan I tilgå et system med en API, kan vi som regel forbinde det. Klik på en forbindelse og se, hvad den må."
          />
          <FadeIn delay={100} className="aik-ws mt-14 lg:mt-20">
            <McpView />
          </FadeIn>
        </div>
      </section>

      {/* --- Datasikkerhed --- */}
      <section id="sikkerhed" data-header="moerk" className="section-y bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            mork
            kicker="Datasikkerhed og GDPR"
            titel="Jeres data bliver hos jer."
            tekst="Workspace kører i Microsoft Azure i EU, og jeres data deles aldrig med OpenAI, Anthropic eller andre."
          />
          <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {SIKKERHED.map(([titel, tekst], i) => (
              <FadeIn key={titel} delay={i * 90}>
                <div className="border-t border-white/15 pt-6">
                  <p className="text-sm tabular-nums text-white/60">{String(i + 1).padStart(2, "0")}</p>
                  <dt className="mt-4 text-xl font-bold tracking-heading text-white">{titel}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-white/70">{tekst}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Afdelinger --- */}
      <section id="afdelinger" className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SektionHoved
            kicker="Brugsscenarier"
            titel="Én platform. En assistent til hver afdeling."
            tekst="Hver afdeling får sin egen assistent med netop deres data og arbejdsgange. Her er, hvad de typisk bliver spurgt om."
          />
          <ul className="mt-14 border-t border-gray-200 lg:mt-20">
            {AFDELINGER.map(([navn, tekst, fx], i) => (
              <li key={navn} className="border-b border-gray-200">
                <FadeIn delay={i * 60}>
                  <div className="grid gap-3 py-7 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-9">
                    <p className="text-sm tabular-nums text-gray-600 lg:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-bold leading-tight tracking-heading text-gray-900 lg:col-span-4">
                      {navn}
                    </h3>
                    <p className="text-[1rem] leading-relaxed text-gray-600 lg:col-span-3">{tekst}</p>
                    <p className="lg:col-span-4 lg:justify-self-end">
                      <span className="inline-block rounded-2xl rounded-br-md bg-gray-100 px-4 py-2.5 text-[0.9375rem] leading-snug text-gray-900">
                        {fx}
                      </span>
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Pris --- */}
      <section id="priser" className="section-y scroll-mt-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SektionHovedEnkel />
            </div>
            <FadeIn delay={150} className="lg:col-span-7">
              <PrisBeregner />
            </FadeIn>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} kicker="Spørgsmål om Workspace" titel="Det, vi oftest bliver spurgt om" />

      <TalMedAlexander
        kicker="Næste skridt"
        titel="Se AIK Workspace i brug."
        tekst="Book en demo, så viser Alexander platformen og hvordan den kan kobles på jeres systemer. Det forpligter ikke til noget."
        punkter={[
          ["Ingen binding", "Hverken på demoen eller på platformen."],
          ["Hurtig opsætning", "De fleste virksomheder er i gang inden for få uger."],
          ["GDPR-compliant", "Data i Microsoft Azure (EU), aldrig delt med andre."],
        ]}
        knap={{ label: "Book en demo", href: "/kontakt" }}
      />
    </>
  );
}

function SektionHovedEnkel() {
  return (
    <>
      <p className="kicker text-gray-600">Pris</p>
      <OrdForOrd className="mt-6 text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-display text-gray-900">
        150 kr. pr. bruger. Alt er med.
      </OrdForOrd>
      <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-gray-600">
        Tokens, søgninger og hukommelse er med i prisen. Træk i stregen og se, hvad det koster
        for jer.
      </p>
      <ul className="mt-8 space-y-2.5 text-[0.9375rem] text-gray-900">
        {["Ingen binding", "GDPR-compliant", "Hurtig opsætning"].map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}
