import Image from "next/image";
import { Shield, Heart, Award, Lock } from "lucide-react";

const trustPointIcons = [Shield, Heart, Award, Lock] as const;

export function AboutSection({ content }: { content?: Record<string, unknown> }) {
  const heading = content?.heading as string | undefined;
  const subheading = content?.subheading as string | undefined;
  const paragraphs = (content?.paragraphs as string[] | undefined) ?? [];
  const trustHeading = content?.trustHeading as string | undefined;
  const trustPoints = (content?.trustPoints as Array<{ title: string; description: string }> | undefined) ?? [];
  const certLabel = content?.certLabel as string | undefined;
  const certHeading = content?.certHeading as string | undefined;
  const certText = content?.certText as string | undefined;
  const imageAlt = (content?.imageAlt as string) ?? "";
  const certImageAlt = (content?.certImageAlt as string) ?? "";

  if (!heading && !subheading && paragraphs.length === 0) return null;

  const items = trustPoints.length > 0
    ? trustPoints.map((p, i) => ({ ...p, icon: trustPointIcons[i] ?? trustPointIcons[0] }))
    : [];

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {heading && <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">{heading}</h2>}
        {subheading && <h3 className="mb-12 text-center text-3xl font-bold tracking-tight">{subheading}</h3>}

        {imageAlt && (
          <div className="mx-auto mb-8 size-28 overflow-hidden rounded-full border-4 border-muted shadow-sm">
            <Image
              src="/images/untitled_design.jpg"
              alt={imageAlt}
              width={112}
              height={112}
              className="size-full object-cover"
            />
          </div>
        )}

        {paragraphs.length > 0 && (
          <div className="mb-16 space-y-4 text-center text-muted-foreground">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {trustHeading && (
          <h3 className="mb-8 text-center text-2xl font-bold">{trustHeading}</h3>
        )}
        {items.length > 0 && (
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {items.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="rounded-lg border bg-muted/20 p-6">
                  <Icon className="mb-3 size-8 text-primary" />
                  <h4 className="mb-2 font-semibold">{point.title}</h4>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {(certLabel || certHeading || certText) && (
          <div className="rounded-xl border bg-muted/20 p-8 sm:p-12">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
              {certImageAlt && (
                <div className="relative w-48 shrink-0 overflow-hidden rounded-xl border bg-background p-3 shadow-sm">
                  <Image
                    src="/images/certs.jpg"
                    alt={certImageAlt}
                    width={200}
                    height={280}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </div>
              )}
              <div className="max-w-md">
                {certLabel && <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{certLabel}</p>}
                {certHeading && <h4 className="mb-3 text-xl font-bold">{certHeading}</h4>}
                {certText && <p className="text-sm leading-relaxed text-muted-foreground">{certText}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}