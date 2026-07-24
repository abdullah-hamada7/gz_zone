import { MetadataRoute } from "next";
import { TREATMENTS } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gzzone.vercel.app";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = TREATMENTS.map((t) => ({
    url: `${baseUrl}/treatments/${t.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
