# Comet Card

> A 3D tilt card that rotates, translates, and casts a moving light glare toward the cursor on hover.

## Install

```bash
npx shadcn@latest add @aceternity/comet-card-demo
```

## What it is

`CometCard` is a wrapper component that gives any children a perspective-based 3D tilt effect driven by the mouse position. As the cursor moves across the card, it rotates and shifts along both axes (with spring smoothing) and renders a radial-gradient "glare" highlight that follows the pointer. Use it to make a single hero element — an invite, a product card, a photo, a profile — feel tactile and interactive.

## Dependencies

- npm packages:
  - `react` (`useRef`)
  - `motion` (`motion/react`: `motion`, `useMotionValue`, `useSpring`, `useTransform`, `useMotionTemplate`)
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
- Tailwind config requirement: none (no custom keyframes/animations). It does rely on Tailwind utilities `perspective-distant` and `transform-3d`, which are built-in Tailwind v4 utilities — ensure the project is on Tailwind v4 (or has equivalent utilities defined).

## Exports & Props

### `CometCard`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rotateDepth` | `number` | `17.5` | Maximum tilt angle (in degrees) the card rotates on the X and Y axes as the cursor moves. |
| `translateDepth` | `number` | `20` | Maximum parallax shift (in pixels) the card translates on the X and Y axes as the cursor moves. |
| `className` | `string` | `—` | Extra classes merged onto the outer perspective wrapper. |
| `children` | `React.ReactNode` | `—` | The content rendered inside the tilting card. |

## Usage

```tsx
import { CometCard } from "@/components/ui/comet-card";

export default function Example() {
  return (
    <CometCard>
      <button
        type="button"
        className="flex w-80 flex-col rounded-[16px] bg-[#1F2121] p-4"
      >
        <img
          className="aspect-[3/4] w-full rounded-[16px] object-cover"
          alt="Invite background"
          src="/invite.jpg"
        />
        <div className="mt-2 flex items-center justify-between p-4 font-mono text-white">
          <span className="text-xs">Comet Invitation</span>
          <span className="text-xs text-gray-300 opacity-50">#F7RA</span>
        </div>
      </button>
    </CometCard>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. Note that the brand-facing colours (e.g. the demo's `#1F2121` card background) live in your `children`, not in `CometCard` itself; the component's only hardcoded colours are the white glare gradient and the black drop-shadow, which are intentionally neutral.

## Notes

- Hover/pointer driven: the effect responds to `onMouseMove` / `onMouseLeave`, so on touch devices (mobile/tablet) there is no tilt or glare — the card simply renders flat. Not scroll-driven.
- RTL: no directional assumptions in the component itself; tilt is purely based on cursor position, so it works in both LTR and RTL layouts.
- Performance: lightweight — uses `motion` spring values and CSS transforms only (no canvas, particles, or three.js). The glare layer uses `mix-blend-overlay`, which is GPU-composited and inexpensive.
- The glare overlay uses `pointer-events-none`, so it never blocks clicks on interactive children.
- No remote image domains are required by the component (the demo's Unsplash image is illustrative only; swap in your own asset).
