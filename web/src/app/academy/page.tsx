import type { Metadata } from "next";
import AcademyLanding from "@/components/sections/AcademyLanding";
import JsonLd from "@/components/ui/JsonLd";

const academySchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI kursus og AI-uddannelse til virksomheder",
  description:
    "Online AI-kursus og AI-uddannelse for danske virksomheder. Lær ChatGPT, Microsoft Copilot og Claude gennem korte videoer, konkrete use cases og et community.",
  provider: {
    "@type": "Organization",
    name: "AI Konsulenterne",
    sameAs: "https://ai-konsulenterne.dk",
  },
  inLanguage: "da",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT2H",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    category: "Subscription",
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: { absolute: "AI kursus & AI-uddannelse til virksomheder | AIK Academy" },
  description:
    "AI kursus og AI-uddannelse til virksomheder - online og i øjenhøjde. Lær ChatGPT, Copilot og Claude med korte videoer, konkrete use cases og et community.",
  alternates: { canonical: "/academy" },
  keywords: [
    "AI kursus",
    "AI uddannelse",
    "AI kursus online",
    "AI kursus for virksomheder",
    "AI kursus københavn",
    "generativ AI kursus",
    "AIK Academy",
  ],
  openGraph: {
    title: "AI kursus & AI-uddannelse til virksomheder | AIK Academy",
    description:
      "AI kursus og AI-uddannelse til virksomheder - online og i øjenhøjde. Lær ChatGPT, Copilot og Claude med korte videoer og konkrete use cases.",
    url: "/academy",
  },
};

export default function Academy() {
  return (
    <>
      <JsonLd data={academySchema} />
      <AcademyLanding />
    </>
  );
}
