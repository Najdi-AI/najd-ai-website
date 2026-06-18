# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Bilingual (Arabic/English) marketing website for **Najd AI Solutions** (حلول نجد للذكاء الاصطناعي) —
a single long-form landing page. Next.js 14 App Router · React 18 · TypeScript (strict) · Tailwind v3 ·
`motion` (framer-motion v11) · Aceternity UI primitives recoloured to the brand.

## Commands

Package manager is **pnpm** (pinned to `pnpm@9.12.0` via `packageManager`). Do not use npm/yarn — the committed lockfile is `pnpm-lock.yaml`.

```bash
pnpm dev          # dev server at http://localhost:3000 (/ → /en)
pnpm build        # production build; SSGs /en, /ar, /en/saut-najdi, /ar/saut-najdi
pnpm start        # serve the production build
pnpm lint         # next lint
pnpm typecheck    # tsc --noEmit — the ONLY way to catch ar.ts drifting from the Dictionary type
```

- **There is no test suite** — no `test` script, no vitest/jest/playwright/cypress config, no `*.test.*`/`*.spec.*` in source. Don't run `pnpm test`. Verify changes with `pnpm typecheck` + `pnpm build` + a manual run.
- **Install-corruption gotcha:** if `pnpm dev` crashes with `MODULE_NOT_FOUND` for `node_modules/next/dist/bin/next`, the install is partial. Repair non-interactively: `CI=true pnpm install --config.confirmModulesPurge=false`.
- `@/*` resolves from the **repo root** (`tsconfig` `"@/*": ["./*"]`) — there is no `src/` dir.
- `next/image` throws for any remote host not in the 7-host allowlist in `next.config.mjs`; add the host there first.
- `pnpm lint` is lenient: `react-hooks/exhaustive-deps` is `warn`, and `no-img-element`/`no-unescaped-entities` are off.

## Architecture

### Routing & i18n (read `middleware.ts`, `lib/i18n/`, `app/[locale]/layout.tsx`, `components/providers.tsx`)

- **Locale is the first URL segment.** `locales = ['en','ar']`, `defaultLocale = 'en'` (`lib/i18n/config.ts`). `middleware.ts` redirects un-prefixed paths, choosing `ar` only when `Accept-Language` starts with/contains `ar` — **no cookie is set, preference is never persisted.** The matcher excludes `_next`, `/api`, and any dotted (static) path.
- **`app/[locale]/layout.tsx` IS the root HTML shell** — there is no `app/layout.tsx`. It renders `<html lang dir suppressHydrationWarning>` + `<body>` + `<Providers>`. Edit this file to change the global shell, fonts, or theme. All renderable *pages* live under `[locale]`; `app/api/` and `app/fonts/` sit outside it.
- **Copy data flow — two paths, no `t()` function:**
  - `content/dictionaries/en.ts` is the source of truth and **defines the type** (`export type Dictionary = typeof en`). `ar.ts` is typed `: Dictionary`, so it must match `en.ts` structurally — **adding a key to `en.ts` makes `tsc` fail until you add the Arabic value** (intended forcing function).
  - **Server** components (`layout.tsx`, `page.tsx`) call `getDictionary(locale)` directly. It is **synchronous** and `server-only` — never `await` it, never import it into a `'use client'` component.
  - **Client** components call `useI18n()` (from `components/providers.tsx`), returning `{ locale, dir, dict }`; it throws if used outside `<Providers>`. The server layout passes `locale/dir/dict` into `<Providers>` as plain props to seed the context.
- **Two-locale assumptions are hard-wired.** The language toggle (`components/site/language-switcher.tsx` + `otherLocale()`), the `'ar_SA' : 'en_US'` OG ternary, and `generateMetadata`'s `alternates.languages` map are all written for exactly en/ar (only `sitemap.ts` iterates `locales`). Adding a 3rd locale touches all of these. `app/[locale]/not-found.tsx` is English-only.

### Styling & brand (read `tailwind.config.ts`, `app/globals.css`)

- **Brand is navy/blue — there is no green.** `najd.*` tokens: `blue #2699d6` (primary), `blue-light/bright/deep`, `teal #215877`, `navy #172844`, `ink #070e1b`, etc.
- **Trap:** the string `tone: "green"` still appears throughout `content/dictionaries/*` and section components as a vestigial *tone label* that maps to **blue** classes. It is not a color and renaming it does nothing — don't be misled.
- Brand gradients are defined two different ways: `bg-najd-gradient` / `bg-najd-gradient-soft` are **Tailwind `backgroundImage` utilities** (in `tailwind.config.ts`, 135°); `.text-gradient-najd` / `.text-gradient-navy` are **hand-written `@layer` utilities** in `globals.css` (120°). Other custom utilities: `.glow-najd`, `.mask-fade-b`, `.no-scrollbar`.
- shadcn semantic tokens are HSL-triplet CSS vars; **dark is the default** (full `.dark` block in `globals.css`). next-themes runs `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}` — OS light/dark preference is ignored.
- **Font:** Thmanyah Sans is bundled (`app/fonts/thmanyahsans-*.woff2`, 5 weights) and loaded via `next/font/local` as `--font-thmanyah`. Tailwind `font-sans`, `font-arabic`, and `font-display` all alias to it.
- The `addVariablesForColors` Tailwind plugin exposes every color as a raw `--token` CSS var — **required** by Aceternity components that read CSS custom properties. A `matchUtilities` plugin provides `bg-grid` / `bg-dot` pattern utilities.

### Page composition & component layers (read `app/[locale]/page.tsx`, `components/sections/primitives.tsx`)

- The home page is a **server component** rendering a **hardcoded ordered stack of sections** inside `<main id="main">` (Navbar + FloatingNavDock before, Footer after). To add/reorder a section, edit `page.tsx` — there is no data-driven registry.
- **Flagship product — Saut Najdi (صوت نجدي):** the first content section after the Hero is the company's AI voice-agent product (`components/sections/flagship.tsx`, id `#product`). It also has a **dedicated page** at `app/[locale]/saut-najdi/page.tsx` (+ `saut-najdi-detail.tsx`). All its copy lives under `dict.product` (en/ar); `components/ui/voice-agent-visual.tsx` is its bespoke hero visual. Present it as *Saut Najdi by Najd AI Solutions* — the legacy/engineering name "Najdi AI" is not surfaced, and only verified claims are used (no unconfirmed metrics/pricing).
- `components/sections/` — the marketing sections (`'use client'`, pull copy via `useI18n()`, animate with `motion`).
- `components/sections/primitives.tsx` — shared building blocks (`Reveal`, `staggerContainer/Item`, `Eyebrow`, `GradientText`, `SectionHeader`, `SectionShell`). `SectionShell` hardcodes the section rhythm (`py-20 md:py-28`), container (`max-w-7xl px-5 sm:px-8`), and `scroll-mt-24` (anchor offset under the sticky nav).
- `components/site/` — chrome (navbar, footer, dock, switchers), all `'use client'` and scroll-reactive.
- `components/ui/` — the ~22 Aceternity UI primitives, brand-recoloured, client + motion-heavy. Imports are from **`motion/react`**, not `framer-motion`.
- **Anchor targets live in several independent places** — section `id`s (set inside each section / `SectionShell`), `dict.nav.links` (navbar), the `#contact` CTA in navbar/footer, and `FloatingNavDock`'s own href list. In-page anchors are rendered **locale-absolute** (`/${locale}#id`, via a `toHref` helper in `navbar.tsx`/`floating-nav-dock.tsx`) so they also work from sub-pages like `/saut-najdi`. Renaming a section `id` silently breaks nav in several spots (e.g. TechStack's id is `"stack"`, GeminiBand's is `"intelligence"`, the flagship's is `"product"`, and the MacBook dashboard preview is `"dashboard"`).

### Contact form & site config (read `app/api/contact/route.ts`, `lib/site.ts`)

- `POST /api/contact` validates (name ≥ 2, email regex, message ≥ 5; `company`/`interest` captured but not validated) then **delivers via Resend when `RESEND_API_KEY` is set** (recipient `CONTACT_INBOX` || `siteConfig.email`, sender `CONTACT_FROM`), and **falls back to `console.log`** with no key (so dev works with zero secrets). Delivery failures are caught + logged (lead never lost) but the client still gets `{ ok:true }`. The client response shape is stable `{ ok:true }` / `{ ok:false, errors }`. Env vars are documented in `.env.example`.
- `lib/site.ts` (`as const`) is the single source of truth for contact channels. Helpers: `whatsappLink()` (note `whatsappE164` is digits-only, no `+`), `mailtoLink()`; `tel:` links are built inline from `phoneE164` (which includes `+`).
- `siteConfig.url` is load-bearing for SEO in `robots.ts`, `sitemap.ts`, and the layout's `metadataBase`/OpenGraph — change the live domain in that one place.
- `cn()` (`lib/utils.ts`) = `clsx` + `tailwind-merge`, used everywhere for class composition.

## SSR / hydration rules (these are real bugs that were fixed — don't reintroduce)

The `[locale]` tree is server-rendered, so client primitives must produce identical markup on server and client:

- **Never put `Math.random()` / `Date` into a value that gets serialized into SSR'd inline `style` or attributes.** Seed deterministically by index (see `seeded()` in `components/ui/meteors.tsx`) or defer the whole component with `next/dynamic({ ssr: false })` (see `gemini-band.tsx`, `cover.tsx`). Random values passed to motion `animate`/`transition` props are fine (applied client-side after mount) — `background-beams.tsx`/`cover.tsx` rely on this; don't "fix" them.
- **Never nest a block element inside `<p>`/`<h1>`** (e.g. a `motion.div` inside `motion.p`) — the browser reparents it and hydration fails at the document root. `container-text-flip.tsx` uses `motion.div` for exactly this reason.
- **Arabic/RTL:** drop `uppercase`/letter-spacing for `locale === 'ar'` (see `Eyebrow`), and pass `animateLetters={dir !== 'rtl'}` to `ContainerTextFlip` — per-letter span splitting breaks Arabic cursive joining.

## Project subagents (`.claude/agents/`)

Five repo-specific subagents encode the invariants above and can be dispatched for focused work:
`najdweb-frontend` (sections/components), `najdweb-i18n` (en/ar dictionaries + Arabic copy),
`najdweb-motion-scroll` (scroll/animation/brand tokens + SSR-hydration), `najdweb-api` (route
handlers), and `najdweb-reviewer` (adversarial review, read-only).

## A note on history

The component **showcase + `registry/`** that older history referenced were extracted to a
separate site — `app/[locale]/components/`, `registry/`, `components/showcase/`, and `*-demo.tsx`
no longer exist. `components/ui/` now holds only the primitives this site actually uses.
