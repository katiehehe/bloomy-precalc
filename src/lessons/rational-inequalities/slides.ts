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
        text: "Consider the rational function $$r(x)=\\dfrac{x-3}{x+1}.$$ The goal is to find every $x$ where it is **positive**.",
        add: { curve: true, readout: true },
      },
      {
        text: "**The plan is the same three steps as for polynomials:** find the critical points, test each interval, then keep the sign you want. For a fraction the critical points come in **two kinds**, so make sure to find both.",
      },
      {
        text: "First kind, a **numerator zero**. A fraction equals zero only when its numerator is zero, which happens at $x=3$. Since $r(3)=0$ exactly, that critical point is drawn as a solid dot.",
        add: { criticals: true },
      },
      {
        text: "Second kind, a **denominator zero**. At $x=-1$ the denominator is zero, so the fraction is **undefined** and a wall stands there. **Always exclude a wall**, so $x=-1$ is drawn as an open dot.",
        add: { va: true },
      },
    ],
    practice: "Drag the tracer into a region where $r(x)>0$.",
    questions: [
      {
        kind: "choice",
        prompt: "The fraction $\\dfrac{x-3}{x+1}$ equals zero at:",
        options: ["$x=3$", "$x=-1$", "both $x=3$ and $x=-1$"],
        answer: 0,
        hint: "A fraction is zero only when its numerator is zero.",
        success: "Correct: the numerator is zero at $x=3$. A zero denominator makes the fraction undefined, not zero.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer into a region where $r(x)>0$.",
        hint: "Try far left of $-1$, or to the right of $3$.",
        success: "Correct: $r(x)>0$ on both outer regions.",
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
        text: "Step two, **test each interval**. The critical points $-1$ and $3$ cut the line into three regions. In each region, check the sign of the **numerator** and the **denominator**, then divide.",
        add: { signs: true },
      },
      {
        text: "Left of $-1$, test $x=-2$: the numerator $x-3=-5$ is negative and the denominator $x+1=-1$ is negative. A negative divided by a negative is **positive**, so $r>0$ on this interval.",
        to: { x: -200 },
        ms: 1200,
      },
      {
        text: "Between $-1$ and $3$, test $x=0$: the numerator is still negative, but the denominator $x+1=1$ is now positive. A negative divided by a positive is **negative**, so $r<0$ here.",
        to: { x: 0 },
        ms: 1800,
      },
      {
        text: "Right of $3$, test $x=4$: now the numerator $x-3=1$ and the denominator $x+1=5$ are both positive, so $r>0$ again.",
        to: { x: 400 },
        ms: 1800,
      },
      {
        text: "Reading down the chart, the pattern is $+,\\,-,\\,+$. **Make sure to test strictly inside each interval.** The sign changes at the wall $x=-1$ as well as at the zero $x=3$, so a wall can flip the sign just as a zero can.",
      },
    ],
    practice: "Drag the tracer into a region where $r(x)<0$.",
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
        hint: "Test $x=0$: the numerator is $-3$, the denominator is $+1$.",
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
        text: "Step three, **write the solution**. To solve $r(x)>0$, keep the intervals where the sign chart shows a positive value.",
        add: { solution: true },
      },
      {
        text: "The solution set is $$(-\\infty,-1)\\cup(3,\\infty).$$ The wall at $-1$ stays open, and $3$ is open as well because the inequality $>$ is strict.",
      },
      {
        text: "**Make sure of two things when you finish:** include a numerator zero only when the inequality allows equality, and **never include a wall**. So $r(x)\\ge 0$ gives $(-\\infty,-1)\\cup[3,\\infty)$.",
      },
    ],
    practice: "",
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
        hint: "Include the zero $3$. Never include the wall $-1$.",
        success: "Correct: bracket the zero and keep the wall open.",
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
        success: "Correct: an unknown sign means you cannot safely multiply through, so a sign analysis is the reliable method.",
      },
    ],
  },
];
