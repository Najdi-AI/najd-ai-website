import * as React from "react";
import { Meteors } from "najd-ui";

export const LaunchAnnouncement = () => (
  <div
    style={{ position: "relative", height: "18rem", overflow: "hidden" }}
    className="w-full rounded-2xl border border-najd-blue/20 bg-najd-ink"
  >
    {/* Meteors start at top:-40px (above the container); the capture screenshots
        early, before they descend into view. Offset the layer down so the streaks
        sit inside the card and read as comets regardless of capture timing. */}
    <div
      className="pointer-events-none"
      style={{ position: "absolute", top: "64px", left: 0, right: 0, bottom: 0 }}
    >
      <Meteors
        number={30}
        className="h-1.5 w-1.5 bg-najd-blue-light before:h-0.5 before:w-20 before:from-najd-blue-light"
      />
    </div>
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-najd-blue/20 bg-najd-blue/10 px-3 py-1 text-xs font-semibold text-najd-blue">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-najd-blue" />
        Now live
      </span>
      <h2 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
        Real-time Arabic voice agents
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300">
        Saut Najdi answers calls in Najdi and Gulf dialects, around the clock.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-najd-blue px-5 py-2.5 text-sm font-semibold text-najd-ink">
        Hear a sample
      </button>
    </div>
  </div>
);
