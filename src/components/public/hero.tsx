"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { WhatsAppButton } from "./cta-button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

const HERO_IMAGES = [
  { src: "/images/all-you-need-is-a-portable.jpg", alt: "Portable massage setup delivered to your location" },
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
  { src: "/images/gz-zone-a-zone-without.jpg", alt: "Gz Zone massage treatment" },
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

export function Hero({ content }: { content?: HeroContent }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {content?.subtitle && (
              <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {content.subtitle}
              </p>
            )}

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {content?.title || "Professional Massage. Delivered to You."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {content?.description ||
                "Enjoy a professional massage in the comfort of your home, hotel, or apartment in Porto. I bring the massage table and everything needed for your treatment directly to you."}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <WhatsAppButton size="lg" className="px-8 py-6 text-base" />
              <Link
                href="/treatments"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Explore Treatments
              </Link>
            </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
              <MapPin className="size-4" />
              Serving Porto and surrounding areas
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              {HERO_IMAGES.map((img, i) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`size-2 rounded-full transition-colors ${i === index ? "bg-foreground" : "bg-muted-foreground/30"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}