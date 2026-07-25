import React from "react";

interface GZZoneLogoTextProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fillColor?: string;
  ariaLabel?: string;
}

export function GZZoneLogoText({ className = "h-6 w-auto", fillColor = "currentColor", ariaLabel, ...props }: GZZoneLogoTextProps) {
  return (
    <svg
      viewBox="0 0 316 48"
      fill={fillColor}
      aria-label={ariaLabel}
      className={className}
      {...props}
    >
      <path d="M 0 10 C 0 4 4 0 10 0 L 36 0 C 42 0 46 4 46 10 L 46 15 L 33 15 L 33 12 C 33 11 32 10 31 10 L 15 10 C 14 10 13 11 13 12 L 13 36 C 13 37 14 38 15 38 L 31 38 C 32 38 33 37 33 36 L 33 27 L 23 27 L 23 17 L 46 17 L 46 38 C 46 44 42 48 36 48 L 10 48 C 4 48 0 44 0 38 Z" />
      <path d="M 52 0 L 92 0 C 96 0 98 3 98 7 L 98 12 L 72 37 L 98 37 L 98 48 L 52 48 C 48 48 46 45 46 41 L 46 36 L 72 11 L 52 11 Z" />
      <path d="M 102 0 L 112 0 L 109 16 L 100 16 Z" />
      <path d="M 116 0 L 156 0 C 160 0 162 3 162 7 L 162 12 L 136 37 L 162 37 L 162 48 L 116 48 C 112 48 110 45 110 41 L 110 36 L 136 11 L 116 11 Z" />
      <path d="M 168 10 C 168 4 172 0 178 0 L 204 0 C 210 0 214 4 214 10 L 214 38 C 214 44 210 48 204 48 L 178 48 C 172 48 168 44 168 38 Z M 181 12 L 181 36 C 181 37 182 38 183 38 L 199 38 C 200 38 201 37 201 36 L 201 12 C 201 11 200 10 199 10 L 183 10 C 182 10 181 11 181 12 Z" />
      <path d="M 220 0 L 233 0 L 253 30 L 253 0 L 266 0 L 266 48 L 253 48 L 233 18 L 233 48 L 220 48 Z" />
      <path d="M 272 0 L 312 0 L 312 11 L 285 11 L 285 18 L 308 18 L 308 29 L 285 29 L 285 37 L 312 37 L 312 48 L 272 48 Z" />
    </svg>
  );
}