"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TreatmentCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  priceFrom?: number;
  category: string;
}

const categoryColors: Record<string, string> = {
  "massage-therapy": "bg-blue-50 text-blue-700",
  "medical-aesthetics": "bg-purple-50 text-purple-700",
  "holistic-health": "bg-green-50 text-green-700",
};

const categoryLabels: Record<string, string> = {
  "massage-therapy": "Massage Therapy",
  "medical-aesthetics": "Medical Aesthetics",
  "holistic-health": "Holistic Health",
};

export function TreatmentCard({
  name,
  slug,
  shortDescription,
  priceFrom,
  category,
}: TreatmentCardProps) {
  return (
    <Card className="flex h-full flex-col group transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            categoryColors[category] || "bg-muted text-muted-foreground"
          }`}
        >
          {categoryLabels[category] || category}
        </span>

        <h3 className="mt-3 text-xl font-semibold">{name}</h3>

        {shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {shortDescription}
          </p>
        )}

        {priceFrom && (
          <p className="mt-3 text-lg font-bold">
            From{" "}
            <span className="text-primary">
              €{priceFrom}
            </span>
          </p>
        )}

        <Link
          href={`/treatments/${slug}`}
          aria-label={`View details for ${name}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mt-auto inline-flex min-h-[44px] w-full items-center justify-between px-3 py-2 text-sm font-semibold hover:bg-muted/60 text-primary transition-colors rounded-lg border border-primary/20"
          )}
        >
          <span>View Details</span>
          <ArrowRight className="size-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
