"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function EditFaqPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/faqs/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question || "");
        setAnswer(data.answer || "");
        setCategory(data.category || "General");
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load FAQ"); setLoading(false); });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/faqs/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, category }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("FAQ updated");
      router.push("/admin/faqs");
    } else {
      toast.error("Failed to update");
    }
  }

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit FAQ</h1>
        <p className="text-sm text-muted-foreground">Update frequently asked question</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" className="min-h-[120px]" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          <Link href="/admin/faqs" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
