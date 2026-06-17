# Link Preview
> An inline link that reveals an animated, cursor-tracked screenshot preview of the destination URL on hover.

## Install
```bash
npx shadcn@latest add @aceternity/link-preview-demo
```

## What it is
`LinkPreview` wraps inline text in a Radix hover card that pops up a small image preview of the linked page. By default it fetches a live screenshot of the URL from the Microlink API; you can also pass a static `imageSrc` instead. The preview floats above the trigger and subtly tracks the cursor's horizontal position with a spring animation. Use it in body copy or articles to give readers a glimpse of where a link leads before they click.

## Dependencies
- npm packages:
  - `@radix-ui/react-hover-card`
  - `motion` (imports `AnimatePresence`, `motion`, `useMotionValue`, `useSpring` from `motion/react`)
  - `qss` (for encoding the Microlink query string)
  - `react`
- Internal components:
  - `cn` from `@/lib/utils` (clsx + tailwind-merge helper)
- Tailwind config requirement: none (no custom keyframes/animations; all motion is JS-driven).

## Exports & Props
### `LinkPreview`
Named export. Props (the `isStatic`/`imageSrc` pair is a discriminated union: pass `isStatic` with `imageSrc`, or neither).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | The inline content rendered as the hover trigger / link text. |
| `url` | `string` | — | Destination URL; used as the link `href` and (when not static) as the Microlink screenshot source. |
| `className` | `string` | — | Extra classes applied to the hover trigger. |
| `width` | `number` | `200` | Preview image width in px (also scales the Microlink viewport). |
| `height` | `number` | `125` | Preview image height in px (also scales the Microlink viewport). |
| `quality` | `number` | `50` | Image quality value (passed through with the props). |
| `layout` | `string` | `"fixed"` | Layout value (passed through with the props). |
| `isStatic` | `boolean` | `false` | When `true`, uses `imageSrc` instead of fetching a live Microlink screenshot. |
| `imageSrc` | `string` | `""` | Static preview image source; required when `isStatic` is `true`, otherwise must not be set. |

## Usage
```tsx
import { LinkPreview } from "@/components/ui/link-preview";

export default function Example() {
  return (
    <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
      <LinkPreview url="https://tailwindcss.com" className="font-bold">
        Tailwind CSS
      </LinkPreview>{" "}
      and{" "}
      <LinkPreview url="https://framer.com/motion" className="font-bold">
        Framer Motion
      </LinkPreview>{" "}
      are a great way to build modern websites.
    </p>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The trigger uses `text-black dark:text-white` and the preview card uses `bg-white` with `neutral-200`/`neutral-800` hover borders — swap these for brand tokens as needed.

## Notes
- Remote image domain: live (non-static) previews load from `https://api.microlink.io`, so that host must be allowed by your image/CSP policy. To avoid the external dependency, use `isStatic` with a local `imageSrc`.
- The component prefetches the preview image in a hidden `<div>` after mount (`isMounted`) to make the hover pop-up feel instant.
- Hover-driven: the preview only appears on `mouseenter`/hover and tracks cursor X via a spring, so it is primarily a desktop/pointer interaction; touch devices will not get the hover preview or cursor-tracking effect.
- Performance: no canvas/particles/three; the only motion is a single spring-animated `motion.div`, so it is lightweight.
- RTL: no special RTL handling; the preview is centered above the trigger (`side="top"`, `align="center"`) and works regardless of text direction.
