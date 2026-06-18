"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
import { cn, toLocaleDigits } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { Soundwave } from "@/components/ui/soundwave";
import { SautNajdiLogo } from "@/components/ui/saut-najdi-logo";
import {
  Reveal,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";

/** One lucide icon per channel, in the dictionary's channel order:
 *  [Voice calls, WhatsApp, Telegram]. */
const CHANNEL_ICONS = [Phone, MessageCircle, Send] as const;

/**
 * SautNajdiDetail — the full body of the dedicated /saut-najdi product page,
 * rendered below <SautNajdiHero/>. Everything here is in the distinct Saut
 * Najdi sub-brand: the SPECTRUM gradient + warm magenta/red accents, the
 * soundwave motif, the .bg-saut-dot texture, and — the surface treatment the
 * flat-navy parent never uses — airy OFF-WHITE premium panels with dark text.
 *
 * Section order: a small Saut-brand section header helper drives each block.
 *   1. Capabilities (feature grid, light premium panel)        #capabilities
 *   2. How a call flows (spectrum pipeline, dark)               #call-flow
 *   3. Industries (numbered grid, light premium panel)          #industries
 *   4. Channels (omnichannel strip, dark)                       #channels
 *   5. Closing slogan + CTA + back-link to the parent site      #saut-najdi-cta
 *
 * RTL: logical CSS (start/end, ms/me) + dir-aware arrows. SSR-safe: all values
 * are dictionary-derived; motion is declarative; <Soundwave/> seeds by index.
 */

/** Saut-brand section header — spectrum eyebrow + bold title, no parent blue. */
function SautSectionHeader({
  eyebrow,
  title,
  desc,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  tone?: "dark" | "light";
}) {
  const { locale } = useI18n();
  // Body/descriptor text: navy on the light panels (saut-navy on #F7F8FA clears
  // AA), silver on the dark ones.
  const muted = tone === "light" ? "text-saut-navy/80" : "text-saut-silver/75";
  const head = tone === "light" ? "text-saut-charcoal" : "text-white";
  // Eyebrow pill: cyan-on-offwhite is illegible (~1.95:1), so the LIGHT tone
  // uses brand purple (purple-on-offwhite ≈ 6.76:1, AA). The DARK tone keeps
  // the signature cyan (high contrast on charcoal/navy).
  const eyebrowTone =
    tone === "light"
      ? "border-saut-purple/30 bg-saut-purple/[0.08] text-saut-purple"
      : "border-saut-cyan/30 bg-saut-cyan/[0.08] text-saut-cyan";
  const dotTone = tone === "light" ? "bg-saut-purple" : "bg-saut-cyan";
  return (
    <Reveal className="flex flex-col items-center gap-4 text-center">
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold",
          eyebrowTone,
          locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.18em]"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full motion-safe:animate-pulse", dotTone)} />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "max-w-3xl text-balance font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]",
          head
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn("mx-auto max-w-2xl text-pretty text-base leading-relaxed sm:text-[17px]", muted)}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}

export function SautNajdiDetail() {
  const { dict, dir, locale } = useI18n();
  const p = dict.product;
  const rtl = dir === "rtl";

  return (
    <div>
      {/* ── CAPABILITIES (LIGHT PREMIUM PANEL) ──────────────────── */}
      <section
        id="capabilities"
        className="relative scroll-mt-24 overflow-hidden bg-saut-offwhite py-20 md:py-28"
      >
        {/* Faint spectrum-tinted dot texture on the light panel */}
        <div className="pointer-events-none absolute inset-0 bg-saut-dot [background-size:24px_24px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SautSectionHeader
            tone="light"
            eyebrow={p.featuresLabel}
            title={`${p.featuresTitle} ${p.featuresHighlight}`.trim()}
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
                <div className="group relative h-full overflow-hidden rounded-2xl border border-saut-silver bg-white p-6 shadow-[0_1px_2px_rgba(13,19,38,0.04)] transition-all hover:-translate-y-0.5 hover:border-saut-cyan/40 hover:shadow-[0_24px_50px_-28px_rgba(91,108,229,0.45)]">
                  {/* Spectrum top edge revealed on hover */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 bg-saut-gradient transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-saut-gradient text-white shadow-[0_10px_24px_-12px_rgba(111,63,164,0.6)]">
                    <Icon name={f.icon} className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-saut-charcoal">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-saut-navy/70">
                    {f.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── HOW A CALL FLOWS (DARK SPECTRUM PIPELINE) ───────────── */}
      <section
        id="call-flow"
        className="relative scroll-mt-24 overflow-hidden bg-saut-charcoal py-20 md:py-28"
      >
        <div className="pointer-events-none absolute -end-32 top-10 h-[26rem] w-[26rem] rounded-full bg-saut-magenta/15 blur-[140px]" />
        <div className="pointer-events-none absolute -start-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-saut-cyan/15 blur-[140px]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SautSectionHeader tone="dark" eyebrow={p.descriptor} title={p.pipelineTitle} />

          {/* A single soundwave threads the pipeline, reinforcing the motif */}
          <Reveal delay={0.06} className="mx-auto mt-10 max-w-2xl">
            <Soundwave bars={32} className="h-10 opacity-70" />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
              {p.pipeline.map((step, i) => (
                <li
                  key={step.label}
                  className="flex flex-1 items-stretch gap-3 md:flex-col md:gap-0"
                >
                  <div className="flex h-full flex-1 flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-saut-cyan/40">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-saut-gradient font-display text-sm font-bold text-white">
                      {toLocaleDigits(i + 1, locale)}
                    </span>
                    <span className="font-display text-base font-bold text-white">
                      {step.label}
                    </span>
                    <span className="text-[13px] leading-relaxed text-saut-silver/70">
                      {step.desc}
                    </span>
                  </div>
                  {i !== p.pipeline.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex shrink-0 items-center justify-center px-1 text-saut-cyan/60 md:px-2"
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
      </section>

      {/* ── INDUSTRIES (LIGHT PREMIUM PANEL) ────────────────────── */}
      <section
        id="industries"
        className="relative scroll-mt-24 overflow-hidden bg-saut-offwhite py-20 md:py-28"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SautSectionHeader
            tone="light"
            eyebrow={p.descriptor}
            title={p.industriesTitle}
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
                className="group flex items-center gap-4 rounded-2xl border border-saut-silver bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-saut-cyan/40 hover:shadow-[0_20px_44px_-28px_rgba(91,108,229,0.4)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saut-gradient font-display text-sm font-bold text-white">
                  {toLocaleDigits(String(i + 1).padStart(2, "0"), locale)}
                </span>
                <span className="font-display text-base font-bold text-saut-charcoal">
                  {industry}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── CHANNELS (DARK OMNICHANNEL STRIP) ───────────────────── */}
      <section
        id="channels"
        className="relative scroll-mt-24 overflow-hidden bg-saut-navy py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-saut-dot [background-size:22px_22px] opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SautSectionHeader tone="dark" eyebrow={p.descriptor} title={p.channelsTitle} />

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
                  className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-colors hover:border-saut-cyan/40"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saut-gradient text-white shadow-[0_12px_28px_-14px_rgba(111,63,164,0.7)]">
                    <ChannelIcon className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-lg font-bold text-white">
                    {channel}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* ── CLOSING SLOGAN + CTA + BACK-LINK ────────────────────── */}
      <section
        id="saut-najdi-cta"
        className="relative scroll-mt-24 overflow-hidden bg-saut-charcoal py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-saut-dot [background-size:22px_22px] opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-7 overflow-hidden rounded-[2rem] border border-white/10 bg-saut-navy/60 px-6 py-16 text-center backdrop-blur-sm sm:px-12">
              {/* Spectrum wash behind the closing block */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_0%,rgba(91,108,229,0.22),transparent_60%)]" />
              {/* Spectrum top edge */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-saut-gradient" />

              <div className="relative z-10 flex flex-col items-center gap-7">
                <SautNajdiLogo variant="mark" className="h-16 w-auto" />

                <span className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {p.nameArabic}
                </span>

                <Soundwave bars={28} className="mx-auto h-9 max-w-sm opacity-80" />

                {/* The two official slogans */}
                <p className="font-display text-xl font-bold text-gradient-saut sm:text-2xl">
                  {p.slogan}
                </p>
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-saut-silver/80 sm:text-lg">
                  {p.sloganAlt}
                </p>

                <Link
                  href={`/${locale}#contact`}
                  className="group inline-flex items-center gap-2 rounded-full bg-saut-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_-14px_rgba(226,12,58,0.6)] transition-transform [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-saut-silver/70 transition-colors hover:text-white"
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
        </div>
      </section>
    </div>
  );
}

export default SautNajdiDetail;
