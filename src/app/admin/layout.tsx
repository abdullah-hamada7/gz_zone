"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Clock,
  HelpCircle,
  Star,
  BarChart3,
  Quote,
  FileText,
  Image,
  Award,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Treatments", href: "/admin/treatments", icon: Sparkles },
  { label: "Durations", href: "/admin/durations", icon: Clock },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Platform Ratings", href: "/admin/platform-ratings", icon: BarChart3 },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Site Content", href: "/admin/site-content", icon: FileText },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            GZ&apos;ZONE Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-3 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground underline"
            target="_blank"
          >
            View site →
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
