# Container Scroll Animation
> A scroll-driven hero that tilts and scales a 3D "card" into place as the user scrolls past it.

## Install
```bash
npx shadcn@latest add @aceternity/container-scroll-animation-demo
```

## What it is
`ContainerScroll` is a scroll-linked hero section. As the section scrolls through the viewport, a title translates upward while a perspective card rotates from a tilted (rotateX) angle to flat and scales into place. Use it to showcase a product screenshot, dashboard, or video in an eye-catching 3D reveal at the top of a page.

## Dependencies
- npm packages: `react`, `motion` (imported from `motion/react` — `useScroll`, `useTransform`, `motion`, `MotionValue`).
- Internal components: the demo imports `ContainerScroll` from `@/components/ui/container-scroll-animation`. The component itself imports no other internal `components/ui/` files.
- Tailwind config: none. Uses only stock Tailwind utilities plus inline styles (`perspective`, `boxShadow`); no custom keyframes/animations required.

## Exports & Props

### `ContainerScroll`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `titleComponent` | `string \| React.ReactNode` | — | Content rendered in the translating header above the card (e.g. an `<h1>`). |
| `children` | `React.ReactNode` | — | Content placed inside the 3D card (e.g. an image or video). |

### `Header`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `translate` | `any` (`MotionValue<number>`) | — | Motion value bound to the header's `translateY`. |
| `titleComponent` | `any` | — | Content rendered inside the header. |

### `Card`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rotate` | `MotionValue<number>` | — | Motion value bound to the card's `rotateX`. |
| `scale` | `MotionValue<number>` | — | Motion value bound to the card's `scale`. |
| `translate` | `MotionValue<number>` | — | Declared in the prop type (used by parent layout); not applied inside `Card`. |
| `children` | `React.ReactNode` | — | Content rendered inside the card. |

> Typical usage only needs `ContainerScroll`. `Header` and `Card` are exported internals used by `ContainerScroll` and rarely consumed directly.

## Usage
```tsx
"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            Unleash the power of <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Scroll Animations
            </span>
          </h1>
        }
      >
        <img
          src="/linear.webp"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The card uses hardcoded `border-[#6C6C6C]` and `bg-[#222222]`; consider swapping the navy `#0d2745` for the frame/background and a brand accent for the title.

## Notes
- Scroll-driven: the animation is tied to the section's scroll progress via `useScroll`, so it only animates while the page scrolls past it. It needs vertical scroll space (the container is `h-[60rem] md:h-[80rem]`).
- Mobile: it tracks viewport width with a resize listener (breakpoint `<= 768px`) and uses different scale ranges on mobile (`[0.7, 0.9]`) vs desktop (`[1.05, 1]`).
- Performance: lightweight — transforms (`rotateX`, `scale`, `translateY`) are GPU-friendly; no canvas, particles, or three.js.
- 3D: relies on `perspective: 1000px` on the wrapper for the tilt effect; the card animates `rotateX` from 20deg to 0.
- Remote images: the demo references `/linear.webp` (a local public asset); supply your own asset — no remote image domains are required by the component.
- RTL: no special RTL handling; layout is centered and direction-agnostic, but verify title text alignment under `dir="rtl"`.
