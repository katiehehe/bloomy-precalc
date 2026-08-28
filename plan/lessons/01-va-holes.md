# 01. Vertical asymptotes and holes

- Skill id: `va-holes`
- Unit: Rational analysis (Unit 1, block start)
- Status: planned -> **pilot built this session** (folder `rational-holes`, Journey id `rational-holes`)

## Goal
The learner can tell a hole from a vertical asymptote on a rational graph by
looking at which factors cancel and which denominator zeros remain.

## Skills from the original 57-list covered here
- `va-holes` Vertical asymptotes and holes

## Prerequisites (must already be learned)
- Factoring quadratics; zeros of a polynomial (Algebra 2, assumed).
- Reading a coordinate graph.

## Sources to cite
- OpenStax Precalculus 2e: "Rational Functions" (vertical asymptotes and
  removable discontinuities).
- Stewart, Precalculus: "Rational Functions" (holes from common factors).

## Worked function
`f(x) = (x + 2)(x - 1) / ((x - 1)(x - 3))`
- The factor `(x - 1)` cancels: simplified `g(x) = (x + 2)/(x - 3)`, x != 1.
- Hole at `x = 1`: `g(1) = 3 / (-2) = -1.5`, so the point `(1, -1.5)` is missing.
- Denominator zero that remains: `x = 3` -> vertical asymptote (dashed line).
- x-intercept from the numerator: `x = -2` -> `(-2, 0)`.
- End behavior levels toward `y = 1` (equal degrees); shown faint, explained in lesson 02.

## Slides (one idea per slide; one visual change per beat)
1. **A rational function is a ratio.** Show `f(x)` and its factored form. Nothing
   moves; this is text.
2. **Cancelling a factor makes a hole.** Reveal that `(x - 1)` cancels; draw an
   open circle at `(1, -1.5)`. (predict first: "what happens at x = 1?")
3. **A leftover zero makes a wall.** Denominator zero at `x = 3` stays: draw the
   dashed vertical asymptote; the curve shoots to +/- infinity beside it.
4. **Play:** drag the tracer; watch `y` blow up near `x = 3` but the graph simply
   skip the single point at `x = 1`.

## Questions (predict-before-reveal; retrieval)
- choice: "Cancelling the shared factor $(x-1)$ creates what at $x=1$?" ->
  [hole (correct), vertical asymptote, x-intercept].
- plot: "Click the point where the graph crosses the x-axis." target `(-2, 0)`,
  tol 0.45. (The x-intercept, not the taught hole, so nothing is given away.)
- manipulate: "Drag the tracer just left of the wall, into $2.5 < x < 3$."
  satisfied as `x` approaches 3 from the left.

## Figure and interactions
- Shared `RationalGraph`: plane with HALF = 5, curve split at the asymptote so it
  never draws across `x = 3`, open-circle hole, dashed VA, draggable vertical
  tracer with a live `(x, y)` readout that shows `y` growing near the wall.

## Known pitfalls to avoid
- Do not connect the curve across the vertical asymptote.
- The hole must be an open circle exactly at `(1, -1.5)`, not on the axis.
- No `atan`/em dashes; balanced `$...$`; tracer target reachable within range.

## Conceptual slide added: "Why the wall happens"
A second slide builds the intuition so the graph is not mysterious. As the tracer
slides in from the right, a live readout shows the top staying near 5 while the
bottom `x-3` shrinks (0.5, 0.05, ...): nonzero over tiny-positive explodes to
`+infinity`. From the left the bottom is tiny-negative, so `f -> -infinity`. It
closes by contrasting the hole (`0/0` that cancels to a finite value).
