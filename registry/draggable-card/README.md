# Draggable Card

> A physics-driven, draggable 3D card that tilts toward the cursor and flings with momentum when released.

## Install

```bash
npx shadcn@latest add @aceternity/draggable-card-demo-2
```

## What it is

`DraggableCard` is a pair of components for building a scatter of interactive, throwable cards. `DraggableCardBody` wraps content in a card that you can drag freely within the viewport; while hovering it tilts in 3D toward the mouse and shows a moving glare, and on release it carries the drag velocity into a spring-based fling. `DraggableCardContainer` provides the 3D perspective context the bodies need. Use it for playful hero sections, photo/credential scatters, or any surface where draggable, tactile cards add personality.

## Dependencies

- npm packages:
  - `motion` (imported from `motion/react`) — `motion`, `useMotionValue`, `useSpring`, `useTransform`, `animate`, `useVelocity`, `useAnimationControls`.
  - `react`.
  - `cn` from `@/lib/utils`, which relies on `clsx` + `tailwind-merge`.
- Internal components: none (no other `components/ui/...` imports).
- Tailwind config: none required. Uses standard utilities plus Tailwind v4 arbitrary/utility classes (`transform-3d`, `[perspective:3000px]`); no custom keyframes/animations.

## Exports & Props

### `DraggableCardBody`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the card; used to position/rotate each card (default size is `min-h-96 w-80`). |
| `children` | `React.ReactNode` | — | Card content (e.g. image + title). |

### `DraggableCardContainer`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the wrapper, which applies `[perspective:3000px]`. |
| `children` | `React.ReactNode` | — | The `DraggableCardBody` elements to render in the 3D perspective context. |

## Usage

```tsx
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function Example() {
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <DraggableCardBody className="absolute top-10 left-[30%] rotate-[-5deg]">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Iceland"
          className="pointer-events-none relative z-10 h-80 w-80 object-cover"
        />
        <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
          Iceland
        </h3>
      </DraggableCardBody>
    </DraggableCardContainer>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The card surface uses `bg-neutral-100 dark:bg-neutral-900` and demo text uses `text-neutral-400/700` — swap these for brand tokens (e.g. navy `#0d2745` surface, green `#2bb673` accents) as needed.

## Notes

- Drag constraints are computed from `window.innerWidth`/`window.innerHeight` and updated on `resize`, so the draggable range scales to the viewport; the card is marked `"use client"` and reads `window`/`document` (client-only).
- Mutates `document.body.style.cursor` to `grabbing`/`default` during drag — a global side effect.
- The tilt/glare effect is mouse-driven (`onMouseMove`), so on touch/mobile you get drag-and-fling but not the hover tilt or glare.
- Performance: each card runs several spring `useTransform` chains and sets `willChange: "transform"`; rendering many cards at once increases compositing cost.
- The demo loads remote Unsplash images — allow `images.unsplash.com` (or your own host) if you route them through `next/image`.
- RTL: no direction-specific logic; positioning is driven entirely by the `className` you pass, so mirror those classes manually for RTL layouts.
