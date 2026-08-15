"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

function formatNumber(n: number): string {
  return n.toLocaleString("da-DK", { maximumFractionDigits: 0 });
}

export default function ValueCalculator() {
  const [employees, setEmployees] = useState(100);
  const [hourValue, setHourValue] = useState(350);
  const [minutesPerWeek, setMinutesPerWeek] = useState(15);

  const hoursPerYear = Math.round((employees * minutesPerWeek * 52) / 60);
  const valuePerYear = Math.round(hoursPerYear * hourValue);

  const sliders: {
    label: string;
    value: number;
    display: string;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
  }[] = [
    {
      label: "Antal medarbejdere",
      value: employees,
      display: formatNumber(employees),
      min: 5,
      max: 1000,
      step: 5,
      onChange: setEmployees,
    },
    {
      label: "Værdi pr. arbejdstime",
      value: hourValue,
      display: `${formatNumber(hourValue)} kr.`,
      min: 150,
      max: 1000,
      step: 25,
      onChange: setHourValue,
    },
    {
      label: "Minutter sparet pr. medarbejder pr. uge",
      value: minutesPerWeek,
      display: `${minutesPerWeek} min.`,
      min: 5,
      max: 60,
      step: 5,
      onChange: setMinutesPerWeek,
    },
  ];

  return (
    <div className="rounded-[24px] border border-gray-200 bg-white overflow-hidden shadow-[0_30px_60px_-40px_rgba(0,0,0,.25)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Inputs */}
        <div className="p-8 lg:p-10 flex flex-col gap-8">
          {sliders.map((s) => (
            <label key={s.label} className="block">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-[15px] font-semibold text-gray-900">
                  {s.label}
                </span>
                <span className="text-[15px] font-bold text-primary tabular-nums">
                  {s.display}
                </span>
              </span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.onChange(Number(e.target.value))}
                className="mt-3 w-full h-1.5 rounded-full appearance-none bg-gray-200 cursor-pointer"
                style={{ accentColor: "#ff9a00" }}
              />
            </label>
          ))}
        </div>

        {/* Resultat */}
        <div className="relative overflow-hidden bg-gray-900 text-white p-8 lg:p-10 flex flex-col justify-center">
          <div
            className="pointer-events-none absolute -top-[140px] -right-[100px] w-[320px] h-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,154,0,.18), transparent 62%)",
            }}
            aria-hidden="true"
          />
          <span className="relative text-xs font-bold tracking-[0.22em] uppercase text-primary">
            Potentiel værdi pr. år
          </span>
          <p className="relative text-4xl lg:text-5xl font-bold tracking-tight mt-3 tabular-nums">
            {formatNumber(valuePerYear)} kr.
          </p>
          <p className="relative text-[15px] text-gray-400 mt-3">
            Svarer til cirka {formatNumber(hoursPerYear)} arbejdstimer om året.
          </p>
          <div className="relative mt-7">
            <Button variant="primary" cal>
              Få en 30 min. demo
            </Button>
          </div>
        </div>
      </div>
      <p className="px-8 lg:px-10 py-4 border-t border-gray-100 text-[13px] text-gray-400 italic">
        Beregningen er et illustrativt regneeksempel og er ikke en garanti for
        besparelsen.
      </p>
    </div>
  );
}
