"use client";

import { Timeline } from "@/components/ui/timeline";
import { Icon } from "@/components/site/icon";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeader, SectionShell } from "@/components/sections/primitives";

const STEP_ICONS = [
  "user-search",
  "map",
  "settings",
  "shield-check",
  "graduation-cap",
] as const;

export function Process() {
  const { dict, dir } = useI18n();
  const p = dict.process;
  const isRtl = dir === "rtl";

  const data = p.steps.map((step, i) => ({
    title: step.title,
    content: (
      <Reveal
        className={cn(
          "group rounded-2xl border border-border/60 bg-white/[0.02] p-5 backdrop-blur transition-colors hover:border-najd-blue/40 sm:p-6",
          isRtl ? "text-right" : "text-left"
        )}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-najd-blue/25 bg-najd-blue/[0.08]">
            <Icon
              name={STEP_ICONS[i] ?? "sparkles"}
              className="h-5 w-5 text-najd-blue"
            />
          </span>
          <span
            className="font-display text-2xl font-bold leading-none text-gradient-najd"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {step.desc}
        </p>
      </Reveal>
    ),
  }));

  return (
    <SectionShell id="process" className="overflow-hidden">
      <SectionHeader
        align="center"
        eyebrow={p.label}
        titleLead={p.titleLead}
        highlight={p.titleHighlight}
        desc={p.desc}
      />

      {/* Aceternity Timeline. Its internal layout (rail on the inline-start,
          sticky step labels) is LTR-hardcoded; in RTL we mirror the whole
          block so the growing beam still reads as the start edge. */}
      <div
        dir="ltr"
        className={cn("mt-10", isRtl && "[&_h3]:!text-right")}
      >
        <Timeline data={data} />
      </div>
    </SectionShell>
  );
}
