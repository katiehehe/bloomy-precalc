import type { ParamSpec, Slide } from "../types";

const kParam: ParamSpec = {
  key: "k",
  label: "B's top-left entry k",
  min: 0,
  max: 12,
  start: 2,
  step: 1,
  format: (v) => `k = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "row-times-column",
    title: "Row times column",
    mode: "rowcol",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "To multiply two matrices we combine a **row** of the left matrix with a **column** of the right matrix. Here are our two: $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$.",
      },
      {
        text: "Here is the rule for a single entry. The entry of $AB$ in **row $i$, column $j$** comes from **row $i$ of $A$** and **column $j$ of $B$**: multiply their matching parts and add. This is exactly the dot product from the vectors unit.",
      },
      {
        text: "Start with the top-left entry, row $1$ column $1$. Take row $1$ of $A$, which is $(1, 2)$, and column $1$ of $B$, which is $(5, 7)$. Multiply matching parts and add: $(1)(5) + (2)(7) = 5 + 14 = 19$.",
        add: { r00: true },
      },
      {
        text: "That $19$ lands in the top-left of $AB$, the same row and column you combined: row $1$, column $1$. Make sure to pair a **row** of $A$ with a **column** of $B$, never a row with a row.",
      },
    ],
    practice: "Each entry of $AB$ is a dot product: row $i$ of $A$ with column $j$ of $B$, matching parts multiplied and added.",
    questions: [
      {
        kind: "choice",
        prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry of $AB$ is:",
        options: ["$17$", "$19$", "$23$", "$22$"],
        answer: 1,
        hint: "Row $1$ of $A$ is $(1, 2)$; column $1$ of $B$ is $(5, 7)$. Compute $(1)(5) + (2)(7)$.",
        success: "Yes: $(1)(5) + (2)(7) = 5 + 14 = 19$.",
      },
      {
        kind: "choice",
        prompt: "The entry in row $i$, column $j$ of $AB$ is formed from:",
        options: [
          "row $i$ of $A$ and column $j$ of $B$",
          "row $i$ of $A$ and row $j$ of $B$",
          "column $i$ of $A$ and column $j$ of $B$",
          "all of $A$ times all of $B$",
        ],
        answer: 0,
        hint: "One factor is a row of the left matrix; the other is a column of the right matrix.",
        success: "Right: row $i$ of the left matrix dotted with column $j$ of the right matrix.",
      },
    ],
  },
  {
    id: "fill-the-grid",
    title: "Fill in the grid",
    mode: "sweep",
    hideSliders: true,
    baseReveal: { dock: true, r00: true },
    beats: [
      {
        text: "Now sweep across the rest. Top-right entry, row $1$ column $2$: row $1$ of $A$ is $(1, 2)$, column $2$ of $B$ is $(6, 8)$, so $(1)(6) + (2)(8) = 6 + 16 = 22$.",
        add: { r01: true },
      },
      {
        text: "Bottom-left entry, row $2$ column $1$: row $2$ of $A$ is $(3, 4)$, column $1$ of $B$ is $(5, 7)$, so $(3)(5) + (4)(7) = 15 + 28 = 43$.",
        add: { r10: true },
      },
      {
        text: "Bottom-right entry, row $2$ column $2$: row $2$ of $A$ is $(3, 4)$, column $2$ of $B$ is $(6, 8)$, so $(3)(6) + (4)(8) = 18 + 32 = 50$.",
        add: { r11: true },
      },
      {
        text: "All four entries filled: $AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$. Each one is just a row-with-column dot product, placed at the row and column it came from.",
      },
    ],
    practice: "Fill the product one entry at a time: the (row $i$, column $j$) entry is row $i$ of $A$ dotted with column $j$ of $B$.",
    questions: [
      {
        kind: "choice",
        prompt: "Using the same $A$ and $B$, the bottom-left entry of $AB$ (row $2$, column $1$) is:",
        options: ["$31$", "$43$", "$50$", "$38$"],
        answer: 1,
        hint: "Row $2$ of $A$ is $(3, 4)$; column $1$ of $B$ is $(5, 7)$. Compute $(3)(5) + (4)(7)$.",
        success: "Yes: $(3)(5) + (4)(7) = 15 + 28 = 43$.",
      },
      {
        kind: "choice",
        prompt: "The bottom-right entry of $AB$ (row $2$, column $2$) is:",
        options: ["$46$", "$44$", "$50$", "$42$"],
        answer: 2,
        hint: "Row $2$ of $A$ is $(3, 4)$; column $2$ of $B$ is $(6, 8)$. Compute $(3)(6) + (4)(8)$.",
        success: "Yes: $(3)(6) + (4)(8) = 18 + 32 = 50$.",
      },
    ],
  },
  {
    id: "order-and-shape",
    title: "Order and shape",
    mode: "order",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "We found $AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$. A natural question: does $BA$ give the same thing?",
      },
      {
        text: "Swap the order and redo the row-with-column dot products. This time $BA = \\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$, a completely different matrix.",
        add: { ba: true },
      },
      {
        text: "So $AB \\neq BA$: matrix multiplication is **not commutative**. The order you multiply in matters, so keep the matrices in the order the problem gives you.",
      },
      {
        text: "One more rule, about shape. To multiply an $m \\times n$ matrix by a $p \\times q$ matrix, the **inner** numbers must match ($n = p$), and the product is $m \\times q$. A row of length $n$ needs a column of length $n$ to dot with.",
      },
    ],
    practice: "Order matters: $AB$ and $BA$ usually differ. And $(m \\times n)(n \\times q) = (m \\times q)$: the inner dimensions must match.",
    questions: [
      {
        kind: "choice",
        prompt: "For general square matrices, is $AB = BA$?",
        options: [
          "No, not in general; multiplication is not commutative.",
          "Yes, always.",
          "Yes, whenever both are $2 \\times 2$.",
          "Only when both have a zero entry.",
        ],
        answer: 0,
        hint: "We just saw $AB$ and $BA$ come out different for the same two matrices.",
        success: "Right: in general $AB \\neq BA$; the order matters.",
      },
      {
        kind: "choice",
        prompt: "What is the shape of the product $(2 \\times 3)(3 \\times 4)$?",
        options: ["$2 \\times 4$", "$3 \\times 3$", "$2 \\times 3$", "It is undefined."],
        answer: 0,
        hint: "Inner dimensions ($3$ and $3$) match, so it works; the result takes the outer dimensions.",
        success: "Yes: the inner $3$s match, and the product is (outer) $2 \\times 4$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [kParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now the top-left entry of $B$ is a dial $k$, so $B = \\begin{bmatrix} k & 6 \\\\ 7 & 8 \\end{bmatrix}$. The product's top-left entry is $(1)(k) + (2)(7) = k + 14$.",
      },
      {
        text: "Watch $k$ climb: only the entries in the product's **first column** move, because $k$ lives in $B$'s first column. The second column of $AB$ stays fixed.",
        to: { k: 10 },
        ms: 2200,
      },
      {
        text: "It comes to rest at $k = 2$, where the top-left entry is $2 + 14 = 16$.",
        to: { k: 2 },
        ms: 1600,
      },
    ],
    practice: "Slide $k$ (the top-left entry of $B$) and watch the product's first column change while the second column holds still.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $k$ so the top-left entry of $AB$ equals $20$.",
        hint: "The top-left entry is $(1)(k) + (2)(7) = k + 14$. Solve $k + 14 = 20$.",
        success: "Yes: $k = 6$ gives $(1)(6) + (2)(7) = 6 + 14 = 20$.",
        check: (_value, values) => Math.round(values.k ?? 0) === 6,
      },
      {
        kind: "choice",
        prompt: "When $k$ (the top-left entry of $B$) changes, which entries of $AB$ change?",
        options: [
          "Only the first column of $AB$.",
          "Only the first row of $AB$.",
          "Every entry of $AB$.",
          "No entries change.",
        ],
        answer: 0,
        hint: "$k$ sits in column $1$ of $B$, and column $j$ of $B$ only feeds column $j$ of $AB$.",
        success: "Right: $k$ is in $B$'s first column, so only $AB$'s first column depends on it.",
      },
      {
        kind: "choice",
        prompt: "With $k = 6$, the bottom-left entry of $AB$, that is $(3)(6) + (4)(7)$, is:",
        options: ["$46$", "$45$", "$50$", "$40$"],
        answer: 0,
        hint: "Compute $(3)(6) + (4)(7) = 18 + 28$.",
        success: "Yes: $(3)(6) + (4)(7) = 18 + 28 = 46$.",
      },
    ],
  },
];
