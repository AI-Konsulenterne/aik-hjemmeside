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

/** LinkedIn-ikon (lucide "linkedin", ISC-licens) */
function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default async function Team() {
  const members = await getTeamMembers().catch(() => [] as TeamMember[]);

  if (members.length === 0) return null;

  // Alexander (primær kontakt) først, derefter resten i Strapi-rækkefølge
  const primary = members.find((m) => m.isPrimary);
  const others = members.filter((m) => !m.isPrimary);
  const ordered = primary ? [primary, ...others] : others;

  return (
    <section className="bg-white py-[clamp(4rem,10vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        <FadeIn>
          <header className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Hele holdet bag
              </p>
              <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-heading text-gray-900">
                Fire mennesker. Én mission.
              </h2>
            </div>
            <p className="text-body text-gray-600 max-w-[460px] text-pretty">
              At gøre AI til en konkurrencefordel for danske virksomheder uanset
              størrelse eller teknisk niveau.
            </p>
          </header>
        </FadeIn>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
          {ordered.map((person, i) => (
            <FadeIn key={person.id} delay={150 + i * 100}>
              <article className="flex flex-col gap-4">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src={getImageForMember(person, i)}
                    alt={person.name}
                    fill
                    sizes="(max-width: 540px) 92vw, (max-width: 1024px) 46vw, 300px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {person.isPrimary && (
                    <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-[7px] text-xs font-bold text-gray-900 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                      <span className="h-[7px] w-[7px] rounded-full bg-primary" aria-hidden="true" />
                      Jeres første kontakt
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.role}</p>
                  </div>
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} på LinkedIn`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-200 ease-out hover:border-primary hover:bg-[#fff8ee] hover:text-primary-dark motion-reduce:transition-none"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
