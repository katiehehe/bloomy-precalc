# mtx-det - Determinants

Unit 6 (Matrices). Follows `mtx-mul`. Reuses the shared `MatrixGrid` figure for
the 2x2 diagonal rule and the shared `AlgebraFlow` for the 3x3 cofactor
expansion.

## Goal
Compute the determinant of a square matrix and read what it means: for a 2x2 it
is the main-diagonal product minus the anti-diagonal product ($ad - bc$); a
determinant of $0$ marks a singular matrix (no inverse, area collapses); a 3x3
is a cofactor expansion along a row using the $+\,-\,+$ sign pattern, where every
term is a 2x2 minor.

## Sources
Standard precalculus, cross-checked: OpenStax Precalculus 2e (Section 9.7,
"Solving Systems with Cramer's Rule": the 2x2 determinant $ad - bc$ and the 3x3
cofactor/expansion-by-minors definition with the $+\,-\,+$ sign array) and
Sullivan / Larson (Blitzer) precalculus matrix chapters (determinant notation
$\det A$ and $|A|$, singular matrix defined as $\det A = 0$, triangular
determinant equals the product of the diagonal, row-swap negates the
determinant, a common row scales the determinant). No invented notation.

## Verified numbers
- 2x2 rule: $\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$.
- Worked 2x2: $\det\begin{bmatrix} 4 & 3 \\ 2 & 5 \end{bmatrix} = (4)(5) - (3)(2) = 20 - 6 = 14$.
- Singular 2x2: $\det\begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix} = (2)(2) - (4)(1) = 4 - 4 = 0$.
- 3x3 cofactor along row 1, signs $+\,-\,+$, for $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 10 \end{bmatrix}$:
  $\det A = 1(5\cdot 10 - 6\cdot 8) - 2(4\cdot 10 - 6\cdot 7) + 3(4\cdot 8 - 5\cdot 7)$
  $= 1(2) - 2(-2) + 3(-3) = 2 + 4 - 9 = -3$.
- Your turn: $A = \begin{bmatrix} 2 & 4 \\ 1 & d \end{bmatrix}$, $\det A = 2d - 4$; $d = 2$ makes it singular ($\det A = 0$). Start $d = 6$ (off the answer, $\det A = 8$).
- Facts used in the quiz: $\det I = 1$; a triangular matrix's determinant is the product of its diagonal; swapping two rows negates the determinant; scaling one row by $k$ scales the determinant by $k$; for a 2x2, $\det(kA) = k^2\det A$; $\det A = 0$ means singular (no inverse).

## Slides
1. two-by-two - the $ad - bc$ rule. Highlight the main diagonal (one tone) then the anti-diagonal (a different tone), then the worked value $14$.
2. singular - what $\det = 0$ means, using $\begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$: equal diagonal products, determinant $0$, singular, no inverse, area collapses.
3. cofactor - the 3x3 expansion (result $-3$) built step by step in `AlgebraFlow`, stressing the $+\,-\,+$ signs and never skipping a 2x2 minor. The 3x3 shows as a `MatrixGrid` glyph with row 1 highlighted.
4. your-turn - dial $d$ in $\begin{bmatrix} 2 & 4 \\ 1 & d \end{bmatrix}$; $\det A = 2d - 4$ updates live on the figure; manipulate to make the determinant $0$ (start is off the answer), plus choice questions.

## Figure
Shared `MatrixGrid` (SVG) for the 2x2 rule (diagonal vs anti-diagonal highlight
and a live caption) and as the 3x3 glyph; shared `AlgebraFlow` for the cofactor
derivation with a labeled arrow per move. The dock carries the precise `\det`
computation with `Tex`.

## Quiz
15 Climb (2x2 determinants including negatives, reading $\det = 0$ as singular,
$\det I$, a triangular determinant, and "does an inverse exist?") and 15 Summit
(3x3 cofactor determinants, the effect of a row swap and a row scaling,
$\det(kA) = k^n\det A$ for a 2x2, singular versus invertible, solving for an
entry to hit a target determinant, and trap capstones: $ad + bc$, the
$bc - ad$ sign flip, dropping a cofactor sign, and multiplying only the diagonal
of a non-triangular matrix). Every determinant is hand-verified.
