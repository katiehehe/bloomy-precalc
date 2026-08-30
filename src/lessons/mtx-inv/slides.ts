import type { ParamSpec, Slide } from "../types";

/** Slide 4 dials the top-left entry a of [[a,3],[2,2]] so det = 2a - 6 moves live. */
const aParam: ParamSpec = {
  key: "a",
  label: "top-left entry a",
  min: 0,
  max: 8,
  start: 6,
  step: 1,
  format: (v) => `a = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "what-and-formula",
    title: "What an inverse is",
    mode: "formula",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "An **inverse** of a square matrix $A$ is a matrix, written $A^{-1}$, that undoes it. Multiply the two in either order and you get the **identity** $I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, the matrix with $1$s down the diagonal and $0$s elsewhere. In symbols: $$A A^{-1} = A^{-1} A = I$$ Only **square** matrices can have one, and even then only some do.",
      },
      {
        text: "Here is the recipe for a $2 \\times 2$. Start from $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ and first find its **determinant**, the single number $\\det = ad - bc$ (the main-diagonal product $ad$ minus the other product $bc$). For our $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$ that is $(2)(2) - (1)(3) = 4 - 3 = 1$.",
        add: { s1: true },
      },
      {
        text: "Now rebuild the matrix in three moves. Move one: **swap** the two main-diagonal entries $a$ and $d$. Here both happen to be $2$, so the swap leaves them looking the same, but in general those two entries do trade places.",
        add: { s2: true },
      },
      {
        text: "Move two: **negate** the other two entries, $b$ and $c$. The $1$ becomes $-1$ and the $3$ becomes $-3$, giving the pattern $\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$.",
        add: { s3: true },
      },
      {
        text: "Move three: **divide** every entry by the determinant. Ours is $1$, and dividing by $1$ changes nothing, so we reach: $$A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$$ Swap, negate, divide: that is the whole recipe.",
        add: { s4: true },
      },
    ],
    practice:
      "The three moves for a $2 \\times 2$ inverse: swap the main-diagonal entries $a$ and $d$, negate $b$ and $c$, then divide every entry by $\\det = ad - bc$.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the defining property of the inverse $A^{-1}$?",
        options: [
          "$A A^{-1} = A^{-1} A = I$",
          "$A + A^{-1} = I$",
          "$A A^{-1} = A$",
          "$A A^{-1} = O$ (the zero matrix)",
        ],
        answer: 0,
        hint: "The inverse undoes $A$, so the product returns the identity.",
        success: "Yes: a matrix times its inverse, in either order, is the identity $I$.",
      },
      {
        kind: "choice",
        prompt: "For $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$, the determinant $ad - bc$ is:",
        options: ["$1$", "$7$", "$5$", "$0$"],
        answer: 0,
        hint: "Compute $\\det = ad - bc = (2)(2) - (1)(3)$.",
        success: "$(2)(2) - (1)(3) = 4 - 3 = 1$.",
      },
      {
        kind: "choice",
        prompt:
          "Applying swap, negate, divide to $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$ (determinant $1$) gives $A^{-1} =$",
        options: [
          "$\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} -2 & 1 \\\\ 3 & -2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 2 & -3 \\\\ -1 & 2 \\end{bmatrix}$",
        ],
        answer: 1,
        hint: "Swap the diagonal (both $2$s), negate $b = 1$ and $c = 3$, then divide by $1$.",
        success: "Right: negating $b$ and $c$ gives $\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$.",
      },
    ],
  },
  {
    id: "verify",
    title: "Check it multiplies to I",
    mode: "verify",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Let us confirm that $A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$ really inverts $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$. We multiply $A A^{-1}$ exactly as in the last lesson: each entry is a **row** of $A$ dotted with a **column** of $A^{-1}$.",
      },
      {
        text: "Top-left entry, row $1$ of $A$ is $(2, 1)$ and column $1$ of $A^{-1}$ is $(2, -3)$: $(2)(2) + (1)(-3) = 4 - 3 = 1$.",
        add: { e00: true },
      },
      {
        text: "Top-right entry, row $1$ is $(2, 1)$ and column $2$ is $(-1, 2)$: $(2)(-1) + (1)(2) = -2 + 2 = 0$.",
        add: { e01: true },
      },
      {
        text: "Bottom-left entry, row $2$ is $(3, 2)$ and column $1$ is $(2, -3)$: $(3)(2) + (2)(-3) = 6 - 6 = 0$.",
        add: { e10: true },
      },
      {
        text: "Bottom-right entry, row $2$ is $(3, 2)$ and column $2$ is $(-1, 2)$: $(3)(-1) + (2)(2) = -3 + 4 = 1$. The product is: $$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I$$ So the inverse checks out.",
        add: { e11: true },
      },
    ],
    practice:
      "To trust an inverse, multiply $A A^{-1}$ with the row-times-column rule. A correct inverse lands exactly on the identity $I$.",
    questions: [
      {
        kind: "choice",
        prompt: "The top-left entry of $A A^{-1}$, that is $(2)(2) + (1)(-3)$, equals:",
        options: ["$1$", "$4$", "$7$", "$0$"],
        answer: 0,
        hint: "Row $1$ of $A$ is $(2, 1)$. Column $1$ of $A^{-1}$ is $(2, -3)$.",
        success: "$(2)(2) + (1)(-3) = 4 - 3 = 1$, the top-left of the identity.",
      },
      {
        kind: "choice",
        prompt:
          "When $A A^{-1}$ is computed correctly, the two off-diagonal entries (top-right and bottom-left) are:",
        options: ["both $0$", "both $1$", "both $-1$", "both equal to the determinant"],
        answer: 0,
        hint: "The whole product should be the identity $I$.",
        success: "Right: the identity has $0$s off the diagonal and $1$s on it.",
      },
      {
        kind: "choice",
        prompt: "Why does multiplying $A A^{-1}$ make a good check on your inverse?",
        options: [
          "A correct inverse gives the identity $I$.",
          "It should give $A$ back.",
          "It should give the zero matrix.",
          "It works only when the order is reversed.",
        ],
        answer: 0,
        hint: "Recall the defining property $A A^{-1} = I$.",
        success: "Yes: if the product is not $I$, the proposed inverse is wrong.",
      },
    ],
  },
  {
    id: "when-it-fails",
    title: "The determinant gate",
    mode: "fails",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "The recipe has one gate: it divides by the determinant, and you can never divide by $0$. A matrix whose determinant is $0$ has **no inverse** and is called **singular**. Take $A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$.",
      },
      {
        text: "Its determinant is $ad - bc = (2)(2) - (4)(1) = 4 - 4 = 0$. The main-diagonal product equals the other diagonal product, so they cancel to zero.",
        add: { s1: true },
      },
      {
        text: "Because the determinant is $0$, there is nothing to divide by, so no inverse exists. There is no trick or rescue: a singular matrix simply cannot be inverted.",
        add: { s2: true },
      },
      {
        text: "Now the other case, where the determinant is not $0$ but also not $1$. Take $A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$.",
        add: { s3: true },
      },
      {
        text: "Its determinant is $(4)(2) - (3)(2) = 8 - 6 = 2$. Swap and negate as before to reach $\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}$, but you are not finished: the whole matrix is still multiplied by $\\dfrac{1}{\\det} = \\dfrac{1}{2}$.",
        add: { s4: true },
      },
      {
        text: "Divide every entry by $2$: $$A^{-1} = \\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$$ Forgetting the $\\dfrac{1}{\\det}$ factor is the single most common inverse mistake, so make sure to divide whenever the determinant is not $1$.",
        add: { s5: true },
      },
    ],
    practice:
      "Two gates guard every inverse: the determinant must not be $0$ (or none exists), and when it is not $1$ you must divide every entry by it.",
    questions: [
      {
        kind: "choice",
        prompt: "Which matrix has no inverse?",
        options: [
          "$\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
        ],
        answer: 0,
        hint: "Compute $ad - bc$ for each. A determinant of $0$ means no inverse.",
        success: "$\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix} = 4 - 4 = 0$, so it is singular.",
      },
      {
        kind: "choice",
        prompt: "For $A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$ with $\\det = 2$, the inverse is:",
        options: [
          "$\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}$",
          "$\\begin{bmatrix} 2 & 3 \\\\ 2 & 4 \\end{bmatrix}$",
          "$\\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$",
          "$\\begin{bmatrix} 4 & -3 \\\\ -2 & 2 \\end{bmatrix}$",
        ],
        answer: 2,
        hint: "Swap the diagonal, negate $b$ and $c$, then divide every entry by $\\det = 2$.",
        success:
          "$\\dfrac{1}{2}\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}$.",
      },
      {
        kind: "choice",
        prompt: "A $2 \\times 2$ matrix fails to have an inverse exactly when:",
        options: [
          "its determinant is $0$",
          "it contains a negative entry",
          "it is not the identity",
          "its two diagonal entries are equal",
        ],
        answer: 0,
        hint: "The recipe divides by the determinant.",
        success: "Right: determinant $0$ means dividing by $0$, so no inverse exists.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [aParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now the top-left entry is a dial $a$, so $M = \\begin{bmatrix} a & 3 \\\\ 2 & 2 \\end{bmatrix}$. Its determinant is: $$ad - bc = (a)(2) - (3)(2) = 2a - 6$$ It is shown live under the matrix. At the moment $a = 6$, so $\\det = 2(6) - 6 = 6$.",
      },
      {
        text: "As $a$ climbs, the main-diagonal product $2a$ grows while the other diagonal stays fixed at $6$, so $\\det = 2a - 6$ grows too. At $a = 8$ it reaches $2(8) - 6 = 10$, safely nonzero, so the matrix is invertible.",
        to: { a: 8 },
        ms: 1900,
      },
      {
        text: "As $a$ comes back down, the determinant shrinks with it. If $a$ were to drop far enough, the two diagonal products would become equal and the determinant would collapse to $0$, the point where the inverse vanishes.",
        to: { a: 6 },
        ms: 1900,
      },
    ],
    practice:
      "Drag the dial $a$ and watch the determinant $2a - 6$ move. Where it reaches $0$, the matrix is singular and has no inverse.",
    questions: [
      {
        kind: "manipulate",
        prompt:
          "Slide $a$ until the matrix is **singular**, that is until the determinant $2a - 6$ equals $0$.",
        hint: "Set $2a - 6 = 0$, so $2a = 6$.",
        success:
          "Yes: $a = 3$ gives $\\det = 2(3) - 6 = 0$, so $\\begin{bmatrix} 3 & 3 \\\\ 2 & 2 \\end{bmatrix}$ has no inverse.",
        check: (_value, values) => 2 * Math.round(values.a ?? 6) - 6 === 0,
      },
      {
        kind: "choice",
        prompt:
          "With $a = 5$, the determinant is $2(5) - 6 = 4$. Does $M = \\begin{bmatrix} 5 & 3 \\\\ 2 & 2 \\end{bmatrix}$ have an inverse?",
        options: [
          "Yes, because the determinant $4$ is not $0$.",
          "No, because it is not the identity.",
          "No, because $a$ is odd.",
          "Yes, but only when $a$ is even.",
        ],
        answer: 0,
        hint: "An inverse exists exactly when the determinant is nonzero.",
        success: "Right: $\\det = 4 \\neq 0$, so the inverse exists.",
      },
      {
        kind: "choice",
        prompt: "Written as a formula in $a$, the determinant of $\\begin{bmatrix} a & 3 \\\\ 2 & 2 \\end{bmatrix}$ is:",
        options: ["$2a - 6$", "$2a$", "$6 - 2a$", "$a^2 - 6$"],
        answer: 0,
        hint: "Use $\\det = ad - bc = (a)(2) - (3)(2)$.",
        success: "$(a)(2) - (3)(2) = 2a - 6$.",
      },
    ],
  },
];
