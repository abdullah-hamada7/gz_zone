"use client";

import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface CTAButtonProps {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  variant = "default",
  size = "lg",
  className,
  children,
}: CTAButtonProps) {
  const { getUrl, trackAndOpen } = useWhatsApp();

  const handleClick = () => {
    const url = getUrl({ treatment: "General inquiry" });
    trackAndOpen(url, "cta_button");
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={cn(
        "gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold",
        className
      )}
    >
      <MessageCircle className="size-5" />
      {children || "Book via WhatsApp"}
    </Button>
  );
}
