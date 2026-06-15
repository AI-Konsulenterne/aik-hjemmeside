import { renderOgImage } from "@/lib/og-template";

export const alt = "AIK Workspace - jeres eget AI-system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Produkt",
    title: "AIK Workspace",
    subtitle:
      "Jeres eget AI-system til hele virksomheden - chat, agenter og vidensbase i én platform.",
    variant: "dark",
  });
}
