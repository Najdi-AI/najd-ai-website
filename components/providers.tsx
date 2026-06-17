"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/content/dictionaries/en";

type I18n = {
  locale: Locale;
  dir: "rtl" | "ltr";
  dict: Dictionary;
};

const I18nContext = createContext<I18n | null>(null);

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <Providers>");
  return ctx;
}

export function Providers({
  locale,
  dir,
  dict,
  children,
}: I18n & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, dir, dict }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </I18nContext.Provider>
  );
}
