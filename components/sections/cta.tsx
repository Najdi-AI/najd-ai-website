"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Reveal, Eyebrow, GradientText } from "@/components/sections/primitives";

export function Cta() {
  const { dict, dir, locale } = useI18n();
  const c = dict.cta;
  const rtl = dir === "rtl";

  return (
    <section id="cta-band" className="relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-border/60">
        {/* Animated brand gradient backdrop (absolutely positioned, fills the band) */}
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(8, 19, 37)"
          gradientBackgroundEnd="rgb(5, 11, 22)"
          firstColor="38, 153, 214"
          secondColor="38, 153, 214"
          thirdColor="33, 88, 119"
          fourthColor="38, 153, 214"
          fifthColor="38, 153, 214"
          pointerColor="38, 153, 214"
          interactive={false}
          containerClassName="absolute inset-0 h-full w-full"
        />

        {/* Readability overlay over the moving gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-najd-ink/45 [background:radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(5,11,22,0.25),rgba(5,11,22,0.7))]"
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[26rem] flex-col items-center justify-center gap-6 px-6 py-20 text-center sm:px-10 sm:py-24 md:min-h-[30rem]">
          <Reveal>
            <Eyebrow>{c.label}</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(5,11,22,0.6)] sm:text-4xl md:text-5xl">
              {c.titleLead} <GradientText className="text-gradient-najd">{c.titleHighlight}</GradientText>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-[17px]">
              {c.sub}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-najd-navy shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
              >
                {c.ctaPrimary}
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    rtl && "rotate-180 group-hover:-translate-x-0.5"
                  )}
                />
              </Link>
              <Link
                href={`/${locale}?interest=consulting#contact`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/60 hover:bg-white/[0.12]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                {c.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
