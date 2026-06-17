# Lamp Section Header
> A dramatic "lamp" beam-of-light hero header that animates open as it scrolls into view, illuminating the heading beneath it.

## Install
```bash
npx shadcn@latest add @aceternity/lamp-demo
```

## What it is
`LampContainer` renders a full-height dark section with a stylized lamp effect: two conic-gradient beams, a glowing core, and a thin light line that all expand outward when the section enters the viewport. You drop any content (typically a heading) inside as `children` and it appears centred under the light. Use it as a high-impact section header or hero banner where you want a single statement to feel spotlit.

## Dependencies
- npm packages:
  - `motion` — imported as `import { motion } from "motion/react"` for the scroll-triggered (`whileInView`) animations.
  - `react`.
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` class helper).
  - The demo (`lamp-demo.tsx`) imports `LampContainer` from `@/components/ui/lamp`.
- Tailwind config requirements:
  - A `bg-gradient-conic` background-image utility (conic gradient using `--tw-gradient-stops`).
  - Najd brand color tokens used as Tailwind classes: `najd-ink`, `najd-green`, and `najd-green-light` (e.g. `bg-najd-ink`, `from-najd-green`, `bg-najd-green-light`). These must be defined in your Tailwind theme.

## Exports & Props
### `LampContainer` (named export)
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered centred beneath the lamp light (typically the section heading). |
| `className` | `string` | — | Optional extra classes merged onto the root container via `cn`. |

### `LampDemo` (default export)
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | Takes no props; a ready-made example that renders an animated `<h1>` inside `LampContainer`. |

## Usage
```tsx
"use client";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export default function Vision2030Header() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Vision 2030
      </motion.h1>
    </LampContainer>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the Vision 2030 header. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the original Aceternity slate/cyan beams are replaced with `najd-ink`, `najd-green`, and `najd-green-light` tokens.

## Notes
- Scroll-driven: animations fire via `whileInView`, so the lamp only "opens" once the section scrolls into the viewport. On a non-scrolling page it animates once on mount.
- The root uses `min-h-screen` and `overflow-hidden` and pulls its content up with negative translates — it is designed to occupy a full viewport-height section; verify spacing if you embed it in a shorter container.
- Layout is built from many absolutely-positioned blur layers (`blur-2xl`, `blur-3xl`, `backdrop-blur-md`); on low-end mobile devices these blurs can be GPU-heavy.
- Requires the `bg-gradient-conic` utility and the `najd-*` color tokens to exist in Tailwind config — without them the beams render with no color/gradient.
- No remote image domains required; effect is pure CSS + motion (no canvas, three.js, or particle system).
- The composition is horizontally symmetric, so it presents the same in LTR and RTL; only the `children` you pass need RTL-aware styling.
