import Link from "next/link";
import { MessageCircle, Globe } from "lucide-react";
import { GZZoneBrandLogo } from "@/components/ui/gz-zone-brand-logo";

export function Footer({ content }: { content?: Record<string, unknown> }) {
  const description = (content?.description as string) ?? "Professional mobile massage services in Porto and surrounding areas.";
  const quickLinksHeading = (content?.quickLinksHeading as string) ?? "Quick Links";
  const contactHeading = (content?.contactHeading as string) ?? "Contact";
  const phone = (content?.phone as string) ?? "+351 913 675 810";
  const phoneHref = (content?.phoneHref as string) ?? "https://wa.me/351913675810";
  const location = (content?.location as string) ?? "Porto, Portugal";
  const instagramHandle = (content?.instagramHandle as string) ?? "@gz.zone";
  const instagramUrl = (content?.instagramUrl as string) ?? "https://www.instagram.com/gz.zone/";
  const copyright = (content?.copyright as string) ?? "GZ'ZONE. All rights reserved.";
  const quickLinks = (content?.quickLinks as Array<{ label: string; href: string }> | undefined) ?? [
    { label: "Treatments & Prices", href: "/treatments" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <GZZoneBrandLogo href="/" size="md" className="mb-3" />
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{quickLinksHeading}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{contactHeading}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" />
                <a
                  href={phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact GZ ZONE via WhatsApp at ${phone}`}
                  className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2 py-2 min-h-[44px]">
                <Globe className="size-4 shrink-0" />
                <span>{location}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                </svg>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow GZ ZONE on Instagram ${instagramHandle}`}
                  className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                >
                  {instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {copyright}</p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-[44px] items-center px-2 py-2 hover:text-foreground"
              aria-label="Read Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[44px] items-center px-2 py-2 hover:text-foreground"
              aria-label="Read Terms of Service"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}