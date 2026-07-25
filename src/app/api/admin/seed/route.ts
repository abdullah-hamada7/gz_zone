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
  const supabase = createServiceClient();
  const results: Record<string, unknown> = {};

  const treatmentIdMap: Record<string, string> = {};

  const { data: existingTreatments } = await supabase
    .from("treatments")
    .select("id, slug");

  if (existingTreatments) {
    for (const t of existingTreatments) {
      treatmentIdMap[t.slug] = t.id;
    }
  }

  if (!existingTreatments || existingTreatments.length === 0) {
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
      if (error) results.treatments_error = error.message;
      if (data) treatmentIdMap[data.slug] = data.id;
    }
    results.treatments = TREATMENTS.length;
  } else {
    results.treatments = `skipped (${existingTreatments.length} exist)`;
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

  const { data: existingDurations } = await supabase
    .from("durations")
    .select("id");
  if (!existingDurations || existingDurations.length === 0) {
    let count = 0;
    for (const d of DURATIONS) {
      const tid = slugToId[d.treatment_id];
      if (!tid) continue;
      const { error } = await supabase.from("durations").insert({
        treatment_id: tid,
        minutes: d.minutes,
        price: d.price,
        sort_order: d.minutes,
      });
      if (!error) count++;
    }
    results.durations = count;
  } else {
    results.durations = `skipped (${existingDurations.length} exist)`;
  }

  const { data: existingFaqs } = await supabase.from("faqs").select("id");
  if (!existingFaqs || existingFaqs.length === 0) {
    let count = 0;
    for (let i = 0; i < FAQS.length; i++) {
      const f = FAQS[i];
      const { error } = await supabase.from("faqs").insert({
        question: f.question,
        answer: f.answer,
        category: f.category,
        sort_order: i,
      });
      if (!error) count++;
    }
    results.faqs = count;
  } else {
    results.faqs = `skipped (${existingFaqs.length} exist)`;
  }

  const { data: existingReviews } = await supabase.from("reviews").select("id");
  if (!existingReviews || existingReviews.length === 0) {
    let count = 0;
    for (let i = 0; i < CLIENT_REVIEWS.length; i++) {
      const r = CLIENT_REVIEWS[i];
      const { error } = await supabase.from("reviews").insert({
        customer_name: r.customer_name,
        content: r.content,
        rating: r.rating,
        platform: r.platform,
        external_url: r.external_url,
        sort_order: i,
      });
      if (!error) count++;
    }
    results.reviews = count;
  } else {
    results.reviews = `skipped (${existingReviews.length} exist)`;
  }

  const { data: existingRatings } = await supabase.from("platform_ratings").select("id");
  if (!existingRatings || existingRatings.length === 0) {
    let count = 0;
    for (const p of PLATFORM_RATINGS) {
      const { error } = await supabase.from("platform_ratings").insert({
        platform: p.platform,
        rating: p.rating,
        review_count: p.review_count,
        profile_url: p.profile_url,
      });
      if (!error) count++;
    }
    results.platform_ratings = count;
  } else {
    results.platform_ratings = `skipped (${existingRatings.length} exist)`;
  }

  const { data: existingTestimonials } = await supabase.from("testimonials").select("id");
  if (!existingTestimonials || existingTestimonials.length === 0) {
    let count = 0;
    for (let i = 0; i < TESTIMONIALS.length; i++) {
      const t = TESTIMONIALS[i];
      const { error } = await supabase.from("testimonials").insert({
        customer_name: t.customer_name,
        customer_photo_url: t.customer_photo_url,
        content: t.content,
        location: t.location,
        sort_order: i,
      });
      if (!error) count++;
    }
    results.testimonials = count;
  } else {
    results.testimonials = `skipped (${existingTestimonials.length} exist)`;
  }

  const { data: existingSiteContent } = await supabase.from("site_content").select("id");
  if (!existingSiteContent || existingSiteContent.length === 0) {
    const { error } = await supabase.from("site_content").upsert({
      section_key: "hero",
      content: HERO as unknown as Record<string, unknown>,
    });
    results.site_content = error ? error.message : "seeded";
  } else {
    results.site_content = "skipped";
  }

  return NextResponse.json({ message: "Seed complete", results });
}
