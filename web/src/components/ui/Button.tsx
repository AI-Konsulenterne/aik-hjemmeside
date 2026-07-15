import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "white";
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

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
  white: "bg-white text-primary hover:bg-gray-50",
};

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  default: "px-6 py-3 text-sm",
  lg: "px-7 py-3 text-sm lg:px-8 lg:py-3.5 lg:text-base",
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
  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

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
