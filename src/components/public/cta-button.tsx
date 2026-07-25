"use client";

import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface CTAButtonProps {
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  size = "lg",
  className,
  children,
}: CTAButtonProps) {
  const { getUrl, trackAndOpen } = useWhatsApp();

  const handleClick = () => {
    const url = getUrl({ treatment: "General inquiry" });
    trackAndOpen(url);
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={cn(
        "gap-2 bg-[#157347] hover:bg-[#13633B] text-white font-semibold",
        className
      )}
    >
      <MessageCircle className="size-5" />
      {children || "Book via WhatsApp"}
    </Button>
  );
}
