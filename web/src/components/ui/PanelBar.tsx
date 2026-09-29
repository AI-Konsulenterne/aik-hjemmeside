/**
 * Topbjælken på sidens stykker software.
 *
 * HR-agenten, spiralen, prognosen og indbakken er fire forskellige
 * modeller, men de skal læses som ét system. Derfor samme bjælke: lampen
 * til venstre, hvad den arbejder på, og status til højre. Lampen lyser kun
 * mens der faktisk regnes — orange er status, ikke pynt.
 */
export default function PanelBar({
  label,
  status,
  arbejder,
  children,
}: {
  label: string;
  status: string;
  arbejder: boolean;
  /** En handling til højre for status, fx "glem alt" på spiralen. */
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5 sm:px-6">
      <span className="lamp" data-lit={arbejder ? "true" : "false"} aria-hidden="true" />
      <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
        {label}
      </p>
      <p className="ml-auto text-[0.7rem] tracking-wide text-white/60">
        {status}
      </p>
      {children}
    </div>
  );
}
