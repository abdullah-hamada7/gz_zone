"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { GalleryImage } from "@/types";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newAltText, setNewAltText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchImages() {
    const res = await fetch("/api/admin/gallery");
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchImages() }, []);

  async function handleUpload(file: File) {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }

    const { url } = await uploadRes.json();

    const createRes = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_url: url,
        alt_text: newAltText || null,
        title: newTitle || null,
        sort_order: images.length,
      }),
    });

    setUploading(false);
    setNewAltText("");
    setNewTitle("");

    if (createRes.ok) {
      toast.success("Image added");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchImages();
    } else {
      toast.error("Failed to save image record");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      fetchImages();
    } else {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
          <p className="text-sm text-muted-foreground">Manage gallery images</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Upload New Image</h2>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input id="alt_text" value={newAltText} onChange={(e) => setNewAltText(e.target.value)} placeholder="Describe the image" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Optional title" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : images.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            <ImageIcon className="mx-auto mb-2 size-8 text-muted-foreground/50" />
            No images yet. Upload one above.
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div key={img.id} className="group relative overflow-hidden rounded-lg border bg-muted">
                <div className="aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.public_url}
                    alt={img.alt_text || ""}
                    className="size-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  {img.title && <p className="text-sm font-medium text-white truncate">{img.title}</p>}
                  {img.alt_text && <p className="text-xs text-white/80 truncate">{img.alt_text}</p>}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleDelete(img.id)}
                  >
                    <Trash2 className="mr-2 size-3" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
