import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePublicPages } from "@/lib/revalidate";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from("treatments")
    .insert(body)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidatePublicPages(data?.slug);
  return NextResponse.json(data);
}
