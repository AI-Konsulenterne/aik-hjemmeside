import Image from "next/image";
import { getTeamMembers, strapiImageUrl, type TeamMember } from "@/lib/strapi";

/**
 * Kompakt teamstrimmel: navne, roller og fotos direkte fra Strapi.
 * Medlemmer uden foto vises ikke, og uden data vises intet.
 */
export default async function TeamStrip({
  className = "",
  columns = 4,
}: {
  className?: string;
  /** Antal kolonner på desktop (2 i smalle spalter, 4 i fuld bredde). */
  columns?: 2 | 4;
}) {
  const members = await getTeamMembers().catch(() => [] as TeamMember[]);
  const primary = members.find((m) => m.isPrimary);
  const ordered = (primary ? [primary, ...members.filter((m) => m !== primary)] : members)
    .map((m) => ({ ...m, photoUrl: strapiImageUrl(m.photo) }))
    .filter((m) => m.photoUrl && m.name && m.role);

  if (ordered.length === 0) return null;

  return (
    <div className={className}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
        Menneskerne bag
      </p>
      <ul className={`grid grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : ""} gap-x-5 gap-y-6 mt-5`}>
        {ordered.map((m) => (
          <li key={m.id} className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-[12px] overflow-hidden bg-gray-100">
              <Image
                src={m.photoUrl!}
                alt={m.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 leading-tight">{m.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{m.role}</p>
              {m.isPrimary && (
                <a
                  href="tel:+4525547074"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Ring til mig
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
