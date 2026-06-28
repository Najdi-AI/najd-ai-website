import * as React from "react";
import { SparklesCore } from "najd-ui";

export const SparkleHero = () => (
  <div
    style={{ position: "relative", height: "18rem", overflow: "hidden" }}
    className="w-full rounded-2xl border border-najd-blue/20 bg-najd-ink"
  >
    <SparklesCore
      id="sparkles-najd-hero"
      className="absolute inset-0 h-full w-full opacity-100"
      background="transparent"
      particleColor="#4db4e6"
      minSize={1.4}
      maxSize={3}
      particleDensity={700}
      speed={1.5}
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 65% 75% at 50% 50%, transparent 45%, rgba(7,14,27,0.55) 100%)",
      }}
    />
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
        Intelligence, <span className="text-gradient-najd">distilled</span>
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
        Frontier models tuned for Arabic, packaged into products your teams can
        actually ship.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-najd-blue px-5 py-2.5 text-sm font-semibold text-najd-ink">
        Explore the platform
      </button>
    </div>
  </div>
);
