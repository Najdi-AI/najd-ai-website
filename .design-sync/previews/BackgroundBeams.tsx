import * as React from "react";
import { BackgroundBeams } from "najd-ui";

export const EnterpriseHero = () => (
  <div
    style={{ position: "relative", height: "21rem", overflow: "hidden" }}
    className="w-full rounded-2xl border border-najd-blue/20 bg-najd-ink"
  >
    <BackgroundBeams className="opacity-70" />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(38,153,214,0.16), transparent 60%)",
      }}
    />
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-najd-blue/20 bg-najd-blue/10 px-4 py-1.5 text-xs font-semibold text-najd-blue">
        Najd AI Solutions
      </span>
      <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
        Enterprise AI,{" "}
        <span className="text-gradient-najd">built for Arabic</span>
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
        Dialect-aware models, secure deployment, and real-time voice — engineered
        for Saudi enterprises and Vision 2030.
      </p>
      <button className="glow-najd mt-7 inline-flex items-center gap-2 rounded-full bg-najd-blue px-6 py-3 text-sm font-semibold text-najd-ink">
        Book a demo
      </button>
    </div>
  </div>
);
