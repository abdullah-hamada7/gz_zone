import { NextResponse } from "next/server";
import { incrementBlogPostViews } from "@/lib/supabase/queries";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const newCount = await incrementBlogPostViews(slug);
    return NextResponse.json({ success: true, viewsCount: newCount });
  } catch {
    return NextResponse.json({ error: "Failed to increment view count" }, { status: 500 });
  }
}
