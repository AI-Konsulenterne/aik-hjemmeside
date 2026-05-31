import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BottomBar from "@/components/BottomBar";
import PopupPhone from "@/components/PopupPhone";
import Analytics from "@/components/Analytics";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Konsulent til Danske SMV'er | Skræddersyede AI-Løsninger — AI Konsulenterne",
    template: "%s — AI Konsulenterne",
  },
  description:
    "AI-konsulent for danske SMV'er. Vi bygger skræddersyede AI-løsninger — også uden intern AI-viden eller IT-afdeling. Gratis AI-afklaring. Finder vi ikke en mulighed, koster det ingenting.",
  metadataBase: new URL("https://ai-konsulenterne.dk"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI konsulent",
    "AI konsulenthus",
    "AI løsninger virksomhed",
    "skræddersyet AI",
    "AI til SMV",
    "AI rådgivning",
    "AI implementering Danmark",
    "AI automatisering",
    "kunstig intelligens virksomhed",
    "AI workshop",
  ],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://ai-konsulenterne.dk",
    siteName: "AI Konsulenterne",
    title: "AI Konsulent til Danske SMV'er | Skræddersyede AI-Løsninger",
    description:
      "Vi bygger skræddersyede AI-løsninger til danske SMV'er — også dem uden intern AI-viden eller IT-afdeling. Gratis AI-afklaring.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Konsulent til Danske SMV'er — AI Konsulenterne",
    description:
      "Skræddersyede AI-løsninger til danske SMV'er. Gratis AI-afklaring — ingen forpligtelse.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${raleway.variable} antialiased`}>
      <head>
        <Analytics />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Spring til indhold
        </a>
        <Header />
        <main id="main-content" className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <BottomBar />
        <ScrollToTop />
        <PopupPhone />
      </body>
    </html>
  );
}
