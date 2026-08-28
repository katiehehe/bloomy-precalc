# 05. Rational inequalities

- Skill id: `rational-ineq`
- Unit: Rational analysis (Unit 1)
- Status: authored (Journey: `rational-inequalities`)

## Goal
Solve a rational inequality with sign analysis across both numerator zeros and denominator walls, excluding forbidden values and choosing endpoints correctly.

## Skills from the original 57-list covered here
- `rational-ineq` Rational inequalities

## Prerequisites (must already be learned)
- Polynomial inequalities and the sign-strip method (lesson 04).
- Vertical asymptotes / undefined points of a rational function (lesson 01).

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: Rational Functions.
- Sullivan, Precalculus: Polynomial and Rational Inequalities.

## Slides (one idea per slide; one visual change per beat)
1. Two kinds of boundary: a numerator zero (solid, value is 0) and a denominator zero (open wall, always excluded).
2. Sign across every boundary: test each interval; the sign can flip at a wall as well as at a zero.
3. Solution and the open wall: shade the positive intervals; contrast `>` vs `>=` and stress the wall stays excluded either way.

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- Choice: where the fraction equals zero (top only).
- Manipulate: drag into a region where `r(x) > 0`; check sign (and that the value is defined).
- Manipulate: drag into a region where `r(x) < 0`.
- Choice: sign of the middle interval by a test point.
- Choice: the `>=` solution set, bracketing the zero but never the wall.
- Choice pitfall: why not multiply both sides by `x + 1`.

## Figure and interactions (draw it literally; let the learner play)
- Shared `InequalityGraph` with `r(x) = (x-3)/(x+1)`, `vas: [-1]`, `zeros: [3]`.
- Reveals separate the numerator zero (`criticals`, filled dot) from the denominator wall (`va`, dashed line + open dot), then sign strip and shaded solution.
- Dock shows the fraction and either `r(x) >/=/< 0` or "is undefined" at the tracer.

## Known pitfalls to avoid
- Never include a denominator zero, even for `>=`.
- Do not clear the denominator by multiplying; its sign is unknown.
- Keep watch beats free of interaction commands.

## Author notes
- Reused `InequalityGraph`; added a reveal split so the solid zero and the open wall appear on separate beats.
