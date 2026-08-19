import FadeIn from "@/components/ui/FadeIn";

const SKOOL_URL = "https://www.skool.com/aiminds";

/**
 * AI-Minds community-sektion (design-handoff: mørk neon, Skool-feed
 * som glas-kort). Farver/typografi følger handoff'et 1:1 - bevidst
 * uden for AIK's normale palette, da sektionen spejler platformens look.
 */

// Gradient-tekst helper (inline styles for præcis gengivelse)
const gradientText = (gradient: string): React.CSSProperties => ({
  background: gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

const stats = [
  { value: "26", label: "Medlemmer", gradient: "linear-gradient(90deg, #38bdf8, #818cf8)" },
  { value: "2", label: "Online nu", gradient: "linear-gradient(90deg, #818cf8, #c084fc)" },
  { value: "6", label: "Admins", gradient: "linear-gradient(90deg, #c084fc, #e879f9)" },
];

const posts = [
  {
    initials: "MT",
    avatarGradient: "linear-gradient(135deg, #38bdf8, #818cf8)",
    name: "Martin Tvedesøe",
    meta: "Maj 20 · AI-minds community",
    pinned: true,
    title: "📌 Start her!",
    excerpt:
      "Velkommen til AI-Minds 👋 Inden du går i gang med forløbet, så gennemgå punkterne herunder…",
    likes: 4,
    comments: 3,
    newComment: "New comment Jul 1",
    rotate: "1.2deg",
    border: "1.5px solid rgba(167,139,250,0.35)",
    glow: "0 12px 50px rgba(5,8,25,0.6), 0 0 34px rgba(167,139,250,0.18)",
  },
  {
    initials: "AØ",
    avatarGradient: "linear-gradient(135deg, #a78bfa, #e879f9)",
    name: "Alexander Ørneborg",
    meta: "2t · AI-minds community",
    pinned: false,
    title: "🎥 Ny video: EU's AI-forordning (AI Act)",
    excerpt:
      "Vi har lagt en ny video op, hvor jeg gennemgår EU's AI-forordning på en enkel og overskuelig måde…",
    likes: 1,
    comments: 0,
    newComment: null,
    rotate: "-1.4deg",
    border: "1.5px solid rgba(56,189,248,0.3)",
    glow: "0 12px 50px rgba(5,8,25,0.6), 0 0 34px rgba(56,189,248,0.16)",
  },
];

function WaveField() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aik-cwg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id="aik-cwg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="aik-csoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <radialGradient id="aik-cglowspot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#818cf8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="560" cy="640" rx="420" ry="120" fill="url(#aik-cglowspot)" opacity="0.5" />
      <g fill="none" stroke="url(#aik-cwg1)">
        <path d="M -40 600 C 260 500, 460 680, 760 560 C 1000 465, 1140 585, 1330 470" strokeWidth="2.5" opacity="0.9" filter="url(#aik-csoft)" />
        <path d="M -40 600 C 260 500, 460 680, 760 560 C 1000 465, 1140 585, 1330 470" strokeWidth="1.2" opacity="0.9" />
        <path d="M -40 632 C 270 540, 470 710, 770 594 C 1010 500, 1150 615, 1330 505" strokeWidth="1.2" opacity="0.55" />
        <path d="M -40 664 C 280 580, 480 738, 780 628 C 1020 538, 1160 645, 1330 540" strokeWidth="1" opacity="0.35" />
        <path d="M -40 570 C 250 470, 450 645, 750 528 C 990 435, 1130 555, 1330 438" strokeWidth="1" opacity="0.4" />
        <path d="M -40 700 C 290 625, 490 760, 790 664 C 1030 578, 1170 678, 1330 578" strokeWidth="1" opacity="0.22" />
      </g>
      <g fill="none" stroke="url(#aik-cwg2)" opacity="0.5">
        <path d="M -40 545 C 240 455, 440 615, 740 500 C 980 410, 1120 528, 1330 410" strokeWidth="0.8" />
        <path d="M -40 690 C 300 650, 520 745, 820 660 C 1060 592, 1180 665, 1330 600" strokeWidth="0.8" />
      </g>
      <g>
        <circle cx="235" cy="560" r="3" fill="#67e8f9" opacity="0.9" />
        <circle cx="470" cy="640" r="2.2" fill="#c084fc" opacity="0.8" />
        <circle cx="705" cy="575" r="2.6" fill="#f0abfc" opacity="0.85" />
        <circle cx="960" cy="520" r="2" fill="#7dd3fc" opacity="0.7" />
        <circle cx="1120" cy="560" r="2.8" fill="#a5b4fc" opacity="0.8" />
        <circle cx="860" cy="655" r="1.8" fill="#67e8f9" opacity="0.6" />
        <circle cx="120" cy="640" r="2" fill="#a5b4fc" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function CommunitySection() {
  return (
    <section id="community" className="py-[clamp(4rem,10vw,7rem)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] px-8 py-14 lg:px-[72px] lg:py-20"
          style={{
            background:
              "radial-gradient(120% 140% at 82% 30%, #131B4A 0%, #0A1130 42%, #050A1E 100%)",
            fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          }}
        >
          <WaveField />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
          {/* Venstre — tekst */}
          <FadeIn>
            <div className="flex flex-col gap-6 lg:gap-[26px] text-white">
              <span
                className="text-[clamp(0.9rem,2vw,1.625rem)] font-bold tracking-[0.42em] uppercase"
                style={gradientText(
                  "linear-gradient(90deg, #38bdf8, #a78bfa 55%, #f472b6)"
                )}
              >
                AI-Minds Community
              </span>
              <h2
                className="text-[clamp(2.5rem,5.8vw,4.625rem)] font-extrabold leading-[1.06] tracking-[-0.01em]"
                style={{ textShadow: "0 4px 40px rgba(89,56,255,0.35)" }}
              >
                Bliv en del af{" "}
                <span
                  className="block"
                  style={gradientText(
                    "linear-gradient(90deg, #60a5fa, #a78bfa 55%, #e879f9)"
                  )}
                >
                  fællesskabet
                </span>
              </h2>
              <p className="text-[clamp(1.05rem,2vw,1.5625rem)] leading-[1.4] max-w-[520px] text-[#A9B4D6]">
                Ugentlige Q&amp;A-sessioner, sparring og adgang til alt
                materialet
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 lg:gap-9 mt-2 lg:mt-4">
                {stats.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-6 lg:gap-9">
                    {i > 0 && (
                      <span
                        className="w-[1.5px] h-[52px]"
                        style={{ background: "rgba(148,163,255,0.25)" }}
                        aria-hidden="true"
                      />
                    )}
                    <span>
                      <span
                        className="block text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-tight"
                        style={gradientText(s.gradient)}
                      >
                        {s.value}
                      </span>
                      <span className="block text-[13px] lg:text-[16px] font-semibold tracking-[0.14em] uppercase text-[#8fa0c9]">
                        {s.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-3">
                <a
                  href={SKOOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-bold rounded-full px-8 py-3.5 text-white text-[16px] lg:text-[17px] transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, #60a5fa, #a78bfa 55%, #e879f9)",
                    boxShadow: "0 0 30px rgba(129,140,248,0.45)",
                  }}
                >
                  Kom med i fællesskabet
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Højre — feed-mockup med rigtige posts */}
          <FadeIn delay={150}>
            <div className="relative max-w-[500px] mx-auto lg:mx-0 lg:ml-auto w-full">
              <div
                className="absolute -inset-[60px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(129,102,241,0.28) 0%, rgba(192,85,247,0.12) 45%, rgba(5,10,30,0) 70%)",
                }}
                aria-hidden="true"
              />

              {/* Q&A-pille */}
              <div
                className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[16px] lg:text-[19px] font-semibold mb-[18px]"
                style={{
                  border: "1.5px solid rgba(56,189,248,0.5)",
                  background: "rgba(56,189,248,0.1)",
                  boxShadow: "0 0 24px rgba(56,189,248,0.3)",
                  color: "#bae6fd",
                  transform: "rotate(-1.5deg)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7dd3fc"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="5" width="17" height="16" rx="2" />
                  <path d="M3.5 10 h17 M8 3 v4 M16 3 v4" />
                </svg>
                Ugentlig Q&amp;A-session — om 7 timer
              </div>

              {/* Post-kort */}
              {posts.map((post, i) => (
                <div
                  key={post.name}
                  className={`relative rounded-[20px] p-6 lg:px-[26px] lg:py-6 backdrop-blur-[4px] ${
                    i > 0 ? "mt-[18px]" : ""
                  }`}
                  style={{
                    background: "rgba(15,23,58,0.82)",
                    border: post.border,
                    boxShadow: post.glow,
                    transform: `rotate(${post.rotate})`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-11 h-11 rounded-full grid place-items-center text-[17px] font-bold text-white shrink-0"
                      style={{ background: post.avatarGradient }}
                    >
                      {post.initials}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[17px] lg:text-[19px] font-bold text-white">
                        {post.name}
                      </span>
                      <span className="block text-[14px] lg:text-[15px] text-[#8fa0c9]">
                        {post.meta}
                      </span>
                    </span>
                    {post.pinned && (
                      <span
                        className="text-[13px] lg:text-[14px] font-bold tracking-[0.08em] rounded-full px-3 py-[5px] shrink-0"
                        style={{
                          color: "#fbbf24",
                          border: "1px solid rgba(251,191,36,0.45)",
                        }}
                      >
                        PINNED
                      </span>
                    )}
                  </div>
                  <p className="text-[20px] lg:text-[25px] font-extrabold text-white mt-3.5 leading-snug">
                    {post.title}
                  </p>
                  <p className="text-[15px] lg:text-[17px] leading-[1.45] text-[#a9b4d6] mt-1.5">
                    {post.excerpt}
                  </p>
                  <p className="flex gap-[22px] mt-3.5 text-[15px] lg:text-[16px] text-[#8fa0c9]">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    {post.newComment && (
                      <span className="font-semibold text-[#60a5fa]">
                        {post.newComment}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
