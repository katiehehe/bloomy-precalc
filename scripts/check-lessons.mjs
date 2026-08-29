#!/usr/bin/env node
// Bloomy lesson eval harness.
//
//   node scripts/check-lessons.mjs             check every lesson + ordering
//   node scripts/check-lessons.mjs --lesson polar
//   node scripts/check-lessons.mjs --next      show the prereq-ordered build backlog
//   node scripts/check-lessons.mjs --json      machine-readable output
//   node scripts/check-lessons.mjs --strict    fail on warnings too
//
// Exit code is non-zero when errors are found (or warnings with --strict), so it
// drops straight into the authoring loop and CI.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTs } from "./eval/load.mjs";
import { checkLesson, checkOrdering, checkQuiz } from "./eval/checks.mjs";
import { parseHalfBounds, parseSampleLabels, scanRevealUsage, findEmDashes } from "./eval/parse.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const LESSONS_DIR = join(ROOT, "src", "lessons");

const args = process.argv.slice(2);
const opt = {
  json: args.includes("--json"),
  strict: args.includes("--strict"),
  next: args.includes("--next"),
  list: args.includes("--list"),
  only: (() => {
    const i = args.indexOf("--lesson");
    return i >= 0 ? args[i + 1] : null;
  })(),
};

function discoverLessons() {
  return readdirSync(LESSONS_DIR)
    .filter((name) => {
      const p = join(LESSONS_DIR, name);
      return statSync(p).isDirectory() && existsSync(join(p, "slides.ts"));
    })
    .sort();
}

function readFigures(dir) {
  const texts = [];
  for (const name of readdirSync(dir)) {
    if (name.endsWith(".tsx")) texts.push(readFileSync(join(dir, name), "utf8"));
  }
  return texts;
}

async function main() {
  const findings = [];
  const engine = await loadTs(join(LESSONS_DIR, "engine.ts"));
  const curriculumMod = await loadTs(join(ROOT, "src", "curriculum", "data.ts"));
  const curriculum = { topics: curriculumMod.topics, edges: curriculumMod.edges, skills: curriculumMod.skills };

  let lessons = discoverLessons();
  if (opt.list) {
    process.stdout.write(lessons.join("\n") + "\n");
    return 0;
  }
  if (opt.only) lessons = lessons.filter((l) => l === opt.only);

  // --- per-lesson checks ----------------------------------------------------
  for (const id of lessons) {
    const dir = join(LESSONS_DIR, id);
    let slidesMod;
    try {
      slidesMod = await loadTs(join(dir, "slides.ts"));
    } catch (e) {
      findings.push({ level: "error", lesson: id, where: id, code: "load", msg: `failed to load slides.ts: ${e.message}` });
      continue;
    }
    const figureTexts = readFigures(dir);
    const readFlags = new Set();
    let forwardsReveal = false;
    const bounds = { byMode: {}, scalar: null, parsed: false };
    const samples = { byMode: {}, all: [], parsed: false };
    for (const t of figureTexts) {
      const usage = scanRevealUsage(t);
      for (const f of usage.reads) readFlags.add(f);
      forwardsReveal = forwardsReveal || usage.forwards;
      const b = parseHalfBounds(t);
      Object.assign(bounds.byMode, b.byMode);
      if (bounds.scalar == null) bounds.scalar = b.scalar;
      bounds.parsed = bounds.parsed || b.parsed;
      const s = parseSampleLabels(t);
      Object.assign(samples.byMode, s.byMode);
      samples.all.push(...s.all);
      samples.parsed = samples.parsed || s.parsed;
    }
    // em dashes across every source file in the lesson
    for (const name of readdirSync(dir)) {
      if (!/\.(ts|tsx|md)$/.test(name)) continue;
      const hits = findEmDashes(readFileSync(join(dir, name), "utf8"));
      for (const h of hits)
        findings.push({ level: "error", lesson: id, where: `${id}/${name}:${h.line}`, code: "em-dash", msg: `em dash: "${h.text}"` });
    }

    findings.push(
      ...checkLesson({
        id,
        slides: slidesMod.slides,
        engine,
        readFlags,
        bounds,
        samples,
        hasFigure: figureTexts.length > 0,
        forwardsReveal,
      }),
    );

    // Climb + Summit assessment, when present.
    const quizPath = join(dir, "quiz.ts");
    if (existsSync(quizPath)) {
      let quizMod;
      try {
        quizMod = await loadTs(quizPath);
      } catch (e) {
        findings.push({ level: "error", lesson: id, where: `${id}/quiz.ts`, code: "load", msg: `failed to load quiz.ts: ${e.message}` });
      }
      if (quizMod) findings.push(...checkQuiz({ id, quiz: quizMod.quiz }));
    }
  }

  // --- ordering + wiring (skip when narrowed to one lesson) ------------------
  const ordering = checkOrdering(curriculum);
  if (!opt.only) {
    findings.push(...ordering.findings);

    // Wiring: curriculum "ready" lessonIds must exist as lesson folders.
    const built = new Set(lessons);
    const readyLessonIds = new Set(
      curriculum.skills.filter((s) => s.status === "ready" && s.lessonId).map((s) => s.lessonId),
    );
    const indexPath = join(LESSONS_DIR, "index.ts");
    const indexText = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
    const registered = new Set([...indexText.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]));
    for (const lid of readyLessonIds) {
      if (!registered.has(lid))
        findings.push({ level: "warn", lesson: "wiring", where: "lessons/index.ts", code: "unregistered", msg: `curriculum marks "${lid}" ready but it is not registered in lessons/index.ts` });
    }
    // A lesson folder counts as wired if it is imported by the Base Camp
    // registry (lessons/index.ts) or by the Journey registry (journey/registry.ts).
    const journeyPath = join(ROOT, "src", "journey", "registry.ts");
    const journeyText = existsSync(journeyPath) ? readFileSync(journeyPath, "utf8") : "";
    for (const id of built) {
      const dir = join(LESSONS_DIR, id);
      const hasStage = existsSync(join(dir, "Stage.tsx")) || existsSync(join(dir, "Figure.tsx"));
      const wiredBase = new RegExp(`from\\s+"\\./${id}/`).test(indexText);
      const wiredJourney = new RegExp(`from\\s+"\\.\\./lessons/${id}/`).test(journeyText);
      if (hasStage && !wiredBase && !wiredJourney)
        findings.push({ level: "info", lesson: "wiring", where: "lessons/index.ts", code: "not-wired", msg: `lesson folder "${id}" exists but is not imported in lessons/index.ts or journey/registry.ts` });
    }
  }

  if (opt.next) printBacklog(curriculum, ordering);
  if (opt.json) {
    process.stdout.write(JSON.stringify({ findings, order: ordering.order }, null, 2) + "\n");
  } else {
    report(findings, lessons);
  }

  const errors = findings.filter((f) => f.level === "error").length;
  const warns = findings.filter((f) => f.level === "warn").length;
  return errors > 0 || (opt.strict && warns > 0) ? 1 : 0;
}

function printBacklog(curriculum, ordering) {
  const { topics, skills } = curriculum;
  const topicName = new Map(topics.map((t) => [t.id, t.title]));
  const lines = ["", "Recommended build order (prerequisites first):", ""];
  for (const tid of ordering.order) {
    const unlocked = ordering.available.has(tid);
    const planned = skills.filter((s) => s.topic === tid && s.status === "planned");
    const ready = skills.filter((s) => s.topic === tid && s.status === "ready");
    const lock = unlocked ? "UNLOCKED" : "locked  ";
    lines.push(`  [${lock}] ${topicName.get(tid)}  (${ready.length} ready, ${planned.length} planned)`);
    for (const s of planned) lines.push(`             - ${s.title}  (${s.id})`);
  }
  lines.push("");
  process.stdout.write(lines.join("\n") + "\n");
}

function report(findings, lessons) {
  const order = { error: 0, warn: 1, info: 2 };
  const byLesson = new Map();
  for (const f of findings) {
    if (!byLesson.has(f.lesson)) byLesson.set(f.lesson, []);
    byLesson.get(f.lesson).push(f);
  }
  const tag = { error: "ERROR", warn: " WARN", info: " INFO" };
  const out = [];
  for (const [lesson, list] of byLesson) {
    list.sort((a, b) => order[a.level] - order[b.level]);
    out.push(`\n${lesson}`);
    for (const f of list) out.push(`  [${tag[f.level]}] ${f.code}: ${f.msg}\n           at ${f.where}`);
  }
  const errors = findings.filter((f) => f.level === "error").length;
  const warns = findings.filter((f) => f.level === "warn").length;
  const infos = findings.filter((f) => f.level === "info").length;
  out.push("");
  out.push("─".repeat(60));
  out.push(`Checked ${lessons.length} lesson(s): ${errors} error(s), ${warns} warning(s), ${infos} info.`);
  out.push(errors ? "RESULT: FAIL" : "RESULT: PASS");
  process.stdout.write(out.join("\n") + "\n");
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error(e);
    process.exit(2);
  });
