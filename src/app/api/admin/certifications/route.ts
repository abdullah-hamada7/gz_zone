import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order");
  if (error) {
    console.error("GET certifications error:", error);
    return NextResponse.json([], { status: 200 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from("certifications")
    .insert(body)
    .select()
    .single();
  if (error) {
    console.error("POST certifications error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}
