"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  public_url: string;
  alt_text: string | null;
  title: string | null;
}

export function GallerySection({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Experience Gallery
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={img.public_url}
                alt={img.alt_text || ""}
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setSelected(null)}
          >
            <X className="size-6" />
          </button>
          <div className="relative size-full max-h-[80vh] max-w-3xl">
            <img
              src={images[selected].public_url}
              alt={images[selected].alt_text || ""}
              className="absolute inset-0 size-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
