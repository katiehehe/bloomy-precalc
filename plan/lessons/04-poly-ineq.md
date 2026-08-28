# 04. Polynomial inequalities

- Skill id: `poly-ineq`
- Unit: Rational analysis (Unit 1, block start)
- Status: authored (Journey: `poly-inequalities`)

## Goal
Solve a polynomial inequality by finding real zeros, testing the sign on each interval, and writing the solution with correct open/closed endpoints.

## Skills from the original 57-list covered here
- `poly-ineq` Polynomial inequalities

## Prerequisites (must already be learned)
- Factoring polynomials into linear factors.
- Reading a real zero as an x-intercept.
- Interval and union notation.

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: Polynomial Functions / sign analysis.
- Sullivan, Precalculus: Polynomial and Rational Inequalities.

## Slides (one idea per slide; one visual change per beat)
1. Where the sign can change: a smooth polynomial only switches sign at a real zero, so the zeros are the boundary points.
2. Test each interval: pick one point per interval, build the sign strip, note the alternation when every factor is simple.
3. Write the solution: keep the intervals with the wanted sign; strict `>` gives open endpoints, `>=` fills the zeros.

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- Manipulate: drag the tracer into a positive stretch; check `p(x) > 0`.
- Manipulate: drag into a negative stretch; check `p(x) < 0`.
- Choice: sign between two given boundaries (test-point reasoning).
- Choice: full sign pattern left to right.
- Choice: the solution set of `p(x) > 0` in interval notation.
- Choice: why the boundaries are open circles for a strict inequality.

## Figure and interactions (draw it literally; let the learner play)
- Shared `InequalityGraph` with `p(x) = (x+2)(x-1)(x-3)`.
- Reveals: curve, critical points (filled zeros), per-interval `+/-` sign strip, shaded solution set with open endpoints.
- Dock shows the factored form and the live sign of `p` at the tracer.

## Known pitfalls to avoid
- Do not tell the learner to drag during watch beats; interaction prompts belong to the try stage.
- Even-multiplicity factors touch without flipping sign (kept out of this first example, which uses three simple factors).
- Endpoint circles must match strictness (open for `>`, filled for `>=`).
