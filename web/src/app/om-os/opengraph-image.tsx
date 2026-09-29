import { renderOgImage } from "@/lib/og-template";

export const alt = "Om AI Konsulenterne: holdet bag";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Om os",
    title: "Fire mennesker. Én mission.",
    subtitle:
      "Vi gør AI konkret og nyttigt for danske virksomheder, uanset størrelse eller teknisk niveau.",
  });
}
