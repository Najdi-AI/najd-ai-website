"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const Loading = () => (
  <div className="flex h-40 w-full items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-najd-blue/30 border-t-najd-blue" />
  </div>
);

const d = (loader: () => Promise<{ default: ComponentType<unknown> }>) =>
  dynamic(loader, { ssr: false, loading: Loading });

/** slug -> live demo component (client-only). */
export const DEMOS: Record<string, ComponentType<unknown>> = {
  "text-hover-effect": d(() => import("@/components/text-hover-effect-demo")),
  "text-generate-effect": d(() => import("@/components/text-generate-effect-demo")),
  "text-reveal-card": d(() => import("@/components/text-reveal-card-demo")),
  "typewriter-effect": d(() => import("@/components/typewriter-effect-demo-1")),
  "container-text-flip": d(() => import("@/components/container-text-flip-demo")),
  "text-flipping-board": d(() => import("@/components/text-flipping-board-demo")),
  "encrypted-text": d(() => import("@/components/encrypted-text-demo-2")),
  cover: d(() => import("@/components/cover-demo")),
  "3d-card": d(() => import("@/components/3d-card-demo")),
  "card-spotlight": d(() => import("@/components/card-spotlight-demo")),
  "comet-card": d(() => import("@/components/comet-card-demo")),
  "evervault-card": d(() => import("@/components/evervault-card-demo")),
  "glowing-effect": d(() => import("@/components/glowing-effect-demo-2")),
  "expandable-card": d(() => import("@/components/expandable-card-demo-standard")),
  "draggable-card": d(() => import("@/components/draggable-card-demo-2")),
  cards: d(() => import("@/components/cards-demo-3")),
  "bento-grid": d(() => import("@/components/bento-grid-demo-3")),
  "3d-pin": d(() => import("@/components/3d-pin-demo")),
  "background-beams": d(() => import("@/components/background-beams-demo")),
  "background-beams-with-collision": d(() => import("@/components/background-beams-with-collision-demo")),
  "background-lines": d(() => import("@/components/background-lines-demo")),
  "background-boxes": d(() => import("@/components/background-boxes-demo")),
  "background-gradient": d(() => import("@/components/background-gradient-demo")),
  "background-gradient-animation": d(() => import("@/components/background-gradient-animation-demo")),
  sparkles: d(() => import("@/components/sparkles-demo")),
  meteors: d(() => import("@/components/meteors-demo")),
  "canvas-reveal-effect": d(() => import("@/components/canvas-reveal-effect-demo")),
  "svg-mask-effect": d(() => import("@/components/svg-mask-effect-demo")),
  "google-gemini-effect": d(() => import("@/components/google-gemini-effect-demo")),
  "macbook-scroll": d(() => import("@/components/macbook-scroll-demo")),
  "container-scroll-animation": d(() => import("@/components/container-scroll-animation-demo")),
  "hero-parallax": d(() => import("@/components/hero-parallax-demo")),
  "3d-marquee": d(() => import("@/components/3d-marquee-demo")),
  "sticky-scroll-reveal": d(() => import("@/components/sticky-scroll-reveal-demo")),
  timeline: d(() => import("@/components/timeline-demo")),
  lamp: d(() => import("@/components/lamp-demo")),
  "moving-border": d(() => import("@/components/moving-border-demo")),
  "hover-border-gradient": d(() => import("@/components/hover-border-gradient-demo")),
  "stateful-button": d(() => import("@/components/stateful-button-demo")),
  "gooey-input": d(() => import("@/components/gooey-input-demo")),
  "placeholders-and-vanish-input": d(() => import("@/components/placeholders-and-vanish-input-demo")),
  "signup-form": d(() => import("@/components/signup-form-demo")),
  "multi-step-loader": d(() => import("@/components/multi-step-loader-demo")),
  "floating-dock": d(() => import("@/components/floating-dock-demo")),
  sidebar: d(() => import("@/components/sidebar-demo")),
  "animated-tooltip": d(() => import("@/components/animated-tooltip-demo")),
  "link-preview": d(() => import("@/components/link-preview-demo")),
};

export function DemoStage({ slug }: { slug: string }) {
  const Demo = DEMOS[slug];
  if (!Demo) return null;
  return (
    <div className="not-prose w-full">
      <Demo />
    </div>
  );
}
