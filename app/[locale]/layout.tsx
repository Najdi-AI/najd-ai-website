import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Providers } from "@/components/providers";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, isLocale, dir, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

// Thmanyah Sans — the official Najd AI Solutions brand typeface (Arabic + Latin).
const thmanyah = localFont({
  src: [
    { path: "../fonts/thmanyahsans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/thmanyahsans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-thmanyah",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function resolveLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const dict = getDictionary(locale);
  const ogImage = `/og/najd-home-${locale}.png`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s · ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    keywords: [
      "Najd AI",
      "Najd AI Solutions",
      "حلول نجد",
      "Enterprise AI Saudi Arabia",
      "Arabic NLP",
      "Vision 2030 AI",
      "AI consulting Riyadh",
    ],
    authors: [{ name: siteConfig.name }],
    icons: { icon: "/brand/logo-mark.svg", apple: "/brand/logo-mark.svg" },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `${siteConfig.url}/${locale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = resolveLocale(params.locale);
  const direction = dir(locale);
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={cn(thmanyah.variable, "scroll-smooth")}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-najd-blue/30",
          locale === "ar" && "font-arabic"
        )}
      >
        <Providers locale={locale} dir={direction} dict={dict}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
