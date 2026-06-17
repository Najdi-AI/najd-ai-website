# Typewriter Effect

> Animates text word-by-word like a typewriter, with a blinking cursor.

## Install

```bash
npx shadcn@latest add @aceternity/typewriter-effect-demo-1
```

## What it is

A text-reveal component that takes an array of words and animates them into view character-by-character, trailed by a pulsing cursor. `TypewriterEffect` staggers each character into view when it scrolls into the viewport, while `TypewriterEffectSmooth` wipes the whole line open with a width animation. Use it for hero headlines, taglines, or any place where you want an attention-grabbing animated heading.

## Dependencies

- npm packages: `motion` (imports `motion`, `stagger`, `useAnimate`, `useInView` from `motion/react`).
- Internal components: `cn` from `@/lib/utils` (clsx + tailwind-merge helper).
- Tailwind config: none required. Uses only built-in Tailwind utilities (responsive text sizes, `bg-blue-500`, dark-mode variants); the cursor blink and reveal are handled by motion, not CSS keyframes.

## Exports & Props

Both exports share the same props signature.

### `TypewriterEffect`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `{ text: string; className?: string }[]` | — | Words to animate; each char fades/slides in on scroll into view. Per-word `className` lets you recolor individual words. |
| `className` | `string` | — | Extra classes for the outer wrapper. |
| `cursorClassName` | `string` | — | Extra classes for the blinking cursor span. |

### `TypewriterEffectSmooth`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `{ text: string; className?: string }[]` | — | Words to render; the whole line is revealed via a width wipe. Per-word `className` lets you recolor individual words. |
| `className` | `string` | — | Extra classes for the outer flex wrapper. |
| `cursorClassName` | `string` | — | Extra classes for the blinking cursor span. |

## Usage

```tsx
"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Demo() {
  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    { text: "Aceternity.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return <TypewriterEffectSmooth words={words} />;
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. Note the cursor is hardcoded to `bg-blue-500` and the demo highlights a word with `text-blue-500` — override these via `cursorClassName` and per-word `className` to match the brand.

## Notes

- `TypewriterEffect` is scroll-driven: it uses `useInView` and only animates once the element enters the viewport. `TypewriterEffectSmooth` uses `whileInView` plus a 1s delay, so its reveal also waits for the element to be in view.
- Text colors default to `text-black dark:text-white`, so it adapts to dark mode.
- RTL: text is split per character with `text.split("")` and rendered left-to-right in `inline-block` spans; it is not RTL-aware, so Arabic/RTL strings will not render correctly without adaptation.
- Performance: lightweight (no canvas/particles/three); animation is per-character DOM spans, so very long strings produce many nodes.
