import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { TreatmentCard } from "@/components/public/treatment-card";
import { getTreatments, getTreatmentPrices } from "@/lib/supabase/queries";
import { CATEGORY_LABELS } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments & Prices",
  description: "Explore our range of mobile massage treatments in Porto. Deep tissue, sports massage, cupping therapy and more.",
  alternates: { canonical: "https://gzzone.vercel.app/treatments" },
  openGraph: {
    title: "Mobile Massage Treatments & Prices | GZ'ZONE Porto",
    description: "Explore our range of mobile massage treatments in Porto.",
    url: "https://gzzone.vercel.app/treatments",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TreatmentsPage() {
  const [treatments, treatmentPrices] = await Promise.all([
    getTreatments(),
    getTreatmentPrices(),
  ]);

  const categories = Object.entries(CATEGORY_LABELS) as [string, string][];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gzzone.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Treatments", item: "https://gzzone.vercel.app/treatments" },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Massage Treatments in Porto",
    itemListElement: treatments.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t.name,
      url: `https://gzzone.vercel.app/treatments/${t.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight">Treatments & Prices</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                All treatments include professional equipment brought directly to your location.
              </p>
            </div>

            {categories.map(([key, label]) => {
              const catTreatments = treatments.filter((t) => t.category === key);
              if (catTreatments.length === 0) return null;

              return (
                <div key={key} className="mb-16">
                  <h2 className="mb-6 text-2xl font-bold">{label}</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {catTreatments.map((t) => (
                      <TreatmentCard
                        key={t.id}
                        name={t.name}
                        slug={t.slug}
                        shortDescription={t.short_description}
                        priceFrom={treatmentPrices[t.slug]}
                        category={t.category}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
