"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";

/** Scroll-into-view reveal wrapper. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.5, 0.3, 1] } },
};

/** Pill eyebrow label — drops uppercase/tracking for Arabic. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  const { locale } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-najd-blue/25 bg-najd-blue/[0.06] px-3.5 py-1.5 text-[11px] font-semibold text-najd-blue",
        locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.18em]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-najd-blue motion-safe:animate-pulse" />
      {children}
    </span>
  );
}

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-gradient-najd", className)}>{children}</span>;
}

/** Standard section header: eyebrow + title (lead + gradient highlight) + description. */
export function SectionHeader({
  eyebrow,
  titleLead,
  highlight,
  desc,
  align = "center",
  className,
}: {
  eyebrow?: string;
  titleLead?: string;
  highlight?: string;
  desc?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {(titleLead || highlight) && (
        <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
          {titleLead}
          {titleLead && highlight ? " " : ""}
          {highlight && <GradientText>{highlight}</GradientText>}
        </h2>
      )}
      {desc && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]",
            align === "center" && "mx-auto"
          )}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/** Section wrapper with consistent rhythm + anchor offset for the sticky nav. */
export function SectionShell({
  id,
  children,
  className,
  innerClassName,
  full = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 md:py-28", className)}
    >
      <div className={cn(!full && "mx-auto w-full max-w-7xl px-5 sm:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
