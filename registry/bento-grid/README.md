# Bento Grid
> A responsive masonry-style card grid where each cell can span columns and hold a title, description, icon, and animated header.

## Install
```bash
npx shadcn@latest add @aceternity/bento-grid-demo-3
```

## What it is
Bento Grid is a lightweight layout primitive that arranges feature cards in an asymmetric grid (1 column on mobile, 3 columns on desktop). Each `BentoGridItem` is a self-contained card with an optional animated header region, an icon, a title, and a description, and can be widened by passing a column-span class (e.g. `md:col-span-2`). Use it for feature showcases, division/service overviews, or any "bento box" style highlight section where cells vary in size. On hover each card lifts its shadow and nudges its content for a subtle interactive feel.

## Dependencies
- npm packages:
  - `motion` (imported as `motion/react`) — used by the demo's animated skeleton headers. The core `BentoGrid`/`BentoGridItem` components do **not** import motion.
  - `@tabler/icons-react` — icon set used in the demo (`IconClipboardCopy`, `IconFileBroken`, `IconSignature`, `IconTableColumn`, `IconBoxAlignRightFilled`).
  - `clsx` + `tailwind-merge` — consumed indirectly through the `cn` helper.
- Internal components:
  - `@/lib/utils` — the `cn` class-merging helper (required by both core and demo).
  - `@/components/ui/bento-grid` — the demo imports `BentoGrid` and `BentoGridItem` from here.
- Tailwind config requirements:
  - The demo's skeletons use the `bg-dot-black/[0.2]` and `bg-dot-white/[0.2]` dotted-background utilities (Aceternity dot-pattern plugin). The core grid components do not require any custom keyframes.

## Exports & Props

### `BentoGrid`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the grid wrapper (e.g. to override max-width or row height). |
| `children` | `React.ReactNode` | — | The `BentoGridItem` cards to lay out. |

### `BentoGridItem`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the card; use `md:col-span-2` etc. to control span. |
| `title` | `string \| React.ReactNode` | — | Card title rendered in bold. |
| `description` | `string \| React.ReactNode` | — | Card supporting text rendered below the title. |
| `header` | `React.ReactNode` | — | Top region of the card, typically an animated graphic or skeleton. |
| `icon` | `React.ReactNode` | — | Icon shown above the title; nudges right on card hover. |

## Usage
```tsx
"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy, IconFileBroken } from "@tabler/icons-react";

export default function Demo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      <BentoGridItem
        title="AI Content Generation"
        description="Experience the power of AI in generating unique content."
        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2]" />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-1"
      />
      <BentoGridItem
        title="Automated Proofreading"
        description="Let AI handle the proofreading of your documents."
        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2]" />}
        icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
    </BentoGrid>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the eight divisions grid. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — for example the demo's pink/violet gradient dots and multicolour skeleton gradient (`#ee7752, #e73c7e, #23a6d5, #23d5ab`) are swapped for brand tones.

## Notes
- **RTL:** The cards and grid are layout-agnostic; the icon hover nudge is `translate-x-2` (LTR-oriented), so under RTL the nudge direction may feel reversed — adjust if strict mirroring is needed.
- **Remote images:** The demo's `SkeletonFour`/`SkeletonFive` reference an external avatar from `pbs.twimg.com`; replace these with brand assets or add the domain to `next.config` image settings if using `next/image` (the demo uses a plain `<img>`).
- **Animation/performance:** Headers in the demo are `motion` hover/loop animations (lightweight; no canvas/WebGL/three). `SkeletonThree` runs an infinite gradient loop, and `SkeletonTwo` uses `Math.random()` widths which are non-deterministic between server and client (can cause hydration mismatch — fix by seeding or computing on mount).
- **Mobile:** Collapses to a single column (`grid-cols-1`); column-span classes only apply at `md` and up.
- Not scroll-driven — animations are hover/auto only and need no page scroll.
