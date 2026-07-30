/**
 * Utility functions for handling photo uploads, HEIC/HEIF image conversion (iPhone & MacOS),
 * and extracting detailed diagnostic error messages from API responses.
 */

export async function convertHeicToJpegIfNeeded(file: File): Promise<File> {
  if (!file) return file;

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const isHeic =
    ext === "heic" ||
    ext === "heif" ||
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.type === "image/heic-sequence" ||
    file.type === "image/heif-sequence";

  if (!isHeic) {
    return file;
  }

  try {
    if (typeof window === "undefined") return file;
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });

    const convertedBlob = Array.isArray(result) ? result[0] : result;
    const newName = file.name.replace(/\.(heic|heif)$/i, ".jpg");

    return new File([convertedBlob], newName, { type: "image/jpeg" });
  } catch (err: unknown) {
    console.warn("HEIC conversion notice (proceeding with original file):", err);
    return file;
  }
}

export interface ParsedApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error: string;
}

export async function parseUploadResponse<T = any>(
  res: Response,
  fallbackContext = "Photo Upload"
): Promise<ParsedApiResponse<T>> {
  const status = res.status;
  const contentType = res.headers.get("content-type") || "";

  if (res.ok) {
    try {
      const data = await res.json();
      return { ok: true, status, data, error: "" };
    } catch (parseErr: any) {
      return {
        ok: false,
        status,
        error: `${fallbackContext} succeeded (HTTP ${status}), but the server returned invalid JSON: ${parseErr?.message || "JSON syntax error"}.`,
      };
    }
  }

  // Handle non-OK HTTP responses with detailed error reporting
  if (contentType.includes("application/json")) {
    try {
      const json = await res.json();
      const errorMsg =
        json.error ||
        json.message ||
        (json.details ? JSON.stringify(json.details) : `Server HTTP ${status} error`);
      return {
        ok: false,
        status,
        data: json,
        error: `[Server HTTP ${status}] ${errorMsg}`,
      };
    } catch {
      // Fallback if JSON parsing fails
    }
  }

  // Non-JSON or HTML error pages (e.g. 413 Payload Too Large, 502 Bad Gateway)
  let detailedReason = "";
  if (status === 413) {
    detailedReason = "File size exceeds server upload limits (HTTP 413 Payload Too Large). Please select a smaller photo or compress it first.";
  } else if (status === 415) {
    detailedReason = "Unsupported file media format (HTTP 415). Please select a valid JPG, PNG, WEBP, or HEIC photo.";
  } else if (status === 401 || status === 403) {
    detailedReason = `Authentication/Permission error (HTTP ${status}). You must be logged in as an admin to upload photos.`;
  } else if (status === 404) {
    detailedReason = `Upload API route missing (HTTP 404). Please verify that /api/admin/upload route is reachable.`;
  } else if (status === 500) {
    detailedReason = `Server internal error (HTTP 500). Please verify Supabase storage configuration and environment keys.`;
  } else if (status === 502 || status === 503 || status === 504) {
    detailedReason = `Server Gateway Error (HTTP ${status}). Storage backend or host server is temporarily unreachable.`;
  } else {
    detailedReason = `Server request failed with HTTP ${status} (${res.statusText || "Unknown status"})`;
  }

  return {
    ok: false,
    status,
    error: detailedReason,
  };
}
