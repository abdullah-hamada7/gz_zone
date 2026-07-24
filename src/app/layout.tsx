import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gzzone.vercel.app"),
  title: {
    default: "GZ’ZONE - Massage & Cupping Therapy | Mobile Massage Porto",
    template: "%s | GZ’ZONE - Massage & Cupping Therapy",
  },
  description:
    "Enjoy a professional massage at your home, hotel, or apartment in Porto. Mobile massage & cupping therapy services with professional equipment brought directly to you. Book via WhatsApp.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/images/logo.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  alternates: {
    canonical: "./",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GZ’ZONE - Massage & Cupping Therapy",
    description:
      "Professional mobile massage & cupping therapy services in Porto. I bring the massage table and professional equipment directly to you.",
    url: "https://gzzone.vercel.app",
    siteName: "GZ’ZONE - Massage & Cupping Therapy",
    images: [
      {
        url: "/images/gz-zone-a-zone-without.jpg",
        width: 1200,
        height: 630,
        alt: "GZ’ZONE Mobile Massage & Cupping Setup in Porto",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GZ’ZONE - Massage & Cupping Therapy",
    description:
      "Professional mobile massage & cupping therapy services in Porto. Delivered directly to your home or hotel.",
    images: ["/images/gz-zone-a-zone-without.jpg"],
  },
  verification: {
    google: ["mh9BZNKNnpUNvTsc4S6i9NMXRvi8zPpyE0upyljJex8", "xSKupBgNXZubwUyNFpZJS6Ulq4MZ-fkjNSliGlUitdw"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://gzzone.vercel.app/#business",
  name: "GZ’ZONE - Massage & Cupping Therapy",
  url: "https://gzzone.vercel.app",
  logo: "https://gzzone.vercel.app/images/logo.jpg",
  image: "https://gzzone.vercel.app/images/gz-zone-a-zone-without.jpg",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

