# Hero Parallax

> A scroll-driven hero that animates three rows of product cards in 3D perspective, sliding them in opposite directions as the page scrolls.

## Install

```bash
npx shadcn@latest add @aceternity/hero-parallax-demo
```

## What it is

`HeroParallax` is a full-screen scroll hero that renders up to 15 product thumbnails across three rows. As the user scrolls, the rows translate horizontally in alternating directions while the whole grid rotates and fades in on a 3D plane (`perspective: 1000px`). Use it as a landing-page header to showcase projects, products, or portfolio images with an immersive, motion-rich first impression. It needs a tall scroll region (the container is `300vh`), so it works best at the very top of a page.

## Dependencies

- npm packages:
  - `motion` — imports `motion`, `useScroll`, `useTransform`, `useSpring`, and the `MotionValue` type from `motion/react`.
  - `react`
- Internal components: None. The component is self-contained (it also exports `Header` and `ProductCard` used internally).
- Tailwind config requirements: None. It uses only stock Tailwind utilities plus arbitrary values (e.g. `h-[300vh]`, `[perspective:1000px]`, `[transform-style:preserve-3d]`); no custom keyframes or animations are required.

## Exports & Props

### `HeroParallax`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `products` | `{ title: string; link: string; thumbnail: string }[]` | — | Array of products. First 5 form row 1, next 5 row 2, next 5 row 3 (up to 15 items used). Each item provides a card title, an anchor `link`, and a `thumbnail` image URL. |

### `Header`

Takes no props. Renders the hardcoded heading and intro paragraph above the card grid.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No props. |

### `ProductCard`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `product` | `{ title: string; link: string; thumbnail: string }` | — | The single product to render as an image card with a hover overlay and title. |
| `translate` | `MotionValue<number>` | — | A motion value driving the card's horizontal `x` transform during scroll. |

## Usage

```tsx
"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  // ...up to 15 products
];

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. Note the `Header` heading/paragraph copy and the `dark:text-white` / `dark:text-neutral-200` text colours are hardcoded, as is the black hover overlay (`bg-black`) on each card.

## Notes

- Scroll-driven: requires real page scroll. The root container is `h-[300vh]`, so the surrounding page must allow vertical scrolling for the animation to play.
- 3D transforms: relies on `[perspective:1000px]` and `[transform-style:preserve-3d]`; the spring config uses high stiffness (`{ stiffness: 300, damping: 30, bounce: 100 }`).
- RTL: row 1 and row 3 use `flex-row-reverse space-x-reverse`; in an RTL layout verify the horizontal slide directions still read as intended.
- Remote images: thumbnails are loaded via a plain `<img>` tag (no `next/image`), so no `next.config` image domain allow-listing is needed, but ensure the thumbnail URLs are reachable.
- Performance: animates many large card images simultaneously with springs; on low-end mobile the parallax can be heavy. The fixed card sizes (`h-96 w-[30rem]`) are not responsive, so rows overflow horizontally on small screens.
