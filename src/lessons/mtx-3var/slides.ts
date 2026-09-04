import type { ParamSpec, Slide } from "../types";

const mParam: ParamSpec = {
  key: "m",
  label: "Multiplier m",
  min: 0,
  max: 4,
  start: 0,
  step: 1,
  format: (v) => `m = ${Math.round(v)}`,
};

/**
 * Three-variable systems by Gaussian elimination. The augmented matrix, the three
 * legal row operations, clearing the first column below the pivot, back-substitution
 * to (x, y, z) = (1, 2, 3), and the two special endings (no solution, infinitely
 * many). Reveal flags are read literally in Stage.tsx:
 *   setup:     aug, bar, ops
 *   eliminate: piv, e1, e2
 *   solve:     s1, s2, s3, s4
 *   yourturn:  inc, dep
 */
export const slides: Slide[] = [
  {
    id: "build-augmented",
    title: "How to build an augmented matrix",
    mode: "setup",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A system of three equations in $x$, $y$, and $z$ can be packed into a grid of coefficients. This system is $$\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}$$",
      },
      {
        text: "Once the coefficients are in columns, the letters themselves are not needed. Each $x$ coefficient goes in column 1, each $y$ in column 2, each $z$ in column 3, and each right-hand constant in the last column. This grid is the **augmented matrix**, written $[A \\mid b]$.",
        add: { aug: true },
      },
      {
        text: "The vertical bar marks where the equals signs used to be. Everything to the **left** of the bar is a coefficient, and the single column to the **right** holds the constants. Nothing is lost, because only the letters and the plus signs were dropped.",
        add: { bar: true },
      },
      {
        text: "We are allowed exactly three **elementary row operations**, and each one leaves the solution unchanged. They are (1) swap two rows, (2) multiply a whole row by a nonzero number, and (3) add a multiple of one row to another row. Each one acts on a whole **row**, never on a single entry or a single column.",
        add: { ops: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt:
          "Which augmented matrix represents $\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}$?",
        options: [
          "$\\left[\\begin{array}{ccc|c} 6 & 1 & 1 & 1 \\\\ 7 & 2 & 1 & 1 \\\\ 8 & 1 & 2 & 1 \\end{array}\\right]$",
          "$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & 1 & 1 & 7 \\\\ 1 & 2 & 1 & 8 \\end{array}\\right]$",
          "$\\left[\\begin{array}{ccc|c} 1 & 2 & 1 & 6 \\\\ 1 & 1 & 2 & 7 \\\\ 1 & 1 & 1 & 8 \\end{array}\\right]$",
          "$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 1 & 1 & 2 & 7 \\\\ 1 & 2 & 1 & 8 \\end{array}\\right]$",
        ],
        answer: 1,
        hint: "Read across each equation: the $x$, $y$, $z$ coefficients go left of the bar, and the constant after the equals sign goes right of it.",
        success: "Row 1 is $x + y + z = 6$, which becomes $(1, 1, 1 \\mid 6)$, and the other two rows follow the same way.",
      },
      {
        kind: "choice",
        prompt: "Which of these is NOT a legal elementary row operation?",
        options: [
          "Swap row 1 and row 3.",
          "Multiply row 2 by $5$.",
          "Add $4$ to every entry of row 3.",
          "Replace row 3 with row 3 minus twice row 1.",
        ],
        answer: 2,
        hint: "The three legal moves are: swap two rows, multiply a row by a nonzero number, and add a multiple of one row to another row.",
        success: "Adding a constant to every entry is not on the list. It changes that equation and breaks the solution.",
      },
    ],
  },
  {
    id: "clear-first-column",
    title: "How to clear the first column",
    mode: "eliminate",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The plan of **elimination** is to create zeros below the top-left entry, one column at a time. That top-left $1$ is called the **pivot**. The goal now is to turn the $2$ and the $1$ directly beneath it into $0$s without changing the solution.",
        add: { piv: true },
      },
      {
        text: "Row 2 starts with a $2$ and the pivot row starts with a $1$, so to cancel that $2$ we subtract twice the pivot row: $R_2 \\to R_2 - 2R_1$. Work entry by entry: $(2 - 2\\cdot 1,\\; 1 - 2\\cdot 1,\\; 1 - 2\\cdot 1,\\; 7 - 2\\cdot 6) = (0,\\, -1,\\, -1,\\, -5)$. Make sure to subtract in every column, including the constant, not just the first one.",
        add: { e1: true },
        draw: true,
        ms: 750,
      },
      {
        text: "Row 3 starts with a $1$, the same as the pivot, so we subtract the pivot row exactly once: $R_3 \\to R_3 - R_1$. Entry by entry: $(1 - 1,\\; 2 - 1,\\; 1 - 1,\\; 8 - 6) = (0,\\, 1,\\, 0,\\, 2)$.",
        add: { e2: true },
        draw: true,
        ms: 750,
      },
      {
        text: "Column 1 is now clear, holding only the pivot $1$ with $0$s beneath it. Row 3 has also reduced to $(0,\\, 1,\\, 0 \\mid 2)$, which by itself already says $y = 2$. Elimination has produced a simpler row that can be read almost directly.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Row 2 begins with a $2$ and the pivot row begins with a $1$. Which operation turns that $2$ into a $0$?",
        options: [
          "$R_2 \\to R_2 + 2R_1$",
          "$R_2 \\to 2R_2 - R_1$",
          "$R_2 \\to R_2 - R_1$",
          "$R_2 \\to R_2 - 2R_1$",
        ],
        answer: 3,
        hint: "You need the first entry to become $2 - m\\cdot 1 = 0$. Solve for the multiple $m$.",
        success: "$2 - 2\\cdot 1 = 0$, so subtracting twice the pivot row clears that entry.",
      },
      {
        kind: "choice",
        prompt:
          "Carrying out $R_2 \\to R_2 - 2R_1$ on the row $(2, 1, 1 \\mid 7)$ with pivot row $(1, 1, 1 \\mid 6)$ gives:",
        options: [
          "$(4, 3, 3 \\mid 19)$",
          "$(0, -1, -1 \\mid -5)$",
          "$(0, -1, -1 \\mid 5)$",
          "$(0, 1, 1 \\mid 7)$",
        ],
        answer: 1,
        hint: "Subtract entry by entry: $2-2,\\ 1-2,\\ 1-2,\\ 7-12$.",
        success: "$(2-2,\\ 1-2,\\ 1-2,\\ 7-12) = (0, -1, -1 \\mid -5)$.",
      },
    ],
  },
  {
    id: "back-substitute",
    title: "How to back-substitute and check",
    mode: "solve",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now read the rows from the **bottom up**, a method called **back-substitution**. The bottom row $(0, 1, 0 \\mid 2)$ means $0x + 1y + 0z = 2$, so it reads $y = 2$ directly.",
        add: { s1: true },
      },
      {
        text: "Move up to row 2, $(0, -1, -1 \\mid -5)$, which means $-y - z = -5$. Substituting the known $y = 2$ gives $-(2) - z = -5$, that is $-2 - z = -5$, so $-z = -3$ and $z = 3$. Make sure to track the signs carefully, since two negatives are in play.",
        add: { s2: true },
      },
      {
        text: "Move up to row 1, $(1, 1, 1 \\mid 6)$, which means $x + y + z = 6$. Substituting $y = 2$ and $z = 3$ gives $x + 2 + 3 = 6$, so $x + 5 = 6$ and $x = 1$.",
        add: { s3: true },
      },
      {
        text: "The solution is $(x, y, z) = (1, 2, 3)$. Always **check** it in the original three equations: $1 + 2 + 3 = 6$, then $2(1) + 2 + 3 = 7$, then $1 + 2(2) + 3 = 8$. All three hold, so the triple is confirmed.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The bottom row is $(0, 1, 0 \\mid 2)$. What does it mean?",
        options: ["$x = 2$", "$z = 2$", "$y = 2$", "$y = 0$"],
        answer: 2,
        hint: "The columns are $x$, then $y$, then $z$. A $1$ is in the $y$ column and $0$s are elsewhere.",
        success: "It reads $0x + 1y + 0z = 2$, that is $y = 2$.",
      },
      {
        kind: "choice",
        prompt: "Row 2 is $(0, -1, -1 \\mid -5)$, that is $-y - z = -5$. Using $y = 2$, solve for $z$.",
        options: ["$z = 3$", "$z = 7$", "$z = -7$", "$z = -3$"],
        answer: 0,
        hint: "Substitute $y = 2$ to get $-2 - z = -5$. Add $2$ to both sides, then solve for $z$.",
        success: "$-2 - z = -5 \\Rightarrow -z = -3 \\Rightarrow z = 3$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: read an elimination step",
    mode: "yourturn",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The method has three steps: build $[A \\mid b]$, use row operations to clear each column below its pivot, then back-substitute from the bottom row up. The reduced matrix on the left is the one that produced $(x, y, z) = (1, 2, 3)$.",
      },
      {
        text: "Two special endings can appear. If a row reduces to $(0, 0, 0 \\mid 5)$, it claims $0 = 5$, which is impossible, so the system is **inconsistent** and has **no solution**. The signal is all zeros left of the bar with a nonzero constant on the right.",
        add: { inc: true },
      },
      {
        text: "The other ending is a row of all zeros, $(0, 0, 0 \\mid 0)$, which says $0 = 0$. That is always true, so it adds no information and leaves a **free variable**. The system is **dependent** and has **infinitely many** solutions.",
        add: { dep: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which of these is a legal elementary row operation?",
        options: [
          "Add $3$ to every entry of row 2.",
          "Multiply row 2 by $0$.",
          "Swap column 1 and column 2.",
          "Replace row 2 with row 2 plus $3$ times row 1.",
        ],
        answer: 3,
        hint: "The three legal moves act on whole rows: swap two rows, scale a row by a nonzero number, or add a multiple of one row to another.",
        success: "Adding a multiple of one row to another row is exactly move (3), and it keeps the solution unchanged.",
      },
      {
        kind: "choice",
        prompt:
          "A system reduces to $\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 5 \\\\ 0 & 1 & 0 & -2 \\\\ 0 & 0 & 1 & 4 \\end{array}\\right]$. What is $(x, y, z)$?",
        options: ["$(4, -2, 5)$", "$(-2, 5, 4)$", "$(5, -2, 4)$", "$(5, 2, 4)$"],
        answer: 2,
        hint: "Each row reads one variable directly, and the columns are in the order $x$, then $y$, then $z$.",
        success: "Row 1 gives $x = 5$, row 2 gives $y = -2$, row 3 gives $z = 4$.",
      },
      {
        kind: "choice",
        prompt: "During elimination a row becomes $(0, 0, 0 \\mid 5)$. What does this mean?",
        options: [
          "Infinitely many solutions.",
          "No solution. The system is inconsistent.",
          "$z = 5$.",
          "$x = y = z = 5$.",
        ],
        answer: 1,
        hint: "Translate the row back into an equation: $0x + 0y + 0z = 5$.",
        success: "That says $0 = 5$, which is impossible, so the system has no solution.",
      },
      {
        kind: "choice",
        prompt: "During elimination a row becomes $(0, 0, 0 \\mid 0)$. What does this mean?",
        options: [
          "A free variable, so infinitely many solutions.",
          "No solution. The system is inconsistent.",
          "Exactly one solution.",
          "An arithmetic mistake must have happened.",
        ],
        answer: 0,
        hint: "Translate it back: $0x + 0y + 0z = 0$. Is that ever false?",
        success: "$0 = 0$ is always true, so it removes one constraint and leaves infinitely many solutions.",
      },
    ],
  },
  {
    id: "run-elimination",
    title: "Your turn: run the elimination step",
    mode: "practice",
    params: [mParam],
    baseReveal: {},
    beats: [
      {
        text: "The first elimination step starts from the pivot $1$ in row 1, column 1. The goal is to turn the $2$ directly below it into a $0$ by the legal move $R_2 \\to R_2 - mR_1$, where $m$ is the multiplier.",
      },
      {
        text: "Row 1 is $(1, 1, 1, 6)$ and row 2 is $(2, 1, 1, 7)$. Subtracting $m$ copies of row 1 turns the first entry of row 2 into $2 - m$. Right now $m = 0$, so row 2 has not moved yet.",
      },
    ],
    practice: "Drag $m$ until the first entry of row 2 becomes $0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Choose $m$ so that $R_2 \\to R_2 - mR_1$ makes the first entry of row 2 equal $0$.",
        hint: "The first entry becomes $2 - m$. Which $m$ makes that zero?",
        success: "$m = 2$: $R_2 - 2R_1 = (0, -1, -1, -5)$, so the entry below the pivot is cleared.",
        check: (value) => Math.abs(value - 2) < 0.5,
      },
      {
        kind: "choice",
        prompt: "With $m = 2$, row 2 becomes $(0, -1, -1, -5)$. Why is clearing that first entry the goal?",
        options: [
          "it places a zero below the pivot, moving the matrix toward triangular form",
          "it makes every number in the row larger",
          "it swaps rows 1 and 2",
          "it multiplies the whole row by zero",
        ],
        answer: 0,
        hint: "Gaussian elimination aims for zeros below each pivot.",
        success: "Right: each step places a zero below a pivot, moving the matrix toward the upper-triangular form you then back-substitute.",
      },
    ],
  },
];
