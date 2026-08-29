# mtx-inv - Inverses

Unit 6 (Matrices). Builds directly on mtx-mul (row times column) and the idea of
the determinant. Uses the shared `MatrixGrid` figure plus `AlgebraFlow` for the
step-by-step derivation.

## Goal
Understand that the inverse of a square matrix is the matrix that "undoes" it
($A A^{-1} = A^{-1} A = I$), build a 2x2 inverse with the swap, negate, divide
recipe, know that an inverse exists only when the determinant is nonzero, and use
the order-reversing rule $(AB)^{-1} = B^{-1} A^{-1}$.

## Sources
Standard precalculus (OpenStax Precalculus 7.7 "Solving Systems with Inverses";
Stewart, Larson, Blitzer matrix chapters). The 2x2 inverse formula, the
determinant condition for invertibility, and the order-reversal rule for the
inverse of a product are textbook standard.

## Verified numbers
- Inverse definition: $A A^{-1} = A^{-1} A = I$, where $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$.
- 2x2 formula: for $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ with $\det = ad - bc \neq 0$,
  $A^{-1} = \frac{1}{\det}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$. Swap $a$ and $d$, negate $b$ and $c$, divide by the determinant.
- Clean example (det 1): $A = [[2,1],[3,2]]$, $\det = (2)(2) - (1)(3) = 1$, so $A^{-1} = [[2,-1],[-3,2]]$.
- Verify: $A A^{-1} = [[(2)(2)+(1)(-3),\ (2)(-1)+(1)(2)],[(3)(2)+(2)(-3),\ (3)(-1)+(2)(2)]] = [[1,0],[0,1]] = I$.
- Second clean example (det 1): $A = [[3,2],[1,1]]$, $A^{-1} = [[1,-2],[-1,3]]$.
- Non-unit determinant: $A = [[4,3],[2,2]]$, $\det = 8 - 6 = 2$, $A^{-1} = \frac{1}{2}[[2,-3],[-2,4]] = [[1,-1.5],[-1,2]]$.
- Singular: $\det [[2,4],[1,2]] = 4 - 4 = 0$, so it has no inverse.
- Order reverses: $(AB)^{-1} = B^{-1} A^{-1}$. The identity is its own inverse.
- Your turn matrix: $M = [[a,3],[2,2]]$, $\det = 2a - 6$; singular exactly at $a = 3$.

## Slides
1. formula - what an inverse is ($A A^{-1} = I$) and the swap, negate, divide recipe worked on $[[2,1],[3,2]]$ to reach $[[2,-1],[-3,2]]$ (det 1, so no scaling needed here).
2. verify - multiply $A A^{-1}$ entry by entry (row times column, tying back to mtx-mul) and watch the identity appear.
3. fails - the determinant gate: $[[2,4],[1,2]]$ has $\det = 0$ so no inverse, and $[[4,3],[2,2]]$ has $\det = 2$ so every entry is divided by 2.
4. yourturn - a slider on the top-left entry $a$ of $[[a,3],[2,2]]$; watch $\det = 2a - 6$ move, then drive the matrix to singular ($\det = 0$).

## Figure
Shared `MatrixGrid` (SVG) shows the matrices ($A$, the built $A^{-1}$, the product,
the live slider matrix with its main-diagonal and anti-diagonal highlighted for
the determinant). `AlgebraFlow` carries the derivation lines (determinant, swap,
negate, divide) with a `MatrixGrid` header glyph, and the dock repeats the precise
work in KaTeX, including the $\frac{1}{\det}$ scalar factor.

## Quiz
15 Climb (the defining equation, the determinant formula, the swap and negate
pieces, det 1 inverses computed in full, does-an-inverse-exist via the
determinant, the identity's inverse) and 15 Summit (inverses that need the
$\frac{1}{\det}$ factor, verifying a claimed inverse, $(AB)^{-1} = B^{-1} A^{-1}$,
solving $AX = B$ as $X = A^{-1} B$, singular traps, and capstones). Every inverse
is verified by multiplying back to the identity.
