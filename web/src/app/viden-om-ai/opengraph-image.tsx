import { renderOgImage } from "@/lib/og-template";

export const alt = "Viden om AI — AI Guides til danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Viden",
    title: "Viden om AI",
    subtitle:
      "Praktiske AI-guides og indsigter til danske virksomheder. Ingen buzzwords.",
  });
}
