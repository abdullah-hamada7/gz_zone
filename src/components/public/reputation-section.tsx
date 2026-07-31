import { Star } from "lucide-react";

interface PlatformRating {
  platform: string;
  rating: number;
  review_count: number;
  profile_url: string | null;
}

function PlatformLogo({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  if (normalized.includes("google")) {
    return (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }

  if (normalized.includes("tripadvisor")) {
    return (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-[#00AF87]" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.5 13.5a2.5 2.5 0 1 1 2.5-2.5 2.503 2.503 0 0 1-2.5 2.5zm5.5-2a1.5 1.5 0 1 1 1.5-1.5 1.502 1.502 0 0 1-1.5 1.5zm5.5 2a2.5 2.5 0 1 1 2.5-2.5 2.503 2.503 0 0 1-2.5 2.5z"/>
        <circle cx="6.5" cy="13" r="1" fill="#ffffff" />
        <circle cx="17.5" cy="13" r="1" fill="#ffffff" />
      </svg>
    );
  }

  if (normalized.includes("whatclinic")) {
    return (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-[#00A99D]" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-3H8v-2h3V8h2v3h3v2h-3v3z"/>
      </svg>
    );
  }

  return null;
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

        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {ratings.map((r) => (
            <div key={r.platform} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <PlatformLogo name={r.platform} />
                <p className="text-2xl font-bold text-foreground">{r.platform}</p>
              </div>
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
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary underline-offset-2 hover:bg-muted/80 hover:underline border border-primary/20 shadow-xs transition-colors"
                >
                  <PlatformLogo name={r.platform} />
                  <span>{reviewLabel} {r.platform} →</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}