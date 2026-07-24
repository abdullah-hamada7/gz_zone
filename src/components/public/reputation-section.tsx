import { ReviewCarousel } from "./review-carousel";

interface PlatformRating {
  platform: string;
  rating: number;
  review_count: number;
  profile_url: string | null;
}

interface Review {
  customer_name: string;
  content: string;
  rating: number;
  platform: string;
}

export function ReputationSection({
  ratings,
  reviews,
}: {
  ratings: PlatformRating[];
  reviews: Review[];
}) {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-8 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Trusted by Our Clients
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {ratings.map((r) => (
            <div key={r.platform} className="text-center">
              <p className="text-2xl font-bold">{r.platform}</p>
              <p className="mt-1 text-lg text-yellow-500">
                {"★".repeat(Math.round(r.rating))}
                <span className="text-muted-foreground">
                  {r.rating}/5
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on {r.review_count}+ reviews
              </p>
              {r.profile_url && (
                <a
                  href={r.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                >
                  Read Reviews →
                </a>
              )}
            </div>
          ))}
        </div>

        {reviews.length > 0 && (
          <div className="mt-12 border-t pt-12">
            <p className="mb-8 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              What Our Clients Say
            </p>
            <ReviewCarousel reviews={reviews} />
          </div>
        )}
      </div>
    </section>
  );
}
