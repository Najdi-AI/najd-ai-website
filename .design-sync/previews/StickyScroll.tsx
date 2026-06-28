import * as React from "react";
import { StickyScroll } from "najd-ui";

// Each panel sits on the component's animated brand gradient (blue -> navy),
// so we only paint the metric on top.
const Panel = ({
  kicker,
  ar,
  metric,
}: {
  kicker: string;
  ar: string;
  metric: string;
}) => (
  <div className="flex h-full min-h-52 w-full flex-col items-center justify-center p-8 text-center text-white">
    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
      {kicker}
    </div>
    <div className="mt-3 text-4xl font-bold" dir="rtl">
      {ar}
    </div>
    <div className="mt-3 text-sm text-neutral-300">{metric}</div>
  </div>
);

const content = [
  {
    title: "Ingest",
    description:
      "Saut Najdi streams the caller's Arabic speech in real time, transcribing Gulf and Najdi dialects as they speak — no menus, no hold music.",
    content: <Panel kicker="Listen" ar="استماع" metric="< 300 ms first response" />,
  },
  {
    title: "Reason",
    description:
      "A dialect-aware LLM resolves intent against your knowledge base and live systems, grounded in your policies and Arabic edge cases.",
    content: <Panel kicker="Understand" ar="فهم" metric="Grounded on your data" />,
  },
  {
    title: "Act",
    description:
      "The agent completes the task end to end — books, routes, updates the CRM, or hands off to a human with full context.",
    content: <Panel kicker="Resolve" ar="تنفيذ" metric="End-to-end resolution" />,
  },
  {
    title: "Improve",
    description:
      "Every conversation is evaluated and fed back into tuning, so accuracy and containment keep climbing in production.",
    content: <Panel kicker="Learn" ar="تحسين" metric="Continuous evaluation" />,
  },
];

export const VoicePipeline = () => <StickyScroll content={content} />;
