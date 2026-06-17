# Text Hover Effect

> An SVG word that strokes itself in on mount, then reveals a moving gradient fill under your cursor as you hover.

## Install

```bash
npx shadcn@latest add @aceternity/text-hover-effect-demo
```

## What it is

`TextHoverEffect` renders a single line of text as an SVG with an outlined (stroked) typeface. On mount the outline animates in via a `strokeDashoffset` draw effect. When you hover, a radial reveal mask follows your cursor and exposes a multi-stop gradient stroke beneath the text. Use it for large, eye-catching brand wordmarks or hero headings where you want an interactive, animated text treatment.

## Dependencies

- npm packages: `motion` (imported as `motion/react`), `react`.
- Internal components: none — `TextHoverEffect` has no `@/components/ui/...` imports. The demo (`text-hover-effect-demo.tsx`) imports `TextHoverEffect` from `@/components/ui/text-hover-effect`.
- Tailwind config: none required. It uses standard utility classes (`fill-transparent`, `stroke-neutral-200`, `text-7xl`, `font-bold`, `select-none`, `dark:stroke-neutral-800`) plus an arbitrary `font-[helvetica]`; the animation is driven by `motion`, not Tailwind keyframes.

## Exports & Props

### `TextHoverEffect`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | The text rendered inside the SVG. |
| `duration` | `number` | `0` | Transition duration (seconds) for the cursor-following reveal mask. Falls back to `0` when omitted. |
| `automatic` | `boolean` | — | Declared in the prop type but not used by the current implementation. |

## Usage

```tsx
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Demo() {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffect text="NAJD AI" />
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the NAJD AI brand band. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors. The hover gradient stops are set to `#34c97f`, `#2bb673`, `#2699d6`, and `#215877`.

## Notes

- Hover/cursor-driven: the gradient reveal only appears on `mouseenter` and tracks `mouseMove`. On touch devices with no hover there is no reveal interaction, so the text shows only its animated outline.
- The SVG uses a fixed `viewBox="0 0 300 100"` and scales to its container (`width/height 100%`); size it via the wrapper element. Long text may overflow or shrink within the fixed viewBox.
- Relies on the `helvetica` font being available (`font-[helvetica]`); it falls back to the browser default otherwise.
- Lightweight: pure SVG plus `motion` — no canvas, WebGL, particles, or remote image domains required.
- RTL: text is centered (`textAnchor="middle"`), so it renders fine in RTL layouts, but the wordmark glyph order itself is whatever string you pass in.
