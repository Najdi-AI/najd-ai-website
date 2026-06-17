"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useScroll, useTransform } from "motion/react";
import { useI18n } from "@/components/providers";

const GoogleGeminiEffect = dynamic(
  () =>
    import("@/components/ui/google-gemini-effect").then(
      (m) => m.GoogleGeminiEffect,
    ),
  { ssr: false },
);

export function GeminiBand() {
  const { dict } = useI18n();
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <section
      id="intelligence"
      className="relative scroll-mt-24 bg-najd-ink"
    >
      {/* brand accent glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-najd-blue/30 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-najd-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 h-[24rem] w-[24rem] rounded-full bg-najd-blue/10 blur-[120px]" />

      <div
        ref={ref}
        className="relative h-[200vh] w-full overflow-clip pt-24 sm:pt-40"
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title={dict.hero.titleHighlight}
          description={dict.differentiator.desc}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-najd-blue/30 to-transparent" />
    </section>
  );
}
