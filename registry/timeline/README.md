# Timeline

> A scroll-driven vertical timeline whose connecting line fills in (with a brand-coloured gradient) as you scroll through the entries.

## Install

```bash
npx shadcn@latest add @aceternity/timeline-demo
```

## What it is

`Timeline` renders a list of titled entries down a vertical rail, each with sticky titles and arbitrary `ReactNode` content. As the user scrolls, a gradient progress line animates from top to bottom in sync with scroll position, drawing the eye through the sequence. Use it for ordered, narrative content such as a delivery process, changelog, roadmap, or company history.

## Dependencies

- npm packages:
  - `motion` — imports `useScroll`, `useTransform`, `useMotionValueEvent`, and `motion` from `motion/react`.
  - `react` — `useEffect`, `useRef`, `useState`.
- Internal components: none (no `@/components/ui/...` imports, no `cn` helper).
- Tailwind config requirement: relies on the custom brand colours `najd-green` and `najd-blue` (used in the animated progress-line gradient `from-najd-green via-najd-blue to-transparent`). These must be defined in the Tailwind theme. No custom keyframes are required — animation is driven by `motion` scroll values, not CSS animations.

## Exports & Props

### `Timeline`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `TimelineEntry[]` | — | The list of timeline entries to render top-to-bottom. |

Where `TimelineEntry` is:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | The heading shown alongside the entry (sticky on desktop). |
| `content` | `React.ReactNode` | — | Arbitrary content rendered to the right of the title. |

## Usage

```tsx
import { Timeline } from "@/components/ui/timeline";

export default function DeliveryProcess() {
  const data = [
    {
      title: "Discovery",
      content: (
        <p className="text-sm text-neutral-800 dark:text-neutral-200">
          We map your requirements and define scope.
        </p>
      ),
    },
    {
      title: "Build",
      content: (
        <p className="text-sm text-neutral-800 dark:text-neutral-200">
          We design, develop, and iterate with you.
        </p>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
```

## Brand note

Used on the Najd AI Solutions site for the delivery-process section. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors — the animated progress line uses `from-najd-green via-najd-blue to-transparent` instead of the original purple/blue gradient.

## Notes

- Scroll-driven: the progress line animates from the page scroll position (`useScroll` with offset `["start 10%", "end 50%"]`), so it only animates while the section is in the scroll viewport. It will not animate inside a non-scrolling or fixed-height container.
- The rail height is measured from the DOM on mount via `getBoundingClientRect`; if entry content loads or resizes after mount (e.g. late-loading images), the line height may need a re-render to stay accurate.
- Mobile: titles render inline above each entry's content on small screens and become large sticky side titles at the `md` breakpoint and up.
- Supports light/dark mode out of the box via `dark:` utility classes on the rail and dot markers.
- RTL: not specifically handled; the rail is fixed to the left edge, so a right-to-left layout would need style overrides.
