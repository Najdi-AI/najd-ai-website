# Background Gradient Animation
> A full-screen animated, multi-color gooey gradient backdrop with an optional cursor-tracking glow.

## Install
```bash
npx shadcn@latest add @aceternity/background-gradient-animation-demo
```

## What it is
`BackgroundGradientAnimation` renders a full-viewport (`h-screen w-screen`) container with several blurred radial-gradient blobs that drift and circle continuously, combined through an SVG "goo" filter and CSS blend modes for a liquid lava-lamp effect. An optional interactive blob follows the mouse pointer. Use it as a vivid hero or CTA backdrop, dropping foreground content in via `children`.

## Dependencies
- npm packages: none beyond React — only `cn` from `@/lib/utils` (which wraps `clsx` + `tailwind-merge`).
- Internal components: none. It imports only `cn` from `@/lib/utils`.
- Tailwind config requirement: relies on custom animations `animate-first`, `animate-second`, `animate-third`, `animate-fourth`, `animate-fifth` and their keyframes `moveVertical`, `moveHorizontal`, `moveInCircle`, which must be defined in `tailwind.config.ts` (already present in this repo). It also reads CSS variables it sets on `document.body` at runtime (`--gradient-background-start`, `--first-color`, `--size`, `--blending-value`, etc.).

## Exports & Props

### `BackgroundGradientAnimation`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gradientBackgroundStart` | `string` | `"rgb(108, 0, 162)"` | Start color of the base linear-gradient background. |
| `gradientBackgroundEnd` | `string` | `"rgb(0, 17, 82)"` | End color of the base linear-gradient background. |
| `firstColor` | `string` | `"18, 113, 255"` | RGB triplet (no `rgb()`) for the 1st animated blob. |
| `secondColor` | `string` | `"221, 74, 255"` | RGB triplet for the 2nd animated blob. |
| `thirdColor` | `string` | `"100, 220, 255"` | RGB triplet for the 3rd animated blob. |
| `fourthColor` | `string` | `"200, 50, 50"` | RGB triplet for the 4th animated blob. |
| `fifthColor` | `string` | `"180, 180, 50"` | RGB triplet for the 5th animated blob. |
| `pointerColor` | `string` | `"140, 100, 255"` | RGB triplet for the cursor-following blob. |
| `size` | `string` | `"80%"` | Width/height of each gradient blob. |
| `blendingValue` | `string` | `"hard-light"` | CSS `mix-blend-mode` applied to the blobs. |
| `children` | `React.ReactNode` | — | Foreground content rendered above the gradients. |
| `className` | `string` | — | Class applied to the inner children wrapper. |
| `interactive` | `boolean` | `true` | Enables the mouse-tracking pointer blob. |
| `containerClassName` | `string` | — | Class applied to the outer full-screen container. |

## Usage
```tsx
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Demo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold text-3xl md:text-4xl lg:text-7xl pointer-events-none">
        <p className="bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/20 drop-shadow-2xl">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the final CTA backdrop. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors.

## Notes
- It writes CSS variables to `document.body` (a global side effect), so mounting more than one instance can cause the last-mounted instance's colors to win. The variable-setting `useEffect` runs once (empty deps), so changing the color props after mount will not update the gradient.
- Fixed to the viewport: the container is `h-screen w-screen` with `overflow-hidden`. It is not responsive to its parent box; place it as a section background.
- Performance: continuously animates five blurred radial gradients through an SVG blur/goo filter. Safari falls back to `blur-2xl` (the `url(#blurMe)` filter is detected as unsupported), which looks softer. The heavy blur + blend can be GPU-intensive on low-end/mobile devices.
- The pointer-tracking blob is gated by `interactive` and is purely mouse-driven, so it has no effect on touch devices.
- RTL: no directional/text content of its own, so it is layout-direction agnostic; any `children` you pass handle their own RTL.
