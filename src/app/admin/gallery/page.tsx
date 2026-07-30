"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Upload,
  ImageIcon,
  Maximize2,
  Copy,
  Pencil,
  Grid,
  List,
  Search,
  Check,
  ExternalLink,
  Sparkles,
  Crop,
} from "lucide-react";
import { toast } from "sonner";
import type { GalleryImage } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ImageCropModal, type CropResultMetadata, CROP_PRESETS } from "@/components/ui/image-crop-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [newAltText, setNewAltText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropImageTarget, setCropImageTarget] = useState<{ src: File | string; existingImageId?: string } | null>(null);

  // Modals state
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAltText, setEditAltText] = useState("");
  const [editAspectRatio, setEditAspectRatio] = useState("freeform");
  const [editFitMode, setEditFitMode] = useState("cover");
  const [savingEdit, setSavingEdit] = useState(false);

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchImages() {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) setImages(await res.json());
    } catch {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSelectFileToCrop = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setCropImageTarget({ src: file });
    setCropperOpen(true);
  };

  async function handleCropCompleted(croppedFile: File, metadata: CropResultMetadata) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", croppedFile);

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

      if (cropImageTarget?.existingImageId) {
        // Update existing image public_url & ratio
        const updateRes = await fetch(`/api/admin/gallery/${cropImageTarget.existingImageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            public_url: url,
            aspect_ratio: metadata.aspectRatio,
            fit_mode: metadata.fitMode,
          }),
        });

        if (updateRes.ok) {
          toast.success("Gallery photo re-cropped & updated!");
          fetchImages();
        } else {
          toast.error("Failed to update cropped photo");
        }
      } else {
        // Save new gallery image record
        const createRes = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            public_url: url,
            alt_text: newAltText || null,
            title: newTitle || null,
            aspect_ratio: metadata.aspectRatio,
            fit_mode: metadata.fitMode,
            sort_order: images.length,
          }),
        });

        setNewAltText("");
        setNewTitle("");

        if (createRes.ok) {
          toast.success("Cropped image uploaded & saved to gallery!");
          if (fileInputRef.current) fileInputRef.current.value = "";
          fetchImages();
        } else {
          toast.error("Failed to save image record");
        }
      }
    } catch {
      toast.error("Image processing & upload failed");
    } finally {
      setUploading(false);
      setCropImageTarget(null);
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectFileToCrop(e.dataTransfer.files[0]);
    }
  };

  async function confirmDelete() {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTargetId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Image deleted");
        if (lightboxImage?.id === deleteTargetId) setLightboxImage(null);
        fetchImages();
      } else {
        toast.error("Failed to delete image");
      }
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingImage) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/gallery/${editingImage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim() || null,
          alt_text: editAltText.trim() || null,
          aspect_ratio: editAspectRatio || null,
          fit_mode: editFitMode || "cover",
        }),
      });

      if (res.ok) {
        toast.success("Image metadata updated!");
        setEditingImage(null);
        fetchImages();
      } else {
        toast.error("Failed to update image details");
      }
    } catch {
      toast.error("Failed to update image details");
    } finally {
      setSavingEdit(false);
    }
  }

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = images.filter((img) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (img.title && img.title.toLowerCase().includes(q)) ||
      (img.alt_text && img.alt_text.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery Showcase</h1>
          <p className="text-sm text-muted-foreground">
            Manage, upload, preview, and edit gallery photos displayed across the site
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border bg-card p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3 text-xs"
            >
              <Grid className="mr-1.5 size-3.5" /> Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3 text-xs"
            >
              <List className="mr-1.5 size-3.5" /> List
            </Button>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-6 transition-all text-center ${
          dragActive
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border bg-card hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleSelectFileToCrop(file);
          }}
        />

        <div className="mx-auto max-w-lg space-y-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <Upload className={`size-7 transition-transform ${uploading ? "animate-bounce" : ""}`} />
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-base">
              {uploading ? "Uploading Image to Supabase..." : "Drag & Drop Image Here or Click to Upload"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PNG, JPG, WEBP formats up to 10MB
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-left max-w-md mx-auto pt-2">
            <div className="space-y-1">
              <Label htmlFor="new_title" className="text-xs">Title (Optional)</Label>
              <Input
                id="new_title"
                size={1}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Deep Tissue Session"
                className="text-xs bg-background"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new_alt" className="text-xs">Alt Text (SEO)</Label>
              <Input
                id="new_alt"
                size={1}
                value={newAltText}
                onChange={(e) => setNewAltText(e.target.value)}
                placeholder="Describe image content..."
                className="text-xs bg-background"
              />
            </div>
          </div>

          <Button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            <Plus className="mr-2 size-4" /> Select File to Upload
          </Button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or alt text..."
            className="pl-9 text-xs"
          />
        </div>
        <p className="text-xs font-semibold text-muted-foreground">
          Showing {filteredImages.length} of {images.length} Gallery Images
        </p>
      </div>

      {/* Main Gallery Display */}
      <div className="rounded-xl border bg-card p-4 shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Loading gallery...
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ImageIcon className="mx-auto size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No gallery images match your search.</p>
            <p className="text-xs text-muted-foreground">Upload a new photo using the zone above.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl border bg-card shadow-xs transition-all hover:shadow-md hover:border-primary/40 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.public_url}
                    alt={img.alt_text || img.title || "Gallery photo"}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8 rounded-full shadow-sm"
                      title="Visual Crop & Format"
                      onClick={() => {
                        setCropImageTarget({ src: img.public_url, existingImageId: img.id });
                        setCropperOpen(true);
                      }}
                    >
                      <Crop className="size-4 text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8 rounded-full shadow-sm"
                      title="Preview Fullscreen"
                      onClick={() => setLightboxImage(img)}
                    >
                      <Maximize2 className="size-4 text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8 rounded-full shadow-sm"
                      title="Edit Title & Alt"
                      onClick={() => {
                        setEditingImage(img);
                        setEditTitle(img.title || "");
                        setEditAltText(img.alt_text || "");
                        setEditAspectRatio(img.aspect_ratio || "freeform");
                        setEditFitMode(img.fit_mode || "cover");
                      }}
                    >
                      <Pencil className="size-4 text-foreground" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8 rounded-full shadow-sm"
                      title="Copy Image URL"
                      onClick={() => copyToClipboard(img.public_url, img.id)}
                    >
                      {copiedId === img.id ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4 text-foreground" />}
                    </Button>
                  </div>
                </div>

                <div className="p-3 border-t bg-card space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {img.title || <span className="italic text-muted-foreground font-normal">Untitled Photo</span>}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary shrink-0">
                      {img.aspect_ratio || "Freeform"}
                    </span>
                  </div>
                  {img.alt_text && (
                    <p className="text-[11px] text-muted-foreground truncate">{img.alt_text}</p>
                  )}
                  <div className="pt-2 flex items-center justify-between border-t border-border/40">
                    <button
                      onClick={() => copyToClipboard(img.public_url, img.id)}
                      className="text-[10px] text-primary hover:underline font-mono truncate max-w-[140px]"
                    >
                      {img.public_url.split("/").pop()}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteTargetId(img.id)}
                      title="Delete Image"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-xs">
                  <th className="px-4 py-3 text-left font-medium">Image Preview</th>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Aspect &amp; Fit</th>
                  <th className="px-4 py-3 text-left font-medium">Alt Text (SEO)</th>
                  <th className="px-4 py-3 text-left font-medium">Public Link</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredImages.map((img) => (
                  <tr key={img.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-2">
                      <div
                        onClick={() => setLightboxImage(img)}
                        className="relative size-12 overflow-hidden rounded-lg border bg-muted cursor-pointer hover:opacity-80"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.public_url}
                          alt={img.alt_text || ""}
                          className="size-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {img.title || <span className="text-muted-foreground italic font-normal">Untitled</span>}
                    </td>
                    <td className="px-4 py-2 text-xs">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-foreground font-semibold">
                        {img.aspect_ratio || "Freeform"} ({img.fit_mode || "cover"})
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground max-w-xs truncate">
                      {img.alt_text || "—"}
                    </td>
                    <td className="px-4 py-2 text-xs font-mono text-primary max-w-xs truncate">
                      <a href={img.public_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        View File <ExternalLink className="size-3" />
                      </a>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Crop Image"
                          onClick={() => {
                            setCropImageTarget({ src: img.public_url, existingImageId: img.id });
                            setCropperOpen(true);
                          }}
                        >
                          <Crop className="size-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingImage(img);
                            setEditTitle(img.title || "");
                            setEditAltText(img.alt_text || "");
                            setEditAspectRatio(img.aspect_ratio || "freeform");
                            setEditFitMode(img.fit_mode || "cover");
                          }}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(img.public_url, img.id)}
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTargetId(img.id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Preview Dialog */}
      <Dialog open={!!lightboxImage} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
          {lightboxImage && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                  <Sparkles className="size-4" />
                  <span>Gallery Fullscreen Preview</span>
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {lightboxImage.title || "Gallery Image"}
                </DialogTitle>
                {lightboxImage.alt_text && (
                  <DialogDescription className="text-sm text-muted-foreground">
                    Alt Text: {lightboxImage.alt_text}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="relative my-2 w-full overflow-hidden rounded-xl border bg-black/90 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxImage.public_url}
                  alt={lightboxImage.alt_text || ""}
                  className="mx-auto max-h-[65vh] w-full object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteTargetId(lightboxImage.id)}
                >
                  <Trash2 className="mr-2 size-4" /> Delete Image
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCropImageTarget({ src: lightboxImage.public_url, existingImageId: lightboxImage.id });
                      setCropperOpen(true);
                      setLightboxImage(null);
                    }}
                  >
                    <Crop className="mr-2 size-3.5 text-primary" /> Crop Photo
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(lightboxImage.public_url, lightboxImage.id)}
                  >
                    <Copy className="mr-2 size-3.5" /> Copy Image URL
                  </Button>

                  <a
                    href={lightboxImage.public_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="size-3.5" /> Open Full-Res Original
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Metadata Modal */}
      <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Image Details</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update title, alt text, aspect ratio preset, and fit mode.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4 my-2">
            <div className="space-y-1">
              <Label htmlFor="edit_title" className="text-xs font-semibold">Title</Label>
              <Input
                id="edit_title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Dry Cupping Back Session"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit_alt" className="text-xs font-semibold">Alt Text (Accessibility &amp; SEO)</Label>
              <Input
                id="edit_alt"
                value={editAltText}
                onChange={(e) => setEditAltText(e.target.value)}
                placeholder="e.g. Certified therapist placing cupping glass on client's back"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Aspect Ratio Preset / Value</Label>
                <Select value={editAspectRatio} onValueChange={(val) => setEditAspectRatio(val || "freeform")}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_PRESETS.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-xs">
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Fit Mode</Label>
                <Select value={editFitMode} onValueChange={(val) => setEditFitMode(val || "cover")}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover" className="text-xs">Cover</SelectItem>
                    <SelectItem value="contain" className="text-xs">Contain</SelectItem>
                    <SelectItem value="fill" className="text-xs">Fill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditingImage(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={savingEdit}>
                {savingEdit ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Window Panel */}
      <ConfirmDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Delete Gallery Image?"
        description="Are you sure you want to delete this gallery image? This action will remove it permanently."
        confirmText="Delete Image"
        loading={deleting}
        onConfirm={confirmDelete}
      />

      {/* Interactive Freeform Crop Modal */}
      <ImageCropModal
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={cropImageTarget?.src || null}
        onCropComplete={handleCropCompleted}
      />
    </div>
  );
}
