# Placeholders And Vanish Input

> A rounded text input whose placeholder cycles through a list, and whose typed text "vanishes" into animated particles on submit.

## Install

```bash
npx shadcn@latest add @aceternity/placeholders-and-vanish-input-demo
```

## What it is

A single-line text input with an animated UX: the placeholder rotates through an array of strings every 3 seconds (pausing when the tab is hidden), and on submit (Enter or the arrow button) the entered text is rasterised onto a hidden `<canvas>` and dispersed into pixel particles before clearing. Use it for search bars, chat/prompt boxes, or any contact form input where you want a playful, attention-grabbing entry field.

## Dependencies

- npm packages:
  - `motion` (imports `AnimatePresence`, `motion` from `motion/react`)
  - `react` (`useCallback`, `useEffect`, `useRef`, `useState`)
  - `clsx` + `tailwind-merge` — used indirectly via the `cn` helper
- Internal components:
  - `@/lib/utils` — the `cn` class-merging helper
- Tailwind config requirement: none. The component uses only stock Tailwind utilities (no custom keyframes/animations); all motion is driven by `motion/react` and a `<canvas>`.

## Exports & Props

### `PlaceholdersAndVanishInput`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholders` | `string[]` | — | List of placeholder strings; cycles one every 3 seconds. |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | — | Fired on each keystroke (skipped while the vanish animation is running). |
| `onSubmit` | `(e: React.FormEvent<HTMLFormElement>) => void` | — | Fired when the form is submitted (Enter key or the arrow button). |

## Usage

```tsx
"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function ContactInput() {
  const placeholders = [
    "How can we help your business?",
    "Tell us about your project",
    "Ask about our AI solutions",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the contact form. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors (e.g. the original black submit button and `#FFF` canvas fill).

## Notes

- The component is uncontrolled internally: it owns its `value` state, so `onChange` reports keystrokes but the parent cannot set the field value. After submit the input clears itself.
- Performance: the vanish effect draws to an 800x800 `<canvas>`, reads `getImageData`, and animates particles via `requestAnimationFrame`. Cost scales with the amount of typed text; on low-end mobile devices long strings can briefly drop frames.
- The placeholder rotation interval is paused while the browser tab is not visible (via `visibilitychange`) and resumes on return.
- RTL: text is rendered into the canvas with `ctx.fillText(value, 16, 40)` at a fixed left origin and the input uses `text-left` / left padding, so the layout and vanish particles are tuned for LTR. Arabic/RTL content will still function but is not specially positioned.
- The button is `disabled` until the input has a value.
