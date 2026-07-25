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

const HERO_IMAGES = [
  { src: "/images/hero-lcp.jpg", alt: "GZ'ZONE mobile massage setup delivered to your location in Porto" },
  { src: "/images/aromatherapy-massage.jpg", alt: "Aromatherapy massage treatment" },
  { src: "/images/caption.jpg", alt: "Gz Zone massage session" },
  { src: "/images/cupping-therapy-hijama.jpg", alt: "Cupping therapy session" },
  { src: "/images/cupping-therapy-hijama (1).jpg", alt: "Cupping therapy treatment" },
  { src: "/images/cupping-therapy-hijama (2).jpg", alt: "Cupping therapy application" },
  { src: "/images/cupping-therapy-hijama (3).jpg", alt: "Dry cupping therapy" },
  { src: "/images/deep-tissue-massage.jpg", alt: "Deep tissue massage therapy" },
  { src: "/images/essential-oils.jpg", alt: "Essential oils for massage" },
  { src: "/images/essential-oils (1).jpg", alt: "Aromatherapy essential oils" },
  { src: "/images/essential-oils (2).jpg", alt: "Therapeutic essential oils" },
  { src: "/images/gz-zone-massage-cupping.jpg", alt: "Massage and cupping combination therapy" },
  { src: "/images/gz-zone-massage-cupping (1).jpg", alt: "Massage cupping therapy session" },
  { src: "/images/gz-zone-massage-cupping (2).jpg", alt: "Therapeutic cupping massage" },
  { src: "/images/gz-zone-massage-cupping (3).jpg", alt: "Cupping massage treatment" },
  { src: "/images/gz-zone-massage-cupping (4).jpg", alt: "Massage therapy with cupping" },
  { src: "/images/gz-zone-massage-cupping (5).jpg", alt: "Professional cupping massage" },
  { src: "/images/gz-zone-massage-cupping (6).jpg", alt: "Deep tissue cupping therapy" },
  { src: "/images/gz-zone-massage-cupping (7).jpg", alt: "Full body cupping massage" },
  { src: "/images/k6qFHE9onOx2dEvKWmPALwN3vZmI2Vu0.jpeg", alt: "Massage treatment session" },
  { src: "/images/KT90eNJhhFbuPBwtpTdqxM52GeKdkWP7.jpeg", alt: "Professional massage therapy" },
  { src: "/images/MBPcXB9oIEHuzl78FFmD0JxeEzOeVj5W.jpeg", alt: "Relaxing massage session" },
  { src: "/images/omar-elgazzar.jpg", alt: "Omar Elgazzar massage therapist" },
  { src: "/images/swedish-massage.jpg", alt: "Relaxing Swedish massage" },
  { src: "/images/trigger-points-massage.jpg", alt: "Trigger points massage therapy" },
  { src: "/images/trigger-points-massage (1).jpg", alt: "Trigger point release therapy" },
  { src: "/images/certs.jpg", alt: "Professional certifications and credentials" },
  { src: "/images/chatgpt_image_may_22_2026_at_08_16_19_pm.jpg", alt: "Massage therapy session" },
  { src: "/images/img_0344.jpg", alt: "Relaxing massage treatment" },
  { src: "/images/img_8888.jpg", alt: "Massage therapy setup" },
  { src: "/images/photo20260427212031.jpg", alt: "Professional massage session in Porto" },
  { src: "/images/untitled_design.jpg", alt: "Gz Zone massage experience" },
  { src: "/images/what_is_gzzone_1.jpg", alt: "Professional mobile massage setup in Porto" },
];

export function Hero({
  content,
  galleryImages,
}: {
  content?: HeroContent;
  galleryImages?: GalleryImage[];
}) {
  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages.map((img) => ({
          src: img.public_url,
          alt: img.alt_text || img.title || "GZ'ZONE mobile massage setup in Porto",
        }))
      : HERO_IMAGES;

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
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImage = images[index] || images[0];

  return (
    <section className="relative overflow-hidden w-full">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left w-full">
            {content?.subtitle && (
              <p className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase break-words">
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
                onClick={() => setIndex((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>

              <span className="text-xs font-semibold text-muted-foreground">
                {index + 1} / {HERO_IMAGES.length}
              </span>

              <button
                onClick={() => setIndex((i) => (i + 1) % HERO_IMAGES.length)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
