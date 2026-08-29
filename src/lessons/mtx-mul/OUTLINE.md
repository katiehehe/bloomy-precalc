# mtx-mul - Multiply matrices

Unit 6 (Matrices). Exemplar for the shared `MatrixGrid` component.

## Goal
Multiply two matrices by combining a row of the left with a column of the right
(a dot product), place each result at its row/column, and know the two rules that
trip people up: multiplication is not commutative (AB != BA), and the inner
dimensions must match with the product taking the outer dimensions.

## Sources
Standard precalculus (OpenStax Precalculus 9.5 "Matrices and Matrix Operations";
Stewart/Larson matrix chapters). The row-by-column definition and the
non-commutativity example are textbook standard.

## Verified numbers
- A = [[1,2],[3,4]], B = [[5,6],[7,8]].
- AB = [[19,22],[43,50]]: (1)(5)+(2)(7)=19, (1)(6)+(2)(8)=22, (3)(5)+(4)(7)=43, (3)(6)+(4)(8)=50.
- BA = [[23,34],[31,46]] != AB, so order matters.
- Your turn: B = [[k,6],[7,8]]; top-left of AB = (1)(k)+(2)(7) = k+14; k=6 gives 20.

## Slides
1. rowcol - the row-times-column rule; compute the top-left entry (19), highlight row 1 of A and column 1 of B.
2. sweep - fill the other three entries one at a time, highlighting each active row/column.
3. order - BA differs from AB (not commutative); the inner-dimensions rule for shape.
4. yourturn - dial k = B's top-left entry; only the product's first column moves; manipulate to hit 20.

## Figure
Shared `MatrixGrid` (SVG): A x B = C laid out left to right, with a highlighted
row (A) and column (B), the active product cell, and a caption showing the live
dot product. Dock carries the precise entry computation.

## Quiz
15 Climb (single entries, the rule, dimensions, identity/zero, can-multiply) and
15 Summit (full products, BA vs AB, A^2, diagonal products, associativity,
inverse-order, solve-for-an-entry, entrywise trap). All products hand-verified.
