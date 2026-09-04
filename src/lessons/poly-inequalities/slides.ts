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
        text: "Consider the polynomial $$p(x)=(x+2)(x-1)(x-3).$$ The goal is to find every $x$ where it is **positive**.",
        add: { curve: true, readout: true },
      },
      {
        text: "**The method for any polynomial inequality has three steps:**\n1. Find the real zeros (the critical points).\n2. Test the sign on each interval between them.\n3. Keep the intervals whose sign you want.",
      },
      {
        text: "Step one, the **critical points**. A polynomial is smooth, so it can only switch sign where it passes through zero: at $x=-2$, $x=1$, and $x=3$.",
        add: { criticals: true },
      },
      {
        text: "Between two neighboring critical points the value never reaches zero, so each interval is either all positive or all negative.",
      },
    ],
    practice: "Drag the tracer into a region where $p(x)>0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tracer into an interval where $p(x)$ is positive.",
        hint: "Try between $-2$ and $1$, or to the right of $3$.",
        success: "Correct: $p(x)>0$ on $(-2,1)$ and again to the right of $x=3$.",
        check: (value) => p(value / 100) > 0,
      },
      {
        kind: "choice",
        prompt: "Between $x=1$ and $x=3$, the sign of $p(x)$ is:",
        options: ["Positive", "Negative", "It changes partway through"],
        answer: 1,
        hint: "Pick a test point like $x=2$ and check the three factors.",
        success: "Correct: at $x=2$, $(4)(1)(-1)=-4$, so $p<0$ across the whole interval.",
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
        text: "Left of $-2$, test $x=-3$: all three factors $(x+2)$, $(x-1)$, and $(x-3)$ are negative. Then $(-)(-)(-)=-$, so $p<0$.",
        to: { x: -300 },
        ms: 1200,
      },
      {
        text: "Between $-2$ and $1$, test $x=0$: only $(x+2)$ turns positive while the other two stay negative, so $(+)(-)(-)=+$ and $p>0$.",
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
    practice: "Drag the tracer into a region where $p(x)<0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tracer to a spot where $p(x)<0$.",
        hint: "Left of $-2$, or between $1$ and $3$.",
        success: "Correct: those are the intervals the sign chart marks negative.",
        check: (value) => p(value / 100) < 0,
      },
      {
        kind: "choice",
        prompt: "The sign pattern of $p(x)$ from left to right is:",
        options: ["$-,\\;+,\\;-,\\;+$", "$+,\\;-,\\;+,\\;-$", "$-,\\;-,\\;+,\\;+$"],
        answer: 0,
        hint: "Start far left, where a cubic with a positive leading coefficient is negative.",
        success: "That alternating pattern answers every sign question about $p$.",
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
        text: "Step three, **write the solution**. To solve $p(x)>0$, keep only the intervals the sign chart marks positive.",
        add: { solution: true },
      },
      {
        text: "The solution set is $$(-2,1)\\cup(3,\\infty).$$ The critical points are drawn as **open** circles, because $>$ is strict and $p=0$ is not greater than zero.",
      },
      {
        text: "**Make sure the endpoints match the inequality symbol.** Here $>$ is strict, so at each zero $p=0$ fails a strict $p>0$ and all three stay open. Allowing equality with $\\ge$ or $\\le$ instead includes those boundary points, which we take up next.",
      },
    ],
    practice: "",
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
        hint: "Take the union of the intervals labeled positive on the sign chart.",
        success: "Correct: the union of the positive intervals.",
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
        success: "Correct: at each boundary $p=0$, which fails a strict $>0$.",
      },
    ],
  },
  {
    id: "endpoints-open",
    title: "Open endpoints: strict inequalities",
    mode: "poly",
    params: [tracer(0)],
    baseReveal: { curve: true, criticals: true, signs: true, solution: true, readout: true },
    beats: [
      {
        text: "Each critical point sits on the boundary of the solution, so whether it belongs to the answer depends only on the inequality symbol. Everything strictly inside an interval is unaffected.",
      },
      {
        text: "Test a boundary in $p(x)>0$ directly. There $p=0$, and $0$ is not greater than $0$, so every zero **fails** and is excluded. An excluded endpoint is an **open** circle, written with a parenthesis: $$(-2,1)\\cup(3,\\infty).$$",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "At a critical point where $p=0$, the value $0$ satisfies:",
        options: [
          "$p(x)\\ge 0$ but not $p(x)>0$",
          "$p(x)>0$ but not $p(x)\\ge 0$",
          "both $p(x)>0$ and $p(x)\\ge 0$",
          "neither inequality",
        ],
        answer: 0,
        hint: "Is $0$ greater than $0$? Is $0$ greater than or equal to $0$?",
        success: "Correct: $0\\ge 0$ is true but $0>0$ is false, so a zero is included only when equality is allowed.",
      },
    ],
  },
  {
    id: "endpoints-closed",
    title: "Closed endpoints: allowing equality",
    mode: "poly",
    params: [tracer(0)],
    baseReveal: { curve: true, criticals: true, signs: true, solution: true, readout: true },
    beats: [
      {
        text: "Now allow equality with $p(x)\\ge 0$. At each zero $p=0$, and $0\\ge 0$ is true, so every zero now **passes** and is included. The open circles fill in and the parentheses become brackets: $$[-2,1]\\cup[3,\\infty).$$",
        add: { inclusive: true },
      },
      {
        text: "The shaded intervals are identical in both answers, and only the four endpoint marks changed. The sign chart fixes the interior, and the symbol $>$ or $\\ge$ decides each boundary.",
      },
      {
        text: "One endpoint never fills in. Because $\\infty$ is not a number the interval can reach, it stays open in every case, so the right side keeps its parenthesis as $[3,\\infty)$ even for $\\ge$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Using the same sign chart, the solution of $p(x)\\ge 0$ is:",
        options: [
          "$[-2,1]\\cup[3,\\infty)$",
          "$(-2,1)\\cup(3,\\infty)$",
          "$[-2,1]\\cup[3,\\infty]$",
          "$(-\\infty,-2]\\cup[1,3]$",
        ],
        answer: 0,
        hint: "Keep the same positive intervals, then include the zeros because equality is now allowed.",
        success: "Correct: the same intervals as $p(x)>0$, with the zeros $-2$, $1$, $3$ now included and $\\infty$ still open.",
      },
      {
        kind: "choice",
        prompt: "Changing $p(x)>0$ to $p(x)\\ge 0$ changes the solution how?",
        options: [
          "The three zeros switch from excluded to included, so the open circles become filled.",
          "The shaded intervals move to the negative regions.",
          "Nothing changes, since the two solutions are identical.",
          "The infinite side gains a bracket, becoming $[3,\\infty]$.",
        ],
        answer: 0,
        hint: "The interior signs are the same, so only the boundary decision depends on the symbol.",
        success: "Correct: only the boundary points change, because $0\\ge 0$ holds while $0>0$ does not.",
      },
    ],
  },
];
