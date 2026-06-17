# Floating Dock
> A macOS-style dock of icon links where the icon under the cursor magnifies, with a collapsible mobile variant.

## Install
```bash
npx shadcn@latest add @aceternity/floating-dock-demo
```

## What it is
`FloatingDock` renders a horizontal row of icon links that smoothly scale up based on the cursor's distance, mimicking the macOS dock magnification effect. Each item shows a tooltip with its title on hover. On mobile it collapses into a single toggle button that expands the links vertically. Use it for a compact, eye-catching quick-navigation bar, typically positioned fixed at the bottom of the page.

## Dependencies
- npm packages:
  - `motion` (imported from `motion/react`: `AnimatePresence`, `MotionValue`, `motion`, `useMotionValue`, `useSpring`, `useTransform`)
  - `@tabler/icons-react` (the component imports `IconLayoutNavbarCollapse`; the demo also uses several other `Icon*` icons)
  - `react` (`useRef`, `useState`)
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
- Tailwind config: none required (no custom keyframes/animations; all motion is driven by the `motion` library).

## Exports & Props

### `FloatingDock`
Renders both the desktop and mobile docks. (`FloatingDockDesktop`, `FloatingDockMobile`, and `IconContainer` are internal and not exported.)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ title: string; icon: React.ReactNode; href: string }[]` | — | The dock entries: tooltip title, icon node, and link target. |
| `desktopClassName` | `string` | — | Extra classes applied to the desktop dock container. |
| `mobileClassName` | `string` | — | Extra classes applied to the mobile dock container. |

## Usage
```tsx
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconTerminal2, IconNewSection } from "@tabler/icons-react";

export default function Example() {
  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "Products", icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "Components", icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
  ];

  return (
    <div className="flex h-[35rem] w-full items-center justify-center">
      <FloatingDock items={links} />
    </div>
  );
}
```

## Brand note
Used on the Najd AI Solutions site for the floating quick-nav. This library copy is recoloured to the Najd brand palette (green #2bb673 / blue #2699d6 / teal #215877 / navy #0d2745) where the component had hardcoded colors.

## Notes
- Positioning: the component does not set `position: fixed` itself. Per the source note, wrap or class it as fixed — desktop is best at the bottom-center, mobile at the bottom-right.
- Responsive: the desktop dock is `hidden md:flex` and the mobile dock is `block md:hidden`, so exactly one shows per breakpoint. On mobile the dock is a collapse button that expands links vertically.
- Performance: magnification uses per-icon `useTransform` + `useSpring` driven by `onMouseMove`. The effect is pointer-based and has no effect on touch/mobile (no hover), so the mobile variant is static.
- Navigation uses plain `<a href>` tags (full-page navigation), not Next.js `<Link>` — swap if client-side routing is needed.
- Remote images: if an item's `icon` is an `<img>` from a remote host (as in the demo's `assets.aceternity.com` logo), allow that domain in your image config.
- RTL: no explicit RTL handling; the tooltip is centered (`left-1/2`, `x: -50%`) so it works in either direction, but the icon order follows the `items` array.
