import { createServiceClient } from "@/lib/supabase/server";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default async function AdminDashboardPage() {
  const supabase = createServiceClient();

  const tables = [
    "blog_posts",
    "conversion_events",
    "treatments",
    "durations",
    "faqs",
    "certifications",
    "platform_ratings",
    "testimonials",
    "site_content",
    "gallery_images",
  ] as const;

  const counts: Record<string, number> = {};

  for (const table of tables) {
    try {
      const { count, data } = await supabase
        .from(table)
        .select("id", { count: "exact" });
      counts[table] = count ?? data?.length ?? 0;
    } catch {
      counts[table] = 0;
    }
  }

  const labels: Record<string, string> = {
    blog_posts: "Blog Posts",
    conversion_events: "Conversion Events",
    treatments: "Treatments",
    durations: "Durations",
    faqs: "FAQs",
    certifications: "Certifications",
    platform_ratings: "Platform Ratings",
    testimonials: "Testimonials",
    site_content: "Site Sections",
    gallery_images: "Gallery Images",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Real-time summary of your website content and analytics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tables.map((table) => (
          <div
            key={table}
            className="rounded-xl border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {labels[table]}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              <AnimatedCounter value={counts[table]} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}