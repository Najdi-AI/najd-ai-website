# SVG Mask Effect

> A hover-driven SVG mask spotlight that reveals hidden text beneath an overlay as the cursor moves.

## Install

```bash
npx shadcn@latest add @aceternity/svg-mask-effect-demo
```

## What it is

`MaskContainer` renders two stacked layers: a foreground overlay (`children`) clipped by an SVG mask, and the `revealText` content behind it. As the user moves their mouse, a circular mask follows the cursor and expands on hover, "wiping away" the overlay to expose the text underneath. Use it for hero sections or interactive callouts where you want a playful reveal-on-hover effect.

## Dependencies

- npm packages: `motion` (via `motion/react`), `react` (`useState`, `useEffect`, `useRef`).
- Internal components: `cn` from `@/lib/utils` (clsx + tailwind-merge helper).
- Tailwind config: none beyond stock utilities. Note it uses arbitrary `[mask-image:url(/mask.svg)]` — a `mask.svg` file must exist in the `public/` folder. It also reads CSS variables `--slate-900` and `--white` for the animated background color.

## Exports & Props

### `MaskContainer`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string \| React.ReactNode` | — | Foreground/overlay content shown inside the masked layer. |
| `revealText` | `string \| React.ReactNode` | — | The text/content revealed underneath the mask. |
| `size` | `number` | `10` | Mask diameter (px) at rest, before hover. |
| `revealSize` | `number` | `600` | Mask diameter (px) when hovered, controlling how much is revealed. |
| `className` | `string` | — | Extra classes merged onto the root container (defaults to `relative h-screen`). |

## Usage

```tsx
"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function Example() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
            The text revealed beneath the mask as you hover.
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black"
      >
        Discover the power of <span className="text-blue-500">Tailwind CSS</span>{" "}
        with interactive masked reveals.
      </MaskContainer>
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The demo uses `text-blue-500` accents and the component animates between `--slate-900` and `--white` backgrounds — swap these for brand tokens.

## Notes

- Requires a `mask.svg` asset in `public/` (referenced via `[mask-image:url(/mask.svg)]`); without it nothing is masked.
- Interaction is mouse/hover driven, so the reveal effect does not work on touch/mobile devices (no cursor) — provide a sensible fallback for mobile.
- Default root height is `h-screen`; override via `className` (e.g. `h-[40rem]`) to constrain it.
- Mask position is computed from `getBoundingClientRect`; the container must be mounted and laid out for tracking to work. No three.js/canvas, so it is lightweight.
