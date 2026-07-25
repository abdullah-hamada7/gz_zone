"use client";

import { WhatsAppButton } from "./cta-button";
import { MapPin } from "lucide-react";

interface ServiceArea {
  name: string;
  description: string | null;
}

export function ServiceAreasSection({
  areas,
  content,
}: {
  areas: ServiceArea[];
  content?: Record<string, unknown>;
}) {
  const heading = content?.heading as string | undefined;
  const description = content?.description as string | undefined;
  const buttonText = (content?.buttonText ?? content?.button_text) as string | undefined;

  if (areas.length === 0 && !heading) return null;

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {heading && <h2 className="mb-4 text-3xl font-bold tracking-tight">{heading}</h2>}

        {areas.length > 0 && (
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
        )}

        {description && <p className="mb-6 text-muted-foreground">{description}</p>}

        {buttonText && (
          <WhatsAppButton size="default" className="inline-flex" text={buttonText} />
        )}
      </div>
    </section>
  );
}