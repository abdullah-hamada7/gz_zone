"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GZZoneBrandLogo } from "@/components/ui/gz-zone-brand-logo";

const DEFAULT_NAV_LINKS = [
  { label: "Treatments", href: "/#treatments" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export function Header({ content }: { content?: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);

  const navLinks = (content?.navLinks as Array<{ label: string; href: string }> | undefined) ?? DEFAULT_NAV_LINKS;
  const menuToggleLabel = (content?.menuToggleLabel as string) ?? "Toggle menu";
  const tagline = (content?.tagline as string) ?? "A Zone Without Boundaries";
  const logoAriaLabel = (content?.logoAriaLabel as string) ?? "GZ'ZONE";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <GZZoneBrandLogo href="/" size="sm" tagline={tagline} logoAriaLabel={logoAriaLabel} />

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={menuToggleLabel}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}