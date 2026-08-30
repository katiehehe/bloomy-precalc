#!/usr/bin/env node
// Advisory voice + layout scanner for lesson copy. This does NOT gate the build.
// It flags the "AI voice" tics and slide-length problems the house style bans, so
// a rewrite can be driven to zero mechanically instead of by eye.
//
//   node scripts/voice-scan.mjs                 scan every lesson
//   node scripts/voice-scan.mjs --lesson vec-mag
//   node scripts/voice-scan.mjs --lesson vec-mag --strict   (exit 1 if any finding)
//   node scripts/voice-scan.mjs --json
//
// What it checks (all advisory):
//   voice-filler   a banned vague/cutesy/chatty phrase (see BANNED below)
//   voice-bang     an exclamation mark in learner copy (enthusiasm from ideas, not "!")
//   beat-sentences a single beat with more than 3 sentences (target 2 to 3)
//   beat-long      a single beat longer than ~360 characters (visually chunky)
//   comma-stack    one sentence carrying 3+ prose commas (appositive pile-up)
//   slide-beats    a slide with more than 5 beats (watch column likely scrolls)
//   slide-long     a slide whose beats total more than ~1000 chars (likely scrolls)
import { readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTs } from "./eval/load.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const LESSONS_DIR = join(ROOT, "src", "lessons");

const args = process.argv.slice(2);
const opt = {
  json: args.includes("--json"),
  strict: args.includes("--strict"),
  only: (() => {
    const i = args.indexOf("--lesson");
    return i >= 0 ? args[i + 1] : null;
  })(),
};

// Curated banned phrases. Kept specific enough to avoid false positives on real
// math prose. Each is matched case-insensitively as a whole-word-ish pattern.
const BANNED = [
  /\bhere is the (catch|key|trick|idea|picture|point|magic|secret)\b/i,
  /\bhere's the (catch|key|trick|idea|picture|point|magic|secret)\b/i,
  /\bthe (catch|trick|magic|secret) is\b/i,
  /\bthe (key|whole) (idea|point|trick) (is|here)\b/i,
  /\bkey (insight|takeaway)\b/i,
  /\bmakes? (this|it|them) concrete\b/i,
  /\bdoes the work\b/i,
  /\bdo the work\b/i,
  /\bthe (geometry|algebra|picture|math) (does|do)\b/i,
  /\bas (we|you) can see\b/i,
  /\bwe can see\b/i,
  /\byou can see (that|how|why)\b/i,
  /\bit turns out\b/i,
  /\bnotice how\b/i,
  /\bnotice that\b/i,
  /\bthink of (it|this|them) as\b/i,
  /\blike magic\b/i,
  /\bmagic(al)?\b/i,
  /\bbring it home\b/i,
  /\blet's\b/i,
  /\blet us\b/i,
  /\bsimply put\b/i,
  /\bput simply\b/i,
  /\bbasically\b/i,
  /\bin a nutshell\b/i,
  /\bat the end of the day\b/i,
  /\bunder the hood\b/i,
  /\bboils down to\b/i,
  // cutesy or mechanical metaphors for the math
  /\bdials?\b/i,
  /\bknobs?\b/i,
  /\bdrive the\b/i,
  /\bdrives the\b/i,
  /\byou drive\b/i,
  /\bswing it\b/i,
  /\bdrop it (on|onto)\b/i,
  /\bonto the grid\b/i,
  /\bslap\b/i,
];

/** Remove $...$ and $$...$$ math and **bold** markers so prose counts are clean. */
function strip(text) {
  return String(text)
    .replace(/\$\$[^$]*\$\$/g, " M ")
    .replace(/\$[^$]*\$/g, " M ")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** Split stripped prose into sentences on ., !, ? terminators. */
function sentences(text) {
  return strip(text)
    .split(/[.!?]+(?:\s|$)/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function scanString(text, where, push) {
  if (typeof text !== "string" || !text.trim()) return;
  const clean = strip(text);
  for (const re of BANNED) {
    const m = clean.match(re);
    if (m) push("voice-filler", `${where}: banned phrase "${m[0]}"`);
  }
  if (/!/.test(clean)) push("voice-bang", `${where}: exclamation mark in copy`);
  for (const s of sentences(text)) {
    const commas = (s.match(/,/g) || []).length;
    if (commas >= 4) push("comma-stack", `${where}: ${commas} commas in one sentence (appositive pile-up)`);
  }
}

function scanBeat(text, where, push) {
  scanString(text, where, push);
  const n = sentences(text).length;
  if (n > 3) push("beat-sentences", `${where}: ${n} sentences (target 2 to 3)`);
  if (String(text).length > 380) push("beat-long", `${where}: ${String(text).length} chars (target < 360)`);
}

function scanSlide(slide, push) {
  const sid = slide.id ?? "??";
  const beats = slide.beats ?? [];
  beats.forEach((b, i) => scanBeat(b.text, `${sid} beat[${i}]`, push));
  scanString(slide.practice, `${sid} practice`, push);
  (slide.questions ?? []).forEach((q, i) => {
    scanString(q.prompt, `${sid} q[${i}].prompt`, push);
    scanString(q.hint, `${sid} q[${i}].hint`, push);
    scanString(q.success, `${sid} q[${i}].success`, push);
    if (q.kind === "choice") (q.options ?? []).forEach((o, j) => scanString(o, `${sid} q[${i}].opt[${j}]`, push));
  });
  if (beats.length > 6) push("slide-beats", `${sid}: ${beats.length} beats (>6 likely scrolls, split the slide)`);
  const total = beats.reduce((a, b) => a + String(b.text ?? "").length, 0);
  if (total > 1250) push("slide-long", `${sid}: beats total ${total} chars (>1250 likely scrolls, split the slide)`);
}

function scanQuiz(quiz, push) {
  if (!quiz || typeof quiz !== "object") return;
  for (const phase of ["climb", "summit"]) {
    const section = quiz[phase];
    if (!Array.isArray(section)) continue;
    section.forEach((q, i) => {
      if (!q) return;
      scanString(q.prompt, `${phase}[${i}].prompt`, push);
      (q.choices ?? []).forEach((c, j) => {
        if (!c) return;
        scanString(c.text, `${phase}[${i}].choice[${j}].text`, push);
        scanString(c.explain, `${phase}[${i}].choice[${j}].explain`, push);
      });
    });
  }
}

function discoverLessons() {
  return readdirSync(LESSONS_DIR)
    .filter((name) => {
      const p = join(LESSONS_DIR, name);
      return statSync(p).isDirectory() && existsSync(join(p, "slides.ts"));
    })
    .sort();
}

async function main() {
  let lessons = discoverLessons();
  if (opt.only) lessons = lessons.filter((l) => l === opt.only);
  const all = [];
  for (const id of lessons) {
    const findings = [];
    const push = (code, msg) => findings.push({ lesson: id, code, msg });
    const dir = join(LESSONS_DIR, id);
    try {
      const mod = await loadTs(join(dir, "slides.ts"));
      for (const slide of mod.slides ?? []) scanSlide(slide, push);
    } catch (e) {
      push("load", `failed to load slides.ts: ${e.message}`);
    }
    const quizPath = join(dir, "quiz.ts");
    if (existsSync(quizPath)) {
      try {
        const q = await loadTs(quizPath);
        scanQuiz(q.quiz, push);
      } catch (e) {
        push("load", `failed to load quiz.ts: ${e.message}`);
      }
    }
    all.push(...findings);
  }

  if (opt.json) {
    process.stdout.write(JSON.stringify(all, null, 2) + "\n");
    return all.length && opt.strict ? 1 : 0;
  }

  const byLesson = new Map();
  for (const f of all) {
    if (!byLesson.has(f.lesson)) byLesson.set(f.lesson, []);
    byLesson.get(f.lesson).push(f);
  }
  const out = [];
  for (const [lesson, list] of byLesson) {
    out.push(`\n${lesson}  (${list.length})`);
    for (const f of list) out.push(`  [${f.code}] ${f.msg}`);
  }
  const byCode = {};
  for (const f of all) byCode[f.code] = (byCode[f.code] ?? 0) + 1;
  out.push("");
  out.push("\u2500".repeat(60));
  out.push(`Scanned ${lessons.length} lesson(s): ${all.length} finding(s).`);
  out.push(Object.entries(byCode).map(([k, v]) => `  ${k}: ${v}`).join("\n") || "  (clean)");
  process.stdout.write(out.join("\n") + "\n");
  return all.length && opt.strict ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error(e);
    process.exit(2);
  });
