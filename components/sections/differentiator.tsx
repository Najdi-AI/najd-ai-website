"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  Reveal,
  SectionHeader,
  SectionShell,
  staggerContainer,
  staggerItem,
} from "@/components/sections/primitives";
import { motion } from "motion/react";

type Cell = "yes" | "no" | "partial";

const toneClass: Record<string, string> = {
  green: "text-najd-green",
  blue: "text-najd-blue",
  muted: "text-muted-foreground",
};

export function Differentiator() {
  const { dict, dir, locale } = useI18n();
  const d = dict.differentiator;
  const headCase = locale === "ar" ? "tracking-normal" : "uppercase tracking-wide";

  return (
    <SectionShell id="difference">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* LEFT: header + strengths */}
        <div className="flex flex-col gap-8">
          <SectionHeader
            align="start"
            eyebrow={d.label}
            titleLead={d.titleLead}
            highlight={d.titleHighlight}
            desc={d.desc}
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            {d.strengths.map((s) => (
              <motion.li key={s.title} variants={staggerItem}>
                <CardSpotlight
                  className="rounded-2xl border-border/60 bg-white/[0.02] p-5 transition-colors hover:border-najd-green/40"
                  radius={260}
                  color="rgba(43,182,115,0.10)"
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white/[0.03]",
                        toneClass[s.tone] ?? toneClass.muted
                      )}
                    >
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {s.sub}
                      </p>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT: comparison table */}
        <Reveal y={30} delay={0.1}>
          <div className="relative rounded-2xl border border-border/60 bg-white/[0.02] p-1.5">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.55}
              borderWidth={2}
            />
            <div className="relative overflow-hidden rounded-[14px] bg-card/40">
              <table className="w-full border-collapse text-start">
                <caption className="sr-only">{d.titleLead}</caption>
                <thead>
                  <tr className="border-b border-border/60">
                    <th
                      scope="col"
                      className={cn(
                        "px-4 py-4 text-start text-[11px] font-semibold text-muted-foreground sm:px-5",
                        headCase
                      )}
                    >
                      {d.tableHeaders[0]}
                    </th>
                    <th
                      scope="col"
                      className={cn(
                        "px-3 py-4 text-center text-[11px] font-semibold text-muted-foreground sm:px-4",
                        headCase
                      )}
                    >
                      {d.tableHeaders[1]}
                    </th>
                    <th
                      scope="col"
                      className={cn(
                        "px-3 py-4 text-center text-[11px] font-semibold text-najd-green sm:px-4",
                        headCase
                      )}
                    >
                      {d.tableHeaders[2]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.rows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-border/40 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3.5 text-start text-sm font-medium text-foreground/90 sm:px-5"
                      >
                        {row.feature}
                      </th>
                      <td className="px-3 py-3.5 text-center align-middle sm:px-4">
                        <VendorCell
                          value={row.vendor as Cell}
                          note={row.vendorNote}
                          dir={dir}
                        />
                      </td>
                      <td className="px-3 py-3.5 text-center align-middle sm:px-4">
                        <NajdCell note={row.najdNote} dir={dir} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function VendorCell({
  value,
  note,
  dir,
}: {
  value: Cell;
  note?: string;
  dir: string;
}) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center">
        <Check className="h-4 w-4 text-najd-green" aria-label="Included" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center gap-1.5",
          dir === "rtl" && "flex-row-reverse"
        )}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-najd-blue"
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-najd-blue/90">
          {note ?? "Partial"}
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center">
      <X className="h-4 w-4 text-red-400/70" aria-label="Not included" />
    </span>
  );
}

function NajdCell({ note, dir }: { note?: string; dir: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        dir === "rtl" && "flex-row-reverse"
      )}
    >
      <Check className="h-4 w-4 shrink-0 text-najd-green" aria-label="Included" />
      {note && (
        <span className="text-xs font-semibold text-najd-green">{note}</span>
      )}
    </span>
  );
}
