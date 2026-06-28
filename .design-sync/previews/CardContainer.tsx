import * as React from "react";
import { CardBody, CardContainer, CardItem } from "najd-ui";

const MicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4" />
  </svg>
);

const NlpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M4 5h16M4 12h10M4 19h7" />
    <path d="M14.5 16.5 17 19l4.5-5" />
  </svg>
);

type Spec = {
  icon: React.ReactNode;
  badge: string;
  arabic: string;
  title: string;
  desc: string;
  cta: string;
  meta: string;
};

function ProductCard({ spec }: { spec: Spec }) {
  return (
    <CardContainer containerClassName="!py-0">
      <CardBody className="h-auto w-full max-w-sm">
        <div className="relative flex flex-col gap-5 rounded-2xl border border-border/60 bg-najd-ink p-6">
          <CardItem translateZ={70} className="w-full">
            <div className="relative flex min-h-[8rem] w-full items-center justify-center overflow-hidden rounded-xl bg-najd-gradient">
              <span className="font-arabic text-3xl font-bold text-white">
                {spec.arabic}
              </span>
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-najd-navy px-3 py-1 text-[11px] font-semibold text-white">
                {spec.badge}
              </span>
            </div>
          </CardItem>

          <CardItem translateZ={50} className="w-full">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue">
                {spec.icon}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                {spec.title}
              </h3>
            </div>
          </CardItem>

          <CardItem as="p" translateZ={40} className="w-full">
            <span className="block text-sm leading-relaxed text-muted-foreground">
              {spec.desc}
            </span>
          </CardItem>

          <div className="flex items-center justify-between gap-3 pt-2">
            <CardItem
              translateZ={30}
              className="text-[11px] font-semibold text-najd-blue/90"
            >
              {spec.meta}
            </CardItem>
            <CardItem
              as="button"
              translateZ={30}
              className="inline-flex items-center gap-2 rounded-full bg-najd-gradient px-5 py-2.5 text-sm font-semibold text-white"
            >
              {spec.cta}
              <span aria-hidden>&rarr;</span>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export const SautNajdiCard = () => (
  <ProductCard
    spec={{
      icon: <MicIcon />,
      badge: "Flagship",
      arabic: "صوت نجدي",
      title: "Saut Najdi",
      desc: "A real-time Arabic voice agent that understands Gulf dialects and answers customers in natural, on-brand speech.",
      cta: "Hear a demo",
      meta: "Voice AI · Najd AI Solutions",
    }}
  />
);

export const ArabicNlpCard = () => (
  <ProductCard
    spec={{
      icon: <NlpIcon />,
      badge: "Platform",
      arabic: "معالجة اللغة",
      title: "Arabic NLP Suite",
      desc: "Dialect-aware LLMs, retrieval, and entity extraction tuned for Saudi enterprise and Vision 2030 workloads.",
      cta: "Explore APIs",
      meta: "NLP · Riyadh",
    }}
  />
);
