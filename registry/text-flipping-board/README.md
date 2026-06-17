# Text Flipping Board
> A split-flap (Solari-style) departure-board display that animates text and color tiles into place with mechanical flip transitions.

## Install
```bash
npx shadcn@latest add @aceternity/text-flipping-board-demo
```

## What it is
`TextFlippingBoard` renders a fixed 6-row × 22-column grid of split-flap cells that scramble and flip through random characters before settling on your target text, mimicking an old airport/train departure board. Pass a `text` string (auto-wrapped and centered) or an explicit `rows` array, and optionally embed colored tiles using inline codes like `{R}`, `{G}`, `{B}`. Use it for eye-catching hero headlines, announcements, or any place you want a retro animated reveal. The total animation duration is configurable.

## Dependencies
- npm packages:
  - `motion` (imported as `motion/react`) — drives the flap flip animations.
  - `react` — hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `React.memo`).
- Internal components:
  - `@/lib/utils` (`cn` helper, which wraps `clsx` / `tailwind-merge`).
- Tailwind config: none required. Uses standard utilities plus arbitrary values (`perspective-dramatic`, `transform-3d`, `backface-hidden`, `aspect-3/6`, `mask-t-from-50%`) that rely on Tailwind v4 / modern Tailwind. No custom keyframes/animations are defined — all motion is JS-driven via `motion`.

## Exports & Props

### `TextFlippingBoard`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `string[]` | `—` | Explicit per-row content (max 6 rows, 22 cols each). Rendered top-aligned, left-aligned. Ignored if `text` is provided. |
| `text` | `string` | `—` | Free text; word-wrapped to 22 cols, vertically and horizontally centered. Supports `\n` newlines. Takes priority over `rows`. |
| `className` | `string` | `—` | Extra classes merged onto the outer board container. |
| `duration` | `number` | `~1.2` (`BASE_TOTAL_S`) | Total animation duration in seconds; scales the per-column/row stagger, step time, and flip duration. |

Both `rows` and `text` support inline color-tile codes: `{R}` red, `{O}` orange, `{Y}` yellow, `{G}` green, `{B}` blue, `{V}` violet, `{W}` white.

The named export is `TextFlippingBoard`; the props interface `TextFlippingBoardProps` is also exported. `FlapCell` and `ColorCell` are internal (not exported).

## Usage
```tsx
"use client";
import { useEffect, useState } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES = [
  "STAY HUNGRY \nSTAY FOOLISH",
  "WELCOME TO \nNAJD AI",
];

export default function Demo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return <TextFlippingBoard text={MESSAGES[i]} />;
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The component ships with a fixed `ACCENT_COLORS` array (red/orange/yellow/green/blue/violet/white) used for random flap flashes and a `COLOR_MAP` of hex tile colors (`#D32F2F`, `#F57C00`, `#FBC02D`, `#43A047`, `#1E88E5`, `#8E24AA`, `#FAFAFA`) — swap these and the `bg-neutral-*` cell backgrounds for brand greens/blues/navy when on-brand styling is required.

## Notes
- The board is a fixed 6×22 grid; content beyond 6 rows or 22 columns is truncated. Only the supported `FLAP_CHARS` set (` A–Z 0–9` and a fixed punctuation set) is shown — unsupported characters render as blanks, and letters are uppercased.
- RTL: not RTL-aware. Layout, word-wrapping, and column stagger are left-to-right only; Arabic/RTL text will not render correctly.
- Performance: each cell runs its own scramble loop of `setTimeout` steps and motion flip transitions, so all (up to 132) cells animate simultaneously on each text change. This is animation/CPU heavy on every update; avoid changing `text` very frequently and keep `duration` reasonable on low-end/mobile devices.
- Dark mode aware (uses `dark:` variants throughout).
- Not scroll-driven and needs no remote image domains.
