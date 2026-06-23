import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingNavDock } from "@/components/site/floating-nav-dock";
import { SautNajdiHero } from "@/components/sections/saut-najdi-hero";
import { SautNajdiDetail } from "@/components/sections/saut-najdi-detail";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const p = dict.product;
  const title = `${p.name} — ${p.descriptor}`;
  const ogImage = `/og/saut-najdi-${locale}.png`;

  return {
    title,
    description: p.tagline,
    alternates: {
      canonical: `/${locale}/saut-najdi`,
      languages: { en: "/en/saut-najdi", ar: "/ar/saut-najdi", "x-default": "/en/saut-najdi" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `${siteConfig.url}/${locale}/saut-najdi`,
      title,
      description: p.tagline,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.tagline,
      images: [ogImage],
    },
  };
}

export default function SautNajdiPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-saut-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <Navbar />
      <FloatingNavDock />
      <main id="main">
        {/* Distinct Saut Najdi brand hero — spectrum, logo lockup, soundwave */}
        <SautNajdiHero />
        {/* Capabilities · call-flow · industries · channels · slogans · CTA */}
        <SautNajdiDetail />
      </main>
      <Footer />
    </>
  );
}
