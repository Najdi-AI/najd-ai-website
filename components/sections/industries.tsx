"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { SectionShell, SectionHeader, Reveal } from "@/components/sections/primitives";

const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/canvas-reveal-effect").then(
      (m) => m.CanvasRevealEffect,
    ),
  { ssr: false },
);

const BRAND_COLORS = [
  [43, 182, 115], // najd-green
  [38, 153, 214], // najd-blue
];

function IndustryCard({
  icon,
  name,
  colorIndex,
}: {
  icon: string;
  name: string;
  colorIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  // Alternate the accent color per card so the grid reads as both green and blue.
  const colors = colorIndex % 2 === 0 ? [BRAND_COLORS[0]] : [BRAND_COLORS[1]];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="group/card relative flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02] outline-none transition-colors duration-300 hover:border-najd-green/40 focus-visible:border-najd-green/40 sm:h-36"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-najd-ink"
              colors={colors}
              dotSize={2.6}
            />
            {/* soft radial fade so the dots read as a glow, not a hard plane */}
            <div className="absolute inset-0 bg-najd-ink/30 [mask-image:radial-gradient(220px_at_center,white,transparent)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center gap-3 px-3 text-center">
        <Icon
          name={icon}
          className="h-7 w-7 text-najd-green transition-colors duration-300 group-hover/card:text-white group-focus-within/card:text-white"
        />
        <span className="text-sm font-semibold leading-tight text-foreground/90 transition-colors duration-300 group-hover/card:text-white group-focus-within/card:text-white">
          {name}
        </span>
      </div>
    </div>
  );
}

export function Industries() {
  const { dict } = useI18n();
  const i = dict.industries;

  return (
    <SectionShell id="industries">
      <SectionHeader
        align="center"
        eyebrow={i.label}
        titleLead={i.titleLead}
        highlight={i.titleHighlight}
        desc={i.desc}
      />

      <Reveal
        className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        delay={0.05}
      >
        {i.items.map((item, idx) => (
          <IndustryCard
            key={`${item.icon}-${item.name}`}
            icon={item.icon}
            name={item.name}
            colorIndex={idx}
          />
        ))}
      </Reveal>
    </SectionShell>
  );
}
