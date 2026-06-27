import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BottomBar from "@/components/BottomBar";
import PopupPhone from "@/components/PopupPhone";
import TrackingEvents from "@/components/TrackingEvents";
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
    default: "AI konsulent til danske virksomheder | AI Konsulenterne",
    template: "%s | AI Konsulenterne",
  },
  description:
    "AI-konsulent og AI-rådgivning til danske virksomheder. Vi bygger AI-løsninger, der sparer jer tid - også uden intern AI-viden eller IT-afdeling. Gratis AI-afklaring, ingen forpligtelse.",
  metadataBase: new URL("https://ai-konsulenterne.dk"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI konsulent",
    "AI konsulenter",
    "AI rådgivning",
    "AI hjælp",
    "AI løsninger",
    "AI automatisering",
    "AI konsulenthus",
    "AI ekspert",
    "AI til virksomheder",
  ],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://ai-konsulenterne.dk",
    siteName: "AI Konsulenterne",
    title: "AI konsulent til danske virksomheder | AI Konsulenterne",
    description:
      "AI-konsulent og AI-rådgivning til danske virksomheder. Vi bygger AI-løsninger, der sparer jer tid. Gratis AI-afklaring, ingen forpligtelse.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI konsulent til danske virksomheder | AI Konsulenterne",
    description:
      "AI-rådgivning og AI-løsninger til danske virksomheder. Gratis AI-afklaring, ingen forpligtelse.",
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
        <TrackingEvents />
      </body>
    </html>
  );
}
