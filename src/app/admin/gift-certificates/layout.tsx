import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function GiftCertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={montserrat.variable}>{children}</div>;
}
