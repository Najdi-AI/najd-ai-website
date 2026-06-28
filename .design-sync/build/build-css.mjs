// Compiles the brand stylesheet the design-sync bundle ships as cfg.cssEntry.
// Input = font-faces.css (brand @font-face + family tokens) + app/globals.css
// (brand CSS vars, .dark theme, brand @layer utilities), run through Tailwind
// with the site's real config so every utility the components + previews use is
// emitted. Re-run this whenever globals.css, the brand tokens, or the previews
// change, then rebuild the bundle. Output: ds.compiled.css.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..", "..");

const faces = readFileSync(join(here, "font-faces.css"), "utf8");
const globals = readFileSync(join(repo, "app", "globals.css"), "utf8");
writeFileSync(join(here, "ds-input.css"), faces + "\n\n" + globals);

const tailwindCli = join(repo, "node_modules", "tailwindcss", "lib", "cli.js");
execFileSync(
  process.execPath,
  [
    tailwindCli,
    "-c",
    join(here, "tailwind.dssync.config.ts"),
    "-i",
    join(here, "ds-input.css"),
    "-o",
    join(here, "ds.compiled.css"),
  ],
  { stdio: "inherit", cwd: repo },
);
console.log("[build-css] wrote", join(here, "ds.compiled.css"));
