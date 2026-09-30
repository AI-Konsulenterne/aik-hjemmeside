import Link from "next/link";

type CalButtonProps = {
  children: React.ReactNode;
  className?: string;
  calUsername?: string;
  fallbackHref?: string;
};

/**
 * Kalenderen er ikke aktiveret — knappen fører direkte til kontaktformularen.
 */
export default function CalButton({
  children,
  className = "",
  fallbackHref = "/kontakt#booking",
}: CalButtonProps) {
  return (
    <Link href={fallbackHref} className={className}>
      {children}
    </Link>
  );
}
