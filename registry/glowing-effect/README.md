# Glowing Effect

> A pointer-tracking conic-gradient border glow that lights up the edge of any card as the cursor approaches.

## Install

```bash
npx shadcn@latest add @aceternity/glowing-effect-demo-2
```

## What it is

`GlowingEffect` is an absolutely-positioned overlay that renders an animated gradient border around its parent container. As the mouse moves near the element, it tracks the pointer angle and rotates a masked conic gradient so the glow appears to follow the cursor along the border. Use it to add a premium, interactive accent to cards, panels, or feature tiles where you want subtle motion on hover/proximity.

## Dependencies

- npm packages:
  - `motion` — uses the `animate` function from `motion/react` for the angle tween.
  - `lucide-react` — used by the demo only (`Box`, `Lock`, `Search`, `Settings`, `Sparkles` icons), not by the component itself.
- Internal components:
  - `@/lib/utils` — the `cn` class-merge helper (`clsx` + `tailwind-merge`).
- Tailwind config requirements:
  - None. All animation is driven by inline CSS custom properties (`--start`, `--active`, `--gradient`, `--spread`, etc.) and arbitrary-value utilities; no custom keyframes or `tailwind.config` animation entries are required.

## Exports & Props

### `GlowingEffect`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `blur` | `number` | `0` | Blur radius (px) applied to the glow layer via `--blur`. |
| `inactiveZone` | `number` | `0.7` | Fraction of the element's radius around the center where the glow stays inactive (pointer too close to center). |
| `proximity` | `number` | `0` | Extra px around the element bounds within which the pointer counts as "active". |
| `spread` | `number` | `20` | Angular spread (degrees-ish) of the visible glow arc along the border. |
| `variant` | `"default" \| "white"` | `"default"` | `default` uses the multi-color radial/conic gradient; `white` uses a monochrome gradient. |
| `glow` | `boolean` | `false` | Forces the glow layer to full opacity. |
| `className` | `string` | `—` | Extra classes merged onto the glow container. |
| `disabled` | `boolean` | `true` | When `true`, skips pointer/scroll listeners and renders the static fallback border (no interactivity). Set `false` to enable tracking. |
| `movementDuration` | `number` | `2` | Duration (seconds) of the angle tween as the glow follows the pointer. |
| `borderWidth` | `number` | `1` | Width (px) of the glowing border, set via `--glowingeffect-border-width`. |

## Usage

```tsx
"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Card() {
  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6">
        {/* card content */}
      </div>
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the comparison-table card. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors. The stock source ships hardcoded gradient stops (`#dd7bbb`, `#d79f1e`, `#5a922c`, `#4c7894`) inside the `--gradient` CSS variable — these are the colors to swap for the brand palette.

## Notes

- The parent element must be `position: relative` and have a `rounded-*` value — the effect uses `absolute inset-0` and `rounded-[inherit]`.
- Interactivity is OFF by default: `disabled` defaults to `true`. You must pass `disabled={false}` for the glow to track the pointer.
- Performance: tracking runs on `pointermove` (on `document.body`) and `scroll`, throttled via `requestAnimationFrame`; the angle change is animated with `motion`. Cost is low but it does attach global listeners while enabled.
- The glow uses `background-attachment: fixed` on the gradient, so the effect is tied to the viewport, not the element — heavy layering or transforms on ancestors can affect rendering.
- RTL: no direction-specific logic; the glow is purely geometric and works in both LTR and RTL layouts.
- No remote image domains required.
