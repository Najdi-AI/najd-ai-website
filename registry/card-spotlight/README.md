# Card Spotlight

> A bordered card that reveals a mouse-following radial spotlight and an animated dot-matrix canvas on hover.

## Install

```bash
npx shadcn@latest add @aceternity/card-spotlight-demo
```

## What it is

`CardSpotlight` is a container card that tracks the cursor and paints a soft radial "spotlight" mask over the card while hovered. On hover it also mounts an animated WebGL dot-matrix (`CanvasRevealEffect`) behind the content for a subtle reveal effect. Use it to make feature, service, or differentiator cards feel interactive and premium. Wrap any content as `children`; keep foreground text on a higher `z-index` (e.g. `relative z-20`) so it sits above the spotlight layer.

## Dependencies

- npm packages: `motion` (uses `useMotionValue`, `useMotionTemplate`, `motion` from `motion/react`), `react`.
- Via the internal `CanvasRevealEffect` dependency: `three` and `@react-three/fiber` (`Canvas`, `useFrame`, `useThree`).
- Internal components:
  - `@/components/ui/canvas-reveal-effect` (`CanvasRevealEffect`) — rendered on hover.
  - `cn` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- Tailwind config: none required. Uses the built-in `group`/`group-hover` (named group `group/spotlight`) and standard utilities only; no custom keyframes.

## Exports & Props

### `CardSpotlight`

Extends `React.HTMLAttributes<HTMLDivElement>` — any standard `div` prop (e.g. `onClick`, `id`, `style`) is also accepted and spread onto the root element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered inside the card, above the spotlight layer. |
| `radius` | `number` | `350` | Radius (in px) of the radial spotlight mask that follows the cursor. |
| `color` | `string` | `"#262626"` | Background color of the spotlight overlay layer. |
| `className` | `string` | — | Extra classes merged onto the root `div` via `cn`. |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | — | Any remaining div attributes, spread onto the root element. |

## Usage

```tsx
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function Example() {
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Why Najd AI
      </p>
      <p className="text-neutral-200 mt-4 relative z-20">
        Move your cursor over the card to reveal the spotlight.
      </p>
    </CardSpotlight>
  );
}
```

## Notes

- Performance: each hover mounts a `<Canvas>` (Three.js / React Three Fiber) running a shader-based dot animation. On cards-heavy pages this is GPU work; the canvas only mounts while `isHovering` is true, so it is torn down on mouse leave.
- Hover-only: the spotlight and canvas effect are driven by `onMouseMove` / `onMouseEnter` / `onMouseLeave`. On touch devices (no hover) the effect generally will not trigger, so the card degrades to a plain bordered card.
- The root defaults to a dark card (`bg-black`, `border-neutral-800`); design foreground content for a dark surface and raise it with `relative z-20` so it stays above the spotlight/canvas layers.
- RTL: no direction-specific logic; positioning uses cursor coordinates relative to the card, so it works in both LTR and RTL layouts.
- Not scroll-driven — no page scroll required.

## Brand note

Used on the Najd AI Solutions site for services & differentiator cards. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the `CanvasRevealEffect` dot colors are set to brand green `[43, 182, 115]` and brand blue `[38, 153, 214]`.
