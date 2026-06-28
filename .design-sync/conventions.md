# Najd AI Design System — building with these components

The **Najd AI Solutions (حلول نجد)** brand UI: brand-recoloured primitives + effects, dark-first,
Tailwind-styled, Thmanyah typeface. Build on-brand screens by composing the components below and
styling your own layout with the brand Tailwind utilities. Read the brand reference in `guidelines/`
(start at `guidelines/index.md`) for the full brand rules (colours, logo usage, voice).

## Setup — wrap every screen in the dark brand theme

The system is **dark-by-default** (Tailwind `darkMode: "class"`). The brand theme tokens
(`--background`, `--foreground`, `--primary`, …) are defined under a `.dark` ancestor, and the
brand typeface comes from `--font-thmanyah`. So mount each screen inside a dark, branded root:

```jsx
<div className="dark min-h-screen bg-najd-ink font-sans text-foreground">
  {/* compose components here */}
</div>
```

Without the `dark` class the components fall back to their light theme and look off-brand. Load
`styles.css` (it `@import`s the brand tokens, the Thmanyah `@font-face`s, and the component CSS).

## Styling idiom — Tailwind utilities + brand tokens

Layout/spacing/typography use **standard Tailwind** (`flex`, `grid`, `gap-6`, `rounded-xl`,
`text-2xl`, `font-bold`, `text-neutral-300`, …). Brand colour comes from these utilities (every
colour also works with `bg-`, `text-`, `border-`, `ring-`, `from-`, `to-` prefixes and `/10`-`/90`
opacity modifiers):

| Utility | Meaning |
|---|---|
| `bg-najd-blue` `text-najd-blue` `border-najd-blue` | Primary blue **#2699D6** (the accent) |
| `bg-najd-navy` `text-najd-navy` | Primary navy **#172844** |
| `najd-ink` `najd-navy-deep` | Near-black canvas backgrounds (#070E1B / #0F1F38) |
| `najd-blue-light` `najd-blue-bright` `najd-blue-deep` `najd-teal` | Supporting blues |
| `bg-najd-gradient` `bg-najd-gradient-soft` | Brand blue→navy gradients |
| `text-gradient-najd` `text-gradient-navy` | Gradient text (headlines) |
| `glow-najd` | Subtle brand glow shadow |
| `font-sans` (= `--font-thmanyah`) | Thmanyah Sans — the brand typeface |

**No green.** Stay in the navy/blue family. There are no CSS-module class names to import — style
via these utilities (or the components' own props). For Arabic, set `dir="rtl"` and avoid
per-letter text effects (they break Arabic joining). The separate warm `saut-*` spectrum tokens are
ONLY for the Saut Najdi (صوت نجدي) product sub-brand — don't use them for parent-Najd surfaces.

## Where the truth lives

- `styles.css` and its `@import` closure (`fonts/fonts.css` + `_ds_bundle.css`, which carries the
  brand tokens, the `.dark` theme block, and every brand utility) — the full token + font +
  component-style set. Read it before styling.
- Each component's `<Name>.d.ts` (its prop contract) and `<Name>.prompt.md` (usage).
- `guidelines/` (see `index.md`) — the brand reference: colours, logo rules, the 6 logo don'ts, voice, naming.
- Brand logos render via `NajdLogo` / `SautNajdiLogo` (`variant="lockup"|"mark"`,
  `theme="light"|"dark"`) — they place the official artwork; never recreate or recolour it.

## One idiomatic example

```jsx
import { BentoGrid, BentoGridItem, NajdLogo } from "najd-ui";

export default function Services() {
  return (
    <div className="dark min-h-screen bg-najd-ink font-sans text-foreground p-10">
      <NajdLogo variant="lockup" theme="dark" className="h-12 w-auto" />
      <h1 className="mt-8 text-4xl font-bold">
        Enterprise AI, <span className="text-gradient-najd">built for Arabic</span>
      </h1>
      <BentoGrid className="mt-8">
        <BentoGridItem
          title="Arabic NLP"
          description="Dialect-aware LLMs tuned for Gulf Arabic."
          header={<div className="h-24 w-full rounded-xl bg-najd-gradient" />}
          className="md:col-span-2"
        />
        <BentoGridItem
          title="Saut Najdi"
          description="Real-time Arabic voice agents."
          header={<div className="h-24 w-full rounded-xl bg-gradient-to-br from-najd-navy to-najd-ink" />}
        />
      </BentoGrid>
    </div>
  );
}
```
