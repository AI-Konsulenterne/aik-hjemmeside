import type { ReactNode } from "react";

// ── Outline lucide-style ikoner (1.8 stroke, currentColor) ──
const ICONS: Record<string, ReactNode> = {
  check: <polyline points="20 6 9 17 4 12" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  "shield-check": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 21h14" />
      <path d="M6.5 7 3 13h7L6.5 7z" />
      <path d="M17.5 7 14 13h7l-3.5-6z" />
      <path d="M6.5 7h11" />
      <path d="M12 3a2 2 0 0 0-2 2" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5z" />
  ),
  megaphone: (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </>
  ),
  quote: <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  files: (
    <>
      <path d="M15 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6z" />
      <path d="M14 2v5h5" />
    </>
  ),
  activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  pencil: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
    </>
  ),
  "arrow-right": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  stroke = 1.8,
  className,
}: {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name] ?? null}
    </svg>
  );
}

// ── Farverige brand-logoer (inline SVG) ──
const LOGOS: Record<string, (s: number) => ReactNode> = {
  m365: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <rect x="2.5" y="2.5" width="8.6" height="8.6" rx="1" fill="#F25022" />
      <rect x="12.9" y="2.5" width="8.6" height="8.6" rx="1" fill="#7FBA00" />
      <rect x="2.5" y="12.9" width="8.6" height="8.6" rx="1" fill="#00A4EF" />
      <rect x="12.9" y="12.9" width="8.6" height="8.6" rx="1" fill="#FFB900" />
    </svg>
  ),
  sharepoint: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <defs>
        <linearGradient id="ws-sp-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0BA4A9" />
          <stop offset="1" stopColor="#036C70" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#ws-sp-grad)" />
      <path
        d="M15.6 8.1c-1-1-2.7-1.3-4-.8-1.5.6-2 2-1.1 3 .7.8 1.9 1 3 1.2 1.1.2 2.3.4 3 1.2.9 1 .3 2.5-1.2 3-1.3.5-3 .2-4-.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  slack: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <rect x="8.4" y="2" width="3.6" height="10.4" rx="1.8" fill="#36C5F0" />
      <rect x="2" y="8.4" width="10.4" height="3.6" rx="1.8" fill="#E01E5A" />
      <rect x="12" y="11.6" width="3.6" height="10.4" rx="1.8" fill="#ECB22E" />
      <rect x="11.6" y="12" width="10.4" height="3.6" rx="1.8" fill="#2EB67D" />
    </svg>
  ),
  salesforce: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <path
        d="M9.7 8.4c.7-1.4 2.1-2.4 3.8-2.4 1.6 0 3 .9 3.7 2.1.5-.2 1-.3 1.6-.3 2.1 0 3.8 1.7 3.8 3.9s-1.7 3.9-3.8 3.9c-.2 0-.5 0-.7-.1-.6 1.1-1.8 1.8-3.1 1.8-.5 0-1-.1-1.5-.3-.6 1.2-1.9 2-3.3 2-1.5 0-2.8-.8-3.4-2.1-.2 0-.4.1-.7.1-1.9 0-3.4-1.5-3.4-3.4 0-1.2.7-2.3 1.6-2.9-.2-.4-.3-.9-.3-1.3 0-1.6 1.3-2.9 2.9-2.9 1 0 2 .5 2.5 1.3z"
        fill="#00A1E0"
      />
    </svg>
  ),
  visma: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <path d="M4 6.5h3.4L12 16l4.6-9.5H20L13.6 19h-3.2z" fill="#E1261C" />
    </svg>
  ),
  deepl: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#0F2B46" />
      <path d="M12 6.4l5 11.2L12 15l-5 2.6z" fill="#fff" />
    </svg>
  ),
  chatgpt: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <path
        fill="#10A37F"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  ),
  claude: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <g stroke="#D97757" strokeWidth="2.1" strokeLinecap="round">
        {[...Array(12)].map((_, i) => {
          const a = ((i * 30) * Math.PI) / 180,
            r1 = 3.1,
            r2 = 9.6;
          return (
            <line
              key={i}
              x1={(12 + Math.cos(a) * r1).toFixed(2)}
              y1={(12 + Math.sin(a) * r1).toFixed(2)}
              x2={(12 + Math.cos(a) * r2).toFixed(2)}
              y2={(12 + Math.sin(a) * r2).toFixed(2)}
            />
          );
        })}
      </g>
    </svg>
  ),
  gemini: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <defs>
        <linearGradient id="ws-gem-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9168C0" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 2c.2 5.2 1.6 8.6 10 10-8.4 1.4-9.8 4.8-10 10-.2-5.2-1.6-8.6-10-10 8.4-1.4 9.8-4.8 10-10z"
        fill="url(#ws-gem-grad)"
      />
    </svg>
  ),
  azure: (s) => (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
      <defs>
        <linearGradient id="ws-az-grad" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#3CCBF4" />
          <stop offset="1" stopColor="#2086D8" />
        </linearGradient>
      </defs>
      <path
        d="M10.4 4h4.1l4.7 13.2c.2.5-.2 1-.7 1H14l-1-3.1H8.7l3-2.7h.9L11 8.9 6.6 17l-.3.5c-.3.5 0 .7.5.7H4.1c-.5 0-.9-.5-.7-1L8 5.1c.4-.7 1.1-1.1 1.9-1.1z"
        fill="url(#ws-az-grad)"
      />
    </svg>
  ),
};

export function Logo({ name, size = 22 }: { name: string; size?: number }) {
  return LOGOS[name] ? <>{LOGOS[name](size)}</> : null;
}
