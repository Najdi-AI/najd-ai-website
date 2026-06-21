"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// Shared transition so the left text and the right card swap with the EXACT
// same easing/duration — every topic transitions identically (no jank/jump).
const SYNC_TRANSITION = { duration: 0.4, ease: [0.21, 0.5, 0.3, 1] as const };

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  // SSR-safe initial state: server and client both render index 0.
  const [activeCard, setActiveCard] = useState(0);

  // The sticky panel; its on-screen center is the "focus line".
  const panelRef = useRef<HTMLDivElement>(null);
  // One ref per left text block; we pick the block whose center is nearest
  // the panel's center. This is pixel-accurate and decoupled from the section
  // header height, padding and uneven block heights (the old uniform
  // `index / cardLength` split mismatched because the sticky panel pins at
  // top-28 — not at the section top — and the header sits above).
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);

  // All geometry is measured in useEffect (never during render) so the SSR
  // markup is deterministic and matches the client's first paint.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const panel = panelRef.current;
      if (!panel) return;

      // The focus line = vertical center of the (sticky) panel in viewport
      // coords. Using the panel's live rect auto-accounts for the top-28 pin,
      // the panel height, the header above, and any padding — no magic numbers.
      const panelRect = panel.getBoundingClientRect();
      const focusY = panelRect.top + panelRect.height / 2;

      let nearestIndex = 0;
      let nearestDistance = Infinity;
      blockRefs.current.forEach((block, index) => {
        if (!block) return;
        const rect = block.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - focusY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      // Functional update + identical-value guard: no needless re-renders.
      setActiveCard((prev) => (prev === nearestIndex ? prev : nearestIndex));
    };

    const onScroll = () => {
      // rAF-throttle: at most one measure per frame on scroll/resize.
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Initial sync after mount/layout.
    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [content.length]);

  // On-brand navy/blue palette (najd-ink / navy / blue) — replaces the
  // Aceternity demo slate/black/neutral + cyan/pink/orange gradients.
  const backgroundColors = [
    "#070e1b", // najd-ink
    "#0f1f38", // najd-navy-deep
    "#172844", // najd-navy
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #2699d6, #0f6fae)", // najd-blue -> najd-blue-deep
    "linear-gradient(to bottom right, #0f6fae, #172844)", // najd-blue-deep -> najd-navy
    "linear-gradient(to bottom right, #4db4e6, #0f1f38)", // najd-blue-light -> najd-navy-deep
  ];

  const backgroundGradient =
    linearGradients[activeCard % linearGradients.length];

  return (
    // Tall outer section: its height is what the page scrolls through.
    // `relative` keeps it a positioned scroll/layout container.
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={SYNC_TRANSITION}
      className="relative rounded-md"
    >
      <div className="mx-auto flex max-w-5xl justify-center gap-10 px-4 py-12 lg:px-10">
        {/* Text column scrolls naturally with the page. */}
        <div className="relative flex w-full items-start lg:w-1/2">
          <div className="w-full max-w-2xl">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                // Each block gives one card a tighter slice of page scroll and
                // vertically centers its copy, so the active item sits next to
                // the pinned panel without a large void above/below it.
                className="flex min-h-[26vh] flex-col justify-center py-6"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  transition={SYNC_TRANSITION}
                  className="text-2xl font-bold text-foreground"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  transition={SYNC_TRANSITION}
                  className="mt-4 max-w-sm text-foreground/70"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky brand panel — pins within the section as the text scrolls.
            Pins at a fixed top-28 (predictable, under the navbar) so the sticky
            math stays robust. The gradient + content crossfade in sync with the
            left text, keyed on activeCard, so every topic swaps identically. */}
        <div className="hidden lg:block lg:w-1/2">
          <motion.div
            ref={panelRef}
            animate={{ background: backgroundGradient }}
            transition={SYNC_TRANSITION}
            className={cn(
              "sticky top-28 grid min-h-52 w-full overflow-hidden rounded-md bg-najd-ink",
              contentClassName,
            )}
          >
            {/* Overlapping crossfade keyed on activeCard: the outgoing and
                incoming cards share one grid cell (col/row 1) so they stack and
                truly cross-fade over the SAME 0.4s window as the left text —
                synced, no instant swap, no jump. Grid (vs absolute) keeps the
                in-flow layers contributing height, so the panel still sizes to
                its content instead of collapsing to min-h-52. */}
            <AnimatePresence initial={false}>
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={SYNC_TRANSITION}
                className="col-start-1 row-start-1 h-full w-full"
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
