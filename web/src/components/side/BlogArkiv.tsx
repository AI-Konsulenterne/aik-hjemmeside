"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { dato, type Indlaeg } from "@/content/blog";

/**
 * Arkivet på /viden-om-ai: alle indlæg som rækker, med filtre øverst.
 *
 * Indlæggene har sjældent et billede, så kort med tomme
 * billedfelter (før: en orange gradient med et gnist-ikon) er skiftet ud
 * med en redaktionel liste: dato, titel og uddrag, kategori og læsetid.
 * Filtrene er kun de kategorier, der faktisk har indlæg.
 */
export default function BlogArkiv({ indlaeg, filtre = true }: { indlaeg: Indlaeg[]; filtre?: boolean }) {
  const [valgt, setValgt] = useState<string | null>(null);

  const kategorier = useMemo(() => {
    const t = new Map<string, number>();
    for (const i of indlaeg) if (i.kategori) t.set(i.kategori, (t.get(i.kategori) ?? 0) + 1);
    return [...t.entries()].sort((a, b) => b[1] - a[1]);
  }, [indlaeg]);

  const synlige = valgt ? indlaeg.filter((i) => i.kategori === valgt) : indlaeg;

  const chip = (aktiv: boolean) =>
    `rounded-full px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
      aktiv ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div>
      {filtre && kategorier.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrér efter emne">
          <button type="button" className={chip(valgt === null)} aria-pressed={valgt === null} onClick={() => setValgt(null)}>
            Alle <span className="ml-1 tabular-nums opacity-60">{indlaeg.length}</span>
          </button>
          {kategorier.map(([k, n]) => (
            <button key={k} type="button" className={chip(valgt === k)} aria-pressed={valgt === k} onClick={() => setValgt(k)}>
              {k} <span className="ml-1 tabular-nums opacity-60">{n}</span>
            </button>
          ))}
        </div>
      )}

      <ol className={`border-t border-gray-200 ${filtre && kategorier.length > 1 ? "mt-10" : ""}`}>
        {synlige.map((i) => (
          <li key={i.slug} className="border-b border-gray-200">
            <Link
              href={`/viden-om-ai/${i.slug}`}
              className="group grid gap-2 py-7 transition-colors sm:grid-cols-12 sm:gap-8 lg:py-8"
            >
              <p className="text-sm tabular-nums text-gray-500 sm:col-span-2 sm:pt-1.5">{dato(i.dato, true)}</p>
              <div className="sm:col-span-8">
                <h3 className="text-[clamp(1.25rem,2vw,1.625rem)] font-bold leading-snug tracking-heading text-gray-900">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1.5px]">
                    {i.titel}
                  </span>
                </h3>
                {i.uddrag && <p className="mt-2 line-clamp-2 max-w-[70ch] text-[0.975rem] leading-relaxed text-gray-600">{i.uddrag}</p>}
              </div>
              <p className="flex items-center gap-2 text-sm text-gray-600 sm:col-span-2 sm:flex-col sm:items-end sm:gap-1 sm:pt-1.5 sm:text-right">
                {i.kategori && <span className="font-semibold text-gray-900">{i.kategori}</span>}
                {i.minutter && <span className="tabular-nums">{i.minutter} min</span>}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
