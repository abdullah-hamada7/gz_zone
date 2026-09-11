"use client";

import { useState } from "react";
import { Camera, Maximize2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getOptimizedImageUrl } from "@/lib/cdn-utils";
import type { GalleryImage } from "@/types";

export function GallerySection({
  images,
}: {
  images?: GalleryImage[];
}) {
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="w-full py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Camera className="size-3.5" />
            <span>Real Environment &amp; Professional Equipment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Session &amp; Treatment Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Take a look at the professional mobile massage setup, hygiene standards, and relaxing environment brought to your location.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImg(img)}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-xs hover:shadow-lg transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getOptimizedImageUrl(img.public_url)}
                alt={img.title || "Gz'zone Treatment Session Photo"}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/logo.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-sm font-semibold text-white truncate">{img.title || "Gz'zone Session Setup"}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-white/80">
                  <Maximize2 className="size-3 text-primary" /> Click to view full image
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox Dialog */}
      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 bg-background">
          {selectedImg && (
            <div>
              {selectedImg.title && (
                <DialogHeader className="mb-3">
                  <DialogTitle className="text-lg sm:text-xl font-bold text-foreground">
                    {selectedImg.title}
                  </DialogTitle>
                </DialogHeader>
              )}

              <div className="relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center min-h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getOptimizedImageUrl(selectedImg.public_url)}
                  alt={selectedImg.title || "Gz'zone Gallery Image"}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
