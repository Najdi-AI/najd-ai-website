"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // One dot node per step so we can measure each dot's vertical position
  // within the beam container and light it up as the beam crosses it.
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = useState(0);
  // Vertical centre offset (px) of each dot, relative to the beam container.
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  // How many steps the beam's leading edge has reached. 0 on the server and
  // before any scroll, so the initial render is fully INACTIVE (no hydration
  // mismatch). Updated client-side from scroll progress.
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height);
      // Measure each dot's centre relative to the beam container's top so the
      // px comparison against the beam's filled height is apples-to-apples.
      const offsets = dotRefs.current.map((dot) => {
        if (!dot) return Number.POSITIVE_INFINITY;
        const dotRect = dot.getBoundingClientRect();
        return dotRect.top - rect.top + dotRect.height / 2;
      });
      setDotOffsets(offsets);
    };

    // Initial measure (after layout/fonts settle).
    measure();

    // Recompute when the content box resizes (layout/font shifts, responsive
    // breakpoints) so the beam height and dot offsets never go stale.
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measure());
      observer.observe(el);
    }
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start the beam EARLY: progress is 0 when the section top is ~80% down
    // the viewport (i.e. the section is just appearing from the bottom), and
    // reaches 1 when the section bottom is ~60% up the viewport (around the
    // last step). This makes the beam lead the reader down the steps.
    offset: ["start 80%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Drive per-step activation off the beam's filled pixel height. A step turns
  // on once the beam's leading edge crosses (passes) its dot centre, and stays
  // on. This is cheap: we only setState when the crossing count actually
  // changes, not on every scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!height || dotOffsets.length === 0) return;
    const filled = latest * height;
    let count = 0;
    for (const offset of dotOffsets) {
      if (filled >= offset) count += 1;
    }
    setActiveCount((prev) => (prev === count ? prev : count));
  });

  return (
    <div
      className="relative w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = index < activeCount;
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div
                  ref={(node) => {
                    dotRefs.current[index] = node;
                  }}
                  className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
                >
                  {/* Inner core: gray when waiting, brand-blue with a glow once
                      the beam's leading edge has crossed this dot. */}
                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.45, 1],
                            backgroundColor: "#2699d6",
                            borderColor: "#2699d6",
                            boxShadow:
                              "0 0 12px 2px rgba(38,153,214,0.85), 0 0 24px 6px rgba(38,153,214,0.45)",
                          }
                        : {
                            scale: 1,
                            backgroundColor: "rgba(38,42,55,1)",
                            borderColor: "rgba(64,64,64,1)",
                            boxShadow: "0 0 0 0 rgba(38,153,214,0)",
                          }
                    }
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      // Only the activation frame gets the sparkle pulse.
                      scale: { duration: 0.5, ease: "easeOut" },
                    }}
                    className="h-4 w-4 rounded-full border bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 p-2"
                  />
                </div>
                <motion.h3
                  initial={false}
                  animate={
                    isActive
                      ? {
                          color: "#ffffff",
                          textShadow: "0 0 18px rgba(38,153,214,0.55)",
                        }
                      : {
                          color: "#737373",
                          textShadow: "0 0 0px rgba(38,153,214,0)",
                        }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500"
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <motion.h3
                  initial={false}
                  animate={
                    isActive
                      ? {
                          color: "#ffffff",
                          textShadow: "0 0 14px rgba(38,153,214,0.5)",
                        }
                      : {
                          color: "#737373",
                          textShadow: "0 0 0px rgba(38,153,214,0)",
                        }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500"
                >
                  {item.title}
                </motion.h3>
                {item.content}{" "}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-najd-blue via-najd-blue to-transparent from-[0%] via-[10%] rounded-full"
          >
            {/* Soft glow riding the beam's leading edge. */}
            <span className="pointer-events-none absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-najd-blue blur-[6px] opacity-80" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
