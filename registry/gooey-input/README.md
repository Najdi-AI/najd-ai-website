# Gooey Input

> An animated search input that expands from a pill button with a liquid "gooey" SVG-filter morph between the trigger and a detached icon bubble.

## Install

```bash
npx shadcn@latest add @aceternity/gooey-input-demo
```

## What it is

`GooeyInput` is a collapsible search control: it starts as a compact pill with a search icon, and on click it expands into a full text input. A gooey SVG filter (Gaussian blur + color-matrix threshold) makes a small icon bubble appear to detach and merge fluidly with the input as it grows. Use it where you want a playful, space-saving search affordance — toolbars, headers, or hero sections — that reveals the field only when needed. It supports both controlled and uncontrolled value usage.

## Dependencies

- npm packages:
  - `motion` (imported as `motion/react`) — layout/spring animations for the input, icon, and bubble.
  - `react` — hooks (`useState`, `useRef`, `useEffect`, `useId`, `useMemo`, `useCallback`).
- Internal components:
  - `@/lib/utils` — the `cn` class-name helper (depends on `clsx` / `tailwind-merge`).
- Tailwind config requirements:
  - Uses theme color tokens `bg-foreground`, `text-background`, `ring-border`, `ring-ring`, `ring-offset-background` — these must be defined in your Tailwind/shadcn theme. No custom keyframes are required (motion handles animation).

## Exports & Props

`GooeyInput` is the only exported component. It also exports the supporting types `GooeyInputProps` and `GooeyInputClassNames`.

### `GooeyInput`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `"Type to search..."` | Placeholder text for the input field. |
| `className` | `string` | — | Class applied to the outer root container. |
| `classNames` | `GooeyInputClassNames` | — | Per-slot class overrides (see below). |
| `collapsedWidth` | `number` | `115` | Collapsed control width in px. |
| `expandedWidth` | `number` | `200` | Expanded control width in px. |
| `expandedOffset` | `number` | `50` | Horizontal offset (px) when expanded, to align the detached bubble. |
| `gooeyBlur` | `number` | `5` | Gaussian blur amount for the gooey SVG filter. |
| `value` | `string` | — | Controlled input value. |
| `defaultValue` | `string` | `""` | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` | — | Called whenever the input value changes. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the control expands (`true`) or collapses (`false`). |
| `disabled` | `boolean` | `false` | Disables the trigger and input. |

### `GooeyInputClassNames` (slots for `classNames`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `string` | — | Outer wrapper. |
| `filterWrap` | `string` | — | Element that applies the gooey SVG `filter`. |
| `buttonRow` | `string` | — | The animated width container around the trigger. |
| `trigger` | `string` | — | The clickable pill button. |
| `input` | `string` | — | The text input element. |
| `bubble` | `string` | — | The detached, animated icon-bubble wrapper. |
| `bubbleSurface` | `string` | — | The rounded surface inside the bubble. |

## Usage

```tsx
"use client";

import { GooeyInput } from "@/components/ui/gooey-input";

export default function Example() {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <GooeyInput placeholder="Search..." />
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. This component draws its surface from theme tokens (`bg-foreground` / `text-background`), so rebrand by mapping those tokens — or override via the `classNames.trigger` / `classNames.bubbleSurface` slots.

## Notes

- Gooey effect relies on an SVG `feGaussianBlur` + `feColorMatrix` filter applied via CSS `filter: url(#id)`. Filter support is good in modern browsers but can be GPU-costly; keep `gooeyBlur` modest.
- The filter `id` is derived from React's `useId`, so the component is SSR-safe and renders multiple instances on one page without id collisions.
- Collapse behaviour: it auto-collapses on blur only when the input is empty, and clears the text when collapsing. Focus is auto-moved to the input on expand.
- The hardcoded pixel widths/offsets (`collapsedWidth`, `expandedWidth`, `expandedOffset`) are fixed sizes, not responsive; tune them per layout. No explicit RTL handling — the bubble is positioned `left-0`, so verify alignment under `dir="rtl"`.
