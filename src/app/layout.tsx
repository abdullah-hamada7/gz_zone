import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { HashScrollHandler } from "@/components/public/hash-scroll-handler";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";

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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18331543340";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${orbitron.variable}`}>
      <head>
        {/* GTM container — loads GA4 + Ads tags once you add the IDs below */}
        {GTM_ID ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : null}
        {/* Direct gtag.js: Ads base + GA4 (fallback that works before GTM is configured) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());

            // Consent Mode v2 defaults (EU). Switch to 'denied' + banner for full GDPR.
            gtag('consent', 'default', {
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'analytics_storage': 'granted'
            });

            gtag('config', '${ADS_ID}', {
              'allow_enhanced_conversions': true
            });
            ${GA4_ID ? `gtag('config', '${GA4_ID}', { 'send_page_view': true });` : ""}
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-full flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <AnalyticsListener />
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

