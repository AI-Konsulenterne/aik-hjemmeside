import { renderOgImage } from "@/lib/og-template";

export const alt = "AI Workshop for danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Workshop",
    title: "AI Workshop for virksomheder",
    subtitle:
      "Hands-on kursus i ChatGPT, prompt engineering og AI-værktøjer - så medarbejderne kan bruge AI fra dag 1.",
  });
}
