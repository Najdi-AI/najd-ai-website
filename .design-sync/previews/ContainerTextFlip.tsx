import * as React from "react";
import { ContainerTextFlip } from "najd-ui";

// ContainerTextFlip cycles a word inside an animated "chip" that re-measures and
// re-sizes to each word. Shown here in its Arabic/RTL mode (animateLetters={false}
// so cursive joining is preserved) — the brand's bilingual headline pattern. It
// flips through `words` on `interval` in a live design; the card shows it at rest.
export const ArabicFlip = () => (
  <div
    dir="rtl"
    className="flex w-full max-w-2xl flex-col items-center gap-4 px-6 py-10 text-center"
  >
    <p className="text-2xl font-semibold text-white md:text-3xl">
      ذكاء اصطناعي عربي
    </p>
    <ContainerTextFlip
      words={["أذكى", "جاهزٌ للإنتاج", "بثقة"]}
      animateLetters={false}
      className="text-2xl md:text-4xl"
      textClassName="text-white"
    />
  </div>
);
