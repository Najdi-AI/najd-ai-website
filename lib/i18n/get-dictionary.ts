import "server-only";
import type { Locale } from "./config";
import { en } from "@/content/dictionaries/en";
import { ar } from "@/content/dictionaries/ar";
import type { Dictionary } from "@/content/dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
