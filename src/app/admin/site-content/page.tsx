"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Save, Plus, Trash2, GripVertical } from "lucide-react";
import type { SiteContent } from "@/types";

interface SectionConfig {
  key: string;
  label: string;
  description: string;
  category: "homepage" | "treatments" | "legal";
}

const sections: SectionConfig[] = [
  { key: "hero", label: "Hero Section", description: "Main hero banner on homepage", category: "homepage" },
  { key: "trust_bar", label: "Trust Bar", description: "Trust badges below hero", category: "homepage" },
  { key: "why_mobile_massage", label: "Why Mobile Massage", description: "Benefits section with 4 cards", category: "homepage" },
  { key: "how_it_works", label: "How It Works", description: "3-step process section", category: "homepage" },
  { key: "about_section", label: "About Section", description: "About Omar / bio section", category: "homepage" },
  { key: "reputation_section", label: "Reputation Section", description: "Platform ratings heading", category: "homepage" },
  { key: "faq_section", label: "FAQ Section", description: "FAQ section heading", category: "homepage" },
  { key: "footer", label: "Footer", description: "Footer content and links", category: "homepage" },
  { key: "hours_section", label: "Business Hours", description: "Opening hours on treatment pages", category: "treatments" },
  { key: "privacy_policy", label: "Privacy Policy", description: "Privacy policy page content", category: "legal" },
  { key: "terms", label: "Terms of Service", description: "Terms of service page content", category: "legal" },
];

function SectionEditor({
  section,
  content,
  onChange,
}: {
  section: SectionConfig;
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}) {
  const set = (key: string, value: unknown) => onChange({ ...content, [key]: value });
  const str = (key: string, fallback?: string | null) => (content[key] as string) ?? fallback ?? "";

  switch (section.key) {
    case "hero":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={str("title")} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input value={str("subtitle")} onChange={(e) => set("subtitle", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={str("description")} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>CTA Text</Label>
            <Input value={str("cta_text")} onChange={(e) => set("cta_text", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Explore Text</Label>
            <Input value={str("explore_text")} onChange={(e) => set("explore_text", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Location Text</Label>
            <Input value={str("location_text")} onChange={(e) => set("location_text", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Dialog Title</Label>
            <Input value={str("dialog_title")} onChange={(e) => set("dialog_title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Dialog Description</Label>
            <Textarea value={str("dialog_description")} onChange={(e) => set("dialog_description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Dialog Link Text</Label>
            <Input value={str("dialog_link")} onChange={(e) => set("dialog_link", e.target.value)} />
          </div>
        </div>
      );

    case "trust_bar":
      return (
        <div className="space-y-4">
          <Label className="block">Trust Items</Label>
          {((content.items as { label: string }[]) ?? []).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical className="size-4 shrink-0 text-muted-foreground" />
              <Input
                value={item.label}
                onChange={(e) => {
                  const items = [...((content.items as { label: string }[]) ?? [])];
                  items[i] = { label: e.target.value };
                  set("items", items);
                }}
                placeholder="Item label"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const items = [...((content.items as { label: string }[]) ?? [])];
                  items.splice(i, 1);
                  set("items", items);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const items = [...((content.items as { label: string }[]) ?? []), { label: "" }];
              set("items", items);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Item
          </Button>
        </div>
      );

    case "key_benefits":
    case "what_to_expect":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          <Label className="block">Items</Label>
          {((content.items as Array<{ title: string; description: string }>) ?? []).map((item, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Item {i + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const items = [...((content.items as Array<{ title: string; description: string }>) ?? [])];
                    items.splice(i, 1);
                    set("items", items);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Input
                value={item.title}
                onChange={(e) => {
                  const items = [...((content.items as Array<{ title: string; description: string }>) ?? [])];
                  items[i] = { ...items[i], title: e.target.value };
                  set("items", items);
                }}
                placeholder="Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => {
                  const items = [...((content.items as Array<{ title: string; description: string }>) ?? [])];
                  items[i] = { ...items[i], description: e.target.value };
                  set("items", items);
                }}
                placeholder="Description"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const items = [...((content.items as Array<{ title: string; description: string }>) ?? []), { title: "", description: "" }];
              set("items", items);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Item
          </Button>
        </div>
      );

    case "why_mobile_massage":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={str("description")} onChange={(e) => set("description", e.target.value)} />
          </div>
          <Label className="block">Benefits</Label>
          {((content.benefits as Array<{ title: string; description: string }>) ?? []).map((b, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Benefit {i + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const benefits = [...((content.benefits as Array<{ title: string; description: string }>) ?? [])];
                    benefits.splice(i, 1);
                    set("benefits", benefits);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Input
                value={b.title}
                onChange={(e) => {
                  const benefits = [...((content.benefits as Array<{ title: string; description: string }>) ?? [])];
                  benefits[i] = { ...benefits[i], title: e.target.value };
                  set("benefits", benefits);
                }}
                placeholder="Title"
              />
              <Textarea
                value={b.description}
                onChange={(e) => {
                  const benefits = [...((content.benefits as Array<{ title: string; description: string }>) ?? [])];
                  benefits[i] = { ...benefits[i], description: e.target.value };
                  set("benefits", benefits);
                }}
                placeholder="Description"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const benefits = [...((content.benefits as Array<{ title: string; description: string }>) ?? []), { title: "", description: "" }];
              set("benefits", benefits);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Benefit
          </Button>
        </div>
      );

    case "how_it_works":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          <Label className="block">Steps</Label>
          {((content.steps as Array<{ title: string; description: string }>) ?? []).map((step, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const steps = [...((content.steps as Array<{ title: string; description: string }>) ?? [])];
                    steps.splice(i, 1);
                    set("steps", steps);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Input
                value={step.title}
                onChange={(e) => {
                  const steps = [...((content.steps as Array<{ title: string; description: string }>) ?? [])];
                  steps[i] = { ...steps[i], title: e.target.value };
                  set("steps", steps);
                }}
                placeholder="Title"
              />
              <Textarea
                value={step.description}
                onChange={(e) => {
                  const steps = [...((content.steps as Array<{ title: string; description: string }>) ?? [])];
                  steps[i] = { ...steps[i], description: e.target.value };
                  set("steps", steps);
                }}
                placeholder="Description"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const steps = [...((content.steps as Array<{ title: string; description: string }>) ?? []), { title: "", description: "" }];
              set("steps", steps);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Step
          </Button>
        </div>
      );

    case "about_section":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Subheading</Label>
            <Input value={str("subheading")} onChange={(e) => set("subheading", e.target.value)} />
          </div>
          <Label className="block">Paragraphs</Label>
          {((content.paragraphs as string[]) ?? []).map((p, i) => (
            <div key={i} className="flex items-start gap-2">
              <Textarea
                value={p}
                onChange={(e) => {
                  const paragraphs = [...((content.paragraphs as string[]) ?? [])];
                  paragraphs[i] = e.target.value;
                  set("paragraphs", paragraphs);
                }}
                className="min-h-[80px]"
                placeholder={`Paragraph ${i + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="mt-1 shrink-0"
                onClick={() => {
                  const paragraphs = [...((content.paragraphs as string[]) ?? [])];
                  paragraphs.splice(i, 1);
                  set("paragraphs", paragraphs);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const paragraphs = [...((content.paragraphs as string[]) ?? []), ""];
              set("paragraphs", paragraphs);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Paragraph
          </Button>
          <div className="space-y-2">
            <Label>Trust Heading</Label>
            <Input value={str("trustHeading")} onChange={(e) => set("trustHeading", e.target.value)} />
          </div>
          <Label className="block">Trust Points</Label>
          {((content.trustPoints as Array<{ title: string; description: string }>) ?? []).map((p, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Point {i + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const points = [...((content.trustPoints as Array<{ title: string; description: string }>) ?? [])];
                    points.splice(i, 1);
                    set("trustPoints", points);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Input
                value={p.title}
                onChange={(e) => {
                  const points = [...((content.trustPoints as Array<{ title: string; description: string }>) ?? [])];
                  points[i] = { ...points[i], title: e.target.value };
                  set("trustPoints", points);
                }}
                placeholder="Title"
              />
              <Textarea
                value={p.description}
                onChange={(e) => {
                  const points = [...((content.trustPoints as Array<{ title: string; description: string }>) ?? [])];
                  points[i] = { ...points[i], description: e.target.value };
                  set("trustPoints", points);
                }}
                placeholder="Description"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const points = [...((content.trustPoints as Array<{ title: string; description: string }>) ?? []), { title: "", description: "" }];
              set("trustPoints", points);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Trust Point
          </Button>
          <div className="space-y-2">
            <Label>Cert Label</Label>
            <Input value={str("certLabel")} onChange={(e) => set("certLabel", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cert Heading</Label>
            <Input value={str("certHeading")} onChange={(e) => set("certHeading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cert Text</Label>
            <Textarea value={str("certText")} onChange={(e) => set("certText", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Image Alt Text</Label>
            <Input value={str("imageAlt")} onChange={(e) => set("imageAlt", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <ImageUpload value={str("image_url", null)} onChange={(url) => set("image_url", url)} />
          </div>
        </div>
      );

    case "footer":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={str("description")} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Quick Links Heading</Label>
            <Input value={str("quickLinksHeading")} onChange={(e) => set("quickLinksHeading", e.target.value)} />
          </div>
          <Label className="block">Quick Links</Label>
          {((content.quickLinks as Array<{ label: string; href: string }>) ?? []).map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={link.label}
                onChange={(e) => {
                  const links = [...((content.quickLinks as Array<{ label: string; href: string }>) ?? [])];
                  links[i] = { ...links[i], label: e.target.value };
                  set("quickLinks", links);
                }}
                placeholder="Label"
              />
              <Input
                value={link.href}
                onChange={(e) => {
                  const links = [...((content.quickLinks as Array<{ label: string; href: string }>) ?? [])];
                  links[i] = { ...links[i], href: e.target.value };
                  set("quickLinks", links);
                }}
                placeholder="/path"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const links = [...((content.quickLinks as Array<{ label: string; href: string }>) ?? [])];
                  links.splice(i, 1);
                  set("quickLinks", links);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const links = [...((content.quickLinks as Array<{ label: string; href: string }>) ?? []), { label: "", href: "" }];
              set("quickLinks", links);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Link
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contact Heading</Label>
              <Input value={str("contactHeading")} onChange={(e) => set("contactHeading", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={str("phone")} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone Href (WhatsApp URL)</Label>
              <Input value={str("phoneHref")} onChange={(e) => set("phoneHref", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={str("location")} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Instagram Handle</Label>
              <Input value={str("instagramHandle")} onChange={(e) => set("instagramHandle", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input value={str("instagramUrl")} onChange={(e) => set("instagramUrl", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Copyright</Label>
            <Input value={str("copyright")} onChange={(e) => set("copyright", e.target.value)} />
          </div>
        </div>
      );

    case "reputation_section":
    case "faq_section":
    case "gallery_section":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          {section.key === "reputation_section" && (
            <>
              <div className="space-y-2">
                <Label>Subheading</Label>
                <Input value={str("subheading")} onChange={(e) => set("subheading", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Review Label</Label>
                <Input value={str("reviewLabel")} onChange={(e) => set("reviewLabel", e.target.value)} />
              </div>
            </>
          )}
        </div>
      );

    case "final_cta":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={str("description")} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input value={str("button_text")} onChange={(e) => set("button_text", e.target.value)} />
          </div>
        </div>
      );

    case "hours_section":
    case "service_areas_section":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={str("heading")} onChange={(e) => set("heading", e.target.value)} />
          </div>
          {section.key === "hours_section" && (
            <>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={str("subtitle")} onChange={(e) => set("subtitle", e.target.value)} />
              </div>
              <Label className="block">Days</Label>
              {((content.days as Array<{ day: string; hours: string }>) ?? []).map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={d.day}
                    onChange={(e) => {
                      const days = [...((content.days as Array<{ day: string; hours: string }>) ?? [])];
                      days[i] = { ...days[i], day: e.target.value };
                      set("days", days);
                    }}
                    placeholder="Day"
                  />
                  <Input
                    value={d.hours}
                    onChange={(e) => {
                      const days = [...((content.days as Array<{ day: string; hours: string }>) ?? [])];
                      days[i] = { ...days[i], hours: e.target.value };
                      set("days", days);
                    }}
                    placeholder="Hours"
                  />
                </div>
              ))}
            </>
          )}
          {section.key === "service_areas_section" && (
            <>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={str("description")} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={str("button_text")} onChange={(e) => set("button_text", e.target.value)} />
              </div>
            </>
          )}
        </div>
      );

    case "privacy_policy":
    case "terms":
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="block">Page Content (HTML)</Label>
            <span className="text-xs text-muted-foreground">You can use HTML tags for formatting</span>
          </div>
          <Textarea
            className="min-h-[400px] font-mono text-sm"
            value={str("body_html")}
            onChange={(e) => set("body_html", e.target.value)}
            placeholder="<h2>Section Title</h2><p>Content here...</p>"
          />
        </div>
      );

    default:
      return <p className="text-sm text-muted-foreground">No editor available for this section.</p>;
  }
}

export default function AdminSiteContentPage() {
  const [sectionsData, setSectionsData] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Record<string, unknown>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((res) => res.json())
      .then((data: SiteContent[]) => {
        setSectionsData(data);
        const initial: Record<string, Record<string, unknown>> = {};
        for (const s of data) {
          initial[s.section_key] = s.content as Record<string, unknown>;
        }
        setEditValues(initial);
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load site content"); setLoading(false); });
  }, []);

  const handleChange = useCallback((key: string, content: Record<string, unknown>) => {
    setEditValues((prev) => ({ ...prev, [key]: content }));
  }, []);

  async function handleSave(key: string) {
    setSaving(key);
    try {
      const content = editValues[key];
      const res = await fetch(`/api/admin/site-content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        const sec = sections.find((s) => s.key === key);
        toast.success(`${sec?.label || key} saved`);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save");
    }
    setSaving(null);
  }

  const filteredSections = activeCategory === "all"
    ? sections
    : sections.filter((s) => s.category === activeCategory);

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site Content</h1>
        <p className="text-sm text-muted-foreground">
          Edit text content for each page section using the form fields below.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "homepage", "treatments", "legal"].map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredSections.map((sec) => {
          const isOpen = openSection === sec.key;
          const content = editValues[sec.key] ?? {};

          return (
            <div key={sec.key} className="rounded-xl border bg-card">
              <button
                onClick={() => setOpenSection(isOpen ? null : sec.key)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer"
              >
                {isOpen ? <ChevronDown className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{sec.label}</p>
                  <p className="text-xs text-muted-foreground">{sec.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{sec.category}</span>
              </button>

              {isOpen && (
                <div className="border-t px-5 py-4 space-y-6">
                  <SectionEditor section={sec} content={content} onChange={(c) => handleChange(sec.key, c)} />

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button size="sm" onClick={() => handleSave(sec.key)} disabled={saving === sec.key}>
                      <Save className="mr-2 size-4" />
                      {saving === sec.key ? "Saving..." : "Save Changes"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Section key: <code className="bg-muted px-1 py-0.5 rounded">{sec.key}</code>
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
