# Background Lines
> An animated SVG backdrop of multicoloured curved lines that draw and fade in a continuous loop behind any content.

## Install
```bash
npx shadcn@latest add @aceternity/background-lines-demo
```

## What it is
`BackgroundLines` is a full-width container that renders an animated SVG of hand-drawn curved paths looping behind its children. Each path strokes itself in and fades out on a randomized, infinitely repeating cycle. Use it as a decorative hero/section background when you want subtle motion without a heavy canvas or WebGL layer. Drop your heading and copy inside it as children — they render above the lines.

## Dependencies
- npm packages:
  - `motion` (imported as `motion/react`) — drives the SVG and path animations.
  - `react`.
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
- Internal components: none (it defines a private `SVG` sub-component inline; no `components/ui/*` imports).
- Tailwind config requirement: none. Animation is handled entirely by `motion` variants (`strokeDashoffset`/`strokeDasharray`), so no custom keyframes are needed. Standard utility classes (`h-screen`, `bg-white dark:bg-black`, etc.) are used.

## Exports & Props
### `BackgroundLines`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered above the animated lines. |
| `className` | `string` | — | Extra classes merged onto the wrapper (default wrapper is `h-[20rem] md:h-screen w-full bg-white dark:bg-black`). |
| `svgOptions` | `{ duration?: number }` | — | Optional animation config. `duration` (seconds) sets each path's stroke cycle length; defaults to `10` when unset. |

## Usage
```tsx
import { BackgroundLines } from "@/components/ui/background-lines";

export default function Hero() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="text-center text-2xl md:text-4xl lg:text-7xl font-bold tracking-tight relative z-20">
        Najd AI Solutions
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Intelligent automation, beautifully delivered.
      </p>
    </BackgroundLines>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The line colours live in the `colors` array inside the inline `SVG` component (currently 21 mixed hues like `#46A5CA`, `#8C2F2F`, `#247AFB`), and the wrapper hardcodes `bg-white dark:bg-black`.

## Notes
- Animation timing uses `Math.random()` for per-path `delay` and `repeatDelay`, so server and client renders differ — keep it inside a `"use client"` boundary (the component already declares `"use client"`) and expect minor hydration-time variance.
- Children must be given a stacking context (e.g. `relative z-20`) to sit above the absolutely-positioned SVG; the demo does this on its `<h2>`.
- Not scroll-driven and uses no `<canvas>`/WebGL — it is a lightweight SVG with `motion.path` animations, so cost is low, though ~42 simultaneously animating paths (21 × 2 duplicates) is more than trivial on low-end mobile.
- Default height is `h-[20rem]` on mobile and `md:h-screen` on larger screens; override via `className` if a fixed section height is needed.
- RTL-agnostic: the SVG is purely decorative and direction-independent.
