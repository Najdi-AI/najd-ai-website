# 3D Animated Pin
> A hover-activated 3D card that tilts back into perspective and reveals an animated "location pin" with expanding radar rings and a glowing beam.

## Install
```bash
npx shadcn@latest add @aceternity/3d-pin-demo
```

## What it is
`PinContainer` wraps arbitrary content in a clickable 3D card. On hover the card rotates back on the X axis and scales down, while a perspective "pin" — a titled pill, three pulsing radar rings, and a glowing vertical beam — animates into view behind it. Use it to make a single highlighted card (a location, a featured link, a product) feel spatial and interactive. It is purely CSS-transform and motion driven, so it is lightweight and needs no canvas or WebGL.

## Dependencies
- npm packages: `react`, `motion` (imported as `motion/react`).
- Internal components: `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
- Internal cross-imports: the demo (`3d-pin-demo.tsx`) imports `PinContainer` from `@/components/ui/3d-pin`.
- Tailwind config: none required. The pulse/radar effect is animated via `motion` (not Tailwind keyframes), so no custom `tailwind.config` animations are needed.

## Exports & Props

### `PinContainer`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered inside the 3D card face. |
| `title` | `string` | — | Text shown in the floating pill above the pin. |
| `href` | `string` | `"/"` (on the outer `<a>`); pill link has no fallback | Link target. The outer anchor falls back to `/`; the pill anchor opens this URL in a new tab (`target="_blank"`). |
| `className` | `string` | — | Extra classes for the inner content wrapper. |
| `containerClassName` | `string` | — | Extra classes for the outer anchor/container. |

### `PinPerspective`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Text shown in the floating pill. |
| `href` | `string` | — | Link target for the pill anchor (opens in a new tab). |

> `PinPerspective` is rendered internally by `PinContainer`; you normally only use `PinContainer` directly.

## Usage
```tsx
import { PinContainer } from "@/components/ui/3d-pin";

export function RiyadhPin() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <PinContainer title="Riyadh, Saudi Arabia" href="https://maps.google.com">
        <div className="flex flex-col p-4 w-[20rem] h-[20rem] tracking-tight text-slate-100/50">
          <h3 className="!pb-2 !m-0 font-bold text-base text-slate-100">
            Najd AI Solutions
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">Our office in Riyadh.</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-[#2bb673] via-[#2699d6] to-[#215877]" />
        </div>
      </PinContainer>
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the Riyadh location pin. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors.

## Notes
- Hover-driven, not scroll-driven: the 3D tilt and pin only appear on pointer hover. On touch devices (no hover) the effect may not trigger, so the pin essentially renders as a flat card — design the content to read well without the animation.
- The pill anchor always uses `target="_blank"`; the card is wrapped in a real `<a>`, so the whole component is a link.
- No canvas/WebGL/three.js and no remote image domains are required; it is pure CSS transforms plus `motion`. The three radar rings each run an infinite 6s loop (staggered), which is inexpensive but is a continuously animating element.
- RTL: layout uses centered absolute positioning and is direction-agnostic; no special RTL handling is built in.
