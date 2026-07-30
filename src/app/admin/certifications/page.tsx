"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { Certification } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Certification | null>(null);
  const [deleting, setDeleting] = useState(false);

  // New cert state
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueYear, setIssueYear] = useState("");
  const [description, setDescription] = useState("");

  // Edit cert state
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIssuer, setEditIssuer] = useState("");
  const [editIssueYear, setEditIssueYear] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  async function fetchCertifications() {
    const res = await fetch("/api/admin/certifications");
    if (res.ok) setCerts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchCertifications();
  }, []);

  async function handleUpload(file: File) {
    if (!file) return;
    if (!title.trim()) {
      toast.error("Please enter a Certification Title first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      toast.error("File upload failed");
      setUploading(false);
      return;
    }

    const { url } = await uploadRes.json();

    const createRes = await fetch("/api/admin/certifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        issuer: issuer || null,
        issue_year: issueYear || null,
        description: description || null,
        public_url: url,
        sort_order: certs.length,
      }),
    });

    setUploading(false);

    if (createRes.ok) {
      toast.success("Certification added");
      setTitle("");
      setIssuer("");
      setIssueYear("");
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchCertifications();
    } else {
      const err = await createRes.json().catch(() => null);
      toast.error(err?.error ? `Error: ${err.error}` : "Failed to save certification record");
    }
  }

  function startEdit(cert: Certification) {
    setEditingCert(cert);
    setEditTitle(cert.title);
    setEditIssuer(cert.issuer || "");
    setEditIssueYear(cert.issue_year || "");
    setEditDescription(cert.description || "");
    setEditImageUrl(cert.public_url);
  }

  async function handleEditImageUpload(file: File) {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    setUploading(false);

    if (uploadRes.ok) {
      const { url } = await uploadRes.json();
      setEditImageUrl(url);
      toast.success("New certificate photo uploaded");
    } else {
      toast.error("Image upload failed");
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCert) return;
    if (!editTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    setSavingEdit(true);
    const res = await fetch(`/api/admin/certifications/${editingCert.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        issuer: editIssuer || null,
        issue_year: editIssueYear || null,
        description: editDescription || null,
        public_url: editImageUrl,
      }),
    });
    setSavingEdit(false);

    if (res.ok) {
      toast.success("Certification updated");
      setEditingCert(null);
      fetchCertifications();
    } else {
      toast.error("Failed to update certification");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/certifications/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certification deleted");
        fetchCertifications();
      } else {
        toast.error("Failed to delete certification");
      }
    } catch {
      toast.error("Failed to delete certification");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-sm text-muted-foreground">
            Manage and edit your official qualifications and diploma certificates
          </p>
        </div>
      </div>

      {/* Add New Certification Form */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-lg flex items-center gap-2">
          <Award className="size-5 text-primary" />
          Add New Certification
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="cert_title">Title *</Label>
              <Input
                id="cert_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Diploma in Deep Tissue Massage"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="cert_issuer">Issuing Institution</Label>
              <Input
                id="cert_issuer"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. International Massage Association"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="cert_year">Year Issued</Label>
              <Input
                id="cert_year"
                value={issueYear}
                onChange={(e) => setIssueYear(e.target.value)}
                placeholder="e.g. 2023"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="cert_desc">Description (Optional)</Label>
            <Textarea
              id="cert_desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief details about modules or specialties covered"
              rows={2}
            />
          </div>

          <div className="pt-2">
            <Label className="block mb-2 text-sm font-medium">Certificate Document/Photo *</Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                disabled={!title.trim() || uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 disabled:opacity-50"
              />
              {uploading && <span className="text-sm font-medium text-primary animate-pulse">Uploading...</span>}
            </div>
            {!title.trim() && (
              <p className="mt-1 text-xs text-muted-foreground">Please enter a Title above before choosing a file.</p>
            )}
          </div>
        </div>
      </div>

      {/* Certifications List */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-lg">Your Uploaded Certifications ({certs.length})</h2>

        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading certifications...</div>
        ) : certs.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            <Award className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="font-medium text-foreground">No certifications added yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">Fill out the form above and upload your certificates.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <div key={c.id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-background p-4 shadow-sm hover:border-primary/50 transition-colors">
                <div>
                  <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg bg-muted/40 border p-2 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.public_url}
                      alt={c.title}
                      className="max-h-full max-w-full object-contain mx-auto transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/logo.jpg";
                      }}
                    />
                    <a
                      href={c.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      title="View full resolution"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>

                  <h3 className="font-semibold text-foreground text-base line-clamp-1">{c.title}</h3>
                  {(c.issuer || c.issue_year) && (
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">
                      {c.issuer} {c.issue_year ? `• ${c.issue_year}` : ""}
                    </p>
                  )}
                  {c.description && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => startEdit(c)}
                  >
                    <Pencil className="size-3.5" /> Edit Content
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
                    onClick={() => setDeleteTarget(c)}
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Certification Modal */}
      <Dialog open={!!editingCert} onOpenChange={(open) => !open && setEditingCert(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Pencil className="size-5 text-primary" /> Edit Certification Content
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="edit_title">Title *</Label>
              <Input
                id="edit_title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="edit_issuer">Issuing Institution</Label>
                <Input
                  id="edit_issuer"
                  value={editIssuer}
                  onChange={(e) => setEditIssuer(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit_year">Year Issued</Label>
                <Input
                  id="edit_year"
                  value={editIssueYear}
                  onChange={(e) => setEditIssueYear(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit_desc">Description</Label>
              <Textarea
                id="edit_desc"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2 pt-1">
              <Label className="block text-sm font-medium">Replace Certificate Photo (Optional)</Label>
              {editImageUrl && (
                <div className="relative h-28 w-36 overflow-hidden rounded-lg border bg-muted/40 p-1 mb-2 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editImageUrl} alt="Certificate preview" className="max-h-full max-w-full object-contain mx-auto" />
                </div>
              )}
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleEditImageUpload(file);
                }}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setEditingCert(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={savingEdit}>
                {savingEdit ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Delete Certification "${deleteTarget?.title}"?`}
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Certification"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
