"use client";

import Link from "next/link";
import { Linkedin, Twitter, Mail, MessageCircle, MapPin } from "lucide-react";
import { useI18n } from "@/components/providers";
import { Logo } from "@/components/site/logo";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site";

export function Footer() {
  const { locale, dict } = useI18n();
  const isAr = locale === "ar";

  return (
    <footer className="relative border-t border-border/60 bg-najd-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-najd-green/40 to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo locale={locale} symbolSize={40} />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {dict.footer.tagline}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-najd-green" />
            {isAr ? siteConfig.locationAr : siteConfig.location}
          </div>
          <div className="mt-1 flex items-center gap-2.5">
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-najd-green/50 hover:text-najd-green"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.x && (
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-najd-green/50 hover:text-najd-green"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {dict.footer.columns.map((col) => (
          <nav key={col.title} className="flex flex-col gap-3" aria-label={col.title}>
            <h3
              className={`text-xs font-semibold text-foreground/70 ${
                isAr ? "tracking-normal" : "uppercase tracking-wider"
              }`}
            >
              {col.title}
            </h3>
            {col.links.map((l) => (
              <Link
                key={l.label}
                href={`/${locale}${l.href}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="flex flex-col gap-3">
          <h3
            className={`text-xs font-semibold text-foreground/70 ${
              isAr ? "tracking-normal" : "uppercase tracking-wider"
            }`}
          >
            {dict.contact.label}
          </h3>
          <a
            href={whatsappLink(dict.contact.quick.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-najd-green"
          >
            <MessageCircle className="h-4 w-4" /> {siteConfig.phoneDisplay}
          </a>
          <a
            href={mailtoLink()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-najd-green"
          >
            <Mail className="h-4 w-4" /> {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p>{dict.footer.rights}</p>
          <p>{dict.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
