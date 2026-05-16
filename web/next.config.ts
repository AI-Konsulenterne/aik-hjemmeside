import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4's @tailwindcss/postcss bruger lightningcss som har native bindings
  // (dynamiske require af .node-filer). Next.js's bundler kan ikke statisk analysere
  // dem — eksternalisér så de loades direkte fra node_modules ved runtime.
  serverExternalPackages: ["lightningcss", "@tailwindcss/postcss", "@tailwindcss/node"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
