import { cn } from "@/lib/utils";

/**
 * SautNajdiLogo
 * -------------
 * Renders the OFFICIAL Saut Najdi (صوت نجدي) brand artwork from the bundled
 * SVG files in /brand/saut-najdi/. Never recreate, stretch, recolor, rotate,
 * or add effects to the logo — this component only places the unmodified
 * official assets.
 *
 * Variants:
 *   - 'lockup' (default): the near-square stacked logo lockup (viewBox
 *       0 0 792 612, ≈1.29:1). Renders logo-dark.svg on a dark surface
 *       (theme="dark") or logo-light.svg on a light surface (theme="light").
 *       These lockups embed LIVE Latin "SAUT NAJDI" text set in Thmanyah Bold,
 *       so they are rendered via a plain <img> (the browser loads the SVG as
 *       its own document and uses any available system font) rather than
 *       next/image, whose sandbox/CSP pipeline would strip the embedded
 *       styling.
 *   - 'mark': the gradient squircle app-icon (app-icon.svg). This file is made
 *       of PURE PATHS (no text), so it always renders faithfully — the
 *       font-safe choice for tight spaces, favicons, and avatars.
 *
 * This is a plain (server-renderable) component — no client hooks, no motion —
 * so it is safe to import from server or client trees.
 */

type SautNajdiLogoVariant = "lockup" | "mark";
type SautNajdiLogoTheme = "light" | "dark";

const ASSET_BASE = "/brand/saut-najdi";

// Intrinsic aspect ratios of the source SVGs, used to give the <img> sensible
// width/height so it never causes layout shift. Both the lockups and the
// app-icon mark share the 792x612 viewBox (≈1.29:1, near-square) — the
// width/height below MUST match that ratio or the image aspect-snaps on load.
const SIZES: Record<
  SautNajdiLogoVariant,
  { width: number; height: number }
> = {
  lockup: { width: 156, height: 120 },
  mark: { width: 96, height: 74 },
};

export function SautNajdiLogo({
  variant = "lockup",
  theme = "dark",
  className,
}: {
  variant?: SautNajdiLogoVariant;
  theme?: SautNajdiLogoTheme;
  className?: string;
}) {
  const src =
    variant === "mark"
      ? `${ASSET_BASE}/app-icon.svg`
      : theme === "light"
        ? `${ASSET_BASE}/logo-light.svg`
        : `${ASSET_BASE}/logo-dark.svg`;

  const { width, height } = SIZES[variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Saut Najdi"
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("block h-auto w-auto select-none", className)}
    />
  );
}

export default SautNajdiLogo;
