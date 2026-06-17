# MacBook Scroll
> A scroll-driven 3D MacBook that opens its lid and scales up to reveal a screenshot as the user scrolls down the page.

## Install
```bash
npx shadcn@latest add @aceternity/macbook-scroll-demo
```

## What it is
`MacbookScroll` renders a CSS/Tailwind-built MacBook (lid, keyboard, trackpad, speaker grids) whose lid rotates open and whose screen scales and translates in response to page scroll progress. The screen displays an image you pass via `src`, and an optional title fades out and a badge can be pinned in the corner. Use it for a hero or product-preview band where you want a screenshot to feel like it's being unveiled on a laptop as the visitor scrolls.

## Dependencies
- npm packages:
  - `motion` (imports `MotionValue`, `motion`, `useScroll`, `useTransform` from `motion/react`)
  - `@tabler/icons-react` (keyboard glyph icons: `IconBrightnessDown`, `IconVolume`, `IconCommand`, `IconWorld`, `IconCaretLeftFilled`, etc.)
  - `react`
- Internal components:
  - `@/lib/utils` — the `cn` class-name helper (which uses `clsx` / `tailwind-merge`).
  - No other `components/ui/...` imports. All sub-parts (`Lid`, `Trackpad`, `Keypad`, `KBtn`, `SpeakerGrid`, `OptionKey`) are defined and exported from this same file.
- Tailwind config: none required — no custom keyframes or animations; all motion is driven by `motion/react` scroll transforms and inline styles.

## Exports & Props

### `MacbookScroll`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image URL shown on the laptop screen. |
| `showGradient` | `boolean` | — | When true, overlays a bottom fade gradient over the base to blend into the page. |
| `title` | `string \| React.ReactNode` | — | Heading above the laptop; fades/translates out on scroll. Falls back to default copy if omitted. |
| `badge` | `React.ReactNode` | — | Optional element pinned to the bottom-left of the base (e.g. a logo). |

### `Lid`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `scaleX` | `MotionValue<number>` | — | Horizontal scale of the opening screen. |
| `scaleY` | `MotionValue<number>` | — | Vertical scale of the opening screen. |
| `rotate` | `MotionValue<number>` | — | X-axis rotation (lid opening angle). |
| `translate` | `MotionValue<number>` | — | Vertical translation of the screen. |
| `src` | `string` | — | Image URL displayed on the screen. |

### `KBtn`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes on the key cap. |
| `children` | `React.ReactNode` | — | Key content (letter, icon, label). |
| `childrenClassName` | `string` | — | Extra classes on the inner content wrapper. |
| `backlit` | `boolean` | `true` | Adds the white backlight glow to the key. |

### `OptionKey`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Classes applied to the option-key SVG (required). |

### `Trackpad`, `Keypad`, `SpeakerGrid`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No props. Internal building blocks of the base. |

## Usage
```tsx
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function ProductPreview() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={<span>See it in action.</span>}
        src="/product-screenshot.webp"
        showGradient={false}
      />
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the product-preview band. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors.

## Notes
- Scroll-driven: the animation maps to `useScroll` progress over the component, so the wrapper needs real page scroll height. The root reserves `min-h-[200vh]`, so give it room and avoid clipping the scroll range.
- Mobile: on load it checks `window.innerWidth < 768` and reduces the open-screen scale; the whole assembly is scaled down (`scale-[0.35]` to `sm:scale-50` to `md:scale-100`). It reads `window` in `useEffect`, so it is a `"use client"` component.
- Image: `src` is rendered with a plain `<img>` (not `next/image`), so no remote-domain config is needed, but the image should exist and be correctly sized for the screen aspect.
- Performance: pure CSS/Tailwind 3D (transforms, `perspective`, `will-change`) — no canvas, three.js, or particles — so it is lightweight, but the many keyboard keys add DOM nodes.
- RTL: layout is visually fixed (a laptop), not text-flow dependent; no special RTL handling is provided.
