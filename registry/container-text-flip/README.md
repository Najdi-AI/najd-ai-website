# Container Text Flip
> An animated pill that cycles through a list of words, animating its width and blurring each letter in on every change.

## Install
```bash
npx shadcn@latest add @aceternity/container-text-flip-demo
```

## What it is
`ContainerTextFlip` renders a rounded, raised "container" that rotates through an array of words on a timed interval. On each transition the container animates its width to fit the new word (via `motion` layout animations) while the incoming letters fade and un-blur in sequence. Use it for hero taglines or any spot where you want a short, punchy word to swap in and out with a polished motion effect.

## Dependencies
- npm packages: `react`, `motion` (imported as `motion/react`).
- Internal components: `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` class helper).
- Tailwind config: none required. The component uses only built-in utilities plus inline arbitrary values (`[background:...]`, `shadow-[...]`); it does not depend on any custom keyframes or animations defined in `tailwind.config`.

## Exports & Props

### `ContainerTextFlip`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `words` | `string[]` | `["better", "modern", "beautiful", "awesome"]` | Array of words to cycle through in the animation. |
| `interval` | `number` | `3000` | Time in milliseconds between word transitions. |
| `className` | `string` | — | Additional CSS classes applied to the container. |
| `textClassName` | `string` | — | Additional CSS classes applied to the text. |
| `animationDuration` | `number` | `700` | Duration of the transition animation in milliseconds. |

Also exports the `ContainerTextFlipProps` TypeScript interface.

## Usage
```tsx
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function Example() {
  return (
    <ContainerTextFlip
      words={["better", "modern", "Tyler Durden", "awesome"]}
    />
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the hero rotating tagline. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the default copy ships with grey gradient/shadow values (`#f3f4f6`, `#e5e7eb`, `#d1d5db`, and the dark-mode `hsla(205,89%,46%,.24)`), which the site overrides via `className` / `textClassName`.

## Notes
- Client component (`"use client"`) — it uses `useState`/`useEffect`/`useId` and a `setInterval` timer, so it must run on the client.
- Width is measured from the rendered text (`scrollWidth + 30px` padding) and animated with `motion` layout, so the first paint may briefly use the fallback width (`100`) before settling.
- Renders one `motion.span` per letter; very long words mean more animated nodes, but cost is negligible at typical tagline lengths.
- Default styling is large (`text-4xl` / `md:text-7xl`) and supports dark mode out of the box via `dark:` variants.
- RTL: letters are split and animated left-to-right by index; no special RTL handling is built in.
- No canvas, WebGL, scroll listeners, or remote image domains required.
