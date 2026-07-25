"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
        return;
      }
      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
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
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
            />
            {uploading && <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground">Upload a photo or paste a URL below</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={value || ""}
              onChange={(e) => onChange(e.target.value || null)}
              placeholder="https://"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-input hover:bg-muted cursor-pointer"
                title="Remove photo"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        {value && (
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border">
            <img src={value} alt="Preview" className="absolute inset-0 size-full object-cover" />
          </div>
        )}
        {!value && !uploading && (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-dashed text-muted-foreground">
            <Upload className="size-6" />
          </div>
        )}
        {uploading && !value && (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-dashed text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
