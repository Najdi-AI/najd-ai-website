// Design-sync Tailwind config: reuses the site's real theme/plugins (brand
// tokens, fonts, animations, addVariablesForColors, bg-grid/bg-dot) and only
// widens `content` to also scan the authored previews + shims, so utilities
// they use are emitted into the compiled bundle stylesheet.
import base from "../../tailwind.config";

const config = {
  ...base,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./.design-sync/previews/**/*.{ts,tsx}",
    "./.design-sync/shims/**/*.{ts,tsx}",
  ],
  // Insurance so authored preview cards render styled even if they reach for a
  // brand utility the marketing site doesn't already use (the content scan
  // covers the rest). Opacity modifiers (e.g. /10) come from the site scan.
  safelist: [
    "text-gradient-najd",
    "text-gradient-navy",
    "text-gradient-saut",
    "glow-najd",
    "bg-najd-gradient",
    "bg-najd-gradient-soft",
    "bg-saut-gradient",
    "bg-saut-dot",
    "mask-fade-b",
    {
      pattern:
        /^(bg|text|border|ring|from|via|to|fill|stroke|shadow|decoration)-najd-(blue|blue-light|blue-bright|blue-deep|indigo|teal|navy|navy-2|navy-deep|ink|ink-2)$/,
      variants: ["hover", "focus", "dark", "group-hover"],
    },
    {
      pattern:
        /^(bg|text|border|ring|from|via|to)-saut-(cyan|blue|purple|magenta|red|charcoal|navy|offwhite|silver)$/,
      variants: ["hover", "focus"],
    },
  ],
};

export default config;
