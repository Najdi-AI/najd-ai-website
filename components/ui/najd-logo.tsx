import { cn } from "@/lib/utils";

/**
 * NajdLogo
 * --------
 * Renders the OFFICIAL Najd AI Solutions (حلول نجد) brand artwork from the
 * bundled assets in /brand/. Per the brand guidelines, never recreate, stretch,
 * recolor, rotate, distort, add a gradient to the flat lockup, or add effects —
 * this component only places the unmodified official assets, and only on
 * palette or black/white backgrounds.
 *
 * Variants:
 *   - 'lockup' (default): the full horizontal lockup — the kufic "حلول نجد"
 *       wordmark + "NAJD AI SOLUTIONS" subline + the NS symbol. Use theme="dark"
 *       (white reversed lockup) on dark surfaces, theme="light" (navy lockup)
 *       on light surfaces.
 *   - 'mark': the NS monogram symbol alone (N + S + ن + palm), with its intrinsic
 *       blue→navy gradient. Works on both light and dark surfaces.
 *
 * The lockups embed live text, so they render via a plain <img> (the browser
 * loads the SVG as its own document) rather than next/image.
 *
 * Plain, server-renderable — no client hooks, no motion.
 */

type NajdLogoVariant = "lockup" | "mark";
type NajdLogoTheme = "light" | "dark";

const ASSET_BASE = "/brand";

// Intrinsic aspect ratios of the source assets (used for sensible width/height
// so the <img> never causes layout shift).
const SIZES: Record<NajdLogoVariant, { width: number; height: number }> = {
  lockup: { width: 200, height: 78 },
  mark: { width: 96, height: 96 },
};

export function NajdLogo({
  variant = "lockup",
  theme = "dark",
  className,
}: {
  variant?: NajdLogoVariant;
  theme?: NajdLogoTheme;
  className?: string;
}) {
  const src =
    variant === "mark"
      ? `${ASSET_BASE}/logo-mark.svg`
      : theme === "light"
        ? `${ASSET_BASE}/logo-full-navy.png`
        : `${ASSET_BASE}/logo-lockup-white.svg`;

  const { width, height } = SIZES[variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Najd AI Solutions"
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("block h-auto w-auto select-none", className)}
    />
  );
}

export default NajdLogo;
