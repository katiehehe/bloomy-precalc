# binomial: Binomial theorem

## Skill
`binomial` (Unit 8 Series). Expand $(a+b)^n$ using binomial coefficients read
straight off Pascal's triangle, and pick out a single term without expanding the
rest.

## Learner goal (one sentence)
Given $(a+b)^n$, produce every coefficient from row $n$ of Pascal's triangle,
attach the falling and rising powers, and evaluate any chosen term.

## Sources
- OpenStax Precalculus 2e, section 11.6 "Binomial Theorem" (definition of
  $\binom{n}{k}$, the theorem, Pascal's triangle).
- Blitzer, Precalculus, "The Binomial Theorem" (worked expansions, single term).
- Stewart, Precalculus, "The Binomial Theorem" (Pascal recurrence, sign pattern
  for $(a-b)^n$).

## Core facts (all verified by hand)
- Binomial theorem: $(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{\,n-k} b^{\,k}$.
- Binomial coefficient: $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$, also the entry in
  row $n$, position $k$ (both counted from $0$) of Pascal's triangle.
- Pascal's triangle rows n = 0..6:
  [1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1], [1,5,10,10,5,1], [1,6,15,20,15,6,1].
- Recurrence: each interior entry is the sum of the two directly above it, e.g.
  the 6 in row 4 is 3 + 3 from row 3.
- In each term the power of $a$ falls $n \to 0$ while the power of $b$ rises
  $0 \to n$; the two exponents always sum to $n$; row $n$ has $n+1$ terms.
- Worked: $(x+1)^3 = x^3 + 3x^2 + 3x + 1$ (row 1,3,3,1).
- Worked single term: the $x^2$ term of $(x+2)^4$ is
  $\binom{4}{2} x^2 (2)^2 = 6 \cdot 4 \cdot x^2 = 24x^2$ (row 1,4,6,4,1).
- Sign pattern: $(a-b)^n$ alternates signs, e.g. $(x-1)^3 = x^3 - 3x^2 + 3x - 1$.

## Figure plan (bespoke)
No shared component fits, so `Stage.tsx` draws Pascal's triangle as an `<svg>`
inside `.figure-slot` on every slide (circles for entries, text for the numbers,
lines for the "sum of the two above" connectors). Slides 2 to 4 add a
`.figure-dock` that writes the theorem and the expansion line by line. The
highlighted row is what the your-turn slider drives.

## Slides (5)
1. `triangle` (Pascal SVG, no dock): build the triangle rows 0..6; reveal the
   recurrence by lighting the 6 in row 4 and its two parents (3 and 3), then name
   the entry $\binom{n}{k}$ (row n, position k).
2. `theorem` (Pascal SVG + dock): state
   $(a+b)^n = \sum \binom{n}{k} a^{n-k} b^k$; highlight row 3 as the coefficients;
   show the falling/rising exponents that sum to n on $(a+b)^3$.
3. `expand3` (Pascal SVG + dock): expand $(x+1)^3$ with row 1,3,3,1, one term at a
   time, landing on $x^3 + 3x^2 + 3x + 1$.
4. `term` (Pascal SVG + dock): $(a+b)^4$ from row 1,4,6,4,1, then pull just the
   $x^2$ term of $(x+2)^4 = \binom{4}{2} x^2 (2)^2 = 24x^2$.
5. `your-turn` (Pascal SVG + dock): integer slider n in [0,6] highlights row n and
   lists its coefficients. Starts at n = 2 (row 1,2,1, off the answer); target is
   n = 4 (row 1,4,6,4,1). check: round(values.n) === 4.

## Reveal flags (read literally in Stage.tsx, kept in sync with slides.ts)
- triangle: rows, parents, cnotation
- theorem:  rows (base), coeffs, exps
- expand3:  rows (base), coeffs, terms, result
- term:     rows (base), coeffs, formula, terms, result
- your-turn: rows (base); the highlighted row is driven by the n slider

## Quiz plan
Climb (15): read the recurrence and $\binom{n}{k}$, count terms (n+1), read the
right row, compute small coefficients, expand $(x+1)^3$, identify which exponent
falls, and a first $(a-b)^n$ sign case. Summit (15): full expansions with
constants like $(x+2)^3$ and $(2x-1)^3$, single-term extraction with powers of a
constant, $(a-b)^n$ sign reasoning, symmetry $\binom{n}{k} = \binom{n}{n-k}$, and
the general-term form. Traps: n terms instead of n+1, reading the wrong row,
dropping the coefficient, swapping which exponent falls, sign slips on
$(a-b)^n$, and miscomputing $\binom{n}{k}$. Every value verified by hand.
