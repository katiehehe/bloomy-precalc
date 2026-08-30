import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Inverses". Grounded in the lesson:
 * A^{-1} is the matrix with A A^{-1} = A^{-1} A = I; a 2x2 inverse is built by
 * swapping the main diagonal, negating b and c, and dividing every entry by
 * det = ad - bc; an inverse exists exactly when det != 0; and (AB)^{-1} =
 * B^{-1} A^{-1} (the order reverses). Distractors are the classic traps: forgetting
 * the 1/det factor, not negating b and c, swapping the wrong pair, calling a
 * singular matrix invertible, and using A^{-1}B^{-1} for (AB)^{-1}. Every inverse
 * below is verified by multiplying back to the identity.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-def",
      prompt: "The inverse $A^{-1}$ of a square matrix $A$ is defined by which equation?",
      choices: [
        { text: "$A A^{-1} = A^{-1} A = I$", correct: true, explain: "The inverse undoes $A$: multiplied in either order, the result is the identity $I$." },
        { text: "$A + A^{-1} = I$", explain: "That is an additive relationship. The inverse is defined through multiplication." },
        { text: "$A A^{-1} = A$", explain: "Multiplying by the inverse returns the identity $I$, not $A$ itself." },
        { text: "$A A^{-1} = O$ (the zero matrix)", explain: "A matrix times its inverse is the identity $I$, never the zero matrix." },
      ],
    },
    {
      id: "c-detform",
      prompt: "For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the determinant $\\det A$ equals:",
      choices: [
        { text: "$ab - cd$", explain: "The determinant pairs the diagonals: the main diagonal $ad$ minus the other diagonal $bc$." },
        { text: "$ad - bc$", correct: true, explain: "Main-diagonal product $ad$ minus the anti-diagonal product $bc$." },
        { text: "$ac - bd$", explain: "That pairs a column with itself. The determinant uses the two diagonals, $ad$ and $bc$." },
        { text: "$ad + bc$", explain: "The two diagonal products are subtracted, not added." },
      ],
    },
    {
      id: "c-formula",
      prompt: "When $\\det \\neq 0$, the inverse of $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is:",
      choices: [
        { text: "$\\dfrac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$", correct: true, explain: "Swap $a$ and $d$, negate $b$ and $c$, then divide by $\\det = ad - bc$." },
        { text: "$\\dfrac{1}{ad - bc}\\begin{bmatrix} a & -b \\\\ -c & d \\end{bmatrix}$", explain: "This forgets to swap $a$ and $d$. The diagonal entries must trade places." },
        { text: "$\\dfrac{1}{ad - bc}\\begin{bmatrix} d & b \\\\ c & a \\end{bmatrix}$", explain: "This forgets to negate $b$ and $c$." },
        { text: "$(ad - bc)\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$", explain: "You divide by the determinant, not multiply by it." },
      ],
    },
    {
      id: "c-swap",
      prompt: "In the $2 \\times 2$ inverse procedure, which two entries switch places?",
      choices: [
        { text: "the off-diagonal entries $b$ and $c$", explain: "$b$ and $c$ get negated in place. It is the main-diagonal entries that swap." },
        { text: "the top-row entries $a$ and $b$", explain: "The swap is along the main diagonal, not across a row." },
        { text: "the main-diagonal entries $a$ and $d$", correct: true, explain: "The two main-diagonal entries $a$ and $d$ trade places." },
        { text: "the left-column entries $a$ and $c$", explain: "The swap is along the main diagonal, not down a column." },
      ],
    },
    {
      id: "c-negate",
      prompt: "In the $2 \\times 2$ inverse procedure, which entries get a minus sign?",
      choices: [
        { text: "the off-diagonal entries $b$ and $c$", correct: true, explain: "Only $b$ and $c$ are negated. $a$ and $d$ keep their signs (they swap instead)." },
        { text: "the main-diagonal entries $a$ and $d$", explain: "The diagonal entries are swapped, not negated." },
        { text: "all four entries", explain: "Only the two off-diagonal entries change sign." },
        { text: "only the entry $b$", explain: "Both off-diagonal entries, $b$ and $c$, are negated." },
      ],
    },
    {
      id: "c-det1-A",
      prompt: "The inverse of $\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$ (determinant $1$) is:",
      choices: [
        { text: "$\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$", explain: "You still have to negate $b = 1$ and $c = 3$." },
        { text: "$\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$", correct: true, explain: "Swap the $2$s, negate $1$ and $3$, divide by $1$: $\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$." },
        { text: "$\\begin{bmatrix} -2 & 1 \\\\ 3 & -2 \\end{bmatrix}$", explain: "This negates the diagonal by mistake. Negate $b$ and $c$ instead." },
        { text: "$\\begin{bmatrix} 2 & -3 \\\\ -1 & 2 \\end{bmatrix}$", explain: "The negated entries landed in the wrong spots: $-b$ goes top-right, $-c$ bottom-left." },
      ],
    },
    {
      id: "c-det1-B",
      prompt: "The inverse of $\\begin{bmatrix} 3 & 2 \\\\ 1 & 1 \\end{bmatrix}$ (determinant $1$) is:",
      choices: [
        { text: "$\\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}$", explain: "You forgot to swap the diagonal: $3$ and $1$ must trade places." },
        { text: "$\\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}$", explain: "You swapped the diagonal but forgot to negate $b$ and $c$." },
        { text: "$\\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}$", correct: true, explain: "Swap to $\\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}$, negate $2$ and $1$, divide by $1$." },
        { text: "$\\begin{bmatrix} -1 & 2 \\\\ 1 & -3 \\end{bmatrix}$", explain: "This negates the wrong pair. Negate the off-diagonal $b$ and $c$." },
      ],
    },
    {
      id: "c-det1-C",
      prompt: "The inverse of $\\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}$ (determinant $1$) is:",
      choices: [
        { text: "$\\begin{bmatrix} 1 & -2 \\\\ -1 & 3 \\end{bmatrix}$", explain: "You forgot to swap: $1$ and $3$ on the diagonal must trade places." },
        { text: "$\\begin{bmatrix} 3 & 2 \\\\ 1 & 1 \\end{bmatrix}$", explain: "You swapped but did not negate $b = 2$ and $c = 1$." },
        { text: "$\\begin{bmatrix} -3 & 2 \\\\ 1 & -1 \\end{bmatrix}$", explain: "This negates the diagonal. Negate the off-diagonal entries instead." },
        { text: "$\\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}$", correct: true, explain: "Swap to $\\begin{bmatrix} 3 & 2 \\\\ 1 & 1 \\end{bmatrix}$, negate $2$ and $1$, divide by $1$." },
      ],
    },
    {
      id: "c-exist-yes",
      prompt: "Does $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ have an inverse?",
      choices: [
        { text: "Yes, because $\\det = 1\\cdot 4 - 2\\cdot 3 = -2 \\neq 0$.", correct: true, explain: "A nonzero determinant (here $-2$) means the inverse exists." },
        { text: "No, because $\\det = -2$ is negative.", explain: "A negative determinant is still nonzero, so the inverse exists." },
        { text: "No, because it has no $1$s on the diagonal.", explain: "Invertibility depends only on the determinant, not on the diagonal entries." },
        { text: "Yes, but only because all entries are positive.", explain: "The sign of the entries is irrelevant. What matters is $\\det \\neq 0$." },
      ],
    },
    {
      id: "c-exist-no",
      prompt: "Does $\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$ have an inverse?",
      choices: [
        { text: "Yes, because it is a $2 \\times 2$ matrix.", explain: "Being square is necessary but not enough. The determinant must also be nonzero." },
        { text: "No, because $\\det = 2\\cdot 2 - 4\\cdot 1 = 0$.", correct: true, explain: "The determinant is $0$, so the matrix is singular and has no inverse." },
        { text: "Yes, because all entries are positive.", explain: "The sign of the entries does not decide invertibility. The determinant does." },
        { text: "No, because its entries are too small.", explain: "Entry size is irrelevant. The determinant $0$ is what rules out an inverse." },
      ],
    },
    {
      id: "c-exist-no2",
      prompt: "Which matrix is singular (has no inverse)?",
      choices: [
        { text: "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$", explain: "$\\det = 4 - 6 = -2 \\neq 0$, so this one is invertible." },
        { text: "$\\begin{bmatrix} 6 & 3 \\\\ 2 & 1 \\end{bmatrix}$", correct: true, explain: "$\\det = 6 - 6 = 0$, so it is singular." },
        { text: "$\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$", explain: "$\\det = 4 - 3 = 1 \\neq 0$, so this one is invertible." },
        { text: "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$", explain: "The identity has $\\det = 1$. It is its own inverse." },
      ],
    },
    {
      id: "c-identity-inv",
      prompt: "What is the inverse of the identity matrix $I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$?",
      choices: [
        { text: "the zero matrix", explain: "The zero matrix has $\\det = 0$ and is not even invertible." },
        { text: "$\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$", explain: "That is $-I$. The identity is its own inverse." },
        { text: "$I$ itself", correct: true, explain: "Since $I \\cdot I = I$, the identity is its own inverse: $I^{-1} = I$." },
        { text: "$I$ has no inverse", explain: "The identity has $\\det = 1 \\neq 0$, so it certainly has an inverse." },
      ],
    },
    {
      id: "c-when",
      prompt: "A $2 \\times 2$ matrix has an inverse exactly when:",
      choices: [
        { text: "its determinant is zero", explain: "That is the opposite: a zero determinant means no inverse." },
        { text: "all its entries are nonzero", explain: "The identity has zero entries yet is invertible. Only $\\det \\neq 0$ matters." },
        { text: "it is not the identity", explain: "The identity is invertible. Invertibility is decided by the determinant." },
        { text: "its determinant is nonzero", correct: true, explain: "A nonzero determinant is exactly the condition for an inverse to exist." },
      ],
    },
    {
      id: "c-det-compute",
      prompt: "The determinant of $\\begin{bmatrix} 5 & 3 \\\\ 3 & 2 \\end{bmatrix}$ is:",
      choices: [
        { text: "$1$", correct: true, explain: "$\\det = (5)(2) - (3)(3) = 10 - 9 = 1$." },
        { text: "$19$", explain: "$(5)(2) + (3)(3) = 19$ adds the products. The determinant subtracts them." },
        { text: "$4$", explain: "$(5)(2) - (3)(2) = 4$ uses the wrong product. Here $bc = (3)(3) = 9$." },
        { text: "$-1$", explain: "$(3)(3) - (5)(2) = -1$ subtracts in the wrong order. It is $ad - bc$." },
      ],
    },
    {
      id: "c-det1-D",
      prompt: "The inverse of $\\begin{bmatrix} 2 & 3 \\\\ 1 & 2 \\end{bmatrix}$ (determinant $1$) is:",
      choices: [
        { text: "$\\begin{bmatrix} 2 & 3 \\\\ 1 & 2 \\end{bmatrix}$", explain: "You still need to negate $b = 3$ and $c = 1$." },
        { text: "$\\begin{bmatrix} 2 & -3 \\\\ -1 & 2 \\end{bmatrix}$", correct: true, explain: "Swap the $2$s, negate $3$ and $1$, divide by $1$: $\\begin{bmatrix} 2 & -3 \\\\ -1 & 2 \\end{bmatrix}$." },
        { text: "$\\begin{bmatrix} -2 & 3 \\\\ 1 & -2 \\end{bmatrix}$", explain: "This negates the diagonal. The off-diagonal entries $b$ and $c$ are the ones negated." },
        { text: "$\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$", explain: "The $-b$ and $-c$ are swapped. $-b = -3$ belongs top-right, $-c = -1$ bottom-left." },
      ],
    },
  ],
  summit: [
    {
      id: "s-det2-full",
      prompt: "The inverse of $\\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$ (determinant $2$) is:",
      choices: [
        { text: "$\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}$", explain: "This is the swap-and-negate step. You still must divide every entry by $\\det = 2$." },
        { text: "$\\begin{bmatrix} 2 & \\tfrac{3}{2} \\\\ 1 & 1 \\end{bmatrix}$", explain: "This divides the original matrix by $2$ without swapping or negating." },
        { text: "$\\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$", correct: true, explain: "$\\dfrac{1}{2}\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$." },
        { text: "$\\begin{bmatrix} 2 & 3 \\\\ 2 & 4 \\end{bmatrix}$", explain: "This neither negates $b$ and $c$ nor divides by the determinant." },
      ],
    },
    {
      id: "s-forgot-scale",
      prompt: "A student writes the inverse of $\\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$ as $\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}$. What did they miss?",
      choices: [
        { text: "They forgot to divide by $\\det = 2$. The inverse is $\\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$.", correct: true, explain: "Their matrix times $A$ gives $2I$, not $I$. Dividing by $2$ fixes it." },
        { text: "Nothing, that answer is correct.", explain: "Multiplying it by $A$ gives $2I$, so it is off by the factor $\\tfrac{1}{2}$." },
        { text: "They should not have negated $b$ and $c$.", explain: "Negating $b$ and $c$ is correct. The missing step is dividing by the determinant." },
        { text: "They swapped the wrong entries.", explain: "The swap of $a$ and $d$ was right. Only the $\\tfrac{1}{\\det}$ factor is missing." },
      ],
    },
    {
      id: "s-det10",
      prompt: "The inverse of $\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$ is:",
      choices: [
        { text: "$\\dfrac{1}{10}\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$", explain: "You forgot to negate $b$ and $c$." },
        { text: "$\\dfrac{1}{10}\\begin{bmatrix} 4 & -1 \\\\ -2 & 3 \\end{bmatrix}$", correct: true, explain: "$\\det = 12 - 2 = 10$. Swap, negate, then divide by $10$." },
        { text: "$\\begin{bmatrix} 4 & -1 \\\\ -2 & 3 \\end{bmatrix}$", explain: "This forgets the $\\tfrac{1}{10}$ factor. It equals $10$ times the inverse." },
        { text: "$\\dfrac{1}{10}\\begin{bmatrix} 3 & -1 \\\\ -2 & 4 \\end{bmatrix}$", explain: "This forgets to swap $a$ and $d$ before negating." },
      ],
    },
    {
      id: "s-verify-yes",
      prompt: "Is $\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$ the inverse of $\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$?",
      choices: [
        { text: "No, the signs look wrong.", explain: "Multiplying the two matrices gives $I$, so the signs are exactly right." },
        { text: "No, you must divide by the determinant first.", explain: "The determinant is $1$, so dividing changes nothing. The product is already $I$." },
        { text: "Only when multiplied in one specific order.", explain: "A matrix and its inverse commute: $A A^{-1} = A^{-1} A = I$ both ways." },
        { text: "Yes, multiplying them gives the identity $I$.", correct: true, explain: "$(2)(2) + (1)(-3) = 1$ and the off-diagonals are $0$, so the product is $I$." },
      ],
    },
    {
      id: "s-verify-no",
      prompt: "Is $\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}$ the inverse of $\\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$?",
      choices: [
        { text: "No, that product is $2I$, so divide it by $\\det = 2$ first.", correct: true, explain: "Multiplying gives $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix} = 2I$. The true inverse is $\\tfrac{1}{2}$ of it." },
        { text: "Yes, it multiplies to $I$.", explain: "It multiplies to $2I$, not $I$, because the $\\tfrac{1}{2}$ factor is missing." },
        { text: "Yes, swap and negate is all you ever need.", explain: "Swap and negate is only complete when $\\det = 1$. Here $\\det = 2$." },
        { text: "No, you must also swap $b$ and $c$.", explain: "The layout is right. Only the division by the determinant is missing." },
      ],
    },
    {
      id: "s-ab-inv",
      prompt: "If $A$ and $B$ are invertible, then $(AB)^{-1}$ equals:",
      choices: [
        { text: "$A^{-1} B^{-1}$", explain: "The order must reverse. $A^{-1} B^{-1}$ keeps the original order." },
        { text: "$B^{-1} A^{-1}$", correct: true, explain: "$(AB)(B^{-1} A^{-1}) = A(B B^{-1})A^{-1} = A A^{-1} = I$, so the order reverses." },
        { text: "$A^{-1} + B^{-1}$", explain: "Inverting a product is not adding inverses. The order simply reverses." },
        { text: "$(BA)^{-1}$", explain: "$AB$ and $BA$ usually differ, so their inverses differ too." },
      ],
    },
    {
      id: "s-solve-AXB",
      prompt: "To solve $AX = B$ for $X$ (with $A$ invertible), $X$ equals:",
      choices: [
        { text: "$B A^{-1}$", explain: "That places $A^{-1}$ on the wrong side. It does not cancel the $A$ on the left of $X$." },
        { text: "$A^{-1} B$", correct: true, explain: "Multiply on the left by $A^{-1}$: $A^{-1} A X = A^{-1} B$, so $X = A^{-1} B$." },
        { text: "$B^{-1} A$", explain: "This inverts the wrong matrix. You need $A^{-1}$, and it multiplies $B$." },
        { text: "$A B^{-1}$", explain: "You must undo $A$ with $A^{-1}$ on the left, not multiply by $B^{-1}$." },
      ],
    },
    {
      id: "s-solve-left",
      prompt: "Why do we multiply $AX = B$ on the left by $A^{-1}$ rather than on the right?",
      choices: [
        { text: "Because $A$ sits to the left of $X$, so $A^{-1}$ must also go on the left to give $A^{-1} A X = X$.", correct: true, explain: "Order matters. Only left multiplication lets $A^{-1} A = I$ cancel next to $X$." },
        { text: "Because matrix multiplication is commutative.", explain: "It is not commutative, which is exactly why the side matters." },
        { text: "Because the right side $B$ must never be touched.", explain: "You do multiply $B$. The point is that $A^{-1}$ must sit on the left to cancel $A$." },
        { text: "Either side gives the same result.", explain: "Since multiplication is not commutative, left and right generally differ." },
      ],
    },
    {
      id: "s-singular-claim",
      prompt: "A student claims $\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$ has inverse $\\begin{bmatrix} 2 & -4 \\\\ -1 & 2 \\end{bmatrix}$. Is that right?",
      choices: [
        { text: "Yes, swap and negate produces that.", explain: "The procedure only applies when $\\det \\neq 0$. Here $\\det = 0$." },
        { text: "Yes, the determinant is $1$.", explain: "The determinant is $2\\cdot 2 - 4\\cdot 1 = 0$, not $1$." },
        { text: "No, the correct inverse is the original matrix.", explain: "A singular matrix has no inverse at all, not itself." },
        { text: "No, $\\det = 0$, so no inverse exists.", correct: true, explain: "$\\det = 4 - 4 = 0$, so the matrix is singular and cannot be inverted." },
      ],
    },
    {
      id: "s-diag-inv",
      prompt: "The inverse of $\\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}$ is:",
      choices: [
        { text: "$\\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}$", explain: "You swapped the diagonal but forgot to divide by $\\det = 8$." },
        { text: "$\\begin{bmatrix} \\tfrac{1}{2} & 0 \\\\ 0 & \\tfrac{1}{4} \\end{bmatrix}$", correct: true, explain: "For a diagonal matrix the inverse reciprocates the diagonal: $\\tfrac{1}{2}$ and $\\tfrac{1}{4}$." },
        { text: "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}$", explain: "A matrix is rarely its own inverse. Check $A A^{-1} = I$." },
        { text: "$\\begin{bmatrix} -2 & 0 \\\\ 0 & -4 \\end{bmatrix}$", explain: "Negating the entries does not invert them. You need the reciprocals." },
      ],
    },
    {
      id: "s-detneg",
      prompt: "The inverse of $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ (determinant $-2$) is:",
      choices: [
        { text: "$\\begin{bmatrix} -2 & 1 \\\\ \\tfrac{3}{2} & -\\tfrac{1}{2} \\end{bmatrix}$", correct: true, explain: "$\\dfrac{1}{-2}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 \\\\ \\tfrac{3}{2} & -\\tfrac{1}{2} \\end{bmatrix}$." },
        { text: "$\\begin{bmatrix} 2 & -1 \\\\ -\\tfrac{3}{2} & \\tfrac{1}{2} \\end{bmatrix}$", explain: "This divides by $+2$. The determinant is $-2$, so every sign flips." },
        { text: "$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$", explain: "This is the swap-and-negate step. You still must divide by $\\det = -2$." },
        { text: "$\\begin{bmatrix} -2 & -1 \\\\ -\\tfrac{3}{2} & -\\tfrac{1}{2} \\end{bmatrix}$", explain: "The signs are off. Dividing $\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$ by $-2$ flips each sign once." },
      ],
    },
    {
      id: "s-inv-inv",
      prompt: "What is $(A^{-1})^{-1}$, the inverse of the inverse?",
      choices: [
        { text: "$A^{-1}$", explain: "Inverting again undoes the first inversion, returning $A$, not $A^{-1}$." },
        { text: "$I$", explain: "$(A^{-1})^{-1}$ is a matrix, not the identity in general." },
        { text: "$A$", correct: true, explain: "Since $A^{-1} A = I$, the matrix whose inverse is $A^{-1}$ is $A$ itself." },
        { text: "the zero matrix", explain: "The zero matrix is not even invertible. Inverting twice returns $A$." },
      ],
    },
    {
      id: "s-identity-self",
      prompt: "Which statement about the identity matrix $I$ is true?",
      choices: [
        { text: "$I$ has no inverse.", explain: "$\\det I = 1 \\neq 0$, so $I$ is invertible." },
        { text: "$I^{-1}$ is the zero matrix.", explain: "The zero matrix is singular. $I^{-1}$ is $I$." },
        { text: "$I^{-1} = -I$.", explain: "$(-I)$ is not the inverse. $I \\cdot I = I$, so $I^{-1} = I$." },
        { text: "$I$ is its own inverse: $I^{-1} = I$.", correct: true, explain: "Because $I \\cdot I = I$, the identity inverts to itself." },
      ],
    },
    {
      id: "s-adjugate-trap",
      prompt: "For a matrix $A$ with $\\det = 5$, the inverse is $\\dfrac{1}{5}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$. If you drop the $\\dfrac{1}{5}$, the leftover matrix $\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$ satisfies:",
      choices: [
        { text: "$A\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} = 5I$, which is $5$ times the identity, not $I$.", correct: true, explain: "The swap-negate matrix times $A$ always gives $(\\det)\\,I$. Dividing by $\\det$ turns it into $I$." },
        { text: "$= I$, so it is already the inverse.", explain: "It equals $5I$. Only after dividing by $5$ do you get $I$." },
        { text: "$= O$, the zero matrix.", explain: "The product is $5I$, which is far from the zero matrix." },
        { text: "$= A$, the original matrix.", explain: "The product is $5I$, not $A$." },
      ],
    },
    {
      id: "s-det5",
      prompt: "The inverse of $\\begin{bmatrix} 3 & 1 \\\\ 1 & 2 \\end{bmatrix}$ is:",
      choices: [
        { text: "$\\begin{bmatrix} 2 & -1 \\\\ -1 & 3 \\end{bmatrix}$", explain: "This forgets the $\\tfrac{1}{5}$ factor. It equals $5$ times the inverse." },
        { text: "$\\dfrac{1}{5}\\begin{bmatrix} 2 & -1 \\\\ -1 & 3 \\end{bmatrix}$", correct: true, explain: "$\\det = 6 - 1 = 5$. Swap, negate, then divide by $5$." },
        { text: "$\\dfrac{1}{5}\\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$", explain: "You forgot to negate $b$ and $c$." },
        { text: "$\\dfrac{1}{5}\\begin{bmatrix} 3 & -1 \\\\ -1 & 2 \\end{bmatrix}$", explain: "You forgot to swap $a$ and $d$ before negating." },
      ],
    },
  ],
};
