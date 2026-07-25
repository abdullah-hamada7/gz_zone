"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Save } from "lucide-react";
import type { SiteContent } from "@/types";

const sectionInfo: Record<string, { label: string; description: string }> = {
  hero: { label: "Hero Section", description: "Main hero banner on homepage" },
  why_mobile_massage: { label: "Why Mobile Massage", description: "Benefits section with 4 cards" },
  how_it_works: { label: "How It Works", description: "3-step process section" },
  about: { label: "About Section", description: "About Omar / bio section" },
  service_areas: { label: "Service Areas", description: "Location coverage section" },
  hours: { label: "Business Hours", description: "Opening hours display" },
  footer: { label: "Footer", description: "Footer content and links" },
  final_cta: { label: "Final CTA", description: "Bottom call-to-action section" },
  certifications: { label: "Certifications", description: "Certification display section" },
};

export default function AdminSiteContentPage() {
  const [sections, setSections] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        const initial: Record<string, string> = {};
        for (const s of data) {
          initial[s.section_key] = JSON.stringify(s.content, null, 2);
        }
        setEditValues(initial);
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load site content"); setLoading(false); });
  }, []);

  async function handleSave(key: string) {
    setSaving(key);
    try {
      const content = JSON.parse(editValues[key]);
      const res = await fetch(`/api/admin/site-content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        toast.success(`${sectionInfo[key]?.label || key} saved`);
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Invalid JSON");
    }
    setSaving(null);
  }

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site Content</h1>
        <p className="text-sm text-muted-foreground">
          Edit text content for each page section. Data is stored as JSON — edit carefully.
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(sectionInfo).map(([key, info]) => {
          const section = sections.find((s) => s.section_key === key);
          const isOpen = openSection === key;

          return (
            <div key={key} className="rounded-xl border bg-card">
              <button
                onClick={() => setOpenSection(isOpen ? null : key)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer"
              >
                {isOpen ? <ChevronDown className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{info.label}</p>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </div>
                {!section && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Not seeded yet</span>
                )}
              </button>

              {isOpen && (
                <div className="border-t px-5 py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Content (JSON)</Label>
                    <Textarea
                      className="min-h-[200px] font-mono text-xs"
                      value={editValues[key] ?? "{}"}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => handleSave(key)} disabled={saving === key}>
                      <Save className="mr-2 size-4" />
                      {saving === key ? "Saving..." : "Save"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Section key: <code className="bg-muted px-1 py-0.5 rounded">{key}</code>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
