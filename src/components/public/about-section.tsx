"use client";

import { Shield, Heart, Award, Lock } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/cdn-utils";

const defaultTrustPoints = [
  { icon: Shield, title: "Professional Approach", description: "Every treatment is delivered with the highest standards of professionalism and care." },
  { icon: Heart, title: "Respectful Environment", description: "Your comfort, privacy, and personal boundaries are respected throughout the entire experience." },
  { icon: Award, title: "Personalized Treatment", description: "Each session is tailored to your specific needs and preferences." },
  { icon: Lock, title: "Privacy and Comfort", description: "Your treatment takes place in the privacy of your chosen location." },
];

const trustPointIcons = [Shield, Heart, Award, Lock] as const;

export function AboutSection({
  content,
  certContent,
}: {
  content?: Record<string, unknown>;
  certContent?: Record<string, unknown>;
}) {
  const heading = (content?.heading as string) ?? "About";
  const subheading = (content?.subheading as string) ?? "Omar Elgazzar";
  const paragraphs = (content?.paragraphs as string[] | undefined) ?? [
    "As an ISSA-CFT certified massage specialist, I bring years of hands-on experience across Egypt, Türkiye, Russia, and now Porto. Every treatment I deliver is rooted in anatomical science and tailored to what your body actually needs.",
    "Whether it is deep tissue work to release chronic tension, sports recovery after intense training, or a full-body relaxation session — I take the time to listen, assess, and adapt each technique to you. My approach is not a fixed routine; it is a conversation between my hands and your body.",
    "I bring everything to your location: professional table, premium oils, and strict hygiene standards. Your comfort, privacy, and convenience come first — because healing should happen on your terms.",
    '"I followed my passion and became an ISSA-CFT & MASSAGE SPECIALIST. I created GZ\'ZONE — a zone without boundaries — to change wrong concepts, traditions, and habits by bringing science back into the track."',
  ];
  const trustHeading = (content?.trustHeading as string) ?? "Your Comfort Comes First";
  const trustPointsRaw = content?.trustPoints as Array<{ title: string; description: string }> | undefined;
  const trustPoints = (trustPointsRaw && trustPointsRaw.length > 0)
    ? trustPointsRaw.map((p, i) => ({ ...p, icon: trustPointIcons[i] ?? trustPointIcons[0] }))
    : defaultTrustPoints;
  const imageAlt = (certContent?.image_alt as string) ?? (content?.imageAlt as string) ?? "Omar Elgazzar — Mobile Massage Therapist Porto";
  const imageUrl = (content?.image_url as string) ?? null;

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">{heading}</h2>
        <h3 className="mb-12 text-center text-3xl font-bold tracking-tight">{subheading}</h3>

        {imageUrl && (
          <div className="mx-auto mb-8 size-28 overflow-hidden rounded-full border-4 border-muted shadow-sm">
            <img
              src={getOptimizedImageUrl(imageUrl)}
              alt={imageAlt}
              className="size-full object-cover"
              onError={(e) => {
                const parent = (e.currentTarget as HTMLImageElement).parentElement;
                if (parent) parent.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="mb-16 space-y-4 text-center text-muted-foreground">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="mb-8 text-center text-2xl font-bold">{trustHeading}</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {trustPoints.map((point) => {
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
      </div>
    </section>
  );
}