"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/components/providers";
import { SectionShell, SectionHeader } from "@/components/sections/primitives";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

/** Branded right-hand visual: lists a group's pills over a najd-gradient-tinted card. */
function StackPanel({ name, pills }: { name: string; pills: string[] }) {
  const { dir } = useI18n();
  return (
    <div
      dir={dir}
      className="relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden rounded-md bg-najd-ink p-7"
    >
      {/* brand gradient tint + glows over the panel */}
      <div className="pointer-events-none absolute inset-0 bg-najd-gradient opacity-[0.14]" />
      <div className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-najd-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -start-8 h-32 w-32 rounded-full bg-najd-blue/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-najd-blue/30 bg-najd-blue/[0.08] px-3 py-1 text-[11px] font-semibold text-najd-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-najd-blue" />
          {name}
        </span>
      </div>

      <ul className="relative flex flex-wrap content-start gap-2">
        {pills.map((pill) => (
          <li
            key={pill}
            className="rounded-full border border-border/60 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-sm"
          >
            {pill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  const { dict } = useI18n();
  const s = dict.stack;

  const content: { title: string; description: string; content?: ReactNode }[] =
    s.groups.map((group) => ({
      title: group.name,
      description: group.pills.join(" · "),
      content: <StackPanel name={group.name} pills={group.pills} />,
    }));

  return (
    <SectionShell id="stack">
      <SectionHeader
        eyebrow={s.label}
        titleLead={s.titleLead}
        highlight={s.titleHighlight}
        align="center"
      />

      {/* No overflow-hidden here: the StickyScroll panel uses position:sticky and
          must be able to pin against page scroll (a clipping/overflow ancestor
          would disable the sticky behavior). */}
      <div className="mt-12 rounded-2xl border border-border/60 bg-white/[0.02]">
        <StickyScroll content={content} contentClassName="!bg-najd-ink !shadow-none" />
      </div>
    </SectionShell>
  );
}
