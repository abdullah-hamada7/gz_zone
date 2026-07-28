"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function NewsletterSection({ content }: { content?: Record<string, unknown> }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const heading = (content?.heading as string) ?? "Get Wellness Tips & 10% Off Your First Session";
  const subheading = (content?.subheading as string) ?? "Subscribe to our newsletter for exclusive cupping advice, last-minute slot deals, and home stretching routines.";
  const privacyText = (content?.privacyText as string) ?? "🔒 We respect your privacy. No spam. Unsubscribe anytime.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-muted/40 border-t">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="rounded-2xl border bg-card p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          {submitted ? (
            <div className="py-6 space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">You're Subscribed! 🎉</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Thank you for subscribing! Your 10% discount code and welcome wellness guide have been sent to <span className="font-semibold text-foreground">{email}</span>.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                {subheading}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xs"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shrink-0 shadow-xs disabled:opacity-50"
                >
                  <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                  <Send className="size-4" />
                </button>
              </form>

              {errorMsg && <p className="mt-2 text-xs text-destructive">{errorMsg}</p>}

              <p className="mt-3 text-xs text-muted-foreground">
                {privacyText}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
