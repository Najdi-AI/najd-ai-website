// Stub for @react-three/fiber (mapped in tsconfig.dssync.json paths). The only
// consumer is canvas-reveal-effect.tsx, a WebGL effect that (a) can't render in
// a static design tool and (b) drags three.js + react-reconciler + scheduler
// into every design's bundle. We stub it so three.js stays out; the real effect
// is hover-only inside CardSpotlight and is never rendered in previews.
import * as React from "react";

export const Canvas = (_props: any) => null as any;
export const useFrame = (_cb?: any) => {};
export const useThree = () => ({ size: { width: 0, height: 0 } }) as any;
export const extend = (_o?: any) => {};
export default { Canvas, useFrame, useThree, extend };
