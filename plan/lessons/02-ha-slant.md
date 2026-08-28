# 02. Horizontal and slant asymptotes

- Skill id: `ha-slant`
- Unit: Rational analysis (Unit 1, block start)
- Status: planned -> **pilot built this session** (folder `rational-asymptotes`, Journey id `rational-asymptotes`)

## Goal
The learner can predict a rational function's end behavior by comparing the
degrees of numerator and denominator: horizontal asymptote when degrees are
equal or the top is smaller, slant asymptote when the top is exactly one higher.

## Skills from the original 57-list covered here
- `ha-slant` Horizontal and slant asymptotes

## Prerequisites
- Vertical asymptotes and holes (lesson 01).
- Polynomial degree and leading coefficient; polynomial long division (assumed).

## Sources to cite
- OpenStax Precalculus 2e: "Rational Functions" (horizontal asymptote rules by
  degree; slant/oblique asymptote via division).
- Sullivan, Precalculus: "Properties of Rational Functions" (oblique asymptotes).

## Worked functions
- Horizontal, equal degree: `f(x) = (2x^2 + 1)/(x^2 + 1)`. Degrees equal ->
  `HA y = 2` (ratio of leading coefficients). No vertical asymptote (`x^2 + 1 > 0`).
  y-intercept `(0, 1)`.
- Slant: `g(x) = (x^2 + 1)/x = x + 1/x`. Top degree one higher -> divide ->
  slant asymptote `y = x`, vertical asymptote `x = 0`.

## Slides
1. **Compare the degrees.** State the three cases (top < bottom -> `y = 0`;
   equal -> ratio of leading coefficients; top one higher -> slant). Text beat.
2. **Equal degrees: a horizontal ceiling.** Draw `f`; reveal the dashed line
   `y = 2`; drag the tracer far right and watch `f(x)` approach 2. (predict: "what
   value does it approach?")
3. **One degree higher: a slanted guide.** Draw `g`; divide to `x + 1/x`; reveal
   the dashed line `y = x`; the curve hugs it far out, with a wall at `x = 0`.

## Questions
- choice (equal): "Equal degrees -> the horizontal asymptote is" -> [y = 0, the
  ratio of leading coefficients (correct), none].
- plot (equal): "Click a point on the line the curve approaches, at the right
  edge." target `(4, 2)`, tol 0.4, label "y = 2".
- choice (slant): "Top degree exactly one more -> the graph has a" -> [horizontal
  asymptote, slant asymptote (correct), hole].
- manipulate (slant): "Drag the tracer far right and watch f(x) approach y = x."
  satisfied for world `x >= 4`.

## Figure and interactions
- Shared `RationalGraph`, two modes (`horizontal`, `slant`) chosen by `slide.mode`.
  Dashed horizontal or slant guide line, tracer with readout, curve split at the
  vertical asymptote in slant mode.

## Known pitfalls to avoid
- HA is the ratio of leading coefficients, not of constants.
- Draw the slant guide as the true line `y = x`, and never connect across `x = 0`.
- Keep plot/tracer targets inside the plane (HALF = 5).

## Conceptual slide added: "Why the ends level off"
A slide between the two cases builds the intuition. A live top/bottom readout
shows that at `x = 1` the ratio is 1.5, at `x = 5` it is about 1.96: for huge `x`
the `x^2` terms dominate (`2x^2/x^2 = 2`), so the `+1`s stop mattering and the
graph flattens to `y = 2`.
