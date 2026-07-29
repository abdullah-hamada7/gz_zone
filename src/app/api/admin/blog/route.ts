import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("sort_order");

  if (error || !data) {
    return NextResponse.json([]);
  }

  return NextResponse.json(
    data.map((row) => ({
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
    }))
  );
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const postData = {
    title: body.title,
    slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    excerpt: body.excerpt || "",
    content: body.content || "",
    category: body.category || "Massage Therapy",
    category_slug: body.categorySlug || "massage-therapy",
    read_time: body.readTime || "5 min read",
    published_at: body.publishedAt || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author_name: body.author?.name || "GZ Zone Specialist",
    author_role: body.author?.role || "Certified Therapist",
    image_url: body.imageUrl || "",
    image_alt: body.imageAlt || body.title,
    tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(",").map((t: string) => t.trim()) : []),
    featured: Boolean(body.featured),
    related_treatment_slug: body.relatedTreatmentSlug || null,
    sort_order: body.sort_order || 0,
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(postData)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  try {
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/");
  } catch {}

  return NextResponse.json(data);
}
