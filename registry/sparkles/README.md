# Sparkles
> A configurable particle field that renders animated, twinkling sparkles behind content.

## Install
```bash
npx shadcn@latest add @aceternity/sparkles-demo
```

## What it is
`SparklesCore` renders a canvas full of small animated particles (sparkles) using the tsParticles engine. It is meant to sit behind headings, hero sections, or dividers as a decorative background layer, fading in once the particle engine has loaded. Use it when you want a subtle starfield / shimmer effect without building a particle system yourself.

## Dependencies
- npm packages:
  - `react` (`useId`, `useMemo`, `useEffect`, `useState`)
  - `@tsparticles/react` (`Particles`, `initParticlesEngine`)
  - `@tsparticles/engine` (types `Container`, `SingleOrMultiple`)
  - `@tsparticles/slim` (`loadSlim`)
  - `motion` (`motion`, `useAnimation` from `motion/react`)
- Internal components:
  - `cn` from `@/lib/utils` (clsx + tailwind-merge helper)
- Tailwind config requirements: none (no custom keyframes/animations; the animation is driven by tsParticles, not Tailwind).

## Exports & Props
### `SparklesCore`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | auto (`useId`) | Id passed to the particles canvas; falls back to a generated id. |
| `className` | `string` | — | Classes applied to the wrapping `motion.div`. |
| `background` | `string` | `"#0d47a1"` | Background color of the particle canvas (pass `"transparent"` to overlay content). |
| `particleSize` | `number` | — | Declared in props type but not used internally. |
| `minSize` | `number` | `1` | Minimum particle size. |
| `maxSize` | `number` | `3` | Maximum particle size. |
| `speed` | `number` | `4` | Opacity animation speed (twinkle rate). |
| `particleColor` | `string` | `"#ffffff"` | Color of the particles. |
| `particleDensity` | `number` | `120` | Number/density of particles. |

## Usage
```tsx
"use client";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Hero() {
  return (
    <div className="h-[40rem] w-full bg-black flex items-center justify-center relative overflow-hidden">
      <h1 className="text-white text-5xl font-bold z-20 relative">Najd AI</h1>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. Note the default `background` is `#0d47a1` and the default `particleColor` is `#ffffff` — override both via props (e.g. `background="#0d2745"`, `particleColor="#2bb673"`).

## Notes
- Client component (`"use client"`) — relies on the browser canvas and `useEffect`-loaded engine; renders nothing until the engine initializes, then fades in.
- Performance: it draws a live particle canvas. High `particleDensity` values (the demo uses `1200`) increase CPU/GPU cost; keep density modest on mobile or large viewports.
- Sizing: the canvas fills its parent (`h-full w-full`), so the wrapper must have an explicit height; set the parent `position: relative` and the component `absolute inset-0` to use it as a background.
- `onClick` interactivity is enabled (clicking pushes 4 new particles); `onHover` repulse is disabled.
- `particleSize` is part of the props type but is not consumed by the component — use `minSize`/`maxSize` instead.
- RTL: no text content, so RTL/LTR direction has no effect.
