import Link from "next/link";
import Image from "next/image";

interface GZZoneBrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
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
}: GZZoneBrandLogoProps) {
  const sizeMap = {
    sm: {
      imgSize: 36,
      imgClass: "h-9 w-9 min-w-[36px]",
      textClass: "text-xs sm:text-sm",
    },
    md: {
      imgSize: 42,
      imgClass: "h-10 sm:h-11 w-10 sm:w-11 min-w-[40px] sm:min-w-[44px]",
      textClass: "text-sm sm:text-base",
    },
    lg: {
      imgSize: 52,
      imgClass: "h-12 sm:h-13 w-12 sm:w-13 min-w-[48px] sm:min-w-[52px]",
      textClass: "text-base sm:text-lg",
    },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="Gz'zone Logo"
        width={currentSize.imgSize}
        height={currentSize.imgSize}
        className={`${currentSize.imgClass} rounded-full object-cover shadow-sm border border-border/50`}
        priority
      />
      <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-sans ${currentSize.textClass} leading-tight`}>
        <span className="font-bold tracking-tight text-foreground">
          Gz&apos;zone
        </span>
        <span className="font-medium text-muted-foreground">
          - Massage &amp; Cupping Therapy | Porto
        </span>
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

