import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createServiceClient();

  const tables = [
    "treatments",
    "durations",
    "faqs",
    "reviews",
    "platform_ratings",
    "testimonials",
    "site_content",
    "gallery_images",
  ] as const;

  const counts: Record<string, number> = {};

  for (const table of tables) {
    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    counts[table] = count ?? 0;
  }

  const labels: Record<string, string> = {
    treatments: "Treatments",
    durations: "Durations",
    faqs: "FAQs",
    reviews: "Reviews",
    platform_ratings: "Platform Ratings",
    testimonials: "Testimonials",
    site_content: "Site Sections",
    gallery_images: "Gallery Images",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tables.map((table) => (
          <div
            key={table}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {labels[table]}
            </p>
            <p className="mt-2 text-3xl font-bold">{counts[table]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}