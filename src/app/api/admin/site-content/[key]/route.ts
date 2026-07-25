import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("section_key", key)
    .single();
  if (error && error.code === "PGRST116") {
    return NextResponse.json({ section_key: key, content: {} });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const supabase = await createServiceClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("site_content")
    .upsert(
      {
        section_key: key,
        content: body.content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "section_key" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
