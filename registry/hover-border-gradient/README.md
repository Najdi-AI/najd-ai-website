# Hover Border Gradient
> A pill-shaped button/container whose border runs an animated radial gradient that sweeps around the edge and brightens on hover.

## Install
```bash
npx shadcn@latest add @aceternity/hover-border-gradient-demo
```

## What it is
`HoverBorderGradient` wraps its children in a rounded container with a thin, continuously animating gradient border. While idle, the highlight rotates through the four edges (TOP → LEFT → BOTTOM → RIGHT); on hover it blends to a brighter accent glow. Use it for call-to-action buttons or quick links where you want a subtle, premium animated outline without a heavy effect. It is polymorphic via the `as` prop, so it can render as a `button`, `a`, or any element.

## Dependencies
- npm packages: `motion` (imported from `motion/react`), `react`.
- Internal components: none. It only imports the `cn` helper from `@/lib/utils` (which uses `clsx` + `tailwind-merge`).
- Tailwind config: none required. All animation is driven by Framer Motion / `motion` at runtime; no custom keyframes or theme extensions are needed.

## Exports & Props
### `HoverBorderGradient`
Named export. Accepts `React.PropsWithChildren` plus all standard `React.HTMLAttributes<HTMLElement>` (e.g. `onClick`, `style`, `aria-*`), which are spread onto the rendered element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered inside the inner pill. |
| `as` | `React.ElementType` | `"button"` | The element/component the container renders as (e.g. `"a"`, `Link`). |
| `containerClassName` | `string` | — | Classes merged onto the outer animated-border container. |
| `className` | `string` | — | Classes merged onto the inner content wrapper. |
| `duration` | `number` | `1` | Seconds per edge rotation step and per hover transition. |
| `clockwise` | `boolean` | `true` | Direction the border highlight rotates; `false` reverses it. |
| `...props` | `React.HTMLAttributes<HTMLElement>` | — | Any other HTML attributes, spread onto the container element. |

## Usage
```tsx
"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function ContactQuickLink() {
  return (
    <HoverBorderGradient
      as="a"
      containerClassName="rounded-full"
      className="flex items-center space-x-2 bg-black text-white"
    >
      <span>Contact us</span>
    </HoverBorderGradient>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the contact quick links. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — notably the hover `highlight` radial gradient, which ships with a hardcoded `#3275F8` blue.

## Notes
- The idle rotation runs on a `setInterval` (only while not hovered) and the border uses a Framer Motion animation with a `blur(2px)` filter; the effect is lightweight but always animating, so avoid placing very large numbers of instances on one screen.
- The container is keyboard/hover driven via `onMouseEnter`/`onMouseLeave`; there is no touch-hover state, so on mobile the border simply continues its idle rotation without the brighter hover highlight.
- The inner pill is hardcoded to a dark fill (`bg-black`, `text-white`); override it through `className` to fit light surfaces.
- No remote image domains, canvas, three.js, or scroll dependencies.
