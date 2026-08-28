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

export const slides: Slide[] = [
  {
    id: "graph-by-parts",
    title: "Graphing by parts",
    mode: "graph",
    params: [tracer(300)],
    baseReveal: {},
    beats: [
      {
        text: "Graph $f(x)=\\dfrac{x^2-1}{x^2-4}$ one feature at a time. Factor first: $\\dfrac{(x-1)(x+1)}{(x-2)(x+2)}$.",
        add: { readout: true },
      },
      {
        text: "**Follow the graphing checklist every time:** find the intercepts, then the vertical asymptotes where the bottom is zero, then the end behavior (a horizontal or slant asymptote). Place each feature, then connect the pieces.",
      },
      {
        text: "Step one, **intercepts**. The top is zero at $x=\\pm 1$, and $f(0)=\\tfrac{-1}{-4}=\\tfrac14$.",
        add: { intercepts: true },
      },
      {
        text: "Step two, **vertical asymptotes**, where the bottom is zero: $x=2$ and $x=-2$.",
        add: { va: true },
      },
      {
        text: "Step three, **end behavior**. The degrees are equal, so the horizontal asymptote is $y=1$, the ratio $\\tfrac{1}{1}$.",
        add: { ha: true },
      },
      {
        text: "With every feature placed, we can trace out the curve. The two walls at $x=\\pm 2$ split it into three separate pieces, one in each region.",
        add: { curve: true, tracer: true },
      },
    ],
    practice: "Drag the tracer through the left, middle, and right regions.",
    questions: [
      {
        kind: "plot",
        prompt: "Click one of the x-intercepts.",
        target: { x: 1, y: 0 },
        targets: [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
        ],
        tolerance: 0.45,
        label: "(1, 0)",
        hint: "Where the numerator $(x-1)(x+1)$ is zero.",
        success: "The x-intercepts are $(1,0)$ and $(-1,0)$.",
      },
      {
        kind: "choice",
        prompt: "The horizontal asymptote of $\\dfrac{x^2-1}{x^2-4}$ is:",
        options: ["$y=0$", "$y=1$", "$y=-\\tfrac14$"],
        answer: 1,
        hint: "Equal degrees means the ratio of leading coefficients $\\tfrac{1}{1}$.",
        success: "The horizontal asymptote is $y=1$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer near $x=0$ to read the y-intercept.",
        hint: "Center the tracer between the two walls.",
        success: "The y-intercept is $(0,\\tfrac14)$.",
        check: (value) => Math.abs(value / 100) < 0.3,
      },
    ],
  },
  {
    id: "near-the-walls",
    title: "Behavior near each wall",
    mode: "graph",
    params: [tracer(350)],
    baseReveal: { curve: true, va: true, ha: true, readout: true, parts: true },
    beats: [
      {
        text: "Why does the graph shoot off at each wall? Watch the tracer ease in toward $x=2$ from the right and check the sign of the bottom.",
        add: { tracer: true },
      },
      {
        text: "At $x=2.1$: the top $x^2-1=3.41$ is positive, and the bottom $x^2-4=0.41$ is small and positive. So $f$ is large and positive: $f\\to +\\infty$.",
        to: { x: 210 },
        ms: 2000,
      },
      {
        text: "Just left of 2, the bottom $x^2-4$ turns small and **negative**, so on that side $f\\to -\\infty$.",
      },
      {
        text: "Run the same sign test at $x=-2$. Every wall gets its up-or-down from the sign of the bottom on each side.",
      },
    ],
    practice: "Drag the tracer up to a wall and watch which way $f$ shoots.",
    questions: [
      {
        kind: "choice",
        prompt: "Approaching $x=2$ from the right, the bottom $x^2-4$ is small and positive and the top is positive. So $f\\to$:",
        options: ["$+\\infty$", "$-\\infty$", "$1$"],
        answer: 0,
        hint: "Positive divided by a tiny positive is a big positive.",
        success: "Yes: $f\\to +\\infty$ on the right of $x=2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer just right of the wall, into $2 < x < 2.4$.",
        hint: "Approach $x=2$ from the right side.",
        success: "A small positive bottom sends $f$ up to $+\\infty$.",
        check: (value) => {
          const x = value / 100;
          return x > 2.02 && x < 2.4;
        },
      },
    ],
  },
];
