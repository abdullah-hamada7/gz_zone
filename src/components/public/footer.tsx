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
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="lg:col-span-2">
            <GZZoneBrandLogo href="/" size="md" subtitle={description} />
          </div>

          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-foreground tracking-tight">{quickLinksHeading}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="inline-flex items-center hover:text-foreground transition-colors py-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-foreground tracking-tight">{contactHeading}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <a
                  href={phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact GZ ZONE via WhatsApp at ${phone}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors py-0.5"
                >
                  <MessageCircle className="size-4 shrink-0 text-primary" />
                  <span>{phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 py-0.5">
                <Globe className="size-4 shrink-0 text-primary" />
                <span>{location}</span>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow GZ ZONE on Instagram ${instagramHandle}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors py-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 shrink-0 text-primary"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                  </svg>
                  <span>{instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center justify-between gap-3 border-t pt-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} {copyright}</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
              aria-label="Read Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
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