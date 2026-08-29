# mtx-3var - Three-variable systems

Unit 6 (Matrices). Solving a 3x3 linear system with an augmented matrix and
elementary row operations, then back-substitution. Reuses the shared `MatrixGrid`.

## Goal
Turn a system of three linear equations into an augmented matrix, use the three
legal elementary row operations to clear the first column below the pivot,
back-substitute from the bottom row up to read the solution, and recognize when a
reduced row signals no solution or infinitely many solutions.

## Sources
Standard precalculus: OpenStax Precalculus 2e, section 9.6 "Solving Systems with
Gaussian Elimination" (augmented matrix notation, the three row operations,
row-echelon form, inconsistent and dependent systems); Stewart/Larson/Blitzer
matrix chapters agree on the notation and the three operations. All arithmetic
below is hand-checked.

## Verified numbers
- System: x + y + z = 6 ; 2x + y + z = 7 ; x + 2y + z = 8. Solution (x, y, z) = (1, 2, 3).
  Check: 1 + 2 + 3 = 6; 2(1) + 2 + 3 = 7; 1 + 2(2) + 3 = 8. All correct.
- Augmented matrix: [[1,1,1,6],[2,1,1,7],[1,2,1,8]].
- R2 -> R2 - 2R1: (2-2, 1-2, 1-2, 7-12) = (0, -1, -1, -5).
- R3 -> R3 - R1: (1-1, 2-1, 1-1, 8-6) = (0, 1, 0, 2). Reduced: [[1,1,1,6],[0,-1,-1,-5],[0,1,0,2]].
- Back-substitution: Row 3 gives y = 2. Row 2: -y - z = -5, so -2 - z = -5, z = 3. Row 1: x + 2 + 3 = 6, x = 1.
- Special endings: a row [0 0 0 | 5] means 0 = 5 (no solution, inconsistent); a row [0 0 0 | 0] means 0 = 0 (a free variable, infinitely many solutions).

## Slides
1. build-augmented (mode "setup"): strip the system into the 3x4 augmented matrix
   [A | b]; explain the bar divides coefficients from constants; name the three
   legal elementary row operations. Flags: aug, bar, ops.
2. clear-first-column (mode "eliminate"): mark the pivot, then R2 -> R2 - 2R1 and
   R3 -> R3 - R1 with entry-by-entry arithmetic, highlighting each changed row.
   Flags: piv, e1, e2.
3. back-substitute (mode "solve"): read y = 2 from row 3, z = 3 from row 2, x = 1
   from row 1, then verify (1, 2, 3) in all three original equations. Flags: s1..s4.
4. your-turn (mode "yourturn"): choice questions on identifying a legal row
   operation, reading a solution from a reduced matrix, and telling an
   inconsistent row (no solution) from an all-zero dependent row (infinitely many).
   Flags: inc, dep. No slider; the reveal stays animated and the figure keeps the
   MatrixGrid svg.

## Figure
Shared `MatrixGrid` (svg) shows the augmented matrix as a 3x4 grid. The constants
column (right of the bar) is tinted as a persistent divider cue; `hiRow` and
`hiCells` highlight the pivot and the row being changed or read; the caption
carries the current row operation (for example "R2 -> R2 - 2R1"). The dock renders
the same matrices in KaTeX with a true vertical bar via a `ccc|c` array, plus the
row-operation arithmetic and the back-substitution, revealed step by step.

## Quiz
15 Climb (legal vs illegal operations, setting up an augmented matrix, reading the
bar, single elimination steps, reading and back-substituting from triangular
matrices, a 2-variable warmup, spotting no-solution and infinitely-many rows) and
15 Summit (full 3-variable solves, a full 2-variable solve, sign-careful
back-substitution, an elimination step with negatives, counting solutions from
pivots, inconsistent vs dependent systems, and trap capstones on illegal moves and
misreading the solution order). Every triple is hand-verified.
