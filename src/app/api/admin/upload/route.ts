import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // 1. Verify Supabase configuration before attempting upload
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      const missingKeys = [];
      if (!supabaseUrl) missingKeys.push("NEXT_PUBLIC_SUPABASE_URL");
      if (!serviceRoleKey) missingKeys.push("SUPABASE_SERVICE_ROLE_KEY");

      console.error("[Upload Route] Missing required environment variables:", missingKeys);
      return NextResponse.json(
        {
          error: `Server Configuration Error: Missing environment variables (${missingKeys.join(", ")}). Please check your .env configuration.`,
        },
        { status: 500 }
      );
    }

    // 2. Read request body form data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (formErr: unknown) {
      const msg = formErr instanceof Error ? formErr.message : String(formErr);
      console.error("[Upload Route] FormData parse exception:", formErr);
      return NextResponse.json(
        {
          error: `Payload Read Error: Failed to parse form data (${msg}). The photo file may exceed server payload limits.`,
        },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Bad Request: No file attached under field name 'file' in upload request." },
        { status: 400 }
      );
    }

    const rawExt = file.name.split(".").pop() || "jpg";
    const ext = rawExt.toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // 3. Convert file to buffer
    let arrayBuffer: ArrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
    } catch (bufErr: unknown) {
      const msg = bufErr instanceof Error ? bufErr.message : String(bufErr);
      return NextResponse.json(
        { error: `File Buffer Read Error: Could not process file '${file.name}' (${msg}).` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(arrayBuffer);

    // 4. Map MIME types cleanly for iPhone HEIC, JPEGs, PNGs, and WEBP photos
    let mimeType = file.type;
    if (!mimeType || mimeType === "application/octet-stream" || mimeType === "image/heic" || mimeType === "image/heif") {
      if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
      else if (ext === "png") mimeType = "image/png";
      else if (ext === "webp") mimeType = "image/webp";
      else if (ext === "gif") mimeType = "image/gif";
      else if (ext === "svg") mimeType = "image/svg+xml";
      else if (ext === "heic" || ext === "heif") mimeType = "image/jpeg"; // Default HEIC fallback to jpeg for bucket compatibility
      else mimeType = "image/jpeg";
    }

    const supabase = createServiceClient();

    // 5. Upload buffer to Supabase storage bucket 'gallery'
    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(fileName, buffer, {
        contentType: mimeType,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("[Upload Route] Supabase Storage Error:", error);
      return NextResponse.json(
        {
          error: `Supabase Storage Upload Error (Bucket 'gallery', File '${fileName}'): ${error.message}`,
          details: error,
        },
        { status: 400 }
      );
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl, path: data.path });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Upload Route] Unhandled exception:", err);
    return NextResponse.json(
      { error: `Internal Server Upload Exception: ${msg}` },
      { status: 500 }
    );
  }
}

