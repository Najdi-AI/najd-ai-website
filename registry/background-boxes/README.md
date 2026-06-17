# Background Boxes

> An animated grid of skewed boxes that light up with random colors on hover, used as a decorative section background.

## Install

```bash
npx shadcn@latest add @aceternity/background-boxes-demo
```

## What it is

`Background Boxes` renders a large, perspective-skewed grid (150 rows × 100 columns) of bordered cells. Each cell flashes a random pastel color when hovered, creating an interactive backdrop. Use it behind hero sections or headings where you want a playful, animated surface. It is purely decorative and meant to sit absolutely positioned inside an `overflow-hidden` container, typically with a radial mask layered on top.

## Dependencies

- npm packages:
  - `motion` (imported as `motion/react`) — drives the `whileHover` / `animate` color animation.
  - `react` — uses `React.memo`.
  - `cn` helper from `@/lib/utils` (relies on `clsx` / `tailwind-merge`).
- Internal components:
  - The demo imports `Boxes` from `@/components/ui/background-boxes`.
- Tailwind config requirement: None. The component uses only stock Tailwind utility classes (`border-slate-700`, etc.) and inline styles; no custom keyframes/animations are required.

## Exports & Props

`background-boxes.tsx` exports `BoxesCore` and `Boxes` (a `React.memo`-wrapped `BoxesCore`). Both share the same props.

### `Boxes` / `BoxesCore`

| Prop        | Type                | Default | Description                                                                 |
| ----------- | ------------------- | ------- | --------------------------------------------------------------------------- |
| `className` | `string`            | `—`     | Additional classes merged onto the root grid container via `cn`.            |
| `...rest`   | spread (HTML props) | `—`     | Any other props are spread onto the root `<div>`.                           |

## Usage

```tsx
"use client";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function Demo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Tailwind is Awesome
      </h1>
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The hover colors are hardcoded in the `colors` array inside `BoxesCore` (pastels like `#93c5fd`, `#f9a8d4`, `#86efac`), and the border/SVG strokes use `slate-700`; swap these for brand tones.

## Notes

- Performance: renders 150 × 100 = 15,000 cells (motion divs), which is heavy DOM. Keep it to a single instance per page and within an `overflow-hidden` container. The wide grid (`-translate-x-1/2 -translate-y-1/2`, skew/scale transform) intentionally overflows its parent.
- The parent must be `position: relative` and `overflow-hidden`; the grid is `absolute` and z-indexed at `z-0`, so place foreground content at a higher z-index (the demo uses `z-20`).
- Hover-driven only: the color flash requires a pointer hover, so the effect is not visible on touch/mobile devices (no hover state). The grid remains a static decorative backdrop there.
- RTL: layout is symmetric/decorative, so no RTL-specific handling is needed.
- No remote image domains or scroll behaviour required.
