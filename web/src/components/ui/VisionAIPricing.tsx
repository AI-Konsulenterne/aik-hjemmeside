"use client";

import { useState } from "react";
import Button from "./Button";

// Pris pr. bruger pr. måned + inkluderet forbrug pr. bruger
const PER_USER_PRICE = 150; // kr/md
const TOKENS_PER_USER = 3; // mio.
const SEARCHES_PER_USER = 200;
const STORAGE_PER_USER = 1.2; // GB

export default function VisionAIPricing() {
  const [users, setUsers] = useState(25);

  const total = users * PER_USER_PRICE;
  const tokens = Math.round(users * TOKENS_PER_USER);
  const searches = (users * SEARCHES_PER_USER).toLocaleString("da-DK");
  const storage = Math.round(users * STORAGE_PER_USER);

  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-8 lg:p-10 max-w-3xl mx-auto">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <label
          htmlFor="vai-users"
          className="text-sm font-semibold text-gray-900"
        >
          Antal medarbejdere
        </label>
        <span className="text-2xl font-bold tracking-heading text-gray-900">
          {users}
        </span>
      </div>

      <input
        id="vai-users"
        type="range"
        min={10}
        max={150}
        step={5}
        value={users}
        onChange={(e) => setUsers(Number(e.target.value))}
        className="w-full mt-4 accent-primary cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>10</span>
        <span>150</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
        {[
          { label: "Tokens inkl.", value: `${tokens} mio.` },
          { label: "Søgninger inkl.", value: searches },
          { label: "Hukommelse inkl.", value: `${storage} GB` },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
              {item.label}
            </p>
            <p className="text-base font-bold text-gray-900 mt-0.5">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-gray-500">Total pris pr. måned</p>
          <p className="text-3xl lg:text-4xl font-bold tracking-heading text-primary">
            {total.toLocaleString("da-DK")} kr
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {PER_USER_PRICE} kr pr. bruger
          </p>
        </div>
        <Button variant="primary" href="/kontakt" cal>
          Kom i gang
        </Button>
      </div>
    </div>
  );
}
