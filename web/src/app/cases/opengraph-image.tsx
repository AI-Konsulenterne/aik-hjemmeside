import { renderOgImage } from "@/lib/og-template";

export const alt = "AI Cases fra danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Cases",
    title: "Konkrete resultater",
    subtitle:
      "Se hvordan danske virksomheder som Lavazza bruger AI til at spare tid.",
  });
}
