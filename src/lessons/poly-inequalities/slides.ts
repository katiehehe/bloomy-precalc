import type { ParamSpec, Slide } from "../types";

const tracer = (start = 0): ParamSpec => ({
  key: "x",
  label: "Tracer x",
  min: -500,
  max: 500,
  start,
  step: 10,
  format: (v) => `x = ${(v / 100).toFixed(2)}`,
});

const p = (x: number) => (x + 2) * (x - 1) * (x - 3);

export const slides: Slide[] = [
  {
    id: "boundaries",
    title: "Where the sign can change",
    mode: "poly",
    params: [tracer(200)],
    baseReveal: {},
    beats: [
      {
        text: "Here is $p(x)=(x+2)(x-1)(x-3)$. The goal is to find every $x$ where it is **positive**.",
        add: { curve: true, readout: true },
      },
      {
        text: "**The method for any polynomial inequality has three steps:** find the real zeros (the critical points), test the sign on each interval between them, then keep the intervals whose sign you want.",
      },
      {
        text: "Step one, the **critical points**. A polynomial is smooth, so it can only switch sign where it passes through zero: at $x=-2$, $x=1$, and $x=3$.",
        add: { criticals: true },
      },
      {
        text: "Between two neighboring critical points the value never reaches zero, so each interval is either all positive or all negative.",
      },
    ],
    practice: "Drag the tracer along $x$. The sign of $p(x)$ only flips as you cross a boundary.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tracer into a stretch where $p(x)$ is positive.",
        hint: "Try between $-2$ and $1$, or to the right of $3$.",
        success: "Yes: $p(x)>0$ on $(-2,1)$ and again past $x=3$.",
        check: (value) => p(value / 100) > 0,
      },
      {
        kind: "choice",
        prompt: "Between $x=1$ and $x=3$, the sign of $p(x)$ is:",
        options: ["Positive", "Negative", "It changes partway through"],
        answer: 1,
        hint: "Pick a test point like $x=2$ and check the three factors.",
        success: "Right: at $x=2$, $(4)(1)(-1)=-4$, so $p<0$ across the whole interval.",
      },
    ],
  },
  {
    id: "sign-chart",
    title: "Test each interval",
    mode: "poly",
    params: [tracer(-300)],
    baseReveal: { curve: true, criticals: true, readout: true },
    beats: [
      {
        text: "Step two, **test each interval**. The critical points $-2$, $1$, and $3$ cut the line into four regions. Test one point in each.",
        add: { signs: true },
      },
      {
        text: "Left of $-2$, test $x=-3$: all three factors $(x+2)$, $(x-1)$, $(x-3)$ are negative, so $(-)(-)(-)=-$ and $p<0$.",
        to: { x: -300 },
        ms: 1200,
      },
      {
        text: "Between $-2$ and $1$, test $x=0$: only $(x+2)$ turns positive, the other two stay negative, so $(+)(-)(-)=+$ and $p>0$.",
        to: { x: 0 },
        ms: 1800,
      },
      {
        text: "Between $1$ and $3$, test $x=2$: now $(x+2)$ and $(x-1)$ are positive but $(x-3)$ is negative, so $(+)(+)(-)=-$ and $p<0$.",
        to: { x: 200 },
        ms: 1800,
      },
      {
        text: "Right of $3$, test $x=4$: all three factors are positive, so $p>0$. **Make sure to test strictly inside each interval**. The pattern $-,+,-,+$ flips at every critical point.",
        to: { x: 400 },
        ms: 1800,
      },
    ],
    practice: "Drag the tracer across each boundary and watch the sign match the strip.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tracer to a spot where $p(x)<0$.",
        hint: "Left of $-2$, or between $1$ and $3$.",
        success: "Correct: those are the intervals the strip marks negative.",
        check: (value) => p(value / 100) < 0,
      },
      {
        kind: "choice",
        prompt: "The sign pattern of $p(x)$ from left to right is:",
        options: ["$-,\\;+,\\;-,\\;+$", "$+,\\;-,\\;+,\\;-$", "$-,\\;-,\\;+,\\;+$"],
        answer: 0,
        hint: "Start far left, where a cubic with positive lead is negative.",
        success: "That alternating strip is the whole answer to any sign question about $p$.",
      },
    ],
  },
  {
    id: "solution",
    title: "Write the solution",
    mode: "poly",
    params: [tracer(0)],
    baseReveal: { curve: true, criticals: true, signs: true, readout: true },
    beats: [
      {
        text: "Step three, **write the solution**. To solve $p(x)>0$, keep only the intervals the strip marks positive.",
        add: { solution: true },
      },
      {
        text: "That is $(-2,1)\\cup(3,\\infty)$. The critical points are **open** circles, because $>$ is strict and $p=0$ is not greater than zero.",
      },
      {
        text: "**Make sure the endpoints match the inequality:** strict $>$ or $<$ leaves them open, while $\\ge$ or $\\le$ fills them in. For $p(x)\\ge 0$ the same intervals apply, now with the zeros included.",
      },
    ],
    practice: "Drag the tracer inside the shaded set to confirm $p(x)>0$ there.",
    questions: [
      {
        kind: "choice",
        prompt: "The solution of $p(x)>0$ is:",
        options: [
          "$(-2,1)\\cup(3,\\infty)$",
          "$(-\\infty,-2)\\cup(1,3)$",
          "$(-2,3)$",
        ],
        answer: 0,
        hint: "Union the intervals labeled positive on the strip.",
        success: "Exactly: the positive intervals, joined with a union.",
      },
      {
        kind: "choice",
        prompt: "Why are $-2$, $1$, and $3$ drawn as open circles here?",
        options: [
          "Because $>$ is strict, so $p=0$ is excluded",
          "Because they are not real numbers",
          "Because $p$ is undefined there",
        ],
        answer: 0,
        hint: "What does $p$ equal exactly at a boundary?",
        success: "Right: at each boundary $p=0$, which fails a strict $>0$.",
      },
    ],
  },
];
