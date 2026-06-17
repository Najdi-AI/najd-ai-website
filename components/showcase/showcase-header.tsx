"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers";
import { Logo } from "@/components/site/logo";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function ShowcaseHeader() {
  const { locale, dict, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo locale={locale} />
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-najd-blue/50 hover:text-foreground"
          >
            <Arrow className="h-3.5 w-3.5" />
            {dict.showcase.back}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
