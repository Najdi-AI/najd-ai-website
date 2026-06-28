import * as React from "react";
import { HoverBorderGradient } from "najd-ui";

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full items-center justify-center px-6 py-12">
    {children}
  </div>
);

export const PrimaryCta = () => (
  <Stage>
    <HoverBorderGradient
      as="button"
      className="flex items-center gap-2 text-sm font-semibold"
    >
      Start a project
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </HoverBorderGradient>
  </Stage>
);

export const ArabicCta = () => (
  <Stage>
    <div dir="rtl">
      <HoverBorderGradient as="button" className="text-sm font-semibold">
        تواصل معنا
      </HoverBorderGradient>
    </div>
  </Stage>
);

export const HearSautNajdi = () => (
  <Stage>
    <HoverBorderGradient
      as="button"
      className="flex items-center gap-2 text-sm font-semibold"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path
          d="M12 4v16M8 8v8M4 11v2M16 7v10M20 10v4"
          strokeLinecap="round"
        />
      </svg>
      Hear Saut Najdi
    </HoverBorderGradient>
  </Stage>
);
