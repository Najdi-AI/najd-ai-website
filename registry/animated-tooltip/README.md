# Animated Tooltip
> A row of overlapping avatars that reveal a spring-animated, mouse-tracking name/designation tooltip on hover.

## Install
```bash
npx shadcn@latest add @aceternity/animated-tooltip-demo
```

## What it is
`AnimatedTooltip` renders a horizontal stack of overlapping circular avatars. When you hover over an avatar, a tooltip pops in with a spring animation showing the person's name and designation, and the tooltip rotates/translates based on the horizontal position of your cursor over the image. Use it for team/contributor rows, "trusted by" avatar groups, or any compact people listing where a richer hover label adds context.

## Dependencies
- npm packages:
  - `react` — `useState`, `useRef`.
  - `motion` (imported from `motion/react`) — `motion`, `useTransform`, `AnimatePresence`, `useMotionValue`, `useSpring`.
- Internal components: none (does not import from `@/components/ui/...`; the demo imports `AnimatedTooltip` from `@/components/ui/animated-tooltip`).
- Tailwind config requirement: none (no custom keyframes/animations; all motion is driven by the `motion` library).

## Exports & Props

### `AnimatedTooltip`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ id: number; name: string; designation: string; image: string }[]` | — | Array of people to render. `id` keys the hover state, `name` and `designation` populate the tooltip, and `image` is the avatar `src`. |

## Usage
```tsx
"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
  },
];

export default function Demo() {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The tooltip uses a black background (`bg-black`) with two accent underline gradients — `via-emerald-500` and `via-sky-500` — which map naturally to the brand green and blue; consider swapping `bg-black` for navy.

## Notes
- The tooltip's rotation and horizontal translation are driven by `onMouseMove` over each avatar, so the cursor-tracking tilt is a desktop/pointer effect only — on touch devices there is no hover, so the tooltip will not appear.
- Uses a plain `<img>` tag (not `next/image`), so no `next.config` remote image domains are required; the demo images come from `images.unsplash.com`.
- Avatars overlap via negative margin (`-mr-4`); ensure the container has enough width. RTL is not specifically handled — the overlap direction and `left-1/2` tooltip centering assume LTR layout, so verify positioning under `dir="rtl"`.
- Each hovered avatar runs a `requestAnimationFrame` loop for smooth tracking; lightweight, but it is per-item DOM/animation work rather than canvas/WebGL, so performance is not a concern for typical list sizes.
