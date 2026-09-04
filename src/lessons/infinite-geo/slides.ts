import type { ParamSpec, Slide } from "../types";

/**
 * Infinite geometric series and convergence. A series a_1 + a_1 r + a_1 r^2 + ...
 * converges iff |r| < 1, and then S = a_1 / (1 - r). Reveal flags are read
 * literally in Stage.tsx:
 *   partials/worked/diverge: bars, then t1..t5 step the running total (partial
 *     sums) one term at a time.
 *   condition: bars, grow (swap to the exploding r = 2 case), cond (the rule).
 *   yourturn: none (bars and the S line always show, driven by the r slider).
 */

const rParam: ParamSpec = {
  key: "r",
  label: "ratio r",
  min: 1,
  max: 9,
  start: 2,
  step: 1,
  // Slider value v in [1, 9] stands for r = v / 10, so r runs 0.1 to 0.9.
  format: (v) => `r = ${(Math.round(v) / 10).toFixed(1)}`,
};

export const slides: Slide[] = [
  {
    id: "partials",
    title: "An infinite sum can equal $1$",
    mode: "partials",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A finite geometric series stops after $n$ terms. Letting $n$ grow without bound produces an **infinite geometric series**. Start with $\\tfrac{1}{2}$, add half of it to get $\\tfrac{1}{4}$, then halve again for $\\tfrac{1}{8}$, and never stop: here $a_1 = \\tfrac{1}{2}$ and $r = \\tfrac{1}{2}$.",
      },
      {
        text: "Each bar is one term. The heights fall off fast: every bar is exactly half the height of the bar to its left, so the terms shrink toward zero. Because the added pieces become arbitrarily small, the endless sum can still total a finite number.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Now track the **partial sum**, the running total after only the first few terms. After one term it is $S_1 = \\tfrac{1}{2}$, and the dashed line marks $1$, the value the running total seems to be heading for.",
        add: { t1: true },
      },
      {
        text: "Add the next term: $S_2 = \\tfrac{1}{2} + \\tfrac{1}{4} = \\tfrac{3}{4}$. The total jumps toward the dashed line, closing half of the gap that was left below it.",
        add: { t2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt:
          "As you keep adding terms of $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots$, what do the partial sums $\\tfrac{1}{2}, \\tfrac{3}{4}, \\tfrac{7}{8}, \\tfrac{15}{16}, \\ldots$ do?",
        options: [
          "Climb toward $1$ and get arbitrarily close, but never exceed it",
          "Grow larger and larger without bound",
          "Stay stuck at $\\tfrac{1}{2}$",
          "Bounce above and below $1$ forever",
        ],
        answer: 0,
        hint: "Each step closes half the remaining gap up to the dashed line.",
        success: "Right: they converge to $1$, approaching it without ever passing it.",
      },
    ],
  },
  {
    id: "partials-2",
    title: "Partial sums close in on a limit",
    mode: "partials",
    hideSliders: true,
    baseReveal: { bars: true, t1: true, t2: true },
    beats: [
      {
        text: "One more: $S_3 = \\tfrac{3}{4} + \\tfrac{1}{8} = \\tfrac{7}{8}$. Again it covers half of the remaining distance up to $1$. Each step erases half of whatever gap is left.",
        add: { t3: true },
      },
      {
        text: "Next, $S_4 = \\tfrac{7}{8} + \\tfrac{1}{16} = \\tfrac{15}{16}$. The gap down to $1$ is now just $\\tfrac{1}{16}$. The total approaches $1$ but has not reached it.",
        add: { t4: true },
      },
      {
        text: "And $S_5 = \\tfrac{31}{32}$, only $\\tfrac{1}{32}$ short of $1$. No matter how many terms we add, the partial sums stay below $1$ yet come as close to it as we could ever want. That value they approach is called the **limit**, and it is the sum of the infinite series, so we say the series **converges** to $1$.",
        add: { t5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is the sum of the infinite series $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots$?",
        options: ["$1$", "$2$", "$\\tfrac{1}{2}$", "There is no finite sum"],
        answer: 0,
        hint: "The partial sums approach the dashed line.",
        success: "Yes: the limit of the partial sums is $1$, so the sum is $1$.",
      },
    ],
  },
  {
    id: "condition",
    title: "When does an infinite geometric series converge?",
    mode: "condition",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "When does an endless sum settle on a finite value? The answer depends only on the common ratio $r$, the number each term is multiplied by to make the next.",
      },
      {
        text: "Take $r = \\tfrac{1}{2}$, where each term is smaller than the last, so the bars shrink toward zero. Because the pieces you keep adding become tiny, the running total has room to settle, and a series like this **converges**.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Now consider a bigger ratio, $r = 2$. Each term is double the last, so the bars grow upward instead of shrinking, and the pieces you keep adding only get bigger. The total then grows without bound, and a series like this **diverges**.",
        add: { grow: true },
      },
      {
        text: "An infinite geometric series **converges** exactly when $|r| < 1$, meaning the terms shrink toward zero. Its sum is then $$S = \\dfrac{a_1}{1 - r}$$ but when $|r| \\ge 1$ the series **diverges** and has no finite sum, so the formula does not apply.",
        add: { cond: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "An infinite geometric series converges (has a finite sum) exactly when:",
        options: ["$|r| < 1$", "$|r| > 1$", "$r < 1$", "$a_1 < 1$"],
        answer: 0,
        hint: "The terms must shrink toward zero, whether $r$ is positive or negative.",
        success: "Right: $|r| < 1$ makes the terms shrink, so the total can settle.",
      },
      {
        kind: "choice",
        prompt: "Which common ratio gives a convergent infinite geometric series?",
        options: ["$r = \\tfrac{1}{2}$", "$r = 2$", "$r = 1$", "$r = -3$"],
        answer: 0,
        hint: "You need $|r| < 1$.",
        success: "Yes: $\\left|\\tfrac{1}{2}\\right| < 1$, so it converges.",
      },
    ],
  },
  {
    id: "worked",
    title: "How to sum $3 + 1 + \\tfrac{1}{3} + \\cdots$",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "We now find an actual sum, taking $3 + 1 + \\tfrac{1}{3} + \\tfrac{1}{9} + \\cdots$ with first term $a_1 = 3$. Dividing any term by the one before it gives the ratio $\\tfrac{1}{3}$, so $r = \\tfrac{1}{3}$. Since $\\left|\\tfrac{1}{3}\\right| < 1$, the series converges and a finite sum exists.",
      },
      {
        text: "The bars shrink by a third each step. They fall off quickly, so the partial sums will settle on a limit.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "First partial sum: $S_1 = 3$. The dashed line marks $4.5$, the value we will confirm the running total approaches.",
        add: { t1: true },
      },
      {
        text: "Add the next term: $S_2 = 3 + 1 = 4$.",
        add: { t2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $3 + 1 + \\tfrac{1}{3} + \\tfrac{1}{9} + \\cdots$, what are $a_1$ and $r$?",
        options: [
          "$a_1 = 3,\\ r = \\tfrac{1}{3}$",
          "$a_1 = 1,\\ r = \\tfrac{1}{3}$",
          "$a_1 = 3,\\ r = 3$",
          "$a_1 = \\tfrac{1}{3},\\ r = 3$",
        ],
        answer: 0,
        hint: "$a_1$ is the first term. $r$ is any term divided by the previous one.",
        success: "Right: $a_1 = 3$ and $r = \\tfrac{1}{3}$.",
      },
    ],
  },
  {
    id: "worked-2",
    title: "How to evaluate an infinite geometric sum",
    mode: "worked",
    hideSliders: true,
    baseReveal: { bars: true, t1: true, t2: true },
    beats: [
      {
        text: "Then $S_3 = 4 + \\tfrac{1}{3} \\approx 4.333$.",
        add: { t3: true },
      },
      {
        text: "Then $S_4 = 4.333 + \\tfrac{1}{9} \\approx 4.444$. The total approaches the dashed line.",
        add: { t4: true },
      },
      {
        text: "One more, $S_5 \\approx 4.481$. The exact sum is $$\\begin{aligned} S &= \\dfrac{a_1}{1 - r} = \\dfrac{3}{1 - \\tfrac{1}{3}} \\\\ &= \\dfrac{3}{\\,2/3\\,} = \\dfrac{9}{2} = 4.5 \\end{aligned}$$ The partial sums approach $4.5$, matching the formula.",
        add: { t5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Using $S = \\dfrac{a_1}{1 - r}$ with $a_1 = 3$ and $r = \\tfrac{1}{3}$, the sum is:",
        options: ["$\\tfrac{9}{2}$", "$3$", "$\\tfrac{9}{4}$", "It diverges"],
        answer: 0,
        hint: "Compute $\\dfrac{3}{1 - \\tfrac{1}{3}} = \\dfrac{3}{\\,2/3\\,}$.",
        success: "Yes: $\\dfrac{3}{\\,2/3\\,} = \\dfrac{9}{2} = 4.5$.",
      },
    ],
  },
  {
    id: "diverge",
    title: "When the series has no finite sum",
    mode: "diverge",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Not every infinite series adds up. Consider what goes wrong when the terms do not shrink: take $1 + 1 + 1 + 1 + \\cdots$, a geometric series with $a_1 = 1$ and ratio $r = 1$.",
      },
      {
        text: "Every term is the same size, so the bars are all equal and nothing shrinks toward zero. If the pieces you keep adding never shrink, the total cannot settle.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "The first partial sum is $S_1 = 1$.",
        add: { t1: true },
      },
      {
        text: "$S_2 = 1 + 1 = 2$.",
        add: { t2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Does $1 + 1 + 1 + 1 + \\cdots$ (with $r = 1$) converge?",
        options: [
          "No: the partial sums $1, 2, 3, 4, \\ldots$ grow without bound, so there is no sum",
          "Yes: the sum is $1$",
          "Yes: the sum is $\\dfrac{1}{1 - 1}$",
          "Yes: the sum is $0$",
        ],
        answer: 0,
        hint: "Do the terms shrink toward zero? Do the partial sums settle?",
        success: "Right: with $r = 1$ the terms never shrink, so the series diverges.",
      },
    ],
  },
  {
    id: "diverge-2",
    title: "Why the series diverges when the terms do not shrink",
    mode: "diverge",
    hideSliders: true,
    baseReveal: { bars: true, t1: true, t2: true },
    beats: [
      {
        text: "$S_3 = 3$.",
        add: { t3: true },
      },
      {
        text: "$S_4 = 4$. The total is not approaching any finite height. It keeps climbing, so there is no dashed limit to draw.",
        add: { t4: true },
      },
      {
        text: "$S_5 = 5$, and the partial sums grow without bound, so this series **diverges** and has no finite sum. The formula does not apply either, because $\\dfrac{a_1}{1 - r} = \\dfrac{1}{1 - 1} = \\dfrac{1}{0}$ is undefined. Only use $\\dfrac{a_1}{1 - r}$ after you have checked that $|r| < 1$.",
        add: { t5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Why can we not use $S = \\dfrac{a_1}{1 - r}$ for this series?",
        options: [
          "Because $|r| \\ge 1$, so the series diverges (and $1 - r = 0$ makes the formula undefined)",
          "Because $a_1$ is too small",
          "Because there are infinitely many terms",
          "We can: the sum is $0$",
        ],
        answer: 0,
        hint: "The formula only applies when $|r| < 1$.",
        success: "Right: the formula needs $|r| < 1$. Here $r = 1$ fails it and $1 - r = 0$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: determine whether a series converges",
    mode: "yourturn",
    params: [rParam],
    baseReveal: {},
    beats: [
      {
        text: "Here the first term is fixed at $a_1 = 1$, and the ratio $r$ can vary. The bars show the terms $1,\\ r,\\ r^2,\\ r^3,\\ r^4$, and the dashed line marks the sum $S = \\dfrac{1}{1 - r}$. With $r = 0.2$, $S = \\dfrac{1}{1 - 0.2} = \\dfrac{1}{0.8} = 1.25$, so the dashed line is low.",
      },
      {
        text: "As the ratio climbs toward $1$, each term shrinks more slowly, so the series takes longer to settle and its sum $S = \\dfrac{1}{1 - r}$ grows. For instance $r = 0.5$ gives $S = \\dfrac{1}{0.5} = 2$, and $r = 0.8$ gives $S = \\dfrac{1}{0.2} = 5$.",
      },
    ],
    practice: "Drag $r$ until $S = \\dfrac{1}{1 - r}$ equals $2$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the ratio so the infinite sum equals $2$. Use $S = \\dfrac{1}{1 - r}$.",
        hint: "Solve $\\dfrac{1}{1 - r} = 2$: then $1 - r = \\tfrac{1}{2}$, so $r = 0.5$. Set the slider to $r = 0.5$.",
        success: "Yes: at $r = 0.5$, $S = \\dfrac{1}{1 - 0.5} = 2$.",
        check: (_value, values) => Math.round(values.r ?? 2) === 5,
      },
      {
        kind: "choice",
        prompt: "With $a_1 = 1$ and $r = 0.8$, what is $S = \\dfrac{1}{1 - r}$?",
        options: ["$5$", "$1.8$", "$0.2$", "There is no finite sum"],
        answer: 0,
        hint: "Compute $\\dfrac{1}{1 - 0.8} = \\dfrac{1}{0.2}$.",
        success: "Yes: $\\dfrac{1}{0.2} = 5$.",
      },
    ],
  },
];
