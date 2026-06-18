"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Driven by PAGE scroll over the section's own height (no inner scrollbar /
  // nested-scroll trap). The section is tall; the right-hand panel is sticky.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress (0..1) across the section onto the card index. Using
    // cardLength (not cardLength - 1) keeps the demo's "closest breakpoint"
    // feel while reading correctly across the whole scroll range.
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

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
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative rounded-md"
    >
      <div className="mx-auto flex max-w-5xl justify-center gap-10 px-4 py-12 lg:px-10">
        {/* Text column scrolls naturally with the page. */}
        <div className="relative flex w-full items-start lg:w-1/2">
          <div className="w-full max-w-2xl">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                // Each block gives one card a tighter slice of page scroll and
                // vertically centers its copy, so the active item sits next to
                // the pinned panel without a large void above/below it. Tuned
                // down from 42vh (which left the section reading sparse).
                className="flex min-h-[26vh] flex-col justify-center py-6"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="mt-4 max-w-sm text-foreground/70"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky brand panel — pins within the section as the text scrolls.
            Sizes to its content (min-h-60) instead of a fixed h-72 that left the
            lower half empty. Pins at a fixed top-28 (predictable, under the
            navbar) so the sticky math stays robust. */}
        <div className="hidden lg:block lg:w-1/2">
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              "sticky top-28 min-h-52 w-full overflow-hidden rounded-md bg-najd-ink",
              contentClassName,
            )}
          >
            {content[activeCard].content ?? null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
