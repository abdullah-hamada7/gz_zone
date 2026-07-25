import { createClient } from "./server";
import type {
  Treatment,
  Duration,
  FAQ,
  Review,
  PlatformRating,
  Testimonial,
  GalleryImage,
  SiteContent,
} from "@/types";

export async function getTreatments(): Promise<Treatment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("treatments")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("treatments")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getDurationsForTreatment(treatmentId: string): Promise<Duration[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("durations")
    .select("*")
    .eq("treatment_id", treatmentId)
    .order("minutes");
  return data || [];
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getPlatformRatings(): Promise<PlatformRating[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("platform_ratings")
    .select("*")
    .order("platform");
  return data || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getSiteContent(key: string): Promise<Record<string, unknown> | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", key)
    .single();
  return data?.content || null;
}

export async function getTreatmentPrices(): Promise<Record<string, number>> {
  const treatments = await getTreatments();
  const allDurations = await Promise.all(
    treatments.map((t) => getDurationsForTreatment(t.id))
  );

  const map: Record<string, number> = {};
  for (let i = 0; i < treatments.length; i++) {
    const t = treatments[i];
    const durations = allDurations[i];
    if (durations.length > 0) {
      map[t.slug] = Math.min(...durations.map((d) => Number(d.price)));
    }
  }
  return map;
}
