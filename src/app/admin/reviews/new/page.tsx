"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

export default function NewReviewPage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");
  const [platform, setPlatform] = useState("Google Maps");
  const [externalUrl, setExternalUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        content,
        rating: Number(rating),
        platform,
        external_url: externalUrl || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Review created");
      router.push("/admin/reviews");
    } else {
      toast.error("Failed to create");
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Review</h1>
        <p className="text-sm text-muted-foreground">Add a client review</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name</Label>
          <Input id="customer_name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Review Content</Label>
          <Textarea id="content" className="min-h-[100px]" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={rating} onValueChange={(v) => setRating(v ?? "5")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((n) => (
                  <SelectItem key={n} value={String(n)}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="external_url">External URL (optional)</Label>
          <Input id="external_url" type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://" />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Review"}</Button>
          <Link href="/admin/reviews" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
