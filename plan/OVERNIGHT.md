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

### Unit 5 - Vectors  (DONE: 3/3 gated, 90 questions hand-verified; vec-mag/comp/ops stay Base Camp)
Shared infra: `src/components/VectorPlane.tsx` (arrows, angle arc, projection,
component legs, drag/plot, underlay/overlay slots for ramps/compasses). Reused
across all three lessons, analogous to ComplexPlane/RootsPlane. Runtime-validated:
angle arc (vec-dot/vec-models), projection drop (vec-dot), overlay compass + bearing
arc (vec-models), underlay ramp + block + rectangle + second angle arc (vec-incline).
- [x] vec-dot (vec-dot) - exemplar; a.b scalar, sign->angle, cos th = (a.b)/(|a||b|), scalar/vector projection, perpendicular test. a=(4,2), b=(1,3): a.b=10, th=45, proj=(2,1). 30 Q. Committed 70ecb4a.
- [x] vec-models (vec-models) - forces/velocity/navigation; resultant = vector sum, |R| hypotenuse, bearing = 90-theta, equilibrium R=0. R=(3,4): |R|=5, th=53.13, bearing 36.87 (N37E). 30 Q hand-verified, compass/bearing shots OK.
- [x] vec-incline (vec-incline) - weight on ramp: along = W sin a, normal = W cos a; 3-4-5 ramp (6, 8 -> 10). Inverse solves a=30/60. 30 Q hand-verified, ramp/rect/block-angle shots OK.

Unit 5 gate: check PASS (all 3), build PASS, smoke 9/9 clean (3 lessons + 6 quiz routes).

### Unit 6 - Matrices  (DONE: 7/7 gated, 210 questions hand-verified)
Shared infra: `src/components/MatrixGrid.tsx` (SVG matrices in a left-to-right
row with operators/labels/brackets, row/column/cell/diagonal/anti-diagonal
highlighting, and a caption; renders the <svg> the smoke harness needs). The
arithmetic lessons reuse it; mtx-det/mtx-inv add AlgebraFlow for derivations;
mtx-tx reuses VectorPlane instead.
- [x] mtx-add (mtx-add) - entrywise add/subtract, scalar kA, shape rule, properties. A+B=[[6,8],[10,12]], 3A=[[3,6],[9,12]]. 30 Q hand-verified.
- [x] mtx-mul (mtx-mul) - exemplar; (AB)_{ij} = row i of A . col j of B; AB != BA; inner dims match. A=[[1,2],[3,4]], B=[[5,6],[7,8]] -> AB=[[19,22],[43,50]], BA=[[23,34],[31,46]]. 30 Q hand-verified. Runtime-validated MatrixGrid (row/col sweep highlight, AB!=BA, live k column). Committed 12c4e22.
- [x] mtx-det (mtx-det) - 2x2 ad-bc (diag vs anti), 3x3 cofactor (+-+), det=0 singular. det[[4,3],[2,5]]=14; 3x3 [[1,2,3],[4,5,6],[7,8,10]]=-3; live det=2d-4 (singular at d=2). 30 Q hand-verified (row swap -7, det(3A)=9*4=36, cofactor of 2nd 3x3 = 5).
- [x] mtx-inv (mtx-inv) - A^-1 = (1/det)[[d,-b],[-c,a]]. [[2,1],[3,2]]^-1=[[2,-1],[-3,2]]; det-2 case -> [[1,-3/2],[-1,2]]; live det=2a-6 (singular at a=3). 30 Q hand-verified (all inverses multiplied back to I; det=-2, det=10, (AB)^-1=B^-1A^-1).
- [x] mtx-3var (mtx-3var) - augmented matrix + row reduction, back-sub -> (1,2,3), no-solution vs infinite rows. 30 Q hand-verified.
- [x] mtx-cramer (mtx-cramer) - x_i=det(A_i)/det(A). 2x+y=5, x+3y=10 -> (1,3), det(A)=5; live x=(3c-10)/5, target x=4 at c=10 (integer-slider deviation, documented in OUTLINE). 30 Q hand-verified (every fresh system re-solved by substitution).
- [x] mtx-tx (mtx-tx) - VectorPlane-based; columns = images of basis vectors, unit square -> parallelogram, det = signed area factor (0 collapses, <0 flips). M1=[[3,2],[1,2]] det 4. 30 Q hand-verified (composition SR=[[2,0],[0,-2]], capstone [[0,-2],[2,0]] = 90deg rot + scale 2, det 4).

Unit 6 gate: check 38/38 PASS, build PASS, smoke 12/12 clean (4 new lessons + 8 quiz routes; mtx-add/mtx-mul/mtx-3var gated earlier). MatrixGrid + AlgebraFlow + VectorPlane figures runtime-validated via screenshots (diagonal/anti highlight, cofactor flow, column-replace highlight, parallelogram overlay).

### Unit 7 - Conics  (DONE: 2/2 gated; ellipses/hyperbolas/eccentricity/hyp-asym stay Base Camp)
Shared infra: `src/components/ConicPlane.tsx` (grid + circle/ellipse/parabola/
hyperbola/degenerate line-pair, centered at (h,k), oriented h/v, with foci,
directrix, asymptotes, vertices, center dot, labeled points/segments, and
underlay/overlay slots; `showCurve` gate hides the curve so the learner classifies
from A and C before the confirming shape appears). Analogous to VectorPlane/
ComplexPlane; reuses the Base Camp conic CSS classes.
- [x] conics-class (conics-class) - exemplar; classify from general form Ax^2+Cy^2+Dx+Ey+F=0 by A,C: AC=0 parabola, AC>0 ellipse (circle if A=C), AC<0 hyperbola; complete-the-square to a circle via AlgebraFlow; C-dial morphs ellipse->circle->line pair->hyperbola. Verified: 4x^2+9y^2-36=0 ellipse (x^2/9+y^2/4=1); x^2+y^2-4x-6y+9=0 circle center (2,3) r=2; x^2-y^2-4=0 hyperbola asymptotes y=+/-x; x^2-4x-y+4=0 parabola vertex (2,0). 30 Q hand-verified (complete-square centers/radii, degenerate point/no-graph/line-pair, sign traps). check PASS, build PASS, smoke 3/3 clean; all 5 slides shot-walked (AlgebraFlow result box, hyperbola+asymptotes, parabola vertex, live morph incl. degenerate line pair).
- [x] conics-model (conics-model) - reflective/geometric modeling, reuses ConicPlane. 5 scenarios, all numbers verified: parabolic dish (4 wide, 1 deep, rim (2,1), p=1, focus (0,1)); whispering-gallery ellipse x^2/25+y^2/9=1 (a=5,b=3,c=4, foci (+/-4,0), each leg over (0,3) is 5, sum 2a=10); LORAN hyperbola x^2/9-y^2/16=1 (a=3,b=4,c=5, foci (+/-5,0), vertex check 8-2=6=2a); flashlight (4 wide, 2 deep, rim (2,2), p=1/2, bulb (0,1/2), parallel beam); your-turn dish p=1/d, starts d=5 (off the p=1 answer). 30 Q hand-verified (ellipse minus vs hyperbola plus, radius vs width, focus vs vertex, 2a sum/difference). check PASS, build PASS, smoke 3/3 clean; all 5 slides shot-walked (dish rays+focus, ellipse focus-to-focus path, hyperbola focal radii, flashlight beam, live depth morph).

### Unit 8 - Series  (DONE: 6/6 gated)
Shared infra: `src/components/SeriesBars.tsx` (term bars over an index axis with
value tags and an activeThrough fade, a running-total track, an optional dashed
target line for a convergent limit, and a caption). Reused by the summation and
geometric-series lessons; binomial and induction add bespoke SVG (Pascal's
triangle, dominoes) plus AlgebraFlow.
Also fixed the shared narration parser `src/components/Rich.tsx` (`parseRich`,
used by NarratedText and Rich): split on `**bold**` first, then `$math$` inside
each span, so a bold span may contain math. Previously the math split ran first
and cut a bold span in half, leaving stray `**` and mis-bolded words. This also
repaired latent glitches in already-shipped lessons (de-moivre, vec-dot, etc.).
- [x] sigma (sigma) - exemplar; sum_{k=m}^{n} a_k, index/limits/summand, term count n-m+1, expand + evaluate, constant rule sum c = nc, index can start at 0, and sum_{k=1}^{n} k = n(n+1)/2. Verified: sum 1..5 = 15, sum(2k+1, 1..4) = 24, sum(3, 1..4) = 12, sum(2^k, 0..3) = 15. 30 Q hand-verified. check PASS, build PASS, smoke 3/3 clean; all 5 slides shot-walked.
- [x] arith-series (arith-series) - a_n = a_1 + (n-1)d, S_n = (n/2)(a_1 + a_n) via Gauss pairing (color-matched pairs), worked sums 55 and 275, your-turn odd numbers S_n = n^2 (starts n=3, target 25 at n=5). 30 Q hand-verified (n vs n/2, off-by-one counts, term vs sum, geometric trap; fixed one explanation typo). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (Gauss pairs, running totals).
- [x] finite-geo (finite-geo) - a_n = a_1 r^(n-1), shift-and-subtract derivation (AlgebraFlow) to S_n = a_1(1 - r^n)/(1 - r), sums 80 and 15/8, your-turn doubling S_n = 2^n - 1 (starts n=3, target 31 at n=5). 30 Q hand-verified (arithmetic-formula trap, sign slips for r>1, r^n vs r^(n-1), infinite-limit trap). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (line-by-line derivation, shrinking bars).
- [x] infinite-geo (infinite-geo) - converges iff |r| < 1, then S = a_1/(1 - r); partial sums S_1..S_5 step toward a dashed limit (reuses SeriesBars). Verified: 1/2+1/4+... -> 1 (S_5=31/32); 3+1+1/3+1/9+... = 9/2 = 4.5; 1+1+1+... diverges (1/(1-1) undefined); your-turn a_1=1, S=1/(1-r), slider r=v/10 starts r=0.2 (S=1.25), target r=0.5 (S=2). 30 Q hand-verified (|r|<1 vs r<1, divergence traps, a_1/(1-r) slips). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (partial-sum track + dashed limit, shrink-vs-explode contrast).
- [x] binomial (binomial) - (a+b)^n = sum C(n,k) a^(n-k) b^k, coefficients from row n of Pascal's triangle (bespoke SVG built by the recurrence), a's power falls while b's rises (sum n), row n has n+1 terms. Verified: (x+1)^3 = x^3+3x^2+3x+1; x^2 term of (x+2)^4 = 24x^2; (x+2)^3, (2x-1)^3, (x-2)^4 const 16, symmetry C(8,5)=C(8,3)=56, C(6,3)=20. 30 Q hand-verified (n vs n+1 term count, wrong row, dropped 2^k, sign slips on (a-b)^n, swapped exponents). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (moved the 6=3+3 / C(4,2) labels below the triangle so they no longer overlap row-4 entries).
- [x] induction (induction) - prove P(n) for n>=1 with base case P(1) + inductive step P(k)=>P(k+1); bespoke dominoes SVG (fall = proven) + AlgebraFlow step. Running example 1+...+n=n(n+1)/2: base n=1 (1=1), step k(k+1)/2+(k+1)=(k+1)(k+2)/2, both-needed failure cases (broken chain vs no start), n=n+1 counterexample. Your-turn dominoes 1..n topple, starts n=2 (target 5). 30 Q hand-verified (assume-the-conclusion, finite-checks-are-not-proof, off-by-one P(k+1), base-only/step-only, odd-sum n^2 and 2^n>=n+1 variants). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (cascade, base check, boxed P(k+1) + P(k)->P(k+1) strip, both-parts failures).

Unit 8 gate: check 46/46 PASS, build PASS, smoke 18/18 clean across the 6 lessons (each lesson + climb + summit). SeriesBars reused by sigma/arith-series/finite-geo/infinite-geo; binomial (Pascal triangle) and induction (dominoes) add bespoke SVG, both runtime-validated via shot-walk.

### Unit 9 - Calculus readiness  (IN PROGRESS: 1/5 gated)
Shared infra: `src/components/CurvePlane.tsx` (a coordinate plane that plots one
or more function curves, auto-breaking the path at vertical asymptotes and
piecewise jumps; closed/open points for values, holes, and one-sided limits;
straight lines for secants/tangents; dashed vertical/horizontal guides for an
approach line x = a or a limit value y = L; and floating labels). Analogous to
ConicPlane/VectorPlane; colors come from the shared palette. dq/concavity reuse
it for curves + secant/tangent; limits-graph/continuity for holes, jumps, and
approach guides; limits-alg leans on AlgebraFlow with a small CurvePlane glyph.
- [x] dq (dq) - exemplar; average rate = secant slope (f(b)-f(a))/(b-a), difference quotient (f(a+h)-f(a))/h, f(x)=x^2 at a=1 simplifies to 2+h (AlgebraFlow), secants for h=1,0.5,0.25 tilt to the tangent slope 2 (= derivative 2x). Verified: avg rate [1,3]=4, [2,4]=6, [-2,1]=-1; ((3+h)^2-9)/h=6+h; general (a+h)^2-a^2)/h=2a+h -> 2a; linear DQ = m; x^2+3 still 2+h. 30 Q hand-verified (run/rise inverted, forgot to divide by h, 0/0 before simplifying, avg-of-outputs trap, cross-term drop, secant vs tangent). check PASS, build PASS, smoke 3/3 clean; 5 slides shot-walked (secant rise/run, difference-quotient legs, shrinking secants + boxed 2+h, tangent grazing (1,1), live h slider).
- [ ] concavity, limits-graph, limits-alg, continuity - subagents to run next (reuse CurvePlane; limits-alg adds AlgebraFlow).

## Blockers / notes

(none yet)
