"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Cover } from "@/components/ui/cover";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { GradientText } from "@/components/sections/primitives";

export function Hero() {
  const { dict, dir } = useI18n();
  const h = dict.hero;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-najd-ink pb-20 pt-28">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(38,153,214,0.12),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(38,153,214,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(38,153,214,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <BackgroundBeams className="opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-najd-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-najd-blue/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-najd-blue/25 bg-najd-blue/[0.07] px-4 py-1.5 text-[11px] font-semibold tracking-wide text-najd-blue sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {h.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-7 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          {h.titleLead}
          <br />
          <span className="mt-2 inline-flex flex-wrap items-center justify-center gap-x-3">
            <Cover className="text-foreground">{h.titleHighlight}</Cover>{" "}
            <GradientText>{h.titleHighlight2}</GradientText>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7"
        >
          <ContainerTextFlip
            words={h.typewriter}
            animateLetters={dir !== "rtl"}
            className="text-lg font-semibold sm:text-xl md:text-2xl"
            textClassName="text-najd-blue"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg"
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#services"
            className="group inline-flex items-center gap-2 rounded-full bg-najd-blue px-6 py-3 text-sm font-semibold text-najd-ink shadow-[0_12px_36px_-12px_rgba(38,153,214,0.75)] transition-transform hover:-translate-y-0.5 hover:bg-najd-blue-light"
          >
            {h.ctaPrimary}
            <ArrowRight
              className={cn(
                "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                dir === "rtl" && "rotate-180 group-hover:-translate-x-0.5"
              )}
            />
          </Link>
          <Link
            href="#divisions"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition-colors hover:border-najd-blue/40 hover:text-foreground"
          >
            {h.ctaSecondary}
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 grid w-full max-w-2xl grid-cols-2 overflow-hidden rounded-2xl border border-border/70 bg-white/[0.02] sm:grid-cols-4"
        >
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-5",
                i !== h.stats.length - 1 && "sm:border-e sm:border-border/60",
                i % 2 === 0 && "border-e border-border/60 sm:border-e",
                i < 2 && "border-b border-border/60 sm:border-b-0"
              )}
            >
              <dd className="font-display text-3xl font-bold text-gradient-najd">{s.num}</dd>
              <dt className="text-[11px] tracking-wide text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
