import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { COMPONENTS } from "@/components/showcase/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    entries.push({ url: `${base}/${locale}`, changeFrequency: "monthly", priority: 1 });
    entries.push({
      url: `${base}/${locale}/components`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    for (const c of COMPONENTS) {
      entries.push({
        url: `${base}/${locale}/components/${c.slug}`,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }
  return entries;
}
