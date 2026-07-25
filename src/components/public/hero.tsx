"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Treatment {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string;
}

interface SlideshowImage {
  src: string;
  alt: string;
}

export function Hero({
  content,
}: {
  content?: Record<string, unknown>;
}) {
  const title = content?.title as string | undefined;
  const subtitle = content?.subtitle as string | undefined;
  const description = content?.description as string | undefined;
  const ctaText = (content?.ctaText ?? content?.cta_text) as string | undefined;
  const exploreText = (content?.exploreText ?? content?.explore_text) as string | undefined;
  const locationText = (content?.locationText ?? content?.location_text) as string | undefined;
  const dialogTitle = (content?.dialogTitle ?? content?.dialog_title) as string | undefined;
  const dialogDescription = (content?.dialogDescription ?? content?.dialog_description) as string | undefined;
  const dialogLink = (content?.dialogLink ?? content?.dialog_link) as string | undefined;
  const dialogLinkHref = (content?.dialogLinkHref as string) ?? "/treatments";
  const prevLabel = (content?.prevLabel as string) ?? "Previous image";
  const nextLabel = (content?.nextLabel as string) ?? "Next image";
  const slideshowImages = (content?.slideshowImages as SlideshowImage[] | undefined) ?? [];

  if (!title && !subtitle && !description) return null;

  const [index, setIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    fetch("/api/treatments")
      .then((r) => r.json())
      .then(setTreatments)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slideshowImages.length), 4500);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const currentImage = slideshowImages[index] || slideshowImages[0];

  return (
    <section className="relative overflow-hidden w-full">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left w-full">
            {subtitle && (
              <p className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase break-words">
                {subtitle}
              </p>
            )}

            {title && (
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl break-words">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-col lg:items-start">
              {ctaText && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger
                    render={
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-[#157347] hover:bg-[#13633B] text-white font-semibold px-8 py-6 text-base shadow-md gap-2 cursor-pointer min-h-[48px]"
                      >
                        <MessageCircle className="size-5 shrink-0" />
                        <span>{ctaText}</span>
                      </Button>
                    }
                  />
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#157347]/15 text-[#157347]">
                        <MessageCircle className="size-6" />
                      </div>
                      {dialogTitle && <DialogTitle className="text-center text-xl font-bold">{dialogTitle}</DialogTitle>}
                      {dialogDescription && <DialogDescription className="text-center text-sm">{dialogDescription}</DialogDescription>}
                    </DialogHeader>

                    {treatments.length > 0 && (
                      <div className="my-2 space-y-2 max-h-[260px] overflow-y-auto pr-1">
                        {treatments.slice(0, 6).map((t) => (
                          <Link
                            key={t.id}
                            href={`/treatments/${t.slug}`}
                            onClick={() => setDialogOpen(false)}
                            aria-label={`Select treatment ${t.name}`}
                            className="flex items-center justify-between rounded-lg border bg-muted/30 p-3 text-left transition-colors hover:bg-muted/70 hover:border-primary/50 min-h-[44px]"
                          >
                            <div>
                              <p className="font-semibold text-foreground text-sm">{t.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{t.short_description}</p>
                            </div>
                            <ArrowRight className="size-4 shrink-0 text-muted-foreground ml-2" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {dialogLink && (
                      <div className="mt-2 flex flex-col gap-2">
                        <Link
                          href={dialogLinkHref}
                          onClick={() => setDialogOpen(false)}
                          className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full text-center min-h-[44px]")}
                        >
                          {dialogLink}
                        </Link>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}

              {exploreText && (
                <Link
                  href="/treatments"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto px-8 py-6 text-base min-h-[48px]")}
                >
                  {exploreText}
                </Link>
              )}
            </div>

            {locationText && (
              <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
                <MapPin className="size-4 shrink-0" />
                <span>{locationText}</span>
              </p>
            )}
          </div>

          {slideshowImages.length > 0 && (
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/20">
                <Image
                  key={currentImage.src}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border bg-background/90 px-4 py-1.5 shadow-xs">
                <button
                  onClick={() => setIndex((i) => (i - 1 + slideshowImages.length) % slideshowImages.length)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                  aria-label={prevLabel}
                >
                  <ChevronLeft className="size-5" />
                </button>

                <span className="text-xs font-semibold text-muted-foreground">
                  {index + 1} / {slideshowImages.length}
                </span>

                <button
                  onClick={() => setIndex((i) => (i + 1) % slideshowImages.length)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                  aria-label={nextLabel}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}