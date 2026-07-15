import Link from "next/link";

type CalButtonProps = {
  children: React.ReactNode;
  className?: string;
  calUsername?: string;
  fallbackHref?: string;
};

/**
 * Cal-booking er parkeret — booking sker via telefon og email. Knappen fører
 * til kontaktsiden.
 */
export default function CalButton({
  children,
  className = "",
  fallbackHref = "/kontakt",
}: CalButtonProps) {
  return (
    <Link href={fallbackHref} className={className}>
      {children}
    </Link>
  );
}
