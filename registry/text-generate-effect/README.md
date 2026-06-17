# Text Generate Effect
> Reveals a string word-by-word with a staggered fade-in (and optional blur-to-sharp) animation.

## Install
```bash
npx shadcn@latest add @aceternity/text-generate-effect-demo
```

## What it is
`TextGenerateEffect` takes a plain string, splits it on spaces, and animates each word into view with a staggered fade (and an optional blur-to-focus). Use it for hero headlines, intros, or any block of copy you want to "type out" smoothly on mount. The animation runs once when the component renders.

## Dependencies
- npm packages: `motion` (imports `motion`, `stagger`, `useAnimate` from `motion/react`), `react` (`useEffect`).
- Internal components: `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
- Tailwind config: none required. Relies only on stock utility classes (`font-bold`, `text-2xl`, `dark:text-white`, etc.); animation is driven by `motion`, not Tailwind keyframes.

## Exports & Props

### `TextGenerateEffect`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `string` | — | The text to animate; split on spaces and revealed word-by-word. |
| `className` | `string` | — | Extra classes merged onto the outer wrapper via `cn`. |
| `filter` | `boolean` | `true` | When `true`, words animate from `blur(10px)` to sharp; when `false`, no blur. |
| `duration` | `number` | `0.5` | Per-word animation duration in seconds. |

## Usage
```tsx
"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = "Najd AI builds calm, capable agents for real businesses.";

export default function Demo() {
  return <TextGenerateEffect words={words} duration={0.6} />;
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The component hardcodes `text-black` (light) and `dark:text-white` (dark) on both the wrapper and each word span — override these via `className` or edit the spans to apply brand colors.

## Notes
- Animation fires once on mount (the `useEffect` depends on `scope.current`); it is not scroll-driven and does not re-run when `words` changes.
- Words are joined back with a trailing space, so multiple consecutive spaces in `words` collapse and the reveal is per-word, not per-character.
- No canvas/particles/three or remote image domains involved — lightweight.
- RTL: not handled specially; splitting on spaces works for Arabic word-by-word reveal, but verify wrapping/direction by setting `dir="rtl"` on a parent.
