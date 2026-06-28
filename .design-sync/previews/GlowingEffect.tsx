import * as React from "react";
import { GlowingEffect } from "najd-ui";

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4" />
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M4 4v16h16" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
  </svg>
);

type Spec = {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
};

/**
 * GlowingEffect is an absolutely-positioned glow that lives inside a relative,
 * bordered container and traces a brand conic-gradient border on interaction.
 */
function GlowCardBase({ spec }: { spec: Spec }) {
  return (
    <div className="glow-najd relative w-full max-w-sm rounded-2xl border border-najd-blue/30 bg-najd-ink p-6">
      <GlowingEffect
        glow
        disabled={false}
        spread={40}
        proximity={64}
        inactiveZone={0.4}
        borderWidth={2}
      />
      <div className="relative z-10 flex flex-col gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue">
          {spec.icon}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-najd-blue/90">
            {spec.eyebrow}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-bold text-foreground">
            {spec.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {spec.desc}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {spec.tags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center rounded-full border border-najd-blue/30 bg-najd-blue/10 px-2.5 py-1 text-[11px] font-medium text-najd-blue"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const GlowCard = () => (
  <GlowCardBase
    spec={{
      icon: <MicIcon />,
      eyebrow: "Saut Najdi",
      title: "Realtime Arabic ASR",
      desc: "Streaming speech recognition that keeps up with live Gulf-dialect conversations.",
      tags: ["Streaming", "On-prem", "Bilingual"],
    }}
  />
);

export const GlowFeature = () => (
  <GlowCardBase
    spec={{
      icon: <ChartIcon />,
      eyebrow: "Insights",
      title: "Conversation analytics",
      desc: "Intent, sentiment, and resolution signals surfaced from every Arabic call.",
      tags: ["Dashboards", "Vision 2030", "Exportable"],
    }}
  />
);
