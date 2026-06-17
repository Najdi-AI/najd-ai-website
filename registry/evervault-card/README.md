# Evervault Card

> A hover-reactive card that reveals an encrypted-looking matrix of random characters under a gradient mask that follows the cursor.

## Install

```bash
npx shadcn@latest add @aceternity/evervault-card-demo
```

## What it is

`EvervaultCard` renders a square card with a centered label. On hover, a radial gradient mask tracks the mouse position and reveals a constantly-regenerating wall of random characters behind it, evoking an "encryption in progress" effect. Use it as an eye-catching decorative card for feature highlights, security/privacy messaging, or any spot where you want a playful hover reveal.

## Dependencies

- npm packages:
  - `motion` (imported from `motion/react`: `useMotionValue`, `useMotionTemplate`, `motion`)
  - `react`
  - `cn` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`)
- Internal components:
  - The demo imports `EvervaultCard` and `Icon` from `@/components/ui/evervault-card`. The component itself has no other internal `components/ui/...` dependencies.
- Tailwind config requirements: none. Relies only on stock Tailwind utilities (gradients, `mask-image`, `mix-blend-overlay`, `backdrop-blur`); no custom keyframes/animations.

## Exports & Props

### `EvervaultCard`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | Label shown in the center of the card. |
| `className` | `string` | — | Extra classes merged onto the outer wrapper via `cn`. |

### `CardPattern`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mouseX` | `any` (motion value) | — | X motion value driving the radial mask position. |
| `mouseY` | `any` (motion value) | — | Y motion value driving the radial mask position. |
| `randomString` | `any` (string) | — | The random character string rendered behind the mask. |

### `Icon`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Classes applied to the SVG. |
| `...rest` | `any` | — | Any other SVG attributes spread onto the `<svg>` element. |

### `generateRandomString`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | — | Number of random alphanumeric characters to generate; returns a `string`. |

## Usage

```tsx
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

export default function Demo() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="hover" />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        Hover over this card to reveal an awesome effect.
      </h2>
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The reveal gradient is hardcoded as `bg-gradient-to-r from-green-500 to-blue-700` in `CardPattern` — swap these for the brand green/blue.

## Notes

- Effect is hover/mouse-driven (`onMouseMove`), so it does not animate on touch devices that lack hover — on mobile the card shows only the static centered label.
- Each mouse move regenerates a 1500-character random string and re-renders; this is lightweight (no canvas/WebGL) but fires on every pointer move.
- An initial 1500-char string is generated once on mount via `useEffect`.
- Dark-mode aware: the centered label and its blurred backing use `dark:` variants (`text-white`/`text-black`, `bg-white/[0.8]`/`bg-black/[0.8]`).
- No remote image domains or scroll dependency. Layout is `aspect-square` and fills its parent (`w-full h-full`).
