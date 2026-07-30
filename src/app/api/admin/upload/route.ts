import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const rawExt = file.name.split(".").pop() || "jpg";
    const ext = rawExt.toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let mimeType = file.type;
    if (!mimeType || mimeType === "application/octet-stream") {
      if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
      else if (ext === "png") mimeType = "image/png";
      else if (ext === "webp") mimeType = "image/webp";
      else if (ext === "gif") mimeType = "image/gif";
      else if (ext === "svg") mimeType = "image/svg+xml";
      else mimeType = "image/jpeg";
    }

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(fileName, buffer, {
        contentType: mimeType,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage Upload Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl, path: data.path });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server upload error";
    console.error("Upload route exception:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
