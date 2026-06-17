# Background Beams With Collision

> An animated background where vertical light beams fall, collide with a bottom surface, and burst into particle explosions.

## Install

```bash
npx shadcn@latest add @aceternity/background-beams-with-collision-demo
```

## What it is

`BackgroundBeamsWithCollision` is a full-width hero/section background that animates a set of vertical gradient beams falling from the top of the container. When each beam reaches the bottom collision bar it triggers a brief particle "explosion" at the impact point, then the beam resets and repeats. Use it as a decorative wrapper behind headings or hero content when you want subtle, looping motion without a heavy canvas/WebGL cost. It is a pure DOM + Framer Motion implementation (no `<canvas>` or `three`).

## Dependencies

- npm packages:
  - `motion` (imports `motion`, `AnimatePresence` from `motion/react`)
  - `react`
- Internal components / utilities:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
- Tailwind config requirements: none. All motion is driven by Framer Motion; no custom keyframes/animations are required in `tailwind.config`.

## Exports & Props

`BackgroundBeamsWithCollision` is the only exported component. (`CollisionMechanism` and `Explosion` are internal, non-exported helpers.)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Content rendered on top of the animated beams (e.g. a heading). |
| `className` | `string` | — | Extra classes merged onto the outer container (e.g. to override the default `h-96 md:h-[40rem]` height). |

The beam set is hardcoded internally (7 beams with fixed `initialX` / `translateX` / `duration` / `repeatDelay` / `delay` / `className`); there is no prop to configure beams.

## Usage

```tsx
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Hero() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white relative z-20">
        What&apos;s cooler than Beams?
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The beams and explosion particles use hardcoded Tailwind `indigo-500` / `purple-500` gradients (`from-indigo-500 via-purple-500 to-transparent`, `from-indigo-500 to-purple-500`), and the container uses a `from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800` gradient — swap these for the brand colors.

## Notes

- Performance: no canvas or WebGL; uses a `setInterval` (every 50ms per beam) calling `getBoundingClientRect()` for collision detection plus Framer Motion transforms. Lightweight, but each of the 7 beams runs its own interval.
- The container clips content with `overflow-hidden` and a fixed height (`h-96 md:h-[40rem]`); place your foreground content with `relative z-20` so it sits above the beams and the bottom collision bar (`z-50` explosions).
- Beam positions are fixed pixel X offsets (e.g. up to `1200px`); on narrow/mobile viewports beams beyond the container width fall outside the visible area, so the effect appears sparser on small screens.
- RTL: layout is not direction-aware; beam X positions are LTR pixel offsets and are unaffected by `dir="rtl"`.
- No remote image domains or external assets are required.
