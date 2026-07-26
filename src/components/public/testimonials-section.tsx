"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const len = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % len), [len]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + len) % len), [len]);

  useEffect(() => {
    if (len < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, len]);

  if (len === 0) return null;

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            What Clients Say
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">Testimonials</h2>
        </div>

        <div className="relative mx-auto max-w-2xl px-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Quote className="size-6 text-primary" />
            </div>
          </div>

          <div className="min-h-[200px] rounded-xl border bg-card p-8 pt-12 text-center shadow-sm">
            {t.customer_photo_url && !imgError[t.id] ? (
              <div className="-mt-16 mb-4 flex justify-center">
                <img
                  src={t.customer_photo_url}
                  alt={t.customer_name}
                  className="size-16 rounded-full border-4 border-background object-cover"
                  onError={() => setImgError((prev) => ({ ...prev, [t.id]: true }))}
                />
              </div>
            ) : (
              <div className="-mt-16 mb-4 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-sm font-bold text-primary">
                  {getInitials(t.customer_name)}
                </div>
              </div>
            )}
            <div className="mb-4 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-[#B45309] text-[#B45309]" />
              ))}
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="mt-6">
              <p className="font-semibold">{t.customer_name}</p>
              {t.location && (
                <p className="text-sm text-muted-foreground">{t.location}</p>
              )}
            </div>
          </div>

          {len > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-0 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-0 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`size-2 rounded-full transition-colors cursor-pointer ${
                      i === current ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
