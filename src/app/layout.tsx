import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { HashScrollHandler } from "@/components/public/hash-scroll-handler";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gzzone.vercel.app"),
  title: {
    default: "Gz'zone - Massage & Cupping Therapy | Porto",
    template: "%s | Gz'zone - Massage & Cupping Therapy | Porto",
  },
  description:
    "Enjoy a professional massage at your home, hotel, or apartment in Porto. Mobile massage & cupping therapy services with professional equipment brought directly to you. Book via WhatsApp.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Gz'zone - Massage & Cupping Therapy | Porto",
    description:
      "Professional mobile massage & cupping therapy services in Porto. I bring the massage table and professional equipment directly to you.",
    url: "https://gzzone.vercel.app",
    siteName: "Gz'zone - Massage & Cupping Therapy | Porto",
    images: [
      {
        url: "/images/logo.jpg",
        width: 500,
        height: 500,
        alt: "Gz'zone - Massage & Cupping Therapy | Porto Logo",
      },
      {
        url: "/images/gz-zone-a-zone-without.jpg",
        width: 1200,
        height: 630,
        alt: "Gz'zone Mobile Massage & Cupping Setup in Porto",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gz'zone - Massage & Cupping Therapy | Porto",
    description:
      "Professional mobile massage & cupping therapy services in Porto. Delivered directly to your home or hotel.",
    images: ["/images/logo.jpg"],
  },
  verification: {
    google: ["mh9BZNKNnpUNvTsc4S6i9NMXRvi8zPpyE0upyljJex8", "xSKupBgNXZubwUyNFpZJS6Ulq4MZ-fkjNSliGlUitdw"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://gzzone.vercel.app/#business",
  name: "Gz'zone - Massage & Cupping Therapy | Porto",
  url: "https://gzzone.vercel.app",
  logo: "https://gzzone.vercel.app/images/logo.jpg",
  image: "https://gzzone.vercel.app/images/logo.jpg",
  description:
    "Professional mobile massage & cupping therapy in Porto. High quality massage treatments delivered directly to your home, hotel, or apartment.",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto",
    addressCountry: "PT",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Porto",
    },
    {
      "@type": "AdministrativeArea",
      name: "District of Porto",
    },
    {
      "@type": "City",
      name: "Vila Nova de Gaia",
    },
    {
      "@type": "City",
      name: "Matosinhos",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Omar Elgazzar",
    jobTitle: "Licensed Massage & Bodywork Therapist",
    image: "https://gzzone.vercel.app/images/omar-elgazzar.jpg",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "235",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-full flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HashScrollHandler />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

