import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingNavDock } from "@/components/site/floating-nav-dock";
import { Flagship } from "@/components/sections/flagship";
import { SautNajdiDetail } from "@/components/sections/saut-najdi-detail";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const p = dict.product;
  const title = `${p.name} — ${p.descriptor}`;

  return {
    title,
    description: p.tagline,
    alternates: {
      canonical: `/${locale}/saut-najdi`,
      languages: { en: "/en/saut-najdi", ar: "/ar/saut-najdi" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `${siteConfig.url}/${locale}/saut-najdi`,
      title,
      description: p.tagline,
      siteName: siteConfig.name,
    },
  };
}

export default function SautNajdiPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-najd-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <Navbar />
      <FloatingNavDock />
      <main id="main">
        {/* Hero + features + call-flow pipeline */}
        <Flagship />
        {/* Industries · omnichannel · closing CTA · back-link */}
        <SautNajdiDetail />
      </main>
      <Footer />
    </>
  );
}
