import { notFound } from "next/navigation";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { MobileStickyCTA } from "@/components/public/mobile-sticky-cta";
import { HoursSection } from "@/components/public/hours-section";
import { TreatmentBooking } from "./booking";
import { TREATMENTS, CATEGORY_LABELS, getDurationsForTreatment } from "@/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) return {};
  return {
    title: treatment.name,
    description: treatment.short_description,
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) notFound();

  const durations = getDurationsForTreatment(treatment.id);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <span className="text-sm font-medium text-muted-foreground">
              {CATEGORY_LABELS[treatment.category] || treatment.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {treatment.name}
            </h1>

            {treatment.full_description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {treatment.full_description}
              </p>
            )}

            {treatment.ideal_for && (
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium">Ideal for:</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {treatment.ideal_for}
                </p>
              </div>
            )}

            {durations.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">
                  Pricing & Duration
                </h2>
                <div className="divide-y rounded-lg border">
                  {durations.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <span className="font-medium">
                        {d.minutes} minutes
                      </span>
                      <span className="text-lg font-bold">
                        €{d.price.toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TreatmentBooking
              treatmentName={treatment.name}
              durations={durations.map((d) => ({
                id: d.id,
                minutes: d.minutes,
                price: d.price,
              }))}
            />
          </div>
        </section>

        <HoursSection />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}