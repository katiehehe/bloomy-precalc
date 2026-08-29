# Concavity and inflection (concavity)

Skill: `concavity` (topic: calc, Unit 9 Calculus readiness). Concavity is the
one question "which way does a curve bend?": concave up (a cup, tangent lines
below) or concave down (a cap, tangent lines above). Where the bend switches is
an inflection point. Concavity is independent of increasing versus decreasing.

## Sources
- OpenStax Precalculus 2e and OpenStax Calculus Vol. 1 (concavity, the second
  derivative test, inflection points).
- Stewart, Calculus (concavity and points of inflection). Sullivan, Precalculus.
- Standard conventions: concave up has f'' > 0 and tangents below. Concave down
  has f'' < 0 and tangents above. An inflection point is where concavity
  changes (f'' = 0 is only a candidate, x^4 at 0 is the classic non-example).

## Takeaways
- Concave up bends like a cup or valley (holds water). Every tangent line lies
  below the curve. The tangent slope increases left to right. Example: x^2.
- Concave down bends like a cap, hill, or frown (spills water). Every tangent
  line lies above the curve. The tangent slope decreases. Example: -x^2, and
  sqrt(x).
- An inflection point is where concavity changes. f(x) = x^3 is concave down for
  x < 0 and concave up for x > 0, with an inflection point at (0, 0).
- Readiness second-derivative idea (descriptive): f'' > 0 is concave up, f'' < 0
  is concave down, f'' = 0 is a candidate. For x^3, f''(x) = 6x switches sign at
  0. f'' = 0 does not guarantee an inflection (x^4 at 0 stays concave up).
- Concavity is independent of increasing/decreasing. sqrt(x) is increasing yet
  concave down. The left arm of x^2 (x < 0) is decreasing yet concave up.

## Slides
1. updown  - concave up (x^2, cup, tangents below) vs concave down (-x^2, cap,
   tangents above). Flags: cup, cupTan, cap, capTan.
2. slopes  - on the cup x^2, tangents at x = -1.5, 0, 1.5 have slopes -3, 0, 3.
   The slopes increase left to right (that is concave up). Flags: curve, t1, t2, t3.
3. inflection - x^3 (drawn on [-1.8, 1.8]): concave down for x < 0, concave up
   for x > 0, inflection point at (0, 0). Second derivative 6x confirms the
   switch. Flags: curve, left, right, infl.
4. independent - sqrt(x) is increasing yet concave down. The left arm of x^2 is
   decreasing yet concave up. Concavity is separate from increasing/decreasing.
   Flags: root, rootTan, para, paraTan.
5. your-turn - slider drives a point along x^3 (x = v/10). Start x = -1.5
   (concave down, off answer). The manipulate passes only at x = 0 (the
   inflection point). Live f''(x) = 6x readout and concavity label. baseReveal
   curve. Reads values.x.

## Figure
Shared `CurvePlane` (half = 6): parabolas and the cubic as curves, tangent lines
as straight lines with touch dots, region labels, and a formula dock beneath.
The your-turn point is a closed dot whose position, f'' readout, and concavity
word are driven by the x slider.

## Quiz
Climb 15 + Summit 15. Traps: confusing concave up with increasing, tangents
above for concave up (they lie below), which side of x^3 is concave up, calling
every critical point an inflection, and assuming f'' = 0 guarantees an inflection
(x^4 at 0). Every claim hand-verified.
