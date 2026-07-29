import { createServiceClient } from "./server";
import { BLOG_POSTS } from "@/data/blog-posts";
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
  BlogPost,
  NewsletterSubscriber,
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("sort_order");

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        category: row.category,
        categorySlug: row.category_slug,
        readTime: row.read_time,
        publishedAt: row.published_at,
        author: {
          name: row.author_name || "GZ Zone Specialist",
          role: row.author_role || "Certified Therapist",
        },
        imageUrl: row.image_url,
        imageAlt: row.image_alt || row.title,
        tags: row.tags || [],
        featured: row.featured,
        relatedTreatmentSlug: row.related_treatment_slug,
        views_count: row.views_count || 0,
        sort_order: row.sort_order,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    }

    // If database table is connected but empty, return empty array if error is null (posts deleted by admin)
    if (!error && data && data.length === 0) {
      return [];
    }

    return BLOG_POSTS;
  } catch {
    return BLOG_POSTS;
  }
}

export async function incrementBlogPostViews(slug: string): Promise<number> {
  try {
    const supabase = await db();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, views_count")
      .eq("slug", slug)
      .single();

    if (data) {
      const newCount = (data.views_count || 0) + 1;
      await supabase
        .from("blog_posts")
        .update({ views_count: newCount, updated_at: new Date().toISOString() })
        .eq("id", data.id);
      return newCount;
    } else {
      // If post exists in fallback array, insert it into Supabase with views_count = 1
      const fallbackPost = BLOG_POSTS.find((p) => p.slug === slug);
      if (fallbackPost) {
        const { data: newRow } = await supabase
          .from("blog_posts")
          .insert({
            title: fallbackPost.title,
            slug: fallbackPost.slug,
            excerpt: fallbackPost.excerpt,
            content: fallbackPost.content,
            category: fallbackPost.category,
            category_slug: fallbackPost.categorySlug,
            read_time: fallbackPost.readTime,
            published_at: fallbackPost.publishedAt,
            author_name: fallbackPost.author.name,
            author_role: fallbackPost.author.role,
            image_url: fallbackPost.imageUrl,
            image_alt: fallbackPost.imageAlt,
            tags: fallbackPost.tags,
            featured: fallbackPost.featured || false,
            related_treatment_slug: fallbackPost.relatedTreatmentSlug || null,
            views_count: 1,
          })
          .select("views_count")
          .single();
        return newRow?.views_count || 1;
      }
    }
  } catch {
    // Fail silently
  }
  return 0;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  return safeQuery(async () => {
    const supabase = await db();
    return supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
  });
}

