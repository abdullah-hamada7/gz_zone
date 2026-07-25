import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "massage-therapy": "bg-blue-100/60 text-blue-900 border border-blue-200",
  "medical-aesthetics": "bg-purple-100/60 text-purple-900 border border-purple-200",
  "holistic-health": "bg-green-100/60 text-green-900 border border-green-200",
};

interface TreatmentCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  priceFrom?: number;
  category: string;
  content?: Record<string, unknown>;
}

export function TreatmentCard({
  name,
  slug,
  shortDescription,
  priceFrom,
  category,
  content,
}: TreatmentCardProps) {
  const categoryLabels = (content?.categoryLabels as Array<{ key: string; label: string }> | undefined) ?? [];
  const fromText = (content?.fromText as string) ?? "From";
  const currency = (content?.currency as string) ?? "\u20ac";
  const viewDetailsText = (content?.viewDetailsText as string) ?? "View Details";
  const viewDetailsAriaLabel = (content?.viewDetailsAriaLabel as string) ?? "View details for";

  const categoryLabel = categoryLabels.find((c) => c.key === category)?.label || category;

  return (
    <Card className="flex h-full flex-col group transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            categoryColors[category] || "bg-muted text-muted-foreground"
          }`}
        >
          {categoryLabel}
        </span>

        <h3 className="mt-3 text-xl font-semibold">{name}</h3>

        {shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {shortDescription}
          </p>
        )}

        {priceFrom && (
          <p className="mt-3 text-lg font-bold">
            {fromText}{" "}
            <span className="text-primary">
              {currency}{priceFrom}
            </span>
          </p>
        )}

        <Link
          href={`/treatments/${slug}`}
          aria-label={`${viewDetailsAriaLabel} ${name}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mt-auto inline-flex min-h-[44px] w-full items-center justify-between px-3 py-2 text-sm font-semibold hover:bg-muted/60 text-primary transition-colors rounded-lg border border-primary/20"
          )}
        >
          <span>{viewDetailsText}</span>
          <ArrowRight className="size-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}