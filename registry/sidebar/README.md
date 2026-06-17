# Sidebar

> An animated, collapsible navigation sidebar that expands on hover (desktop) and slides in as a full-screen overlay (mobile).

## Install

```bash
npx shadcn@latest add @aceternity/sidebar-demo
```

## What it is

`Sidebar` is a context-driven navigation primitive. On desktop it renders a vertical rail that animates its width between collapsed (`60px`) and expanded (`300px`) as the user hovers, fading link labels in and out. On mobile it collapses to a small bar with a hamburger toggle that opens a full-screen sliding panel. Use it for app shells, dashboards, and admin layouts where you want a space-efficient nav that reveals labels on demand.

## Dependencies

- npm packages:
  - `react` (uses `useState`, `createContext`, `useContext`)
  - `motion` (imported from `motion/react` — `motion`, `AnimatePresence`)
  - `@tabler/icons-react` (`IconMenu2`, `IconX`; the demo also uses `IconArrowLeft`, `IconBrandTabler`, `IconSettings`, `IconUserBolt`)
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
- Tailwind config requirement: none (no custom keyframes/animations required).

## Exports & Props

### `Sidebar`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Sidebar content (typically `SidebarBody`). |
| `open` | `boolean` | — | Controlled open state. Falls back to internal state if omitted. |
| `setOpen` | `React.Dispatch<React.SetStateAction<boolean>>` | — | Setter for controlled open state. |
| `animate` | `boolean` | `true` (via `SidebarProvider`) | Whether the width/label animation runs. |

### `SidebarProvider`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Wrapped tree that consumes the sidebar context. |
| `open` | `boolean` | — | Controlled open state; falls back to internal `useState(false)`. |
| `setOpen` | `React.Dispatch<React.SetStateAction<boolean>>` | — | Setter for controlled open state. |
| `animate` | `boolean` | `true` | Enables the expand/collapse animation. |

### `SidebarBody`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `React.ComponentProps<typeof motion.div>` | — | Spread to both `DesktopSidebar` (`motion.div`) and `MobileSidebar` (`div`). Accepts `className`, `children`, etc. |

### `DesktopSidebar`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the rail. |
| `children` | `React.ReactNode` | — | Sidebar content. |
| `...props` | `React.ComponentProps<typeof motion.div>` | — | Additional `motion.div` props. Animates width on hover via context. |

### `MobileSidebar`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes merged onto the sliding overlay panel. |
| `children` | `React.ReactNode` | — | Overlay content. |
| `...props` | `React.ComponentProps<"div">` | — | Additional `div` props for the mobile bar. |

### `SidebarLink`
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `link` | `Links` (`{ label: string; href: string; icon: React.JSX.Element \| React.ReactNode }`) | — | The link's label, href and icon. |
| `className` | `string` | — | Extra classes merged onto the anchor. |
| `...props` | anchor props | — | Spread onto the underlying `<a>`. |

### `useSidebar()`
Hook returning `{ open, setOpen, animate }`. Throws if called outside a `SidebarProvider` / `Sidebar`.

## Usage

```tsx
"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconBrandTabler, IconSettings } from "@tabler/icons-react";

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
  ];

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
      {/* page content */}
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The source hardcodes neutral/`bg-neutral-100` / `dark:bg-neutral-800` backgrounds and `text-neutral-700/800` link colors — swap these for brand tokens as needed.

## Notes

- **Mobile vs desktop:** `SidebarBody` renders both `DesktopSidebar` (visible `md:` and up, hover-driven width) and `MobileSidebar` (visible below `md`, hamburger toggle opening a `z-[100]` full-screen overlay). Both are always mounted.
- **Controlled state:** Pass `open`/`setOpen` to control externally, or omit them to use the built-in `useState(false)`.
- **Hover behaviour:** The desktop rail expands on `mouseenter` and collapses on `mouseleave`, so it is not keyboard/touch-toggleable on desktop — consider this for accessibility.
- **RTL:** The mobile overlay slides in from the left (`x: "-100%"` → `0`). For RTL layouts you may want to flip the entry direction.
- **Remote images:** The demo references `https://assets.aceternity.com/manu.png`; if you use Next.js `<Image>` add the domain to `next.config` (the source itself uses a plain `<img>`).
- **Accessibility:** `SidebarLink` renders a bare `<a>`; mobile toggle handlers live on `div`s with `onClick` only.
