"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  customer_name: string;
  content: string;
  rating: number;
  platform: string;
}

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const len = reviews.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % len), [len]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + len) % len), [len]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (len === 0) return null;

  const r = reviews[current];

  return (
    <div className="relative mx-auto max-w-2xl px-10">
      <div className="min-h-[200px] text-center">
        <div className="mb-3 flex justify-center gap-1">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="size-5 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">
          &ldquo;{r.content}&rdquo;
        </p>
        <p className="mt-4 text-sm font-semibold">{r.customer_name}</p>
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full border bg-background p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        aria-label="Previous review"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full border bg-background p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        aria-label="Next review"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`size-2 rounded-full transition-colors ${
              i === current ? "bg-foreground" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
