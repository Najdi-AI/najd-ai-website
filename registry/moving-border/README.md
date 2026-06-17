# Moving Border
> A button (or any element) with a glowing light that travels continuously around its border.

## Install
```bash
npx shadcn@latest add @aceternity/moving-border-demo
```

## What it is
`Moving Border` renders an element wrapped in an animated border: a soft radial-gradient highlight is driven along the path of an SVG `rect` so it appears to orbit the component's edge. The `Button` export gives you a ready-made framed button, while the underlying `MovingBorder` export can wrap arbitrary children. Use it to draw attention to a primary call-to-action or any element that should feel alive without being distracting.

## Dependencies
- npm packages: `motion` (imports `motion`, `useAnimationFrame`, `useMotionTemplate`, `useMotionValue`, `useTransform` from `motion/react`), `react`.
- Internal components: `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper). The demo imports `Button` from `@/components/ui/moving-border`.
- Tailwind config: none required. The motion is driven entirely by `useAnimationFrame` in JavaScript, not by Tailwind keyframes.

## Exports & Props

### `Button`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `borderRadius` | `string` | `"1.75rem"` | Corner radius applied to the container and (scaled by 0.96) the inner content. |
| `children` | `React.ReactNode` | — | Button content. |
| `as` | `any` | `"button"` | Element/component to render as the outer container. |
| `containerClassName` | `string` | — | Classes for the outer container element. |
| `borderClassName` | `string` | — | Classes for the moving highlight element (override its color/size here). |
| `duration` | `number` | — | Milliseconds for one full loop of the border light (passed to `MovingBorder`). |
| `className` | `string` | — | Classes for the inner content panel. |
| `...otherProps` | `any` | — | Any other props are spread onto the outer container (e.g. `onClick`). |

### `MovingBorder`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | The moving highlight element to animate along the border path. |
| `duration` | `number` | `3000` | Milliseconds for one full loop around the path. |
| `rx` | `string` | — | Horizontal corner radius of the SVG `rect` path (e.g. `"30%"`). |
| `ry` | `string` | — | Vertical corner radius of the SVG `rect` path (e.g. `"30%"`). |
| `...otherProps` | `any` | — | Spread onto the underlying `<svg>` element. |

## Usage
```tsx
"use client";
import { Button } from "@/components/ui/moving-border";

export default function Example() {
  return (
    <Button
      borderRadius="1.75rem"
      className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
    >
      Borders are cool
    </Button>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. In particular the highlight uses `bg-[radial-gradient(#0ea5e9_40%,transparent_60%)]` (override via `borderClassName`) and the panel uses `border-slate-800` / `bg-slate-900/[0.8]`.

## Notes
- The border light is driven every frame by `useAnimationFrame`, which continuously calls `getTotalLength` / `getPointAtLength` on the SVG path. It runs constantly while mounted regardless of viewport visibility, so avoid placing many instances on one page.
- `pathRef` is typed as `useRef<any>()` and the length lookup is null-guarded, so it animates only once the `<rect>` has laid out.
- The animation is geometric (orbits the element edges) and is not scroll-driven; it works identically in LTR and RTL layouts.
- No remote image domains are required.
