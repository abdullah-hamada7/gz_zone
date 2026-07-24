import type { Metadata } from "next";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and booking terms for GZ'ZONE Mobile Massage in Porto.",
  alternates: {
    canonical: "https://gzzone.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <h2>Booking</h2>
            <p>
              By booking a massage treatment, you agree to these terms. All
              bookings are confirmed via WhatsApp.
            </p>
            <h2>Cancellation</h2>
            <p>
              Please provide at least 24 hours notice for cancellations. Late
              cancellations may be subject to a fee.
            </p>
            <h2>Health</h2>
            <p>
              It is your responsibility to inform the therapist of any medical
              conditions, injuries, or allergies prior to treatment.
            </p>
            <h2>Liability</h2>
            <p>
              The therapist reserves the right to refuse or modify treatment if
              there are health concerns that make massage inadvisable.
            </p>
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact us via WhatsApp at{" "}
              <a
                href="https://wa.me/351913675810"
                className="text-primary underline"
              >
                +351 913 675 810
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
