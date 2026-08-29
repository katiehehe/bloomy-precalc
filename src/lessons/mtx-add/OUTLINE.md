# mtx-add - Add and scale matrices

Unit 6 (Matrices). Prerequisite for `mtx-mul`. Reuses the shared `MatrixGrid`
component (SVG), exactly like the multiplication lesson.

## Goal
Add and subtract two matrices entry by entry (only when the shapes match), and
multiply a matrix by a scalar by hitting every entry. Know the two properties
that make addition friendly (it is commutative and scalars distribute) and the
one rule you must check first (the shapes must be identical).

## Sources
Standard precalculus: OpenStax Precalculus 2e, section 9.5 "Matrices and Matrix
Operations" (entrywise addition and subtraction, scalar multiplication, the
same-dimension requirement, commutative and distributive properties). Cross
checked against Stewart/Larson matrix chapters. All conventions are textbook
standard; no notation invented.

## Verified numbers (all hand-checked)
- A = [[1,2],[3,4]], B = [[5,6],[7,8]].
- Addition is entrywise and needs matching shapes: A + B = [[6,8],[10,12]].
- Subtraction is entrywise too: A - B = [[-4,-4],[-4,-4]].
- Scalar multiply hits every entry: 3A = [[3,6],[9,12]]; -2B = [[-10,-12],[-14,-16]].
- Combined: 2A + B = [[7,10],[13,16]] (2A = [[2,4],[6,8]], then add B).
- Combined: 3A - 2B = [[-7,-6],[-5,-4]] (2B = [[10,12],[14,16]]).
- Properties: A + B = B + A (commutative) and k(A + B) = kA + kB (distributive).
- Shapes must match: a 2x2 cannot be added to a 2x3 (the extra column has no partner).
- Your turn: kA = [[k,2k],[3k,4k]]; the top-left of A is 1, so the top-left of kA is k.

## Slides
1. add - entrywise addition of A and B; reveal each sum cell one at a time,
   highlighting the two matching source cells (A in one tone, B in another) and
   the landing cell (result tone). Caption shows the live sum, e.g. 1 + 5 = 6.
2. scale - scalar multiplication 3A; reveal each cell as 3 times the matching
   entry, highlighting the source and the result. Callout: hit EVERY entry.
3. props - properties and the shape rule. Dock reveals A + B = B + A
   (commutative), then k(A + B) = kA + kB (distributive), then the same-shape
   rule; the figure finally shows a 2x2 next to a 2x3 with the orphan third
   column flagged, so the sum is undefined.
4. yourturn - a slider k scales A live. Every one of the four entries of
   kA = [[k,2k],[3k,4k]] moves together. Manipulate question starts OFF the
   answer (start k = 2): set k so the top-left of kA equals 5, which needs k = 5.

## Figure
Shared `MatrixGrid` (SVG): a left-to-right row of matrices and operators
(A + B = C, 3A, kA, and the 2x2 + 2x3 mismatch), with matching-cell highlights,
labels, and a caption carrying the live arithmetic. The dock carries the precise
KaTeX (the entry rule and the properties). Reveal flags are read literally in the
Stage so the harness sees each one.

## Quiz
15 Climb (single step: entrywise sums and differences, one scalar-multiple
entry, a "can these be added?" shape check, and identify a kA result) and 15
Summit (multi step: full 2A + B and 3A - 2B, the properties, shape mismatches, a
solve-for-k, and trap capstones). Distractors are the classic traps: multiplying
entries instead of adding, scaling only one entry, adding mismatched shapes, and
sign slips in subtraction. Every value is hand-verified.
