# Najd AI Solutions — Brand Guidelines (حلول نجد)

Authoritative summary distilled from the official *Najd AI Solutions Logo Usage Guidelines*
(26pp) plus the implementation in this design system. Use this when building on-brand UI.

> Two sources of truth are flagged throughout: **[BRAND]** = stated in the official guideline;
> **[SYSTEM]** = a design-system extension (defensible, but not a brand-spec value — don't present
> it as an "official brand color").

---

## 1. Colours

The brand palette is deliberately tight: **navy + blue, no green.**

| Token | Hex | Role | Source |
|---|---|---|---|
| `najd-navy` | **#172844** | Primary navy — wordmark, deep backgrounds | **[BRAND]** |
| `najd-blue` | **#2699D6** | Primary blue — the "pop"/accent, the NS symbol | **[BRAND]** |
| `najd-blue-light` | #4DB4E6 | Lighter blue (gradients, hovers) | [SYSTEM] |
| `najd-blue-bright` | #0098DD | Saturated blue accent | [SYSTEM] |
| `najd-blue-deep` | #0F6FAE | Mid blue (gradient stop) | [SYSTEM] |
| `najd-teal` | #215877 | Muted teal-navy | [SYSTEM] |
| `najd-indigo` | #28295F | Deep indigo accent | [SYSTEM] |
| `najd-navy-deep` / `najd-ink` | #0F1F38 / #070E1B | Near-black canvas backgrounds | [SYSTEM] |

**Gradients:** blue → navy. The NS symbol carries an intrinsic top-right(blue) → bottom-left(navy)
gradient. System gradients: `bg-najd-gradient` (135°, #2699D6 → #0F6FAE → #172844) and
`bg-najd-gradient-soft` (#4DB4E6 → #2699D6). **[BRAND]** misuse rule: never *add* a gradient to the
flat logo/wordmark — the gradient belongs to the supplied symbol artwork only.

**Backgrounds: [BRAND]** the logo may only sit on palette colours or black/white. **Dark is the
product default** (this DS ships dark-first; the navy `#070E1B`/`#0F1F38` canvas).

> The Saut Najdi product sub-brand has its own warmer **spectrum** palette (cyan→blue→purple→
> magenta→red, `saut-*` tokens). It is a separate identity — do NOT mix it into the parent Najd
> navy/blue brand. Use `saut-*` only for Saut Najdi (صوت نجدي) surfaces.

---

## 2. Typography

- **[BRAND]** Single typeface: **Thmanyah** (humanist sans serif; broad Latin + Arabic). The DS
  exposes it as `--font-thmanyah` (Tailwind `font-sans` / `font-arabic` / `font-display`).
- **[SYSTEM]** The full Thmanyah family also ships **Thmanyah Serif Display** as an optional
  editorial/display serif via `--font-thmanyah-display`. Use sparingly for large headlines; Sans is
  the default everywhere.
- Weights: 300 / 400 / 500 / 700 / 900.
- **[SYSTEM]** No brand-defined type scale — use a sensible UI scale. For Arabic/RTL, set
  `dir="rtl"` and avoid per-letter text splitting (it breaks Arabic cursive joining).

---

## 3. Logo

- **Composition [BRAND]:** the **NS monogram** = Latin **N** + **S** + Arabic **nūn (ن)** + a
  **palm / sadu motif**, fused into one geometric mark with the blue→navy gradient.
- **Full lockup:** kufic **"حلول نجد"** wordmark (navy) + **"NAJD AI SOLUTIONS"** subline + a small
  diamond tick + the NS symbol.
- **Use the `NajdLogo` component** (this DS): `variant="lockup"|"mark"`, `theme="light"|"dark"`.
  On dark surfaces use `theme="dark"` (white reversed lockup); on light use `theme="light"` (navy).
  The `mark` variant is the standalone NS symbol.
- **Clearspace [BRAND]:** lockup 6x / 2x; symbol 1x (x = a logo-derived unit).
- **The 6 don'ts [BRAND]:** don't (1) rotate, (2) distort proportions, (3) recolour, (4) change the
  typography, (5) add a gradient to the flat logo, (6) add drop shadows/effects. Always use the
  supplied artwork. (The `NajdLogo`/`SautNajdiLogo` components place the unmodified official assets.)

---

## 4. Pattern & imagery

- **[BRAND]** Brand texture: a geometric interlocking **sadu "chain"** derived from the logo
  geometry (`/brand/pattern-1.svg`, `/brand/pattern-2.svg`) — blue-on-light or navy-on-light.
- **[BRAND]** Imagery direction: corporate-tech — glowing blue holographic dashboards/data, cool
  blue tones, local Saudi framing. Pairs with the "Year of AI 2026" national mark in co-branding.

---

## 5. Voice & naming

- **[BRAND]** Positioning pillars: **innovation, precision, professionalism, Saudi-rooted.**
  ("building integrated intelligent systems … strong local roots within the Saudi market.")
- No official tagline.
- **Name forms:** English **Najd AI Solutions**; Arabic **حلول نجد** (prominent word **نجد**).
  Present the company as *Najd AI Solutions / حلول نجد*. The flagship voice-agent product is
  *Saut Najdi (صوت نجدي) by Najd AI Solutions*.
