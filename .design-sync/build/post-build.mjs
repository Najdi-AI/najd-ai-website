// Copies the repo's brand assets into the bundle so components that render
// <img src="/brand/..."> (NajdLogo, SautNajdiLogo, VoiceAgentVisual) resolve —
// both in the local preview render check AND in real designs (the project root
// serves these). package-build wipes ds-bundle, so run this AFTER every full
// converter build. preview-rebuild leaves ds-bundle/brand in place, so it isn't
// needed after a subagent preview rebuild.
import { cpSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const src = join(repo, "public", "brand");
const dest = join(repo, "ds-bundle", "brand");
if (!existsSync(src)) {
  console.error("[post-build] public/brand not found — nothing to copy");
  process.exit(1);
}
cpSync(src, dest, { recursive: true });
console.log("[post-build] copied public/brand -> ds-bundle/brand");
