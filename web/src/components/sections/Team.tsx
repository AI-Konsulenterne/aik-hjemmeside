import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { getTeamMembers, strapiImageUrl, type TeamMember } from "@/lib/strapi";

/** Fallback-billeder når Strapi ikke har et foto endnu */
const fallbackImages = [
  "/team/alexander-hero.png",
  "/team/member-2.svg",
  "/team/member-3.svg",
  "/team/member-4.svg",
];

function getImageForMember(member: TeamMember, index: number): string {
  const uploaded = strapiImageUrl(member.photo);
  if (uploaded) return uploaded;
  if (member.isPrimary) return fallbackImages[0];
  return fallbackImages[(index % 3) + 1];
}

export default async function Team() {
  const members = await getTeamMembers().catch(() => [] as TeamMember[]);

  if (members.length === 0) return null;

  // Alexander (primary) først, derefter resten — så Alexander + Martin står øverst
  const primary = members.find((m) => m.isPrimary);
  const others = members.filter((m) => !m.isPrimary);
  const ordered = primary ? [primary, ...others] : others;

  return (
    <section className="py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold text-center mb-3">
            Hele holdet bag
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-heading text-gray-900 text-center leading-[1.1] max-w-3xl mx-auto">
            Fire mennesker. Én mission.
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            At gøre AI til en konkurrencefordel for danske SMV'er uanset størrelse eller teknisk niveau.
          </p>
        </FadeIn>

        {/* 2-kolonne grid med alle teammedlemmer */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {ordered.map((person, i) => (
            <FadeIn key={person.id} delay={i * 100}>
              <div className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
                  <Image
                    src={getImageForMember(person, i)}
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
  );
}
