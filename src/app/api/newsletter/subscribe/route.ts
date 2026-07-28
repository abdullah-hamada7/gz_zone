import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, source = "website" } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim(), source })
      .select()
      .single();

    if (error) {
      // Handle unique constraint error (already subscribed)
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already subscribed!", duplicate: true },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
