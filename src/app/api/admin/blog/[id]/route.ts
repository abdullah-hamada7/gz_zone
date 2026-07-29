import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

function isUuid(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();

  try {
    let query = supabase.from("blog_posts").select("*");
    if (isUuid(id)) {
      query = query.eq("id", id);
    } else {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    }

    const { data, error } = await query.maybeSingle();

    if (data) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const body = await request.json();

  const updateData = {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    category: body.category,
    category_slug: body.categorySlug,
    read_time: body.readTime,
    published_at: body.publishedAt || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author_name: body.author?.name || body.author_name || "GZ Zone Specialist",
    author_role: body.author?.role || body.author_role || "Certified Therapist",
    image_url: body.imageUrl || body.image_url || "",
    image_alt: body.imageAlt || body.image_alt || body.title,
    tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(",").map((t: string) => t.trim()) : []),
    featured: Boolean(body.featured),
    related_treatment_slug: body.relatedTreatmentSlug || body.related_treatment_slug || null,
    updated_at: new Date().toISOString(),
  };

  try {
    let updateQuery = supabase.from("blog_posts").update(updateData);
    if (isUuid(id)) {
      updateQuery = updateQuery.eq("id", id);
    } else {
      updateQuery = updateQuery.eq("slug", id);
    }

    const { data, error } = await updateQuery.select().maybeSingle();

    if (data) {
      try {
        revalidatePath("/blog");
        revalidatePath("/blog/[slug]", "page");
        revalidatePath(`/blog/${data.slug}`);
        revalidatePath("/");
      } catch {}
      return NextResponse.json(data);
    }

    // If update returned zero rows (because it was only in static data), upsert as new row in Supabase!
    const { data: inserted, error: insertError } = await supabase
      .from("blog_posts")
      .upsert({ ...updateData, views_count: 0 }, { onConflict: "slug" })
      .select()
      .single();

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });

    try {
      revalidatePath("/blog");
      revalidatePath("/blog/[slug]", "page");
      revalidatePath(`/blog/${inserted.slug}`);
      revalidatePath("/");
    } catch {}

    return NextResponse.json(inserted);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Update error";
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();

  try {
    let deleteQuery = supabase.from("blog_posts").delete();
    if (isUuid(id)) {
      deleteQuery = deleteQuery.eq("id", id);
    } else {
      deleteQuery = deleteQuery.or(`id.eq.${id},slug.eq.${id}`);
    }

    await deleteQuery;

    try {
      revalidatePath("/blog");
      revalidatePath("/blog/[slug]", "page");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
