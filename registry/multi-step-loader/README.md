# Multi Step Loader
> A full-screen overlay that animates through an ordered list of loading steps, checking each one off in sequence.

## Install
```bash
npx shadcn@latest add @aceternity/multi-step-loader-demo
```

## What it is
`MultiStepLoader` renders a fixed, full-viewport blurred overlay that walks through a list of textual loading states one at a time. Each step shows a check icon, with the active step highlighted and completed steps filled in, advancing automatically on a timer. Use it as a loading/progress modal for multi-stage operations (onboarding flows, long-running jobs, simulated processing) where you want to communicate sequential progress rather than a single spinner. It can loop continuously or stop on the last step.

## Dependencies
- npm packages:
  - `motion` (imports `AnimatePresence`, `motion` from `motion/react`)
  - `@tabler/icons-react` (used by the demo only, for `IconSquareRoundedX`)
- Internal components:
  - `@/lib/utils` — the `cn` class-merging helper (`clsx` / `tailwind-merge`)
- Tailwind config requirement: none. Uses only built-in Tailwind utilities (including `backdrop-blur-2xl`, arbitrary `[mask-image:...]` and `dark:` variants). Animation is driven entirely by `motion`, not Tailwind keyframes. The check icons are inline SVGs, so no icon package is required for the core component.

## Exports & Props
### `MultiStepLoader`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loadingStates` | `LoadingState[]` where `LoadingState = { text: string }` | — | Ordered list of steps to display; each item's `text` is the label shown. |
| `loading` | `boolean` | — | Controls visibility. When `false`, the overlay is hidden and progress resets to the first step. |
| `duration` | `number` | `2000` | Milliseconds each step is shown before advancing to the next. |
| `loop` | `boolean` | `true` | When `true`, restarts from the first step after the last; when `false`, stops on the final step. |

> Note: `LoaderCore` and the `CheckIcon` / `CheckFilled` SVGs are internal and not exported. Only `MultiStepLoader` is exported.

## Usage
```tsx
"use client";
import { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
];

export default function Demo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
      <button onClick={() => setLoading(true)}>Click to load</button>
    </div>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The active-step highlight is hardcoded to `dark:text-lime-500` (and the demo's trigger button uses `#39C3EF`); swap these for the brand green/blue.

## Notes
- The overlay is `fixed inset-0` with `z-[100]` and covers the entire viewport, blocking interaction beneath it — there is no built-in close affordance, so dismissal is up to the parent (the demo adds its own close button at `z-[120]`).
- When `loop` is `true` (the default), the loader never stops on its own; you must set `loading` to `false` to hide it.
- The component is a `"use client"` client component (uses `useState` / `useEffect`).
- Light/dark themed via Tailwind `dark:` variants; the active step is colored with `lime-500` in dark mode only.
- RTL: layout uses `text-left`, `justify-start`, and `gap-2` (logical-safe), but the left-aligned text is not explicitly direction-aware; verify alignment under `dir="rtl"`.
- Performance: animation is lightweight (opacity/translate via `motion`); no canvas, particles, or remote images required.
