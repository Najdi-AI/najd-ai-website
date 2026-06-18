"use client";

import { motion, useReducedMotion } from "motion/react";
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
 *   - The only non-deterministic values (animation duration/delay jitter) live
 *     exclusively inside motion `transition` props, which are applied on the
 *     client after mount and are never serialized into the initial HTML.
 *
 * RTL-safety / symmetry:
 *   - The bar layout is mirror-symmetric about the vertical center axis
 *     (resting heights computed center-out), and the gradient is painted across
 *     the whole cluster so the spectrum reads identically regardless of writing
 *     direction. No horizontal directionality.
 *
 * Reduced motion:
 *   - The app wraps the tree in <MotionConfig reducedMotion="user">; we also
 *     read useReducedMotion() to render a calm static voiceprint (bars at their
 *     resting heights, no pulsing) so it looks intentional, not frozen.
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
  return Math.min(100, rest + 16);
}

export function Soundwave({
  className,
  bars = 24,
}: {
  className?: string;
  bars?: number;
}) {
  const reduce = useReducedMotion();
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
        // Per-bar slice of the cluster-wide spectrum so all bars together read
        // as one continuous gradient. Deterministic -> SSR-safe.
        const pos = count <= 1 ? 50 : (i / (count - 1)) * 100;

        return (
          <motion.span
            key={i}
            className="block w-[2px] min-w-[2px] flex-1 rounded-full bg-saut-gradient sm:w-[3px]"
            style={{
              maxWidth: 6,
              height: `${rest}%`,
              // Paint the full spectrum across the whole cluster; each bar shows
              // only its own slice via background-position. SSR-deterministic.
              backgroundSize: `${count * 100}% 100%`,
              backgroundPosition: `${pos}% 50%`,
            }}
            animate={
              reduce
                ? undefined
                : {
                    height: [`${rest}%`, `${peak}%`, `${rest}%`],
                    opacity: [0.78, 1, 0.78],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    // Client-only jitter: never serialized into SSR HTML.
                    duration: 0.7 + Math.random() * 0.7,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }
            }
          />
        );
      })}
    </div>
  );
}

export default Soundwave;
