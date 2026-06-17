"use client";

import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { Meteors } from "@/components/ui/meteors";
import { Icon } from "@/components/site/icon";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";
import {
  Eyebrow,
  GradientText,
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";

export function Vision() {
  const { dict, dir } = useI18n();
  const v = dict.vision;
  const isRtl = dir === "rtl";

  return (
    <SectionShell id="vision" className="overflow-hidden" full>
      {/* Lamp header: brand-tinted glow behind the title. The lamp's inner
          beams are hardcoded cyan; we override the slate background to brand
          ink and overlay green/teal radial glows so it reads on-brand. */}
      <LampContainer className="min-h-[26rem] rounded-3xl bg-najd-ink sm:min-h-[30rem]">
        {/* brand glow overlays on top of the lamp's cyan core */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgba(43,182,115,0.20),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[34%] -z-10 mx-auto h-40 w-[26rem] max-w-[80%] rounded-full bg-najd-teal/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0.5, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <Eyebrow>{v.label}</Eyebrow>
          <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            {v.titleLead}{" "}
            <GradientText>{v.titleHighlight}</GradientText>
          </h2>
        </motion.div>
      </LampContainer>

      {/* Description + grid live in the constrained content column. */}
      <div className="mx-auto -mt-10 w-full max-w-7xl px-5 sm:-mt-12 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            {v.desc}
          </p>
        </Reveal>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {v.items.map((item) => (
            <motion.li key={item.title} variants={staggerItem} className="h-full">
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-najd-ink/80 p-6 backdrop-blur transition-colors hover:border-najd-green/40",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                {/* Meteor streaks behind the content; tinted to read brand-green. */}
                <Meteors
                  number={14}
                  className="!bg-najd-green/70 before:!from-najd-green/60"
                />

                <div className="relative z-10">
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-najd-green/25 bg-najd-green/[0.08]">
                    <Icon name={item.icon} className="h-5 w-5 text-najd-green" />
                  </span>

                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {item.desc}
                  </p>
                </div>

                {/* soft brand glow on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-najd-green/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionShell>
  );
}
