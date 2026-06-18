"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { VoiceAgentVisual } from "@/components/ui/voice-agent-visual";
import { SautNajdiLogo } from "@/components/ui/saut-najdi-logo";
import { Soundwave } from "@/components/ui/soundwave";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  Reveal,
  SectionHeader,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";

/**
 * Flagship — the company's flagship product presence for "Saut Najdi".
 *
 * Layout:
 *   1. A prominent two-column hero block: the Arabic wordmark + Latin name +
 *      by-line + status badge + tagline + elevator pitch + two CTAs + 4 stats
 *      on one side, and the bespoke <VoiceAgentVisual/> on the other.
 *   2. A 6-card feature grid (lucide icons resolved via <Icon/>).
 *   3. A compact horizontal "how a call flows" pipeline strip.
 *
 * RTL: uses logical CSS (start/end, ms/me) and a dir-aware arrow. No physical
 * left/right that would break in Arabic.
 *
 * Brand: this is the on-home PREVIEW of the Saut Najdi (صوت نجدي) sub-brand, so
 * it wears that identity — the official <SautNajdiLogo variant="mark"/> squircle
 * next to the wordmark, the full SPECTRUM gradient (.text-gradient-saut /
 * bg-saut-gradient: cyan→blue→purple→magenta→red) on the wordmark and key
 * accents, electric saut-cyan + warm Najdi-red on badge/CTAs/stat figures, the
 * <Soundwave/> equalizer motif, and a .bg-saut-dot grid texture — all kept as an
 * accent of colour/motif over the section's dark najd-ink base so it stays
 * cohesive with (yet distinct from) the cool monochrome parent page.
 *
 * SSR-safety: all rendered values come from the dictionary; the only motion is
 * declarative (initial/whileInView) and reduced-motion is honored globally via
 * <MotionConfig reducedMotion="user">. <Soundwave/> is itself SSR-deterministic.
 */
export function Flagship() {
  const { dict, dir, locale } = useI18n();
  const p = dict.product;
  const rtl = dir === "rtl";

  return (
    <section
      id="product"
      dir={dir}
      className="relative scroll-mt-24 overflow-hidden bg-najd-ink py-20 md:py-28"
    >
      {/* Ambient Saut Najdi spectrum glows — electric cyan lead + warm
          Najdi-red tail are the two ends that mark this off from the parent's
          monochrome navy. */}
      <div className="pointer-events-none absolute -start-32 top-10 h-[30rem] w-[30rem] rounded-full bg-saut-cyan/[0.12] blur-[130px]" />
      <div className="pointer-events-none absolute -end-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-saut-red/[0.12] blur-[130px]" />
      {/* Dot-grid ("الشيكي") texture — the Saut Najdi motif, masked to fade. */}
      <div className="pointer-events-none absolute inset-0 bg-saut-dot [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy column */}
          <div className="flex flex-col items-start gap-6 text-start">
            {/* Sub-brand eyebrow: the official squircle MARK next to the label,
                so the section announces Saut Najdi from the first glance. */}
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-saut-cyan/25 bg-saut-cyan/[0.06] py-1.5 pe-4 ps-1.5 text-[11px] font-semibold text-saut-cyan sm:text-xs">
                <SautNajdiLogo
                  variant="mark"
                  className="h-6 w-auto"
                />
                <span className={cn(locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.16em]")}>
                  {p.label}
                </span>
              </span>
            </Reveal>

            <Reveal delay={0.05} className="flex flex-col items-start gap-4 sm:gap-5">
              {/* Arabic wordmark carries the full Saut Najdi spectrum. */}
              <span className="font-display text-6xl font-black leading-[1.05] tracking-tight text-gradient-saut sm:text-7xl md:text-[5.5rem]">
                {p.nameArabic}
              </span>
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {p.name}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {p.by}
                </span>
              </span>
            </Reveal>

            {/* Soundwave motif — the signature equalizer device, tucked under
                the wordmark as a thin branded rule. SSR-deterministic + RTL-safe. */}
            <Reveal delay={0.08} className="w-full max-w-xs">
              <Soundwave bars={28} className="h-8" />
            </Reveal>

            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-saut-red/30 bg-saut-red/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-saut-red sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-saut-red motion-safe:animate-pulse" />
                {p.badge}
              </span>
            </Reveal>

            <Reveal delay={0.14} className="flex flex-col items-start gap-2">
              <p className="max-w-xl text-pretty text-lg font-semibold leading-snug text-foreground/90 sm:text-xl">
                {p.tagline}
              </p>
              {/* Brand tagline (product.slogan). */}
              <p className="text-sm font-semibold text-gradient-saut sm:text-[15px]">
                {p.slogan}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                <span className="font-semibold text-saut-cyan">
                  {p.descriptor}
                </span>
                {" — "}
                {p.desc}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}#contact`}
                  className="group inline-flex items-center gap-2 rounded-full bg-saut-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_-12px_rgba(46,196,230,0.75)] transition-transform [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
                >
                  {p.ctaPrimary}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      rtl && "rotate-180 group-hover:-translate-x-0.5"
                    )}
                  />
                </Link>
                <Link
                  href={`/${locale}/saut-najdi`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition-colors hover:border-saut-cyan/40 hover:text-foreground"
                >
                  {p.ctaSecondary}
                </Link>
              </div>
            </Reveal>

            {/* Stats — dividers come from a 1px grid gap that lets the border
                color show through (robust for any count / column layout, no
                per-index border bookkeeping). */}
            <Reveal delay={0.3} className="w-full">
              <dl className="grid w-full max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-4">
                {p.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-1 bg-najd-ink px-3 py-5"
                  >
                    <dd className="font-display text-3xl font-bold text-gradient-saut">
                      {s.num}
                    </dd>
                    <dt className="text-center text-[11px] tracking-wide text-muted-foreground">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Visual column */}
          <Reveal y={30} delay={0.12} className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-full max-w-lg">
              {/* Spectrum halo: cyan lead bleeding into the warm Najdi-red tail. */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(46,196,230,0.20),transparent_60%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_75%,rgba(236,27,58,0.16),transparent_60%)]" />
              <VoiceAgentVisual className="relative" />
            </div>
            {/* Voiceprint caption — heroLine reinforces the voice-first promise. */}
            <p className="max-w-xs text-center text-sm font-medium text-muted-foreground">
              {p.heroLine}
            </p>
          </Reveal>
        </div>

        {/* ── FEATURES ─────────────────────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <SectionHeader
            eyebrow={p.featuresLabel}
            titleLead={p.featuresTitle}
            highlight={p.featuresHighlight}
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {p.features.map((f) => (
              <motion.li key={f.title} variants={staggerItem} className="h-full">
                <div className="relative h-full rounded-2xl border border-border/60 bg-white/[0.02] p-1.5">
                  <GlowingEffect
                    spread={36}
                    glow
                    disabled={false}
                    proximity={60}
                    inactiveZone={0.55}
                    borderWidth={2}
                  />
                  <div className="relative flex h-full flex-col gap-4 rounded-[14px] bg-card/40 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-saut-cyan/25 bg-saut-cyan/[0.08] text-saut-cyan">
                      <Icon name={f.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ── PIPELINE STRIP ───────────────────────────────────── */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <h3 className="text-center font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {p.pipelineTitle}
            </h3>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
              {p.pipeline.map((step, i) => (
                <li
                  key={step.label}
                  className="flex flex-1 items-stretch gap-3 md:flex-col md:gap-0"
                >
                  <div className="flex h-full flex-1 flex-col gap-2 rounded-2xl border border-border/60 bg-white/[0.02] p-5 transition-colors hover:border-saut-cyan/40">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saut-gradient font-display text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="font-display text-base font-bold text-foreground">
                      {step.label}
                    </span>
                    <span className="text-[13px] leading-relaxed text-muted-foreground">
                      {step.desc}
                    </span>
                  </div>
                  {/* Connector arrow between steps (hidden on the last) */}
                  {i !== p.pipeline.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex shrink-0 items-center justify-center px-1 text-saut-cyan/50 md:px-2"
                    >
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 rotate-90 md:rotate-0",
                          rtl && "md:rotate-180"
                        )}
                      />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
