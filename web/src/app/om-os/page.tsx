import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import SubpageCTA from "@/components/sections/SubpageCTA";
import {
  getTeamMembers,
  strapiImageUrl,
  type TeamMember,
} from "@/lib/strapi";

const fallbackImages = [
  "/team/alexander-hero.png",
  "/team/member-2.svg",
  "/team/member-3.svg",
  "/team/member-4.svg",
];

function imageForMember(m: TeamMember, i: number): string {
  const uploaded = strapiImageUrl(m.photo);
  if (uploaded) return uploaded;
  if (m.isPrimary) return fallbackImages[0];
  return fallbackImages[(i % 3) + 1];
}

export const metadata: Metadata = {
  title: "Om Os | Mød Holdet Bag AI Konsulenterne",
  description:
    "AI Konsulenterne er et dansk AI-konsulenthus i København med fokus på SMV'er. Mød Alexander og resten af teamet der bygger skræddersyede AI-løsninger.",
  alternates: { canonical: "/om-os" },
  keywords: [
    "AI konsulenter Danmark",
    "AI konsulenthus København",
    "Alexander AI konsulent",
    "dansk AI bureau",
  ],
  openGraph: {
    title: "Om Os — AI Konsulenterne",
    description:
      "Mød holdet bag AI Konsulenterne. Et lille, dansk hold med fokus på SMV'er.",
    url: "/om-os",
  },
};

const values = [
  {
    title: "I har direkte kontakt med os hele vejen",
    description:
      "Vi er kun fire mennesker. Den I taler med på første møde, er også den der bygger og leverer. Ingen account manager imellem, ingen “lige et øjeblik mens jeg tjekker med kollegaen”.",
    iconPath: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
  {
    title: "Vi forklarer det så I kan bruge det",
    description:
      "I behøver ikke vide noget om AI for at arbejde sammen med os. Vi gør vores bedste for at forklare tingene i et sprog I kan tage med videre - også til kollegaen der ikke var med til mødet.",
    iconPath: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    title: "Vi siger til hvis det ikke giver mening",
    description:
      "Hvis I ikke er klar, eller hvis AI ikke er det rigtige for jer lige nu, så får I det at vide. Vi vil hellere passe på jer end at sælge et projekt der ikke virker.",
    iconPath: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Vi forsvinder ikke efter lancering",
    description:
      "Når løsningen er sat op, er vi der stadig. Vi følger op, hjælper når noget driller, og justerer det der ikke fungerer. Også når der ikke lige er en faktura imellem.",
    iconPath: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
];

export default async function OmOs() {
  const team = await getTeamMembers().catch(() => [] as TeamMember[]);
  const primary = team.find((m) => m.isPrimary);
  const others = team.filter((m) => !m.isPrimary);
  // Alexander (primary) først, derefter resten — så Alexander + Martin står øverst
  const ordered = primary ? [primary, ...others] : others;

  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                Om os
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-heading text-gray-900 leading-[1.05]">
                Vi gør AI tilgængeligt for danske virksomheder
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed">
                AI Konsulenterne er et dansk AI-konsulenthus der hjælper SMV&apos;er
                med at spare tid og penge med skræddersyede AI-løsninger. Vi
                tror på at AI skal være nede på jorden - ikke raketvidenskab.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-12">
              Sådan er vi at arbejde med
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 100}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={value.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-heading mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-[clamp(3rem,8vw,6rem)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center mb-4">
              Teamet bag
            </h2>
            <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Fire mennesker med én mission - at gøre AI konkret og nyttigt for
              danske SMV&apos;er.
            </p>
          </FadeIn>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
            {ordered.map((person, i) => (
              <FadeIn key={person.id} delay={i * 100}>
                <div className="group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
                    <Image
                      src={imageForMember(person, i)}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-lg lg:text-xl font-bold tracking-heading text-gray-900 leading-tight">
                      {person.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500">{person.role}</p>
                      {person.linkedinUrl && (
                        <a
                          href={person.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors flex-shrink-0 ml-2"
                          aria-label={`LinkedIn-profil for ${person.name}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SubpageCTA
        heading="Lad os tage en snak"
        description="Vi er altid klar til en uforpligtende samtale om jeres virksomhed og muligheder med AI."
      />
    </>
  );
}
