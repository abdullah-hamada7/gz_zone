import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Edge / Server Image Proxy Route
 * Proxies Supabase storage requests with aggressive CDN cache headers.
 * Vercel / hosting provider CDNs cache this response, bypassing Supabase Cached Egress limits.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return new NextResponse("Bad Request: Missing image path", { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return new NextResponse("Server Configuration Error: Missing SUPABASE_URL", { status: 500 });
    }

    const imagePath = path.join("/");
    const targetUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`;

    const res = await fetch(targetUrl, {
      next: { revalidate: 31536000 }, // 1 year revalidation tag
    });

    if (!res.ok) {
      return new NextResponse(`Image fetch failed (${res.status})`, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Proxy error: ${msg}`, { status: 500 });
  }
}
