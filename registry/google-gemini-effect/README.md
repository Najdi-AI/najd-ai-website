# Google Gemini Effect

> A scroll-driven SVG band of five glowing, blurred curved paths that draw themselves in as the page scrolls — the Gemini-style "flowing lines" divider.

## Install

```bash
npx shadcn@latest add @aceternity/google-gemini-effect-demo
```

## What it is

`GoogleGeminiEffect` renders a fixed-size SVG containing five smooth curved `motion.path` strokes (each with a blurred duplicate behind it for a glow effect) plus an optional title and description. You pass in five `MotionValue` path lengths (typically derived from scroll progress) and the lines animate their `pathLength` from drawn-out to complete. Use it as a full-bleed divider or section background when you want an animated, intelligence/AI-themed flowing-lines visual. It is purely presentational — the scroll wiring lives in the consumer (see the demo).

## Dependencies

- npm packages:
  - `motion` — imports `motion` and the `MotionValue` type from `motion/react`. The demo also uses `useScroll` and `useTransform` from `motion/react`.
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
  - The demo imports `GoogleGeminiEffect` from `@/components/ui/google-gemini-effect`.
- Tailwind config requirements: None. The component uses only stock Tailwind utilities (gradient text, spacing, positioning); no custom keyframes or animations are required (motion drives the animation).

## Exports & Props

### `GoogleGeminiEffect`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pathLengths` | `MotionValue[]` | — | Array of five motion values mapped to the `pathLength` of each of the five animated strokes (indices 0–4). |
| `title` | `string` | `"Intelligent Infrastructure"` | Heading text shown above the lines. |
| `description` | `string` | `"Where data becomes intelligence — from model to product."` | Sub-heading text shown below the title. |
| `className` | `string` | — | Extra classes merged onto the outer `sticky top-80` wrapper via `cn`. |

## Usage

```tsx
"use client";
import React from "react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export default function Divider() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const p1 = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const p2 = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const p3 = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const p4 = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const p5 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div ref={ref} className="h-[400vh] bg-black w-full relative pt-40 overflow-clip">
      <GoogleGeminiEffect pathLengths={[p1, p2, p3, p4, p5]} />
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the intelligence divider band. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the original Aceternity strokes (`#4285f4`, `#fbbc05`, etc.) are replaced by Najd green/blue tones (e.g. `#2bb673`, `#2699d6`, `#34c97f`, `#4db4e6`, `#1e9c5f`) on the `stroke` attributes of each path.

## Notes

- Scroll-driven: the effect only animates when the consumer feeds it scroll-linked `MotionValue`s. The demo wraps it in a very tall container (`h-[400vh]`) and uses `useScroll`/`useTransform`; without that wiring the lines stay static.
- The component itself is `position: sticky` (`sticky top-80`) and the SVG is absolutely positioned (`-top-60 md:-top-40`), so it expects a tall, relatively-positioned parent with `overflow-clip` to behave correctly.
- Fixed SVG geometry: the paths use a hardcoded `1440x890` viewBox; `width="1440" height="890"` with `w-full` lets it scale horizontally. Designed for wide/desktop layouts; on small screens it scales down but the curve shape is fixed.
- Each visible stroke is paired with a blurred duplicate (`filter="url(#blurMe)"`, `feGaussianBlur stdDeviation="5"`) for the glow — ten paths total. This is lightweight (no canvas/WebGL), but the SVG blur filter does add some compositing cost.
- `pathLengths` must contain at least five entries; indices 0–4 are read directly.
- No remote image domains, no `three`/canvas dependencies, no RTL-specific handling.
