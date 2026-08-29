import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Multiply matrices". Grounded in the
 * lesson: the (i, j) entry of AB is row i of A dotted with column j of B; the
 * inner dimensions must match and the product takes the outer dimensions;
 * multiplication is associative but NOT commutative (AB != BA in general); the
 * identity leaves a matrix unchanged. Distractors are the classic traps:
 * multiplying entrywise, pairing row-with-row, swapping the order (BA), and
 * transposing the result. Every product below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-p1-tl",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry of $AB$ is:",
      choices: [
        { text: "$17$", explain: "That is $(1)(5) + (2)(6)$, pairing a row with a row; pair row $1$ of $A$ with column $1$ of $B$." },
        { text: "$19$", correct: true, explain: "$(1)(5) + (2)(7) = 5 + 14 = 19$." },
        { text: "$23$", explain: "That is the top-left of $BA$, not $AB$; order matters." },
        { text: "$5$", explain: "That is only $(1)(5)$; you must add $(2)(7)$ as well." },
      ],
    },
    {
      id: "c-rule",
      prompt: "The entry in row $i$, column $j$ of $AB$ equals:",
      choices: [
        { text: "row $i$ of $A$ dotted with column $j$ of $B$", correct: true, explain: "Multiply matching parts of that row and column, then add." },
        { text: "row $i$ of $A$ dotted with row $j$ of $B$", explain: "The second factor is a column of $B$, not a row." },
        { text: "the product of the $(i, j)$ entries", explain: "That is entrywise multiplication, which is not how matrices multiply." },
        { text: "column $i$ of $A$ dotted with column $j$ of $B$", explain: "The first factor is a row of $A$, not a column." },
      ],
    },
    {
      id: "c-p2-br",
      prompt: "For $A = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$, $B = \\begin{bmatrix} 4 & 1 \\\\ 2 & 5 \\end{bmatrix}$, the bottom-right entry of $AB$ is:",
      choices: [
        { text: "$15$", explain: "That is $(3)(5)$ alone; add $(1)(1)$ from row $2$, column $2$." },
        { text: "$18$", explain: "Check the pairing: row $2$ is $(1, 3)$ and column $2$ is $(1, 5)$." },
        { text: "$16$", correct: true, explain: "$(1)(1) + (3)(5) = 1 + 15 = 16$." },
        { text: "$8$", explain: "That is the top-left entry; the bottom-right uses row $2$ and column $2$." },
      ],
    },
    {
      id: "c-dim-2332",
      prompt: "What is the shape of $(2 \\times 3)(3 \\times 2)$?",
      choices: [
        { text: "$3 \\times 3$", explain: "The product takes the outer dimensions $2$ and $2$, not the inner ones." },
        { text: "$2 \\times 3$", explain: "That is the shape of $A$; the product is (outer) $2 \\times 2$." },
        { text: "$2 \\times 2$", correct: true, explain: "Inner $3$s match, and the product is (outer) $2 \\times 2$." },
        { text: "undefined", explain: "The inner dimensions ($3$ and $3$) match, so the product exists." },
      ],
    },
    {
      id: "c-noncommute",
      prompt: "For general square matrices $A$ and $B$, is $AB = BA$?",
      choices: [
        { text: "Yes, always.", explain: "We saw $AB \\neq BA$ for a simple pair; multiplication is not commutative." },
        { text: "No, not in general.", correct: true, explain: "Order matters: usually $AB \\neq BA$." },
        { text: "Yes, for all $2 \\times 2$ matrices.", explain: "Even $2 \\times 2$ matrices generally fail to commute." },
        { text: "Only if both are the zero matrix.", explain: "Many other special cases commute too (e.g. with the identity), but in general they do not." },
      ],
    },
    {
      id: "c-identity",
      prompt: "If $I$ is the identity matrix, what is $AI$?",
      choices: [
        { text: "$A$", correct: true, explain: "The identity leaves a matrix unchanged: $AI = IA = A$." },
        { text: "$I$", explain: "Multiplying by $I$ returns $A$, not $I$." },
        { text: "the zero matrix", explain: "That would be $A$ times the zero matrix, not the identity." },
        { text: "$A^2$", explain: "$A^2 = AA$; here one factor is $I$, so the result is $A$." },
      ],
    },
    {
      id: "c-cannot",
      prompt: "Can you multiply a $3 \\times 2$ matrix by another $3 \\times 2$ matrix (in that order)?",
      choices: [
        { text: "No: the inner dimensions ($2$ and $3$) do not match.", correct: true, explain: "For $(3 \\times 2)(3 \\times 2)$ the inner numbers are $2$ and $3$, which differ, so it is undefined." },
        { text: "Yes: the result is $3 \\times 2$.", explain: "The inner dimensions must match first, and $2 \\neq 3$." },
        { text: "Yes: the result is $2 \\times 2$.", explain: "The product is undefined because the inner dimensions differ." },
        { text: "Yes, but only if the entries match.", explain: "Multiplicability depends on shape, not on the entries." },
      ],
    },
    {
      id: "c-matvec",
      prompt: "Compute the top entry of $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix}$.",
      choices: [
        { text: "$11$", explain: "That is $5 + 6$; you must weight by the row, $(1)(5) + (2)(6)$." },
        { text: "$17$", correct: true, explain: "$(1)(5) + (2)(6) = 5 + 12 = 17$." },
        { text: "$39$", explain: "That is the bottom entry, $(3)(5) + (4)(6)$." },
        { text: "$16$", explain: "Check the arithmetic: $(1)(5) + (2)(6) = 17$." },
      ],
    },
    {
      id: "c-p4-tr",
      prompt: "For $A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 1 & 2 \\\\ 0 & 5 \\end{bmatrix}$, the top-right entry of $AB$ is:",
      choices: [
        { text: "$6$", explain: "That is $(3)(2)$ alone; add $(1)(5)$ from column $2$." },
        { text: "$11$", correct: true, explain: "Row $1$ is $(3, 1)$, column $2$ is $(2, 5)$: $(3)(2) + (1)(5) = 6 + 5 = 11$." },
        { text: "$5$", explain: "That is only $(1)(5)$; you must add $(3)(2)$." },
        { text: "$17$", explain: "That pairs the wrong entries; use row $1$ and column $2$." },
      ],
    },
    {
      id: "c-rowcol",
      prompt: "The dot product of the row $(2, 3)$ with the column $\\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}$ is:",
      choices: [
        { text: "$10$", explain: "Check: $(2)(4) + (3)(1) = 8 + 3 = 11$, not $10$." },
        { text: "$14$", explain: "That is $(2)(4) + (3)(2)$; the column's second entry is $1$." },
        { text: "$11$", correct: true, explain: "$(2)(4) + (3)(1) = 8 + 3 = 11$." },
        { text: "$9$", explain: "That is $2 + 3 + 4$; multiply matching parts, then add." },
      ],
    },
    {
      id: "c-p1-br",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the bottom-right entry of $AB$ is:",
      choices: [
        { text: "$44$", explain: "Check the pairing: row $2$ is $(3, 4)$, column $2$ is $(6, 8)$." },
        { text: "$46$", explain: "That is the bottom-right of $BA$, not $AB$." },
        { text: "$50$", correct: true, explain: "$(3)(6) + (4)(8) = 18 + 32 = 50$." },
        { text: "$32$", explain: "That is only $(4)(8)$; add $(3)(6)$." },
      ],
    },
    {
      id: "c-zero",
      prompt: "What is $A$ times the zero matrix $O$ (same size)?",
      choices: [
        { text: "The zero matrix $O$", correct: true, explain: "Every entry is a dot product with a column of zeros, so all entries are $0$." },
        { text: "$A$", explain: "That is what the identity does; the zero matrix sends everything to $0$." },
        { text: "The identity $I$", explain: "Multiplying by $O$ gives $O$, never the identity." },
        { text: "undefined", explain: "As long as the shapes are compatible, the product is defined and equals $O$." },
      ],
    },
    {
      id: "c-p2-bl",
      prompt: "For $A = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$, $B = \\begin{bmatrix} 4 & 1 \\\\ 2 & 5 \\end{bmatrix}$, the bottom-left entry of $AB$ is:",
      choices: [
        { text: "$4$", explain: "That is $(1)(4)$ alone; add $(3)(2)$ from row $2$, column $1$." },
        { text: "$10$", correct: true, explain: "Row $2$ is $(1, 3)$, column $1$ is $(4, 2)$: $(1)(4) + (3)(2) = 4 + 6 = 10$." },
        { text: "$6$", explain: "That is only $(3)(2)$; you must add $(1)(4)$." },
        { text: "$16$", explain: "That is the bottom-right entry; the bottom-left uses column $1$." },
      ],
    },
    {
      id: "c-inner",
      prompt: "To multiply an $m \\times n$ matrix by a $p \\times q$ matrix, what must be true?",
      choices: [
        { text: "$m = q$", explain: "Those are outer dimensions; they set the product's shape, not whether it exists." },
        { text: "$n = p$ (the inner dimensions match)", correct: true, explain: "A row of length $n$ needs a column of length $p$ to dot with, so $n = p$." },
        { text: "$m = n$ and $p = q$ (both square)", explain: "Non-square matrices multiply fine as long as the inner dimensions match." },
        { text: "all four are equal", explain: "Only the inner pair must match." },
      ],
    },
    {
      id: "c-p4-br",
      prompt: "For $A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 1 & 2 \\\\ 0 & 5 \\end{bmatrix}$, the bottom-right entry of $AB$ is:",
      choices: [
        { text: "$20$", explain: "That is $(4)(5)$ alone; add $(2)(2)$ from row $2$, column $2$." },
        { text: "$22$", explain: "Check: row $2$ is $(2, 4)$, column $2$ is $(2, 5)$, giving $(2)(2) + (4)(5) = 24$." },
        { text: "$24$", correct: true, explain: "$(2)(2) + (4)(5) = 4 + 20 = 24$." },
        { text: "$26$", explain: "Recheck: $(2)(2) + (4)(5) = 4 + 20 = 24$, not $26$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-p1",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, what is $AB$?",
      choices: [
        { text: "$\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$", correct: true, explain: "Each entry is a row-with-column dot product: $19, 22, 43, 50$." },
        { text: "$\\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$", explain: "That multiplies entrywise; matrices combine rows with columns instead." },
        { text: "$\\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$", explain: "That is $BA$; order matters, so this is not $AB$." },
        { text: "$\\begin{bmatrix} 19 & 43 \\\\ 22 & 50 \\end{bmatrix}$", explain: "The right entries, but transposed; $22$ belongs in row $1$, column $2$." },
      ],
    },
    {
      id: "s-full-p2",
      prompt: "For $A = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$, $B = \\begin{bmatrix} 4 & 1 \\\\ 2 & 5 \\end{bmatrix}$, what is $AB$?",
      choices: [
        { text: "$\\begin{bmatrix} 8 & 0 \\\\ 4 & 15 \\end{bmatrix}$", explain: "That multiplies entrywise; use row-with-column dot products." },
        { text: "$\\begin{bmatrix} 8 & 2 \\\\ 10 & 16 \\end{bmatrix}$", correct: true, explain: "$(2)(4)+(0)(2)=8$, $(2)(1)+(0)(5)=2$, $(1)(4)+(3)(2)=10$, $(1)(1)+(3)(5)=16$." },
        { text: "$\\begin{bmatrix} 8 & 10 \\\\ 2 & 16 \\end{bmatrix}$", explain: "Right entries but transposed; $2$ belongs in row $1$, column $2$." },
        { text: "$\\begin{bmatrix} 10 & 2 \\\\ 8 & 16 \\end{bmatrix}$", explain: "The top-left is $(2)(4)+(0)(2)=8$, not $10$." },
      ],
    },
    {
      id: "s-ba-p1",
      prompt: "Using the same $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, what is $BA$?",
      choices: [
        { text: "$\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$", explain: "That is $AB$; for $BA$ the rows come from $B$ and the columns from $A$." },
        { text: "$\\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$", correct: true, explain: "$(5)(1)+(6)(3)=23$, $(5)(2)+(6)(4)=34$, $(7)(1)+(8)(3)=31$, $(7)(2)+(8)(4)=46$." },
        { text: "$\\begin{bmatrix} 23 & 31 \\\\ 34 & 46 \\end{bmatrix}$", explain: "Right entries but transposed; $34$ belongs in row $1$, column $2$." },
        { text: "$\\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$", explain: "That is the entrywise product, not a matrix product." },
      ],
    },
    {
      id: "s-matvec",
      prompt: "Compute $\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}$.",
      choices: [
        { text: "$\\begin{bmatrix} 13 \\\\ 15 \\end{bmatrix}$", correct: true, explain: "$(2)(4)+(1)(5)=13$ and $(0)(4)+(3)(5)=15$." },
        { text: "$\\begin{bmatrix} 8 \\\\ 15 \\end{bmatrix}$", explain: "The top entry needs $(1)(5)$ added: $8 + 5 = 13$." },
        { text: "$\\begin{bmatrix} 9 \\\\ 8 \\end{bmatrix}$", explain: "That adds entries without weighting by the matrix rows." },
        { text: "$\\begin{bmatrix} 13 & 15 \\end{bmatrix}$", explain: "A matrix times a column vector is a column vector, not a row." },
      ],
    },
    {
      id: "s-identity-commute",
      prompt: "Which statement about the identity matrix $I$ is correct?",
      choices: [
        { text: "$AI = IA = A$ for every square $A$ of matching size", correct: true, explain: "The identity is the multiplicative identity and commutes with every matrix." },
        { text: "$AI = A$ but $IA \\neq A$ in general", explain: "The identity works on both sides: $AI = IA = A$." },
        { text: "$AI = I$", explain: "Multiplying by $I$ returns $A$, not $I$." },
        { text: "$I$ only works for the zero matrix", explain: "The identity leaves every matrix unchanged." },
      ],
    },
    {
      id: "s-assoc",
      prompt: "Which property does matrix multiplication satisfy?",
      choices: [
        { text: "Commutative: $AB = BA$", explain: "This fails in general; order matters." },
        { text: "Associative: $(AB)C = A(BC)$", correct: true, explain: "Multiplication is associative, so you may group the factors either way." },
        { text: "$AB = O$ forces $A = O$ or $B = O$", explain: "Nonzero matrices can multiply to the zero matrix, so this fails." },
        { text: "$(AB)^{-1} = A^{-1}B^{-1}$", explain: "In fact $(AB)^{-1} = B^{-1}A^{-1}$: the order reverses." },
      ],
    },
    {
      id: "s-dim-chain",
      prompt: "What is the shape of the product $(3 \\times 2)(2 \\times 4)$?",
      choices: [
        { text: "$3 \\times 4$", correct: true, explain: "Inner $2$s match; the product takes the outer dimensions $3$ and $4$." },
        { text: "$2 \\times 2$", explain: "Those are inner dimensions; the product uses the outer ones." },
        { text: "$4 \\times 3$", explain: "The order of the outer dimensions is (rows of the first) by (columns of the second): $3 \\times 4$." },
        { text: "undefined", explain: "The inner dimensions ($2$ and $2$) match, so it is defined." },
      ],
    },
    {
      id: "s-cannot-mismatch",
      prompt: "Which product is undefined?",
      choices: [
        { text: "$(2 \\times 2)(3 \\times 3)$", correct: true, explain: "Inner dimensions $2$ and $3$ differ, so it cannot be formed." },
        { text: "$(2 \\times 3)(3 \\times 3)$", explain: "Inner $3$s match; this gives a $2 \\times 3$ product." },
        { text: "$(3 \\times 1)(1 \\times 3)$", explain: "Inner $1$s match; this gives a $3 \\times 3$ product." },
        { text: "$(1 \\times 4)(4 \\times 1)$", explain: "Inner $4$s match; this gives a $1 \\times 1$ product." },
      ],
    },
    {
      id: "s-square",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, what is $A^2 = AA$?",
      choices: [
        { text: "$\\begin{bmatrix} 1 & 4 \\\\ 9 & 16 \\end{bmatrix}$", explain: "That squares each entry; $A^2$ means the matrix product $AA$." },
        { text: "$\\begin{bmatrix} 7 & 10 \\\\ 15 & 22 \\end{bmatrix}$", correct: true, explain: "$(1)(1)+(2)(3)=7$, $(1)(2)+(2)(4)=10$, $(3)(1)+(4)(3)=15$, $(3)(2)+(4)(4)=22$." },
        { text: "$\\begin{bmatrix} 7 & 15 \\\\ 10 & 22 \\end{bmatrix}$", explain: "Right entries but transposed; $10$ belongs in row $1$, column $2$." },
        { text: "$\\begin{bmatrix} 2 & 4 \\\\ 6 & 8 \\end{bmatrix}$", explain: "That is $2A$ (scalar doubling), not the product $AA$." },
      ],
    },
    {
      id: "s-diag",
      prompt: "Compute $\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\begin{bmatrix} 4 & 0 \\\\ 0 & 5 \\end{bmatrix}$.",
      choices: [
        { text: "$\\begin{bmatrix} 8 & 0 \\\\ 0 & 15 \\end{bmatrix}$", correct: true, explain: "Diagonal times diagonal multiplies the diagonal entries: $2\\cdot4=8$, $3\\cdot5=15$." },
        { text: "$\\begin{bmatrix} 6 & 0 \\\\ 0 & 8 \\end{bmatrix}$", explain: "That adds the diagonal entries; multiply them instead." },
        { text: "$\\begin{bmatrix} 8 & 5 \\\\ 4 & 15 \\end{bmatrix}$", explain: "The off-diagonal entries are $0$ because each is a dot product with a zero." },
        { text: "$\\begin{bmatrix} 8 & 0 \\\\ 0 & 8 \\end{bmatrix}$", explain: "The bottom-right is $3\\cdot5=15$, not $8$." },
      ],
    },
    {
      id: "s-entrywise-trap",
      prompt: "A student computes $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$. What went wrong?",
      choices: [
        { text: "Nothing; that is correct.", explain: "That is the entrywise product, not the matrix product." },
        { text: "They multiplied entrywise instead of dotting rows with columns; the answer is $\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$.", correct: true, explain: "Each entry must be a row-with-column dot product, giving $19, 22, 43, 50$." },
        { text: "They should have added the matrices.", explain: "The task is multiplication; the fix is the row-column rule, not addition." },
        { text: "They used $BA$ instead of $AB$.", explain: "$BA = \\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$; the shown matrix is the entrywise product." },
      ],
    },
    {
      id: "s-solve-entry",
      prompt: "Find $x$ so that $\\begin{bmatrix} 1 & x \\\\ 2 & 1 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$ has top entry $11$.",
      choices: [
        { text: "$x = 2$", correct: true, explain: "Top entry is $(1)(3) + (x)(4) = 3 + 4x$; set $3 + 4x = 11$, so $x = 2$." },
        { text: "$x = 1$", explain: "$3 + 4(1) = 7$, not $11$." },
        { text: "$x = \\tfrac{11}{7}$", explain: "That divides $11$ by $7$; the equation is $3 + 4x = 11$." },
        { text: "$x = 4$", explain: "$3 + 4(4) = 19$, not $11$." },
      ],
    },
    {
      id: "s-rowvec",
      prompt: "Compute $\\begin{bmatrix} 1 & 2 \\end{bmatrix}\\begin{bmatrix} 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$.",
      choices: [
        { text: "$\\begin{bmatrix} 13 & 16 \\end{bmatrix}$", correct: true, explain: "$(1)(3)+(2)(5)=13$ and $(1)(4)+(2)(6)=16$; a $(1\\times2)(2\\times2)$ product is $1 \\times 2$." },
        { text: "$\\begin{bmatrix} 3 & 8 \\end{bmatrix}$", explain: "That multiplies entrywise across the first row only; dot the row with each column." },
        { text: "$\\begin{bmatrix} 11 \\\\ 17 \\end{bmatrix}$", explain: "That treats the row as a column; a row vector times a matrix gives a row vector." },
        { text: "$\\begin{bmatrix} 13 \\\\ 16 \\end{bmatrix}$", explain: "Right numbers, wrong shape: the result is a row, $\\begin{bmatrix} 13 & 16 \\end{bmatrix}$." },
      ],
    },
    {
      id: "s-inverse-order",
      prompt: "If $A$ and $B$ are invertible, what is $(AB)^{-1}$?",
      choices: [
        { text: "$A^{-1}B^{-1}$", explain: "The order reverses when you invert a product." },
        { text: "$B^{-1}A^{-1}$", correct: true, explain: "$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$, so the inverse reverses the order." },
        { text: "$(BA)^{-1}$", explain: "$AB$ and $BA$ generally differ, so their inverses do too." },
        { text: "$A^{-1} + B^{-1}$", explain: "Inverses of products are not sums; the order simply reverses." },
      ],
    },
    {
      id: "s-big-entry",
      prompt: "For $A = \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 1 \\\\ 2 & 6 \\end{bmatrix}$, the bottom-right entry of $AB$ is:",
      choices: [
        { text: "$24$", explain: "That is $(4)(6)$ alone; add $(1)(1)$ from row $2$, column $2$." },
        { text: "$25$", correct: true, explain: "Row $2$ is $(1, 4)$, column $2$ is $(1, 6)$: $(1)(1) + (4)(6) = 1 + 24 = 25$." },
        { text: "$13$", explain: "That is the bottom-left entry, $(1)(5) + (4)(2)$." },
        { text: "$20$", explain: "That is the top-right entry, $(2)(1) + (3)(6)$." },
      ],
    },
  ],
};
