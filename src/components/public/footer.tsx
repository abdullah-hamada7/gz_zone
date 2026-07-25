import Link from "next/link";
import { MessageCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold">GZ&apos;ZONE</h3>
            <p className="text-xs italic text-muted-foreground">a zone without boundaries</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Professional mobile massage services in Porto and surrounding
              areas.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/treatments" className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground">
                  Treatments & Prices
                </Link>
              </li>
              <li>
                <a href="/#about" className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="/#faq" className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" />
                <a
                  href="https://wa.me/351913675810"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact GZ ZONE via WhatsApp at +351 913 675 810"
                  className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                >
                  +351 913 675 810
                </a>
              </li>
              <li className="flex items-center gap-2 py-2 min-h-[44px]">
                <Globe className="size-4 shrink-0" />
                <span>Porto, Portugal</span>
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
                  href="https://www.instagram.com/gz.zone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow GZ ZONE on Instagram @gz.zone"
                  className="inline-flex min-h-[44px] items-center py-2 hover:text-foreground"
                >
                  @gz.zone
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} GZ&apos;ZONE. All rights reserved.</p>
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
