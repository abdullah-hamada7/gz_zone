"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Crop } from "lucide-react";
import { toast } from "sonner";
import { ImageCropModal, type CropResultMetadata } from "@/components/ui/image-crop-modal";
import { Button } from "@/components/ui/button";

import { convertHeicToJpegIfNeeded, parseUploadResponse } from "@/lib/upload-utils";
import { getOptimizedImageUrl } from "@/lib/cdn-utils";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null, metadata?: CropResultMetadata) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File | string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg =
      !file.type ||
      file.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|heic|heif|gif|bmp|tiff|avif)$/i.test(file.name);

    if (!isImg) {
      toast.error(`Invalid file type (${file.type || file.name}). Please select a valid photo file.`);
      return;
    }

    if (file.size > 35 * 1024 * 1024) {
      toast.error(`Photo is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max allowed size is 35MB.`);
      return;
    }

    let processedFile = file;
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isHeic = ext === "heic" || ext === "heif" || file.type === "image/heic" || file.type === "image/heif";

    if (isHeic) {
      const toastId = toast.loading("Converting iPhone/MacOS HEIC photo to JPEG...");
      try {
        processedFile = await convertHeicToJpegIfNeeded(file);
        toast.success("HEIC photo converted to JPEG!", { id: toastId });
      } catch (heicErr: unknown) {
        const msg = heicErr instanceof Error ? heicErr.message : String(heicErr);
        toast.error(`HEIC conversion warning: ${msg}`, { id: toastId });
      }
    }

    // Open cropper with selected/converted file
    setFileToCrop(processedFile);
    setCropModalOpen(true);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadCroppedFile(croppedFile: File, metadata: CropResultMetadata) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", croppedFile);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const parsed = await parseUploadResponse(res, "Photo upload");
      if (!parsed.ok) {
        toast.error(`Upload Error: ${parsed.error}`, { duration: 6000 });
        return;
      }

      onChange(parsed.data.url, metadata);
      toast.success("Photo uploaded successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Upload Network Failure: ${msg}`, { duration: 6000 });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={handleFile}
              disabled={uploading}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
            {uploading && <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground">Select an image to crop with freeform handles or paste a URL below</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={value || ""}
              onChange={(e) => onChange(e.target.value || null)}
              placeholder="https://"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {value && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0"
                  title="Crop Current Image"
                  onClick={() => {
                    setFileToCrop(value);
                    setCropModalOpen(true);
                  }}
                >
                  <Crop className="size-4 text-primary" />
                </Button>
                <button
                  type="button"
                  onClick={() => onChange(null)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-md border border-input hover:bg-muted cursor-pointer"
                  title="Remove photo"
                >
                  <X className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
        {value && (
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted/30 p-1 flex items-center justify-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getOptimizedImageUrl(value)}
              alt="Preview"
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <button
              type="button"
              onClick={() => {
                setFileToCrop(value);
                setCropModalOpen(true);
              }}
              className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-xs font-semibold"
            >
              <Crop className="size-3.5" /> Crop
            </button>
          </div>
        )}
        {!value && !uploading && (
          <div
            onClick={() => inputRef.current?.click()}
            className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground bg-muted/10 hover:border-primary cursor-pointer transition-colors"
          >
            <Upload className="size-6" />
          </div>
        )}
        {uploading && !value && (
          <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground bg-muted/10">
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
      </div>

      <ImageCropModal
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        imageSrc={fileToCrop}
        onCropComplete={uploadCroppedFile}
      />
    </div>
  );
}

