import type { ParamSpec, Slide } from "../types";

/**
 * Determinants. Slide flags are read literally in Stage.tsx:
 *   diagHi / antiHi  highlight the main and anti diagonals (2x2 slides)
 *   valueHi          show the finished det value / live readout
 *   zeroHi           show the singular (det = 0) conclusion
 *   e1..e6           reveal the 3x3 cofactor expansion one line at a time
 *   dock             show the formula dock
 * Every flag set here is read by the figure, and every flag the figure reads is
 * set here, so the harness reports no unset or dead flags.
 */

const dParam: ParamSpec = {
  key: "d",
  label: "bottom-right entry d",
  min: 0,
  max: 8,
  start: 6,
  step: 1,
  format: (v) => `d = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "two-by-two",
    title: "How to compute a $2 \\times 2$ determinant",
    mode: "twobytwo",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A **square** matrix has the same number of rows and columns. From that array we compute a single number called the **determinant**, written $\\det A$ (or $|A|$), which shows whether the matrix can be inverted and by what factor it scales area. For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ we compute it from the two diagonals.",
      },
      {
        text: "The rule uses the two diagonals. The **main diagonal** runs from top-left to bottom-right, which here is $a$ and $d$, and multiplying them gives $ad$. With $a = 4$ and $d = 5$, this is $ad = 4 \\times 5 = 20$.",
        add: { diagHi: true },
      },
      {
        text: "The **anti-diagonal** runs from top-right to bottom-left, which here is $b$ and $c$, and multiplying them gives $bc$. With $b = 3$ and $c = 2$, this is $bc = 3 \\times 2 = 6$.",
        add: { antiHi: true },
      },
      {
        text: "The determinant is the main-diagonal product minus the anti-diagonal product: $$\\det A = ad - bc$$ Make sure to **subtract** in that order (main minus anti): $20 - 6 = 14$.",
        add: { valueHi: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The determinant of $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is:",
        options: ["$ad - bc$", "$ab - cd$", "$ad + bc$", "$ac - bd$"],
        answer: 0,
        hint: "Multiply the main diagonal ($a$ and $d$), then subtract the anti-diagonal product ($b$ and $c$).",
        success: "Yes: $\\det = ad - bc$, the main-diagonal product minus the anti-diagonal product.",
      },
      {
        kind: "choice",
        prompt: "For $A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 5 \\end{bmatrix}$, $\\det A$ is:",
        options: ["$26$", "$-14$", "$14$", "$7$"],
        answer: 2,
        hint: "Compute $ad - bc = (4)(5) - (3)(2)$.",
        success: "Yes: $(4)(5) - (3)(2) = 20 - 6 = 14$.",
      },
    ],
  },
  {
    id: "singular",
    title: "What happens if the determinant is $0$?",
    mode: "singular",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A matrix is called **singular** when its determinant is $0$, which means it has **no inverse** and cannot be undone. Geometrically its transformation flattens the unit square onto a single line, so the area it encloses collapses to $0$. The matrix to test is $A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$.",
      },
      {
        text: "Main-diagonal product first: $ad = 2 \\times 2 = 4$.",
        add: { diagHi: true },
      },
      {
        text: "Anti-diagonal product next: $bc = 4 \\times 1 = 4$. The two products are **equal**, so subtracting them will give $0$.",
        add: { antiHi: true },
      },
      {
        text: "Subtract: $$\\det A = ad - bc = 4 - 4 = 0$$ Because $\\det A = 0$, this matrix is **singular**, so it has no inverse.",
        add: { zeroHi: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$ equals:",
        options: ["$0$", "$8$", "$6$", "$4$"],
        answer: 0,
        hint: "Compute $ad - bc = (2)(2) - (4)(1)$.",
        success: "Yes: $(2)(2) - (4)(1) = 4 - 4 = 0$, so the matrix is singular.",
      },
      {
        kind: "choice",
        prompt: "A square matrix has **no inverse** exactly when its determinant is:",
        options: ["$1$", "$0$", "positive", "negative"],
        answer: 1,
        hint: "That is the definition of a singular matrix.",
        success: "Right: $\\det A = 0$ is exactly the singular case, where no inverse exists.",
      },
      {
        kind: "choice",
        prompt: "If $\\det A = 0$ for a $2 \\times 2$ matrix, its transformation:",
        options: [
          "collapses the unit square onto a line (zero area)",
          "doubles every area",
          "rotates the plane by $90^\\circ$",
          "leaves the plane unchanged",
        ],
        answer: 0,
        hint: "The determinant measures how area is scaled. A value of $0$ scales area to nothing.",
        success: "Yes: a zero determinant means the area is scaled to $0$, flattening the square onto a line.",
      },
    ],
  },
  {
    id: "cofactor",
    title: "How to expand a $3 \\times 3$ determinant",
    mode: "cofactor-build",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A $3 \\times 3$ determinant is built from $2 \\times 2$ pieces through **cofactor expansion along a row**. Row 1 of $A$ is tinted because that is the row we expand along.",
      },
      {
        text: "The recipe for each of the three entries in row 1 is the same. Cross out that entry's own row and column, and the determinant of the $2 \\times 2$ left behind is its **minor**. Then multiply the entry by its minor and by a sign, where the signs along row 1 alternate $+\\,-\\,+$.",
      },
      {
        text: "Start at the entry $1$. Crossing out row 1 and column 1 leaves the minor $\\begin{vmatrix} 5 & 6 \\\\ 8 & 10 \\end{vmatrix}$, and its sign is $+$, giving the first term $+\\,1\\begin{vmatrix} 5 & 6 \\\\ 8 & 10 \\end{vmatrix}$.",
        add: { t1: true },
        draw: true,
        ms: 1400,
      },
      {
        text: "Move to the entry $2$. Crossing out row 1 and column 2 leaves $\\begin{vmatrix} 4 & 6 \\\\ 7 & 10 \\end{vmatrix}$, and its sign is $-$, so the second term is $-\\,2\\begin{vmatrix} 4 & 6 \\\\ 7 & 10 \\end{vmatrix}$.",
        add: { t2: true },
        draw: true,
        ms: 1400,
      },
      {
        text: "Finish at the entry $3$. Crossing out row 1 and column 3 leaves $\\begin{vmatrix} 4 & 5 \\\\ 7 & 8 \\end{vmatrix}$, and its sign is $+$, so the third term is $+\\,3\\begin{vmatrix} 4 & 5 \\\\ 7 & 8 \\end{vmatrix}$.",
        add: { t3: true },
        draw: true,
        ms: 1400,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Expanding a $3 \\times 3$ along the first row, the three signs are:",
        options: ["$+\\,-\\,+$", "$+\\,+\\,+$", "$-\\,+\\,-$", "$+\\,-\\,-$"],
        answer: 0,
        hint: "The sign array starts with $+$ in the top-left corner and alternates.",
        success: "Right: along row 1 the signs alternate $+\\,-\\,+$.",
      },
      {
        kind: "choice",
        prompt: "The minor of the entry $1$ (row 1, column 1) of $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{bmatrix}$ is the determinant of:",
        options: [
          "$\\begin{bmatrix} 5 & 6 \\\\ 8 & 10 \\end{bmatrix}$",
          "$\\begin{bmatrix} 4 & 6 \\\\ 7 & 10 \\end{bmatrix}$",
          "$\\begin{bmatrix} 4 & 5 \\\\ 7 & 8 \\end{bmatrix}$",
          "$\\begin{bmatrix} 1 & 2 \\\\ 4 & 5 \\end{bmatrix}$",
        ],
        answer: 0,
        hint: "Cross out the row and the column that contain the $1$, and keep what remains.",
        success: "Yes: deleting row 1 and column 1 leaves $\\begin{bmatrix} 5 & 6 \\\\ 8 & 10 \\end{bmatrix}$.",
      },
    ],
  },
  {
    id: "cofactor-combine",
    title: "How to evaluate the three minors",
    mode: "cofactor",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The expansion is now three ordinary $2 \\times 2$ determinants, and each one is evaluated as $ad - bc$: main-diagonal product minus anti-diagonal product.",
        add: { e1: true },
        draw: true,
        ms: 1200,
      },
      {
        text: "Multiply inside each pair. In the first minor $5 \\times 10 = 50$ and $6 \\times 8 = 48$, and the other two minors are handled the same way.",
        add: { e2: true },
        draw: true,
        ms: 1200,
      },
      {
        text: "Subtract inside each pair: $50 - 48 = 2$, then $40 - 42 = -2$, then $32 - 35 = -3$.",
        add: { e3: true },
        draw: true,
        ms: 1200,
      },
      {
        text: "Now distribute the outside entries and the $+\\,-\\,+$ signs. Handle the middle sign carefully: $-2(-2) = +4$, because a negative times a negative is positive.",
        add: { e4: true },
        draw: true,
        ms: 1200,
      },
      {
        text: "Adding the three terms gives $2 + 4 - 9 = -3$, so $\\det A = -3$. A negative determinant means the transformation reverses orientation.",
        add: { e5: true },
        draw: true,
        ms: 1200,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Combining the terms, $1(2) - 2(-2) + 3(-3)$ equals:",
        options: ["$-11$", "$-3$", "$3$", "$-9$"],
        answer: 1,
        hint: "Handle the middle sign first: $-2(-2) = +4$, then add $2 + 4 - 9$.",
        success: "Yes: $2 + 4 - 9 = -3$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: compute a determinant",
    mode: "yourturn",
    params: [dParam],
    baseReveal: { dock: true, diagHi: true, antiHi: true, valueHi: true },
    beats: [
      {
        text: "In $A = \\begin{bmatrix} 2 & 4 \\\\ 1 & d \\end{bmatrix}$ the bottom-right entry $d$ is set by the slider. The determinant is $$ad - bc = (2)(d) - (4)(1) = 2d - 4$$ so $\\det A$ changes whenever $d$ changes.",
      },
      {
        text: "As $d$ grows, the main-diagonal product $2d$ grows while the anti-diagonal product $bc = 4$ stays fixed, so $\\det A = 2d - 4$ climbs.",
        to: { d: 8 },
        ms: 2000,
      },
      {
        text: "As $d$ comes back down, the determinant falls toward $0$. When the main-diagonal product $2d$ shrinks to match $bc = 4$, the determinant reaches $0$ and the matrix turns singular.",
        to: { d: 6 },
        ms: 1800,
      },
    ],
    practice: "Slide $d$ until $\\det A = 0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide $d$ until $\\det A = 0$, making the matrix singular.",
        hint: "The determinant is $2d - 4$. Solve $2d - 4 = 0$ for $d$.",
        success: "Yes: at $d = 2$, $\\det A = (2)(2) - (4)(1) = 4 - 4 = 0$, so $A$ is singular.",
        check: (_value, values) => 2 * Math.round(values.d ?? 0) - 4 === 0,
      },
      {
        kind: "choice",
        prompt: "As you increase $d$, the determinant $2d - 4$:",
        options: ["increases", "decreases", "stays the same", "is always $0$"],
        answer: 0,
        hint: "The term $2d$ grows with $d$, while $-4$ is constant.",
        success: "Right: $2d$ grows with $d$, so $\\det A = 2d - 4$ increases.",
      },
      {
        kind: "choice",
        prompt: "At $d = 5$, the determinant $(2)(5) - (4)(1)$ equals:",
        options: ["$14$", "$6$", "$4$", "$-6$"],
        answer: 1,
        hint: "Compute $10 - 4$.",
        success: "Yes: $(2)(5) - (4)(1) = 10 - 4 = 6$.",
      },
      {
        kind: "choice",
        prompt: "When $\\det A = 0$, the matrix $A$:",
        options: ["has no inverse", "still has exactly one inverse", "must be the identity", "must have determinant $1$"],
        answer: 0,
        hint: "A determinant of $0$ is the definition of a singular matrix.",
        success: "Right: $\\det A = 0$ means $A$ is singular, so it has no inverse.",
      },
    ],
  },
];
