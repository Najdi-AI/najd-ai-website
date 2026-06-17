import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  const prefersArabic = accept.startsWith("ar") || accept.includes(",ar");
  const locale = prefersArabic ? "ar" : defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, API routes and static files.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
