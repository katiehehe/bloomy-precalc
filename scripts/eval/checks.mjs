// The actual lesson checks. Each returns an array of findings:
//   { level: "error" | "warn" | "info", where: string, code: string, msg: string }
// Errors fail the run (used by loops / CI). Warnings and info are advisory.
import {
  braceUnbalanced,
  dollarParityBad,
  hasRawArctan,
  leftRightUnbalanced,
  normLabel,
} from "./parse.mjs";

const MANIPULATE = "manipulate";
const CHOICE = "choice";
const PLOT = "plot";

const clip = (s) => {
  const t = String(s).replace(/\s+/g, " ").trim();
  return t.length > 64 ? t.slice(0, 61) + "..." : t;
};

// A visible semicolon in learner copy (house style forbids it). The KaTeX
// spacing command \; is preceded by a backslash, so it is allowed.
const hasProseSemicolon = (s) => /(?<!\\);/.test(String(s));

/** Learner-facing strings on a slide, tagged by where they live (for reports). */
function slideStrings(slide) {
  const out = [];
  const push = (field, text) => {
    if (typeof text === "string") out.push({ field, text });
  };
  slide.beats?.forEach((b, i) => push(`beat[${i}].text`, b.text));
  push("practice", slide.practice);
  slide.questions?.forEach((q, i) => {
    push(`q[${i}].prompt`, q.prompt);
    push(`q[${i}].hint`, q.hint);
    push(`q[${i}].success`, q.success);
    if (q.kind === CHOICE) q.options?.forEach((o, j) => push(`q[${i}].options[${j}]`, o));
  });
  return out;
}

/** Numeric samples across a param's domain, respecting its step, capped for speed. */
function paramSamples(p) {
  const span = p.max - p.min;
  if (span <= 0) return [p.min];
  const step = p.step && p.step > 0 ? p.step : span / 24;
  const n = Math.min(41, Math.max(3, Math.round(span / step) + 1));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(p.min + (span * i) / (n - 1));
  return out;
}

/** Sweep the full param grid, calling fn(values, primaryValue). Capped at ~50k combos. */
function sweepGrid(params, fn) {
  const primary = params[0].key;
  const axes = params.map(paramSamples);
  let total = axes.reduce((a, s) => a * s.length, 1);
  while (total > 50000) {
    let widest = 0;
    axes.forEach((s, i) => {
      if (s.length > axes[widest].length) widest = i;
    });
    if (axes[widest].length <= 2) break;
    axes[widest] = axes[widest].filter((_, i) => i % 2 === 0);
    total = axes.reduce((a, s) => a * s.length, 1);
  }
  const idx = axes.map(() => 0);
  while (true) {
    const values = {};
    params.forEach((p, i) => (values[p.key] = axes[i][idx[i]]));
    fn(values, values[primary]);
    let k = axes.length - 1;
    while (k >= 0) {
      idx[k] += 1;
      if (idx[k] < axes[k].length) break;
      idx[k] = 0;
      k -= 1;
    }
    if (k < 0) break;
  }
}

/**
 * Check one lesson.
 * ctx: { id, slides, engine, readFlags:Set, bounds, samples, hasFigure:boolean }
 */
export function checkLesson(ctx) {
  const { id, slides, engine, readFlags, bounds, samples } = ctx;
  const F = [];
  const add = (level, where, code, msg) => F.push({ level, lesson: id, where, code, msg });

  if (!Array.isArray(slides) || slides.length === 0) {
    add("error", id, "no-slides", "slides.ts does not export a non-empty `slides` array");
    return F;
  }

  const setFlags = new Set();
  const seenSlideIds = new Set();

  for (const slide of slides) {
    const where = `${id} / ${slide.id ?? "??"}`;

    // --- slide skeleton -----------------------------------------------------
    if (!slide.id) add("error", where, "slide-id", "slide is missing an `id`");
    else if (seenSlideIds.has(slide.id)) add("error", where, "dup-slide", `duplicate slide id "${slide.id}"`);
    else seenSlideIds.add(slide.id);

    if (!slide.beats?.length) add("error", where, "no-beats", "slide has no beats");
    if (!slide.practice) add("warn", where, "no-practice", "slide has no `practice` line for the try stage");
    if (!slide.questions?.length) add("warn", where, "no-questions", "slide has no questions (no retrieval practice)");

    // --- collect reveal flags this slide sets -------------------------------
    Object.keys(slide.baseReveal ?? {}).forEach((k) => setFlags.add(k));
    slide.beats?.forEach((b) => Object.keys(b.add ?? {}).forEach((k) => setFlags.add(k)));

    // --- params -------------------------------------------------------------
    let params = [];
    try {
      params = engine.paramsOf(slide);
    } catch (e) {
      add("error", where, "params", `could not resolve params: ${e.message}`);
    }
    const paramMap = new Map(params.map((p) => [p.key, p]));
    for (const p of params) {
      if (!(p.max > p.min)) add("error", where, "param-range", `param "${p.key}" has min ${p.min} >= max ${p.max}`);
      if (p.start < p.min || p.start > p.max)
        add("error", where, "param-start", `param "${p.key}" start ${p.start} is outside [${p.min}, ${p.max}]`);
      if (typeof p.format !== "function") add("warn", where, "param-format", `param "${p.key}" has no format()`);
    }

    // --- beats: text + animation targets in range ---------------------------
    slide.beats?.forEach((b, i) => {
      if (!b.text || !b.text.trim()) add("error", where, "empty-beat", `beat[${i}] has empty text`);
      if (b.ms != null && (b.ms < 200 || b.ms > 6000))
        add("warn", where, "beat-ms", `beat[${i}] ms=${b.ms} is unusual (200..6000 typical)`);
      const to = b.to;
      const targets = to == null ? {} : typeof to === "number" ? { [params[0]?.key]: to } : to;
      for (const [k, v] of Object.entries(targets)) {
        const p = paramMap.get(k);
        if (!p) {
          add("error", where, "beat-key", `beat[${i}].to targets unknown param "${k}"`);
          continue;
        }
        if (v < p.min - 1e-6 || v > p.max + 1e-6)
          add("warn", where, "beat-target", `beat[${i}].to.${k}=${v} is outside slider range [${p.min}, ${p.max}]`);
      }
    });

    // --- questions ----------------------------------------------------------
    slide.questions?.forEach((q, i) => {
      const qw = `${where} q[${i}]`;
      if (!q.prompt) add("error", qw, "q-prompt", "question has no prompt");
      if (!q.hint) add("warn", qw, "q-hint", "question has no hint (rules require a graceful way forward)");
      if (!q.success) add("warn", qw, "q-success", "question has no success message");

      if (q.kind === CHOICE) {
        if (!Array.isArray(q.options) || q.options.length < 2)
          add("error", qw, "choice-options", "choice needs at least 2 options");
        else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
          add("error", qw, "choice-answer", `answer index ${q.answer} is out of range for ${q.options.length} options`);
      } else if (q.kind === MANIPULATE) {
        if (typeof q.check !== "function") {
          add("error", qw, "manip-check", "manipulate question has no check()");
        } else if (params.length) {
          let anyTrue = false;
          let anyFalse = false;
          try {
            sweepGrid(params, (values, primary) => {
              let ok = false;
              try {
                ok = Boolean(q.check(primary, values));
              } catch {
                ok = false;
              }
              if (ok) anyTrue = true;
              else anyFalse = true;
            });
          } catch (e) {
            add("warn", qw, "manip-sweep", `could not sweep check(): ${e.message}`);
          }
          if (!anyTrue)
            add("error", qw, "manip-unsat", "manipulate check() is never satisfiable across the slider domain (learner can never complete it)");
          if (anyTrue && !anyFalse)
            add("warn", qw, "manip-trivial", "manipulate check() is always true (auto-completes without the learner doing anything)");
          // Pre-answered guard: the try stage begins at the values the watch beats
          // leave behind (valuesAt the last beat), not necessarily the param start.
          // If check() already passes there, the sole manipulate is solved on entry,
          // which violates the "questions must not start pre-answered" rule. Only
          // meaningful for a real check that can be both true and false.
          if (anyTrue && anyFalse && engine?.valuesAt && engine?.primaryKey) {
            try {
              const startVals = engine.valuesAt(slide, slide.beats.length - 1);
              const pk = engine.primaryKey(slide);
              if (Boolean(q.check(startVals[pk] ?? 0, startVals)))
                add(
                  "warn",
                  qw,
                  "manip-preanswered",
                  "manipulate begins already satisfied at the watch-end values (park the control outside the target with a final beat `to`, or set the param start off-answer)",
                );
            } catch {
              // if the start position cannot be resolved, skip this soft check
            }
          }
        }
      } else if (q.kind === PLOT) {
        if (!q.target || typeof q.target.x !== "number" || typeof q.target.y !== "number") {
          add("error", qw, "plot-target", "plot question has no numeric target {x,y}");
        } else {
          if (!q.label) add("warn", qw, "plot-label", "plot target has no label to tag once solved");
          const mode = slide.mode ?? "";
          const half = bounds.byMode?.[mode] ?? bounds.scalar;
          if (half == null) {
            if (bounds.parsed)
              add("info", qw, "plot-bounds", `could not resolve plane half-range for mode "${mode}"; skipped bounds check`);
          } else {
            if (Math.abs(q.target.x) > half + 1e-6 || Math.abs(q.target.y) > half + 1e-6)
              add("error", qw, "plot-offscreen", `target (${q.target.x}, ${q.target.y}) is outside the visible plane (half=${half})`);
            const tol = q.tolerance ?? 0.6;
            if (tol > half) add("warn", qw, "plot-tol-loose", `tolerance ${tol} >= plane half ${half}: almost any click passes`);
            if (tol < 0.12) add("warn", qw, "plot-tol-tight", `tolerance ${tol} is very tight to click by pointer`);
          }

          // Giveaway: a demonstrated, labeled sample dot must not sit on the answer.
          const revealsSamples =
            Boolean(slide.baseReveal?.samples) || slide.beats?.some((b) => b.add?.samples);
          if (revealsSamples && q.label) {
            const target = normLabel(q.label);
            const mode2 = slide.mode ?? "";
            const modeLabels = samples.byMode?.[mode2];
            const pool = modeLabels ?? (samples.parsed ? [] : samples.all);
            const clash = pool.some((l) => normLabel(l) === target);
            if (clash)
              add(
                "error",
                qw,
                "giveaway",
                `a visible sample dot is labeled "${q.label}", which is exactly this plot question's answer (demonstrate a different point)`,
              );
          }
        }
      } else {
        add("warn", qw, "q-kind", `unknown question kind "${q.kind}"`);
      }
    });

    // --- KaTeX + notation on every learner-facing string --------------------
    for (const { field, text } of slideStrings(slide)) {
      if (dollarParityBad(text)) add("error", where, "katex-dollar", `${field}: unbalanced $...$ math delimiters`);
      if (leftRightUnbalanced(text)) add("error", where, "katex-leftright", `${field}: \\left without matching \\right`);
      if (braceUnbalanced(text)) add("warn", where, "katex-brace", `${field}: unbalanced { } (check \\frac, ^{}, _{})`);
      if (hasRawArctan(text)) add("error", where, "notation", `${field}: uses atan/atan2 in copy; write \\arctan or \\tan^{-1}`);
      if (text.includes("\u2014")) add("error", where, "em-dash", `${field}: contains an em dash (house style forbids it)`);
      if (hasProseSemicolon(text)) add("error", where, "semicolon", `${field}: contains a semicolon (house style forbids it in copy; use a comma, colon, or two sentences)`);
    }
  }

  // --- reveal-flag consistency across the lesson ----------------------------
  // Skipped when the figure forwards the whole reveal bag to a child component,
  // because the real reads then live in code this checker does not scan.
  if (ctx.hasFigure && !ctx.forwardsReveal) {
    for (const flag of readFlags) {
      if (!setFlags.has(flag))
        add(
          "error",
          id,
          "flag-unset",
          `figure reads reveal.${flag} but no slide ever sets it (the visual will never appear)`,
        );
    }
    for (const flag of setFlags) {
      if (!readFlags.has(flag))
        add("warn", id, "flag-dead", `slides set reveal.${flag} but no figure reads it (dead flag / typo?)`);
    }
  }

  return F;
}

/**
 * Check one lesson's Climb + Summit assessment (`quiz.ts`).
 * ctx: { id, quiz }  where quiz = { climb: [], summit: [] }.
 * Each question needs exactly one correct choice, a per-choice explanation, and
 * balanced KaTeX / standard notation / no em dashes, just like the slides.
 */
export function checkQuiz(ctx) {
  const { id, quiz } = ctx;
  const F = [];
  const add = (level, where, code, msg) => F.push({ level, lesson: id, where, code, msg });

  if (!quiz || typeof quiz !== "object") {
    add("error", `${id}/quiz.ts`, "quiz-shape", "quiz.ts does not export a `quiz` object with climb/summit");
    return F;
  }

  for (const phase of ["climb", "summit"]) {
    const section = quiz[phase];
    const where = `${id}/quiz.ts ${phase}`;
    if (!Array.isArray(section)) {
      add("error", where, "quiz-section", `quiz.${phase} is missing or not an array`);
      continue;
    }
    if (section.length < 10) add("error", where, "quiz-count", `${phase} has ${section.length} questions (need >= 10; target 15)`);
    else if (section.length < 14 || section.length > 16) add("warn", where, "quiz-count", `${phase} has ${section.length} questions (target ~15)`);

    const ids = new Set();
    section.forEach((q, i) => {
      const qw = `${where} q[${i}]${q && q.id ? " " + q.id : ""}`;
      if (!q || typeof q !== "object") {
        add("error", qw, "quiz-q", "question is not an object");
        return;
      }
      if (!q.id) add("error", qw, "quiz-qid", "question missing id");
      else if (ids.has(q.id)) add("error", qw, "quiz-dupid", `duplicate question id "${q.id}"`);
      else ids.add(q.id);
      if (!q.prompt || !String(q.prompt).trim()) add("error", qw, "quiz-prompt", "question has an empty prompt");

      const choices = q.choices;
      if (!Array.isArray(choices) || choices.length < 3) {
        add("error", qw, "quiz-choices", "question needs at least 3 choices");
      } else {
        if (choices.length > 5) add("warn", qw, "quiz-choices", `${choices.length} choices (3 to 4 is typical)`);
        const nCorrect = choices.filter((c) => c && c.correct === true).length;
        if (nCorrect !== 1) add("error", qw, "quiz-correct", `exactly one choice must be correct (found ${nCorrect})`);
        choices.forEach((c, j) => {
          const cw = `${qw} choice[${j}]`;
          if (!c || typeof c !== "object") {
            add("error", cw, "quiz-choice", "choice is not an object");
            return;
          }
          if (!c.text || !String(c.text).trim()) add("error", cw, "quiz-choice-text", "choice has empty text");
          if (!c.explain || !String(c.explain).trim())
            add("error", cw, "quiz-explain", "choice has no explanation (add why it is right, or which trap it is)");
        });
      }

      const strings = [q.prompt];
      if (Array.isArray(choices)) for (const c of choices) if (c) strings.push(c.text, c.explain);
      for (const text of strings) {
        if (typeof text !== "string") continue;
        if (dollarParityBad(text)) add("error", qw, "katex-dollar", `unbalanced $...$: "${clip(text)}"`);
        if (leftRightUnbalanced(text)) add("error", qw, "katex-leftright", `\\left without \\right: "${clip(text)}"`);
        if (braceUnbalanced(text)) add("warn", qw, "katex-brace", `unbalanced { }: "${clip(text)}"`);
        if (hasRawArctan(text)) add("error", qw, "notation", `atan/atan2 in copy: "${clip(text)}"`);
        if (text.includes("\u2014")) add("error", qw, "em-dash", `em dash: "${clip(text)}"`);
        if (hasProseSemicolon(text)) add("error", qw, "semicolon", `semicolon in copy: "${clip(text)}"`);
      }
    });
  }

  return F;
}

/**
 * Ordering check over the curriculum graph.
 * Verifies the prerequisite graph is acyclic and returns the recommended
 * student sequence plus which topics are unlocked (all prereqs available).
 */
export function checkOrdering(curriculum) {
  const { topics, edges, skills } = curriculum;
  const F = [];
  const add = (level, code, msg) => F.push({ level, lesson: "curriculum", where: "curriculum", code, msg });

  const byId = new Map(topics.map((t) => [t.id, t]));
  const incoming = new Map(topics.map((t) => [t.id, []]));
  for (const e of edges) {
    if (!byId.has(e.from)) add("error", "edge-from", `edge from unknown topic "${e.from}"`);
    if (!byId.has(e.to)) add("error", "edge-to", `edge to unknown topic "${e.to}"`);
    if (incoming.has(e.to)) incoming.get(e.to).push(e.from);
  }

  // Kahn topological sort; leftover nodes => cycle.
  const indeg = new Map(topics.map((t) => [t.id, incoming.get(t.id).length]));
  const queue = topics.filter((t) => indeg.get(t.id) === 0).map((t) => t.id);
  const order = [];
  while (queue.length) {
    const n = queue.shift();
    order.push(n);
    for (const e of edges.filter((x) => x.from === n)) {
      indeg.set(e.to, indeg.get(e.to) - 1);
      if (indeg.get(e.to) === 0) queue.push(e.to);
    }
  }
  if (order.length !== topics.length) {
    const stuck = topics.filter((t) => !order.includes(t.id)).map((t) => t.id);
    add("error", "cycle", `prerequisite graph has a cycle among: ${stuck.join(", ")}`);
  }

  // A topic is "available" when every prereq topic has a ready skill.
  const readyTopics = new Set(
    topics.filter((t) => skills.some((s) => s.topic === t.id && s.status === "ready")).map((t) => t.id),
  );
  const available = new Set();
  for (const tid of order) {
    const prereqs = incoming.get(tid);
    if (prereqs.every((p) => readyTopics.has(p) || available.has(p) || incoming.get(p).length === 0))
      available.add(tid);
  }

  return { findings: F, order, readyTopics, available, incoming };
}
