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
        text: "A fraction is zero only when its **top** is zero: at $x=3$. Because $r=3$ actually equals $0$ there, that boundary is a solid dot.",
        add: { criticals: true },
      },
      {
        text: "The fraction is **undefined** where the bottom is zero: at $x=-1$. That builds a wall, and $x=-1$ is always excluded, an open dot.",
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
    params: [tracer(0)],
    baseReveal: { curve: true, criticals: true, va: true, readout: true },
    beats: [
      {
        text: "Test one point in each interval split by $-1$ and $3$. The strip reads positive, negative, positive.",
        add: { signs: true },
      },
      {
        text: "The sign flips at the wall $x=-1$, not only at the zero $x=3$. Both a numerator zero and a denominator zero can flip the sign.",
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
        text: "Solve $r(x)>0$: shade the intervals the strip marks positive.",
        add: { solution: true },
      },
      {
        text: "That is $(-\\infty,-1)\\cup(3,\\infty)$. The wall at $-1$ is open, and $3$ is open too because $>$ is strict.",
      },
      {
        text: "For $r(x)\\ge 0$, the zero $x=3$ gets included, but $x=-1$ stays excluded. You can never include a value that makes the bottom zero.",
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
