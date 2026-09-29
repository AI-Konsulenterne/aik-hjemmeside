import { renderOgImage } from "@/lib/og-template";

export const alt = "Kontakt AI Konsulenterne: book en gratis AI-afklaring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Kontakt",
    title: "Book en gratis AI-afklaring",
    subtitle:
      "45 minutter med Alexander. Ingen forberedelse, ingen forpligtelse, ingen salg.",
  });
}
