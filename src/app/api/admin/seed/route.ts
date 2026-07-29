import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  TREATMENTS,
  DURATIONS,
  FAQS,
  PLATFORM_RATINGS,
  TESTIMONIALS,
  SITE_CONTENT_SEED,
} from "@/data";
import { BLOG_POSTS } from "@/data/blog-posts";
import type { SiteContentKey } from "@/data";

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const results: Record<string, unknown> = {};

  const { searchParams } = new URL(request.url);
  const table = searchParams.get("table");

  if (table === "testimonials") {
    await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
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
    return NextResponse.json({ message: "Re-seeded testimonials", count });
  }

  const { data: existingTreatments } = await supabase.from("treatments").select("id");
  if (!existingTreatments || existingTreatments.length === 0) {
    let count = 0;
    for (let i = 0; i < TREATMENTS.length; i++) {
      const t = TREATMENTS[i];
      const { error } = await supabase.from("treatments").insert({
        id: t.id,
        name: t.name,
        slug: t.slug,
        category: t.category,
        short_description: t.short_description,
        full_description: t.full_description,
        ideal_for: t.ideal_for,
        sort_order: t.sort_order ?? i,
      });
      if (!error) count++;
    }
    results.treatments = count;
  } else {
    results.treatments = `skipped (${existingTreatments.length} exist)`;
  }

  const { data: existingDurations } = await supabase.from("durations").select("id");
  if (!existingDurations || existingDurations.length === 0) {
    let count = 0;
    for (const d of DURATIONS) {
      const { error } = await supabase.from("durations").insert({
        id: d.id,
        treatment_id: d.treatment_id,
        minutes: d.minutes,
        price: d.price,
        unit: d.unit || "min",
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

  const { data: existingBlog } = await supabase.from("blog_posts").select("id");
  if (!existingBlog || existingBlog.length === 0) {
    let count = 0;
    for (let i = 0; i < BLOG_POSTS.length; i++) {
      const b = BLOG_POSTS[i];
      const { error } = await supabase.from("blog_posts").insert({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        category_slug: b.categorySlug,
        read_time: b.readTime,
        published_at: b.publishedAt,
        author_name: b.author.name,
        author_role: b.author.role,
        image_url: b.imageUrl,
        image_alt: b.imageAlt,
        tags: b.tags,
        featured: b.featured || false,
        related_treatment_slug: b.relatedTreatmentSlug || null,
        views_count: b.views_count || 0,
        sort_order: i,
      });
      if (!error) count++;
    }
    results.blog_posts = count;
  } else {
    results.blog_posts = `skipped (${existingBlog.length} exist)`;
  }

  const { data: existingSiteContent } = await supabase.from("site_content").select("section_key");
  const seededKeys = new Set((existingSiteContent || []).map((s: { section_key: string }) => s.section_key));

  const entries = Object.entries(SITE_CONTENT_SEED) as [SiteContentKey, Record<string, unknown>][];
  let seededCount = 0;
  for (const [key, content] of entries) {
    if (!seededKeys.has(key)) {
      const { error } = await supabase.from("site_content").upsert({
        section_key: key,
        content,
      });
      if (!error) seededCount++;
    }
  }
  results.site_content = seededCount > 0 ? `seeded ${seededCount} sections` : `skipped (${seededKeys.size} exist)`;

  return NextResponse.json({ message: "Seed complete", results });
}
