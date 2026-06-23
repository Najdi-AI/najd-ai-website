"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Soundwave
 * ---------
 * The Saut Najdi (صوت نجدي) signature motif: an animated equalizer /
 * voiceprint of vertical rounded bars filled with the brand SPECTRUM
 * gradient (cyan -> blue -> purple -> magenta -> red). This is THE device of
 * the flagship sub-brand and should read as Saut Najdi, not the cool
 * monochrome parent.
 *
 * SSR-safety:
 *   - Every value that lands in serialized markup (each bar's resting height,
 *     its slice of the spectrum gradient) is a PURE function of the bar index.
 *     Server and client render byte-identical HTML — no hydration mismatch.
 *   - Animation timing is deterministic by index, so the motion reads as a
 *     coordinated voice wave without introducing server/client drift.
 *
 * RTL-safety / symmetry:
 *   - The bar layout is mirror-symmetric about the vertical center axis
 *     (resting heights computed center-out), and the gradient is painted across
 *     the whole cluster so the spectrum reads identically regardless of writing
 *     direction. No horizontal directionality.
 *
 * Motion:
 *   - Honors the app-level reduced-motion setting from <Providers>.
 *
 * Pure divs + Tailwind. The spectrum is achieved by giving every bar the same
 * full-width `bg-saut-gradient` with a background-size spanning the whole
 * cluster and a per-bar background-position, so the bars collectively form one
 * continuous left-to-right spectrum.
 */

// Deterministic, center-symmetric resting height (in %) for a bar.
// Pure function of (index, total) -> identical on server and client.
function barHeight(i: number, total: number): number {
  const center = (total - 1) / 2;
  const dist = center === 0 ? 0 : Math.abs(i - center) / center; // 0 center .. 1 edge
  // A gently undulating, symmetric profile: tall-ish center, soft secondary
  // lobes, tapering edges. Deterministic and smooth.
  const lobe = 0.5 + 0.5 * Math.cos(dist * Math.PI * 1.6);
  return Math.round(26 + lobe * 60); // ~26%..86%
}

// Deterministic peak height for the active (pulsing) state.
function barPeak(rest: number): number {
  return Math.min(100, rest + 28);
}

// Deterministic trough height for the quiet part of the wave.
function barTrough(rest: number): number {
  return Math.max(18, rest - 24);
}

// Symmetric delay from the center outward, so the wave has motion without
// implying a left-to-right or right-to-left reading direction.
function barDelay(i: number, total: number): number {
  const center = (total - 1) / 2;
  return Math.abs(i - center) * 0.045;
}

export function Soundwave({
  className,
  bars = 24,
}: {
  className?: string;
  bars?: number;
}) {
  const count = Math.max(1, Math.floor(bars));
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      className={cn(
        "flex h-16 w-full items-center justify-center gap-[2px] sm:gap-[3px]",
        className
      )}
      aria-hidden="true"
    >
      {items.map((i) => {
        const rest = barHeight(i, count); // deterministic resting height (%)
        const peak = barPeak(rest); // deterministic peak (%)
        const trough = barTrough(rest); // deterministic trough (%)
        // Per-bar slice of the cluster-wide spectrum so all bars together read
        // as one continuous gradient. Deterministic -> SSR-safe.
        const pos = count <= 1 ? 50 : (i / (count - 1)) * 100;

        return (
          <motion.span
            key={i}
            className="block w-[2px] min-w-[2px] flex-1 origin-center rounded-full bg-saut-gradient sm:w-[3px]"
            style={{
              maxWidth: 6,
              height: `${rest}%`,
              // Paint the full spectrum across the whole cluster; each bar shows
              // only its own slice via background-position. SSR-deterministic.
              backgroundSize: `${count * 100}% 100%`,
              backgroundPosition: `${pos}% 50%`,
            }}
            animate={{
              height: [
                `${rest}%`,
                `${peak}%`,
                `${trough}%`,
                `${Math.min(100, rest + 18)}%`,
                `${rest}%`,
              ],
              opacity: [0.62, 1, 0.72, 0.95, 0.66],
              scaleY: [0.9, 1.18, 0.78, 1.08, 0.92],
            }}
            transition={{
              duration: 1.35,
              delay: barDelay(i, count),
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.28, 0.55, 0.78, 1],
            }}
          />
        );
      })}
    </div>
  );
}

export default Soundwave;
