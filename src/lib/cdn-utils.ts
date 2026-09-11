/**
 * Helper utilities to serve Supabase Storage images through the optimized
 * Vercel CDN proxy (/api/images/...?w=&q=).
 *
 * The proxy resizes (never upscales), converts to WebP/AVIF and caches each
 * variant immutably on the edge — so always request the smallest width that
 * fits the rendered slot.
 */

export interface ImageVariantOptions {
  /** Max output width in px (16–1920). Pick the rendered slot width × dpr. */
  w?: number;
  /** Quality 10–90. Default 72 (photo-friendly). */
  q?: number;
  /** Output format. Default "auto" (WebP via Accept negotiation). */
  fm?: "auto" | "webp" | "avif" | "jpeg" | "png" | "original";
}

export function getOptimizedImageUrl(url?: string | null, opts?: ImageVariantOptions): string {
  if (!url) return "";

  let optimized = url;

  // If url points to Supabase public storage, route via Vercel CDN proxy
  if (url.includes("/storage/v1/object/public/")) {
    const relativePath = url.split("/storage/v1/object/public/")[1];
    if (relativePath) {
      optimized = `/api/images/${relativePath}`;
    }
  }

  // Only the proxy understands ?w=?q=?fm= — never append to foreign origins.
  if (!optimized.startsWith("/api/images/") || !opts) return optimized;

  const params = new URLSearchParams();
  if (opts.w) params.set("w", String(Math.min(1920, Math.max(16, Math.round(opts.w)))));
  if (opts.q) params.set("q", String(Math.min(90, Math.max(10, Math.round(opts.q)))));
  if (opts.fm && opts.fm !== "auto") params.set("fm", opts.fm);
  const qs = params.toString();
  return qs ? `${optimized}?${qs}` : optimized;
}

/**
 * Builds a srcSet string for a proxy image, e.g. widths [400, 800, 1200]
 * → "/api/images/…?w=400&q=70 400w, …".
 */
export function getOptimizedSrcSet(url?: string | null, widths: number[] = [400, 800, 1200], q = 70): string {
  if (!url) return "";
  return widths
    .map((w) => `${getOptimizedImageUrl(url, { w, q })} ${w}w`)
    .join(", ");
}
