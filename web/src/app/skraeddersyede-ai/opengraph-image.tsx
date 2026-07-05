import { renderOgImage } from "@/lib/og-template";

export const alt = "Skræddersyede AI-løsninger til danske virksomheder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return renderOgImage({
    tag: "Ydelse",
    title: "Skræddersyede AI-løsninger",
    subtitle:
      "Custom AI til danske virksomheder - integreret med jeres CRM, ERP og webshop.",
  });
}
