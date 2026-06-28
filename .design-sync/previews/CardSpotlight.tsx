import * as React from "react";
import { CardSpotlight } from "najd-ui";

type Spec = {
  eyebrow: string;
  title: string;
  items: string[];
  color: string;
  radius: number;
};

function SpotCard({ spec }: { spec: Spec }) {
  return (
    <CardSpotlight
      color={spec.color}
      radius={spec.radius}
      className="w-full max-w-sm rounded-2xl border-border/60 bg-najd-ink p-6"
    >
      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-najd-blue/90">
          {spec.eyebrow}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-bold text-foreground">
          {spec.title}
        </h3>
        <ul className="mt-5 flex flex-col gap-3">
          {spec.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-najd-blue" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CardSpotlight>
  );
}

export const CapabilitiesCard = () => (
  <SpotCard
    spec={{
      eyebrow: "Saut Najdi",
      title: "Voice agent capabilities",
      color: "rgba(38,153,214,0.14)",
      radius: 320,
      items: [
        "Streaming Arabic speech recognition with Gulf-dialect coverage",
        "Natural Arabic text-to-speech in a consistent brand voice",
        "Live handoff to human agents with full conversation context",
        "Bilingual Arabic-English turns within a single call",
      ],
    }}
  />
);

export const ComplianceCard = () => (
  <SpotCard
    spec={{
      eyebrow: "Enterprise",
      title: "Security & deployment",
      color: "rgba(23,40,68,0.85)",
      radius: 260,
      items: [
        "On-prem or Saudi-cloud deployment to keep data in-Kingdom",
        "Role-based access with full audit trails",
        "Configurable retention and PII redaction",
        "SSO and SLA-backed monitoring",
      ],
    }}
  />
);
