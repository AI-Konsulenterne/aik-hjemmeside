import type { Metadata } from "next";
import AcademyLanding from "@/components/sections/AcademyLanding";

export const metadata: Metadata = {
  title: "AIK Academy — AI-træning til danske SMV'er | AI-Konsulenterne",
  description:
    "I betaler allerede for AI - nu skal jeres folk bruge det. AIK Academy er vores online læringsunivers: korte videoer, konkrete use cases og et community. På dansk, i øjenhøjde.",
  alternates: { canonical: "/academy" },
  keywords: [
    "AI træning",
    "AI kursus dansk",
    "Copilot kursus",
    "ChatGPT kursus virksomhed",
    "AI læring SMV",
    "AIK Academy",
  ],
  openGraph: {
    title: "AIK Academy — AI-træning til danske SMV'er",
    description:
      "Et online læringsunivers for danske virksomheder. Lær Copilot, ChatGPT og Claude - på dansk, i øjenhøjde.",
    url: "/academy",
  },
};

export default function Academy() {
  return <AcademyLanding />;
}
