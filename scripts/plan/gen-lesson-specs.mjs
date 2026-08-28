#!/usr/bin/env node
// Generates the linear lesson plan from the curriculum: one spec file per skill
// in plan/lessons/, plus plan/sequence.md. Idempotent: it never overwrites a
// spec that already exists (so hand-enriched pilots are safe) unless --force.
//
//   node scripts/plan/gen-lesson-specs.mjs           write missing specs
//   node scripts/plan/gen-lesson-specs.mjs --force   rewrite all specs
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTs } from "../eval/load.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const PLAN = join(ROOT, "plan");
const LESSONS = join(PLAN, "lessons");
const force = process.argv.includes("--force");

const c = await loadTs(join(ROOT, "src", "curriculum", "data.ts"));

// Linear order: topics by topological order (tie-break by n), skills in array order.
function topicOrder() {
  const indeg = new Map(c.topics.map((t) => [t.id, 0]));
  for (const e of c.edges) indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1);
  const ready = c.topics.filter((t) => (indeg.get(t.id) ?? 0) === 0).sort((a, b) => a.n - b.n);
  const order = [];
  const q = [...ready];
  const seen = new Set();
  while (q.length) {
    q.sort((a, b) => a.n - b.n);
    const t = q.shift();
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    order.push(t);
    for (const e of c.edges.filter((x) => x.from === t.id)) {
      indeg.set(e.to, indeg.get(e.to) - 1);
      if (indeg.get(e.to) === 0) q.push(c.topics.find((x) => x.id === e.to));
    }
  }
  // Any leftover (shouldn't happen) appended by n.
  for (const t of c.topics.sort((a, b) => a.n - b.n)) if (!seen.has(t.id)) order.push(t);
  return order;
}

function orderedSkills() {
  const out = [];
  for (const t of topicOrder()) {
    for (const s of c.skills.filter((s) => s.topic === t.id)) out.push({ ...s, topic: t });
  }
  return out;
}

const skills = orderedSkills();
const pad = (n) => String(n).padStart(2, "0");
const slug = (s) => s.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

mkdirSync(LESSONS, { recursive: true });

// --- sequence.md ------------------------------------------------------------
const seq = ["# Linear lesson sequence", "", "Derived from `src/curriculum/data.ts` (topics ordered by prerequisite,",
  "then by unit number; skills in their listed order). This is the straight",
  "path a student walks. Status: `ready` = already covered by a Base Camp lesson;",
  "`planned` = to be authored.", ""];
let n = 0;
let lastTopic = null;
for (const s of skills) {
  if (s.topic.id !== lastTopic) {
    lastTopic = s.topic.id;
    seq.push("", `## Unit ${s.topic.n}. ${s.topic.title}  (${s.topic.block})`, "", `_${s.topic.why}_`, "");
  }
  n += 1;
  const tag = s.status === "ready" ? `ready -> Base Camp: ${s.lessonId ?? "?"}` : "planned";
  seq.push(`${pad(n)}. **${s.title}**  (\`${s.id}\`) - ${tag}`);
}
writeFileSync(join(PLAN, "sequence.md"), seq.join("\n") + "\n");

// --- one spec per skill -----------------------------------------------------
let wrote = 0;
let skipped = 0;
n = 0;
for (const s of skills) {
  n += 1;
  const file = join(LESSONS, `${pad(n)}-${slug(s.id)}.md`);
  if (existsSync(file) && !force) {
    skipped += 1;
    continue;
  }
  const readyNote =
    s.status === "ready"
      ? `This skill is already taught by the Base Camp lesson \`${s.lessonId}\`. The Journey links to it; do not rebuild.`
      : "To be authored as a Journey lesson.";
  const body = `# ${pad(n)}. ${s.title}

- Skill id: \`${s.id}\`
- Unit: ${s.topic.title} (Unit ${s.topic.n}, block ${s.topic.block})
- Status: ${s.status}
- ${readyNote}

## Goal
_One sentence: what the learner can do after this lesson._
TODO

## Skills from the original 57-list covered here
- \`${s.id}\` ${s.title}

## Prerequisites (must already be learned)
- Unit-level: ${s.topic.why}
- Immediately prior lesson in this unit.
TODO: list the specific ideas this lesson assumes.

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: _section TBD_
- _Second source TBD (Sullivan / Stewart / Blitzer / Larson / AP CED)_

## Slides (one idea per slide; one visual change per beat)
1. TODO
2. TODO
3. TODO

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- TODO

## Figure and interactions (draw it literally; let the learner play)
- TODO

## Known pitfalls to avoid
- TODO (e.g. rendering across an asymptote, notation, giveaway samples)
`;
  writeFileSync(file, body);
  wrote += 1;
}

process.stdout.write(`plan: ${skills.length} skills; wrote ${wrote} spec(s), skipped ${skipped} existing. sequence.md updated.\n`);
