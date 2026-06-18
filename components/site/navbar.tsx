"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Logo } from "@/components/site/logo";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function Navbar() {
  const { locale, dict, dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = dict.nav.links;
  // In-page anchors are made locale-absolute so they also work from sub-pages
  // like /[locale]/saut-najdi (where the home sections don't exist).
  const toHref = (href: string) =>
    href.startsWith("#") ? `/${locale}${href}` : href;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8",
          scrolled &&
            "h-14 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <Logo locale={locale} />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={toHref(l.href)}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <Link
            href={`/${locale}#contact`}
            className="group hidden items-center gap-1.5 rounded-full bg-najd-blue px-4 py-2 text-[13px] font-semibold text-najd-ink shadow-[0_8px_24px_-10px_rgba(38,153,214,0.7)] transition-all hover:-translate-y-0.5 hover:bg-najd-blue-light sm:inline-flex"
          >
            {dict.nav.cta}
            <ArrowRight
              className={cn(
                "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5",
                dir === "rtl" && "rotate-180 group-hover:-translate-x-0.5"
              )}
            />
          </Link>
          <button
            type="button"
            aria-label={dict.common.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white/5 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={toHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={`/${locale}#contact`}
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-najd-blue px-4 py-3 text-sm font-semibold text-najd-ink hover:bg-najd-blue-light"
              >
                {dict.nav.cta}
              </Link>
              <div className="mt-2 flex items-center gap-2 px-2 pb-1">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
