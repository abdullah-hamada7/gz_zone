import { Star } from "lucide-react";

interface PlatformRating {
  platform: string;
  rating: number;
  review_count: number;
  profile_url: string | null;
}

export function ReputationSection({
  ratings,
  content,
}: {
  ratings: PlatformRating[];
  content?: Record<string, unknown>;
}) {
  const heading = (content?.heading as string) ?? "Trusted by Our Clients";
  const reviewLabel = (content?.reviewLabel as string) ?? "Read Reviews on";

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-8 text-sm font-semibold tracking-wider text-muted-foreground uppercase">{heading}</p>

        <div className="flex flex-wrap justify-center gap-8">
          {ratings.map((r) => (
            <div key={r.platform} className="text-center">
              <p className="text-2xl font-bold">{r.platform}</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#B45309] text-[#B45309]" />
                  ))}
                </div>
                <span className="ml-1 text-sm font-bold text-foreground">{r.rating}/5</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Based on {r.review_count}+ reviews</p>
              {r.profile_url && (
                <a
                  href={r.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read reviews on ${r.platform}`}
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-primary underline-offset-2 hover:bg-muted/80 hover:underline border border-primary/20"
                >
                  {reviewLabel} {r.platform} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}