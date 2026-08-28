# 06. Fundamental Theorem of Algebra and conjugate pairs

- Skill id: `fta`
- Unit: Rational analysis (Unit 1)
- Status: authored (Journey: `fta`)

## Goal
Count all n roots of a degree-n polynomial and place non-real roots as conjugate pairs mirrored across the real axis on the complex plane.

## Skills from the original 57-list covered here
- `fta` Fundamental Theorem of Algebra, complex/conjugate roots

## Prerequisites (must already be learned)
- Factoring and finding real zeros.
- Basic complex numbers: `i^2 = -1`, the form `a + bi`, and the conjugate.

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: Zeros of Polynomial Functions (Fundamental Theorem of Algebra, Complex Conjugate Theorem).
- Sullivan, Precalculus: Complex Zeros; Fundamental Theorem of Algebra.

## Slides (one idea per slide; one visual change per beat)
1. How many roots: FTA promises exactly n roots for degree n; factor `x^3 - x^2 + 4x - 4 = (x-1)(x^2+4)` and place the real root at 1.
2. Non-real roots travel in pairs: solve `x^2 + 4 = 0` for `2i`, then mirror to `-2i`; draw the conjugate connector.
3. Use the mirror: given `2i`, click where its conjugate must be; note that odd degree forces at least one real root.

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- Choice: number of roots of a degree-5 polynomial (with multiplicity).
- Choice: number of real roots of `(x-1)(x^2+4)`.
- Choice: the conjugate of `2i`.
- Choice: degree-4 with 2 real roots leaves how many non-real.
- Plot: click the conjugate of `2i` at `(0, -2)` on the Argand plane.
- Choice: odd-degree real polynomials have at least one real root.

## Figure and interactions (draw it literally; let the learner play)
- New `RootsPlane` (Argand plane): Re/Im axes, integer ticks labeled with `i` on the imaginary axis.
- Reveals: `real` roots, `pairsTop` (upper member), `pairsBottom` (conjugate), `mirror` (dashed connector).
- Plot slide hides `pairsBottom` so the conjugate is not given away; the plot marker reveals it on a correct click.
- Dock shows the factorization and a roots ledger `3 = 1 real + 2 non-real`.

## Known pitfalls to avoid
- Do not reveal the conjugate dot (or the mirror line to it) on the plot slide; it would give away the answer.
- Keep axis labels as Re/Im and label imaginary ticks with `i` to avoid the "y = 2" misread.
- No slider drives this figure; hide the slider row on every slide.
