import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/treatments/cupping-therapy",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/cupping-therapy",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/cupping",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/treatments/cupping",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/hijama",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/treatments/hijama",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/treatments/deep-tissue",
        destination: "/treatments/deep-tissue-massage",
        permanent: true,
      },
      {
        source: "/deep-tissue",
        destination: "/treatments/deep-tissue-massage",
        permanent: true,
      },
      {
        source: "/sports-massage",
        destination: "/treatments/sports-massage",
        permanent: true,
      },
      {
        source: "/dry-cupping",
        destination: "/treatments/dry-cupping",
        permanent: true,
      },
      {
        source: "/facial-massage",
        destination: "/treatments/facial-massage",
        permanent: true,
      },
      {
        source: "/anti-cellulite-cupping",
        destination: "/treatments/anti-cellulite-cupping",
        permanent: true,
      },
      {
        source: "/stretching-class",
        destination: "/treatments/stretching-class",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

