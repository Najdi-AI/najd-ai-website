import * as React from "react";
import { TextHoverEffect } from "najd-ui";

// TextHoverEffect's outline stroke is hardcoded `dark:stroke-neutral-800`
// (near-invisible on the dark brand canvas) and its gradient fill only paints
// under the cursor on hover — neither of which a static screenshot can show.
// We mount it on a brand-blue plate so the engraved wordmark reads as a real,
// branded mark even at rest.
const Plate = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full items-center justify-center px-6 py-8">
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-2xl"
      style={{
        width: "100%",
        maxWidth: "30rem",
        height: "14rem",
        background:
          "linear-gradient(135deg, #2699D6 0%, #4db4e6 52%, #2699D6 100%)",
      }}
    >
      {children}
    </div>
  </div>
);

// `automatic` is passed per the design intent (show fill without a cursor),
// but the component declares the prop without consuming it — see learnings.
export const Wordmark = () => (
  <Plate>
    <TextHoverEffect text="NAJD" automatic />
  </Plate>
);

export const ArabicWordmark = () => (
  <Plate>
    <TextHoverEffect text="نجد" automatic />
  </Plate>
);
