import { renderOgImage } from "@/lib/og-template";

export const alt = "Skræddersyede AI-løsninger til danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Ydelse",
    title: "Skræddersyede AI-løsninger",
    subtitle:
      "AI bygget til danske virksomheder og koblet på jeres CRM, ERP og webshop.",
  });
}
