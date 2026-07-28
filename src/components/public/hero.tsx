"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
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

import type { GalleryImage } from "@/types";

interface HeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface Treatment {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string;
}

export function Hero({
  content,
  galleryImages,
}: {
  content?: HeroContent;
  galleryImages?: GalleryImage[];
}) {
  const images = (galleryImages && galleryImages.length > 0)
    ? galleryImages.map((img) => ({
        src: img.public_url,
        alt: img.alt_text || img.title || "GZ'ZONE mobile massage setup in Porto",
      }))
    : [];

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
    if (images.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden w-full">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <div className={`grid items-center gap-8 lg:gap-12 ${images.length > 0 ? 'lg:grid-cols-2' : ''}`}>
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left w-full">
            {content?.subtitle && (
              <p className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground break-words">
                {content.subtitle}
              </p>
            )}

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl break-words">
              {content?.title || "Professional Massage. Delivered to You."}
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {content?.description ||
                "Enjoy a professional massage in the comfort of your home, hotel, or apartment in Porto. I bring the massage table and everything needed for your treatment directly to you."}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-col lg:items-start">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger
                  render={
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#157347] hover:bg-[#13633B] text-white font-semibold px-8 py-6 text-base shadow-md gap-2 cursor-pointer min-h-[48px]"
                    >
                      <MessageCircle className="size-5 shrink-0" />
                      <span>Book via WhatsApp</span>
                    </Button>
                  }
                />
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#157347]/15 text-[#157347]">
                      <MessageCircle className="size-6" />
                    </div>
                    <DialogTitle className="text-center text-xl font-bold">
                      Please Select Your Treatment First
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm">
                      Choose your required treatment below to view duration, pricing, and book your personalized session directly via WhatsApp.
                    </DialogDescription>
                  </DialogHeader>

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

                  <div className="mt-2 flex flex-col gap-2">
                    <Link
                      href="/treatments"
                      onClick={() => setDialogOpen(false)}
                      className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full text-center min-h-[44px]")}
                    >
                      Browse All Treatments & Prices →
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>

              <Link
                href="/treatments"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto px-8 py-6 text-base min-h-[48px]")}
              >
                Explore Treatments
              </Link>
            </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
              <MapPin className="size-4 shrink-0" />
              <span>Serving Porto and surrounding areas</span>
            </p>
          </div>

          {images.length > 0 && (
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/20">
                <img
                  key={images[index]?.src}
                  src={images[index]?.src}
                  alt={images[index]?.alt || ""}
                  className="absolute inset-0 size-full object-cover"
                  onError={() => {
                    if (images.length > 1) {
                      setIndex((i) => (i + 1) % images.length);
                    }
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-center py-1">
                <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3.5 py-2 shadow-xs">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={cn(
                        "size-2.5 rounded-full transition-all cursor-pointer",
                        i === index
                          ? "bg-primary w-5"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
