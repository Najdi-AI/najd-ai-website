// Mirrors `npx shadcn add @aceternity/<slug>` for the whole set, in one pass.
// Fetches each demo's registry JSON, writes every file to its declared path,
// resolves registryDependencies transitively, and aggregates npm dependencies.
// Node 18+ (global fetch). Run from the project root.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE = "https://ui.aceternity.com/registry/";
const ROOT = process.cwd();

// The 47 components requested, by their registry demo slug.
const DEMOS = [
  "text-flipping-board-demo",
  "macbook-scroll-demo",
  "gooey-input-demo",
  "3d-card-demo",
  "encrypted-text-demo-2",
  "text-hover-effect-demo",
  "background-beams-with-collision-demo",
  "background-lines-demo",
  "card-spotlight-demo",
  "comet-card-demo",
  "cover-demo",
  "container-text-flip-demo",
  "draggable-card-demo-2",
  "expandable-card-demo-standard",
  "floating-dock-demo",
  "stateful-button-demo",
  "google-gemini-effect-demo",
  "3d-marquee-demo",
  "animated-tooltip-demo",
  "background-beams-demo",
  "background-gradient-animation-demo",
  "bento-grid-demo-3",
  "canvas-reveal-effect-demo",
  "cards-demo-3",
  "container-scroll-animation-demo",
  "evervault-card-demo",
  "glowing-effect-demo-2",
  "hero-parallax-demo",
  "lamp-demo",
  "link-preview-demo",
  "meteors-demo",
  "moving-border-demo",
  "placeholders-and-vanish-input-demo",
  "sidebar-demo",
  "signup-form-demo",
  "sparkles-demo",
  "sticky-scroll-reveal-demo",
  "svg-mask-effect-demo",
  "text-generate-effect-demo",
  "text-reveal-card-demo",
  "typewriter-effect-demo-1",
  "hover-border-gradient-demo",
  "multi-step-loader-demo",
  "3d-pin-demo",
  "background-boxes-demo",
  "background-gradient-demo",
  "timeline-demo",
];

const visited = new Set();
const npmDeps = new Set();
const writtenFiles = new Set();
const misses = [];
const manifest = {}; // demo -> { files:[], dependencies:[], registryDependencies:[] }

async function fetchJson(nameOrUrl) {
  const url = nameOrUrl.startsWith("http") ? nameOrUrl : `${BASE}${nameOrUrl}.json`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "najd-fetch" } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function normalizeDepName(rd) {
  if (typeof rd !== "string") return null;
  if (rd.startsWith("http")) return rd; // full url
  return rd.replace(/^@aceternity\//, "").replace(/^@\//, "");
}

async function resolveItem(name, collect) {
  const key = name.startsWith("http") ? name : name.replace(/^@aceternity\//, "");
  if (visited.has(key)) return;
  visited.add(key);
  const json = await fetchJson(name);
  if (!json) {
    misses.push(name);
    return;
  }
  for (const d of json.dependencies || []) npmDeps.add(d);
  for (const d of json.devDependencies || []) npmDeps.add(d);
  if (collect) {
    collect.dependencies.push(...(json.dependencies || []));
    collect.registryDependencies.push(...(json.registryDependencies || []));
  }
  for (const f of json.files || []) {
    const p = f.path || f.target;
    if (!p) continue;
    const outPath = join(ROOT, p);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, f.content ?? "", "utf8");
    writtenFiles.add(p);
    if (collect) collect.files.push(p);
  }
  for (const rd of json.registryDependencies || []) {
    const depName = normalizeDepName(rd);
    if (depName) await resolveItem(depName, null);
  }
}

for (const demo of DEMOS) {
  const collect = { files: [], dependencies: [], registryDependencies: [] };
  await resolveItem(demo, collect);
  manifest[demo] = collect;
}

const allDeps = [...npmDeps].sort();
await writeFile(
  join(ROOT, "scripts", "aceternity-manifest.json"),
  JSON.stringify({ manifest, allDependencies: allDeps, misses, files: [...writtenFiles].sort() }, null, 2),
  "utf8"
);

console.log("=== FETCH COMPLETE ===");
console.log("Files written:", writtenFiles.size);
console.log("Registry items resolved:", visited.size);
console.log("Misses (could not resolve):", JSON.stringify(misses));
console.log("=== NPM DEPENDENCIES (union) ===");
console.log(JSON.stringify(allDeps, null, 2));
