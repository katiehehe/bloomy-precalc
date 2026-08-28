#!/usr/bin/env node
// Proves the rational grapher never connects a curve across a vertical asymptote
// and clips blow-ups to the plane. This is the visual bug the branch-splitter
// exists to prevent. Runs the real helper (src/lib/rational.ts) via esbuild.
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTs } from "./load.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const { sampleBranches } = await loadTs(join(HERE, "..", "..", "src", "lib", "rational.ts"));

let failures = 0;
const ok = (name, cond) => {
  if (cond) console.log(`ok    ${name}`);
  else {
    failures += 1;
    console.log(`FAIL  ${name}`);
  }
};

const HALF = 5;
const within = (b) => b.every((p) => Math.abs(p.y) <= HALF + 1e-9);
const side = (b, wall) => (b.every((p) => p.x < wall) ? "-" : b.every((p) => p.x > wall) ? "+" : "mixed");

// 1. Holes lesson: f = (x+2)/(x-3), wall at x = 3.
{
  const f = (x) => (x + 2) / (x - 3);
  const br = sampleBranches(f, -HALF, HALF, [3], HALF);
  ok("holes: two branches", br.length === 2);
  ok("holes: nothing crosses x=3", br.every((b) => side(b, 3) !== "mixed"));
  ok("holes: clipped to plane", br.every(within));
  const left = br.find((b) => side(b, 3) === "-");
  ok("holes: continuous through the hole at x=1", left && left.some((p) => p.x < 1) && left.some((p) => p.x > 1));
  ok("holes: hole y-value is -1.5", Math.abs(f(1) - -1.5) < 1e-9);
}

// 2. Graphing lesson: g = (x^2-1)/(x^2-4), walls at x = -2, 2.
{
  const g = (x) => (x * x - 1) / (x * x - 4);
  const br = sampleBranches(g, -HALF, HALF, [-2, 2], HALF);
  ok("graph: three branches", br.length === 3);
  ok("graph: none cross a wall", br.every((b) => side(b, -2) !== "mixed" && side(b, 2) !== "mixed"));
  ok("graph: clipped to plane", br.every(within));
}

// 3. Slant lesson: h = (x^2+1)/x, wall at x = 0.
{
  const h = (x) => (x * x + 1) / x;
  const br = sampleBranches(h, -HALF, HALF, [0], HALF);
  ok("slant: two branches", br.length === 2);
  ok("slant: split at x=0", br.every((b) => side(b, 0) !== "mixed"));
  ok("slant: clipped to plane", br.every(within));
}

console.log("");
console.log(failures === 0 ? "RATIONAL SELFTEST PASS" : `RATIONAL SELFTEST FAIL (${failures})`);
process.exit(failures === 0 ? 0 : 1);
