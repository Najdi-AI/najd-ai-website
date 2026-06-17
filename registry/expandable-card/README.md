# Expandable Cards

> A list of cards that expand into a centered modal with a shared-element (layout) animation when clicked.

## Install

```bash
npx shadcn@latest add @aceternity/expandable-card-demo-standard
```

## What it is

Expandable Cards renders a vertical list of compact cards (image, title, description, CTA button). Clicking a card animates it into a centered, full-detail modal using `motion`'s shared `layoutId` transitions, dims the rest of the page with a backdrop, and reveals the card's long-form content. The modal closes on `Escape`, on a click outside, or via the close button, and it locks body scroll while open. Use it for galleries, profiles, FAQs, or any "summary → details" list where a smooth expand-to-modal interaction is desired.

## Dependencies

- npm packages:
  - `react` (`useEffect`, `useId`, `useRef`, `useState`)
  - `motion` — imported from `motion/react` (`AnimatePresence`, `motion`)
- Internal components / hooks:
  - `@/hooks/use-outside-click` — `useOutsideClick` hook (closes the modal when clicking outside the active card). This file must be present in the project.
- Tailwind config: None required (no custom keyframes/animations; all motion is driven by `motion`).

## Exports & Props

This file is a self-contained demo. It exposes no configurable props — the card data is defined inline as a local `cards` array. Both exports below take no props.

### `ExpandableCardDemo` (default export)

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| —    | —    | —       | Takes no props. Renders the card list and the expand-to-modal interaction using the internal `cards` array. |

### `CloseIcon` (named export)

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| —    | —    | —       | Takes no props. An animated (`motion.svg`) X icon used as the mobile close button. |

Each entry in the internal `cards` array has the shape:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `title` | `string` | Card title (also used to build the shared `layoutId`s). |
| `description` | `string` | Short subtitle shown under the title. |
| `src` | `string` | Image URL shown in the card and the expanded modal. |
| `ctaText` | `string` | Label of the CTA button/link. |
| `ctaLink` | `string` | URL the CTA links to (opens in a new tab). |
| `content` | `() => React.ReactNode \| React.ReactNode` | Long-form body shown in the expanded modal; may be a node or a function returning a node. |

## Usage

```tsx
import ExpandableCardDemo from "@/components/expandable-card-demo-standard";

export default function Page() {
  return (
    <div className="py-10">
      <ExpandableCardDemo />
    </div>
  );
}
```

To customize the content, edit the inline `cards` array at the bottom of `expandable-card-demo-standard.tsx` (title, description, image `src`, `ctaText`, `ctaLink`, and `content`).

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The CTA in the expanded modal uses `bg-green-500`, and the list-card button uses `bg-gray-100` with `hover:bg-green-500 hover:text-white` — swap these for the Najd green/blue/navy as appropriate.

## Notes

- Remote images: the demo loads images from `https://assets.aceternity.com/...` via plain `<img>` tags. If you switch to Next.js `<Image>`, add the remote host to `next.config` `images.remotePatterns`. With the current `<img>` usage no domain allow-listing is required.
- Requires the `@/hooks/use-outside-click` hook to exist; the component will not compile without it.
- Body scroll is locked (`document.body.style.overflow = "hidden"`) while a card is expanded and restored to `auto` on close.
- Keyboard: `Escape` closes the modal; a `keydown` listener is attached to `window` while mounted.
- Mobile: the close (X) button is shown only below `lg`; on large screens the modal is dismissed via outside click or `Escape`. Cards stack vertically and switch to a row layout at `md`.
- RTL: not explicitly handled; the layout uses logical-agnostic Tailwind utilities (e.g. `right-2`, `text-left`) that may need adjustment for right-to-left content.
- Dark mode: supported via `dark:` variants (e.g. `dark:bg-neutral-900`).
