"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Den faste genvej til at booke eller ringe.
 *
 * CLAUDE.md kræver den på alle sider, og den bliver. Men den lå før som en
 * sort bjælke hen over bunden af heroen fra første sekund: den skar
 * kundelinjen over, og dens orange knap var den anden orange knap i samme
 * synsfelt. En eksklusiv side råber ikke "ring nu" før man har set den.
 *
 * Nu kommer den frem når man har scrollet forbi første skærm, og kun på
 * telefoner og tablets, som en smal bjælke der er nem at ramme med
 * tommelfingeren. På en stor skærm lå den som en pille nederst til højre,
 * men den dækkede kortenes tekst og demoerne, og den gentog bare
 * navigationen: den er fast i toppen og har både bookingknappen og
 * telefonnummeret.
 */
export default function BottomBar() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const tjek = () => setVis(window.scrollY > window.innerHeight * 0.7);
    tjek();
    window.addEventListener("scroll", tjek, { passive: true });
    window.addEventListener("resize", tjek);
    return () => {
      window.removeEventListener("scroll", tjek);
      window.removeEventListener("resize", tjek);
    };
  }, []);

  return (
    <div
      aria-hidden={!vis}
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out lg:hidden ${
        vis ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-gray-900/95 px-4 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 text-white backdrop-blur-md">
        <a
          href="tel:+4525547074"
          tabIndex={vis ? 0 : -1}
          className="flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <span className="hidden sm:inline">+45 25 54 70 74</span>
          <span className="sm:hidden">Ring til Alexander</span>
        </a>
        <Link
          href="/kontakt"
          tabIndex={vis ? 0 : -1}
          className="rounded-full bg-primary px-4 py-2 text-[0.8125rem] font-semibold text-black transition-colors hover:bg-primary-dark"
        >
          Book en samtale
        </Link>
      </div>
    </div>
  );
}
