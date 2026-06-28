import * as React from "react";
import { Soundwave } from "najd-ui";

const Stage = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex w-full max-w-xl flex-col items-center justify-center gap-4">
    {children}
    <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">
      {label}
    </div>
  </div>
);

// The default signature voiceprint — brand spectrum equalizer (24 bars, h-16).
export const Default = () => (
  <Stage label="Saut Najdi — voiceprint">
    <Soundwave />
  </Stage>
);

// A denser, taller cluster (48 bars) for wide hero bands.
export const Dense = () => (
  <Stage label="48 bars — dense">
    <Soundwave bars={48} className="h-24" />
  </Stage>
);

// A compact inline strip — fewer bars, shorter height.
export const Compact = () => (
  <Stage label="12 bars — compact">
    <Soundwave bars={12} className="h-12 max-w-xs" />
  </Stage>
);
