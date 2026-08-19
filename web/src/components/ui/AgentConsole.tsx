"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Agenten, mens den arbejder.
 *
 * Siden solgte AI uden at vise software én eneste gang. Den gamle udgave var
 * to afrundede chatbobler på hvid — den *påstod* at agenten fandtes. Det her
 * viser den gøre arbejdet: spørgsmålet skrives, den slår op i virksomhedens
 * egne dokumenter, kilderne kommer frem, svaret streamer ind, og kilden står
 * under. Det er den faktiske rækkefølge i en RAG-agent, så der er ikke pyntet
 * på noget.
 *
 * Man kan klikke sig videre. En løkke er en illustration; noget man kan pille
 * ved er et produkt, og det er hele forskellen på at påstå og at vise.
 *
 * Det fjerde spørgsmål er med vilje et den ikke kan svare på. Det er det
 * eneste sted på siden hvor man kan se hvad den gør, når der ikke er dækning
 * i dokumenterne — og for en teknisk køber er det et vigtigere argument end
 * de tre der lykkes.
 *
 * Orange er status, ikke pynt — præcis som lampen: den lyser mens der
 * faktisk kører noget, og går ud når svaret står færdigt.
 *
 * Kører kun mens den er synlig, og står på det færdige svar hvis brugeren
 * har slået bevægelse fra.
 */

type Exchange = {
  id: string;
  q: string;
  /** Tom betyder: ingen dækning i dokumenterne. */
  sources: string[];
  answer: string;
  /** null når der ikke er noget at henvise til. */
  cite: string | null;
};

const EXCHANGES: Exchange[] = [
  {
    id: "ferie",
    q: "Hvor mange feriedage har jeg tilbage?",
    sources: [
      "Personalehåndbog.pdf",
      "Ferieaftale_2024.docx",
      "Overenskomst §12",
    ],
    answer:
      "Du har 12 feriedage tilbage i indeværende ferieår. Op til 5 af dem kan overføres til næste år, hvis du aftaler det skriftligt med din leder inden 31. december.",
    cite: "Personalehåndbog, afsnit 4.2",
  },
  {
    id: "varsel",
    q: "Hvor langt er mit opsigelsesvarsel?",
    sources: ["Ansaettelseskontrakt.pdf", "Funktionaerloven §2"],
    answer:
      "Du er omfattet af funktionærloven. Med tre til fem års anciennitet er varslet fire måneder til udgangen af en måned. Din anciennitet står i kontraktens afsnit 1.",
    cite: "Ansættelseskontrakt, afsnit 7",
  },
  {
    id: "sygedag",
    q: "Kan jeg holde fri på mit barns første sygedag?",
    sources: ["Personalehåndbog.pdf", "Overenskomst §31"],
    answer:
      "Ja. Du har ret til fri med løn på barnets første og anden sygedag, hvis barnet er under 14 år. Giv din leder besked inden arbejdsdagen begynder.",
    cite: "Personalehåndbog, afsnit 6.4",
  },
  {
    id: "loen",
    q: "Hvad tjener min kollega i marketing?",
    sources: [],
    answer:
      "Det kan jeg ikke svare på. Lønoplysninger ligger ikke i de dokumenter jeg har adgang til, og jeg gætter ikke. Spørg HR, hvis du har brug for at vide det.",
    cite: null,
  },
];

type Phase = "spoerg" | "soeg" | "kilder" | "svar" | "hvile";

/** Hvor længe hver fase varer. Skrive- og streamehastighed er i ms pr. tegn. */
const TYPE_MS = 42;
const STREAM_MS = 16;
const SEARCH_MS = 1100;
const SOURCE_MS = 260;
const REST_MS = 4200;

/* Samme bredde på al brødtekst i panelet. Højdereservationen nedenfor bygger
   på at det streamede svar bryder præcis som den usynlige fuldtekst. */
const COL = "max-w-[52ch] text-[0.95rem] leading-relaxed sm:text-base";

export default function AgentConsole() {
  const [ex, setEx] = useState(0);
  const [phase, setPhase] = useState<Phase>("spoerg");
  const [typed, setTyped] = useState(0);
  const [shownSources, setShownSources] = useState(0);
  const [streamed, setStreamed] = useState(0);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Én kæde af timere driver hele forløbet. Den ryddes helt ved hvert skift,
     så to kæder aldrig kan køre oven i hinanden — hverken når man scroller
     væk, eller når man klikker på et andet spørgsmål midt i et svar. */
  useEffect(() => {
    if (reduced || !active) return;
    const cur = EXCHANGES[ex];
    let stopped = false;

    setPhase("spoerg");
    setTyped(0);
    setShownSources(0);
    setStreamed(0);

    const typeStep = (i: number) => {
      if (stopped) return;
      setTyped(i);
      if (i < cur.q.length) later(() => typeStep(i + 1), TYPE_MS);
      else later(search, 420);
    };

    const search = () => {
      if (stopped) return;
      setPhase("soeg");
      later(sources, SEARCH_MS);
    };

    const sources = () => {
      if (stopped) return;
      setPhase("kilder");
      cur.sources.forEach((_, i) =>
        later(() => setShownSources(i + 1), i * SOURCE_MS)
      );
      later(answer, cur.sources.length * SOURCE_MS + 320);
    };

    const answer = () => {
      if (stopped) return;
      setPhase("svar");
      const streamStep = (i: number) => {
        if (stopped) return;
        setStreamed(i);
        if (i < cur.answer.length) later(() => streamStep(i + 1), STREAM_MS);
        else {
          setPhase("hvile");
          later(() => setEx((n) => (n + 1) % EXCHANGES.length), REST_MS);
        }
      };
      streamStep(0);
    };

    typeStep(0);
    return () => {
      stopped = true;
      clearTimers();
    };
  }, [ex, active, reduced]);

  const cur = EXCHANGES[ex];
  /* Uden bevægelse: vis det færdige svar med det samme. */
  const done = reduced || phase === "hvile";
  const q = done ? cur.q : cur.q.slice(0, typed);
  const a = done ? cur.answer : cur.answer.slice(0, streamed);
  const srcCount = done ? cur.sources.length : shownSources;
  const working = !done && (phase === "soeg" || phase === "kilder" || phase === "svar");
  const searching = !done && phase === "soeg";
  /* Opslagslinjen står tom indtil den har slået op — ellers ville den røbe
     resultatet mens spørgsmålet stadig skrives. */
  const showLookup = done || phase !== "spoerg";
  const foundLabel = cur.sources.length
    ? `${cur.sources.length} kilder fundet`
    : "ingen dækning fundet";

  return (
    <div ref={rootRef}>
      {/* Hjørnemærkerne sidder uden for panelet, på det hvide, som
          pasmærker på en teknisk tegning. Derfor ligger de på en wrapper
          og ikke på panelet selv. */}
      <div className="corner-marks relative">
        <div
          className="panel-lit border border-white/12 bg-[#0d0f11]"
          aria-hidden="true"
        >
        {/* Topbjælke */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5 sm:px-7">
          <span className="lamp" data-lit={working ? "true" : "false"} />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
            HR-agent
          </p>
          <p className="ml-auto font-mono text-[0.7rem] tracking-wide text-white/60">
            {working ? "arbejder" : "klar"}
          </p>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          {/* Spørgsmålet. Alle fire ligger usynligt i samme celle, så panelet
              har den højde det længste kræver — også når det skifter. */}
          <div className="grid grid-cols-[1rem_1fr] gap-x-3">
            <span className="mt-[0.35rem] font-mono text-xs text-white/60">
              &gt;
            </span>
            <div className="grid">
              {EXCHANGES.map((e) => (
                <p
                  key={e.id}
                  className={`invisible col-start-1 row-start-1 ${COL}`}
                >
                  {e.q}
                </p>
              ))}
              <p className={`col-start-1 row-start-1 text-white/85 ${COL}`}>
                {q}
                {!done && phase === "spoerg" && <Caret />}
              </p>
            </div>
          </div>

          {/* Opslaget. Kildechips fylder forskelligt fra spørgsmål til
              spørgsmål — tre stykker mod ingen — og på en smal skærm bryder
              de oveni. Derfor står alle sæt usynligt i samme celle: så har
              feltet den højde det bredeste sæt kræver, ved enhver bredde,
              og panelet skifter uden at rykke. */}
          <div className="mt-6 border-l border-white/10 pl-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
              {showLookup
                ? searching
                  ? "søger i jeres dokumenter…"
                  : foundLabel
                : "\u00a0"}
            </p>
            <div className="mt-3 grid">
              {EXCHANGES.map((e) => (
                <div
                  key={e.id}
                  className="invisible col-start-1 row-start-1 flex flex-wrap gap-2"
                >
                  {e.sources.map((s) => (
                    <SourceChip key={s} name={s} />
                  ))}
                </div>
              ))}
              <div className="col-start-1 row-start-1 flex flex-wrap content-start gap-2">
                {cur.sources.slice(0, srcCount).map((s) => (
                  <SourceChip key={s} name={s} />
                ))}
              </div>
            </div>
          </div>

          {/* Svaret. Samme højdereservation som spørgsmålet. */}
          <div className="mt-6 grid">
            {EXCHANGES.map((e) => (
              <p key={e.id} className={`invisible col-start-1 row-start-1 ${COL}`}>
                {e.answer}
              </p>
            ))}
            <p className={`col-start-1 row-start-1 text-white ${COL}`}>
              {a}
              {!done && phase === "svar" && <Caret />}
            </p>
          </div>

          {/* Kildelinjen står der altid, tom indtil svaret er færdigt. En
              min-height duer ikke: den regnes inklusive padding, så feltet
              voksede 14 px i det øjeblik linjen kom, og hele panelet med. */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="font-mono text-[0.7rem] leading-none tracking-wide text-white/55">
              {!done
                ? "\u00a0"
                : cur.cite
                  ? `Kilde: ${cur.cite}`
                  : "Ingen kilde. Den svarer ikke uden dækning."}
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Spørgsmålene er rigtige knapper — det er dem der gør panelet til noget
          man kan pille ved i stedet for en film der kører. */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gray-500">
          Prøv selv
        </span>
        {EXCHANGES.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEx(i)}
            aria-pressed={i === ex}
            className={`border px-3 py-1.5 text-[0.8rem] leading-none transition-colors duration-200 ${
              i === ex
                ? "border-gray-900 text-gray-900"
                : "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
            }`}
          >
            {e.q}
          </button>
        ))}
      </div>

      {/* Hele forløbet i tekst, til skærmlæsere og søgemaskiner. Selve panelet
          er aria-hidden, fordi tegn-for-tegn-streaming er ubrugeligt at få
          læst højt. */}
      <ul className="sr-only">
        {EXCHANGES.map((e) => (
          <li key={e.id}>
            Spørgsmål: {e.q} Kilder:{" "}
            {e.sources.length ? e.sources.join(", ") : "ingen dækning i dokumenterne"}.
            Svar: {e.answer} {e.cite ? `Kilde: ${e.cite}.` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourceChip({ name }: { name: string }) {
  return (
    <span className="border border-white/15 px-2.5 py-1 font-mono text-[0.7rem] text-white/70">
      {name}
    </span>
  );
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-primary" />
  );
}
