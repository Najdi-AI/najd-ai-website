"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { dict } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? dict.theme.toLight : dict.theme.toDark}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-white/5 text-foreground/80 transition-colors hover:border-najd-green/50 hover:text-foreground",
        className
      )}
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.8} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.8} />
      )}
    </button>
  );
}
