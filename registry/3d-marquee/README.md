# 3D Marquee
> An animated 3D-perspective grid of images that float in continuously looping columns.

## Install
```bash
npx shadcn@latest add @aceternity/3d-marquee-demo
```

## What it is
`ThreeDMarquee` takes an array of image URLs, splits them into 4 columns, and lays them out on a tilted 3D plane (`rotateX/Y/Z`). Each column drifts up or down on an infinite reverse loop, and individual images lift slightly on hover. Use it as an eye-catching hero or background showcase wall for screenshots, logos, or product imagery.

## Dependencies
- npm packages:
  - `motion` — imported as `motion/react` (used for `motion.div` and `motion.img` animations).
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper).
  - `GridLineHorizontal` and `GridLineVertical` are defined inline in the same file (not separate imports).
- Tailwind config requirements: none. Animation is driven entirely by `motion`; the component relies on standard Tailwind utilities plus the `transform-3d` utility (Tailwind v4). No custom keyframes are required.

## Exports & Props
### `ThreeDMarquee`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `string[]` | — | Array of image URLs; split into 4 columns and rendered as the marquee tiles. |
| `className` | `string` | — | Optional extra classes merged onto the outer container (override height, radius, etc.). |

> `GridLineHorizontal` and `GridLineVertical` are internal helpers and are not exported.

## Usage
```tsx
"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function Demo() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    // ...add more URLs (works best with a multiple of 4)
  ];

  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The grid-line helpers use hardcoded `#ffffff`, `rgba(0,0,0,0.2)`, and `rgba(255,255,255,0.2)` CSS variables, and tiles use a `ring-gray-950/5` outline — swap these for brand tints if needed.

## Notes
- Not scroll-driven: the columns animate on an infinite `motion` timeline (`repeat: Infinity`, `repeatType: "reverse"`), so it animates continuously regardless of page scroll.
- For best layout, supply an image count that is a multiple of 4; `images` is chunked via `Math.ceil(length / 4)` so uneven counts produce uneven columns.
- Uses a large fixed `1720px` stage that is scaled down (`scale-50` on mobile, `sm:scale-75`, `lg:scale-100`); outer height is `600px` (`max-sm:h-100` on small screens).
- Uses native `<img>` (via `motion.img`) with `src`, so remote hosts do not need to be added to Next.js `images.remotePatterns`. The demo pulls from `assets.aceternity.com`.
- Performance: renders every image plus per-image/per-column animated transforms on a 3D-transformed plane; with many large images this can be GPU-heavy on low-end mobile.
- RTL: the layout is a centered, transform-based 3D grid and is not direction-aware; it renders identically in LTR/RTL.
- Dark mode: grid lines have `dark:` variants baked in.
