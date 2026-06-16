"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "./icons";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Vi ved ikke, hvor vi skal starte.",
    a: (
      <>
        Det er helt normalt - det er præcis det, første trin handler om. I
        behøver ikke have styr på det hele, før I ringer.
      </>
    ),
  },
  {
    q: "Hvad koster det?",
    a: (
      <>
        Det afhænger af opgaven. En skræddersyet løsning ligger typisk mellem{" "}
        <span className="ph">50.000 og 250.000 kr</span> - og I får altid et
        konkret bud, før der bliver bygget noget.
      </>
    ),
  },
  {
    q: "Hvor lang tid tager det?",
    a: (
      <>
        Det varierer med opgaven, men typisk ser I en første version inden for få
        uger. Vi bygger i korte spring, så I mærker forskellen tidligt - i stedet
        for at vente på ét stort projekt.
      </>
    ),
  },
];

export default function SkraeddersyedeFaq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div className={"faq-item" + (open === i ? " on" : "")} key={i}>
          <button
            className="faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {f.q}
            <span className="faq-icon">
              <Icon name="chevron-down" size={18} />
            </span>
          </button>
          <div className="faq-a-wrap">
            <div className="faq-a-inner">
              <p className="faq-a">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
