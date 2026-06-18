"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import {
  Reveal,
  SectionShell,
  SectionHeader,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";

/** One lucide icon per channel, in the dictionary's channel order:
 *  [Voice calls, WhatsApp, Telegram]. */
const CHANNEL_ICONS = [Phone, MessageCircle, Send] as const;

/**
 * SautNajdiDetail — the "below the fold" content for the dedicated
 * /saut-najdi product page: the industries grid, the omnichannel strip,
 * a closing CTA back to the home contact section, and a back-link to the
 * parent Najd AI Solutions site.
 *
 * The hero + features + pipeline live in <Flagship/>, which the page renders
 * above this. RTL is handled with logical CSS + a dir-aware arrow.
 */
export function SautNajdiDetail() {
  const { dict, dir, locale } = useI18n();
  const p = dict.product;
  const rtl = dir === "rtl";

  return (
    <>
      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <SectionShell id="industries">
        <SectionHeader
          eyebrow={p.descriptor}
          titleLead={p.industriesTitle}
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {p.industries.map((industry, i) => (
            <motion.li
              key={industry}
              variants={staggerItem}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white/[0.02] p-5 transition-colors hover:border-najd-blue/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-najd-blue/[0.1] font-display text-sm font-bold text-najd-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-base font-bold text-foreground">
                {industry}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </SectionShell>

      {/* ── CHANNELS ─────────────────────────────────────────── */}
      <SectionShell id="channels" className="bg-najd-ink">
        <SectionHeader eyebrow={p.descriptor} titleLead={p.channelsTitle} />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {p.channels.map((channel, i) => {
            const ChannelIcon = CHANNEL_ICONS[i] ?? Phone;
            return (
              <motion.li
                key={channel}
                variants={staggerItem}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-white/[0.02] p-8 text-center transition-colors hover:border-najd-blue/40"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-najd-blue/20 bg-najd-blue/[0.08] text-najd-blue">
                  <ChannelIcon className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  {channel}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </SectionShell>

      {/* ── CLOSING CTA + BACK-LINK ──────────────────────────── */}
      <SectionShell id="saut-najdi-cta">
        <Reveal>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-najd-blue/25 bg-najd-blue/[0.05] px-6 py-16 text-center sm:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(38,153,214,0.18),transparent_60%)]" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                {p.nameArabic}
              </span>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {p.tagline}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="group inline-flex items-center gap-2 rounded-full bg-najd-blue px-7 py-3.5 text-sm font-semibold text-najd-ink shadow-[0_12px_36px_-12px_rgba(38,153,214,0.75)] transition-transform hover:-translate-y-0.5 hover:bg-najd-blue-light"
              >
                {p.ctaPrimary}
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    rtl && "rotate-180 group-hover:-translate-x-0.5"
                  )}
                />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex justify-center">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className={cn(
                "h-4 w-4 transition-transform group-hover:-translate-x-0.5",
                rtl && "rotate-180 group-hover:translate-x-0.5"
              )}
            />
            {p.backToSite}
          </Link>
        </Reveal>
      </SectionShell>
    </>
  );
}
