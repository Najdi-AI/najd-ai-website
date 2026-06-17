"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SectionShell, SectionHeader, Reveal } from "@/components/sections/primitives";

type Tone = "green" | "blue" | "muted";

const TONE_STYLES: Record<Tone, string> = {
  green: "border-najd-green/30 bg-najd-green/[0.08] text-najd-green",
  blue: "border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue",
  muted: "border-border/70 bg-white/[0.03] text-muted-foreground",
};

export function Services() {
  const { dict, dir } = useI18n();
  const s = dict.services;
  const tabs = s.tabs;
  const panels = s.panels as Record<
    string,
    {
      icon: string;
      title: string;
      desc: string;
      industries: { label: string; tone: string }[];
    }[]
  >;

  const [active, setActive] = useState<string>(tabs[0].key);
  const cards = panels[active] ?? [];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next = index;
    switch (e.key) {
      case "ArrowRight":
        next = dir === "rtl" ? index - 1 : index + 1;
        break;
      case "ArrowLeft":
        next = dir === "rtl" ? index + 1 : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next < 0) next = last;
    else if (next > last) next = 0;
    setActive(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <SectionShell id="services">
      <SectionHeader
        align="center"
        eyebrow={s.label}
        titleLead={s.titleLead}
        highlight={s.titleHighlight}
        desc={s.desc}
      />

      {/* Tab bar */}
      <Reveal className="mt-10" delay={0.05}>
        <div
          role="tablist"
          aria-label={s.label}
          dir={dir}
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {tabs.map((t, index) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                type="button"
                id={`services-tab-${t.key}`}
                aria-selected={isActive}
                aria-controls={`services-panel-${t.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(t.key)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-najd-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-transparent bg-najd-gradient text-white shadow-[0_10px_30px_-12px_rgba(43,182,115,0.7)]"
                    : "border-border/70 bg-white/[0.02] text-muted-foreground hover:border-najd-green/40 hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Active panel */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`services-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`services-tab-${active}`}
            initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
            transition={{ duration: 0.35, ease: [0.21, 0.5, 0.3, 1] }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map((c) => (
              <CardSpotlight
                key={c.title}
                color="rgba(43,182,115,0.10)"
                className="group/spotlight h-full !rounded-2xl !border-border/60 !bg-white/[0.02] !p-6"
              >
                <div className="relative z-10 flex h-full flex-col items-start gap-4 text-start">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-najd-green/25 bg-najd-green/[0.07]">
                    <Icon name={c.icon} className="h-6 w-6 text-najd-green" />
                  </span>

                  <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                    {c.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {c.industries.map((ind) => (
                      <li
                        key={ind.label}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                          TONE_STYLES[(ind.tone as Tone) in TONE_STYLES ? (ind.tone as Tone) : "muted"]
                        )}
                      >
                        {ind.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardSpotlight>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
