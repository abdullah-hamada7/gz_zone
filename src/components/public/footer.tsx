import Link from "next/link";
import { MessageCircle, Globe } from "lucide-react";
import { GZZoneBrandLogo } from "@/components/ui/gz-zone-brand-logo";

export function Footer({ content }: { content?: Record<string, unknown> }) {
  const description = content?.description as string | undefined;
  const quickLinksHeading = content?.quickLinksHeading as string | undefined;
  const quickLinks = (content?.quickLinks as Array<{ label: string; href: string }> | undefined) ?? [];
  const contactHeading = content?.contactHeading as string | undefined;
  const contactAriaLabel = (content?.contactAriaLabel as string) ?? "Contact GZ ZONE via WhatsApp at";
  const phone = content?.phone as string | undefined;
  const phoneHref = (content?.phoneHref as string) ?? "";
  const location = content?.location as string | undefined;
  const instagramHandle = content?.instagramHandle as string | undefined;
  const instagramUrl = content?.instagramUrl as string | undefined;
  const instagramAriaLabel = (content?.instagramAriaLabel as string) ?? "Follow GZ ZONE on Instagram";
  const copyright = content?.copyright as string | undefined;
  const privacyLabel = (content?.privacyLabel as string) ?? "Privacy Policy";
  const privacyHref = (content?.privacyHref as string) ?? "/privacy-policy";
  const privacyAriaLabel = (content?.privacyAriaLabel as string) ?? "Read Privacy Policy";
  const termsLabel = (content?.termsLabel as string) ?? "Terms";
  const termsHref = (content?.termsHref as string) ?? "/terms";
  const termsAriaLabel = (content?.termsAriaLabel as string) ?? "Read Terms of Service";
  const tagline = content?.tagline as string | undefined;
  const logoAriaLabel = content?.logoAriaLabel as string | undefined;

  if (!description && quickLinks.length === 0 && !phone && !location && !instagramHandle) return null;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <GZZoneBrandLogo href="/" size="md" className="mb-3" tagline={tagline} logoAriaLabel={logoAriaLabel} />
            {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
          </div>

          {quickLinks.length > 0 && (
            <div>
              {quickLinksHeading && <h3 className="mb-3 text-sm font-semibold">{quickLinksHeading}</h3>}
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
          )}

          {(phone || location || instagramHandle) && (
            <div>
              {contactHeading && <h3 className="mb-3 text-sm font-semibold">{contactHeading}</h3>}
              <ul className="space-y-1 text-sm text-muted-foreground">
                {phone && (
                  <li className="flex items-center gap-2">
                    <MessageCircle className="size-4 shrink-0" />
                    <a
                      href={phoneHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${contactAriaLabel} ${phone}`}
                      className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {location && (
                  <li className="flex items-center gap-2 py-2 min-h-[44px]">
                    <Globe className="size-4 shrink-0" />
                    <span>{location}</span>
                  </li>
                )}
                {instagramHandle && instagramUrl && (
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
                      aria-label={`${instagramAriaLabel} ${instagramHandle}`}
                      className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                    >
                      {instagramHandle}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs text-muted-foreground sm:flex-row">
          {copyright && <p>&copy; {new Date().getFullYear()} {copyright}</p>}
          <div className="flex gap-4">
            <Link
              href={privacyHref}
              className="inline-flex min-h-[44px] items-center px-2 py-2 hover:text-foreground"
              aria-label={privacyAriaLabel}
            >
              {privacyLabel}
            </Link>
            <Link
              href={termsHref}
              className="inline-flex min-h-[44px] items-center px-2 py-2 hover:text-foreground"
              aria-label={termsAriaLabel}
            >
              {termsLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}