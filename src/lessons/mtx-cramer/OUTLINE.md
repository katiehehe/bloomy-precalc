# mtx-cramer - Cramer's rule

Unit 6 (Matrices). Uses the shared `MatrixGrid` component, like the mtx-mul exemplar.

## Goal
Solve a square linear system $A\mathbf{x} = b$ with Cramer's rule: when
$\det(A) \neq 0$, each variable is $x_i = \det(A_i)/\det(A)$, where $A_i$ is $A$
with its $i$-th column replaced by the constant column $b$. See that $\det(A)$ is
the one shared denominator for every variable, and that $\det(A) = 0$ means the
rule does not apply.

## Sources
Standard precalculus. OpenStax Precalculus 2e, chapter 9 (Systems of Equations
and Inequalities), section 9.8 "Solving Systems with Cramer's Rule"; Sullivan
Precalculus and Larson Precalculus matrix chapters. The 2x2 determinant (main
diagonal product minus anti-diagonal product) and the column-replacement
statement of Cramer's rule are textbook standard.

## Verified numbers
System: 2x + y = 5 and x + 3y = 10.
- A = [[2,1],[1,3]], b = (5,10), det(A) = (2)(3) - (1)(1) = 6 - 1 = 5 (not 0).
- A_x replaces column 1 with b: [[5,1],[10,3]], det = (5)(3) - (1)(10) = 15 - 10 = 5, x = 5/5 = 1.
- A_y replaces column 2 with b: [[2,5],[1,10]], det = (2)(10) - (5)(1) = 20 - 5 = 15, y = 15/5 = 3.
- Solution (x, y) = (1, 3). Check: 2(1) + 3 = 5 and 1 + 3(3) = 10. Both hold.
- Your turn: the top constant becomes a dial c, so 2x + y = c and x + 3y = 10.
  Then A_x = [[c,1],[10,3]], det(A_x) = (c)(3) - (1)(10) = 3c - 10, and
  x = (3c - 10)/5, while det(A) = 5 stays fixed. At c = 5 this is the original
  system, x = 1. Note x is an integer only when c is a multiple of 5
  (x = -2, 1, 4, 7 at c = 0, 5, 10, 15), so x = 2 is not reachable on an integer
  slider for this system; the reachable clean target is x = 4, which needs
  3c - 10 = 20, so c = 10.

## Slides
1. setup - the system, the coefficient matrix A and constant column b, the rule
   x_i = det(A_i)/det(A), and det(A) = (2)(3) - (1)(1) = 5.
2. solveX - replace column 1 of A with b (highlighted) to build A_x; det(A_x) = 5;
   x = 5/5 = 1; stress that the denominator is det(A), not det(A_x).
3. solveY - replace column 2 with b (highlighted) to build A_y; det(A_y) = 15;
   y = 15/5 = 3; state the answer (1, 3) and verify in both equations.
4. yourturn - dial the top constant c; A_x's first column, det(A_x), and x update
   live; manipulate to make x = 4 (c = 10, recomputed because x = 2 is not
   reachable on an integer slider); plus choice questions on the column to replace
   and the det(A) = 0 case.

## Figure
Shared `MatrixGrid` (SVG). Each slide shows the matrix whose determinant we take,
with `hiCol` marking the column swapped for b (tone "b") and the 2x2 determinant
shown by main-diagonal/anti-diagonal highlights plus a plain-text caption
(Unicode minus). The dock carries the KaTeX determinants (\det, \begin{vmatrix})
and the \dfrac division for each variable.

## Quiz
15 Climb (2x2 determinants, det(A_x) and det(A_y), which column to replace,
x = det(A_x)/det(A), and the det(A) != 0 condition) and 15 Summit (full 2x2
solves, a 3x3 conceptual replace-column-3-for-z, the det(A) = 0 breakdown, Cramer
vs substitution, and trap capstones: wrong column, dividing by det(A_x), sign
errors, ignoring det(A) = 0). Every determinant is hand-verified.
