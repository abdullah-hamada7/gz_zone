import Link from "next/link";
import Image from "next/image";

interface GZZoneBrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showTagline?: boolean;
}

/**
 * GZZoneBrandLogo
 * Official Brand Logo Component displaying /images/logo.jpg and beside it:
 * "Gz'zone - Massage & Cupping Therapy | Porto"
 */
export function GZZoneBrandLogo({
  size = "md",
  href,
  className = "",
  showTagline = true,
}: GZZoneBrandLogoProps) {
  const sizeMap = {
    sm: {
      imgSize: 36,
      imgClass: "h-8 sm:h-9 w-8 sm:w-9 min-w-[32px] sm:min-w-[36px]",
      textClass: "text-[11px] min-[380px]:text-xs sm:text-sm",
    },
    md: {
      imgSize: 42,
      imgClass: "h-9 sm:h-11 w-9 sm:w-11 min-w-[36px] sm:min-w-[44px]",
      textClass: "text-xs sm:text-base",
    },
    lg: {
      imgSize: 52,
      imgClass: "h-11 sm:h-13 w-11 sm:w-13 min-w-[44px] sm:min-w-[52px]",
      textClass: "text-sm sm:text-lg",
    },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-1.5 sm:gap-3 ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="Gz'zone Logo"
        width={currentSize.imgSize}
        height={currentSize.imgSize}
        className={`${currentSize.imgClass} shrink-0 rounded-full object-cover shadow-sm border border-border/50`}
        priority
      />
      <div className={`flex items-center gap-x-1 font-sans ${currentSize.textClass} leading-tight whitespace-nowrap`}>
        <span className="font-bold tracking-tight text-foreground whitespace-nowrap">
          Gz&apos;zone
        </span>
        {showTagline && (
          <span className="font-medium text-muted-foreground whitespace-nowrap">
            - Massage &amp; Cupping Therapy | Porto
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md transition-opacity hover:opacity-95"
      >
        {content}
      </Link>
    );
  }

  return content;
}

