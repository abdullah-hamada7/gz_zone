import dynamicImport from "next/dynamic";
import { preload } from "react-dom";
import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { TrustBar } from "@/components/public/trust-bar";
import { WhyMobileMassage } from "@/components/public/why-mobile-massage";
import { HowItWorks } from "@/components/public/how-it-works";
import { Footer } from "@/components/public/footer";
import { TreatmentSlider } from "@/components/public/treatment-slider";
import { ReputationSection } from "@/components/public/reputation-section";
import { AboutSection } from "@/components/public/about-section";
import { TestimonialsSection } from "@/components/public/testimonials-section";
import { CertificationsSection } from "@/components/public/certifications-section";
import {
  getTreatments,
  getFAQs,
  getPlatformRatings,
  getTreatmentPrices,
  getAllSiteContent,
  getGalleryImages,
  getTestimonials,
  getCertifications,
} from "@/lib/supabase/queries";
import { CATEGORY_LABELS } from "@/data";
import { getOptimizedImageUrl, getOptimizedSrcSet } from "@/lib/cdn-utils";

const FAQSection = dynamicImport(() => import("@/components/public/faq-section").then((m) => m.FAQSection), {
  ssr: true,
});

// ISR for free quotas: cache HTML on Vercel CDN for 1h.
// Cuts Vercel function runs + Supabase DB hits from every view to ~24/day.
export const revalidate = 3600;

export default async function HomePage() {
  const [treatments, faqs, ratings, prices, siteContent, galleryImages, testimonials, certifications] = await Promise.all([
    getTreatments(),
    getFAQs(),
    getPlatformRatings(),
    getTreatmentPrices(),
    getAllSiteContent(),
    getGalleryImages(),
    getTestimonials(),
    getCertifications(),
  ]);

  // LCP fast path: hint the browser to fetch the hero image ASAP with the
  // right responsive candidate, instead of discovering it mid-parse.
  const lcpUrl = galleryImages?.[0]?.public_url;
  if (lcpUrl) {
    preload(getOptimizedImageUrl(lcpUrl, { w: 800, q: 72 }), {
      as: "image",
      imageSrcSet: getOptimizedSrcSet(lcpUrl, [480, 800, 1200], 72),
      imageSizes: "(max-width: 1024px) 100vw, 560px",
      fetchPriority: "high",
    });
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero
          content={
            siteContent.hero
              ? (siteContent.hero as { title?: string; subtitle?: string; description?: string })
              : undefined
          }
          galleryImages={galleryImages}
        />
        <TrustBar content={siteContent.trust_bar} />
        <ReputationSection
          ratings={ratings}
          content={siteContent.reputation_section}
        />
        <TestimonialsSection testimonials={testimonials} />

        <section id="treatments" className="py-20 scroll-mt-20">
          <div id="booking" className="-mt-20 pt-20" />
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

        <WhyMobileMassage content={siteContent.why_mobile_massage} />
        <HowItWorks content={siteContent.how_it_works} />
        <AboutSection content={siteContent.about_section} certContent={siteContent.certifications_section} />
        <CertificationsSection certifications={certifications} content={siteContent.certifications_section} />
        <section id="faq" className="scroll-mt-20">
          <FAQSection faqs={faqs} content={siteContent.faq_section} />
        </section>
      </main>
      <Footer content={siteContent.footer} />
    </>
  );
}