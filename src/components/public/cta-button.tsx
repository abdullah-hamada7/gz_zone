"use client";

import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface CTAButtonProps {
  size?: "default" | "sm" | "lg";
  className?: string;
  text?: string;
  treatment?: string;
}

export function WhatsAppButton({
  size = "lg",
  className,
  text,
  treatment,
}: CTAButtonProps) {
  const { getUrl, trackAndOpen } = useWhatsApp();

  if (!text) return null;

  const handleClick = () => {
    const url = getUrl({ treatment: treatment || "General inquiry" });
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
      {text}
    </Button>
  );
}