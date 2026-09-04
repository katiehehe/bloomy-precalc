import type { ParamSpec, Slide } from "../types";

const kParam: ParamSpec = {
  key: "k",
  label: "scalar k",
  min: -2,
  max: 6,
  start: 2,
  step: 1,
  format: (v) => `k = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "add-entrywise",
    title: "How to add matrices entry by entry",
    mode: "add",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A two-by-two system arranges coefficients in rows and columns. Those arrays are **matrices**: add them entry by entry when the shapes match, and later scale every entry by a number. These two each have $2$ rows and $2$ columns: $A = \\begin{bmatrix} 1 & 2 \\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\ 7 & 8 \\end{bmatrix}$.",
      },
      {
        text: "Begin at the top-left position, row $1$ and column $1$. The top-left entry of $A$ is $1$ and the top-left entry of $B$ is $5$, so their sum $1 + 5 = 6$ goes into the top-left of the answer, the same position it came from.",
        add: { s00: true },
      },
      {
        text: "Move to the top-right position, row $1$ and column $2$. There $A$ holds $2$ and $B$ holds $6$, so $2 + 6 = 8$ goes into the top-right of the answer.",
        add: { s01: true },
      },
      {
        text: "Next is the bottom-left position, row $2$ and column $1$. Here $A$ holds $3$ and $B$ holds $7$, so $3 + 7 = 10$.",
        add: { s10: true },
      },
      {
        text: "Last is the bottom-right, row $2$ and column $2$, where $4 + 8 = 12$. Placing all four sums in position gives $$A + B = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$$ so each entry is the sum of the two matching entries.",
        add: { s11: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt:
          "For $\\begin{bmatrix} 2 & 4 \\\\ 1 & 0 \\end{bmatrix} + \\begin{bmatrix} 3 & 5 \\\\ 6 & 8 \\end{bmatrix}$, the top-left entry of the sum is:",
        options: ["$6$", "$5$", "$1$", "$23$"],
        answer: 1,
        hint: "Add the two top-left entries, $2$ and $3$.",
        success: "Yes: $2 + 3 = 5$, placed in the top-left spot.",
      },
      {
        kind: "choice",
        prompt: "To add two matrices, what has to be true, and what do you do?",
        options: [
          "They must be the same shape, and you add the entries in matching spots.",
          "They must be the same shape, and you multiply the entries in matching spots.",
          "Any two matrices add. You line up the first rows and add those.",
          "They must be square, and you add the entries along the diagonal.",
        ],
        answer: 0,
        hint: "Addition happens spot by spot, so each entry needs a partner in the same position.",
        success: "Right: same shape first, then add the entries that share a spot.",
      },
    ],
  },
  {
    id: "scalar-multiply",
    title: "How to scale a matrix",
    mode: "scale",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A single number such as $3$ is called a **scalar**, which distinguishes it from a matrix. Multiplying a matrix by a scalar multiplies **every** entry by that number, worked out here for $3A$ with $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$.",
      },
      {
        text: "Top-left first: $3$ times the entry $1$ is $3 \\times 1 = 3$.",
        add: { p00: true },
      },
      {
        text: "Top-right next: $3 \\times 2 = 6$.",
        add: { p01: true },
      },
      {
        text: "Bottom-left: $3 \\times 3 = 9$.",
        add: { p10: true },
      },
      {
        text: "Bottom-right: $3 \\times 4 = 12$. Placing all four products gives $$3A = \\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix}$$ so make sure to multiply **every** entry, not only the first, because a scalar reaches all four.",
        add: { p11: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is the bottom-left entry of $5\\begin{bmatrix} 1 & 2 \\\\ 4 & 0 \\end{bmatrix}$?",
        options: ["$9$", "$20$", "$4$", "$5$"],
        answer: 1,
        hint: "Multiply the scalar $5$ by the bottom-left entry, which is $4$.",
        success: "Yes: $5 \\times 4 = 20$.",
      },
      {
        kind: "choice",
        prompt:
          "In $-2B$ with $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry is:",
        options: ["$-10$", "$10$", "$3$", "$-7$"],
        answer: 0,
        hint: "Multiply $-2$ by $5$ and keep the sign of the product.",
        success: "Yes: $-2 \\times 5 = -10$. A negative scalar flips the sign.",
      },
    ],
  },
  {
    id: "properties-and-shape",
    title: "Addition requires matching shapes",
    mode: "props",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Matrix addition has two properties and one rule to check first. The first property is that order does not matter, because $A + B$ and $B + A$ add the same two numbers in each position, and $1 + 5$ equals $5 + 1$. Addition is therefore **commutative**.",
        add: { comm: true },
      },
      {
        text: "The second property is that a scalar distributes across a sum: $k(A + B)$ equals $kA + kB$, scaling each matrix first and then adding. This is the **distributive** property, the same one used with ordinary numbers in $k(x + y) = kx + ky$.",
        add: { dist: true },
      },
      {
        text: "Now the rule to check before adding: the two matrices must be the **same shape**, with the same number of rows and the same number of columns. Only then does every entry have a partner in the matching position.",
        add: { shape: true },
      },
      {
        text: "A mismatch looks like a $2 \\times 3$ beside a $2 \\times 2$: the extra third column has no partner column, so the sum is **undefined**. Make sure to check that the shapes match before adding.",
        add: { mismatch: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Is $A + B$ the same matrix as $B + A$?",
        options: [
          "Yes, matrix addition is commutative.",
          "No, the order matters for addition.",
          "Only when both matrices are square.",
          "Only when every entry is positive.",
        ],
        answer: 0,
        hint: "In each position you add the same two numbers, and swapping their order never changes a sum.",
        success: "Right: $A + B = B + A$, so addition is commutative.",
      },
      {
        kind: "choice",
        prompt: "Which expression equals $k(A + B)$?",
        options: ["$kA + B$", "$A + kB$", "$kA + kB$", "$k + A + B$"],
        answer: 2,
        hint: "The scalar distributes onto each matrix inside the parentheses.",
        success: "Yes: $k(A + B) = kA + kB$.",
      },
      {
        kind: "choice",
        prompt: "Can you add a $2 \\times 2$ matrix and a $2 \\times 3$ matrix?",
        options: [
          "Yes, and the sum is $2 \\times 2$.",
          "No, the shapes do not match, so the sum is undefined.",
          "Yes, and the sum is $2 \\times 3$.",
          "Yes, just ignore the extra column.",
        ],
        answer: 1,
        hint: "Every entry needs a partner in the same spot, so the shapes must be identical.",
        success: "Right: different shapes cannot be added. The sum is undefined.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: add and scale a matrix",
    mode: "yourturn",
    params: [kParam],
    baseReveal: {},
    beats: [
      {
        text: "Now the slider sets the scalar $k$, which multiplies $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ to give $$kA = \\begin{bmatrix} k & 2k \\\\ 3k & 4k \\end{bmatrix}$$ so every entry of $A$ is multiplied by the same $k$.",
      },
      {
        text: "As $k$ increases toward $6$, all four entries of $kA$ grow at once, because the same $k$ multiplies each of them. No entry can change on its own.",
        to: { k: 6 },
        ms: 2200,
      },
      {
        text: "Coming back to $k = 2$, the scaled matrix is $$kA = \\begin{bmatrix} 2 & 4 \\\\ 6 & 8 \\end{bmatrix}$$ which is exactly $2A$.",
        to: { k: 2 },
        ms: 1600,
      },
    ],
    practice: "Slide $k$ until the top-left entry of $kA$ equals $5$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $k$ so the top-left entry of $kA$ equals $5$.",
        hint: "The top-left entry of $A$ is $1$, so the top-left of $kA$ is $k \\times 1 = k$. Solve $k = 5$.",
        success: "Yes: with $k = 5$ the top-left is $5 \\times 1 = 5$.",
        check: (_value, values) => Math.round(values.k ?? 0) === 5,
      },
      {
        kind: "choice",
        prompt: "As you change $k$, which entries of $kA$ change?",
        options: ["Only the top-left entry.", "Only the first row.", "All four entries.", "None of them."],
        answer: 2,
        hint: "The same scalar $k$ multiplies every entry of $A$.",
        success: "Right: one scalar scales all four entries together.",
      },
      {
        kind: "choice",
        prompt: "With $k = 5$, the bottom-right entry of $kA$, that is $5 \\times 4$, equals:",
        options: ["$9$", "$20$", "$4$", "$25$"],
        answer: 1,
        hint: "Multiply $5$ by the bottom-right entry of $A$, which is $4$.",
        success: "Yes: $5 \\times 4 = 20$.",
      },
    ],
  },
];
