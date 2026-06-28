import * as React from "react";
import { BackgroundGradient } from "najd-ui";

const Check = () => (
  <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-najd-blue/20 text-[10px] font-bold text-najd-blue">
    ✓
  </span>
);

export const FeatureCard = () => (
  <BackgroundGradient
    containerClassName="w-full max-w-sm"
    className="rounded-3xl bg-najd-navy p-7"
  >
    <span className="inline-flex items-center gap-2 rounded-full border border-najd-blue/20 bg-najd-blue/10 px-3 py-1 text-xs font-semibold text-najd-blue">
      صوت نجدي · Saut Najdi
    </span>
    <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
      Arabic voice agents that sound human
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
      Real-time calls in Najdi and Gulf dialects, with live transcription and
      handoff to your team.
    </p>
    <ul className="mt-5 space-y-2.5 text-sm text-neutral-200">
      <li className="flex gap-2">
        <Check /> Sub-second response latency
      </li>
      <li className="flex gap-2">
        <Check /> Dialect-aware understanding
      </li>
      <li className="flex gap-2">
        <Check /> Secure on-prem or private cloud
      </li>
    </ul>
    <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-najd-blue px-5 py-2.5 text-sm font-semibold text-najd-ink">
      Talk to sales
    </button>
  </BackgroundGradient>
);

export const PlanCard = () => (
  <BackgroundGradient
    containerClassName="w-full max-w-sm"
    className="rounded-3xl bg-najd-navy p-7"
  >
    <p className="text-sm font-semibold uppercase tracking-wide text-najd-blue">
      Enterprise
    </p>
    <div className="mt-3 flex items-end gap-2">
      <span className="text-4xl font-bold tracking-tight text-white">Custom</span>
      <span className="pb-1 text-sm text-neutral-400">/ deployment</span>
    </div>
    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
      For regulated Saudi enterprises that need control, scale, and support.
    </p>
    <ul className="mt-5 space-y-2.5 text-sm text-neutral-200">
      <li className="flex gap-2">
        <Check /> On-prem or private-cloud delivery
      </li>
      <li className="flex gap-2">
        <Check /> SSO, audit logs & data residency
      </li>
      <li className="flex gap-2">
        <Check /> Dedicated fine-tuning & SLA
      </li>
    </ul>
    <button className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-najd-blue/40 bg-najd-blue/10 px-5 py-2.5 text-sm font-semibold text-white">
      Contact sales
    </button>
  </BackgroundGradient>
);
