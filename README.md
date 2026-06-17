# Najd AI Solutions — Website

A bilingual (Arabic / English), dark, futuristic marketing website for **Najd AI Solutions**
(حلول نجد للذكاء الاصطناعي) — enterprise AI & intelligent infrastructure, built in Saudi Arabia for Vision 2030.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS v3**, and
**[motion](https://motion.dev)**, using **47 [Aceternity UI](https://ui.aceternity.com) components**
— all recoloured to the official Najd brand palette.

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000  (redirects to /en)
```

Other scripts:

```bash
pnpm build        # production build (SSG: /en, /ar + the component showcase)
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
```

The site defaults to **English** and detects Arabic from `Accept-Language`. Switch language any
time with the toggle in the nav. `/` redirects to `/en` (or `/ar`).

---

## What's inside

### The marketing site — `/[locale]`
A single long-form landing page composed of brand-aligned sections:

| Section | Aceternity component(s) |
|---|---|
| Hero | Background Beams · Cover · Container Text Flip |
| Brand band | Text Hover Effect |
| The Najd Advantage (vs. vendors) | Card Spotlight · Glowing Effect |
| Eight Divisions | Bento Grid |
| Product preview | MacBook Scroll |
| Service catalog (8 tabs, 22 services) | tabs + Card Spotlight |
| Engagement tiers | 3D Card · Background Gradient |
| Intelligence divider | Google Gemini Effect |
| Industries (12) | Canvas Reveal Effect |
| Delivery process | Timeline |
| Tech stack | Sticky Scroll Reveal |
| Vision 2030 | Lamp · Meteors |
| CTA | Background Gradient Animation |
| Contact | Input · Label · Stateful Button · Hover Border Gradient + working API |

### The component library — `/[locale]/components`
A showcase of **all 47 components**, each on its own isolated page with a live preview, the
install command, and a link to its docs. Performance-friendly: each demo is dynamically loaded
only on its own page.

### The docs/library folder — `registry/<slug>/`
Every component is also vendored here with its **full source code + a `README.md`** documenting
what it is, its dependencies, props, usage, and where it's used on the site — ready to copy into
any project. See [`registry/README.md`](./registry/README.md).

---

## Brand

The visual identity follows the official **Najd AI Solutions** brand guidelines:

- **Palette** — green `#2bb673`, blue `#2699D6`, teal `#215877`, navy `#0d2745`/`#172844`, ink `#050b16`.
- **Signature gradient** — green → teal → navy (`bg-najd-gradient`, `.text-gradient-najd`) representing *data → intelligence*.
- **Logo** — the gradient ح/ن symbol mark in `public/brand/` (used per guideline rules: no recolour/rotation/shadow on the mark).
- **Typography** — IBM Plex Sans (Latin) + IBM Plex Sans Arabic, a free, humanist match for the brand's *Thmanyah Sans* (which is proprietary and not bundled). Swap in licensed Thmanyah `woff2` files via `next/font/local` to match exactly.

Colours are defined once in `tailwind.config.ts` (`najd.*`) and `app/globals.css` (semantic
shadcn tokens for light + dark).

---

## Project structure

```
app/
  [locale]/            layout (root html/dir/fonts) · page (home) · components/ (showcase)
  api/contact/route.ts contact endpoint (ready to wire to email/CRM)
components/
  sections/            the marketing sections
  site/                navbar, footer, logo, dock, switchers
  showcase/            registry metadata, demo loader, showcase chrome
  ui/                  the 47 Aceternity components (brand-recoloured)
  *-demo.tsx           the component demos
content/dictionaries/  en.ts · ar.ts  (all copy; en.ts defines the Dictionary type)
lib/                   i18n config + dictionary loader, cn, site config
registry/<slug>/       per-component source + README docs
public/brand/          logos, patterns, dashboard mockup
```

## Internationalisation

- Locale lives in the URL (`/en`, `/ar`). `middleware.ts` redirects un-prefixed paths.
- `app/[locale]/layout.tsx` is the root layout and sets `<html lang dir>` per locale (RTL for Arabic).
- All copy is in `content/dictionaries/{en,ar}.ts`; `ar` is type-checked against the `Dictionary` shape inferred from `en`.

## Contact form

The form POSTs to `app/api/contact/route.ts`, which validates and currently logs the lead. Wire
real delivery (Resend / Slack / CRM) where indicated in that file — no keys are required for the
form to work today. WhatsApp / email / phone are configured in `lib/site.ts` (replace the
`PLACEHOLDER` values with the real business details).

## Deploy

Static-friendly (SSG). Deploy to Vercel (zero-config) or any Node host:
`pnpm build && pnpm start`. Set the real domain in `lib/site.ts` (`siteConfig.url`).

---

© 2026 Najd AI Solutions · Built for Vision 2030.
```
