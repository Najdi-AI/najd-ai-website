import * as React from "react";

// Provider wrapper applied to every preview (cfg.provider → DarkRoot).
// The Najd site is dark-by-default (Tailwind `darkMode: "class"`), so previews
// must mount under a `.dark` ancestor for the brand `.dark` CSS-variable theme
// and all `dark:` utilities to activate. This also paints the brand dark canvas
// and sets Thmanyah Sans as the default family so unclassed text is on-brand.
export function DarkRoot({ children }: { children?: React.ReactNode }) {
  return React.createElement(
    "div",
    {
      className: "dark",
      style: {
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontFamily: "var(--font-thmanyah)",
        padding: "1.5rem",
        borderRadius: "0.75rem",
      },
    },
    children,
  );
}
