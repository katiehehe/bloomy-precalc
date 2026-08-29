# Overnight run: Climb + Summit assessments

Goal: give every Journey lesson a **Climb** (about 15 practice questions) and a
**Summit** (about 15 mastery questions). Questions are grounded in the lesson and
its practical takeaways; distractors are built from the common traps; every choice
carries a short explanation (why it is right, or which trap it is). Learners get a
raw score report per section.

Scope this run: all 46 Journey lessons (18 already built + 28 to come). Base Camp
is left as-is. Depth-first: finish whole units end to end, in prerequisite order.

## Engine (built once)

- `src/quiz/types.ts` : data model (`LessonQuiz = { climb, summit }`, per-choice `explain`), deterministic choice shuffle.
- `src/quiz/QuizRunner.tsx` : Climb = practice (retry + inline explanations + reveal), Summit = one locked attempt each.
- `src/quiz/QuizReport.tsx` : raw score per section + per-question review (correct answer + your wrong pick, each explained).
- `src/journey/quizzes.ts` : central registry mapping lesson id to its quiz.
- Routes: `#/journey/<id>/climb`, `#/journey/<id>/summit`; Recap hands off with "Start Climb".
- Harness: `scripts/eval/checks.mjs` `checkQuiz` validates count (~15), exactly one correct, explanations present, balanced KaTeX, standard notation, no em dashes.
- Smoke: `scripts/smoke-lessons.mjs` walks and screenshots the climb/summit routes.

Status: DONE and gated (npm run verify passes; climb/summit screenshots reviewed).

## Per-lesson quiz status

Legend: [x] done + gated + committed | [~] in progress | [ ] not started | [!] blocked (see notes)

### Unit 1 - Rational analysis  (DONE: 6/6 gated, all 180 questions hand-verified)
- [x] rational-holes (va-holes) - exemplar, gold standard
- [x] rational-asymptotes (ha-slant) - degree rules, long division quotients checked
- [x] rational-graphing (rational-graph) - holes/walls/intercepts, hole heights checked
- [x] poly-inequalities (poly-ineq) - sign charts, squared-factor exception, one-side moves
- [x] rational-inequalities (rational-ineq) - no cross-multiply, combine-then-sign, walls open
- [x] fundamental-theorem-algebra / id "fta" (fta) - counts w/ multiplicity, conjugate pairs

### Unit 2 - Trig completion (12)
- [ ] degrees-radians, angular-velocity, inverse-eval, inverse-graphs,
      trig-equations-basic, sum-difference-identities, double-angle-identities,
      half-angle-identities, verifying-identities, trig-equations-multi,
      ssa-ambiguous, sinusoidal-regression

### Units 3+ (new lesson bodies not yet built)
- Pending the lesson-body build-out (Polar, Parametrics, Vectors, Matrices,
  Conics, Series, Calculus). Their climb/summit come with each body.

## Blockers / notes

(none yet)
