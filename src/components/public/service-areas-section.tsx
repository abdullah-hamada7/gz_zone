"use client";

import { WhatsAppButton } from "./cta-button";
import { MapPin } from "lucide-react";

interface ServiceArea {
  name: string;
  description: string | null;
}

export function ServiceAreasSection({
  areas,
}: {
  areas: ServiceArea[];
}) {
  if (areas.length === 0) return null;

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Mobile Massage Across Porto
        </h2>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <span
              key={area.name}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-2 text-sm font-medium"
            >
              <MapPin className="size-4 text-primary" />
              {area.name}
            </span>
          ))}
        </div>

        <p className="mb-6 text-muted-foreground">
          Not sure if your location is covered? Send your location on WhatsApp
          and I will confirm availability.
        </p>

        <WhatsAppButton
          size="default"
          className="inline-flex"
        >
          Send Location on WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
