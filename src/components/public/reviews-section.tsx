"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  customer_name: string;
  content: string;
  rating: number;
  platform: string;
  external_url: string | null;
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
          Recent Reviews
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="mb-2 flex gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  &ldquo;{r.content}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium">{r.customer_name}</p>
                  <span className="text-xs text-muted-foreground">
                    {r.platform}
                  </span>
                </div>
                {r.external_url && (
                  <a
                    href={r.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    Read original review →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
