"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TreatmentCard } from "./treatment-card";
import { cn } from "@/lib/utils";

interface Treatment {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string;
  priceFrom?: number;
}

export function TreatmentSlider({ treatments }: { treatments: Treatment[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const itemWidth = el.scrollWidth / (treatments.length || 1);
    if (itemWidth > 0) {
      const idx = Math.min(
        treatments.length - 1,
        Math.max(0, Math.round(el.scrollLeft / itemWidth))
      );
      setActiveIdx(idx);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [treatments]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = 380;
    el.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / (treatments.length || 1);
    el.scrollTo({ left: idx * itemWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border bg-background text-foreground shadow-md transition-colors hover:bg-muted sm:flex cursor-pointer"
          aria-label="Previous treatments"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border bg-background text-foreground shadow-md transition-colors hover:bg-muted sm:flex cursor-pointer"
          aria-label="Next treatments"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none"
      >
        {treatments.map((t) => (
          <div key={t.id} className="w-[280px] sm:w-[350px] max-w-[82vw] shrink-0 snap-start">
            <TreatmentCard
              name={t.name}
              slug={t.slug}
              shortDescription={t.short_description || ""}
              priceFrom={t.priceFrom}
              category={t.category}
            />
          </div>
        ))}
      </div>

      {treatments.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5 py-1">
          {treatments.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "size-1.5 rounded-full transition-all cursor-pointer",
                i === activeIdx
                  ? "bg-primary w-3.5"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}