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
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="mb-8 text-sm font-semibold tracking-wider text-muted-foreground uppercase">{heading}</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-6 sm:gap-8 items-stretch">
          {ratings.map((r) => (
            <div key={r.platform} className="flex flex-col justify-between items-center text-center p-4 rounded-xl bg-background/50 border border-border/50 shadow-xs hover:border-primary/30 transition-colors">
              <div>
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{r.platform.trim()}</p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-[#B45309] text-[#B45309]" />
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-bold text-foreground">{r.rating}/5</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Based on {r.review_count}+ reviews</p>
              </div>
              {r.profile_url && (
                <a
                  href={r.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read reviews on ${r.platform.trim()}`}
                  className="mt-4 inline-flex min-h-[40px] w-full items-center justify-center rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-primary underline-offset-2 hover:bg-primary/10 hover:underline border border-primary/20 transition-all"
                >
                  {reviewLabel} {r.platform.trim()} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}