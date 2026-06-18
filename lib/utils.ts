import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Maps Western digits (0-9) to Arabic-Indic digits (٠-٩) when the active
 * locale is Arabic; returns the input unchanged for every other locale.
 * Non-digit characters are preserved, so values like "24/7" or zero-padded
 * sequence numbers ("01") convert digit-by-digit.
 */
export function toLocaleDigits(value: string | number, locale: string): string {
  const str = String(value);
  if (locale !== "ar") return str;
  return str.replace(/[0-9]/g, (d) => ARABIC_INDIC_DIGITS[Number(d)]);
}
