# Sticky Scroll Reveal
> A scroll-driven section where text steps through a list while a sticky panel swaps its content and the background animates per active card.

## Install
```bash
npx shadcn@latest add @aceternity/sticky-scroll-reveal-demo
```

## What it is
`StickyScroll` renders a tall, vertically-scrollable container. As you scroll, it tracks which card is closest to the top of the viewport and highlights its title/description while fading the rest. A sticky panel on the right side swaps to show that active card's `content` and the container's background color plus the panel's gradient animate to match. Use it for feature walkthroughs, tech-stack breakdowns, or any "scroll to step through points" narrative.

## Dependencies
- npm packages:
  - `motion` — imports `motion`, `useScroll`, and `useMotionValueEvent` from `motion/react`.
  - `react` — `useEffect`, `useRef`, `useState`.
- Internal components:
  - `@/lib/utils` — the `cn` class-merge helper (wraps `clsx` / `tailwind-merge`).
- Tailwind config: none. No custom keyframes/animations are required; all motion is driven by the `motion` library at runtime.

## Exports & Props

### `StickyScroll`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `{ title: string; description: string; content?: React.ReactNode \| any }[]` | — | Array of cards. Each card has a `title`, a `description`, and an optional `content` node rendered inside the sticky panel when that card is active. |
| `contentClassName` | `string` | — | Optional extra classes applied to the sticky right-hand content panel. |

## Usage
```tsx
"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description: "See changes as they happen across every device.",
  },
];

export default function Demo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the tech-stack section. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — namely the `backgroundColors` array (slate-900 / black / neutral-900) and the `linearGradients` array (cyan→emerald, pink→indigo, orange→yellow) inside `StickyScroll`.

## Notes
- Scroll-driven: the effect is powered by an internal overflow-y container (`useScroll` with `container: ref`), so the section scrolls within its own fixed `h-[30rem]` box rather than the whole page. Source comments note you can switch to whole-page scroll by using `target: ref` instead of `container: ref`.
- The sticky content panel is `hidden lg:block` — it is not shown on mobile/small screens; only the title/description column renders there.
- `content[activeCard].content` is read directly, so every render needs a valid active card; an empty `content` array would throw.
- Background color and gradient transitions are animated on every active-card change via `motion`; the gradients cycle modulo their array length, so more cards than colors will repeat the palette.
- No remote image domains are required by the component itself (the demo's `/linear.webp` is a local public asset).
