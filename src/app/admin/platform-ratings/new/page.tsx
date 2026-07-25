"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function NewPlatformRatingPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("5.0");
  const [reviewCount, setReviewCount] = useState("0");
  const [profileUrl, setProfileUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/platform-ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform,
        rating: Number(rating),
        review_count: Number(reviewCount),
        profile_url: profileUrl || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Platform rating created");
      router.push("/admin/platform-ratings");
    } else {
      toast.error("Failed to create");
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Platform Rating</h1>
        <p className="text-sm text-muted-foreground">Add an aggregate rating for a platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform Name</Label>
          <Input id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required placeholder="e.g. Google" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review_count">Review Count</Label>
            <Input id="review_count" type="number" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile_url">Profile URL (optional)</Label>
          <Input id="profile_url" type="url" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} placeholder="https://" />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Rating"}</Button>
          <Link href="/admin/platform-ratings" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
