import * as React from "react";
import { BentoGrid, BentoGridItem } from "najd-ui";

const Header = ({ tone = "blue" }: { tone?: "blue" | "navy" | "soft" }) => (
  <div
    className={
      "flex h-full min-h-[6rem] w-full rounded-xl " +
      (tone === "soft"
        ? "bg-najd-gradient-soft"
        : tone === "navy"
          ? "bg-gradient-to-br from-najd-navy to-najd-ink"
          : "bg-najd-gradient")
    }
  />
);

const items = [
  {
    title: "Arabic NLP",
    description: "Dialect-aware LLMs and retrieval tuned for Gulf Arabic.",
    tone: "blue",
    className: "md:col-span-2",
  },
  {
    title: "Computer Vision",
    description: "Document, ID, and quality-inspection pipelines.",
    tone: "navy",
  },
  {
    title: "Saut Najdi",
    description: "Real-time Arabic voice agents for customer operations.",
    tone: "soft",
  },
  {
    title: "MLOps & Deployment",
    description: "Secure on-prem and cloud delivery, monitored end to end.",
    tone: "navy",
    className: "md:col-span-2",
  },
] as const;

export const ServicesGrid = () => (
  <BentoGrid className="mx-0 max-w-3xl">
    {items.map((it) => (
      <BentoGridItem
        key={it.title}
        title={it.title}
        description={it.description}
        header={<Header tone={it.tone} />}
        className={it.className}
      />
    ))}
  </BentoGrid>
);
