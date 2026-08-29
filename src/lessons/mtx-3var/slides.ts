import type { Slide } from "../types";

/**
 * Three-variable systems by Gaussian elimination. The augmented matrix, the three
 * legal row operations, clearing the first column below the pivot, back-substitution
 * to (x, y, z) = (1, 2, 3), and the two special endings (no solution, infinitely
 * many). Reveal flags are read literally in Stage.tsx:
 *   setup:     aug, bar, ops
 *   eliminate: piv, e1, e2
 *   solve:     s1, s2, s3, s4
 *   yourturn:  inc, dep
 * plus dock (all slides).
 */
export const slides: Slide[] = [
  {
    id: "build-augmented",
    title: "Build the augmented matrix",
    mode: "setup",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Here is a system of three linear equations in three unknowns $x$, $y$, and $z$: $\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}$ A **solution** is one triple $(x, y, z)$ that makes all three equations true at the same time.",
      },
      {
        text: "Rewriting the letters over and over is wasted effort, so keep only the numbers, lined up in columns: every $x$ coefficient in column 1, every $y$ in column 2, every $z$ in column 3, and each right-hand constant in the last column. That grid is the **augmented matrix**, written $[A \\mid b]$.",
        add: { aug: true },
      },
      {
        text: "The vertical bar just marks where the equals signs used to be. Everything to the **left** of the bar is a coefficient, and the single column to the **right** of the bar holds the constants. Nothing is lost. We have only dropped the letters and the plus signs.",
        add: { bar: true },
      },
      {
        text: "We are allowed exactly three moves, called **elementary row operations**, and each one leaves the solution unchanged: (1) swap two rows, (2) multiply a whole row by a nonzero number, and (3) add a multiple of one row to another row. Every legal step is one of these three, and notice they act on whole **rows**, never on single entries or on columns.",
        add: { ops: true },
      },
    ],
    practice:
      "Each equation becomes one row: the coefficients go to the left of the bar and the constant goes to the right of it.",
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
    title: "Clear the first column",
    mode: "eliminate",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "The plan of **elimination** is to create zeros below the top-left entry, one column at a time. That top-left $1$ is called the **pivot**. Our job on this slide is to turn the $2$ and the $1$ sitting directly beneath it into $0$s, without changing the solution.",
        add: { piv: true },
      },
      {
        text: "Row 2 starts with a $2$ and the pivot row starts with a $1$, so to cancel that $2$ we subtract twice the pivot row: $R_2 \\to R_2 - 2R_1$. Work entry by entry: $(2 - 2\\cdot 1,\\; 1 - 2\\cdot 1,\\; 1 - 2\\cdot 1,\\; 7 - 2\\cdot 6) = (0,\\, -1,\\, -1,\\, -5)$. Make sure to subtract in every column, including the constant, not just the first one.",
        add: { e1: true },
      },
      {
        text: "Row 3 starts with a $1$, the same as the pivot, so we subtract the pivot row exactly once: $R_3 \\to R_3 - R_1$. Entry by entry: $(1 - 1,\\; 2 - 1,\\; 1 - 1,\\; 8 - 6) = (0,\\, 1,\\, 0,\\, 2)$.",
        add: { e2: true },
      },
      {
        text: "Column 1 is now clear: only the pivot $1$ is left in it, with $0$s beneath. As a bonus, row 3 has collapsed to $(0,\\, 1,\\, 0 \\mid 2)$, which is just $y = 2$ on its own. That is what elimination buys us: simpler rows that we can read almost directly.",
      },
    ],
    practice:
      "To zero the entry below the pivot, subtract the right multiple of the pivot row. The multiple is whatever makes that entry cancel.",
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
    title: "Back-substitute and check",
    mode: "solve",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now read the rows from the **bottom up**, a method called **back-substitution**. The bottom row is $(0, 1, 0 \\mid 2)$, which means $0x + 1y + 0z = 2$, so it reads $y = 2$ directly, with no work at all.",
        add: { s1: true },
      },
      {
        text: "Move up to row 2, $(0, -1, -1 \\mid -5)$, which means $-y - z = -5$. We already know $y = 2$, so substitute it in: $-(2) - z = -5$. That is $-2 - z = -5$, so $-z = -3$, which gives $z = 3$. Watch the signs carefully here, since two negatives are in play.",
        add: { s2: true },
      },
      {
        text: "Move up to row 1, $(1, 1, 1 \\mid 6)$, which means $x + y + z = 6$. Substitute the two values we now have, $y = 2$ and $z = 3$: $x + 2 + 3 = 6$, so $x + 5 = 6$, which gives $x = 1$.",
        add: { s3: true },
      },
      {
        text: "The solution is $(x, y, z) = (1, 2, 3)$. Always **check** it in the original three equations: $1 + 2 + 3 = 6$, then $2(1) + 2 + 3 = 7$, then $1 + 2(2) + 3 = 8$. All three hold, so the triple is confirmed.",
        add: { s4: true },
      },
    ],
    practice:
      "Read the bottom row for one variable, substitute upward one row at a time, and finish by checking the triple in all three equations.",
    questions: [
      {
        kind: "choice",
        prompt: "The bottom row is $(0, 1, 0 \\mid 2)$. What does it tell you?",
        options: ["$x = 2$", "$z = 2$", "$y = 2$", "$y = 0$"],
        answer: 2,
        hint: "The columns are $x$, then $y$, then $z$. A $1$ sits in the $y$ column and $0$s sit elsewhere.",
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
    title: "Your turn",
    mode: "yourturn",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "You now have the whole method: build $[A \\mid b]$, use row operations to clear each column below its pivot, then back-substitute from the bottom row up. The reduced matrix shown on the left is what gave us $(x, y, z) = (1, 2, 3)$.",
      },
      {
        text: "Two special endings can show up. If a row collapses to $(0, 0, 0 \\mid 5)$, it claims $0 = 5$, which is impossible. The system is **inconsistent** and has **no solution**. The tell is all zeros on the left of the bar with a nonzero number on the right.",
        add: { inc: true },
      },
      {
        text: "The other ending is a row of all zeros, $(0, 0, 0 \\mid 0)$, which says $0 = 0$. That is always true, so it adds no information and leaves a **free variable**. The system is **dependent** and has **infinitely many** solutions.",
        add: { dep: true },
      },
    ],
    practice:
      "Decide what a row is telling you: a legal move, a solution you can read, an impossible row, or an all-zero row.",
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
];
