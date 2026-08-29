# limits-alg: Limits algebraically

## Skill
`limits-alg` (topic calc, Unit 9 Calculus readiness). Evaluate a limit by hand:
try direct substitution first, and when it gives the indeterminate form 0/0,
simplify (factor and cancel, rationalize with a conjugate, or clear a compound
fraction) and then substitute.

## Learner goal
Given lim_{x->a} f(x), decide whether direct substitution works, recognize the
0/0 indeterminate form as a signal to simplify (not an answer), and carry out the
right algebra (factor/cancel, conjugate, compound fraction) to find the value.

## Sources (accuracy first)
- OpenStax Calculus Volume 1, Section 2.3 "The Limit Laws" (direct substitution
  for polynomials/roots. The factor-and-cancel and conjugate techniques for 0/0).
- OpenStax Precalculus 2e, Section 12.2 "Finding Limits: Numerical and Graphical
  Approaches" and 12.3 "Finding Limits: Properties of Limits" (substitution
  property, indeterminate 0/0, algebraic techniques).
- Stewart, Calculus / Sullivan, Precalculus (confirm the conjugate and compound
  fraction methods and the nonzero-over-zero vertical-asymptote contrast).

## Core facts (verified by hand)
- Direct substitution: if f is built from polynomials and roots and is defined at
  a (continuous there), then lim_{x->a} f(x) = f(a).
  Example: lim_{x->3}(x^2 + 1) = 3^2 + 1 = 10.
- 0/0 is an INDETERMINATE FORM: substitution gives 0/0, which is not a value. It
  signals "simplify first."
  Factor/cancel: lim_{x->2}(x^2 - 4)/(x - 2) = (x-2)(x+2)/(x-2) = x + 2 -> 4.
- Conjugate (rationalize a root): lim_{x->0}(sqrt(x+4) - 2)/x. Multiply top and
  bottom by sqrt(x+4) + 2: top becomes (x+4) - 4 = x. Cancel x. 1/(sqrt(x+4)+2).
  Substitute -> 1/(2+2) = 1/4.
- Compound (complex) fraction: lim_{x->0}(1/(x+3) - 1/3)/x. Combine the top over
  3(x+3): (3 - (x+3))/(3(x+3)) = -x/(3(x+3)). Divide by x -> -1/(3(x+3)).
  Substitute -> -1/(3*3) = -1/9.
- Nonzero over zero is NOT 0/0: lim_{x->2} 1/(x-2) is infinite (a vertical
  asymptote), not an indeterminate form you can cancel. Watch the contrast.
- Canceling is legal because x -> a means x is near a but never equal to a, so the
  common factor is nonzero and may be divided out.

## Slides (5. Reveal flags read literally in Stage.tsx)
1. `direct` (CurvePlane, half 12): direct substitution when allowed.
   lim_{x->3}(x^2+1) = 10 on the parabola y = x^2 + 1 with a CLOSED point (3, 10).
   Flags: curve, pt, guides. Dock: formula-list.
2. `factor` (AlgebraFlow dock + small CurvePlane glyph, half 6): the 0/0 case
   lim_{x->2}(x^2-4)/(x-2). Substitute -> 0/0. Factor. Cancel (x-2) with \cancel.
   = x+2. Substitute -> 4 (boxed). Glyph: line y = x+2 with OPEN hole at (2, 4).
   Flags: e1, e2, e3, e4.
3. `conjugate` (AlgebraFlow dock + glyph, half 1): lim_{x->0}(sqrt(x+4)-2)/x.
   Multiply by the conjugate. Top = (x+4)-4 = x. Cancel x. 1/(sqrt(x+4)+2).
   Substitute -> 1/4 (boxed). Glyph: curve y = 1/(sqrt(x+4)+2), OPEN hole (0, 1/4).
   Flags: e1, e2, e3, e4.
4. `cfrac` (AlgebraFlow dock + glyph, half 1): lim_{x->0}(1/(x+3) - 1/3)/x.
   Combine over 3(x+3). Numerator -x. Cancel x. -1/(3(x+3)). Substitute -> -1/9
   (boxed). Glyph: curve y = -1/(3(x+3)), OPEN hole (0, -1/9). Flags: e1..e4.
5. `yourturn` (CurvePlane, half 6): a fresh 0/0 limit
   lim_{x->1}(x^2-1)/(x-1) = x+1 -> 2. Glyph: line y = x+1 with OPEN hole (1, 2).
   Interactive PLOT: click the hole the line approaches at x = 1, target (1, 2),
   tolerance 0.6, label "(1, 2)". Starts unsolved. Plus one choice.
   Flags: line, hole, approach.

## Figure plan
Shared `src/components/CurvePlane.tsx` for every slide (an <svg> in the slot).
Slides 2, 3, 4 follow the finite-geo derive pattern: a small CurvePlane glyph in
the slot and the shared `src/components/AlgebraFlow.tsx` in the dock (align
"start"), with steps gated one per beat by reveal flags e1..e4 (the first flow
line always shows). Slides 1 and 5 dock a formula-list. Slide 5 wires the shared
`PlotMarkers` overlay to the click-a-point question via CurvePlane's onPoint.

Per-mode plane half-ranges: direct 12 (fits (3, 10)), factor 6, conjugate 1 and
cfrac 1 (zoomed so the small limit heights 1/4 and -1/9 are visible), yourturn 6.

## Your turn (interactive)
PLOT question on the line y = x + 1: click the open hole at (1, 2), the height the
simplified line approaches at x = 1. Target (1, 2), tolerance 0.6. It starts
unsolved (no guess), so the learner must read the value and click. The guess
crosshair and, once solved, the target ring plus "(1, 2)" label move on screen.
A second choice question checks the limit value is 2 (not 0/0).

## Quiz plan
Climb (15): when substitution is legal. The value of a substitutable limit.
0/0 as a signal not an answer. Factor x^2 - 4. The factor/cancel value 4. Why
canceling is legal (x != a). The conjugate of sqrt(x+4) - 2. The conjugate value
1/4. The difference of squares (x+4) - 4 = x. The compound-fraction numerator -x.
Its value -1/9. Nonzero over zero is a vertical asymptote (not 0/0). Which limit
is truly 0/0. Lim_{x->1}(x^2-1)/(x-1) = 2, and "still substitute after canceling."
Summit (15): more factor/cancel (x^2-9, x^2-4 at -2, x^3-1). More conjugates
(sqrt(x+9)-3, sqrt(x)-2, x/(sqrt(x+1)-1)). More compound fractions (1/(x+5)-1/5,
and a sign-flipped version giving +1/9). A reciprocal case 1/(x+3). The expand
trap ((x+2)^2 - 4), and the standard-method / trap questions. Traps: reporting
0/0 as the answer, canceling before factoring, forgetting to substitute after
canceling, sign slips (-1/9 vs 1/9), dropping the conjugate cross terms, and
treating nonzero/0 as 0/0. Correct option index varies. Every value verified.
