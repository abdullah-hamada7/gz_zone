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
    default: "Mobile Massage in Porto | Professional Massage at Your Location | GZ'ZONE",
    template: "%s | GZ'ZONE — Mobile Massage Porto",
  },
  description:
    "Enjoy a professional massage at your home, hotel, or apartment in Porto. Mobile massage services with professional equipment brought directly to you. Book via WhatsApp.",
  openGraph: {
    title: "GZ'ZONE — Mobile Massage Porto",
    description:
      "Professional mobile massage services in Porto. I bring the massage table to you.",
  },
  verification: {
    google: "xSKupBgNXZubwUyNFpZJS6Ulq4MZ-fkjNSliGlUitdw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
