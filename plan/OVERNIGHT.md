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

### Unit 2 - Trig completion  (DONE: 12/12 gated, all 360 questions hand-verified)
- [x] degrees-radians (deg-rad) - exact radian multiples, arc length, DMS
- [x] angular-velocity (angular-velocity) - omega vs v = r*omega, rpm to rad/s
- [x] inverse-eval (inverse-eval) - restricted ranges, outside-range traps
- [x] inverse-graphs (inverse-graphs) - domain/range swap, reflection over y=x
- [x] trig-equations-basic (trig-eq-basic) - reference angles, all solutions +2kpi
- [x] sum-difference-identities (sum-diff) - exact 15/75 values, sign of formula
- [x] double-angle-identities (double-angle) - three cos2x forms, quadrant of 2x
- [x] half-angle-identities (half-angle) - sign from theta/2 quadrant, nested radicals
- [x] verifying-identities (verify) - work one side, no cross-multiply
- [x] trig-equations-multi (trig-eq-multi) - factor (never divide), widen then halve, extraneous roots
- [x] ssa-ambiguous (ssa) - zero/one/two triangles, supplement test
- [x] sinusoidal-regression (sin-regression) - amplitude, midline, period, phase

## Phase 2: build the remaining lesson BODIES (Units 3+) with climb/summit

The 18 built lessons (Units 1 to 2) now all have Climb + Summit. Phase 2 builds
the 28 "planned" lesson bodies (each: OUTLINE + slides.ts + Stage.tsx + quiz.ts,
wired into journey/registry.ts + journey/quizzes.ts), reusing Base Camp lessons
via links as designed. Depth-first, prerequisite order, gated + committed per
lesson or unit. Blockers get skipped, logged here, and left "coming soon".

Shared infra added this phase:
- `src/components/ComplexPlane.tsx` : Argand plane (phasor, modulus segment,
  argument arc, right-triangle legs, guide ring, evenly spaced dots, drag/plot).
  Reused across the whole Polar unit, analogous to RootsPlane.

### Unit 3 - Polar and complex polar  (DONE: 4/4 gated, 120 questions hand-verified; polar-rect + polar-graphs stay Base Camp)
- [x] modulus (modulus-argument) - exemplar; |z|, arg, quadrant fix; committed 78602eb
- [x] trig-form (trig-form) - r(cos+ i sin), rect <-> trig; 30 Q hand-verified, figure shots OK
- [x] polar-arith (polar-arith) - multiply/divide: moduli x, angles +/-; FOIL derivation; 30 Q, multi-phasor shots OK
- [x] de-moivre (de-moivre) - powers r^n cis(n t), roots of unity ring; 30 Q, roots ring/dots shots OK

Unit 3 gate: check 27/27 PASS, build PASS, smoke 9/9 clean (3 lessons + 6 quiz routes).
ComplexPlane reused across all four lessons (phasor, legs, arc, ring, dots).

### Unit 4 - Parametrics  (DONE: 1/1 gated, 30 questions hand-verified; param-graph + param-elim stay Base Camp)
- [x] param-motion (param-motion) - projectile over time; x linear, y quadratic; landing/peak/range; 30 Q hand-verified, arc figure shots OK. Model x=2t, y=4t-t^2 (land t=4, peak t=2, maxht 4, range 8), g folded. Gate: check PASS, build PASS, smoke 3/3 clean. Committed.

### Units 5 to 9 (queued, prerequisite order)
- Unit 5 Vectors: vec-dot, vec-models, vec-incline (vec-mag/comp/ops = Base Camp).
- Unit 6 Matrices: mtx-add, mtx-mul, mtx-det, mtx-inv, mtx-3var, mtx-cramer, mtx-tx.
- Unit 7 Conics: conics-class, conics-model (ellipses/hyperbolas/etc = Base Camp).
- Unit 8 Series: sigma, arith-series, finite-geo, infinite-geo, binomial, induction.
- Unit 9 Calculus readiness: concavity, dq, limits-graph, limits-alg, continuity.

## Blockers / notes

(none yet)
