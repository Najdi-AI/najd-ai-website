"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useI18n } from "@/components/providers";
import { Eyebrow } from "@/components/sections/primitives";

/** Full-width interactive brand wordmark band (uses the user-favourite Text Hover Effect). */
export function BrandBand() {
  const { dict } = useI18n();
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-background via-najd-ink to-background py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-5">
        <Eyebrow>{dict.hero.badge.split("·")[0].trim()}</Eyebrow>
        <div className="h-[12rem] w-full sm:h-[18rem] md:h-[24rem]">
          <TextHoverEffect text="NAJD AI" />
        </div>
        <p className="-mt-4 text-sm text-muted-foreground sm:-mt-8">{dict.hero.sub}</p>
      </div>
    </section>
  );
}
