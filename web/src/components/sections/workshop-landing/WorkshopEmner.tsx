"use client";

import { useState } from "react";
import { Icon } from "./icons";

const EMNER: { id: string; label: string; icon: string; desc: string }[] = [
  {
    id: "start",
    label: "Kom godt i gang",
    icon: "sparkles",
    desc: "En rolig introduktion til, hvad AI kan og ikke kan - og hvordan I bruger det fornuftigt i hverdagen.",
  },
  {
    id: "prompting",
    label: "Prompting, der virker",
    icon: "message",
    desc: "Sådan beder I AI'en om det rigtige - så I får svar, I faktisk kan bruge, første gang.",
  },
  {
    id: "tekst",
    label: "Tekst og kommunikation",
    icon: "pencil",
    desc: "Mails, tilbud og opslag, der ellers tager tid - skrevet hurtigere, men stadig i jeres egen tone.",
  },
  {
    id: "ideer",
    label: "Idéer og planlægning",
    icon: "layout-grid",
    desc: "Brug AI som sparringspartner, når I skal i gang med en opgave og mangler det første udkast.",
  },
  {
    id: "kvalitet",
    label: "Kvalitet og fejl",
    icon: "shield-check",
    desc: "Hvornår kan I stole på svaret - og hvordan fanger I de steder, hvor AI tager fejl?",
  },
  {
    id: "gdpr",
    label: "GDPR og data",
    icon: "lock",
    desc: "Hvad I trygt kan dele, og hvad der skal blive internt - så I bruger AI uden at gå på kompromis med data.",
  },
  {
    id: "usecases",
    label: "Use cases",
    icon: "files",
    desc: "Vi finder de opgaver i jeres hverdag, hvor AI gør størst forskel - og prioriterer dem sammen.",
  },
  {
    id: "strategi",
    label: "AI i strategien",
    icon: "flag",
    desc: "Hvor AI passer ind på den lange bane - så det bliver en del af måden, I arbejder på, ikke et engangsforsøg.",
  },
];

export default function WorkshopEmner() {
  const [active, setActive] = useState(EMNER[0].id);
  const cur = EMNER.find((e) => e.id === active) || EMNER[0];
  return (
    <div className="emner-grid">
      <div>
        <div className="chip-rail" role="tablist" aria-label="Workshop-emner">
          {EMNER.map((e) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={active === e.id}
              className={"emne-chip" + (active === e.id ? " on" : "")}
              onClick={() => setActive(e.id)}
            >
              <Icon name={e.icon} /> {e.label}
            </button>
          ))}
        </div>
        <span className="chip-note">
          <Icon name="pencil" /> Beskrivelserne tilrettes sammen med jer
        </span>
      </div>

      <div className="emne-panel" role="tabpanel" aria-live="polite">
        <div className="emne-anim" key={cur.id}>
          <div className="icon-tile">
            <Icon name={cur.icon} />
          </div>
          <p className="emne-eyebrow">Emne</p>
          <h3>{cur.label}</h3>
          <p className="emne-desc">{cur.desc}</p>
        </div>
      </div>
    </div>
  );
}
