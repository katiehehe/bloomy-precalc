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
        text: "Graphing $f(x)=\\dfrac{x^2-1}{x^2-4}$ goes one feature at a time, beginning with the factored form: $$\\dfrac{(x-1)(x+1)}{(x-2)(x+2)}.$$",
        add: { readout: true },
      },
      {
        text: "**The graphing method runs in four steps:**\n1. Find the intercepts.\n2. Locate the vertical asymptotes where the denominator is zero.\n3. Read the end behavior, which is a horizontal or slant asymptote.\n4. Connect the pieces into a curve.",
      },
      {
        text: "Step one, the **intercepts**. The numerator is zero at $x=\\pm 1$, giving the x-intercepts, and $f(0)=\\tfrac{-1}{-4}=\\tfrac14$ gives the y-intercept.",
        add: { intercepts: true },
      },
      {
        text: "Step two, the **vertical asymptotes**. The denominator is zero at $x=2$ and $x=-2$, so a wall stands at each.",
        add: { va: true },
      },
      {
        text: "Step three, the **end behavior**. The numerator and denominator have equal degree, so the horizontal asymptote is $y=1$, the ratio $\\tfrac{1}{1}$ of leading coefficients.",
        add: { ha: true },
      },
      {
        text: "Step four, **connect** the pieces. With every feature placed, the curve can be drawn through them. The two walls at $x=\\pm 2$ split the graph into three separate pieces, one in each region.",
        add: { curve: true, tracer: true },
      },
    ],
    practice: "Click an x-intercept, or drag the tracer near $x=0$.",
    questions: [
      {
        kind: "plot",
        prompt: "Click one of the x-intercepts.",
        target: { x: 1, y: 0 },
        targets: [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
        ],
        tolerance: 0.6,
        label: "(1, 0)",
        hint: "Where the numerator $(x-1)(x+1)$ is zero.",
        success: "The x-intercepts are $(1,0)$ and $(-1,0)$.",
      },
      {
        kind: "choice",
        prompt: "The horizontal asymptote of $\\dfrac{x^2-1}{x^2-4}$ is:",
        options: ["$y=0$", "$y=1$", "$y=-\\tfrac14$"],
        answer: 1,
        hint: "Equal degrees give the ratio of leading coefficients, $\\tfrac{1}{1}$.",
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
        text: "At each wall the graph grows without bound. As the tracer approaches $x=2$ from the right, the sign of the denominator $x^2-4$ determines whether the graph goes up or down.",
        add: { tracer: true },
      },
      {
        text: "At $x=2.1$ the numerator $x^2-1=3.41$ is positive and the denominator $x^2-4=0.41$ is small and positive. Dividing a positive by a small positive makes $f$ large and positive, so $f\\to +\\infty$.",
        to: { x: 210 },
        ms: 2000,
      },
      {
        text: "Just left of $2$, at $x=1.9$, the denominator $x^2-4$ turns small and **negative**, so on that side $f\\to -\\infty$.",
        to: { x: 190 },
        ms: 1800,
      },
      {
        text: "The same sign test applies at $x=-2$. Every wall takes its up-or-down direction from the sign of the denominator on each side.",
      },
    ],
    practice: "Drag the tracer just right of the wall at $x=2$.",
    questions: [
      {
        kind: "choice",
        prompt: "Approaching $x=2$ from the right, the denominator $x^2-4$ is small and positive and the numerator is positive, so $f\\to$:",
        options: ["$+\\infty$", "$-\\infty$", "$1$"],
        answer: 0,
        hint: "A positive divided by a tiny positive is a large positive number.",
        success: "Yes: $f\\to +\\infty$ on the right of $x=2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer just right of the wall, into $2 < x < 2.4$.",
        hint: "Approach $x=2$ from the right side.",
        success: "A small positive denominator sends $f$ up to $+\\infty$.",
        check: (value) => {
          const x = value / 100;
          return x > 2.02 && x < 2.4;
        },
      },
    ],
  },
];
