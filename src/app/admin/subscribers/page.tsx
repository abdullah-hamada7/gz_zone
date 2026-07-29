"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import type { NewsletterSubscriber } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminSubscribersPage() {
  const [items, setItems] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        setItems(await res.json());
      }
    } catch {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/subscribers?id=${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Subscriber removed");
        fetchItems();
      } else {
        toast.error("Failed to delete subscriber");
      }
    } catch {
      toast.error("Failed to delete subscriber");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  function handleExportCSV() {
    if (items.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }

    const headers = ["Email", "Source", "Subscribed At"];
    const rows = items.map((sub) => [
      `"${sub.email}"`,
      `"${sub.source || "website"}"`,
      `"${sub.created_at ? new Date(sub.created_at).toLocaleString() : ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gz_zone_subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Subscribers list exported as CSV!");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Subscribers</h1>
          <p className="text-sm text-muted-foreground">
            View and export collected emails for newsletter retargeting & campaigns
          </p>
        </div>
        <Button onClick={handleExportCSV} disabled={items.length === 0} className="shrink-0">
          <Download className="mr-2 size-4" /> Export CSV List
        </Button>
      </div>

      {/* Counter Stat Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-xs flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Total Subscribers</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading subscribers...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <Mail className="mx-auto size-8 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No subscribers collected yet.</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Subscribers will appear here automatically when visitors enter their email on the blog newsletter form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Email Address</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Source</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Subscribed Date</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium text-foreground">{item.email}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                        {item.source || "website"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {item.created_at ? new Date(item.created_at).toLocaleString() : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(item)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Remove Subscriber?"
        description={`Are you sure you want to remove "${deleteTarget?.email}" from the subscriber list?`}
        confirmText="Remove Subscriber"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
