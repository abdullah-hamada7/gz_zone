import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  TREATMENTS,
  DURATIONS,
  FAQS,
  CLIENT_REVIEWS,
  PLATFORM_RATINGS,
  TESTIMONIALS,
  HERO,
} from "@/data";

export async function POST() {
  const supabase = await createServiceClient();
  const results: Record<string, { success: boolean; count: number }> = {};

  const treatmentIdMap: Record<string, string> = {};

  const { data: existing } = await supabase.from("treatments").select("id, slug");
  if (existing) {
    for (const t of existing) {
      treatmentIdMap[t.slug] = t.id;
    }
  }

  if (!existing || existing.length === 0) {
    for (const t of TREATMENTS) {
      const { data, error } = await supabase
        .from("treatments")
        .insert({
          name: t.name,
          slug: t.slug,
          category: t.category,
          short_description: t.short_description,
          full_description: t.full_description,
          ideal_for: t.ideal_for,
          sort_order: t.sort_order,
        })
        .select("id, slug")
        .single();

      if (!error && data) {
        treatmentIdMap[data.slug] = data.id;
      }
    }
    results.treatments = { success: true, count: TREATMENTS.length };
  } else {
    results.treatments = { success: true, count: existing.length };
  }

  const slugToId: Record<string, string> = {
    "massage-therapy-1": treatmentIdMap["massage-therapy"] || "",
    "deep-tissue-1": treatmentIdMap["deep-tissue-massage"] || "",
    "facial-massage-1": treatmentIdMap["facial-massage"] || "",
    "reflexology-massage-1": treatmentIdMap["reflexology-massage"] || "",
    "back-neck-1": treatmentIdMap["back-neck-shoulders-head-massage"] || "",
    "sports-massage-1": treatmentIdMap["sports-massage"] || "",
    "cellulite-treatment-1": treatmentIdMap["cellulite-treatment"] || "",
    "anti-cellulite-cupping-1": treatmentIdMap["anti-cellulite-cupping"] || "",
    "anti-cellulite-massage-1": treatmentIdMap["anti-cellulite-massage"] || "",
    "dry-cupping-1": treatmentIdMap["dry-cupping"] || "",
    "reflexology-1": treatmentIdMap["reflexology"] || "",
  };

  const { data: existingDurations } = await supabase.from("durations").select("id", { count: "exact" });
  if (!existingDurations || existingDurations.length === 0) {
    for (const d of DURATIONS) {
      const treatmentDbId = slugToId[d.treatment_id];
      if (!treatmentDbId) continue;
      await supabase.from("durations").insert({
        treatment_id: treatmentDbId,
        minutes: d.minutes,
        price: d.price,
        sort_order: d.minutes,
      });
    }
    results.durations = { success: true, count: DURATIONS.length };
  }

  const { data: existingFaqs } = await supabase.from("faqs").select("id", { count: "exact" });
  if (!existingFaqs || existingFaqs.length === 0) {
    for (let i = 0; i < FAQS.length; i++) {
      const f = FAQS[i];
      await supabase.from("faqs").insert({
        question: f.question,
        answer: f.answer,
        category: f.category,
        sort_order: i,
      });
    }
    results.faqs = { success: true, count: FAQS.length };
  }

  const { data: existingReviews } = await supabase.from("reviews").select("id", { count: "exact" });
  if (!existingReviews || existingReviews.length === 0) {
    for (let i = 0; i < CLIENT_REVIEWS.length; i++) {
      const r = CLIENT_REVIEWS[i];
      await supabase.from("reviews").insert({
        customer_name: r.customer_name,
        content: r.content,
        rating: r.rating,
        platform: r.platform,
        external_url: r.external_url,
        sort_order: i,
      });
    }
    results.reviews = { success: true, count: CLIENT_REVIEWS.length };
  }

  const { data: existingRatings } = await supabase.from("platform_ratings").select("id", { count: "exact" });
  if (!existingRatings || existingRatings.length === 0) {
    for (const p of PLATFORM_RATINGS) {
      await supabase.from("platform_ratings").insert({
        platform: p.platform,
        rating: p.rating,
        review_count: p.review_count,
        profile_url: p.profile_url,
      });
    }
    results.platform_ratings = { success: true, count: PLATFORM_RATINGS.length };
  }

  const { data: existingTestimonials } = await supabase.from("testimonials").select("id", { count: "exact" });
  if (!existingTestimonials || existingTestimonials.length === 0) {
    for (let i = 0; i < TESTIMONIALS.length; i++) {
      const t = TESTIMONIALS[i];
      await supabase.from("testimonials").insert({
        customer_name: t.customer_name,
        customer_photo_url: t.customer_photo_url,
        content: t.content,
        location: t.location,
        sort_order: i,
      });
    }
    results.testimonials = { success: true, count: TESTIMONIALS.length };
  }

  const { data: existingSiteContent } = await supabase.from("site_content").select("id", { count: "exact" });
  if (!existingSiteContent || existingSiteContent.length === 0) {
    await supabase.from("site_content").upsert({
      section_key: "hero",
      content: HERO as unknown as Record<string, unknown>,
    });
    results.site_content = { success: true, count: 1 };
  }

  return NextResponse.json({ message: "Seed complete", results });
}
