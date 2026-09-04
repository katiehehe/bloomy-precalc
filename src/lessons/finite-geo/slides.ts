import type { ParamSpec, Slide } from "../types";

/**
 * Finite geometric series. A geometric sequence multiplies by a fixed common
 * ratio r, so a_n = a_1 r^(n-1); the finite sum has the closed form
 * S_n = a_1 (1 - r^n) / (1 - r) for r != 1.
 *
 * Reveal flags are read literally in Stage.tsx:
 *   sequence: bars, ratio, formula
 *   derive:   e1, e2, e3, e4 (AlgebraFlow steps; first line always shown)
 *   apply:    bars, plug, simplify, total
 *   shrink:   bars, plug, simplify, total
 *   yourturn: none (bars + total always shown, driven by the n slider)
 */

const nParam: ParamSpec = {
  key: "n",
  label: "number of terms n",
  min: 1,
  max: 6,
  start: 3,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "sequence",
    title: "What is a geometric sequence?",
    mode: "sequence",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **geometric sequence** is a list in which each term comes from the one before it by **multiplying** by a fixed **common ratio** $r$.",
      },
      {
        text: "Take the sequence $2, 6, 18, 54$ and divide each term by the one before it: $\\dfrac{6}{2} = 3$, $\\dfrac{18}{6} = 3$, and $\\dfrac{54}{18} = 3$. The quotient is the same every time, so the sequence is geometric with common ratio $r = 3$, and each bar on the right stands three times as tall as the one before it.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Be careful that $r$ is a **ratio** from division, not a **difference** from subtraction. Subtracting instead would give $6 - 2 = 4$, which is both wrong and not even constant, since $18 - 6 = 12$. Always **divide** consecutive terms to find $r$, because a constant quotient is what makes a sequence geometric.",
        add: { ratio: true },
      },
      {
        text: "Because every step multiplies by $r$, the $n$-th term is $a_1$ multiplied by $r$ a total of $n - 1$ times: $$a_n = a_1\\, r^{\\,n-1}$$ The exponent is $n - 1$ rather than $n$ because $a_1$ has been multiplied zero times. For the fourth term, $a_4 = 2 \\cdot 3^{\\,4-1} = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$, exactly the last bar.",
        add: { formula: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is the common ratio $r$ of $2, 6, 18, 54$?",
        options: ["$3$", "$4$", "$6$", "$\\tfrac{1}{3}$"],
        answer: 0,
        hint: "Divide a term by the one before it: $\\tfrac{6}{2}$.",
        success: "Right: $\\tfrac{6}{2} = \\tfrac{18}{6} = 3$, a constant ratio.",
      },
      {
        kind: "choice",
        prompt: "Using $a_n = a_1\\, r^{\\,n-1}$ with $a_1 = 2$ and $r = 3$, what is $a_4$?",
        options: ["$54$", "$162$", "$24$", "$18$"],
        answer: 0,
        hint: "The exponent is $n - 1 = 3$: compute $2 \\cdot 3^3$.",
        success: "Yes: $2 \\cdot 3^{3} = 2 \\cdot 27 = 54$.",
      },
    ],
  },
  {
    id: "derive",
    title: "Shift-and-subtract finds the sum",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Call the sum $S_n = a_1 + a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1}$, then **multiply it by $r$** to shift every term up one power and **subtract**.",
      },
      {
        text: "Start by multiplying every term of $S_n$ by $r$, which raises each power by one, so $r S_n = a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1} + a_1 r^{\\,n}$. This new list matches $S_n$ except that it drops the first term $a_1$ and adds a last term $a_1 r^{\\,n}$.",
        add: { e1: true },
      },
      {
        text: "Now **subtract** $r S_n$ from $S_n$, lining up equal powers. Every middle term from $a_1 r$ to $a_1 r^{\\,n-1}$ appears in both sums and cancels, so only the first term of $S_n$ and the last term of $r S_n$ survive: $S_n - r S_n = a_1 - a_1 r^{\\,n}$.",
        add: { e2: true },
      },
      {
        text: "The left side has $S_n$ in both pieces, so factor it out as $S_n(1 - r)$. The right side has $a_1$ in both pieces, so factor it out as $a_1(1 - r^{\\,n})$. That gives $S_n(1 - r) = a_1(1 - r^{\\,n})$, one equation in the unknown $S_n$.",
        add: { e3: true },
      },
      {
        text: "Finally, divide both sides by $(1 - r)$ to isolate $S_n$: $$S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$$ This formula needs $r \\neq 1$ because we divided by $1 - r$ (if $r = 1$ every term equals $a_1$ and the sum is $n\\,a_1$). Make sure the exponent is $r^{\\,n}$, the term count, not $r^{\\,n-1}$.",
        add: { e4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "After multiplying by $r$ and subtracting, what does $S_n - r S_n$ equal?",
        options: [
          "$a_1 - a_1 r^{\\,n}$",
          "$a_1 - a_1 r^{\\,n-1}$",
          "$a_1 r - a_1 r^{\\,n}$",
          "$0$",
        ],
        answer: 0,
        hint: "Only the first term of $S_n$ and the last term of $r S_n$ survive.",
        success: "Right: the middle cancels, leaving $a_1 - a_1 r^{\\,n}$.",
      },
      {
        kind: "choice",
        prompt: "Solving $S_n(1 - r) = a_1(1 - r^{\\,n})$ for $S_n$ gives:",
        options: [
          "$\\dfrac{a_1(1 - r^{\\,n})}{1 - r}$",
          "$\\dfrac{a_1(1 - r)}{1 - r^{\\,n}}$",
          "$\\dfrac{a_1(1 - r^{\\,n-1})}{1 - r}$",
          "$a_1(1 - r^{\\,n})(1 - r)$",
        ],
        answer: 0,
        hint: "Divide both sides by $(1 - r)$. This needs $r \\neq 1$.",
        success: "Yes: $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$, valid for $r \\neq 1$.",
      },
    ],
  },
  {
    id: "apply",
    title: "How to sum $2 + 6 + 18 + 54$",
    mode: "apply",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Add $2 + 6 + 18 + 54$ with the formula instead of by hand. First read off the three values the formula needs: the first term $a_1 = 2$, the common ratio $r = 3$ because each term triples, and the number of terms $n = 4$ from the four bars.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Substitute those into $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$. With $a_1 = 2$, $r = 3$, and $n = 4$ this becomes $S_4 = \\dfrac{2\\,(1 - 3^{4})}{1 - 3}$. The exponent is $n = 4$, the number of terms, so it is $3^4$.",
        add: { plug: true },
      },
      {
        text: "Simplify carefully: on top, $3^4 = 81$, so $1 - 81 = -80$ and the numerator is $2(-80) = -160$. On the bottom $1 - 3 = -2$, so $S_4 = \\dfrac{-160}{-2}$. Dividing a negative by a negative gives a **positive** result, exactly what a sum of positive terms should be.",
        add: { simplify: true },
      },
      {
        text: "That leaves $S_4 = \\dfrac{-160}{-2} = 80$, and the running-total bar fills right up to $80$. Adding the terms directly gives the same total: $2 + 6 = 8$, then $8 + 18 = 26$, and finally $26 + 54 = 80$.",
        add: { total: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Evaluate $S_4 = \\dfrac{2\\,(1 - 3^{4})}{1 - 3}$ for $2 + 6 + 18 + 54$.",
        options: ["$80$", "$-80$", "$112$", "$162$"],
        answer: 0,
        hint: "Top: $2(1 - 81) = -160$. Bottom: $1 - 3 = -2$. Divide.",
        success: "Right: $\\dfrac{-160}{-2} = 80$, matching $2 + 6 + 18 + 54$.",
      },
      {
        kind: "choice",
        prompt: "Which values of $a_1$, $r$, and $n$ belong in the formula for $2 + 6 + 18 + 54$?",
        options: [
          "$a_1 = 2,\\ r = 3,\\ n = 4$",
          "$a_1 = 2,\\ r = 4,\\ n = 4$",
          "$a_1 = 2,\\ r = 3,\\ n = 3$",
          "$a_1 = 6,\\ r = 3,\\ n = 4$",
        ],
        answer: 0,
        hint: "First term, ratio (divide, do not subtract), and count the terms.",
        success: "Yes: first term $2$, ratio $\\tfrac{6}{2} = 3$, and $4$ terms.",
      },
    ],
  },
  {
    id: "shrink",
    title: "What happens when the common ratio is a fraction?",
    mode: "shrink",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The common ratio does not have to be a whole number. Take $1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8}$: each term is **half** the one before, so $a_1 = 1$ and $r = \\tfrac{1}{2}$. Because $r$ is between $0$ and $1$, multiplying shrinks each term, and the bars get shorter left to right instead of taller.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "The formula is the same one. With $a_1 = 1$, $r = \\tfrac{1}{2}$, and $n = 4$ terms, $S_4 = \\dfrac{1\\left(1 - \\left(\\tfrac{1}{2}\\right)^{4}\\right)}{1 - \\tfrac{1}{2}}$. Again the exponent is $n = 4$, so we need $\\left(\\tfrac{1}{2}\\right)^4$.",
        add: { plug: true },
      },
      {
        text: "Simplify the pieces. On top, $\\left(\\tfrac{1}{2}\\right)^4 = \\tfrac{1}{16}$, so $1 - \\tfrac{1}{16} = \\tfrac{15}{16}$, and on the bottom $1 - \\tfrac{1}{2} = \\tfrac{1}{2}$. Dividing by $\\tfrac{1}{2}$ is the same as multiplying by $2$, so $S_4 = \\tfrac{15}{16} \\cdot 2 = \\tfrac{15}{8}$, and because $r < 1$ both $1 - r^{\\,n}$ and $1 - r$ stay positive.",
        add: { simplify: true },
      },
      {
        text: "So $S_4 = \\tfrac{15}{8} = 1.875$. Checking by hand, $1 + 0.5 + 0.25 + 0.125 = 1.875$. Because the bars keep shrinking, each new term adds only a little, yet the same finite formula still gives the exact sum.",
        add: { total: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is the common ratio of $1, \\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}$?",
        options: ["$\\tfrac{1}{2}$", "$2$", "$-\\tfrac{1}{2}$", "$\\tfrac{1}{4}$"],
        answer: 0,
        hint: "Divide a term by the one before it: $\\tfrac{1/2}{1}$.",
        success: "Right: each term is half the last, so $r = \\tfrac{1}{2}$.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8}$ with the formula.",
        options: ["$\\tfrac{15}{8}$", "$2$", "$\\tfrac{16}{15}$", "$\\tfrac{7}{8}$"],
        answer: 0,
        hint: "$\\dfrac{1 - (1/2)^4}{1 - 1/2} = \\dfrac{15/16}{1/2}$.",
        success: "Yes: $\\tfrac{15}{16} \\cdot 2 = \\tfrac{15}{8} = 1.875$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: find a geometric sum",
    mode: "yourturn",
    params: [nParam],
    baseReveal: {},
    beats: [
      {
        text: "Here $a_1 = 1$ and $r = 2$, so the terms **double**: $1, 2, 4, 8, 16, \\ldots$. Putting those into the formula gives $$\\begin{aligned} S_n &= \\dfrac{1(1 - 2^{\\,n})}{1 - 2} = \\dfrac{1 - 2^{\\,n}}{-1} \\\\ &= 2^{\\,n} - 1 \\end{aligned}$$ At $n = 3$ the sum is $S_3 = 2^3 - 1 = 7$, well short of $31$.",
      },
      {
        text: "Each time $n$ goes up by one, another doubling term joins the sum and the total climbs. From the formula $S_n = 2^{\\,n} - 1$, $n = 4$ gives $2^4 - 1 = 15$ and $n = 5$ gives $2^5 - 1 = 31$.",
      },
    ],
    practice: "Drag $n$ until $1 + 2 + 4 + \\cdots = 31$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $n$ so that $1 + 2 + 4 + \\cdots = 31$ (reach the dashed line).",
        hint: "Solve $2^{\\,n} - 1 = 31$, so $2^{\\,n} = 32$. Since $2^5 = 32$, use $n = 5$.",
        success: "Yes: $1 + 2 + 4 + 8 + 16 = 31 = 2^5 - 1$.",
        check: (_value, values) => Math.round(values.n ?? 3) === 5,
      },
      {
        kind: "choice",
        prompt: "Using $S_n = 2^{\\,n} - 1$, what is the sum for $n = 6$?",
        options: ["$63$", "$31$", "$64$", "$36$"],
        answer: 0,
        hint: "Compute $2^{6} - 1$.",
        success: "Right: $2^{6} - 1 = 64 - 1 = 63$.",
      },
    ],
  },
];
