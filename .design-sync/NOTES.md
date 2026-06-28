# design-sync NOTES — Najd AI Design System

Repo-specific gotchas and decisions for syncing `components/ui/` (brand primitives)
to claude.ai/design. Read this before any re-sync.

## What this sync is

- Source is a **Next.js 14 app**, NOT a published package. The "design system" is
  `components/ui/*.tsx` (~24 brand-recoloured Aceternity primitives). Synced in the
  converter's **synth-entry** mode.
- Project: **Najd AI Design System** (`46274735-ed74-4c1f-b3dc-c53534a7d11b`).
- Scope decision (user, 2026-06-28): `components/ui` only (not `components/sections`,
  which are i18n/Next-coupled page compositions). Preview depth: **rich previews for all**.

## Build mechanics (synth-entry on a Next app)

- Force synth mode + repoint PKG_DIR to the repo root with a **non-existent** `--entry`:
  `--entry ./__synth__.tsx`. The converter walks up from that path to the repo
  `package.json`, finds no dist, and synthesizes the entry from `components/ui/*.tsx`.
- `cfg.tsconfig = .design-sync/tsconfig.dssync.json` (self-contained, `baseUrl: ".."`)
  drives the esbuild path-alias plugin so `@/*` resolves to repo files and
  **`next/dynamic` is redirected to `.design-sync/shims/next-dynamic.tsx`** (a React.lazy
  passthrough — cover.tsx & card-spotlight.tsx use next/dynamic, both hover-gated).
- **Dark canvas:** site is `darkMode: "class"`, dark-by-default. Previews mount under
  `DarkRoot` (from `.design-sync/shims/dark-wrapper.tsx`, added via `cfg.extraEntries`,
  wired as `cfg.provider`) → a `<div class="dark">` that paints the brand dark bg and
  sets `--font-thmanyah`.
- **CSS:** `node .design-sync/build/build-css.mjs` compiles `font-faces.css + app/globals.css`
  through the site's Tailwind config (content widened to previews/shims) → `ds.compiled.css`,
  pointed at by `cfg.cssEntry`. Re-run build-css whenever globals.css, tokens, or previews
  change, THEN rebuild the bundle. (This is `cfg.buildCmd`.)
- **Fonts** ship via `@font-face` embedded in the compiled cssEntry (woff2 in
  `.design-sync/build/fonts/`); the converter extracts them into the bundle's `fonts/`.

## Brand identity (authoritative — from "Helol najd GUidlinen new.pdf", 26pp)

- **Only TWO brand colors are numerically specified:** Navy **#172844**, Blue **#2699D6**.
  Both match repo tokens `najd.navy` / `najd.blue` exactly. Everything else
  (`najd.teal/ink/indigo`, `blue-light/bright/deep`) is a **site extension** (defensible
  tints/shades), NOT a brand-PDF value — present as such, never as "official brand color".
- **No green.** Palette is navy + blue only.
- **Typeface:** brand guide uses **only Thmanyah Sans** (humanist sans). The site likewise
  aliases font-sans/arabic/display all to `--font-thmanyah` (sans). The full Thmanyah
  family folder the user provided also has **Serif Display** + **Serif Text**; we ship
  Serif Display as an OPTIONAL `--font-thmanyah-display` (not core brand type). Serif Text
  is not shipped.
- **Logo:** NS monogram = N + S + Arabic nūn (ن) + palm/sadu motif; symbol has an intrinsic
  blue→navy gradient. Full lockup = kufic "حلول نجد" (navy) + "NAJD AI SOLUTIONS" subline +
  NS symbol. Web-ready assets already in `public/brand/` (logo-mark.svg, logo-full-*.png,
  logo-lockup-white.svg, pattern-1/2.svg) and `public/brand/saut-najdi/`.
- **Logo rules:** clearspace 6x/2x (lockup) / 1x (symbol); 6 don'ts (no rotate, distort,
  recolor, retype, add-gradient-to-flat-logo, add-shadow); use only on palette or B&W bgs.
- **Pattern:** geometric interlocking sadu "chain" derived from the logo (pattern-1/2.svg).
- **Voice pillars:** innovation, precision, professionalism, Saudi-rooted. No tagline.
- Name forms: **Najd AI Solutions** / **حلول نجد** (prominent word نجد). The Saut Najdi
  product is a separate sub-brand — NOT referenced in the Najd PDF; don't conflate.
- Brand guide gives NO spacing scale, grid, radii, type scale, or motion — those are
  site-originated, not "from brand". Mark as such in conventions.

## Build gotchas (hard-won — re-sync will hit these)

- **tsconfig.dssync.json must contain NO `//` comments and NO `"//"` key.** The converter's
  comment-stripper (`bundle.mjs` tsconfigPathsPlugin) naively regex-strips `//`, which mangles
  a `"//"` JSON key and makes `JSON.parse` throw → the paths plugin **silently returns null** →
  the `@react-three/fiber` / `three` / `next/dynamic` shims don't apply (esbuild then bundles the
  real three.js → `[SCHEDULER_MISSING]` crash on every preview). Keep that file pure JSON.
- **three.js is stubbed out.** `@react-three/fiber` → `shims/r3f-stub.tsx`, `three` →
  `shims/three-stub.ts` (tsconfig paths). Only `canvas-reveal-effect.tsx` used them; it's a WebGL
  effect that can't statically preview and dragged react-reconciler+scheduler in (the scheduler-shim
  throws by design). `CanvasRevealEffect` is excluded (componentSrcMap null). Bundle 3.3MB → 1.2MB.
- **Render check uses system Chrome:** set `DS_CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`
  before `package-validate.mjs` / `package-capture.mjs`. The `playwright` driver is installed in
  `.ds-sync` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` (no 200MB chromium download).
- **http-serve.mjs MIME patch:** the staged `.ds-sync/storybook/http-serve.mjs` ships a MIME map
  missing `.svg`/`.woff2`/etc., so logo `<img>`s and fonts serve as `application/octet-stream` and
  render BROKEN in the local render check (the real claude.ai/design env serves correct MIMEs, so
  designs are fine). After re-copying `.ds-sync` on a fresh re-sync, re-add svg/png/jpg/woff2/woff/
  ttf/otf to the `MIME` object (line ~12). Without it the logo previews look broken.
- **Brand assets:** `node .design-sync/build/post-build.mjs` copies `public/brand/**` →
  `ds-bundle/brand/**` so NajdLogo/SautNajdiLogo/VoiceAgentVisual `<img src="/brand/...">` resolve.
  package-build WIPES ds-bundle, so run post-build after EVERY full build (NOT needed after
  preview-rebuild). **The upload plan writes MUST include `brand/**`** so logos work in real designs.
- **NajdLogo** is a repo component added for this sync (`components/ui/najd-logo.tsx`), mirroring the
  existing SautNajdiLogo — parent-brand logo (variant lockup/mark, theme light/dark). Typechecks clean.

## Full rebuild recipe (orchestrator)

```
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./__synth__.tsx --out ./ds-bundle
node .design-sync/build/post-build.mjs
$env:DS_CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"; node .ds-sync/package-validate.mjs ./ds-bundle
```
(Re-run `node .design-sync/build/build-css.mjs` first if globals.css / tokens / previews changed.)

## Preview authoring (wave learnings, folded from subagents)

- **Compiled CSS is frozen during preview authoring.** `preview-rebuild.mjs` does NOT rescan
  Tailwind; only a `build-css.mjs` + full `package-build` (orchestrator) regenerates `ds.compiled.css`
  from the now-existing previews. So any class a preview introduces that the site/components don't
  already use renders UNSTYLED until the orchestrator recompiles. Subagents verified classes against
  the served `_ds_bundle.css` and used INLINE styles for dimensions/arbitrary values. The final
  orchestrator recompile (scans `.design-sync/previews/**`) closes the gap — re-capture after it.
  Classes confirmed ABSENT from the site scan (need safelist or inline): opacity color variants like
  `text-white/70` / `border-najd-blue/20`, `ring-1`, `list-disc`, `object-cover`, `!`-important and
  any `[arbitrary]` value, `h-20`/`h-28` on some wrappers.
- **Capture settles animations now (patched).** `package-capture.mjs` + `package-validate.mjs` add a
  `waitForTimeout` after `settle()` so framer-motion entrance animations (opacity/blur/strokeDashoffset
  fades) progress before the screenshot — without it ContainerTextFlip's word, StickyScroll's text,
  Meteors' streaks, and TextHoverEffect's stroke captured on their invisible initial frame. These are
  STAGED-script patches (re-apply after re-copying `.ds-sync` on re-sync; see http-serve note above).
- **Component-specific preview overrides discovered:**
  - SparklesCore preview must pass `opacity-100` (the wrapper ships `opacity-0` + a JS fade-in gate).
  - `cfg.overrides.StickyScroll = {cardMode:"single", viewport:"1280x900"}` — its brand panel is
    `hidden lg:block` (needs ≥lg viewport) and its text fades in (needs the settle wait).
  - LampContainer / BackgroundGradientAnimation default to viewport sizing — size via
    `min-h-0 h-full` + an inner `absolute inset-0` container.
  - 3D card: `containerClassName="!py-0"` ... actually `!` is unreliable — use inline style; override
    CardBody's default `h-96 w-96` with `h-auto w-full max-w-sm`. Tilt can't show statically.
  - TextHoverEffect: the gradient FILL is hover-only and its `automatic` prop is dead code in source;
    the outline draws via strokeDashoffset (pass a small `duration` so it completes within the settle
    wait). Renders fully (animated) in the live design pane regardless.

## Known render warns

- TextHoverEffect / StickyScroll / Meteors / ContainerTextFlip are animation-gated — they render
  fully in the LIVE design pane; the static grading screenshot needed the capture settle-wait patch.
  Re-check the review sheets after the patched re-capture; anything still partial is a static-only
  limitation graded on composition.

## Re-sync risks

- `ds.compiled.css` is a generated artifact (gitignored); always re-run `build-css.mjs`
  before rebuilding so token/util changes in globals.css propagate.
- Serif Display @font-face references fonts copied from G:\…\Thmanyah-Font-Family — they're
  committed under `.design-sync/build/fonts/`, so a fresh clone is self-contained.
- Heavy deps (three.js via canvas-reveal-effect, @tsparticles via sparkles) only mount on
  hover in their parents; standalone previews of those two may need static-friendly handling.
