"use client";

import dynamic from "next/dynamic";

import { useI18n } from "@/components/providers";

const MacbookScroll = dynamic(
  () => import("@/components/ui/macbook-scroll").then((m) => m.MacbookScroll),
  { ssr: false },
);

export function ProductPreview() {
  const { dict, dir, locale } = useI18n();
  const h = dict.hero;

  return (
    <section
      id="dashboard"
      dir={dir}
      className="relative w-full overflow-hidden bg-najd-ink py-10 md:py-0"
    >
      {/* ambient brand glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-najd-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-najd-blue/10 blur-[120px]" />

      <div className="relative z-10 dark">
        <MacbookScroll
          src="/brand/dashboard.svg"
          showGradient={false}
          imageAlt={
            locale === "ar"
              ? "معاينة لوحة تحكم نجد للذكاء الاصطناعي"
              : "Najd AI dashboard preview"
          }
          title={
            <span className="font-display font-bold tracking-tight text-foreground">
              <span className="text-gradient-najd">{h.titleHighlight}</span>{" "}
              {h.titleHighlight2}
            </span>
          }
        />
      </div>
    </section>
  );
}
