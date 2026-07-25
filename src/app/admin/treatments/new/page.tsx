"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

export default function NewTreatmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "massage-therapy",
    short_description: "",
    full_description: "",
    ideal_for: "",
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);

  function handleChange(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/treatments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Treatment created");
      router.push("/admin/treatments");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to create");
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Treatment</h1>
        <p className="text-sm text-muted-foreground">Add a new treatment service</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} required placeholder="e.g. deep-tissue-massage" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={form.category} onValueChange={(v) => handleChange("category", v ?? "massage-therapy")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="massage-therapy">Massage Therapy</SelectItem>
              <SelectItem value="medical-aesthetics">Medical Aesthetics</SelectItem>
              <SelectItem value="holistic-health">Holistic Health</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="short_description">Short Description</Label>
          <Textarea id="short_description" value={form.short_description} onChange={(e) => handleChange("short_description", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_description">Full Description</Label>
          <Textarea id="full_description" className="min-h-[100px]" value={form.full_description} onChange={(e) => handleChange("full_description", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ideal_for">Ideal For</Label>
          <Input id="ideal_for" value={form.ideal_for} onChange={(e) => handleChange("ideal_for", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input id="sort_order" type="number" value={form.sort_order} onChange={(e) => handleChange("sort_order", Number(e.target.value))} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Treatment"}</Button>
          <Link href="/admin/treatments" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
