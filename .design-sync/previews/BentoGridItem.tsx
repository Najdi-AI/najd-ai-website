import * as React from "react";
import { BentoGrid, BentoGridItem } from "najd-ui";

const Header = ({ tone = "blue" }: { tone?: "blue" | "navy" | "soft" }) => (
  <div
    className={
      "relative flex h-full min-h-[6rem] w-full overflow-hidden rounded-xl " +
      (tone === "soft"
        ? "bg-najd-gradient-soft"
        : tone === "navy"
          ? "bg-gradient-to-br from-najd-navy to-najd-ink"
          : "bg-najd-gradient")
    }
  >
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue">
    {children}
  </span>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4" />
  </svg>
);
const NlpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 5h16M4 12h10M4 19h7" />
    <path d="M14.5 16.5 17 19l4.5-5" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const items = [
  {
    title: "Saut Najdi — Arabic voice agent",
    description:
      "Real-time, dialect-aware voice for customer operations across Saudi enterprises.",
    tone: "soft",
    icon: <MicIcon />,
    className: "md:col-span-2",
  },
  {
    title: "Arabic NLP",
    description: "Dialect-aware LLMs and retrieval tuned for Gulf Arabic.",
    tone: "blue",
    icon: <NlpIcon />,
    className: "",
  },
  {
    title: "Computer Vision",
    description: "Document, ID, and quality-inspection pipelines.",
    tone: "navy",
    icon: <EyeIcon />,
    className: "",
  },
  {
    title: "MLOps & secure delivery",
    description:
      "On-prem and Saudi-cloud deployment, monitored end to end for Vision 2030 programs.",
    tone: "navy",
    icon: null,
    className: "md:col-span-2",
  },
] as const;

export const ServiceTiles = () => (
  <BentoGrid className="mx-0 max-w-3xl">
    {items.map((it) => (
      <BentoGridItem
        key={it.title}
        title={it.title}
        description={it.description}
        header={<Header tone={it.tone} />}
        icon={it.icon ? <Chip>{it.icon}</Chip> : undefined}
        className={
          "border-border/60 bg-white/[0.02] " + it.className
        }
      />
    ))}
  </BentoGrid>
);
