import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/**
 * Najd AI Solutions brand lockup: the official white Arabic/English wordmark
 * and blue-gradient symbol mark, rendered from the bundled vector artwork.
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
  const imageHeight = wordmark ? Math.round(symbolSize * 1.28) : symbolSize;
  const imageWidth = wordmark ? Math.round(imageHeight * 2.56) : symbolSize;
  const imageSrc = wordmark ? "/brand/logo-lockup-white.svg" : "/brand/logo-mark.svg";
  const inner = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={imageSrc}
        alt={label}
        width={imageWidth}
        height={imageHeight}
        priority
        className="h-auto shrink-0"
      />
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
