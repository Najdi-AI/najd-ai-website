# 3D Card Effect
> A card that tilts in 3D toward the cursor on hover, letting child elements float at different depths via CSS perspective.

## Install
```bash
npx shadcn@latest add @aceternity/3d-card-demo
```

## What it is
The 3D Card Effect is a set of composable wrapper components (`CardContainer`, `CardBody`, `CardItem`) that build an interactive, perspective-based card. As the cursor moves over the card, the container rotates on the X/Y axes to track the pointer, and each `CardItem` can be pushed forward (or rotated/translated) so its contents appear to float above the surface. Use it for hero cards, feature highlights, or pricing/engagement tiers where you want a tactile, depth-driven hover interaction.

## Dependencies
- npm packages: none beyond React. The component imports only `react` (`createContext`, `useState`, `useContext`, `useRef`, `useEffect`).
- Internal components: `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` class-name helper).
- Tailwind config: none required. The effect uses inline styles (`perspective`, `transformStyle: preserve-3d`) and arbitrary-value utilities (e.g. `[transform-style:preserve-3d]`) — no custom keyframes or theme extension are needed.

## Exports & Props

### `CardContainer`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Card content (typically a `CardBody`). |
| `className` | `string` | — | Classes for the inner transform wrapper (the element that rotates). |
| `containerClassName` | `string` | — | Classes for the outer perspective wrapper. |

### `CardBody`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | The card's contents (usually `CardItem`s). |
| `className` | `string` | — | Classes for the card surface; overrides the default `h-96 w-96` sizing. |

### `CardItem`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `React.ElementType` | `"div"` | Element/component to render the item as (e.g. `"p"`, `"a"`, `"button"`). |
| `children` | `React.ReactNode` | — | The floating element's content. |
| `className` | `string` | — | Additional classes for the item. |
| `translateX` | `number \| string` | `0` | X translation (px) applied while hovered. |
| `translateY` | `number \| string` | `0` | Y translation (px) applied while hovered. |
| `translateZ` | `number \| string` | `0` | Z translation (px) — controls how far the item floats above the card. |
| `rotateX` | `number \| string` | `0` | X rotation (deg) applied while hovered. |
| `rotateY` | `number \| string` | `0` | Y rotation (deg) applied while hovered. |
| `rotateZ` | `number \| string` | `0` | Z rotation (deg) applied while hovered. |
| `...rest` | `any` | — | Extra props are spread onto the rendered element (e.g. `href`, `target`, `onClick`). |

### `useMouseEnter`
| Returns | Type | Description |
| --- | --- | --- |
| `[isMouseEntered, setIsMouseEntered]` | `[boolean, React.Dispatch<React.SetStateAction<boolean>>]` | Hook exposing the container's hover state; must be called inside a `CardContainer`. |

## Usage
```tsx
"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function EngagementCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ={20} as="button" className="mt-6 px-4 py-2 rounded-xl text-xs font-bold">
          Sign up
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the engagement-tier cards. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors.

## Notes
- Pointer-driven only: the tilt responds to `mousemove`/`mouseenter`/`mouseleave`, so on touch devices there is no hover tilt — items render in their resting (un-translated) position. Ensure the card is still legible and usable without the effect.
- The default `CardBody` is `h-96 w-96`; pass a `className` (e.g. `w-auto h-auto sm:w-[30rem]`) to size it to your content.
- `CardItem` must be rendered inside a `CardContainer` — it calls `useMouseEnter`, which throws if used outside the provider.
- Transforms are written directly to `element.style.transform` via refs; avoid setting a conflicting inline `transform` on the same elements.
- The demo loads a remote Unsplash image; if you keep remote images, add the host to `next.config` `images.remotePatterns` (or use a plain `<img>`).
- Performance is light (CSS transforms, no canvas/particles/three), but `transition-all` on the rotating wrapper means many simultaneous cards on a page will each run transitions on every mouse move.
