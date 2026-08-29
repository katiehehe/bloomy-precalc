import type { ParamSpec, Slide } from "../types";

/**
 * Binomial theorem. (a+b)^n = sum_{k=0}^{n} C(n,k) a^(n-k) b^k, with the
 * coefficients read from row n of Pascal's triangle.
 *
 * Reveal flags are read literally in Stage.tsx (kept in sync here):
 *   triangle: rows, parents, cnotation
 *   theorem:  rows (base), coeffs, exps
 *   expand3:  rows (base), coeffs, terms, result
 *   term:     rows (base), coeffs, formula, terms, result
 *   yourturn: rows (base); the highlighted row follows the n slider
 */

const nParam: ParamSpec = {
  key: "n",
  label: "power n",
  min: 0,
  max: 6,
  start: 2,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "triangle",
    title: "Building Pascal's triangle",
    mode: "triangle",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Pascal's triangle is a stack of numbers that hands you the coefficients for expanding $(a+b)^n$. We build it row by row from the top, and we number the rows starting at $0$, so the single $1$ at the very top is row $0$. Every row begins and ends with a $1$. Here are rows $0$ through $6$.",
        add: { rows: true },
        draw: true,
      },
      {
        text: "The rule that fills in the middle is wonderfully simple: every entry that is not on an edge is the sum of the two entries directly above it, one to its upper left and one to its upper right. Look at the $6$ in row $4$. The two numbers above it are both $3$, and $3 + 3 = 6$. That one rule generates the whole triangle.",
        add: { parents: true },
      },
      {
        text: "We give each entry a name: the **binomial coefficient** $\\binom{n}{k}$, read as $n$ choose $k$. It is the entry in row $n$ at position $k$, where positions are counted from $k = 0$ on the left. So the $6$ we just found is $\\binom{4}{2}$: row $4$, position $2$. There is also a formula, $\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$, but reading the number off the triangle is often faster.",
        add: { cnotation: true },
      },
    ],
    practice:
      "Each interior entry is the sum of the two directly above it, and both edges are always $1$; the entry in row $n$, position $k$ is $\\binom{n}{k}$.",
    questions: [
      {
        kind: "choice",
        prompt: "In Pascal's triangle, how do you get an entry that is not on an edge?",
        options: [
          "Add the two entries directly above it",
          "Multiply the two entries directly above it",
          "Add every entry in the row above it",
          "Double the entry to its upper left",
        ],
        answer: 0,
        hint: "Look at how the $6$ in row $4$ came from the row above.",
        success: "Right: each interior entry is the sum of the two directly above it, like $3 + 3 = 6$.",
      },
      {
        kind: "choice",
        prompt: "Row $4$ is $1, 4, 6, 4, 1$. Reading off the triangle, $\\binom{4}{2}$ equals:",
        options: ["6", "4", "2", "8"],
        answer: 0,
        hint: "Count positions from $k = 0$: the entry at position $2$ in row $4$.",
        success: "Yes: $\\binom{4}{2}$ is the entry at position $2$ of row $4$, which is $6$.",
      },
    ],
  },
  {
    id: "theorem",
    title: "The binomial theorem",
    mode: "theorem",
    hideSliders: true,
    baseReveal: { rows: true },
    beats: [
      {
        text: "The binomial theorem packages the whole expansion into one formula: $(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k}\\, a^{\\,n-k} b^{\\,k}$. In words, to expand $(a+b)^n$ you add up one term for each $k$ from $0$ to $n$, and the term for a given $k$ is the coefficient $\\binom{n}{k}$ times $a$ raised to $n - k$ times $b$ raised to $k$.",
      },
      {
        text: "Where do the coefficients come from? They are exactly row $n$ of Pascal's triangle. Take $n = 3$: row $3$ is $1, 3, 3, 1$, now highlighted. Those four numbers will be the four coefficients of $(a+b)^3$, in that order.",
        add: { coeffs: true },
      },
      {
        text: "Now watch the exponents. Reading left to right, the power on $a$ falls $3, 2, 1, 0$ while the power on $b$ rises $0, 1, 2, 3$. In every single term the two powers add to $3$, which is $n$. Combining the row-$3$ coefficients with those powers gives $(a+b)^3 = a^3 + 3a^2 b + 3a b^2 + b^3$. Count the terms: there are $n + 1 = 4$ of them.",
        add: { exps: true },
      },
    ],
    practice:
      "Row $n$ gives the coefficients; the power of $a$ falls from $n$ to $0$ while the power of $b$ rises from $0$ to $n$, and the two always sum to $n$.",
    questions: [
      {
        kind: "choice",
        prompt: "In each term $\\binom{n}{k} a^{\\,n-k} b^{\\,k}$, the powers of $a$ and $b$ add up to:",
        options: ["$n$", "$k$", "$n + 1$", "$2n$"],
        answer: 0,
        hint: "Add the two exponents: $(n - k) + k$.",
        success: "Right: $(n - k) + k = n$ in every term.",
      },
      {
        kind: "choice",
        prompt: "The coefficients of $(a+b)^5$ come from which row of Pascal's triangle?",
        options: ["Row 5", "Row 4", "Row 6", "Row 1"],
        answer: 0,
        hint: "The exponent $n$ names the row (rows counted from $0$).",
        success: "Yes: $(a+b)^n$ uses row $n$, so $(a+b)^5$ uses row $5$.",
      },
    ],
  },
  {
    id: "expand3",
    title: "Expanding (x + 1) cubed",
    mode: "expand3",
    hideSliders: true,
    baseReveal: { rows: true },
    beats: [
      {
        text: "Let us expand $(x+1)^3$ completely. First match it to the pattern $(a+b)^n$: here $a = x$, $b = 1$, and $n = 3$. Because $n = 3$, we read the coefficients from row $3$ of the triangle, which is $1, 3, 3, 1$ (highlighted).",
        add: { coeffs: true },
      },
      {
        text: "Now build each term as $\\binom{3}{k}\\, x^{\\,3-k} (1)^{k}$, letting $k$ run $0, 1, 2, 3$. That gives $1\\cdot x^3 + 3\\cdot x^2 (1) + 3\\cdot x (1)^2 + 1\\cdot (1)^3$. The coefficients $1, 3, 3, 1$ are the highlighted row, and the powers of $x$ step down $3, 2, 1, 0$.",
        add: { terms: true },
      },
      {
        text: "Finally simplify. Any power of $1$ is just $1$, so every $(1)^k$ quietly disappears, leaving $(x+1)^3 = x^3 + 3x^2 + 3x + 1$. That is the full expansion: coefficients straight from the triangle, powers straight from the pattern.",
        add: { result: true },
      },
    ],
    practice:
      "Pair each coefficient from row $n$ with $a^{\\,n-k} b^{\\,k}$, then simplify; here $b = 1$ so every power of $1$ drops out.",
    questions: [
      {
        kind: "choice",
        prompt: "Using row $1, 3, 3, 1$, the coefficient of the $x^2$ term in $(x+1)^3$ is:",
        options: ["3", "1", "6", "2"],
        answer: 0,
        hint: "The $x^2$ term is the $k = 1$ term, so its coefficient is $\\binom{3}{1}$.",
        success: "Right: $\\binom{3}{1} = 3$, so the $x^2$ term is $3x^2$.",
      },
      {
        kind: "choice",
        prompt: "$(x+1)^3$ equals:",
        options: [
          "$x^3 + 3x^2 + 3x + 1$",
          "$x^3 + 1$",
          "$x^3 + 3x^2 + 3x$",
          "$3x^3 + 3x^2 + 3x + 3$",
        ],
        answer: 0,
        hint: "Attach the row $1, 3, 3, 1$ to $x^3, x^2, x, 1$.",
        success: "Yes: $(x+1)^3 = x^3 + 3x^2 + 3x + 1$.",
      },
    ],
  },
  {
    id: "term",
    title: "Picking out one term",
    mode: "term",
    hideSliders: true,
    baseReveal: { rows: true },
    beats: [
      {
        text: "Sometimes you only need one specific term and do not want to expand everything. Start with the setup: $(a+b)^4$ uses row $4$, which is $1, 4, 6, 4, 1$ (highlighted).",
        add: { coeffs: true },
      },
      {
        text: "Pairing that row with falling powers of $a$ and rising powers of $b$ gives the full expansion $(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4a b^3 + b^4$. As a check, the exponents in every term add to $4$.",
        add: { formula: true },
      },
      {
        text: "Now find just the $x^2$ term of $(x+2)^4$. Match the pattern: $a = x$ and $b = 2$. We want the power of $x$ to be $2$, and the power of $a$ is $n - k$, so $n - k = 2$ gives $k = 2$. The term is therefore $\\binom{4}{2}\\, x^{2} (2)^{2}$.",
        add: { terms: true },
      },
      {
        text: "Evaluate the pieces one at a time. The coefficient $\\binom{4}{2} = 6$ is the middle entry of row $4$, and $(2)^2 = 4$. Multiply them together with $x^2$: $6 \\cdot 4 \\cdot x^2 = 24x^2$. So the $x^2$ term of $(x+2)^4$ is $24x^2$, found without touching the other four terms.",
        add: { result: true },
      },
    ],
    practice:
      "Choose the coefficient $\\binom{n}{k}$ from the row, then multiply by the matching powers of each part; for $(x+2)^4$ do not forget to raise the $2$ as well.",
    questions: [
      {
        kind: "choice",
        prompt: "The $x^2$ term of $(x+2)^4$ is $\\binom{4}{2}\\, x^2 (2)^2$. Its value is:",
        options: ["$24x^2$", "$6x^2$", "$12x^2$", "$36x^2$"],
        answer: 0,
        hint: "Evaluate $\\binom{4}{2} = 6$ and $(2)^2 = 4$, then multiply.",
        success: "Right: $6 \\cdot 4 \\cdot x^2 = 24x^2$.",
      },
      {
        kind: "choice",
        prompt: "$(a+b)^4$ expands to:",
        options: [
          "$a^4 + 4a^3 b + 6a^2 b^2 + 4a b^3 + b^4$",
          "$a^4 + b^4$",
          "$a^4 + 4a^3 b + 4a b^3 + b^4$",
          "$a^4 + 6a^3 b + 4a^2 b^2 + 6a b^3 + b^4$",
        ],
        answer: 0,
        hint: "Use row $4$: $1, 4, 6, 4, 1$, with the powers of $a$ falling and $b$ rising.",
        success: "Yes: $(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4a b^3 + b^4$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [nParam],
    baseReveal: { rows: true },
    beats: [
      {
        text: "Here is the whole triangle again, with one row highlighted. Right now $n = 2$, so row $2$ is lit: $1, 2, 1$. Those are exactly the coefficients of $(a+b)^2 = a^2 + 2ab + b^2$.",
      },
      {
        text: "As $n$ changes, the highlighted row moves up or down, and its numbers are always the coefficients of $(a+b)^n$. Keep in mind that row $n$ holds $n + 1$ entries, so a higher power gives one more term than the power below it.",
      },
    ],
    practice:
      "Drag $n$ and watch the highlighted row move; read its numbers as the coefficients of $(a+b)^n$, and remember row $n$ has $n + 1$ of them.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $n$ so the highlighted row reads $1, 4, 6, 4, 1$, the coefficients of $(a+b)^4$.",
        hint: "That is row $4$. Count rows from $n = 0$ at the top, so you need $n = 4$.",
        success: "Yes: row $4$ is $1, 4, 6, 4, 1$, the coefficients of $(a+b)^4$.",
        check: (_value, values) => Math.round(values.n ?? 2) === 4,
      },
      {
        kind: "choice",
        prompt: "How many terms are in the expansion of $(a+b)^6$?",
        options: ["7", "6", "8", "12"],
        answer: 0,
        hint: "Row $n$ has $n + 1$ entries, so count $6 + 1$.",
        success: "Right: row $6$ has $6 + 1 = 7$ entries, so there are $7$ terms.",
      },
    ],
  },
];
