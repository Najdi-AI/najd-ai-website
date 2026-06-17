import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
}
