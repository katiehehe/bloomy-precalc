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

const r = (x: number) => (x - 3) / (x + 1);

export const slides: Slide[] = [
  {
    id: "two-boundaries",
    title: "Two kinds of boundary",
    mode: "rational",
    params: [tracer(0)],
    baseReveal: {},
    beats: [
      {
        text: "This is $r(x)=\\dfrac{x-3}{x+1}$. We want every $x$ where it is **positive**.",
        add: { curve: true, readout: true },
      },
      {
        text: "**The plan is the same three steps as for polynomials:** find the critical points, test each interval, then keep the sign you want. For a fraction the critical points come in **two kinds**, so make sure to find both.",
      },
      {
        text: "First kind, a **numerator zero**. A fraction is zero only when its top is zero, at $x=3$. Because $r(3)$ really equals $0$, that critical point is a solid dot.",
        add: { criticals: true },
      },
      {
        text: "Second kind, a **denominator zero**. The fraction is **undefined** at $x=-1$, which builds a wall. **Make sure to always exclude a wall**, so $x=-1$ is an open dot.",
        add: { va: true },
      },
    ],
    practice: "Drag the tracer toward each boundary and watch $r(x)$ hit zero at $3$ but blow up at $-1$.",
    questions: [
      {
        kind: "choice",
        prompt: "The fraction $\\dfrac{x-3}{x+1}$ equals zero at:",
        options: ["$x=3$", "$x=-1$", "both $x=3$ and $x=-1$"],
        answer: 0,
        hint: "A fraction is zero only when its numerator is zero.",
        success: "Right: the top is zero at $x=3$; the bottom being zero makes it undefined, not zero.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer into a region where $r(x)>0$.",
        hint: "Try far left of $-1$, or to the right of $3$.",
        success: "Yes: $r(x)>0$ on both outer pieces.",
        check: (value) => {
          const x = value / 100;
          return Math.abs(x + 1) > 0.02 && r(x) > 0;
        },
      },
    ],
  },
  {
    id: "sign-chart",
    title: "Sign across every boundary",
    mode: "rational",
    params: [tracer(-200)],
    baseReveal: { curve: true, criticals: true, va: true, readout: true },
    beats: [
      {
        text: "Step two, **test each interval**. The critical points $-1$ and $3$ cut the line into three regions. In each one, check the sign of the **top** and the **bottom**, then divide.",
        add: { signs: true },
      },
      {
        text: "Left of $-1$, test $x=-2$: the top $x-3=-5$ is negative and the bottom $x+1=-1$ is negative. A negative over a negative is **positive**, so $r>0$ on this stretch.",
        to: { x: -200 },
        ms: 1200,
      },
      {
        text: "Between $-1$ and $3$, test $x=0$: the top is still negative, but the bottom $x+1=1$ is now positive. Negative over positive is **negative**, so $r<0$ here.",
        to: { x: 0 },
        ms: 1800,
      },
      {
        text: "Right of $3$, test $x=4$: now the top $x-3=1$ and the bottom $x+1=5$ are both positive, so $r>0$ again.",
        to: { x: 400 },
        ms: 1800,
      },
      {
        text: "Reading down the chart the pattern is $+,\\,-,\\,+$. **Make sure to test strictly inside each interval**, and notice the sign flipped at the wall $x=-1$, not only at the zero $x=3$.",
      },
    ],
    practice: "Drag across $-1$ and across $3$; the sign flips at each.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tracer to a spot where $r(x)<0$.",
        hint: "The middle interval, between $-1$ and $3$.",
        success: "Correct: $r(x)<0$ only between the wall and the zero.",
        check: (value) => {
          const x = value / 100;
          return Math.abs(x + 1) > 0.02 && r(x) < 0;
        },
      },
      {
        kind: "choice",
        prompt: "Between $x=-1$ and $x=3$, the value $r(x)$ is:",
        options: ["Positive", "Negative", "Undefined"],
        answer: 1,
        hint: "Test $x=0$: the top is $-3$, the bottom is $+1$.",
        success: "At $x=0$, $r=-3$, so the whole middle interval is negative.",
      },
    ],
  },
  {
    id: "solution",
    title: "Solution and the open wall",
    mode: "rational",
    params: [tracer(0)],
    baseReveal: { curve: true, criticals: true, va: true, signs: true, readout: true },
    beats: [
      {
        text: "Step three, **write the solution**. Solve $r(x)>0$ by shading the intervals the strip marks positive.",
        add: { solution: true },
      },
      {
        text: "That is $(-\\infty,-1)\\cup(3,\\infty)$. The wall at $-1$ is open, and $3$ is open too because $>$ is strict.",
      },
      {
        text: "**Make sure of two things when you finish:** include a numerator zero only when the inequality allows equality, and **never include a wall**. So $r(x)\\ge 0$ gives $(-\\infty,-1)\\cup[3,\\infty)$.",
      },
    ],
    practice: "Drag the tracer inside the shaded set to confirm $r(x)>0$ there.",
    questions: [
      {
        kind: "choice",
        prompt: "The solution of $r(x)\\ge 0$ is:",
        options: [
          "$(-\\infty,-1)\\cup[3,\\infty)$",
          "$(-\\infty,-1]\\cup[3,\\infty)$",
          "$[-1,3]$",
        ],
        answer: 0,
        hint: "Include the zero $3$; never include the wall $-1$.",
        success: "Right: bracket the zero, keep the wall open.",
      },
      {
        kind: "choice",
        prompt: "Why not just multiply both sides of $\\dfrac{x-3}{x+1}>0$ by $x+1$?",
        options: [
          "Because $x+1$ can be negative, which would flip the inequality",
          "Because $x+1$ is always zero",
          "You can, and it changes nothing",
        ],
        answer: 0,
        hint: "You do not know the sign of $x+1$ ahead of time.",
        success: "Exactly: an unknown sign means you cannot multiply through safely. Sign-analysis avoids it.",
      },
    ],
  },
];
