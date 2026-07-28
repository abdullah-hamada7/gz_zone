import { createServiceClient } from "./server";
import type {
  Treatment,
  Duration,
  FAQ,
  Review,
  PlatformRating,
  Testimonial,
  GalleryImage,
  Certification,
  ConversionEvent,
} from "@/types";

async function safeQuery<T>(fn: () => Promise<{ data: T | null; error: unknown }>): Promise<T> {
  try {
    const { data, error } = await fn();
    if (error) return [] as unknown as T;
    return data ?? ([] as unknown as T);
  } catch {
    return [] as unknown as T;
  }
}

const db = () => createServiceClient();

export async function getTreatments(): Promise<Treatment[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("treatments").select("*").order("sort_order");
  });
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  try {
    const supabase = await db();
    const { data } = await supabase
      .from("treatments")
      .select("*")
      .eq("slug", slug)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function getDurationsForTreatment(treatmentId: string): Promise<Duration[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("durations").select("*").eq("treatment_id", treatmentId).order("minutes");
  });
}

export async function getFAQs(): Promise<FAQ[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("faqs").select("*").order("sort_order");
  });
}

export async function getReviews(): Promise<Review[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("reviews").select("*").order("sort_order");
  });
}

export async function getPlatformRatings(): Promise<PlatformRating[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("platform_ratings").select("*").order("platform");
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("testimonials").select("*").order("sort_order");
  });
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("gallery_images").select("*").order("sort_order");
  });
}

export async function getCertifications(): Promise<Certification[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase.from("certifications").select("*").order("sort_order");
  });
}

export async function getSiteContent(key: string): Promise<Record<string, unknown> | null> {
  try {
    const supabase = await db();
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("section_key", key)
      .single();
    return data?.content || null;
  } catch {
    return null;
  }
}

export async function getAllSiteContent(): Promise<Record<string, Record<string, unknown>>> {
  try {
    const supabase = await db();
    const { data } = await supabase.from("site_content").select("section_key, content");
    const map: Record<string, Record<string, unknown>> = {};
    for (const row of data || []) {
      map[row.section_key] = row.content as Record<string, unknown>;
    }
    return map;
  } catch {
    return {};
  }
}

export async function getTreatmentPrices(): Promise<Record<string, number>> {
  try {
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
  } catch {
    return {};
  }
}

export async function getConversionEvents(limit = 100): Promise<ConversionEvent[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase
      .from("conversion_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
  });
}

