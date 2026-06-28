import * as React from "react";
import { VoiceAgentVisual } from "najd-ui";

// Saut Najdi's flagship voice motif: a breathing glass orb with the official
// mark, listening rings, and the brand voice-pattern waves. Hero visual — give
// it room and a caption.
export const VoiceMode = () => (
  <div className="flex w-full flex-col items-center justify-center gap-6 py-4">
    <VoiceAgentVisual className="max-w-sm" />
    <div className="text-center">
      <div className="text-lg font-bold text-white" dir="rtl">
        صوت نجدي
      </div>
      <div className="mt-1 text-sm text-neutral-400">
        Saut Najdi — real-time Arabic voice agent
      </div>
    </div>
  </div>
);
