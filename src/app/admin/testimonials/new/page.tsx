"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhotoUrl, setCustomerPhotoUrl] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        customer_photo_url: customerPhotoUrl || null,
        content,
        location: location || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Testimonial created");
      router.push("/admin/testimonials");
    } else {
      toast.error("Failed to create");
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Testimonial</h1>
        <p className="text-sm text-muted-foreground">Add a featured testimonial for homepage</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name</Label>
          <Input id="customer_name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer_photo_url">Photo URL (optional)</Label>
          <Input id="customer_photo_url" type="url" value={customerPhotoUrl} onChange={(e) => setCustomerPhotoUrl(e.target.value)} placeholder="https://" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Testimonial Content</Label>
          <Textarea id="content" className="min-h-[120px]" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (optional)</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Porto, Portugal" />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Testimonial"}</Button>
          <Link href="/admin/testimonials" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
