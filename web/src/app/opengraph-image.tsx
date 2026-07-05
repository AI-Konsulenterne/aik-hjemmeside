import { renderOgImage } from "@/lib/og-template";

export const alt =
  "AI Konsulenterne — Skræddersyede AI-løsninger til danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "AI-konsulenthus",
    title: "Skræddersyede AI-løsninger til danske virksomheder",
    subtitle:
      "Vi bygger AI-løsninger også til dem uden IT-afdeling, intern AI-viden eller idé om hvor de skal starte.",
  });
}
