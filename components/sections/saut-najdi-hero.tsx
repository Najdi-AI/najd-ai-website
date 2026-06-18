"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, toLocaleDigits } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { SautNajdiLogo } from "@/components/ui/saut-najdi-logo";
import { Soundwave } from "@/components/ui/soundwave";
import { VoiceAgentVisual } from "@/components/ui/voice-agent-visual";
import { Reveal } from "@/components/sections/primitives";

/**
 * SautNajdiHero — the distinct, standalone hero for the dedicated
 * /saut-najdi product page. This is the strongest "different brand" signal:
 *
 *   - Leads with the OFFICIAL wide logo lockup + a small "by Najd AI Solutions"
 *     endorsement (the only place the parent is named on the hero).
 *   - The signature SPECTRUM gradient (.text-gradient-saut / bg-saut-gradient)
 *     and the WARM magenta→red end carry the headline — the cool monochrome
 *     navy/blue parent never does this.
 *   - The animated <Soundwave/> equalizer is the hero motif, doubled with the
 *     bespoke <VoiceAgentVisual/> orb on the visual side.
 *   - Deep saut-charcoal base (so the shared dark navbar/footer stay legible)
 *     overlaid with the airy .bg-saut-dot ("الشيكي") texture and spectrum glows.
 *
 * RTL: logical CSS only (text-start, ms/me); the CTA arrow is dir-aware.
 * SSR-safety: every serialized value is static/dictionary-derived; the only
 * non-determinism lives in motion transition props (applied post-mount).
 */
export function SautNajdiHero() {
  const { dict, dir, locale } = useI18n();
  const p = dict.product;
  const rtl = dir === "rtl";

  return (
    <section
      dir={dir}
      className="relative isolate overflow-hidden bg-saut-charcoal"
    >
      {/* Spectrum ambient glows — cyan lead + warm magenta/red counterweight */}
      <div className="pointer-events-none absolute -start-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-saut-cyan/20 blur-[150px]" />
      <div className="pointer-events-none absolute -end-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-saut-magenta/20 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 start-1/3 h-[26rem] w-[26rem] rounded-full bg-saut-purple/20 blur-[150px]" />

      {/* Airy dot-grid ("الشيكي") texture, masked to fade toward the edges */}
      <div className="pointer-events-none absolute inset-0 bg-saut-dot [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" />

      {/* Thin spectrum hairline along the very top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-saut-gradient opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── COPY COLUMN ──────────────────────────────────────── */}
          <div className="flex flex-col items-start gap-7 text-start">
            {/* Official lockup + parent endorsement */}
            <Reveal className="flex flex-col items-start gap-3">
              <SautNajdiLogo
                variant="lockup"
                theme="dark"
                className="h-12 w-auto sm:h-14"
              />
              <span className="text-sm font-medium text-saut-silver/70">
                {p.by}
              </span>
            </Reveal>

            {/* Status badge — spectrum-tinted, not the parent's blue */}
            <Reveal delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-saut-cyan/30 bg-saut-cyan/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-saut-cyan sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-saut-cyan motion-safe:animate-pulse" />
                {p.badge}
              </span>
            </Reveal>

            {/* Big, bold spectrum headline */}
            <Reveal delay={0.1} className="flex flex-col items-start gap-3">
              <h1 className="font-display text-[2.75rem] font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-[4.25rem]">
                <span className="text-gradient-saut">{p.heroLine}</span>
              </h1>
              <p className="font-display text-xl font-bold text-saut-silver sm:text-2xl">
                {p.dialectLine}
              </p>
            </Reveal>

            {/* Slogan */}
            <Reveal delay={0.16}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-saut-silver/80 sm:text-lg">
                {p.slogan}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.22}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}#contact`}
                  className="group inline-flex items-center gap-2 rounded-full bg-saut-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_-14px_rgba(226,12,58,0.6)] transition-transform [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
                >
                  {p.ctaPrimary}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      rtl && "rotate-180 group-hover:-translate-x-0.5"
                    )}
                  />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 rounded-full border border-saut-silver/25 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-saut-cyan/50"
                >
                  {p.ctaSecondary}
                </a>
              </div>
            </Reveal>

            {/* Hero soundwave motif */}
            <Reveal delay={0.3} className="w-full max-w-md">
              <Soundwave bars={36} className="h-14 opacity-90" />
            </Reveal>
          </div>

          {/* ── VISUAL COLUMN ────────────────────────────────────── */}
          <Reveal y={30} delay={0.12} className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(91,108,229,0.22),transparent_65%)]" />
              <VoiceAgentVisual className="relative" />
            </div>
          </Reveal>
        </div>

        {/* ── STATS RIBBON — spectrum-numbered, on a premium dark card ── */}
        <Reveal delay={0.2} className="mt-16 md:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {p.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 bg-saut-charcoal/95 px-4 py-7"
              >
                <dd className="font-display text-3xl font-black text-gradient-saut sm:text-4xl">
                  {toLocaleDigits(s.num, locale)}
                </dd>
                <dt className="text-center text-xs tracking-wide text-saut-silver/70">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Spectrum hairline closing the hero */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-px w-full origin-center bg-saut-gradient opacity-70"
      />
    </section>
  );
}

export default SautNajdiHero;
