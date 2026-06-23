import { cn } from "@/lib/utils";

/**
 * SautNajdiLogo
 * -------------
 * Renders the OFFICIAL Saut Najdi (صوت نجدي) brand artwork from the bundled
 * assets in /brand/saut-najdi/. Never recreate, stretch, recolor, rotate,
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
 *   - 'mark': the open-circle waveform symbol as a transparent PNG exported
 *       from the official guideline artwork.
 *
 * This is a plain (server-renderable) component — no client hooks, no motion —
 * so it is safe to import from server or client trees.
 */

type SautNajdiLogoVariant = "lockup" | "mark";
type SautNajdiLogoTheme = "light" | "dark";

const ASSET_BASE = "/brand/saut-najdi";

// Intrinsic aspect ratios of the source assets, used to give the <img> sensible
// width/height so it never causes layout shift.
const SIZES: Record<
  SautNajdiLogoVariant,
  { width: number; height: number }
> = {
  lockup: { width: 156, height: 120 },
  mark: { width: 1024, height: 1024 },
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
      ? `${ASSET_BASE}/mark-guideline.png`
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
