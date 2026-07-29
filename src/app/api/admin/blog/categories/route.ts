import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const DEFAULT_CATEGORIES = [
  { name: "Cupping Therapy", slug: "cupping-therapy" },
  { name: "Massage Therapy", slug: "massage-therapy" },
  { name: "Pain Relief & Recovery", slug: "pain-relief-recovery" },
  { name: "Wellness Tips", slug: "wellness-tips" },
];

export async function GET() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "blog_categories")
    .single();

  if (!data?.content?.categories) {
    return NextResponse.json(DEFAULT_CATEGORIES);
  }

  return NextResponse.json(data.content.categories);
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { name, slug } = body;
  if (!name) {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }

  const categorySlug = slug || name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  // Fetch current categories
  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "blog_categories")
    .single();

  const current: Array<{ name: string; slug: string }> = data?.content?.categories || [...DEFAULT_CATEGORIES];

  // Prevent duplicate slug
  if (current.some((c) => c.slug === categorySlug)) {
    return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 });
  }

  const updated = [...current, { name: name.trim(), slug: categorySlug }];

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        section_key: "blog_categories",
        content: { categories: updated },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "section_key" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}

export async function PUT(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { oldSlug, name, slug } = body;
  if (!oldSlug || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newSlug = slug || name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "blog_categories")
    .single();

  const current: Array<{ name: string; slug: string }> = data?.content?.categories || [...DEFAULT_CATEGORIES];

  const updated = current.map((c) => (c.slug === oldSlug ? { name: name.trim(), slug: newSlug } : c));

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        section_key: "blog_categories",
        content: { categories: updated },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "section_key" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const supabase = createServiceClient();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Category slug is required" }, { status: 400 });
  }

  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "blog_categories")
    .single();

  const current: Array<{ name: string; slug: string }> = data?.content?.categories || [...DEFAULT_CATEGORIES];

  const updated = current.filter((c) => c.slug !== slug);

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        section_key: "blog_categories",
        content: { categories: updated },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "section_key" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}
