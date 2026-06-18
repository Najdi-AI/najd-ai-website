"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

// Deterministic pseudo-random in [0, 1) seeded by n. Identical on the server and
// the client, so the per-meteor inline styles below stay stable across hydration
// (Math.random() here caused a "server HTML didn't match" hydration error).
const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: (seeded(idx) * 5).toFixed(2) + "s", // 0-5s, stable per index
              animationDuration: Math.floor(seeded(idx + 1) * 5 + 5) + "s", // 5-9s, stable per index
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
