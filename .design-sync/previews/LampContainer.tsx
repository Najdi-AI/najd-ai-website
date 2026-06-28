import * as React from "react";
import { LampContainer } from "najd-ui";

export const VisionLamp = () => (
  <div
    style={{ position: "relative", height: "24rem", overflow: "hidden" }}
    className="w-full rounded-2xl border border-najd-blue/20"
  >
    <LampContainer className="min-h-0 h-full rounded-2xl">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-najd-blue/20 bg-najd-blue/10 px-4 py-1.5 text-xs font-semibold text-najd-blue">
        Najd AI Solutions
      </span>
      <h2 className="max-w-2xl text-center text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
        Vision 2030,{" "}
        <span className="text-gradient-najd">powered by AI</span>
      </h2>
      <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-neutral-300">
        Sovereign, Arabic-first AI built for Saudi Arabia&apos;s next decade.
      </p>
    </LampContainer>
  </div>
);
