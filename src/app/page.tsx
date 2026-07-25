import dynamicImport from "next/dynamic";
import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { TrustBar } from "@/components/public/trust-bar";
import { WhyMobileMassage } from "@/components/public/why-mobile-massage";
import { HowItWorks } from "@/components/public/how-it-works";
import { Footer } from "@/components/public/footer";
import { TreatmentSlider } from "@/components/public/treatment-slider";
import { ReputationSection } from "@/components/public/reputation-section";
import { AboutSection } from "@/components/public/about-section";
import { FinalCTA } from "@/components/public/final-cta";
import { MobileStickyCTA } from "@/components/public/mobile-sticky-cta";
import {
  getTreatments,
  getFAQs,
  getPlatformRatings,
  getReviews,
  getTreatmentPrices,
  getAllSiteContent,
  getTestimonials,
} from "@/lib/supabase/queries";

const FAQSection = dynamicImport(() => import("@/components/public/faq-section").then((m) => m.FAQSection), {
  ssr: true,
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [treatments, faqs, ratings, reviews, prices, siteContent, testimonials] = await Promise.all([
    getTreatments(),
    getFAQs(),
    getPlatformRatings(),
    getReviews(),
    getTreatmentPrices(),
    getAllSiteContent(),
    getTestimonials(),
  ]);

  const tsContent = siteContent.treatments_section;
  const treatmentsSectionLabel = (tsContent?.sectionLabel ?? "Our Services") as string;
  const treatmentsHeading = (tsContent?.heading ?? "Treatments & Prices") as string;

  return (
    <>
      <Header content={siteContent.header} />
      <main className="flex-1">
        <Hero content={siteContent.hero} />
        <TrustBar content={siteContent.trust_bar} />
        <ReputationSection
          ratings={ratings}
          reviews={reviews}
          testimonials={testimonials}
          content={siteContent.reputation_section}
        />

        <section id="treatments" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              {treatmentsSectionLabel}
            </h2>
            <h3 className="mb-10 text-center text-3xl font-bold tracking-tight">
              {treatmentsHeading}
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
              content={siteContent.treatment_slider}
              cardContent={siteContent.treatment_card}
            />
          </div>
        </section>

        <WhyMobileMassage content={siteContent.why_mobile_massage} />
        <HowItWorks content={siteContent.how_it_works} />
        <AboutSection content={siteContent.about_section} />
        <section id="faq">
          <FAQSection faqs={faqs} content={siteContent.faq_section} />
        </section>
        <FinalCTA content={siteContent.final_cta} />
      </main>
      <Footer content={siteContent.footer} />
      <MobileStickyCTA content={siteContent.mobile_sticky_cta} />
    </>
  );
}