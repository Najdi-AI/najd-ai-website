# Najd AI Solutions — Website

A bilingual (Arabic / English), dark, futuristic marketing website for **Najd AI Solutions**
(حلول نجد للذكاء الاصطناعي) — enterprise AI & intelligent infrastructure, built in Saudi Arabia
for Vision 2030. The site leads with the company's flagship product, **Saut Najdi (صوت نجدي)** —
an Arabic-first AI voice agent.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS v3**, and
**[motion](https://motion.dev)**, with a set of [Aceternity UI](https://ui.aceternity.com)
primitives recoloured to the official Najd brand palette.

---

## Quick start

```bash
pnpm install      # pnpm only — the repo is pinned to pnpm@9.12.0
pnpm dev          # http://localhost:3000  (redirects to /en)
```

Other scripts:

```bash
pnpm build        # production build (SSG: /en, /ar, /en/saut-najdi, /ar/saut-najdi)
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit  (also the only check for en/ar dictionary parity)
pnpm lint         # next lint
```

The site defaults to **English** and detects Arabic from `Accept-Language`. Switch language any
time with the toggle in the nav. `/` redirects to `/en` (or `/ar`).

> If `pnpm dev` ever fails with `MODULE_NOT_FOUND` for `next/dist/bin/next`, the install is
> partial — repair it with `CI=true pnpm install --config.confirmModulesPurge=false`.

---

## What's inside

### The marketing site — `/[locale]`

A single long-form landing page composed of brand-aligned sections (in order): **Hero →
Saut Najdi flagship → Brand band → The Najd Advantage → Divisions → Dashboard preview →
Services → Tiers → Intelligence divider → Industries → Process → Tech stack → Vision 2030 →
CTA → Contact**.

### Flagship product — Saut Najdi (صوت نجدي)

Saut Najdi, Najd AI Solutions' Arabic-first AI voice agent, is featured as the flagship product:

- A prominent **home-page section** (`components/sections/flagship.tsx`, anchor `#product`,
  immediately after the Hero) — Arabic wordmark, tagline, a bespoke animated
  `VoiceAgentVisual`, a capabilities grid, and a "how a call flows" pipeline.
- A **dedicated product page** at **`/[locale]/saut-najdi`** (`app/[locale]/saut-najdi/page.tsx`
  + `components/sections/saut-najdi-detail.tsx`) — the full pitch: capabilities, pipeline,
  target industries, omnichannel (voice · WhatsApp · Telegram), and CTAs.

All product copy lives under `dict.product` in `content/dictionaries/{en,ar}.ts`. The product is
presented as *Saut Najdi by Najd AI Solutions* (the engineering/legacy name "Najdi AI" is not
surfaced in marketing).

---

## Brand

The visual identity follows the official **Najd AI Solutions** (Helol Najd) guidelines —
**navy + blue**:

- **Palette** (`tailwind.config.ts`, `najd.*`) — blue `#2699d6` (primary), blue-light `#4db4e6`,
  blue-deep `#0f6fae`, teal `#215877`, navy `#172844`, ink `#070e1b`.
- **Signature gradient** — `bg-najd-gradient` (blue → blue-deep → navy); plus the
  `.text-gradient-najd` / `.text-gradient-navy` text utilities in `app/globals.css`.
- **Logo** — the gradient mark/lockup in `public/brand/` (no recolour/rotation/shadow on the mark).
- **Typography** — **Thmanyah Sans** (Arabic + Latin), bundled in `app/fonts/` and loaded via
  `next/font/local` as `--font-thmanyah`. Dark is the default theme (next-themes, system
  preference disabled).

Semantic shadcn tokens (for `bg-background`, `text-foreground`, etc.) are defined as HSL CSS
variables in `app/globals.css`.

---

## Project structure

```
app/
  [locale]/            layout (root html/dir/fonts) · page (home) · saut-najdi/ (product page) · not-found
  api/contact/route.ts contact endpoint (env-driven Resend delivery, see below)
  robots.ts · sitemap.ts · globals.css · fonts/
components/
  sections/            the marketing sections (incl. flagship.tsx, saut-najdi-detail.tsx) + primitives.tsx
  site/                navbar, footer, logo, floating dock, switchers, icon registry
  ui/                  Aceternity primitives (brand-recoloured) + voice-agent-visual.tsx
content/dictionaries/  en.ts (defines the Dictionary type) · ar.ts (must mirror it)
lib/                   i18n config + dictionary loader, cn, site config
public/brand/          logos, patterns, dashboard mockup
.claude/agents/        repo-specific subagents (frontend, i18n, motion-scroll, api, reviewer)
```

## Internationalisation

- Locale lives in the URL (`/en`, `/ar`). `middleware.ts` redirects un-prefixed paths.
- `app/[locale]/layout.tsx` is the root layout and sets `<html lang dir>` per locale (RTL for Arabic).
- All copy is in `content/dictionaries/{en,ar}.ts`; `ar` is typed against the `Dictionary` shape
  inferred from `en`, so the two stay in lockstep (a missing key is a `tsc` error).

## Contact form

The form POSTs to `app/api/contact/route.ts`, which validates the submission and then:

- **Sends an email via [Resend](https://resend.com)** when `RESEND_API_KEY` is set — to
  `CONTACT_INBOX` (default `siteConfig.email`) from `CONTACT_FROM`.
- **Falls back to logging** the lead when no key is set, so the form works in dev with zero
  secrets. Delivery failures are logged (the lead is never lost) and never leak to the client.

Env vars are documented in `.env.example`. Business contact channels (email / phone / WhatsApp /
social) live in `lib/site.ts` — verify those values against the real business before launch.

## Deploy

Static-friendly (SSG). Deploy to Vercel (zero-config) or any Node host: `pnpm build && pnpm start`.
Set the real domain in `lib/site.ts` (`siteConfig.url` — it drives canonical URLs, the sitemap,
robots, and OpenGraph), and set `RESEND_API_KEY` to enable contact-form email.

---

© 2026 Najd AI Solutions · Built for Vision 2030.
```
