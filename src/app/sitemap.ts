import type { MetadataRoute } from "next";
import { TREATMENTS } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gzzone.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/treatments`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const treatmentPages: MetadataRoute.Sitemap = TREATMENTS.map((t) => ({
    url: `${base}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...treatmentPages];
}
