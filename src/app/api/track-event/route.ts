import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { event_name = "whatsapp_click", treatment, duration, source_component, path, referrer } = body;

    const userAgent = req.headers.get("user-agent") || "";
    const reqReferrer = referrer || req.headers.get("referer") || "";

    const supabase = createServiceClient();
    const { error } = await supabase.from("conversion_events").insert({
      event_name,
      treatment: treatment || null,
      duration: duration || null,
      source_component: source_component || "unknown",
      path: path || null,
      user_agent: userAgent,
      referrer: reqReferrer,
    });

    if (error) {
      console.error("[Track Event Error]", error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Track Event Endpoint Error]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
