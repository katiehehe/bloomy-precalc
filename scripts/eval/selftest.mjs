#!/usr/bin/env node
// A test for the tests: feed the checker deliberately broken lessons and assert
// each bug-class is caught. Run with `node scripts/eval/selftest.mjs`.
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTs } from "./load.mjs";
import { checkLesson } from "./checks.mjs";
import { findEmDashes, dollarParityBad, hasRawArctan, scanRevealUsage } from "./parse.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const engine = await loadTs(join(HERE, "..", "..", "src", "lessons", "engine.ts"));

let failures = 0;
const expect = (name, codes, want) => {
  const has = codes.includes(want);
  if (!has) {
    failures += 1;
    console.log(`FAIL  ${name}: expected code "${want}", got [${codes.join(", ") || "none"}]`);
  } else {
    console.log(`ok    ${name}`);
  }
};

const P = (over = {}) => ({ key: "v", label: "v", min: 0, max: 100, start: 0, step: 5, format: (x) => `${x}`, ...over });
const run = (slide, extra = {}) =>
  checkLesson({
    id: "fixture",
    slides: [slide],
    engine,
    readFlags: new Set(),
    bounds: { byMode: { m: 5 }, scalar: 5, parsed: true },
    samples: { byMode: {}, all: [], parsed: false },
    hasFigure: false,
    ...extra,
  }).map((f) => f.code);

// choice answer out of range
expect(
  "choice-answer-out-of-range",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 5, hint: "h", success: "s" }] }),
  "choice-answer",
);

// manipulate never satisfiable
expect(
  "manipulate-unsatisfiable",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "manipulate", prompt: "q", hint: "h", success: "s", check: () => false }] }),
  "manip-unsat",
);

// manipulate always true (trivial)
expect(
  "manipulate-trivial",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "manipulate", prompt: "q", hint: "h", success: "s", check: () => true }] }),
  "manip-trivial",
);

// manipulate begins already satisfied at the watch-end value (pre-answered)
expect(
  "manipulate-preanswered",
  run({ id: "s", mode: "m", params: [P({ start: 0 })], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "manipulate", prompt: "q", hint: "h", success: "s", check: (v) => v < 10 }] }),
  "manip-preanswered",
);

// a real manipulate that starts off-target must NOT be flagged pre-answered
{
  const codes = run({ id: "s", mode: "m", params: [P({ start: 0 })], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "manipulate", prompt: "q", hint: "h", success: "s", check: (v) => v > 50 }] });
  if (codes.includes("manip-preanswered")) { failures += 1; console.log("FAIL  manipulate-not-preanswered-when-off-target"); }
  else console.log("ok    manipulate-not-preanswered-when-off-target");
}

// a final beat `to` that parks the control off-target clears pre-answered, even
// though the param START would satisfy the check (guard uses valuesAt(last beat))
{
  const codes = run({ id: "s", mode: "m", params: [P({ start: 0 })], baseReveal: {}, beats: [{ text: "x", to: 60 }], practice: "p",
    questions: [{ kind: "manipulate", prompt: "q", hint: "h", success: "s", check: (v) => v < 10 }] });
  if (codes.includes("manip-preanswered")) { failures += 1; console.log("FAIL  repark-clears-preanswered"); }
  else console.log("ok    repark-clears-preanswered");
}

// plot target off the visible plane
expect(
  "plot-offscreen",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
    questions: [{ kind: "plot", prompt: "q", hint: "h", success: "s", target: { x: 99, y: 0 }, label: "t" }] }),
  "plot-offscreen",
);

// plot answer given away by a visible labeled sample dot
expect(
  "plot-giveaway",
  run(
    { id: "s", mode: "line", params: [P()], baseReveal: { samples: true }, beats: [{ text: "x" }], practice: "p",
      questions: [{ kind: "plot", prompt: "q", hint: "h", success: "s", target: { x: 0, y: 0 }, tolerance: 0.5, label: "t = 0" }] },
    { samples: { byMode: { line: ["t = 0"] }, all: ["t = 0"], parsed: true } },
  ),
  "giveaway",
);

// beat animates a slider beyond its range
expect(
  "beat-target-out-of-range",
  run({ id: "s", mode: "m", params: [P({ max: 100 })], baseReveal: {}, beats: [{ text: "x", to: 500 }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] }),
  "beat-target",
);

// atan2 leaking into copy
expect(
  "notation-atan2",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "use atan2(y, x)" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] }),
  "notation",
);

// unbalanced KaTeX delimiters
expect(
  "katex-unbalanced",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "this $x + 1 is off" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] }),
  "katex-dollar",
);

// em dash inside copy
expect(
  "em-dash",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "a \u2014 b" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] }),
  "em-dash",
);

// semicolon inside copy (house style forbids it)
expect(
  "semicolon",
  run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "moduli multiply; angles add" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] }),
  "semicolon",
);

// the KaTeX spacing command \; is allowed and must NOT be flagged as a semicolon
{
  const codes = run({ id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "$a\\;b$" }], practice: "p",
    questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] });
  if (codes.includes("semicolon")) { failures += 1; console.log("FAIL  semicolon-allows-katex-spacer"); }
  else console.log("ok    semicolon-allows-katex-spacer");
}

// figure reads a reveal flag no slide ever sets
expect(
  "flag-read-but-never-set",
  run(
    { id: "s", mode: "m", params: [P()], baseReveal: {}, beats: [{ text: "x" }], practice: "p",
      questions: [{ kind: "choice", prompt: "q", options: ["a", "b"], answer: 0, hint: "h", success: "s" }] },
    { hasFigure: true, readFlags: new Set(["ghost"]) },
  ),
  "flag-unset",
);

// pure text helpers
if (findEmDashes("clean line\nbad \u2014 line").length !== 1) { failures++; console.log("FAIL  findEmDashes"); }
else console.log("ok    findEmDashes");
if (!dollarParityBad("$x")) { failures++; console.log("FAIL  dollarParityBad"); } else console.log("ok    dollarParityBad");
if (!hasRawArctan("theta = atan(y/x)")) { failures++; console.log("FAIL  hasRawArctan"); } else console.log("ok    hasRawArctan");
{
  const u = scanRevealUsage('const overlays = reveal as Overlays;\n<Fig overlays={overlays} />');
  if (!u.forwards) { failures++; console.log("FAIL  scanRevealUsage.forwards"); } else console.log("ok    scanRevealUsage.forwards");
}

console.log("");
console.log(failures === 0 ? "SELFTEST PASS" : `SELFTEST FAIL (${failures})`);
process.exit(failures === 0 ? 0 : 1);
