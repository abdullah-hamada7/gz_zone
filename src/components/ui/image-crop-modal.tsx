"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crop, Sparkles, Check, RotateCcw, Sliders, Maximize2, Move } from "lucide-react";
import { toast } from "sonner";

export interface CropResultMetadata {
  aspectRatio: string;
  fitMode: string;
  numericRatio: number;
}

interface ImageCropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | File | null;
  onCropComplete: (croppedFile: File, metadata: CropResultMetadata) => void;
  initialAspectRatio?: string;
  initialFitMode?: string;
  title?: string;
}

export const CROP_PRESETS = [
  { id: "freeform", label: "Custom Freeform", ratio: null },
  { id: "1:1", label: "1:1 Square (Canva/IG Post)", ratio: 1 },
  { id: "4:3", label: "4:3 Standard Photo", ratio: 4 / 3 },
  { id: "16:9", label: "16:9 Widescreen (Hero/Banner)", ratio: 16 / 9 },
  { id: "4:5", label: "4:5 Portrait (Instagram)", ratio: 4 / 5 },
  { id: "3:2", label: "3:2 Classic DSLR", ratio: 3 / 2 },
  { id: "9:16", label: "9:16 Story / Reel", ratio: 9 / 16 },
  { id: "custom", label: "Custom Ratio (Numeric)", ratio: null },
];

export function ImageCropModal({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  initialAspectRatio = "freeform",
  initialFitMode = "cover",
  title = "Crop & Format Image",
}: ImageCropModalProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  // Crop state in percentages or pixels relative to displayed image
  const [crop, setCrop] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [selectedPreset, setSelectedPreset] = useState<string>(initialAspectRatio || "freeform");
  const [customRatioInput, setCustomRatioInput] = useState<string>("1.65");
  const [fitMode, setFitMode] = useState<string>(initialFitMode || "cover");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Dragging state
  const isDraggingRef = useRef<boolean>(false);
  const activeHandleRef = useRef<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; cropX: number; cropY: number; cropW: number; cropH: number }>({
    x: 0,
    y: 0,
    cropX: 0,
    cropY: 0,
    cropW: 0,
    cropH: 0,
  });

  // Convert File/string to image URL
  useEffect(() => {
    if (!imageSrc) {
      setImgUrl(null);
      return;
    }
    if (typeof imageSrc === "string") {
      setImgUrl(imageSrc);
    } else {
      const url = URL.createObjectURL(imageSrc);
      setImgUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageSrc]);

  // Calculate current numerical ratio
  const getTargetRatio = useCallback((): number | null => {
    if (selectedPreset === "freeform") return null;
    if (selectedPreset === "custom") {
      const parsed = parseFloat(customRatioInput);
      return !isNaN(parsed) && parsed > 0 ? parsed : null;
    }
    const preset = CROP_PRESETS.find((p) => p.id === selectedPreset);
    return preset?.ratio ?? null;
  }, [selectedPreset, customRatioInput]);

  // Initialize crop box when image loads or preset changes
  const initCropBox = useCallback(
    (dw: number, dh: number) => {
      if (dw <= 0 || dh <= 0) return;
      const targetRatio = getTargetRatio();

      let w = dw * 0.85;
      let h = dh * 0.85;

      if (targetRatio) {
        if (w / h > targetRatio) {
          w = h * targetRatio;
        } else {
          h = w / targetRatio;
        }
      }

      const x = (dw - w) / 2;
      const y = (dh - h) / 2;

      setCrop({ x, y, width: w, height: h });
    },
    [getTargetRatio]
  );

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const dw = img.clientWidth;
    const dh = img.clientHeight;

    setNaturalSize({ width: nw, height: nh });
    setDisplaySize({ width: dw, height: dh });
    initCropBox(dw, dh);
  };

  // Re-adjust when preset changes
  useEffect(() => {
    if (displaySize.width > 0 && displaySize.height > 0) {
      initCropBox(displaySize.width, displaySize.height);
    }
  }, [selectedPreset, customRatioInput, initCropBox, displaySize]);

  // Pointer drag event handlers for rectangular handles and body
  const handlePointerDown = (handle: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    activeHandleRef.current = handle;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      cropX: crop.x,
      cropY: crop.y,
      cropW: crop.width,
      cropH: crop.height,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !activeHandleRef.current || displaySize.width <= 0) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const handle = activeHandleRef.current;
    const start = dragStartRef.current;
    const targetRatio = getTargetRatio();

    let newX = start.cropX;
    let newY = start.cropY;
    let newW = start.cropW;
    let newH = start.cropH;

    const MIN_SIZE = 24;

    if (handle === "move") {
      newX = Math.max(0, Math.min(displaySize.width - start.cropW, start.cropX + dx));
      newY = Math.max(0, Math.min(displaySize.height - start.cropH, start.cropY + dy));
    } else {
      if (handle.includes("e")) {
        newW = Math.max(MIN_SIZE, Math.min(displaySize.width - start.cropX, start.cropW + dx));
      }
      if (handle.includes("s")) {
        newH = Math.max(MIN_SIZE, Math.min(displaySize.height - start.cropY, start.cropH + dy));
      }
      if (handle.includes("w")) {
        const possibleW = start.cropW - dx;
        if (possibleW >= MIN_SIZE) {
          const maxDx = start.cropX;
          const actualDx = Math.min(maxDx, Math.max(- (displaySize.width - start.cropX - start.cropW), dx));
          newX = start.cropX + actualDx;
          newW = start.cropW - actualDx;
        }
      }
      if (handle.includes("n")) {
        const possibleH = start.cropH - dy;
        if (possibleH >= MIN_SIZE) {
          const maxDy = start.cropY;
          const actualDy = Math.min(maxDy, Math.max(- (displaySize.height - start.cropY - start.cropH), dy));
          newY = start.cropY + actualDy;
          newH = start.cropH - actualDy;
        }
      }

      // Enforce aspect ratio if active
      if (targetRatio) {
        if (handle === "e" || handle === "w") {
          newH = newW / targetRatio;
        } else if (handle === "n" || handle === "s") {
          newW = newH * targetRatio;
        } else {
          // Corner handles
          if (newW / newH > targetRatio) {
            newW = newH * targetRatio;
          } else {
            newH = newW / targetRatio;
          }
        }
        // Ensure bounds after ratio enforcement
        if (newX + newW > displaySize.width) newW = displaySize.width - newX;
        if (newY + newH > displaySize.height) newH = displaySize.height - newY;
      }
    }

    setCrop({
      x: Math.max(0, newX),
      y: Math.max(0, newY),
      width: Math.max(MIN_SIZE, newW),
      height: Math.max(MIN_SIZE, newH),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      activeHandleRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  // Perform canvas crop & export high quality image file
  const handleApplyCrop = async () => {
    if (!imgRef.current || displaySize.width <= 0 || displaySize.height <= 0) return;
    setIsProcessing(true);

    try {
      const img = imgRef.current;
      const scaleX = naturalSize.width / displaySize.width;
      const scaleY = naturalSize.height / displaySize.height;

      const sourceX = crop.x * scaleX;
      const sourceY = crop.y * scaleY;
      const sourceWidth = crop.width * scaleX;
      const sourceHeight = crop.height * scaleY;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(sourceWidth);
      canvas.height = Math.round(sourceHeight);
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        toast.error("Failed to initialize canvas context");
        setIsProcessing(false);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.error("Failed to generate cropped image");
            setIsProcessing(false);
            return;
          }

          const filename = typeof imageSrc === "object" && imageSrc instanceof File
            ? `cropped-${imageSrc.name}`
            : `cropped-image-${Date.now()}.webp`;

          const croppedFile = new File([blob], filename, { type: "image/webp" });
          const currentRatioVal = (crop.width / crop.height).toFixed(3);
          const ratioMetaString = selectedPreset === "custom"
            ? customRatioInput
            : selectedPreset === "freeform"
            ? currentRatioVal
            : selectedPreset;

          onCropComplete(croppedFile, {
            aspectRatio: ratioMetaString,
            fitMode,
            numericRatio: parseFloat(currentRatioVal),
          });

          setIsProcessing(false);
          onOpenChange(false);
          toast.success("Image cropped & formatted successfully!");
        },
        "image/webp",
        0.92
      );
    } catch {
      toast.error("Error cropping image");
      setIsProcessing(false);
    }
  };

  const calculatedRatio = crop.height > 0 ? (crop.width / crop.height).toFixed(2) : "1.00";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[92vh] flex flex-col p-4 sm:p-6 bg-card text-card-foreground overflow-hidden shadow-2xl border">
        <DialogHeader className="shrink-0 pb-2 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Crop className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Canva / Instagram-style visual crop editor. Drag corner &amp; side handles to adjust.
                </DialogDescription>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-muted px-2.5 py-1 rounded-md">
              <Sparkles className="size-3.5 text-primary" />
              <span>Ratio: {calculatedRatio}:1 ({selectedPreset === "freeform" ? "Freeform" : selectedPreset})</span>
            </div>
          </div>
        </DialogHeader>

        {/* Toolbar & Ratio Options */}
        <div className="shrink-0 py-3 grid gap-3 sm:grid-cols-3 border-b bg-muted/30 -mx-6 px-6">
          <div className="space-y-1">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Sliders className="size-3.5 text-primary" /> Preset / Aspect Ratio
            </Label>
            <Select value={selectedPreset} onValueChange={(val) => val && setSelectedPreset(val)}>
              <SelectTrigger className="h-8 text-xs bg-background">
                <SelectValue placeholder="Select ratio" />
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

          {selectedPreset === "custom" ? (
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Custom Ratio Value (W/H)</Label>
              <Input
                type="number"
                step="0.01"
                min="0.1"
                max="10"
                value={customRatioInput}
                onChange={(e) => setCustomRatioInput(e.target.value)}
                placeholder="e.g. 1.65"
                className="h-8 text-xs bg-background"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <Maximize2 className="size-3.5 text-primary" /> Fit Mode (Hero Display)
              </Label>
              <Select value={fitMode} onValueChange={(val) => val && setFitMode(val)}>
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover" className="text-xs">Cover (Fill container seamlessly)</SelectItem>
                  <SelectItem value="contain" className="text-xs">Contain (Preserve exact boundaries)</SelectItem>
                  <SelectItem value="fill" className="text-xs">Stretch Fill</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-end justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => displaySize.width > 0 && initCropBox(displaySize.width, displaySize.height)}
            >
              <RotateCcw className="mr-1.5 size-3.5" /> Reset Box
            </Button>
          </div>
        </div>

        {/* Visual Interactive Workspace */}
        <div
          ref={containerRef}
          className="relative flex-1 min-h-[280px] max-h-[50vh] my-2 overflow-hidden rounded-xl bg-black/90 flex items-center justify-center select-none"
        >
          {imgUrl ? (
            <div className="relative inline-block overflow-hidden max-h-full max-w-full">
              {/* Main Display Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imgUrl}
                alt="Source image for cropping"
                onLoad={handleImageLoad}
                className="block max-h-[50vh] max-w-full object-contain mx-auto"
                draggable={false}
              />

              {/* Crop Box Overlay */}
              {displaySize.width > 0 && (
                <div
                  style={{
                    left: `${crop.x}px`,
                    top: `${crop.y}px`,
                    width: `${crop.width}px`,
                    height: `${crop.height}px`,
                  }}
                  onPointerDown={(e) => handlePointerDown("move", e)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="absolute cursor-move border-2 border-primary bg-primary/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] group touch-none"
                >
                  {/* Rule of Thirds Grid Lines */}
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-60">
                    <div className="border-r border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-b border-white/30" />
                    <div className="border-r border-white/30" />
                    <div className="border-r border-white/30" />
                    <div />
                  </div>

                  {/* Move Center Handle Icon */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex size-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs">
                      <Move className="size-4" />
                    </div>
                  </div>

                  {/* Visual Handles: 4 Corners */}
                  <div
                    onPointerDown={(e) => handlePointerDown("nw", e)}
                    className="absolute -left-2 -top-2 size-4 cursor-nwse-resize rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-125"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("ne", e)}
                    className="absolute -right-2 -top-2 size-4 cursor-nesw-resize rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-125"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("sw", e)}
                    className="absolute -left-2 -bottom-2 size-4 cursor-nesw-resize rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-125"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("se", e)}
                    className="absolute -right-2 -bottom-2 size-4 cursor-nwse-resize rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-125"
                  />

                  {/* Visual Handles: 4 Edges */}
                  <div
                    onPointerDown={(e) => handlePointerDown("n", e)}
                    className="absolute left-1/2 -top-1.5 h-3 w-7 -translate-x-1/2 cursor-ns-resize rounded-full border border-primary bg-white shadow-xs transition-transform hover:scale-110"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("s", e)}
                    className="absolute left-1/2 -bottom-1.5 h-3 w-7 -translate-x-1/2 cursor-ns-resize rounded-full border border-primary bg-white shadow-xs transition-transform hover:scale-110"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("w", e)}
                    className="absolute -left-1.5 top-1/2 h-7 w-3 -translate-y-1/2 cursor-ew-resize rounded-full border border-primary bg-white shadow-xs transition-transform hover:scale-110"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown("e", e)}
                    className="absolute -right-1.5 top-1/2 h-7 w-3 -translate-y-1/2 cursor-ew-resize rounded-full border border-primary bg-white shadow-xs transition-transform hover:scale-110"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground text-xs">No image loaded</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 pt-3 border-t flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground hidden sm:block">
            Output: <span className="font-semibold text-foreground">{Math.round((crop.width * naturalSize.width) / (displaySize.width || 1))}px</span> &times; <span className="font-semibold text-foreground">{Math.round((crop.height * naturalSize.height) / (displaySize.height || 1))}px</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleApplyCrop}
              disabled={isProcessing || displaySize.width <= 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5"
            >
              <Check className="mr-1.5 size-4" />
              {isProcessing ? "Processing Crop..." : "Apply Crop & Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
