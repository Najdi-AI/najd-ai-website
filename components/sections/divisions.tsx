"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  SectionShell,
  SectionHeader,
  Reveal,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";

type Tone = "green" | "blue" | "muted";

const toneClasses: Record<Tone, string> = {
  green: "border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue",
  blue: "border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue",
  muted: "border-border/70 bg-white/[0.03] text-muted-foreground",
};

/** Branded decorative mini-canvas used as each bento header. */
function DivisionHeader() {
  return (
    <div className="relative h-full min-h-[8rem] w-full overflow-hidden rounded-xl border border-border/50 bg-najd-ink/40">
      {/* gradient wash */}
      <div className="absolute inset-0 bg-najd-gradient opacity-[0.14] transition-opacity duration-300 group-hover/bento:opacity-25" />
      {/* faint dot/grid pattern that drifts on hover */}
      <div
        className="absolute inset-0 opacity-60 transition-transform duration-500 ease-out group-hover/bento:translate-x-2 group-hover/bento:translate-y-1"
        style={{
          backgroundImage:
            "radial-gradient(rgba(38,153,214,0.25) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
        }}
      />
      {/* corner glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-najd-blue/20 blur-2xl transition-opacity duration-300 group-hover/bento:opacity-90" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-najd-blue/15 blur-2xl" />
    </div>
  );
}

// Bento rhythm: a couple of wide tiles to break the grid.
const spanFor = (i: number) => (i === 0 || i === 5 ? "md:col-span-2" : "");

export function Divisions() {
  const { dict, locale } = useI18n();
  const d = dict.divisions;

  return (
    <SectionShell id="divisions">
      <SectionHeader
        align="center"
        eyebrow={d.label}
        titleLead={d.titleLead}
        highlight={d.titleHighlight}
        desc={d.desc}
      />

      <Reveal className="mt-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <BentoGrid className="md:auto-rows-[22rem]">
            {d.items.map((item, i) => (
              <motion.div
                key={item.num}
                variants={staggerItem}
                className={spanFor(i)}
              >
                <BentoGridItem
                  className={cn(
                    "h-full border-border/60 bg-white/[0.02] backdrop-blur-sm transition-all duration-300",
                    "hover:-translate-y-1 hover:border-najd-blue/40 hover:shadow-[0_20px_50px_-24px_rgba(38,153,214,0.55)]",
                  )}
                  header={<DivisionHeader />}
                  icon={
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-najd-blue/25 bg-najd-blue/[0.08]">
                        <Icon name={item.icon} className="h-6 w-6 text-najd-blue" />
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold text-najd-blue/80",
                          locale === "ar"
                            ? "tracking-normal"
                            : "uppercase tracking-[0.18em]",
                        )}
                      >
                        {item.num}
                      </span>
                    </div>
                  }
                  title={
                    <span className="font-display text-lg font-bold text-foreground">
                      {item.title}
                    </span>
                  }
                  description={
                    <div className="space-y-3">
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <li
                            key={tag.label}
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
                              toneClasses[tag.tone as Tone] ?? toneClasses.muted,
                            )}
                          >
                            {tag.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </Reveal>
    </SectionShell>
  );
}
