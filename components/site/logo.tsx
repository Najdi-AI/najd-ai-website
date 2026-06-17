import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/**
 * Najd AI Solutions brand lockup: the gradient symbol mark (immutable per brand
 * guidelines) + the wordmark. White wordmark for the dark UI.
 */
export function Logo({
  locale,
  className,
  symbolSize = 38,
  wordmark = true,
  href = true,
}: {
  locale: Locale;
  className?: string;
  symbolSize?: number;
  wordmark?: boolean;
  href?: boolean;
}) {
  const isAr = locale === "ar";
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-symbol.png"
        alt={isAr ? "حلول نجد للذكاء الاصطناعي" : "Najd AI Solutions"}
        width={symbolSize}
        height={symbolSize}
        priority
        className="h-auto w-auto"
        style={{ height: symbolSize, width: "auto" }}
      />
      {wordmark && (
        <span className="font-display text-[15px] font-bold leading-none tracking-tight text-foreground sm:text-base">
          {isAr ? (
            <>
              حلول <span className="text-najd-green">نجد</span>
            </>
          ) : (
            <>
              Najd <span className="text-najd-green">AI</span>
            </>
          )}
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link
      href={`/${locale}`}
      aria-label={isAr ? "حلول نجد للذكاء الاصطناعي" : "Najd AI Solutions"}
      className="rounded-md outline-none ring-najd-green/60 transition-opacity hover:opacity-90 focus-visible:ring-2"
    >
      {inner}
    </Link>
  );
}
