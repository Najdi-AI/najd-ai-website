# Background Beams

> An absolutely-positioned animated SVG background of flowing, gradient-lit beam paths.

## Install

```bash
npx shadcn@latest add @aceternity/background-beams-demo
```

## What it is

`BackgroundBeams` renders a full-bleed SVG layer of ~50 curved paths, each animated with a moving linear gradient so the beams appear to flow continuously. It is meant to sit behind hero content as an ambient, decorative background. Drop it as the last child inside a `relative` container and place your content above it with a higher `z-index`. The component is memoized and self-animating, so it requires no props to run.

## Dependencies

- npm packages:
  - `react`
  - `motion` — imported as `motion/react` (Framer Motion's `motion` package) for the animated `motion.path` and `motion.linearGradient` elements.
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
- Tailwind config requirements: none. Animation is driven entirely by `motion` (no custom keyframes/animations are required). The component uses Tailwind arbitrary-value mask utilities (`[mask-repeat:no-repeat]`, `[mask-size:40px]`) which need no config.

## Exports & Props

### `BackgroundBeams`

A memoized component (`React.memo`, with `displayName = "BackgroundBeams"`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Optional extra classes merged via `cn` onto the root absolutely-positioned container. |

## Usage

```tsx
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Hero() {
  return (
    <div className="relative flex h-[40rem] w-full flex-col items-center justify-center bg-neutral-950 antialiased">
      <div className="relative z-10 mx-auto max-w-2xl p-4">
        <h1 className="text-center text-4xl font-bold text-neutral-200">
          Join the waitlist
        </h1>
      </div>
      <BackgroundBeams />
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the hero background. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors. The animated beam gradient stops use brand green `#2bb673`, brand blue `#2699d6`, and a lighter green `#34c97f`.

## Notes

- The root is `absolute inset-0`, so the component must live inside a `position: relative` parent or it will pin to the nearest positioned ancestor / viewport.
- The SVG is `pointer-events-none`, so it never intercepts clicks; foreground content needs an explicit `z-index` (e.g. `z-10`) to sit above the `z-0` beams.
- Performance: ~50 `motion.path` elements each animate an infinite-loop gradient with randomized duration/delay. It is GPU/CPU light relative to canvas or three.js but is continuous and never stops, so avoid stacking many instances on one page.
- Randomized `Math.random()` values (gradient duration, delay, and `y2` endpoint) are computed at render time, so server- and client-rendered values can differ; this is purely cosmetic for the animation and not hydration-critical for layout.
- RTL: purely decorative and direction-agnostic — no RTL-specific behaviour.
- No remote image domains required. No scroll interaction (not scroll-driven). Behaves identically on mobile.
