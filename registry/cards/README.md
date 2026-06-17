# Feature Block Card

> A bordered feature card with a title, description, and an animated skeleton header that pulses a row of AI-provider logos behind a radial-mask gradient.

## Install

```bash
npx shadcn@latest add @aceternity/cards-demo-3
```

## What it is

`CardDemo` composes a small set of primitives (`Card`, `CardTitle`, `CardDescription`, `CardSkeletonContainer`) into a feature-highlight card. The skeleton header renders five circular logo "chips" (Claude, GitHub Copilot, OpenAI, Meta, Gemini) that loop a staggered scale/translate animation, with a vertical sparkle beam sweeping across them. Use it to showcase a tool, integration set, or product capability in a marketing or features grid. The card is dark-mode aware out of the box.

## Dependencies

- npm packages:
  - `motion` (imports `animate` and `motion` from `motion/react`)
  - `react-icons` (imports `GoCopilot` from `react-icons/go`)
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
  - All other pieces (`Card`, `CardTitle`, `CardDescription`, `CardSkeletonContainer`, plus the `Skeleton`, `Sparkles`, `Container`, `ClaudeLogo`, `OpenAILogo`, `GeminiLogo`, `MetaIconOutline` helpers) are defined inline in this file — there is no separate `components/ui/cards.tsx`.
- Tailwind config requirement:
  - Relies on an `animate-move` utility (custom keyframes/animation) for the vertical sparkle beam. Add a `move` keyframe + `animate-move` animation to your Tailwind config if it is not already present.

## Exports & Props

### `CardDemo` (default export)

No props. Renders a ready-made example card.

### `Card`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the card wrapper. |
| `children` | `React.ReactNode` | — | Card contents. |

### `CardTitle`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Title text. |
| `className` | `string` | — | Extra classes merged onto the `<h3>`. |

### `CardDescription`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Description text. |
| `className` | `string` | — | Extra classes merged onto the `<p>`. |

### `CardSkeletonContainer`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the container. |
| `children` | `React.ReactNode` | — | Skeleton content (e.g. `<Skeleton />`). |
| `showGradient` | `boolean` | `true` | When true, applies the radial-mask gradient background. |

### Logo exports

`ClaudeLogo`, `OpenAILogo`, `GeminiLogo`, `MetaIconOutline` — each accepts a single optional `className?: string` prop and renders an inline SVG.

## Usage

```tsx
import {
  Card,
  CardTitle,
  CardDescription,
  CardSkeletonContainer,
} from "@/components/ui/cards";

export function Example() {
  return (
    <Card>
      <CardSkeletonContainer>{/* <Skeleton /> */}</CardSkeletonContainer>
      <CardTitle>Damn good card</CardTitle>
      <CardDescription>
        A card that showcases a set of tools that you use to create your product.
      </CardDescription>
    </Card>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The skeleton beam uses `via-cyan-500`, and the provider-logo SVGs carry their own brand fills (Claude `#CC9B7A`, Meta blues, Gemini gradient) — swap or recolour these to stay on-brand.

## Notes

- The looping logo animation and sparkle field run continuously (`repeat: Infinity`) via `motion`'s `animate` and `motion.span`, so the card is always animating while mounted — keep the count of cards per page reasonable for performance.
- Requires the custom Tailwind `animate-move` utility for the sparkle beam; without it the beam will not move.
- Marked `"use client"` — it must run as a Client Component.
- No remote image domains needed; all logos are inline SVGs.
- Not scroll-driven; the animation is time-based, not tied to page scroll.
- RTL: layout is `flex-row` with no logical-direction handling, but the content is symmetric/visual so RTL has no special caveats.
