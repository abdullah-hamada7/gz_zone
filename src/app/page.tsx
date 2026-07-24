import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { TrustBar } from "@/components/public/trust-bar";
import { WhyMobileMassage } from "@/components/public/why-mobile-massage";
import { HowItWorks } from "@/components/public/how-it-works";
import { FinalCTA } from "@/components/public/final-cta";
import { MobileStickyCTA } from "@/components/public/mobile-sticky-cta";
import { Footer } from "@/components/public/footer";
import { TreatmentSlider } from "@/components/public/treatment-slider";
import { ReputationSection } from "@/components/public/reputation-section";
import { AboutSection } from "@/components/public/about-section";
import { FAQSection } from "@/components/public/faq-section";
import { HERO, TREATMENTS, FAQS, PLATFORM_RATINGS, CLIENT_REVIEWS, getTreatmentPrices } from "@/data";

export default function HomePage() {
  const treatmentPrices = getTreatmentPrices();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero content={HERO} />
        <TrustBar />
        <ReputationSection ratings={PLATFORM_RATINGS} reviews={CLIENT_REVIEWS} />

        <section id="treatments" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Our Services
            </h2>
            <h3 className="mb-10 text-center text-3xl font-bold tracking-tight">
              Treatments & Prices
            </h3>
            <TreatmentSlider
              treatments={TREATMENTS.map((t) => ({
                id: t.id,
                name: t.name,
                slug: t.slug,
                short_description: t.short_description,
                category: t.category,
                priceFrom: treatmentPrices[t.slug],
              }))}
            />
          </div>
        </section>

        <WhyMobileMassage />
        <HowItWorks />
        <AboutSection />
        <section id="faq">
          <FAQSection faqs={FAQS} />
        </section>
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}