import * as React from "react";
import { Timeline } from "najd-ui";

const Step = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed text-neutral-300">{children}</p>
);

const data = [
  {
    title: "Discover",
    content: (
      <Step>
        We map your data, workflows, and the Arabic-language edge cases that
        matter most to your customers and regulators.
      </Step>
    ),
  },
  {
    title: "Prototype",
    content: (
      <Step>
        A working proof of value in weeks — measured against your KPIs, not a
        generic benchmark.
      </Step>
    ),
  },
  {
    title: "Deploy",
    content: (
      <Step>
        Secure rollout on-prem or in your cloud, with guardrails, evaluation,
        and human-in-the-loop review.
      </Step>
    ),
  },
  {
    title: "Operate",
    content: (
      <Step>
        Continuous monitoring, retraining, and tuning so the system keeps
        improving in production.
      </Step>
    ),
  },
];

export const DeliveryProcess = () => <Timeline data={data} />;
