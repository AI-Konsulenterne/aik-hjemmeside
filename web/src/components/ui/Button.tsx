import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "white" | "dark" | "ghost";
  size?: "default" | "lg" | "sm";
  href?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Bevaret for kompatibilitet. Cal-booking er parkeret — knapper med cal=true
   * fører til kontaktsiden, hvor booking sker via telefon og email.
   */
  cal?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Pilleform, som designsystemet foreskriver (03-components/buttons.md).
 *
 * En tidligere udgave gjorde dem kantede med den begrundelse at pilleform
 * "læser forbruger-app". Designsystemet siger det modsatte, og det gør
 * referencerne også: Giga, Sana og Frontify bruger alle rolige piller.
 * Resultatet var tre knapformer på én skærm — kantet i navigationen og
 * heroen, pilleformet i bundbjælken.
 *
 * Hover er et farveskift og et halvt pixel løft. Ingen tung skygge: den
 * får knappen til at hoppe, og det er ikke det udtryk vi vil have.
 */
const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "border border-gray-900/80 text-gray-900 hover:bg-gray-900 hover:text-white",
  white: "bg-white text-gray-900 hover:bg-white/90",
  dark: "bg-gray-900 text-white hover:bg-black",
  ghost:
    "border border-white/35 text-white hover:border-white/70 hover:bg-white/[0.06]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-[0.8125rem]",
  default: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[0.9375rem]",
};

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  cal = false,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Booking sker via telefon/email → kontaktsiden.
  const target = cal ? href || "/kontakt" : href;

  if (target) {
    return (
      <Link href={target} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
