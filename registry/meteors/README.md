# Meteor Effect
> Animated shooting-star meteors that streak diagonally across a container as an ambient background accent.

## Install
```bash
npx shadcn@latest add @aceternity/meteors-demo
```

## What it is
`Meteors` renders a set of small, glowing streaks that animate diagonally across their parent like falling meteors. It is purely decorative and meant to sit behind card content as an ambient background. Drop it inside any `position: relative`, `overflow-hidden` container and it fills that area with evenly distributed, randomly timed meteors. Use it to add subtle motion and depth to hero cards, feature tiles, or callouts.

## Dependencies
- npm packages:
  - `motion` (imported as `motion/react`) — wraps the meteor field in a `motion.div` for the fade-in.
  - `react`.
  - `cn` helper from `@/lib/utils` (built on `clsx` / `tailwind-merge`) for class merging.
- Internal components: none beyond the `cn` utility at `@/lib/utils`. The demo imports `Meteors` from `@/components/ui/meteors`.
- Tailwind config requirement: relies on a custom `meteor-effect` animation (used via the `animate-meteor-effect` class) plus the matching `meteor-effect` keyframes. These must be defined in your Tailwind config (or global CSS); without them the meteors render but do not move.

## Exports & Props
### `Meteors`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `number` | `number` | `20` | How many meteors to render. Also controls the horizontal spacing used to evenly distribute them across an ~800px range. |
| `className` | `string` | — | Extra classes merged onto each meteor `span` (e.g. to recolor or resize individual meteors). |

## Usage
```tsx
import { Meteors } from "@/components/ui/meteors";

export default function Card() {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8">
      <h1 className="relative z-50 text-xl font-bold text-white">Vision 2030</h1>
      <p className="relative z-50 text-slate-400">Card content goes here.</p>
      <Meteors number={20} />
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the Vision 2030 cards. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors (the meteor body `bg-slate-500` and the `#64748b` gradient trail).

## Notes
- Requires the `meteor-effect` Tailwind keyframes/animation to be present, otherwise the meteors are static.
- The parent must be `position: relative` with `overflow-hidden`; the meteors are absolutely positioned (start at `top: -40px`) and would otherwise overflow the card.
- Each meteor gets a random `animationDelay` (0–5s) and `animationDuration` (5–10s) computed at render via `Math.random()`, so the field is non-deterministic between renders/SSR hydration.
- Purely decorative and direction-fixed (`rotate-[45deg]`), so it is not affected by RTL/LTR layout direction.
- Lightweight CSS-animated `span` elements (no canvas/WebGL), but a high `number` value increases the DOM node and animation count; keep it modest on mobile.
- No remote image domains required.
