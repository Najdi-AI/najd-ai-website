"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { useI18n } from "@/components/providers";
import { otherLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const target = otherLocale(locale);

  function switchLocale() {
    const next = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${target}`);
    router.push(next || `/${target}`);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={dict.langSwitch.aria}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-najd-blue/50 hover:text-foreground",
        className
      )}
    >
      <Languages className="h-3.5 w-3.5" strokeWidth={1.8} />
      {dict.langSwitch.label}
    </button>
  );
}
