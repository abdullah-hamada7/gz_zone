/**
 * Helper utility to optimize Supabase Storage URLs for Vercel CDN.
 * Routes direct Supabase Storage image URLs through Vercel's Edge CDN proxy (/api/images/...).
 */
export function getOptimizedImageUrl(url?: string | null): string {
  if (!url) return "";

  // If url points to Supabase public storage, route via Vercel CDN proxy
  if (url.includes("/storage/v1/object/public/")) {
    const relativePath = url.split("/storage/v1/object/public/")[1];
    if (relativePath) {
      return `/api/images/${relativePath}`;
    }
  }

  return url;
}
