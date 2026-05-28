"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "./Button";

const serviceLinks = [
  { label: "Skræddersyede AI-løsninger", href: "/skraeddersyede-ai" },
  { label: "AI Workshop", href: "/workshop" },
  { label: "VisionAI", href: "/visionai" },
];

const navLinks = [
  { label: "Cases", href: "/cases" },
  { label: "Hjælp til AI", href: "/ai-guide" },
  { label: "Viden om AI", href: "/viden-om-ai" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative">
            <span className="text-[2rem] lg:text-[2.4rem] font-bold leading-none text-primary">AI</span>
            <span className="absolute bottom-[-4px] left-0 w-full h-[3px] rounded-full bg-primary" />
          </span>
          <span className="text-sm lg:text-base font-bold tracking-[0.1em] text-primary uppercase">Konsulenterne</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Ydelser dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className="text-sm font-semibold text-black/60 hover:text-black transition-colors flex items-center gap-1"
            >
              Ydelser
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-popup-in" role="menu">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-5 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-black/60 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="sm" href="/kontakt" cal>
            Book møde
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col px-6 py-6 gap-1">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 mt-1">
              Ydelser
            </p>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-black/70 hover:text-black py-2 pl-3"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-3" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-black/70 hover:text-black py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="primary"
              href="/kontakt"
              className="mt-4 w-full text-center"
            >
              Book møde
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
