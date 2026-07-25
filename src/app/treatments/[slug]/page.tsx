import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { HoursSection } from "@/components/public/hours-section";
import { TreatmentBooking } from "./booking";
import { getTreatmentBySlug, getDurationsForTreatment } from "@/lib/supabase/queries";
import { CATEGORY_LABELS } from "@/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return {};
  const canonicalUrl = `https://gzzone.vercel.app/treatments/${slug}`;
  return {
    title: treatment.name,
    description: treatment.short_description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${treatment.name} | GZ'ZONE Mobile Massage Porto`,
      description: treatment.short_description,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const durations = await getDurationsForTreatment(treatment.id);
  const canonicalUrl = `https://gzzone.vercel.app/treatments/${slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: treatment.name,
    serviceType: CATEGORY_LABELS[treatment.category] || treatment.category,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: "GZ'ZONE — Mobile Massage Porto",
      url: "https://gzzone.vercel.app",
    },
    areaServed: { "@type": "City", name: "Porto" },
    description: treatment.full_description,
    offers: durations.map((d) => ({
      "@type": "Offer",
      price: d.price,
      priceCurrency: "EUR",
      priceValidUntil: "2027-12-31",
      eligibleDuration: { "@type": "QuantitativeValue", value: d.minutes, unitCode: "MIN" },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gzzone.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Treatments", item: "https://gzzone.vercel.app/treatments" },
      { "@type": "ListItem", position: 3, name: treatment.name, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 text-xs text-muted-foreground flex items-center gap-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/treatments" className="hover:underline">Treatments</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{treatment.name}</span>
            </nav>

            <span className="text-sm font-medium text-muted-foreground">
              {CATEGORY_LABELS[treatment.category] || treatment.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{treatment.name}</h1>

            {treatment.full_description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{treatment.full_description}</p>
            )}

            {treatment.ideal_for && (
              <div className="mt-6 rounded-lg bg-muted/50 p-4 border border-border/50">
                <p className="text-sm font-semibold">Ideal for:</p>
                <p className="mt-1 text-sm text-muted-foreground">{treatment.ideal_for}</p>
              </div>
            )}

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-lg font-bold mb-3">Key Benefits</h2>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Alleviates persistent muscle stiffness and chronic tension.</li>
                  <li>Promotes micro-circulation and faster cellular recovery.</li>
                  <li>Tailored pressure intensity based on your individual comfort level.</li>
                  <li>Delivered directly to your home, hotel, or apartment in Porto.</li>
                </ul>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-lg font-bold mb-3">What to Expect</h2>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Complete equipment set-up (portable table, linens, and oils).</li>
                  <li>Brief pre-session consultation to identify target pain areas.</li>
                  <li>Professional, hygienic, and respectful bodywork session.</li>
                  <li>Post-treatment posture and hydration advice.</li>
                </ul>
              </div>
            </div>

            {durations.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">Pricing & Duration</h2>
                <div className="divide-y rounded-lg border">
                  {durations.map((d) => (
                    <div key={d.id} className="flex items-center justify-between px-5 py-4">
                      <span className="font-medium">{d.minutes} minutes session</span>
                      <span className="text-lg font-bold">€{Number(d.price).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TreatmentBooking
              treatmentName={treatment.name}
              durations={durations.map((d) => ({ id: d.id, minutes: d.minutes, price: d.price }))}
            />
          </div>
        </section>

        <HoursSection />
      </main>
      <Footer />
    </>
  );
}
