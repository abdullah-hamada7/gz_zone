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
import {
  getAllDurations,
  getAllSiteContent,
  getTreatments,
} from "@/lib/supabase/queries";
import {
  buildDefaultGiftCardSettings,
  GIFT_CARD_SETTINGS_KEY,
  resolveGiftCardOptions,
  resolveGiftCardPageContent,
  resolveGiftCardSettings,
} from "@/lib/gift-cards";

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

const stepIcons = [Gift, MessageCircle, CreditCard, FileCheck2];

export default async function GiftCardsPage() {
  const [treatments, durations, siteContent] = await Promise.all([
    getTreatments(),
    getAllDurations(),
    getAllSiteContent(),
  ]);

  const page = resolveGiftCardPageContent(siteContent.gift_cards);
  const defaults = buildDefaultGiftCardSettings(treatments, durations);
  const settings = resolveGiftCardSettings(
    siteContent[GIFT_CARD_SETTINGS_KEY],
    defaults
  );
  const options = resolveGiftCardOptions(treatments, durations, settings.options);
  const paymentMethods = settings.payment_methods;

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
              <span className="font-medium text-foreground">{page.eyebrow}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Gift className="size-4" />
              {page.eyebrow}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {page.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.intro}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                {page.picker_heading}
              </h2>
              <p className="mt-2 text-muted-foreground">{page.picker_description}</p>
            </div>

            <GiftCardPicker options={options} content={page} />
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
              {page.steps_heading}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {page.steps.map((step, index) => {
                const Icon = stepIcons[index % stepIcons.length];
                return (
                  <div key={`${step.title}-${index}`} className="text-center">
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
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                {page.payment_heading}
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                {page.payment_description}
              </p>
            </div>

            <GiftCardPaymentMethods methods={paymentMethods} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {page.payment_note}
            </p>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">
                  {page.travel_heading}
                </h2>
              </div>
              <p className="mt-4 font-medium">{page.travel_primary}</p>
              <p className="mt-2 text-muted-foreground">{page.travel_secondary}</p>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <div className="flex items-center gap-2">
                <Home className="size-5 text-primary" />
                <h3 className="text-lg font-semibold">{page.usage_title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{page.usage_text}</p>
            </div>

            {page.certificate_note && (
              <div className="md:col-span-2">
                <p className="rounded-xl border bg-background px-5 py-4 text-center text-sm text-muted-foreground">
                  {page.certificate_note}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
