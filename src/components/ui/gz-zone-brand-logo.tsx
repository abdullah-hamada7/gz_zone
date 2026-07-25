import Link from "next/link";
import { GZZoneLogoText } from "@/components/ui/gz-zone-logo-text";

interface GZZoneBrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  href?: string;
  className?: string;
}

/**
 * GZZoneBrandLogo
 * Responsive SVG wordmark for GZ'ZONE + Tagline "A ZONE WITHOUT BOUNDARIES"
 * Generous tracking, crisp vector scaling at all resolutions.
 */
export function GZZoneBrandLogo({
  size = "md",
  showTagline = true,
  href,
  className = "",
}: GZZoneBrandLogoProps) {
  const sizeMap = {
    sm: { logo: "h-5 w-auto", tagline: "text-[9px] tracking-[0.18em]" },
    md: { logo: "h-7 w-auto", tagline: "text-[10.5px] tracking-[0.22em]" },
    lg: { logo: "h-11 w-auto", tagline: "text-[13px] tracking-[0.26em]" },
  };

  const content = (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <GZZoneLogoText className={`${sizeMap[size].logo} text-foreground transition-colors`} />
      {showTagline && (
        <span className={`${sizeMap[size].tagline} font-sans font-medium uppercase text-muted-foreground/90 whitespace-nowrap`}>
          A Zone Without Boundaries
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
}
