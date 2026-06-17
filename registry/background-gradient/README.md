# Background Gradient
> An animated, glowing multi-radial gradient border that wraps any content in a soft, shifting halo.

## Install
```bash
npx shadcn@latest add @aceternity/background-gradient-demo
```

## What it is
`BackgroundGradient` renders a rounded container whose border is built from layered radial gradients that animate their background position to create a slow, shifting glow. A blurred copy sits behind a crisp copy, and the blurred layer brightens on hover for a soft halo effect. Use it to give a card, image, or call-to-action a premium, eye-catching frame. On the Najd site it powers the flagship tier border.

## Dependencies
- npm packages:
  - `motion` (imported as `motion/react`) — drives the animated `backgroundPosition`.
  - `react`.
  - `cn` from `@/lib/utils` (clsx + tailwind-merge) for class merging.
- Internal components: none (the demo additionally imports `@/components/ui/background-gradient` and `@tabler/icons-react`, but the component itself has no internal `components/ui/` dependency).
- Tailwind config: none. The animation runs entirely through motion; no custom keyframes/animations are required. Arbitrary-value utilities (`bg-[radial-gradient(...)]`, `z-[1]`) are used inline.

## Exports & Props

### `BackgroundGradient`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered on top of the gradient border. |
| `className` | `string` | — | Classes applied to the inner content wrapper (e.g. background color, padding, rounding). |
| `containerClassName` | `string` | — | Classes applied to the outermost relative container. |
| `animate` | `boolean` | `true` | When `true`, animates the gradient position in a 5s infinite reverse loop; when `false`, renders a static gradient. |

## Usage
```tsx
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Example() {
  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <p className="text-base sm:text-xl text-black dark:text-neutral-200">
        Flagship tier
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Wrap any content to give it a glowing animated border.
      </p>
    </BackgroundGradient>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the flagship tier border. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors. The radial gradient stops use `#2bb673`, `#2699d6`, `#34c97f` (a lighter green), and `#215877` fading into a deep navy `#081325`.

## Notes
- Performance: the animated layers use `will-change-transform` and a `blur-xl` on the back layer, which can be GPU-intensive on low-end devices when many instances are on screen. Set `animate={false}` for a static border if needed.
- Hover: the blurred glow layer goes from `opacity-60` to `opacity-100` on `group-hover`, so the halo intensifies on pointer hover (no effect on touch-only devices).
- The container always applies `4px` of padding (`p-[4px]`) to form the border thickness; the visible corner radius of the inner content is controlled by `className` (e.g. `rounded-[22px]`), while the gradient layers are fixed at `rounded-3xl`.
- RTL: layout-direction agnostic; no directional assumptions.
