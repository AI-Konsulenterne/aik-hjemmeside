"use client";

import { Fragment, useEffect, useRef } from "react";

type Props = {
  as?: "h2" | "h3";
  id?: string;
  className?: string;
  children: string;
};

/**
 * En overskrift, der rejser sig ord for ord, første gang den kommer ind på
 * skærmen. Hvert ord glider op bag en usynlig kant med lidt forsinkelse
 * efter det forrige.
 *
 * Teksten står fremme fra serveren. Først når JavaScript kører, og
 * overskriften ligger under folden, sættes data-ord="skjult"; så står den
 * der altid uden JavaScript, og den blinker ikke, hvis den allerede er på
 * skærmen. Ingen React-state: tilstanden skrives direkte på elementet.
 * Selve bevægelsen ligger i globals.css under ".ord".
 *
 * Skærmlæsere læser den som almindelig tekst: ordene står i spans med
 * rigtige mellemrum imellem.
 */
export default function OrdForOrd({ as = "h2", id, className = "", children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.ord = "skjult";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.ord = "vist";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.ord;
    };
  }, []);

  const ord = children.split(" ");
  const Tag = as;
  return (
    <Tag ref={ref} id={id} className={className}>
      {ord.map((o, i) => (
        <Fragment key={i}>
          <span className="ord">
            <span style={{ "--i": i } as React.CSSProperties}>{o}</span>
          </span>
          {i < ord.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
