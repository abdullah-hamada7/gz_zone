"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Save, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { BLOG_CATEGORIES } from "@/data/blog-posts";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Cupping Therapy",
    categorySlug: "cupping-therapy",
    readTime: "5 min read",
    imageUrl: "",
    imageAlt: "",
    excerpt: "",
    content: "",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    tags: "Cupping, Pain Relief, Recovery",
    featured: false,
    relatedTreatmentSlug: "cupping-therapy",
  });

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
    }));
  };

  const handleCategoryChange = (catName: string) => {
    const catObj = BLOG_CATEGORIES.find((c) => c.name === catName);
    setFormData((prev) => ({
      ...prev,
      category: catName,
      categorySlug: catObj ? catObj.slug : "massage-therapy",
    }));
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        toast.success("Image uploaded directly to Supabase Storage!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Image upload error");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        author: {
          name: formData.authorName,
          role: formData.authorRole,
        },
      };

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Article created successfully!");
        router.push("/admin/blog");
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to create article");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Article</h1>
          <p className="text-sm text-muted-foreground">
            Publish a new massage, cupping, or wellness article
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border bg-card p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The Complete Guide to Cupping Therapy"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">URL Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. complete-guide-to-cupping-therapy"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {BLOG_CATEGORIES.filter((c) => c.slug !== "all").map((cat) => (
                <option key={cat.slug} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Read Time</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              placeholder="e.g. 5 min read"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Related Treatment Slug</label>
            <input
              type="text"
              value={formData.relatedTreatmentSlug}
              onChange={(e) => setFormData({ ...formData, relatedTreatmentSlug: e.target.value })}
              placeholder="e.g. cupping-therapy"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs"
            />
          </div>
        </div>

        {/* Cover Image URL & Supabase Storage File Upload */}
        <div className="space-y-3 rounded-lg border p-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <ImageIcon className="size-4 text-primary" /> Cover Image (Supabase Storage or URL) *
            </label>
            {uploading && <span className="text-xs text-primary animate-pulse">Uploading to Supabase...</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://... or upload a file below"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="shrink-0 w-full sm:w-auto"
            >
              <Upload className="mr-2 size-4" />
              Upload Image
            </Button>
          </div>

          {formData.imageUrl && (
            <div className="mt-2 flex items-center gap-3 border rounded-lg p-2 bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-16 w-24 object-cover rounded-md border"
              />
              <div className="text-xs text-muted-foreground truncate flex-1">
                <p className="font-semibold text-foreground">Live Thumbnail Preview</p>
                <p className="truncate">{formData.imageUrl}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">Short Excerpt *</label>
          <textarea
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="A short 2-3 sentence summary of the article..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">Full Article Content (Markdown format) *</label>
          <p className="text-[11px] text-muted-foreground">
            Use ## for section titles, ### for subheadings, and * for bullet points.
          </p>
          <textarea
            required
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your full article content here..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Author Display Name (Admin metadata)</label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Author Role (Admin metadata)</label>
            <input
              type="text"
              value={formData.authorRole}
              onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Cupping, Recovery, Muscle Relief"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="size-4 rounded border-muted text-primary focus:ring-primary"
          />
          <label htmlFor="featured" className="text-xs font-semibold text-foreground cursor-pointer">
            Set as Featured Article (Spotlight on blog main page)
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Link href="/admin/blog" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
          <Button type="submit" disabled={loading || uploading}>
            <Save className="mr-2 size-4" />
            {loading ? "Publishing..." : "Publish Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
