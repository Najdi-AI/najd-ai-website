# Text Reveal Card

> A hover/touch-driven card that wipes away one line of text to reveal a hidden line underneath, following the pointer.

## Install

```bash
npx shadcn@latest add @aceternity/text-reveal-card-demo
```

## What it is

`TextRevealCard` shows a base line of text and, as the user moves the pointer (or finger) across the card, progressively reveals a second "hidden" line using an animated `clip-path` wipe with a soft vertical separator beam. An animated starfield sits behind the text for ambiance. Use it for playful hero callouts, before/after taglines, or any "hover to reveal" reveal moment where you want a tactile, interactive piece of copy.

## Dependencies

- npm packages:
  - `react`
  - `motion` (imported from `motion/react`)
  - `tailwind-merge` (`twMerge`)
- Internal components:
  - `@/lib/utils` — uses the `cn` helper (clsx + tailwind-merge).
- Tailwind config requirement: none. No custom keyframes/animations are required; all motion is driven by the `motion` library and inline `clip-path` styles.

## Exports & Props

### `TextRevealCard`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | The visible base line of text shown before reveal. |
| `revealText` | `string` | — | The hidden line uncovered as the pointer moves across the card. |
| `children` | `React.ReactNode` | — | Optional content rendered above the reveal area (e.g. title/description). |
| `className` | `string` | — | Extra classes merged onto the card container via `cn`. |

### `TextRevealCardTitle`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Title content rendered in an `h2`. |
| `className` | `string` | — | Extra classes merged via `twMerge`. |

### `TextRevealCardDescription`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Description content rendered in a `p`. |
| `className` | `string` | — | Extra classes merged via `twMerge`. |

### `MemoizedStars`

Memoized internal starfield component (no props). Rendered automatically inside `TextRevealCard`; rarely used directly.

## Usage

```tsx
"use client";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export default function Example() {
  return (
    <TextRevealCard text="You know the business" revealText="I know the chemistry">
      <TextRevealCardTitle>Sometimes, you just need to see it.</TextRevealCardTitle>
      <TextRevealCardDescription>
        This is a text reveal card. Hover over the card to reveal the hidden text.
      </TextRevealCardDescription>
    </TextRevealCard>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The card hardcodes a dark theme — card background `#1d1c20`, base text `#323238`, title white, description `#a9a9a9` — and the reveal gradient runs `from-white to-neutral-300`. Swap these for navy surfaces and green/blue accents to stay on-brand.

## Notes

- Interaction-driven, not scroll-driven: the reveal tracks pointer/touch position, not page scroll.
- Touch support is built in (`onTouchStart`/`onTouchMove`/`onTouchEnd`), and `touchMoveHandler` calls `preventDefault()`, which can block vertical scrolling while a finger is dragging over the card on mobile.
- Geometry (card `left`/`width`) is measured once on mount via `getBoundingClientRect`; if the card moves or the layout shifts after mount (e.g. responsive resize, repositioning) the reveal offset can be off until remount.
- Performance: renders 80 animated `motion.span` star particles that loop forever — minor continuous animation cost, but no canvas/WebGL/three usage.
- Fixed default width `w-[40rem]`; override via `className` for narrower/responsive layouts.
- RTL: not specifically handled — the wipe is computed left-to-right from the card's left edge.
