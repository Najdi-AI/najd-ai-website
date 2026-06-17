# Stateful Button

> A pill button that animates through loading and success states while its `onClick` handler runs.

## Install

```bash
npx shadcn@latest add @aceternity/stateful-button-demo
```

## What it is

`Button` is a stateful submit button that wraps your `onClick` handler in a small animation lifecycle: on click it reveals a spinning loader, awaits your handler (which can be an async/promise-returning function), then flashes a success checkmark before settling back to its idle label. Use it for form submits or any action where you want inline feedback without managing loading state yourself. Because it `await`s the click handler, just return a promise from `onClick` and the animations sync to the work being done.

## Dependencies

- npm packages:
  - `motion` — imports `motion`, `AnimatePresence`, and `useAnimate` from `motion/react`.
  - `react`.
- Internal components:
  - `@/lib/utils` — the `cn` class-merge helper (backed by `clsx` / `tailwind-merge`).
- Tailwind config: none. Uses only stock Tailwind utilities (the loader spin is driven by `motion`, not a custom keyframe).

## Exports & Props

`Button` extends `React.ButtonHTMLAttributes<HTMLButtonElement>`, so all native button props (e.g. `type`, `disabled`, `onClick`) are accepted in addition to those below.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Button label content; stays visible and reflows as the loader/check animate in and out. |
| `className` | `string` | — | Extra classes merged via `cn` to override the default pill styling (background, ring, sizing). |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void \| Promise<unknown>` | — | Inherited from native button props. It is `await`ed between the loading and success animations, so returning a promise keeps the spinner visible until the work completes. |
| `...props` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | — | Any other native button attributes are spread onto the underlying `motion.button`. |

## Usage

```tsx
"use client";

import { Button } from "@/components/ui/stateful-button";

export default function Example() {
  const handleClick = () =>
    new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Button onClick={handleClick}>Send message</Button>
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the contact submit button. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the upstream default uses `bg-green-500` and `hover:ring-green-500`.

## Notes

- The success checkmark stays on screen for ~2 seconds (a hardcoded `delay: 2`) before reverting to the label.
- The component uses `layout` / `layoutId="button"` animations; mounting multiple `Button` instances that share the same `layoutId` on one page can cause motion to interpolate between them. Wrap in a `LayoutGroup` or give distinct layout ids if you render several.
- The button does not manage its own `disabled` state during the loading window, so double-clicks can re-trigger the handler — guard against re-entrancy in your `onClick` if needed.
- No remote image domains, canvas, three.js, or scroll-driven behaviour. RTL: layout is flex with logical gap utilities, so it mirrors correctly under `dir="rtl"`.
