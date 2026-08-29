# Continuity and discontinuity types (continuity)

Skill: `continuity` (topic: calc), Unit 9 Calculus readiness. Curriculum note:
"holes and vertical asymptotes are the discontinuity pictures" (connect to
rationals). Learner goal: decide whether a function is continuous at a point
using the three-part definition, and name each way it can fail (removable hole,
jump, infinite) plus which condition breaks and whether it can be patched.

## Sources
- OpenStax Precalculus 2e, Chapter on limits and continuity (three-part
  definition of continuity at a point; removable, jump, and infinite
  discontinuities).
- OpenStax Calculus Volume 1, Section 2.4 (Continuity): the three conditions and
  the classification of discontinuities.
- Stewart, Precalculus / Calculus (continuity at a number, one-sided limits).
- Sullivan, Precalculus (piecewise functions and continuity).
All definitions, worked examples, limits, jump sizes, and the asymptote location
are hand-verified below.

## The three conditions (verified)
f is continuous at x = a when ALL of:
1. f(a) is defined (there is a real output).
2. lim_{x->a} f(x) exists (the left and right limits agree).
3. lim_{x->a} f(x) = f(a) (the limit equals the value).
Intuition: you can trace through x = a without lifting the pencil.

## Worked numbers (verified)
- Continuous example: f(x) = (1/2)x^2 at a = 2. f(2) = (1/2)(4) = 2; limit = 2;
  equal, so continuous.
- Removable (hole): g(x) = (x^2 - 4)/(x - 2) = (x-2)(x+2)/(x-2) = x + 2 for
  x != 2. g(2) = 0/0 undefined (condition 1 fails), but lim = 2 + 2 = 4 exists.
  Patch by defining g(2) = 4. Hole at (2, 4).
- Jump: f(x) = x + 1 for x < 1, f(x) = x + 3 for x >= 1. Left limit = 2, right
  limit = 4, value f(1) = 4. Left 2 != right 4, so the two-sided limit DNE
  (condition 2 fails). Jump size = 4 - 2 = 2. Open dot (1, 2), closed dot (1, 4).
- Infinite: f(x) = 1/(x - 2). Vertical asymptote at x = 2 (1/0 undefined). As
  x -> 2^+, f -> +inf; as x -> 2^-, f -> -inf; limit DNE (condition 2 fails).
  Not patchable (no finite limit).
- Rule: polynomials are continuous everywhere; a rational is continuous
  everywhere except zeros of the denominator (hole if the factor cancels, wall
  if it does not).

## Slides (modes read literally in Stage.tsx, zero dead flags)
1. `three` - three-part definition on the smooth parabola (1/2)x^2 at x = 2; a
   closed point on the curve, dashed x = 2 and y = 2 guides meeting on it.
   Flags: curve, dot, approach, level.
2. `removable` - g = (x^2-4)/(x-2): AlgebraFlow factors and cancels to x + 2,
   the hole opens at (2, 4), then a patch dot fills it (define g(2) = 4).
   Flags: curve, fact, canc, hole, patch.
3. `jump` - the piecewise jump at x = 1: open dot (1, 2), closed dot (1, 4), a
   dashed jump = 2 marker; two-sided limit DNE.
   Flags: curve, openDot, closedDot, gap.
4. `infinite` - f = 1/(x-2): the curve auto-breaks at a dashed wall x = 2, with
   +inf / -inf side labels; contrast with the fixable hole (a wall is not
   patchable). Flags: curve, wall, signs.
5. `your-turn` - interactive repair: the line x + 2 with a hole at (2, 4) plus a
   movable closed point at (2, v/10) driven by the slider v (0..50, value v/10,
   0..5). Start v = 10 (value 1, below the curve, off-answer); it becomes
   continuous only when the point fills the hole at height 4 (v = 40).
   Flag: curve; reads values.v.

## Figure
Shared `CurvePlane` (half = 6): curves for the parabola, line, piecewise
branches, and hyperbola (which auto-breaks at the asymptote); closed/open points
for values, holes, and jump endpoints; dashed vlines/hlines for guides and the
wall; a dashed line for the jump marker. Slide 2 docks an `AlgebraFlow`
factor-and-cancel derivation; the other slides dock a short formula list.

## Quiz
Climb 15 + Summit 15, four choices each, one correct, every choice explained.
Traps: forgetting one of the three conditions; "defined at a" alone implies
continuous; "limit exists" alone implies continuous; calling a jump removable;
thinking a hole cannot exist when the limit exists; believing an infinite
discontinuity is patchable; misidentifying which condition fails; confusing a
hole (cancels) with a wall (does not). Every limit, jump size, patch value, and
asymptote location is verified.
