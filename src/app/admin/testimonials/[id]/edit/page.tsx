"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import Link from "next/link";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [customerName, setCustomerName] = useState("");
  const [customerPhotoUrl, setCustomerPhotoUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/testimonials/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomerName(data.customer_name || "");
        setCustomerPhotoUrl(data.customer_photo_url || null);
        setContent(data.content || "");
        setLocation(data.location || "");
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load"); setLoading(false); });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/testimonials/${params.id}`, {
      method: "PUT",
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
      toast.success("Testimonial updated");
      router.push("/admin/testimonials");
    } else {
      toast.error("Failed to update");
    }
  }

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-sm text-muted-foreground">Update featured testimonial</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name</Label>
          <Input id="customer_name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label>Photo</Label>
          <ImageUpload value={customerPhotoUrl} onChange={setCustomerPhotoUrl} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Testimonial Content</Label>
          <Textarea id="content" className="min-h-[120px]" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          <Link href="/admin/testimonials" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
