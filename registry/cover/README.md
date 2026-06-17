# Cover

> A hover-activated text wrapper that surrounds a word with animated sparkles, sweeping beams, and a jittering scale effect.

## Install

```bash
npx shadcn@latest add @aceternity/cover-demo
```

## What it is

`Cover` wraps an inline word or phrase and, on hover, reveals a field of sparkle particles, animated horizontal "beams" sweeping across it, and a brief shake/scale jitter on the text itself. Corner circle dots frame the box and pulse when idle. Use it to make a single keyword in a hero headline feel kinetic and high-tech without affecting the surrounding layout (it renders inline-block).

## Dependencies

- npm packages:
  - `motion` (imported from `motion/react` — `AnimatePresence`, `motion`)
  - `react`
- Internal components:
  - `@/components/ui/sparkles` (uses the `SparklesCore` export) — this in turn pulls in the particles engine (`@tsparticles/*`), so installing Cover also requires the Sparkles component and its dependencies.
- Utilities:
  - `cn` from `@/lib/utils` (the `clsx` / `tailwind-merge` helper)
- Tailwind config: no custom keyframes required. Animation is driven entirely by `motion`; it only uses the built-in `animate-pulse` utility for the corner dots.

## Exports & Props

### `Cover`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | The text/content to wrap and animate. |
| `className` | `string` | — | Extra classes applied to the inner animated `<span>`. |

### `Beam`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Extra classes for the SVG. |
| `delay` | `number` | — | Repeat delay (used when not hovered). |
| `duration` | `number` | `2` | Sweep duration when not hovered. |
| `hovered` | `boolean` | — | Whether the parent Cover is hovered (speeds up / randomizes the sweep). |
| `width` | `number` | `600` | Beam width in px (set to the container width by `Cover`). |
| `...svgProps` | `React.ComponentProps<typeof motion.svg>` | — | Forwarded to the underlying `motion.svg`. |

### `CircleIcon`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Extra classes for the dot. |
| `delay` | `number` | — | Animation delay for the pulse. |

## Usage

```tsx
import { Cover } from "@/components/ui/cover";

export default function CoverDemo() {
  return (
    <h1 className="text-4xl lg:text-6xl font-semibold text-center">
      Build amazing websites <br /> at <Cover>warp speed</Cover>
    </h1>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the hero headline word. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — namely the beam gradient stops (`#2EB9DF`, `#3b82f6`) and the white sparkle `particleColor`.

## Notes

- Performance: hover renders two `SparklesCore` canvases at `particleDensity={500}` plus one animated SVG beam per ~10px of height, all running on an infinite loop. On large words or low-end/mobile devices this is GPU-heavy; the effect only mounts while hovered, so idle cost is low.
- Hover-driven: all motion (sparkles, beams, text jitter) is gated on mouse hover. There is no touch/tap equivalent, so on mobile the word renders mostly static (corner dots pulse only).
- The beam count and width are measured from the rendered box via a ref on mount; very dynamic resizing is not re-measured.
- RTL: renders `inline-block` and is layout-agnostic, so it flows correctly in RTL text.
