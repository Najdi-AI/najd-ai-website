import * as React from "react";
import { useMotionValue } from "motion/react";
import { GoogleGeminiEffect } from "najd-ui";

// The component animates five SVG beams by their `pathLength` MotionValues.
// On the live site these are driven by scroll (gemini-band.tsx); here we seed
// five static values in the 0.4–0.8 band so the beams render visibly drawn.
export const IntelligenceConnected = () => {
  const v0 = useMotionValue(0.78);
  const v1 = useMotionValue(0.66);
  const v2 = useMotionValue(0.54);
  const v3 = useMotionValue(0.46);
  const v4 = useMotionValue(0.4);

  return (
    <div className="relative w-full" style={{ height: 600 }}>
      <GoogleGeminiEffect
        pathLengths={[v0, v1, v2, v3, v4]}
        title="Najd AI"
        description="Intelligence, connected — from model to product."
      />
    </div>
  );
};
