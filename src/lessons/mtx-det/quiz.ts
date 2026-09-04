import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Determinants". Grounded in the
 * lesson: a 2x2 determinant is $ad - bc$ (main-diagonal product minus
 * anti-diagonal product); $\det = 0$ marks a singular matrix (no inverse); a
 * triangular determinant is the product of the diagonal; a 3x3 is a cofactor
 * expansion along a row with the $+\,-\,+$ sign pattern. The recurring traps are
 * adding the products ($ad + bc$), reversing the order ($bc - ad$), dropping a
 * cofactor sign, and multiplying only the diagonal of a matrix that is not
 * triangular. Every determinant below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-rule",
      prompt: "The determinant of $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is:",
      choices: [
        { text: "$ad - bc$", correct: true, explain: "The main-diagonal product $ad$ minus the anti-diagonal product $bc$." },
        { text: "$ab - cd$", explain: "That multiplies across the rows. The determinant uses the two diagonals." },
        { text: "$ad + bc$", explain: "The two diagonal products are subtracted, not added." },
        { text: "$ac - bd$", explain: "That multiplies down the columns. Use the diagonals $a, d$ and $b, c$." },
      ],
    },
    {
      id: "c-basic-14",
      prompt: "For $A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 5 \\end{bmatrix}$, $\\det A$ is:",
      choices: [
        { text: "$26$", explain: "That is $ad + bc = 20 + 6$. The products are subtracted, not added." },
        { text: "$-14$", explain: "That is $bc - ad$. The order is main minus anti, $20 - 6$." },
        { text: "$14$", correct: true, explain: "$(4)(5) - (3)(2) = 20 - 6 = 14$." },
        { text: "$7$", explain: "Check the arithmetic: $20 - 6 = 14$." },
      ],
    },
    {
      id: "c-basic-2",
      prompt: "$\\det \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$22$", explain: "That is $ad + bc = 12 + 10$. Subtract the products instead." },
        { text: "$2$", correct: true, explain: "$(3)(4) - (5)(2) = 12 - 10 = 2$." },
        { text: "$-2$", explain: "That is $bc - ad$. The order is main minus anti, $12 - 10$." },
        { text: "$12$", explain: "That is only $ad$. You must subtract $bc = 10$." },
      ],
    },
    {
      id: "c-negative",
      prompt: "$\\det \\begin{bmatrix} 2 & -3 \\\\ 4 & 1 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$-10$", explain: "That drops the double negative: $-bc = -(-3)(4) = +12$, not $-12$." },
        { text: "$10$", explain: "Close, but $ad = (2)(1) = 2$, so $2 + 12 = 14$." },
        { text: "$-14$", explain: "The determinant is positive here: $2 - (-12) = 14$." },
        { text: "$14$", correct: true, explain: "$(2)(1) - (-3)(4) = 2 - (-12) = 2 + 12 = 14$." },
      ],
    },
    {
      id: "c-singular-0",
      prompt: "$\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$0$", correct: true, explain: "$(2)(2) - (4)(1) = 4 - 4 = 0$, so the matrix is singular." },
        { text: "$8$", explain: "That is $ad + bc = 4 + 4$. The products are subtracted." },
        { text: "$4$", explain: "That is only $ad$. Subtract $bc = 4$ to get $0$." },
        { text: "$-8$", explain: "Both products are $4$, so their difference is $0$, not $-8$." },
      ],
    },
    {
      id: "c-singular-recognize",
      prompt: "$\\det \\begin{bmatrix} 6 & 3 \\\\ 2 & 1 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$12$", explain: "That is $ad + bc = 6 + 6$. Subtract instead." },
        { text: "$6$", explain: "That is only $ad$. Subtract $bc = 6$." },
        { text: "$0$", correct: true, explain: "$(6)(1) - (3)(2) = 6 - 6 = 0$, so it is singular." },
        { text: "$3$", explain: "Check the arithmetic: $6 - 6 = 0$." },
      ],
    },
    {
      id: "c-identity",
      prompt: "For the identity matrix $I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, $\\det I$ is:",
      choices: [
        { text: "$0$", explain: "The off-diagonal product is $0$, but $ad = (1)(1) = 1$, so $\\det I = 1$." },
        { text: "$1$", correct: true, explain: "$(1)(1) - (0)(0) = 1 - 0 = 1$." },
        { text: "$2$", explain: "That adds the diagonal. The determinant multiplies it: $(1)(1) = 1$." },
        { text: "$-1$", explain: "$(1)(1) - (0)(0) = 1$, not $-1$." },
      ],
    },
    {
      id: "c-triangular-lower",
      prompt: "The matrix $\\begin{bmatrix} 3 & 0 \\\\ 5 & 2 \\end{bmatrix}$ is triangular. Its determinant is:",
      choices: [
        { text: "$16$", explain: "That is $ad + bc = 6 + 10$. A triangular determinant is just the product of the diagonal." },
        { text: "$-10$", explain: "The entry above the diagonal is $0$, so $bc = 0$. The determinant is $ad = 6$." },
        { text: "$1$", explain: "Subtract the products: $(3)(2) - (0)(5) = 6$." },
        { text: "$6$", correct: true, explain: "$(3)(2) - (0)(5) = 6 - 0 = 6$, the product of the diagonal." },
      ],
    },
    {
      id: "c-triangular-upper",
      prompt: "The matrix $\\begin{bmatrix} 2 & 7 \\\\ 0 & 5 \\end{bmatrix}$ is triangular. Its determinant is:",
      choices: [
        { text: "$10$", correct: true, explain: "$(2)(5) - (7)(0) = 10 - 0 = 10$, the product of the diagonal." },
        { text: "$-10$", explain: "The lower-left entry is $0$, so $bc = 0$. The determinant is $ad = 10$." },
        { text: "$14$", explain: "That multiplies $2$ and $7$. Use the diagonal entries $2$ and $5$." },
        { text: "$3$", explain: "Check the arithmetic: $(2)(5) - (7)(0) = 10$." },
      ],
    },
    {
      id: "c-inverse-no",
      prompt: "Does $\\begin{bmatrix} 4 & 2 \\\\ 2 & 1 \\end{bmatrix}$ have an inverse?",
      choices: [
        { text: "Yes, because its determinant is $8$.", explain: "That added the products. The determinant is $4 - 4 = 0$." },
        { text: "Yes, because its determinant is $2$.", explain: "Recompute: $(4)(1) - (2)(2) = 0$." },
        { text: "No, because its determinant is $0$.", correct: true, explain: "$(4)(1) - (2)(2) = 4 - 4 = 0$, so it is singular (no inverse)." },
        { text: "No, because its determinant is $6$.", explain: "A nonzero determinant would mean it does have an inverse. Here it is $0$." },
      ],
    },
    {
      id: "c-inverse-yes",
      prompt: "Does $\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$ have an inverse?",
      choices: [
        { text: "No, because its determinant is $0$.", explain: "Compute $(3)(4) - (1)(2) = 10 \\neq 0$." },
        { text: "Yes, because its determinant is $10$.", correct: true, explain: "$(3)(4) - (1)(2) = 12 - 2 = 10 \\neq 0$, so an inverse exists." },
        { text: "Yes, because its determinant is $14$.", explain: "That added the products. The determinant is $12 - 2 = 10$." },
        { text: "No, because its determinant is $2$.", explain: "Recompute: $12 - 2 = 10$, which is not $0$, so it is invertible." },
      ],
    },
    {
      id: "c-diagonal",
      prompt: "$\\det \\begin{bmatrix} 5 & 0 \\\\ 0 & 3 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$8$", explain: "That adds the diagonal. The determinant multiplies it." },
        { text: "$0$", explain: "The off-diagonal product is $0$, but $ad = 15$, so the determinant is $15$." },
        { text: "$-15$", explain: "$(5)(3) - (0)(0) = 15$, which is positive." },
        { text: "$15$", correct: true, explain: "$(5)(3) - (0)(0) = 15 - 0 = 15$." },
      ],
    },
    {
      id: "c-antidiagonal",
      prompt: "$\\det \\begin{bmatrix} 0 & 2 \\\\ 3 & 0 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$-6$", correct: true, explain: "$(0)(0) - (2)(3) = 0 - 6 = -6$." },
        { text: "$0$", explain: "The main-diagonal product is $0$, but $bc = 6$, so the determinant is $0 - 6 = -6$." },
        { text: "$6$", explain: "That is $bc - ad$. The order is $ad - bc = 0 - 6 = -6$." },
        { text: "$5$", explain: "Multiply the diagonals: $ad = 0$ and $bc = 6$, giving $-6$." },
      ],
    },
    {
      id: "c-negative-result",
      prompt: "$\\det \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$10$", explain: "That is $ad + bc = 4 + 6$. The products are subtracted." },
        { text: "$2$", explain: "That is $bc - ad = 6 - 4$. The order is $ad - bc = 4 - 6$." },
        { text: "$-2$", correct: true, explain: "$(1)(4) - (2)(3) = 4 - 6 = -2$." },
        { text: "$-10$", explain: "Check the arithmetic: $4 - 6 = -2$." },
      ],
    },
    {
      id: "c-basic-1",
      prompt: "$\\det \\begin{bmatrix} 7 & 4 \\\\ 5 & 3 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$41$", explain: "That is $ad + bc = 21 + 20$. Subtract the products instead." },
        { text: "$1$", correct: true, explain: "$(7)(3) - (4)(5) = 21 - 20 = 1$." },
        { text: "$-1$", explain: "That is $bc - ad$. The order is $ad - bc = 21 - 20$." },
        { text: "$21$", explain: "That is only $ad$. Subtract $bc = 20$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-cofactor-main",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{bmatrix}$, expanding along row 1, $\\det A$ is:",
      choices: [
        { text: "$-11$", explain: "That dropped the alternating sign on the middle term: it should be $-2(-2) = +4$, not $-4$." },
        { text: "$3$", explain: "Right size, wrong sign: $2 + 4 - 9 = -3$." },
        { text: "$57$", explain: "Each minor is $ad - bc$. Here they are $2, -2, -3$, giving $-3$." },
        { text: "$-3$", correct: true, explain: "$1(2) - 2(-2) + 3(-3) = 2 + 4 - 9 = -3$." },
      ],
    },
    {
      id: "s-cofactor-second",
      prompt: "For $B = \\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 1 & 2 \\\\ 1 & 0 & 3 \\end{bmatrix}$, expanding along row 1, $\\det B$ is:",
      choices: [
        { text: "$5$", correct: true, explain: "$2(1\\cdot 3 - 2\\cdot 0) - 0 + 1(3\\cdot 0 - 1\\cdot 1) = 6 + (-1) = 5$." },
        { text: "$7$", explain: "The middle entry is $0$, so its term drops. That leaves $6 - 1 = 5$." },
        { text: "$6$", explain: "The first term is $6$, but the third term $1(0 - 1) = -1$ must be added, giving $5$." },
        { text: "$-5$", explain: "Check the signs: $6 - 1 = 5$, which is positive." },
      ],
    },
    {
      id: "s-expand-simple",
      prompt: "Expand $\\det \\begin{bmatrix} 2 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 4 & 5 & 1 \\end{bmatrix}$ along the first row. The value is:",
      choices: [
        { text: "$6$", correct: true, explain: "The first row is $(2, 0, 0)$, so only the first term survives: $2 \\cdot \\det\\begin{bmatrix} 3 & 0 \\\\ 5 & 1 \\end{bmatrix} = 2(3-0) = 6$." },
        { text: "$2$", explain: "That is just the $(1,1)$ entry. Multiply it by the $2 \\times 2$ determinant $3$." },
        { text: "$0$", explain: "The two zeros in the first row kill those terms, but the first term is $2 \\cdot 3 = 6$." },
        { text: "$5$", explain: "That looks at the bottom-middle entry. Expand along the first row instead." },
      ],
    },
    {
      id: "s-expand-upper",
      prompt: "Expand $\\det \\begin{bmatrix} 2 & 5 & 7 \\\\ 0 & 3 & 1 \\\\ 0 & 0 & 4 \\end{bmatrix}$ along the first column. The value is:",
      choices: [
        { text: "$24$", correct: true, explain: "The first column is $(2, 0, 0)$, so only the top term survives: $2 \\cdot \\det\\begin{bmatrix} 3 & 1 \\\\ 0 & 4 \\end{bmatrix} = 2(12-0) = 24$." },
        { text: "$9$", explain: "That adds $2+3+4$. The expansion multiplies: $2 \\cdot 3 \\cdot 4 = 24$." },
        { text: "$0$", explain: "The two zeros below the first entry kill those terms, but the first term is $2 \\cdot 12 = 24$." },
        { text: "$14$", explain: "That mixes in $5$ and $7$. Those sit off the first column, so they do not enter this expansion." },
      ],
    },
    {
      id: "s-2by2-again",
      prompt: "$\\det \\begin{bmatrix} 5 & 2 \\\\ 3 & 4 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$14$", correct: true, explain: "$ad - bc = (5)(4) - (2)(3) = 20 - 6 = 14$." },
        { text: "$26$", explain: "That adds the products: $20 + 6$. The determinant subtracts: $20 - 6 = 14$." },
        { text: "$20$", explain: "That is only the main-diagonal product. Subtract $bc = 6$ as well." },
        { text: "$-14$", explain: "You subtracted in the wrong order. It is $ad - bc = 20 - 6 = 14$." },
      ],
    },
    {
      id: "s-2by2-neg",
      prompt: "$\\det \\begin{bmatrix} 1 & 6 \\\\ 4 & 2 \\end{bmatrix}$ equals:",
      choices: [
        { text: "$-22$", correct: true, explain: "$ad - bc = (1)(2) - (6)(4) = 2 - 24 = -22$." },
        { text: "$22$", explain: "You took $bc - ad$. Keep the order $ad - bc = 2 - 24 = -22$." },
        { text: "$2$", explain: "That is only $ad$. Subtract $bc = 24$ as well." },
        { text: "$26$", explain: "That adds the products. The determinant subtracts: $2 - 24 = -22$." },
      ],
    },
    {
      id: "s-live-d",
      prompt: "For $A = \\begin{bmatrix} 2 & 3 \\\\ 4 & d \\end{bmatrix}$, $\\det A = 0$ when $d$ equals:",
      choices: [
        { text: "$6$", correct: true, explain: "$\\det = 2d - 12$. Set $2d - 12 = 0$ to get $d = 6$." },
        { text: "$0$", explain: "$2(0) - 12 = -12 \\neq 0$. Solve $2d = 12$." },
        { text: "$3$", explain: "$2(3) - 12 = -6 \\neq 0$. The products match when $d = 6$." },
        { text: "$12$", explain: "That sets $2d = 12$ without the factor of $2$ on $d$, or forgets to divide. $d = 6$." },
      ],
    },
    {
      id: "s-which-singular",
      prompt: "Which of these matrices is singular (has no inverse)?",
      choices: [
        { text: "$\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$", explain: "Its determinant is $12 - 2 = 10 \\neq 0$, so it is invertible." },
        { text: "$\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$", correct: true, explain: "Its determinant is $(2)(2) - (4)(1) = 0$, so it is singular." },
        { text: "$\\begin{bmatrix} 5 & 2 \\\\ 1 & 3 \\end{bmatrix}$", explain: "Its determinant is $15 - 2 = 13 \\neq 0$, so it is invertible." },
        { text: "$\\begin{bmatrix} 4 & 1 \\\\ 3 & 2 \\end{bmatrix}$", explain: "Its determinant is $8 - 3 = 5 \\neq 0$, so it is invertible." },
      ],
    },
    {
      id: "s-solve-target",
      prompt: "Find $x$ so that $\\det \\begin{bmatrix} x & 3 \\\\ 2 & 4 \\end{bmatrix} = 10$.",
      choices: [
        { text: "$x = 4$", correct: true, explain: "$\\det = 4x - 6$. Set $4x - 6 = 10$, so $4x = 16$ and $x = 4$." },
        { text: "$x = 1$", explain: "$4(1) - 6 = -2$, not $10$." },
        { text: "$x = \\tfrac{10}{4}$", explain: "The equation is $4x - 6 = 10$, not $4x = 10$." },
        { text: "$x = 7$", explain: "$4(7) - 6 = 22$, not $10$." },
      ],
    },
    {
      id: "s-solve-singular",
      prompt: "Find $x$ so that $\\begin{bmatrix} x & 4 \\\\ 2 & 4 \\end{bmatrix}$ is singular.",
      choices: [
        { text: "$x = 4$", explain: "$4(4) - 8 = 8 \\neq 0$. Singular needs the determinant to be $0$." },
        { text: "$x = 8$", explain: "$4(8) - 8 = 24 \\neq 0$. Solve $4x - 8 = 0$ instead." },
        { text: "$x = -2$", explain: "$4(-2) - 8 = -16 \\neq 0$. Solving $4x - 8 = 0$ gives $x = 2$." },
        { text: "$x = 2$", correct: true, explain: "Singular means $\\det = 0$: $4x - 8 = 0$, so $x = 2$." },
      ],
    },
    {
      id: "s-zero-row",
      prompt: "What is the determinant of $\\begin{bmatrix} 5 & 7 & 2 \\\\ 0 & 0 & 0 \\\\ 3 & 1 & 4 \\end{bmatrix}$?",
      choices: [
        { text: "$40$", explain: "Expanding along the row of zeros, every term carries a factor of $0$." },
        { text: "$5$", explain: "A matrix with an all-zero row always has determinant $0$." },
        { text: "$0$", correct: true, explain: "Expand along the middle row: every entry is $0$, so every term is $0$ and $\\det = 0$." },
        { text: "$-12$", explain: "The zero row forces the determinant to $0$." },
      ],
    },
    {
      id: "s-compute-3",
      prompt: "Expand $\\det \\begin{bmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 0 \\\\ 4 & 0 & 5 \\end{bmatrix}$ along the middle row. The value is:",
      choices: [
        { text: "$-9$", correct: true, explain: "The middle row is $(0, 3, 0)$, so only the middle term survives. The $(2,2)$ cofactor is positive: $3 \\cdot \\det\\begin{bmatrix} 1 & 2 \\\\ 4 & 5 \\end{bmatrix} = 3(5-8) = -9$." },
        { text: "$9$", explain: "The $2 \\times 2$ determinant is $5-8=-3$, so $3\\cdot(-3)=-9$, not $+9$." },
        { text: "$3$", explain: "That is just the middle entry. Multiply it by $\\det\\begin{bmatrix} 1 & 2 \\\\ 4 & 5 \\end{bmatrix} = -3$." },
        { text: "$15$", explain: "That looks at $1 \\cdot 3 \\cdot 5$. Expand along the middle row instead: only the $3$ term survives." },
      ],
    },
    {
      id: "s-trap-add",
      prompt: "A student computes $\\det \\begin{bmatrix} 3 & 4 \\\\ 5 & 6 \\end{bmatrix} = (3)(6) + (4)(5) = 38$. What went wrong?",
      choices: [
        { text: "They added the diagonal products. The determinant subtracts them: $18 - 20 = -2$.", correct: true, explain: "$\\det = ad - bc = 18 - 20 = -2$." },
        { text: "Nothing, $38$ is correct.", explain: "That is $ad + bc$. The determinant is $ad - bc = -2$." },
        { text: "They should have multiplied only the main diagonal, giving $18$.", explain: "You still subtract the anti-diagonal: $18 - 20 = -2$." },
        { text: "They swapped the rows first.", explain: "No swap happened. The error is adding instead of subtracting the products." },
      ],
    },
    {
      id: "s-trap-order",
      prompt: "A student computes $\\det \\begin{bmatrix} 2 & 5 \\\\ 1 & 3 \\end{bmatrix} = (5)(1) - (2)(3) = -1$. What went wrong?",
      choices: [
        { text: "Nothing, $-1$ is correct.", explain: "That is $bc - ad$. The determinant is $ad - bc$." },
        { text: "They added instead of subtracting.", explain: "They did subtract, but in the wrong order. It should be $ad - bc$." },
        { text: "They multiplied the wrong entries.", explain: "The entries are right, but the order is reversed. Use $ad - bc$." },
        { text: "They reversed the order. It should be $ad - bc = 6 - 5 = 1$.", correct: true, explain: "$\\det = (2)(3) - (5)(1) = 6 - 5 = 1$." },
      ],
    },
    {
      id: "s-trap-not-triangular",
      prompt: "The matrix $\\begin{bmatrix} 2 & 7 \\\\ 3 & 5 \\end{bmatrix}$ is not triangular. Its determinant is:",
      choices: [
        { text: "$10$", explain: "That is only the diagonal product $ad$. The matrix is not triangular, so you must subtract $bc = 21$." },
        { text: "$31$", explain: "That adds the products. The determinant subtracts them: $10 - 21 = -11$." },
        { text: "$-11$", correct: true, explain: "$(2)(5) - (7)(3) = 10 - 21 = -11$." },
        { text: "$11$", explain: "That is $bc - ad$. The order is $ad - bc = 10 - 21 = -11$." },
      ],
    },
  ],
};
