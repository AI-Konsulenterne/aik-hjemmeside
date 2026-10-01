import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Siden blev ikke fundet",
};

export default function NotFound() {
  return (
    <section className="py-[clamp(6rem,15vw,12rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-8xl lg:text-9xl font-bold text-primary tracking-heading">
          404
        </p>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-heading text-gray-900 mt-6">
          Siden blev ikke fundet
        </h1>
        <p className="text-lead text-gray-700 mt-4 max-w-md mx-auto">
          Den side du leder efter eksisterer ikke eller er blevet flyttet.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button variant="primary" href="/">
            Gå til forsiden
          </Button>
          <Button variant="secondary" href="/kontakt">
            Kontakt os
          </Button>
        </div>
      </div>
    </section>
  );
}
