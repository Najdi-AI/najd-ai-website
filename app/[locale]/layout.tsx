import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, isLocale, dir, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const plexAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
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
    icons: { icon: "/brand/logo-symbol.png", apple: "/brand/logo-symbol.png" },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `${siteConfig.url}/${locale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
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
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const direction = dir(locale);
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={cn(plex.variable, plexAr.variable, "scroll-smooth")}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-najd-green/30",
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
