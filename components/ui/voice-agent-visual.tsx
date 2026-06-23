"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SautNajdiLogo } from "@/components/ui/saut-najdi-logo";

/**
 * VoiceAgentVisual
 * ----------------
 * Saut Najdi's (صوت نجدي) flagship voice motif: a modern always-alive voice
 * mode surface, closer to ChatGPT / Claude / Gemini than a literal microphone.
 * It uses a breathing glass orb, the official Saut Najdi mark, gradient
 * plasma, concentric listening rings, and the official voice-pattern waves.
 *
 * SSR-safety:
 *   - No Math.random()/Date() anywhere that lands in SSR'd markup. Every
 *     value rendered into inline styles / SVG attributes is derived
 *     deterministically from the bar/ring index, so server and client
 *     produce byte-identical HTML (no hydration mismatch).
 *   - Motion props use deterministic timing by index.
 *
 * RTL symmetry:
 *   - The composition is perfectly mirror-symmetric about the vertical
 *     center axis and uses brand assets without horizontal directionality.
 *
 * Motion:
 *   - Honors the app-level reduced-motion setting from <Providers>.
 */

const RING_COUNT = 4;
const ORB_BLOB_COUNT = 5;

export function VoiceAgentVisual({ className }: { className?: string }) {
  const rings = Array.from({ length: RING_COUNT }, (_, i) => i);
  const blobs = Array.from({ length: ORB_BLOB_COUNT }, (_, i) => i);

  return (
    <motion.div
        className={cn(
          "relative isolate mx-auto flex aspect-square w-full max-w-md select-none items-center justify-center",
          className
        )}
        aria-hidden="true"
        animate={{ y: [0, -6, 0], scale: [1, 1.008, 1] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ambient brand glow behind everything. */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(46,196,230,0.24),transparent_58%)]"
          animate={{ scale: [0.98, 1.06, 1], opacity: [0.62, 0.92, 0.72] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute inset-[13%] rounded-full bg-[conic-gradient(from_90deg,rgba(46,196,230,0.24),rgba(91,108,229,0.2),rgba(226,12,58,0.22),rgba(46,196,230,0.24))] blur-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* Concentric listening rings. */}
        <div className="absolute inset-0 flex items-center justify-center">
          {rings.map((i) => {
            const size = 38 + (i * 62) / (RING_COUNT - 1 || 1);

            return (
              <motion.span
                key={i}
                className="absolute rounded-full border border-saut-cyan/25 bg-white/[0.015]"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  opacity: 0.55 - i * 0.09,
                }}
                animate={{
                  scale: [0.98, 1.055, 1],
                  opacity: [0.48 - i * 0.08, 0.16, 0.42 - i * 0.07],
                }}
                transition={{
                  duration: 5.8 + i * 0.7,
                  delay: i * 0.42,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Voice-mode orb: no literal microphone, just a breathing listening surface. */}
        <motion.div
          className="relative z-10 flex h-[44%] w-[44%] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.025] shadow-[0_0_0_1px_rgba(46,196,230,0.16),0_24px_90px_-20px_rgba(226,12,58,0.62)] backdrop-blur-sm"
          animate={{
            scale: [1, 1.045, 0.995, 1.02, 1],
            boxShadow: [
              "0 0 0 1px rgba(46,196,230,0.16), 0 24px 90px -20px rgba(226,12,58,0.62)",
              "0 0 0 1px rgba(255,255,255,0.22), 0 28px 110px -18px rgba(46,196,230,0.78)",
              "0 0 0 1px rgba(236,27,58,0.24), 0 26px 100px -18px rgba(236,27,58,0.72)",
              "0 0 0 1px rgba(46,196,230,0.16), 0 24px 90px -20px rgba(226,12,58,0.62)",
            ],
          }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {blobs.map((i) => (
            <motion.span
              key={i}
              className={cn(
                "absolute rounded-full blur-xl mix-blend-screen",
                i % 3 === 0 && "bg-saut-cyan/70",
                i % 3 === 1 && "bg-saut-purple/70",
                i % 3 === 2 && "bg-saut-red/70"
              )}
              style={{
                width: `${48 - i * 3}%`,
                height: `${44 + (i % 2) * 12}%`,
                left: `${18 + i * 11}%`,
                top: `${16 + (i % 3) * 18}%`,
              }}
              animate={{
                x: [0, i % 2 === 0 ? 12 : -10, 0],
                y: [0, i % 2 === 0 ? -8 : 10, 0],
                scale: [0.95, 1.14, 0.98],
                opacity: [0.42, 0.78, 0.5],
              }}
              transition={{
                duration: 6.4 + i * 0.52,
                delay: i * 0.26,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.div
            className="relative z-10 flex h-[72%] w-[72%] items-center justify-center"
            animate={{
              scale: [0.98, 1.04, 0.995, 1.02, 1],
              rotate: [0, -2.2, 1.2, 0],
              opacity: [0.92, 1, 0.96],
              filter: [
                "drop-shadow(0 0 10px rgba(46,196,230,0.36))",
                "drop-shadow(0 0 18px rgba(226,12,58,0.44))",
                "drop-shadow(0 0 12px rgba(111,63,164,0.38))",
              ],
            }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <SautNajdiLogo variant="mark" className="h-[82%] w-auto" />
          </motion.div>
        </motion.div>

        {/* Official Saut Najdi voice-pattern waves. */}
        <motion.div
          className="absolute bottom-[1%] left-1/2 z-10 w-[74%] -translate-x-1/2"
          animate={{
            y: [2, -3, 1],
            scaleX: [0.98, 1.025, 0.99],
            scaleY: [0.96, 1.04, 0.98],
            opacity: [0.66, 1, 0.74],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Crop offset is RESPONSIVE: translate percentages resolve against
              the image's own rendered box (X→its width, Y→its height), so the
              same slice of the wave pattern sits in the same spot at every
              scale (home max-w-md, the /saut-najdi hero, mobile) and in both
              locales — unlike the old fixed -166px/-222px which only matched
              one width. -50.15%/-86.72% reproduce the original home crop. */}
          <motion.img
            src="/brand/saut-najdi/voice-pattern.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute left-0 top-0 h-auto w-full -translate-x-[50.15%] -translate-y-[86.72%] select-none"
            animate={{
              filter: [
                "blur(0px) drop-shadow(0 0 8px rgba(46,196,230,0.35))",
                "blur(0.25px) drop-shadow(0 0 16px rgba(226,12,58,0.45))",
                "blur(0px) drop-shadow(0 0 10px rgba(111,63,164,0.35))",
              ],
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_58%,rgba(7,14,27,0.64)_78%)]" />
    </motion.div>
  );
}

export default VoiceAgentVisual;
