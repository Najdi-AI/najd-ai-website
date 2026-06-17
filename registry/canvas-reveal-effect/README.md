# Canvas Reveal Effect
> A WebGL dot-matrix shader that animates a grid of colored dots revealing in from the center, typically shown on hover.

## Install
```bash
npx shadcn@latest add @aceternity/canvas-reveal-effect-demo
```

## What it is
`CanvasRevealEffect` renders a full-size `<canvas>` driven by a custom Three.js fragment shader that draws an animated matrix of dots. The dots fade in from the center outward over time, in one or more colors, producing a "reveal" effect. Use it as a hover/active background fill inside bordered cards or grid cells (it is meant to sit absolutely positioned behind card content). On the Najd site it powers the industries grid cards.

## Dependencies
- npm packages:
  - `three`
  - `@react-three/fiber` (`Canvas`, `useFrame`, `useThree`)
  - `react`
- Internal components:
  - `@/lib/utils` — the `cn` helper (clsx + tailwind-merge).
- Tailwind config requirement: none. No custom keyframes/animations are required (all animation runs in the GLSL shader). The demo wrapper uses `motion/react` for the hover fade, but the component itself does not import it.

## Exports & Props
### `CanvasRevealEffect`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `animationSpeed` | `number` | `0.4` | Reveal speed factor. ~0.1 is slower, ~1.0+ is faster. |
| `opacities` | `number[]` | `[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]` | Per-dot opacity buckets the shader randomly samples (expects 10 values). |
| `colors` | `number[][]` | `[[0, 255, 255]]` | RGB triples (0–255). Supports 1, 2, or 3 colors, which are distributed across the dot palette. |
| `containerClassName` | `string` | `—` | Extra classes for the outer wrapper (e.g. background color). |
| `dotSize` | `number` | `3` (falls back to `3` when undefined) | Size of each dot in the matrix. |
| `showGradient` | `boolean` | `true` | When true, overlays a bottom-to-top dark gradient on the canvas. |

Note: `DotMatrix`, `Shader`, and `ShaderMaterial` are internal helpers and are **not** exported.

## Usage
```tsx
"use client";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function IndustryCardBackground() {
  return (
    <div className="relative h-[30rem] w-full max-w-sm">
      <CanvasRevealEffect
        animationSpeed={3}
        containerClassName="bg-[#0d2745]"
        colors={[
          [43, 182, 115], // #2bb673 green
          [38, 153, 214], // #2699d6 blue
        ]}
        dotSize={2}
      />
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the industries grid. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors. Colors are passed as 0–255 RGB triples via the `colors` prop, and the wrapper background is set via `containerClassName`.

## Notes
- Performance: each instance mounts a live WebGL `<Canvas>` running an animated shader (frame-throttled to `maxFps` 60). Rendering many simultaneously (e.g. a large grid where every cell reveals on hover) can be GPU-heavy on low-end and mobile devices; prefer mounting the effect only while hovered/active (as the demo does with `AnimatePresence`).
- The outer wrapper defaults to `bg-white`; override it with `containerClassName` to match the card background, otherwise unfilled areas show white.
- The component is purely time-driven (animates on mount), not scroll-driven; no page scroll is required.
- No remote image domains are required.
- RTL: not direction-aware; the dot matrix is symmetric and `center` defaults to both axes, so layout direction has no visual impact.
