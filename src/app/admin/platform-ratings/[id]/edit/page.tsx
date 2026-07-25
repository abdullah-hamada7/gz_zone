"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function EditPlatformRatingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("5.0");
  const [reviewCount, setReviewCount] = useState("0");
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/platform-ratings/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlatform(data.platform || "");
        setRating(String(data.rating || 5));
        setReviewCount(String(data.review_count || 0));
        setProfileUrl(data.profile_url || "");
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load"); setLoading(false); });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/platform-ratings/${params.id}`, {
      method: "PUT",
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
      toast.success("Platform rating updated");
      router.push("/admin/platform-ratings");
    } else {
      toast.error("Failed to update");
    }
  }

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Platform Rating</h1>
        <p className="text-sm text-muted-foreground">Update platform rating details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform Name</Label>
          <Input id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required />
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
          <Label htmlFor="profile_url">Profile URL</Label>
          <Input id="profile_url" type="url" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          <Link href="/admin/platform-ratings" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
