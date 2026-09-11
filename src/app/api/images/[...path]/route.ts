import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Sharp needs the Node.js runtime (native bindings) — never the Edge runtime.
export const runtime = "nodejs";
// Each ?w=?q=?fm= variant is a distinct cache entry (Vercel caches by full URL).
export const dynamic = "force-dynamic";

/**
 * Optimized Supabase Storage image proxy.
 *
 * Query params (all optional, backwards compatible with plain /api/images/... URLs):
 *   w  — max output width in px (16–1920, never upscales). Default: 1280.
 *   q  — quality 10–90. Default: 72 (photo-friendly; Lighthouse flags q>80 waste).
 *   fm — "auto" (default) | "webp" | "avif" | "jpeg" | "png" | "original".
 *        "auto" negotiates via the Accept header, preferring WebP (fast to encode,
 *        universally supported) over AVIF.
 *
 * Responses carry immutable 1-year edge cache headers, so each resized variant is
 * fetched from Supabase origin once and then served from the Vercel CDN.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return new NextResponse("Bad Request: Missing image path", { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return new NextResponse("Server Configuration Error: Missing SUPABASE_URL", { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const width = clampInt(searchParams.get("w"), 16, 1920, 1280);
    const quality = clampInt(searchParams.get("q"), 10, 90, 72);
    const formatParam = (searchParams.get("fm") || "auto").toLowerCase();

    const imagePath = path.join("/");
    const targetUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`;

    const res = await fetch(targetUrl, {
      next: { revalidate: 31536000 }, // cache origin bytes in Next data cache
    });

    if (!res.ok) {
      return new NextResponse(`Image fetch failed (${res.status})`, { status: res.status });
    }

    const originType = (res.headers.get("content-type") || "").toLowerCase();
    const inputBuffer = Buffer.from(await res.arrayBuffer());

    const baseHeaders: Record<string, string> = {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
    };

    // Never rasterize/animate-break these: stream the original bytes untouched.
    if (originType.includes("svg") || originType.includes("gif")) {
      return new NextResponse(new Uint8Array(inputBuffer), {
        status: 200,
        headers: {
          ...baseHeaders,
          "Content-Type": res.headers.get("content-type") || "image/jpeg",
        },
      });
    }

    const outputFormat = resolveFormat(formatParam, request.headers.get("accept") || "", originType);

    // "original" (or unrecognized raster type): resize only, keep encoding.
    if (outputFormat === "original") {
      try {
        const resized = await sharp(inputBuffer)
          .rotate()
          .resize({ width, fit: "inside", withoutEnlargement: true })
          .toBuffer();
        return new NextResponse(new Uint8Array(resized), {
          status: 200,
          headers: {
            ...baseHeaders,
            "Content-Type": res.headers.get("content-type") || "image/jpeg",
            Vary: "Accept",
          },
        });
      } catch {
        return new NextResponse(new Uint8Array(inputBuffer), {
          status: 200,
          headers: { ...baseHeaders, "Content-Type": res.headers.get("content-type") || "image/jpeg" },
        });
      }
    }

    try {
      let pipeline = sharp(inputBuffer).rotate().resize({ width, fit: "inside", withoutEnlargement: true });

      let contentType: string;
      if (outputFormat === "avif") {
        pipeline = pipeline.avif({ quality, effort: 4, chromaSubsampling: "4:2:0" });
        contentType = "image/avif";
      } else if (outputFormat === "png") {
        pipeline = pipeline.png({ compressionLevel: 9 });
        contentType = "image/png";
      } else if (outputFormat === "jpeg") {
        pipeline = pipeline.jpeg({ quality, progressive: true, mozjpeg: true });
        contentType = "image/jpeg";
      } else {
        pipeline = pipeline.webp({ quality, effort: 4 });
        contentType = "image/webp";
      }

      const out = await pipeline.toBuffer();
      return new NextResponse(new Uint8Array(out), {
        status: 200,
        headers: { ...baseHeaders, "Content-Type": contentType, Vary: "Accept" },
      });
    } catch {
      // Sharp couldn't decode (e.g. HEIC without loader, corrupt file) — serve original.
      return new NextResponse(new Uint8Array(inputBuffer), {
        status: 200,
        headers: { ...baseHeaders, "Content-Type": res.headers.get("content-type") || "image/jpeg" },
      });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Proxy error: ${msg}`, { status: 500 });
  }
}

function clampInt(raw: string | null, min: number, max: number, fallback: number): number {
  const n = raw ? parseInt(raw, 10) : NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function resolveFormat(
  fm: string,
  accept: string,
  originType: string
): "webp" | "avif" | "jpeg" | "png" | "original" {
  if (fm === "webp" || fm === "avif" || fm === "jpeg" || fm === "jpg" || fm === "png") {
    return fm === "jpg" ? "jpeg" : fm;
  }
  if (fm === "original") return "original";
  // "auto": WebP is the sweet spot (fast encode on serverless, universal decode).
  // AVIF only when explicitly requested via ?fm=avif.
  if (accept.includes("image/webp")) return "webp";
  if (originType.includes("png")) return "png";
  if (originType.includes("webp")) return "webp";
  return "jpeg";
}
