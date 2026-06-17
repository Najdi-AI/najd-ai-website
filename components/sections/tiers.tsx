"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { Icon } from "@/components/site/icon";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  Reveal,
  SectionHeader,
  SectionShell,
} from "@/components/sections/primitives";

type TierItem = {
  icon: string;
  name: string;
  delivery: string;
  desc: string;
  featured: boolean;
  features: string[];
};

export function Tiers() {
  const { dict, dir } = useI18n();
  const t = dict.tiers;
  const isRtl = dir === "rtl";

  return (
    <SectionShell id="tiers">
      <SectionHeader
        align="center"
        eyebrow={t.label}
        titleLead={t.titleLead}
        highlight={t.titleHighlight}
        desc={t.desc}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
        {(t.items as TierItem[]).map((item, i) => (
          <Reveal key={item.name} delay={i * 0.08} className="h-full">
            <TierCard
              item={item}
              isRtl={isRtl}
              flagship={t.flagship}
              deliveryLabel={t.deliveryLabel}
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function TierCard({
  item,
  isRtl,
  flagship,
  deliveryLabel,
}: {
  item: TierItem;
  isRtl: boolean;
  flagship: string;
  deliveryLabel: string;
}) {
  const inner = (
    <div
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-[1.4rem] p-6 sm:p-7",
        item.featured
          ? "bg-najd-ink"
          : "border border-border/60 bg-white/[0.02] transition-colors duration-300 hover:border-najd-green/40"
      )}
    >
      {item.featured && (
        <CardItem
          translateZ={60}
          className={cn(
            "absolute top-4 z-20",
            isRtl ? "start-4" : "end-4"
          )}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-najd-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-8px_rgba(43,182,115,0.8)]">
            {flagship}
          </span>
        </CardItem>
      )}

      <CardItem translateZ={50}>
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl border",
            item.featured
              ? "border-najd-green/40 bg-najd-green/[0.12]"
              : "border-border/60 bg-najd-green/[0.06]"
          )}
        >
          <Icon name={item.icon} className="h-6 w-6 text-najd-green" />
        </span>
      </CardItem>

      <CardItem translateZ={40} className="w-full">
        <h3 className="font-display text-xl font-bold leading-tight text-foreground">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-najd-blue">
          <span className="me-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {deliveryLabel}:
          </span>
          {item.delivery}
        </p>
      </CardItem>

      <CardItem translateZ={30} as="p" className="w-full">
        <span className="block text-sm leading-relaxed text-muted-foreground">
          {item.desc}
        </span>
      </CardItem>

      <CardItem translateZ={20} as="ul" className="mt-1 w-full space-y-2.5">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-najd-green/15 text-najd-green">
              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-snug text-foreground/80">
              {feature}
            </span>
          </li>
        ))}
      </CardItem>
    </div>
  );

  return (
    <CardContainer
      containerClassName="!py-0 h-full w-full block"
      className="h-full w-full"
    >
      <CardBody className="!h-full !w-full">
        {item.featured ? (
          <BackgroundGradient
            containerClassName="h-full rounded-[1.55rem]"
            className="h-full rounded-[1.4rem]"
          >
            {inner}
          </BackgroundGradient>
        ) : (
          inner
        )}
      </CardBody>
    </CardContainer>
  );
}
