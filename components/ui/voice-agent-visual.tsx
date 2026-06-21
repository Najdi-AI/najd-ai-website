"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * VoiceAgentVisual
 * ----------------
 * Saut Najdi's (صوت نجدي) flagship voice motif: a bespoke animated visual
 * evoking an AI voice agent — a central glowing mic/orb filled with the brand
 * SPECTRUM gradient (cyan -> blue -> purple -> magenta -> red), concentric
 * pulsing rings, and an animated equalizer/waveform of bars. The warm
 * magenta/red end is the strongest differentiator from the cool monochrome
 * navy/blue parent brand.
 *
 * SSR-safety:
 *   - No Math.random()/Date() anywhere that lands in SSR'd markup. Every
 *     value rendered into inline styles / SVG attributes is derived
 *     deterministically from the bar/ring index, so server and client
 *     produce byte-identical HTML (no hydration mismatch).
 *   - The only "randomness" lives inside motion `animate`/`transition`
 *     props (duration/delay), which are evaluated on the client after
 *     hydration and never serialized into the initial HTML.
 *
 * RTL symmetry:
 *   - The composition is perfectly mirror-symmetric about the vertical
 *     center axis: concentric rings are radial, and the equalizer bars
 *     are laid out symmetrically using a center-out index so the visual
 *     reads identically in LTR and RTL. No horizontal directionality.
 *
 * Reduced motion:
 *   - The app wraps the tree in <MotionConfig reducedMotion="user">, which
 *     already neutralizes transform/opacity keyframe loops for users who ask
 *     for it — the bars/rings/sonar simply hold at their deterministic
 *     resting state (the `style`/`initial` values are the SSR baseline).
 *   - We deliberately do NOT branch the DOM on useReducedMotion(): the hook
 *     returns false on the server and true on a reduced-motion client, so
 *     gating elements on it (e.g. the sonar pulse) changes the node tree
 *     between server and client and triggers a hydration mismatch. The SAME
 *     elements with the SAME `animate`/`transition` props are always rendered;
 *     MotionConfig handles the reduced-motion downgrade transparently.
 */

const BAR_COUNT = 13; // odd -> a true center bar, symmetric on both sides
const RING_COUNT = 3;

// Deterministic, center-symmetric resting height (in %) for each bar.
// Pure function of the index -> identical on server and client.
function barHeight(i: number): number {
  const center = (BAR_COUNT - 1) / 2;
  const dist = Math.abs(i - center) / center; // 0 at center, 1 at edges
  // Tallest in the middle, tapering to the edges. Deterministic.
  return Math.round(28 + (1 - dist) * 56); // 28%..84%
}

export function VoiceAgentVisual({ className }: { className?: string }) {
  const gradientId = useId();
  const glowId = useId();

  const bars = Array.from({ length: BAR_COUNT }, (_, i) => i);
  const rings = Array.from({ length: RING_COUNT }, (_, i) => i);

  return (
    <div
      className={cn(
        "relative isolate mx-auto flex aspect-square w-full max-w-md select-none items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      {/* Ambient brand glow behind everything — saut cyan lead hue */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(46,196,230,0.22),transparent_62%)]" />

      {/* Concentric pulsing rings (radial -> inherently symmetric) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {rings.map((i) => {
          // Deterministic per-ring size: 44% -> 100% of container.
          const size = 44 + (i * 56) / (RING_COUNT - 1 || 1);
          return (
            <motion.span
              key={i}
              className="absolute rounded-full border border-saut-cyan/30"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                // SSR-safe: opacity derived from index, not random.
                opacity: 0.5 - i * 0.12,
              }}
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.5 - i * 0.12, 0.12, 0.5 - i * 0.12],
              }}
              transition={{
                duration: 3.2 + i * 0.6,
                // delay is a transition prop -> client-only, safe to vary
                delay: i * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Expanding sonar pulse emitted from the orb.
          Always rendered (identical server/client DOM); MotionConfig
          neutralizes the loop for reduced-motion users, leaving it at the
          deterministic `initial` resting state. */}
      <motion.span
        className="absolute h-[44%] w-[44%] rounded-full border border-saut-cyan/40"
        initial={{ scale: 0.6, opacity: 0.6 }}
        animate={{ scale: 2.1, opacity: 0 }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Central glowing orb / mic — Saut Najdi spectrum gradient */}
      <motion.div
        className="relative z-10 flex h-[40%] w-[40%] items-center justify-center rounded-full bg-saut-gradient"
        style={{
          boxShadow:
            "0 0 0 1px rgba(46,196,230,0.18), 0 18px 60px -22px rgba(111,63,164,0.45)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0 1px rgba(46,196,230,0.18), 0 18px 60px -22px rgba(111,63,164,0.45)",
            "0 0 0 1px rgba(236,27,58,0.35), 0 24px 80px -18px rgba(236,27,58,0.65)",
            "0 0 0 1px rgba(46,196,230,0.18), 0 18px 60px -22px rgba(111,63,164,0.45)",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner sheen */}
        <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.35),transparent_55%)]" />

        {/* Mic glyph — symmetric, centered, no directionality */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="relative h-[46%] w-[46%] text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="24"
              y1="6"
              x2="24"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#e6f4fc" />
            </linearGradient>
          </defs>
          {/* Capsule mic body (symmetric about x=24) */}
          <rect
            x="18"
            y="6"
            width="12"
            height="22"
            rx="6"
            fill={`url(#${gradientId})`}
          />
          {/* Mic cradle */}
          <path
            d="M14 22a10 10 0 0 0 20 0"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Stand + base (centered) */}
          <path
            d="M24 32v6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M17 40h14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Animated equalizer / waveform — centered, mirror-symmetric */}
      <div className="absolute bottom-[12%] left-0 right-0 z-10 flex items-end justify-center gap-[2.2%]">
        {bars.map((i) => {
          const rest = barHeight(i); // deterministic resting height (%)
          // Deterministic peak for SSR-consistent layout; the lively
          // variation comes only from client-side transition timing.
          const peak = Math.min(96, rest + 18);
          return (
            <motion.span
              key={i}
              className="w-[2.4%] min-w-[3px] rounded-full bg-saut-gradient"
              style={{
                // SSR-safe initial height: deterministic per index.
                height: `${rest}%`,
                maxHeight: "34%",
                opacity: 0.85,
                // Paint the spectrum across the whole equalizer so the bars
                // collectively read as one continuous gradient (SSR-deterministic).
                backgroundSize: `${BAR_COUNT * 100}% 100%`,
                backgroundPosition: `${(i / (BAR_COUNT - 1)) * 100}% 50%`,
                filter: `drop-shadow(0 0 6px rgba(46,196,230,0.35))`,
              }}
              animate={{
                height: [`${rest}%`, `${peak}%`, `${rest}%`],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                // Client-only randomness: never serialized into SSR HTML.
                duration: 0.7 + Math.random() * 0.8,
                delay: Math.random() * 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Faint top vignette to seat the orb on the najd-ink backdrop */}
      <div
        id={glowId}
        className="pointer-events-none absolute inset-0 rounded-full [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_75%)]"
      />
    </div>
  );
}

export default VoiceAgentVisual;
