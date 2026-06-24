import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import CookieConsentLink from "./CookieConsentLink";

const serviceLinks = [
  { label: "AI-strategi", href: "/ai-strategi" },
  { label: "Skræddersyede AI", href: "/skraeddersyede-ai" },
  { label: "AIK Workshop", href: "/workshop" },
  { label: "AIK Workspace", href: "/visionai" },
  { label: "AIK Academy", href: "/academy" },
];

const solutionLinks = [
  { label: "AI til kundeservice", href: "/ai-kundeservice" },
  { label: "AI i HR", href: "/ai-i-hr" },
  { label: "AI til e-commerce", href: "/ai-i-e-commerce" },
];

const companyLinks = [
  { label: "Cases", href: "/cases" },
  { label: "Viden om AI", href: "/viden-om-ai" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Gratis AI-guide", href: "/ai-guide" },
];

const legalLinks = [
  { label: "Privatlivspolitik", href: "/privatlivspolitik" },
  { label: "Cookiepolitik", href: "/cookiepolitik" },
  { label: "Handelsbetingelser", href: "/handelsbetingelser" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-28 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-10 lg:gap-12">
          {/* Brand + Newsletter */}
          <div>
            <Image
              src="/logo-aik-mark.png"
              alt="AI Konsulenterne"
              width={153}
              height={89}
              className="h-10 w-auto"
            />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Vi bygger skræddersyede AI-løsninger til danske virksomheder.
            </p>
            <p className="mt-4 text-xs text-gray-500">CVR: 45569241</p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Ydelser
            </p>
            <nav className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4 mt-7">
              Løsninger
            </p>
            <nav className="flex flex-col gap-2.5">
              {solutionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Virksomhed */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Virksomhed
            </p>
            <nav className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter + kontakt */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Kort brief i indbakken
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              1-2 gange om måneden: praktiske AI-indsigter til danske SMV&apos;er.
              Ingen spam.
            </p>
            <NewsletterForm source="footer-newsletter" dark />

            <div className="mt-7 pt-6 border-t border-white/10 space-y-2.5 text-sm text-gray-400">
              <a
                href="tel:+4525547074"
                className="block hover:text-white transition-colors"
              >
                +45 25 54 70 74
              </a>
              <a
                href="mailto:kontakt@ai-konsulenterne.dk"
                className="block hover:text-white transition-colors"
              >
                kontakt@ai-konsulenterne.dk
              </a>
              <a
                href="https://www.linkedin.com/company/ai-konsulenterne"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} AI Konsulenterne. Alle rettigheder
              forbeholdes.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <CookieConsentLink className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60"
              aria-hidden="true"
            />
            Denne hjemmeside er bygget med AI
          </p>
        </div>
      </div>
    </footer>
  );
}
