import dynamic from "next/dynamic";
import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { TrustBar } from "@/components/public/trust-bar";
import { WhyMobileMassage } from "@/components/public/why-mobile-massage";
import { HowItWorks } from "@/components/public/how-it-works";
import { Footer } from "@/components/public/footer";
import { TreatmentSlider } from "@/components/public/treatment-slider";
import { ReputationSection } from "@/components/public/reputation-section";
import { AboutSection } from "@/components/public/about-section";
import {
  getTreatments,
  getFAQs,
  getPlatformRatings,
  getReviews,
  getTreatmentPrices,
  getSiteContent,
} from "@/lib/supabase/queries";
import { CATEGORY_LABELS } from "@/data";

const FAQSection = dynamic(() => import("@/components/public/faq-section").then((m) => m.FAQSection), {
  ssr: true,
});

export default async function HomePage() {
  const [treatments, faqs, ratings, reviews, prices, heroContent] = await Promise.all([
    getTreatments(),
    getFAQs(),
    getPlatformRatings(),
    getReviews(),
    getTreatmentPrices(),
    getSiteContent("hero"),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero
          content={
            heroContent
              ? (heroContent as { title?: string; subtitle?: string; description?: string })
              : undefined
          }
        />
        <TrustBar />
        <ReputationSection ratings={ratings} reviews={reviews} />

        <section id="treatments" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Our Services
            </h2>
            <h3 className="mb-10 text-center text-3xl font-bold tracking-tight">
              Treatments & Prices
            </h3>
            <TreatmentSlider
              treatments={treatments.map((t) => ({
                id: t.id,
                name: t.name,
                slug: t.slug,
                short_description: t.short_description,
                category: t.category,
                priceFrom: prices[t.slug],
              }))}
            />
          </div>
        </section>

        <WhyMobileMassage />
        <HowItWorks />
        <AboutSection />
        <section id="faq">
          <FAQSection faqs={faqs} />
        </section>
      </main>
      <Footer />
    </>
  );
}
