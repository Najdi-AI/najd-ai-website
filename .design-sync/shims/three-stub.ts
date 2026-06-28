// Stub for "three" (mapped in tsconfig.dssync.json paths). Only canvas-reveal-effect.tsx
// imports `* as THREE`, and only inside component bodies that never render in previews
// (see r3f-stub.tsx). Namespace import needs the module to resolve; member access
// (THREE.ShaderMaterial, …) only happens at render-time, which doesn't occur here.
export {};
