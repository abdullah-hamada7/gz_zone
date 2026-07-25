"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TreatmentCard } from "./treatment-card";

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

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [treatments]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = 380;
    el.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" });
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
    </div>
  );
}