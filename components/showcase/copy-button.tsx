"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      aria-label="Copy"
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-najd-blue/50 hover:text-najd-blue",
        className
      )}
    >
      {copied ? <Check className="h-4 w-4 text-najd-blue" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
