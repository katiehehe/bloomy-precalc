import type { ParamSpec, Slide } from "../types";

/**
 * Sigma (summation) notation. sum_{k=m}^{n} a_k adds a_k for k = m..n.
 * Reveal flags are read literally in Stage.tsx:
 *   meaning/parts/constant/shift: bars, expand, total
 *   yourturn: none (bars + total always shown, driven by the n slider)
 */

const nParam: ParamSpec = {
  key: "n",
  label: "upper limit n",
  min: 1,
  max: 7,
  start: 3,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "meaning",
    title: "Sigma means add these up",
    mode: "meaning",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The capital Greek letter sigma, $\\sum$, is shorthand for a sum. The notation $\\sum_{k=1}^{5} k$ reads: add up the values of $k$ as $k$ runs from $1$ to $5$. The little $k = 1$ underneath is where the count starts (the **lower limit**), the $5$ on top is where it stops (the **upper limit**), and the $k$ to the right is the **summand**, the rule that produces each term.",
      },
      {
        text: "So walk $k$ through every whole number from $1$ to $5$ and list what the summand gives. Here the summand is just $k$ itself, so the terms are $1$, then $2$, then $3$, then $4$, then $5$. Each bar on the right is one term, and its height is that term's value.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Now add the terms in order: $1 + 2 + 3 + 4 + 5$. Written out like this, the sigma is just a tidy way to package a plain addition.",
        add: { expand: true },
      },
      {
        text: "The total is $15$. The filling bar underneath tracks that running sum as the terms pile on: by the last term it reaches $15$. That single number, $15$, is the value of $\\sum_{k=1}^{5} k$.",
        add: { total: true },
      },
    ],
    practice:
      "Read a sigma as add up the summand for every integer $k$ from the lower limit to the upper limit, then total the terms.",
    questions: [
      {
        kind: "choice",
        prompt: "In $\\sum_{k=1}^{5} k$, what does the $5$ on top mean?",
        options: [
          "the last value of the index $k$ (the upper limit)",
          "the number of terms, always",
          "the value of the sum",
          "the first value of $k$",
        ],
        answer: 0,
        hint: "It sits where $k$ stops counting.",
        success: "Right: the top number is the upper limit, the last $k$ you plug in.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $\\sum_{k=1}^{5} k$.",
        options: ["15", "10", "25", "5"],
        answer: 0,
        hint: "Add $1 + 2 + 3 + 4 + 5$.",
        success: "Yes: $1 + 2 + 3 + 4 + 5 = 15$.",
      },
    ],
  },
  {
    id: "parts",
    title: "Plug each k into the summand",
    mode: "parts",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "When the summand is a formula, you substitute each $k$ into it. Take $\\sum_{k=1}^{4} (2k + 1)$. The index $k$ runs $1, 2, 3, 4$, and for each one you compute $2k + 1$. The index is only a placeholder: it never appears in the answer, it just tells you what to plug in.",
      },
      {
        text: "Substitute one at a time. $k = 1$ gives $2(1) + 1 = 3$. $k = 2$ gives $2(2) + 1 = 5$. $k = 3$ gives $7$. $k = 4$ gives $9$. Those four values, $3, 5, 7, 9$, are the terms, shown as the four bars.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Line them up as an ordinary sum: $3 + 5 + 7 + 9$. Notice there are exactly $4$ terms, because $k$ took $4$ values. In general the number of terms is upper limit minus lower limit plus one, here $4 - 1 + 1 = 4$.",
        add: { expand: true },
      },
      {
        text: "Add them: $3 + 5 + 7 + 9 = 24$. So $\\sum_{k=1}^{4} (2k + 1) = 24$. The whole job is: substitute every $k$, then add.",
        add: { total: true },
      },
    ],
    practice:
      "Substitute each integer $k$ from the lower to the upper limit into the summand, then add. The number of terms is (upper $-$ lower $+ 1$).",
    questions: [
      {
        kind: "choice",
        prompt: "How many terms are in $\\sum_{k=1}^{4} (2k + 1)$?",
        options: ["4", "3", "5", "9"],
        answer: 0,
        hint: "Count the values $k$ takes: upper $-$ lower $+ 1$.",
        success: "Right: $4 - 1 + 1 = 4$ terms.",
      },
      {
        kind: "choice",
        prompt: "Which is the second term (at $k = 2$) of $\\sum_{k=1}^{4} (2k + 1)$?",
        options: ["5", "3", "4", "7"],
        answer: 0,
        hint: "Plug $k = 2$ into $2k + 1$.",
        success: "Yes: $2(2) + 1 = 5$.",
      },
    ],
  },
  {
    id: "constant",
    title: "A constant summand",
    mode: "constant",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "What if the summand has no $k$ in it at all? Then every term is the same. Look at $\\sum_{k=1}^{4} 3$: whatever $k$ is, the term is just $3$. So the four bars all have the same height, $3$.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Writing it out, $\\sum_{k=1}^{4} 3 = 3 + 3 + 3 + 3$. Adding the same number four times is just multiplication: $4 \\times 3$.",
        add: { expand: true },
      },
      {
        text: "That gives $12$. This is a rule worth memorizing: $\\sum_{k=1}^{n} c = n\\,c$, a constant summed $n$ times is $n$ times the constant. A common slip is to answer just $c$, forgetting that it is added once for each term.",
        add: { total: true },
      },
    ],
    practice: "A constant summand gives equal terms: $\\sum_{k=1}^{n} c = n\\,c$ (the constant added once per term).",
    questions: [
      {
        kind: "choice",
        prompt: "Evaluate $\\sum_{k=1}^{4} 3$.",
        options: ["12", "3", "7", "4"],
        answer: 0,
        hint: "The summand is constant: $n\\,c = 4 \\cdot 3$.",
        success: "Right: $4 \\cdot 3 = 12$.",
      },
      {
        kind: "choice",
        prompt: "In general, $\\sum_{k=1}^{n} c$ equals:",
        options: ["$n\\,c$", "$c$", "$n + c$", "$c^{\\,n}$"],
        answer: 0,
        hint: "The constant $c$ is added once for each of the $n$ terms.",
        success: "Yes: a constant summed $n$ times is $n\\,c$.",
      },
    ],
  },
  {
    id: "shift",
    title: "The index can start anywhere",
    mode: "shift",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The lower limit does not have to be $1$. Consider $\\sum_{k=0}^{3} 2^{k}$, where the index starts at $0$. The summand $2^{k}$ is doubling, so the terms grow fast. Because $k$ runs $0, 1, 2, 3$, there are $3 - 0 + 1 = 4$ terms, not $3$.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Substitute: $2^{0} = 1$, $2^{1} = 2$, $2^{2} = 4$, $2^{3} = 8$. So the sum is $1 + 2 + 4 + 8$, the four bars doubling left to right.",
        add: { expand: true },
      },
      {
        text: "Add them up: $1 + 2 + 4 + 8 = 15$. Two lessons in one here: always count terms as upper minus lower plus one, and watch that a starting value of $0$ still counts as a term.",
        add: { total: true },
      },
    ],
    practice:
      "The lower limit can be any integer. Count terms as (upper $-$ lower $+ 1$); a start of $0$ is still a term.",
    questions: [
      {
        kind: "choice",
        prompt: "How many terms are in $\\sum_{k=0}^{3} 2^{k}$?",
        options: ["4", "3", "5", "8"],
        answer: 0,
        hint: "$k$ runs $0, 1, 2, 3$: upper $-$ lower $+ 1$.",
        success: "Right: $3 - 0 + 1 = 4$ terms.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $\\sum_{k=0}^{3} 2^{k}$.",
        options: ["15", "14", "16", "8"],
        answer: 0,
        hint: "Add $1 + 2 + 4 + 8$ (the term at $k=0$ is $2^0 = 1$).",
        success: "Yes: $1 + 2 + 4 + 8 = 15$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [nParam],
    baseReveal: {},
    beats: [
      {
        text: "Here is the running sum $\\sum_{k=1}^{n} k$, the same triangular-number pattern from the first slide, but now the upper limit $n$ is yours to set. Right now $n = 3$, so the sum is $1 + 2 + 3 = 6$, and the filling bar sits well short of the dashed target line at $15$.",
      },
      {
        text: "As $n$ grows, one more bar joins the row and the running total climbs. There is even a closed formula for this particular sum: $\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$. For example $n = 4$ gives $\\dfrac{4 \\cdot 5}{2} = 10$, and $n = 5$ gives $\\dfrac{5 \\cdot 6}{2} = 15$.",
      },
    ],
    practice:
      "Drag $n$ and watch a bar appear and the running total rise. Use $\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$ to hit the target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the upper limit $n$ so that $\\sum_{k=1}^{n} k = 15$ (reach the dashed line).",
        hint: "Try $\\dfrac{n(n+1)}{2} = 15$. Since $\\dfrac{5 \\cdot 6}{2} = 15$, use $n = 5$.",
        success: "Yes: $\\sum_{k=1}^{5} k = \\dfrac{5 \\cdot 6}{2} = 15$.",
        check: (_value, values) => Math.round(values.n ?? 3) === 5,
      },
      {
        kind: "choice",
        prompt: "Using $\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$, what is $\\sum_{k=1}^{6} k$?",
        options: ["21", "15", "36", "42"],
        answer: 0,
        hint: "Compute $\\dfrac{6 \\cdot 7}{2}$.",
        success: "Right: $\\dfrac{6 \\cdot 7}{2} = 21$.",
      },
    ],
  },
];
