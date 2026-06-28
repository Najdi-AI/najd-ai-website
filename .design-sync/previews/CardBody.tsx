import * as React from "react";
import { CardBody, CardContainer, CardItem } from "najd-ui";

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M6 2h8l4 4v16H6Z" />
    <path d="M14 2v4h4" />
    <path d="M9 13h6M9 17h6M9 9h2" />
  </svg>
);

type Spec = {
  icon: React.ReactNode;
  arabic: string;
  title: string;
  desc: string;
  tags: string[];
  cta: string;
};

/** Emphasis: the CardBody itself is the framed 3D surface that holds the layers. */
function BodyCard({ spec }: { spec: Spec }) {
  return (
    <CardContainer containerClassName="!py-0">
      <CardBody className="flex h-auto w-full max-w-sm flex-col gap-5 rounded-2xl border border-border/60 bg-najd-ink p-6">
        <CardItem translateZ={60} className="w-full">
          <div className="relative flex min-h-[8rem] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-najd-navy to-najd-ink">
            <div className="absolute inset-0 bg-najd-gradient opacity-20" />
            <span className="relative font-arabic text-3xl font-bold text-white">
              {spec.arabic}
            </span>
          </div>
        </CardItem>

        <CardItem translateZ={45} className="w-full">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue">
              {spec.icon}
            </span>
            <h3 className="font-display text-xl font-bold text-foreground">
              {spec.title}
            </h3>
          </div>
        </CardItem>

        <CardItem as="p" translateZ={35} className="w-full">
          <span className="block text-sm leading-relaxed text-muted-foreground">
            {spec.desc}
          </span>
        </CardItem>

        <CardItem as="ul" translateZ={25} className="flex w-full flex-wrap gap-2">
          {spec.tags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center rounded-full border border-najd-blue/30 bg-najd-blue/10 px-2.5 py-1 text-[11px] font-medium text-najd-blue"
            >
              {tag}
            </li>
          ))}
        </CardItem>

        <CardItem
          as="button"
          translateZ={20}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-najd-gradient px-5 py-2.5 text-sm font-semibold text-white"
        >
          {spec.cta}
          <span aria-hidden>&rarr;</span>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export const VisionCard = () => (
  <BodyCard
    spec={{
      icon: <EyeIcon />,
      arabic: "الرؤية الحاسوبية",
      title: "Computer Vision",
      desc: "Document, ID, and quality-inspection pipelines deployed on-prem or in the Saudi cloud.",
      tags: ["OCR", "Iqama / ID", "Defect detection"],
      cta: "See pipelines",
    }}
  />
);

export const DocAiCard = () => (
  <BodyCard
    spec={{
      icon: <DocIcon />,
      arabic: "أتمتة الوثائق",
      title: "Document AI",
      desc: "Extract, classify, and route bilingual Arabic-English paperwork with human-in-the-loop review.",
      tags: ["Extraction", "Bilingual", "Audit trail"],
      cta: "Book a walkthrough",
    }}
  />
);
