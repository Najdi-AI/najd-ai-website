import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/**
 * Najd AI Solutions brand lockup: the official blue-gradient symbol mark
 * (immutable per brand guidelines) + the wordmark in Thmanyah. White wordmark
 * for the dark UI; "AI" / "نجد" accented in brand blue.
 */
export function Logo({
  locale,
  className,
  symbolSize = 34,
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
  const label = isAr ? "حلول نجد للذكاء الاصطناعي" : "Najd AI Solutions";
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-mark.svg"
        alt={label}
        width={symbolSize}
        height={symbolSize}
        priority
        className="shrink-0"
      />
      {wordmark && (
        <span
          className="font-display font-bold leading-none tracking-tight text-foreground"
          style={{ fontSize: Math.round(symbolSize * 0.46) }}
        >
          {isAr ? (
            <>
              حلول <span className="text-najd-blue">نجد</span>
            </>
          ) : (
            <>
              Najd <span className="text-najd-blue">AI</span>
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
      aria-label={label}
      className="rounded-md outline-none ring-najd-blue/60 transition-opacity hover:opacity-90 focus-visible:ring-2"
    >
      {inner}
    </Link>
  );
}
