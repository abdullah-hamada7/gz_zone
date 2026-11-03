import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  FileCheck2,
  Gift,
  Home,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { GiftCardPicker } from "@/components/public/gift-card-picker";
import { GiftCardPaymentMethods } from "@/components/public/gift-card-payment-methods";
import { getAllDurations, getTreatments } from "@/lib/supabase/queries";
import { getGiftCardPaymentMethods, resolveGiftCardOptions } from "@/lib/gift-cards";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Gift Cards — Gift Someone a Massage Session",
  description:
    "Gift a 60, 90 or 120-minute massage, facial or reflexology session in Porto. Choose your gift, send it via WhatsApp and receive a personalised PDF gift certificate.",
  alternates: { canonical: "https://gzzone.vercel.app/gift-cards" },
  openGraph: {
    title: "Gift Cards | GZ'ZONE Massage Porto",
    description:
      "Gift someone a massage session in Porto. Choose a 60, 90 or 120-minute massage, facial or reflexology gift card.",
    url: "https://gzzone.vercel.app/gift-cards",
  },
};

const steps = [
  {
    icon: Gift,
    title: "Choose your gift",
    description: "Pick the massage, facial or reflexology session you would like to gift.",
  },
  {
    icon: MessageCircle,
    title: "Send on WhatsApp",
    description: "Your gift details are pre-filled — just add your name and send.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description: "Complete payment by cash, Wise transfer or bank transfer.",
  },
  {
    icon: FileCheck2,
    title: "Receive the certificate",
    description:
      "We send a personalised PDF certificate with a unique gift card code, the giver's name, the recipient's name and the session.",
  },
];

export default async function GiftCardsPage() {
  const [treatments, durations] = await Promise.all([
    getTreatments(),
    getAllDurations(),
  ]);
  const options = resolveGiftCardOptions(treatments, durations);
  const paymentMethods = getGiftCardPaymentMethods();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gzzone.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gift Cards",
        item: "https://gzzone.vercel.app/gift-cards",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main className="flex-1">
        <section className="border-b bg-muted/30 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-foreground">Gift Cards</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Gift className="size-4" />
              Gift Cards
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Gift Someone a Massage Session
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose a session, send your gift in a few taps, and we will issue a
              personalised gift certificate. The recipient can book at the studio
              or at home.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Choose a gift</h2>
              <p className="mt-2 text-muted-foreground">
                All options include professional equipment and everything needed
                for the session.
              </p>
            </div>

            <GiftCardPicker options={options} />
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
              How Gift Cards Work
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="payment" className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight">How to Pay</h2>
              <p className="mt-2 text-muted-foreground">
                After you send your gift request on WhatsApp, complete the payment
                using any method below. Send us the confirmation and we will issue
                the certificate.
              </p>
            </div>

            <GiftCardPaymentMethods methods={paymentMethods} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              A gift card code is generated only after payment is confirmed.
            </p>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto grid max-w-4xl gap-8 px-4 sm:px-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">
                  Home Visits & Travel
                </h2>
              </div>
              <p className="mt-4 font-medium">
                Free home visits within a 10-kilometer radius of Porto.
              </p>
              <p className="mt-2 text-muted-foreground">
                For distances beyond 10 km, additional transportation fees apply.
                Send the recipient&apos;s address on WhatsApp and we will confirm
                the fee before the appointment is booked.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <div className="flex items-center gap-2">
                <Home className="size-5 text-primary" />
                <h3 className="text-lg font-semibold">Studio or at home</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                The recipient can schedule their session at the studio or at their
                home. They simply contact us with their gift card code and preferred
                date and time.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Gift certificates are valid for the session shown on the
                certificate and cannot be exchanged for cash.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
